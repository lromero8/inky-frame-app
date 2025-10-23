'use client';
import useSWR from 'swr';
import { getWeatherIconUrl } from '@/app/lib/weather/openweather.icon'; // icon helper

interface CurrentWeatherPayload {
  temp: number;
  description: string;
  icon: string; // added
  updatedAt: number;
}

const fetcher = async (): Promise<CurrentWeatherPayload> => {
  const res = await fetch('/api/weather');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export default function WeatherCard() {
  const { data, error, isLoading } = useSWR<CurrentWeatherPayload>('current-weather', fetcher, {
    refreshInterval: 600_000 // 10 minutes
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const iconUrl = getWeatherIconUrl(data.icon);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {iconUrl && (
        <img
          src={iconUrl}
          alt={data.description}
          width={64}
          height={64}
          style={{
            width: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 12,
            background: 'linear-gradient(135deg,#ffffff,#f5f5f5)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', textTransform: 'capitalize' }}>{data.description}</p>
  <p style={{ margin: '2px 0 0', fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(data.temp)}°C</p>
        <small style={{ opacity: 0.6 }}>Updated {new Date(data.updatedAt).toLocaleTimeString()}</small>
      </div>
    </div>
  );
}