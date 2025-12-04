// src/components/dashboard/StatsCards.jsx

function StatSkeleton() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="h-3 w-24 rounded bg-slate-700 mb-3 animate-pulse" />
      <div className="h-6 w-16 rounded bg-slate-600 animate-pulse" />
    </div>
  );
}

export default function StatsCards({ merchants = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  const totalMerchants = merchants.length || 0;
  const totalVolume = merchants.reduce(
    (sum, m) => sum + (m.monthlyVolume || 0),
    0
  );
  const activeMerchants = merchants.filter(
    (m) => m.status === "active"
  ).length;
  const avgChargeback =
    totalMerchants === 0
      ? 0
      : merchants.reduce(
          (sum, m) => sum + (m.chargebackRatio || 0),
          0
        ) / totalMerchants;

  const stats = [
    {
      label: "Total monthly volume",
      value: totalVolume.toLocaleString(),
      helper: "Across all merchants",
    },
    {
      label: "Active merchants",
      value: activeMerchants,
      helper: `${totalMerchants || 0} total`,
    },
    {
      label: "Avg chargeback ratio",
      value: `${avgChargeback.toFixed(2)}%`,
      helper: "Portfolio average",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {s.label}
          </p>
          <p className="mt-2 text-xl font-semibold text-slate-50">
            {s.value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{s.helper}</p>
        </div>
      ))}
    </div>
  );
}
