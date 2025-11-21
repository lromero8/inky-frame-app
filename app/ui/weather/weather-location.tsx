import { CurrentWeatherPayload } from '@/app/lib/definitions';

export default function WeatherLocation({ data }: { data: CurrentWeatherPayload }) {
    const { city, city_district } = data.location;
    return (
        <div>
            <strong>{city_district}, {city}</strong>
            <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit' })}</div>
        </div>
    );
}