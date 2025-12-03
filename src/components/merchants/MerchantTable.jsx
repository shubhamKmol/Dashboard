// src/components/merchants/MerchantTable.jsx

function StatusBadge({ status }) {
  const map = {
    active: "bg-emerald-100 text-emerald-700",
    paused: "bg-amber-100 text-amber-700",
    blocked: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        map[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function RiskBadge({ riskLevel }) {
  const map = {
    low: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    medium: "bg-amber-50 text-amber-700 border border-amber-100",
    high: "bg-red-50 text-red-700 border border-red-100",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        map[riskLevel] ||
        "bg-slate-50 text-slate-700 border border-slate-100"
      }`}
    >
      {riskLevel}
    </span>
  );
}

export default function MerchantTable({ merchants, isLoading, onRowClick }) {
  // Target visual rows per page (match your pageSize in Merchants.jsx)
  const FIXED_ROWS = 10;

  let effectiveRows = merchants;
  let showNoDataRow = false;

  if (!isLoading && merchants.length === 0) {
    // We want header + one "no data" row, plus fillers to keep height
    showNoDataRow = true;
    effectiveRows = [];
  }

  const actualRowCount = isLoading
    ? FIXED_ROWS
    : showNoDataRow
    ? 1
    : effectiveRows.length;

  const fillerRows =
    actualRowCount < FIXED_ROWS ? FIXED_ROWS - actualRowCount : 0;

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-4 py-2 font-semibold text-slate-600">Name</th>
            <th className="px-4 py-2 font-semibold text-slate-600">Country</th>
            <th className="px-4 py-2 font-semibold text-slate-600">Status</th>
            <th className="px-4 py-2 font-semibold text-slate-600">
              Monthly volume
            </th>
            <th className="px-4 py-2 font-semibold text-slate-600">
              Chargeback %
            </th>
            <th className="px-4 py-2 font-semibold text-slate-600">
              Risk level
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Skeleton rows to fill fixed height
            [...Array(FIXED_ROWS)].map((_, i) => (
              <tr key={`skeleton-${i}`} className="border-b border-slate-100">
                <td colSpan={6} className="px-4 py-3">
                  <div className="h-6 w-full rounded bg-slate-200 animate-pulse" />
                </td>
              </tr>
            ))
          ) : showNoDataRow ? (
            <>
              <tr className="border-b border-slate-100">
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500 text-sm"
                >
                  No merchants found
                </td>
              </tr>
              {[...Array(fillerRows)].map((_, i) => (
                <tr
                  key={`filler-empty-${i}`}
                  className="border-b border-slate-50"
                >
                  <td colSpan={6} className="h-10" />
                </tr>
              ))}
            </>
          ) : (
            <>
              {effectiveRows.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                  onClick={() => onRowClick?.(m)}
                >
                  <td className="px-4 py-2 text-slate-800">{m.name}</td>
                  <td className="px-4 py-2 text-slate-700">{m.country}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    {m.monthlyVolume.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-slate-800">
                    {m.chargebackRatio.toFixed(1)}%
                  </td>
                  <td className="px-4 py-2">
                    <RiskBadge riskLevel={m.riskLevel} />
                  </td>
                </tr>
              ))}

              {/* Filler rows to preserve height */}
              {[...Array(fillerRows)].map((_, i) => (
                <tr
                  key={`filler-${i}`}
                  className="border-b border-slate-50"
                >
                  <td colSpan={6} className="h-10" />
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
