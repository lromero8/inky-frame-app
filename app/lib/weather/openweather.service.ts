import { fetchOneCall, OneCallParams } from './openweather.server';

export async function getCurrentWeather(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts'] });
  console.log('Fetched current weather:', data);
  return data.current;
}

export async function getDailyForecast(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts', 'hourly'] });
  return data.daily;
}

// https://nominatim.openstreetmap.org/reverse?lat=50.91&lon=6.96&format=json