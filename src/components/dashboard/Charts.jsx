// src/components/dashboard/Chart.jsx

export default function Chart({ merchants = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="h-10 w-10 rounded-full border-2 border-slate-600 border-t-slate-300 animate-spin" />
      </div>
    );
  }

  // Normalize riskLevel to lowercase so your data matches chart keys
  const data = merchants.reduce((acc, m) => {
    const risk = (m.riskLevel || "").toLowerCase(); 
    if (!risk) return acc;
    acc[risk] = (acc[risk] || 0) + (m.monthlyVolume || 0);
    return acc;
  }, {});

  const chartData = [
    { key: "low", label: "Low risk", color: "#22c55e" }, 
    { key: "medium", label: "Medium risk", color: "#f97316" },
    { key: "high", label: "High risk", color: "#ef4444" },
  ];

  const values = chartData.map((d) => data[d.key] || 0);
  const maxValue = Math.max(...values, 1); // avoid divide-by-zero

  const formatK = (v) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
    return v;
  };

  return (
    <div className="h-40 w-full flex items-center">
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

            {/* Bar container */}
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

            {/* Value label */}
            <span className="text-xs text-slate-400 w-12 text-left">
              {value ? formatK(value) : "-"}
            </span>
          </div>
        );
      })}
    </div>
    </div>
  );
}
