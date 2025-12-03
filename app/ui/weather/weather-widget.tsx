'use client';
import useSWR from 'swr';
import WeatherIcon from './weather-icon';
import { CurrentWeatherPayload } from '@/app/lib/definitions';
import WeatherLocation from './weather-location';
import WeatherTemperatureInfo from './weather-temperature-info';
import ForecastedDays from './forecasted-days';

const fetcher = async (): Promise<CurrentWeatherPayload> => {
  const res = await fetch('/api/weather');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export default function WeatherWidget() {
  const { data, error, isLoading } = useSWR<CurrentWeatherPayload>('current-weather', fetcher, {
    refreshInterval: 600_000 // 10 minutes
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="inky-frame-weather-widget" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.75rem' }}>
      <WeatherLocation data={data} />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '5rem' }}>
        <WeatherIcon data={data} />
        <WeatherTemperatureInfo data={data} />
      </div>
      <ForecastedDays days={data.daily} />
    </div>
  );
}