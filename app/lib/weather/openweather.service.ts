import { fetchOneCall, OneCallParams } from './openweather.client';

export async function getCurrentWeather(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts'] });
  return data.current;
}

export async function getDailyForecast(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts', 'hourly'] });
  return data.daily;
}