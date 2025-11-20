import { fetchLocationName, fetchOneCall, OneCallParams } from './openweather.server';

export async function getCurrentAndDailyWeather(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts'] });
  return data;
}

export async function getCurrentWeather(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts', 'daily'] });
  return data.current;
}

export async function getDailyForecast(params: OneCallParams) {
  const data = await fetchOneCall({ ...params, exclude: ['minutely', 'alerts', 'hourly'] });
  return data.daily;
}

export async function getLocationName(params: OneCallParams) {
  const { lat, lon } = params;
  const data = await fetchLocationName(lat, lon);
  const address = data.address;
  return {
    city: address.city,
    city_district: address.city_district,
    country: address.country
  };
}