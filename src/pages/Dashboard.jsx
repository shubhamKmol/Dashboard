// src/pages/Dashboard.jsx
import StatsCards from "../components/dashboard/StatsCards";
import Chart from "../components/dashboard/Charts";
import CountryPieChart from "../components/dashboard/CountryPieChart";
import StatusChart from "../components/dashboard/StatusChart";

export default function Dashboard({ merchants = [], error,isLoading }) {
  
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Overview of merchant performance and risk.
          </p>
        </div>
      </div>

      {/* Stats  cards*/}
      <StatsCards merchants={merchants} error={error} isLoading={isLoading} />

      {/* Charts section */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* bar chart card */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 flex flex-col">
          <h2 className="text-sm font-medium text-slate-200">
            Volume by risk level
          </h2>

          <div className="mt-4">
            <Chart merchants={merchants} error={error} isLoading={isLoading} />
          </div>

          <h2 className="text-sm font-medium text-slate-200 mt-6 mb-2">
            Status for merchants
          </h2>
          <StatusChart merchants={merchants} error={error} isLoading={isLoading} />
        </div>

        {/* pie chart card */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 flex flex-col">
          <h2 className="text-sm font-medium text-slate-200 mb-3">
            Merchants by country (%)
          </h2>
          <CountryPieChart merchants={merchants}error={error}  isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

