import { CurrentWeatherPayload } from "@/app/lib/definitions";
import Image from "next/image";

export default function WeatherTemperature({ data }: { data: CurrentWeatherPayload }) {
    const sunrise = data.daily[0]?.sunrise;
    const sunset = data.daily[0]?.sunset;
    const formattedSunrise = new Date(sunrise ? sunrise * 1000 : 0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedSunset = new Date(sunset ? sunset * 1000 : 0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunriseIcon = 'wi-sunrise.svg';
    const sunsetIcon = 'wi-sunset.svg';

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <strong style={{ margin: '2px 0 0', fontSize: '2rem', fontWeight: 600 }}>{Math.round(data.temp)}°C</strong>
                    <strong style={{ margin: 0, fontSize: '1.2rem', textTransform: 'capitalize' }}>{data.description}</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' , gap: '2rem' }}>
                    <div>
                        <Image 
                            src={sunriseIcon}
                            width={70}
                            height={56}
                            alt="Sunrise Icon"
                        />
                        <strong>{formattedSunrise}</strong>
                    </div>
                    <div>
                        <Image
                            src={sunsetIcon}
                            width={70}
                            height={56}
                            alt="Sunset Icon"
                        />
                        <strong>{formattedSunset}</strong>
                    </div>
                </div>
            </div>
            <strong style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4.5rem' }}>
                <small style={{ opacity: 0.6 }}>Updated {new Date(data.updatedAt).toLocaleTimeString()}</small>
            </strong>
        </div>
    );
}
