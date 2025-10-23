import { getCurrentWeather } from '../../lib/weather';

export default async function WeatherCard() {
  const current = await getCurrentWeather({ lat: 50.91, lon: 6.96, units: 'metric' });
  return (
    <div>
      <p>{current.weather[0]?.description}</p>
      <p>{current.temp}°C</p>
    </div>
  );
}