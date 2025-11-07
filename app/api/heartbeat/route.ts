import { NextResponse } from 'next/server';
import { touchHeartbeat } from '@/app/lib/heartbeat';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  try {
    const result = await touchHeartbeat(false, 3);
    return NextResponse.json({ ok: true, wrote: result.wrote, updated_at: result.updated_at });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
