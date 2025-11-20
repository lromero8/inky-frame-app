import { NextResponse } from 'next/server';
import { getCurrentAndDailyWeather, getLocationName } from '../../lib/weather/openweather.service';

export const revalidate = 600;

export async function GET() {
  const data = await getCurrentAndDailyWeather({ lat: 50.91, lon: 6.96, units: 'metric' });
  const current = data.current;
  const location = await getLocationName({ lat: 50.91, lon: 6.96 });
  return NextResponse.json({
    temp: current.temp,
    description: current.weather[0]?.description ?? '',
    id: current.weather[0]?.id ?? '',
    dateTime: current.weather[0]?.icon.includes('d') ? 'day' : 'night',
    location,
    updatedAt: Date.now()
  });
}