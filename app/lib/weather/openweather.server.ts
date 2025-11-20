import 'server-only';
import { OpenWeatherOneCallResponse } from './openweather.types';

const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export interface OneCallParams {
  lat: number;
  lon: number;
  units?: 'standard' | 'metric' | 'imperial';
  lang?: string;
  exclude?: string[]; // e.g. ['minutely','alerts']
}

function buildQuery(params: OneCallParams): string {
  const q = new URLSearchParams();
  q.set('lat', String(params.lat));
  q.set('lon', String(params.lon));
  if (params.units) q.set('units', params.units);
  if (params.lang) q.set('lang', params.lang);
  if (params.exclude?.length) q.set('exclude', params.exclude.join(','));
  q.set('appid', process.env.OPENWEATHER_API_KEY!);
  return q.toString();
}

export async function fetchOneCall(params: OneCallParams): Promise<OpenWeatherOneCallResponse> {
  const url = `${BASE_URL}?${buildQuery(params)}`;
  const res = await fetch(url, {
    // Optional: add caching directives
    // next: { revalidate: 600 } // 10 minutes ISR for server components
  });
  if (!res.ok) throw new Error(`OpenWeather error ${res.status}`);
  return res.json();
}

interface LocationResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: number;
  lon: number;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: number;
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  },
  boundingbox: string[];
}

export async function fetchLocationName(lat: number, lon: number): Promise<LocationResponse> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Location fetch error ${res.status}`);
  return res.json();
}