// Utility to build an OpenWeather icon URL.
export function getWeatherIconUrl(code: string, size: '1x' | '2x' | '4x' = '2x') {
    if (!code) {
        return '';
    }
    const suffix = size === '1x' ? '' : `@${size}`;
    return `https://openweathermap.org/img/wn/${code}${suffix}.png`;
}