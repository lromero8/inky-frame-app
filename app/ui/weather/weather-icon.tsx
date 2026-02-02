import { CurrentWeatherPayload } from '@/app/lib/definitions';
import { getWeatherIconUrl } from '@/app/lib/weather/openweather.icon';
import Image from 'next/image';

export default function WeatherIcon({ data }: { data: CurrentWeatherPayload }) {
    const iconUrl = getWeatherIconUrl(data.id, data.dateTime);
    const icon = `wi-${iconUrl}.svg`;
    return (
        <Image
            src={icon}
            width={180}
            height={137}
            alt="Screenshots of the dashboard project showing desktop version"
        />
    );
}