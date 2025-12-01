/**
 * Type definitions for OpenWeatherMap One Call API (v3) response (subset / normalized).
 * Optional fields (returned only in certain conditions) are marked with ?.
 */

interface Location {
  city: string;
  city_district: string;
  country: string;
}

export interface CurrentWeatherPayload {
  temp: number;
  description: string;
  id: string;
  dateTime: 'day' | 'night';
  location: Location;
  daily: DailyForecast[];
  updatedAt: number;
}

export interface OpenWeatherOneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely?: MinuteForecast[];        // Optional (may be absent for some locations)
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: WeatherAlert[];            // Optional national weather alerts
}

interface CurrentWeather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  uvi: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: PrecipitationRate;           // { "1h": mm } if available
  snow?: PrecipitationRate;           // { "1h": mm } if available
  weather: WeatherCondition[];
}

interface MinuteForecast {
  dt: number;
  precipitation: number;              // mm/h
}

interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop: number;                        // 0..1 probability of precipitation
  rain?: PrecipitationRate;           // { "1h": mm }
  snow?: PrecipitationRate;           // { "1h": mm }
  weather: WeatherCondition[];
}

export interface DailyForecast {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  summary?: string;                   // Human-readable summary (if provided by API version)
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;                        // Max UV for the day
  pop: number;
  rain?: number;                      // mm total (if available)
  snow?: number;                      // mm total (if available)
  weather: WeatherCondition[];
}

interface DailyTemperature {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
}

interface DailyFeelsLike {
  morn: number;
  day: number;
  eve: number;
  night: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface PrecipitationRate {
  /** Precipitation over the last hour (mm). Property name is "1h" per API. */
  '1h'?: number;
}

interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;          // Unix UTC
  end: number;            // Unix UTC
  description: string;
  tags?: string[];        // Types of severe weather
}