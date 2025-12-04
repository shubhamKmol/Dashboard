import { TextInput, Select } from "flowbite-react";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "blocked", label: "Blocked" },
];

const riskOptions = [
  { value: "all", label: "All risk levels" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function MerchantFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  risk,
  onRiskChange,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionToggle,
}) {
  return (
    <div className="flex flex-col gap-6 mb-4">

      {/* FILTER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Search */}
        <div className="w-full">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Search by name
          </label>
          <TextInput
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="w-full">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Status
          </label>
          <Select value={status} onChange={(e) => onStatusChange(e.target.value)}>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Risk */}
        <div className="w-full">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Risk
          </label>
          <Select value={risk} onChange={(e) => onRiskChange(e.target.value)}>
            {riskOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* SORT ROW */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">

        <div className="flex-1 sm:flex-none">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Sort by
          </label>
          <Select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
            className="w-full"
          >
            <option value="monthlyVolume">Monthly volume</option>
            <option value="chargebackRatio">Chargeback ratio</option>
          </Select>
        </div>

        <button
          type="button"
          onClick={onSortDirectionToggle}
          className={`h-10 px-4 rounded-lg border text-xs font-medium 
            sm:w-auto w-full 
          ${
            sortDirection === "asc"
              ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
              : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          }`}
        >
          {sortDirection === "asc" ? "Asc ↑" : "Desc ↓"}
        </button>

      </div>
    </div>
  );
}

