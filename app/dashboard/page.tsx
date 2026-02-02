"use client";

import { useState } from "react";
import WeatherWidget from "../ui/weather/weather-widget";
import WidgetSelector from "../ui/dashboard/widget-selector";

type WidgetKey = "weather" | "calendar" | "ai-images";

export default function Page() {
  const [mainWidget, setMainWidget] = useState<WidgetKey>("weather");

  return (
    <div className="p-4 space-y-4">

      {/* <div className="main-widget mb-64"> */}
      <div className="main-widget mb-64" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 800,
            height: 480,
            border: "3px dashed red",
            boxSizing: "border-box",
            zIndex: 50,
            pointerEvents: "none",
            background: "transparent",
          }}
        >
          <div style={{ position: "absolute", right: 8, top: 8, background: "rgba(0,0,0,0.7)", color: "#fff", padding: "4px 8px", borderRadius: 6, fontSize: 12 }}>
            Inky Frame: 800 x 480 px
          </div>
        </div>
        {mainWidget === "weather" && <WeatherWidget />}
        {mainWidget === "calendar" && (
          <div className="h-40 flex items-center justify-center">Calendar coming soon</div>
        )}
        {mainWidget === "ai-images" && (
          <div className="h-40 flex items-center justify-center">AI Images coming soon</div>
        )}
      </div>

      <WidgetSelector defaultWidget="weather" onChange={setMainWidget} />

    </div>
  );
}