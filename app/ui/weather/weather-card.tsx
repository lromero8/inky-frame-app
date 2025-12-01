'use client';
import useSWR from 'swr';
import WeatherIcon from './weather-icon';
import { CurrentWeatherPayload } from '@/app/lib/definitions';
import WeatherLocation from './weather-location';
import WeatherTemperature from './weather-temperature';
import ForecastedDays from './forecasted-days';

/**
 * I think I need to refactor this weather card and split it into smaller components.
 * One component for the icon, one for the location and date, one for the temperature and update time, and one for the carousel of daily forecasts.
 * This will make it easier to manage the layout and styling of each part separately.
 * So this component will just be a container for the other components. 
 */

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
    <div className="inky-frame-weather-widget" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '0.75rem' }}>
      <WeatherLocation data={data} />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <WeatherIcon data={data} />
        <WeatherTemperature data={data} />
      </div>
      <ForecastedDays days={data.daily} />
    </div>
  );
}