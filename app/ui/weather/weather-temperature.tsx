import { CurrentWeatherPayload } from "@/app/lib/definitions";

export default function WeatherTemperature({ data }: { data: CurrentWeatherPayload }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', textTransform: 'capitalize' }}>{data.description}</p>
            <p style={{ margin: '2px 0 0', fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(data.temp)}°C</p>
            <small style={{ opacity: 0.6 }}>Updated {new Date(data.updatedAt).toLocaleTimeString()}</small>
        </div>
    );
}
