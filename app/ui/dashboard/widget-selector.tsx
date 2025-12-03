"use client";

import { useState } from "react";

type WidgetKey = "weather" | "calendar" | "ai-images";

type Props = {
    defaultWidget?: WidgetKey;
    onChange?: (key: WidgetKey) => void;
};

const WIDGETS: { key: WidgetKey; title: string, description: string, icon: string }[] = [
    {
        key: "weather",
        title: "Weather",
        description: "Forecast & temperature",
        icon: "☁️"
    },
    {
        key: "calendar",
        title: "Everyday Goal Calendar",
        description: "Achievements & habits",
        icon: "📅"
    },
    {
        key: "ai-images",
        title: "AI Image",
        description: "Daily artwork",
        icon: "🖼️"
    }
];

export default function WidgetSelector({ defaultWidget = "weather", onChange }: Props) {
    const [selected, setSelected] = useState<WidgetKey>(defaultWidget);

    function handleSelect(key: WidgetKey) {
        setSelected(key);
        onChange?.(key);
    }

    return (
        <div className="space-y-2">
            <div
                className="grid grid-cols-3 gap-2"
                aria-label="Widget selector"
                role="radiogroup"
            >
                {WIDGETS.map((w) => {
                    const isActive = selected === w.key;
                    return (
                        <button
                            key={w.key}
                            role="listitem"
                            onClick={() => handleSelect(w.key)}
                            aria-pressed={isActive}
                            className={
                                [
                                    "group select-none",
                                    // High-contrast, thick borders for e-ink readability
                                    "border-2 rounded-md px-3 py-3 text-left",
                                    "transition-none", // avoid subtle transitions (not visible on e-ink)
                                    // Large tap target and typography
                                    "min-h-[88px]",
                                    isActive
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-black",
                                ].join(" ")
                            }
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl" aria-hidden>
                                    {w.icon}
                                </span>
                                <div className="flex-1">
                                    <div className="font-bold text-lg leading-tight">
                                        {w.title}
                                    </div>
                                    <div className="text-xs opacity-80">
                                        {w.description}
                                    </div>
                                </div>
                            </div>

                            {isActive && (
                                <div className="mt-3 text-xs">
                                    Set as current widget
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
