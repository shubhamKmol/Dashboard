// src/components/dashboard/CountryPieChart.jsx
import { useMemo } from "react";

const COLORS = [
    "#60a5fa", // blue-400
    "#22c55e", // green-500
    "#f97316", // orange-500
    "#eab308", // yellow-500
    "#a855f7", // purple-500
    "#f97373", // red-400
];

export default function CountryPieChart({ merchants = [],error, isLoading }) {
    const data = useMemo(() => {
        const counts = merchants.reduce((acc, m) => {
            const country = m.country || "Unknown";
            acc[country] = (acc[country] || 0) + 1;
            return acc;
        }, {});

        const entries = Object.entries(counts).map(([country, count]) => ({
            country,
            count,
        }));

        const total = entries.reduce((sum, item) => sum + item.count, 0);
        if (!total) return [];

        return entries.map((item, idx) => ({
            ...item,
            percent: (item.count / total) * 100,
            color: COLORS[idx % COLORS.length],
        }));
    }, [merchants]);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="h-10 w-10 rounded-full border-2 border-slate-600 border-t-slate-300 animate-spin" />
            </div>
        );
    }
    if (error) {
    return (
      <div className="text-red-400 bg-red-900/40 border border-red-600 p-4 rounded-lg">
        Something went wrong loading dashboard data.
      </div>
    );
  }

    if (!data.length) {
        return (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                Not enough data to calculate country distribution.
            </div>
        );
    }

    const radius = 75;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Bigger donut pie */}
            <div className="flex items-center justify-center lg:w-[70%] w-full">
                <svg
                    className="w-full max-w-[320px] aspect-square"
                    viewBox="0 0 180 180"
                >
                    <g transform="translate(90,90)">
                        {data.map((slice) => {
                            const sliceLength =
                                (slice.percent / 100) * circumference;
                            const circle = (
                                <circle
                                    key={slice.country}
                                    r={radius}
                                    fill="transparent"
                                    stroke={slice.color}
                                    strokeWidth="28"
                                    strokeDasharray={`${sliceLength} ${circumference}`}
                                    strokeDashoffset={-offset}
                                    strokeLinecap="butt"
                                />
                            );
                            offset += sliceLength;
                            return circle;
                        })}
                        {/* inner hole */}
                        <circle r={25} fill="#020617" />
                        <text
                            textAnchor="middle"
                            dy="0.3em"
                            className="fill-slate-100 text-[11px]"
                        >
                            {merchants.length} merchants
                        </text>
                    </g>
                </svg>
            </div>

            {/* Legend */}
            <div className="lg:w-[30%] w-full space-y-2">
                {data.map((slice) => (
                    <div
                        key={slice.country}
                        className="flex items-center justify-between text-xs"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: slice.color }}
                            />
                            <span className="text-slate-200">{slice.country}</span>
                        </div>

                        <span className="text-slate-400">
                            {slice.count} • {slice.percent.toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
