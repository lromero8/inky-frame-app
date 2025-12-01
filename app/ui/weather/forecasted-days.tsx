import { DailyForecast } from "@/app/lib/definitions";
import { getWeatherIconUrl } from "@/app/lib/weather/openweather.icon";
import styles from './forecasted-days.module.css';

interface ForecastedDay {
  dayName: string;
  maxTemp: number;
  minTemp: number;
  dateTime: string;
  icon: string;
}

export default function ForecastedDays({ days }: { days: DailyForecast[] }) {
  const forecastedDays = days.map<ForecastedDay>((day) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const maxTemp = Math.round(day.temp.max);
    const minTemp = Math.round(day.temp.min);
    const dateTime = day.weather[0]?.icon.includes('d') ? 'day' : 'night';
    const iconUrl = getWeatherIconUrl(String(day.weather[0].id ?? ''), dateTime);
    const icon = `wi-${iconUrl}.svg`;
    return { dayName, maxTemp, minTemp, dateTime, icon };
  });
  
  return (
    <div className={styles.carousel}>
      {forecastedDays.map((day, index) => (
        <div key={index} className={styles.card}>
          {/* Day name */}
          <div className={styles.dayName}>
            {day.dayName}
          </div>
          
          {/* Weather icon */}
          <div className={styles.iconContainer}>
            <img 
              src={`/${day.icon}`} 
              alt={day.dayName}
              className={styles.icon}
            />
          </div>
          
          {/* Temperature range */}
          <div className={styles.temperatures}>
            <div className={styles.maxTemp}>
              {day.maxTemp}°
            </div>
            <div className={styles.minTemp}>
              {day.minTemp}°
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
