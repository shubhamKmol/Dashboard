// src/components/dashboard/StatusChart.jsx

export default function StatusChart({ merchants = [],error, isLoading }) {
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


    // Aggregate count by normalized status
    const data = merchants.reduce((acc, m) => {
        const status = (m.status || "").toLowerCase();
        if (!status) return acc;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartData = [
        { key: "active", label: "Active", color: "#22c55e" },  // green
        { key: "paused", label: "Paused", color: "#f59e0b" },  // amber
        { key: "blocked", label: "Blocked", color: "#ef4444" } // red
    ];

    const values = chartData.map((d) => data[d.key] || 0);
    const maxValue = Math.max(...values, 1); // avoid 0

    return (
        // same layout as Chart.jsx
        <div className="min-h-[140px] w-full flex items-center">
            <div className="w-full space-y-3">
                {chartData.map((item) => {
                    const value = data[item.key] || 0;
                    const widthPercent = (value / maxValue) * 100;

                    return (
                        <div key={item.key} className="flex items-center gap-3">
                            {/* Label */}
                            <span className="text-xs text-slate-300 w-20 text-right">
                                {item.label}
                            </span>

                            {/* Bar track */}
                            <div className="flex-1 h-8 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${widthPercent}%`,
                                        backgroundColor: item.color,
                                        opacity: value ? 1 : 0.25,
                                    }}
                                />
                            </div>

                            {/* Value (count) */}
                            <span className="text-xs text-slate-400 w-8 text-left">
                                {value || "-"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
