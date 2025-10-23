import { NextResponse } from 'next/server';
import { getCurrentWeather } from '../../lib/weather/openweather.service';

export const revalidate = 600;

export async function GET() {
  const current = await getCurrentWeather({ lat: 50.91, lon: 6.96, units: 'metric' });
  return NextResponse.json({
    temp: current.temp,
    description: current.weather[0]?.description ?? '',
    icon: current.weather[0]?.icon ?? '',
    updatedAt: Date.now()
  });
}