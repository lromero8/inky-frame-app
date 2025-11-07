import postgres from 'postgres';

// Reuse existing POSTGRES_URL; ensure it's set in environment.
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Ensure heartbeat table exists. Creates a single-row table keyed by a tag.
 */
export async function ensureHeartbeatTable() {
  await sql`CREATE TABLE IF NOT EXISTS app_heartbeat (
    tag text PRIMARY KEY,
    updated_at timestamptz NOT NULL DEFAULT now()
  );`;
  await sql`INSERT INTO app_heartbeat(tag) VALUES('app') ON CONFLICT (tag) DO NOTHING;`;
}

/**
 * Touch the heartbeat row only if last update older than threshold OR force.
 * Returns object { wrote: boolean, updated_at: string }
 */
export async function touchHeartbeat(force = false, daysInterval = 3) {
  // Guarantee table exists (cheap idempotent calls)
  await ensureHeartbeatTable();
  const rows = await sql<{ updated_at: string; wrote: boolean }[]>`
    WITH upd AS (
      UPDATE app_heartbeat SET updated_at = CASE
        WHEN app_heartbeat.updated_at < now() - interval '3 days' OR ${force}::boolean
          THEN excluded.updated_at
        ELSE app_heartbeat.updated_at
      END
      WHERE tag = 'app'
      RETURNING updated_at
    )
    SELECT 
      COALESCE((SELECT updated_at FROM upd), (SELECT updated_at FROM app_heartbeat WHERE tag='app')) AS updated_at,
      EXISTS(SELECT 1 FROM upd) AS wrote;
  `;
  return rows[0];
}
