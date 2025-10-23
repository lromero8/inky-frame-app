'use client';
import useSWR from 'swr';

interface CurrentWeatherPayload {
  temp: number;
  description: string;
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

  return (
    <div>
      <p>{data.description}</p>
      <p>{data.temp}°C</p>
      <small>Updated {new Date(data.updatedAt).toLocaleTimeString()}</small>
    </div>
  );
}