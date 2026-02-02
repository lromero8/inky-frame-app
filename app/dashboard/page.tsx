"use client";

import { useState } from "react";
import WeatherWidget from "../ui/weather/weather-widget";
import WidgetSelector from "../ui/dashboard/widget-selector";

type WidgetKey = "weather" | "calendar" | "ai-images";

export default function Page() {
  const [mainWidget, setMainWidget] = useState<WidgetKey>("weather");

  return (
    <div className="p-4 space-y-4">

      <div className="flex justify-center items-center min-h-[600px]">
        <div 
          className="main-widget" 
          style={{ 
            width: '800px', 
            height: '480px', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}
        >
          {mainWidget === "weather" && <WeatherWidget />}
          {mainWidget === "calendar" && (
            <div className="h-40 flex items-center justify-center">Calendar coming soon</div>
          )}
          {mainWidget === "ai-images" && (
            <div className="h-40 flex items-center justify-center">AI Images coming soon</div>
          )}
        </div>
      </div>

      <WidgetSelector defaultWidget="weather" onChange={setMainWidget} />

    </div>
  );
}