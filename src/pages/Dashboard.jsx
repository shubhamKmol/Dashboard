// src/pages/Dashboard.jsx
import StatsCards from "../components/dashboard/StatsCards";
import Chart from "../components/dashboard/Charts";
import CountryPieChart from "../components/dashboard/CountryPieChart";
import StatusChart from "../components/dashboard/StatusChart";

export default function Dashboard({ merchants = [], isLoading }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Overview of merchant performance and risk.
        </p>
      </div>

      {/* 3 summary stats */}
      <StatsCards merchants={merchants} isLoading={isLoading} />

      {/* Separate containers for each chart */}
      {/* Separate containers for each chart */}
      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {/* Bar + status chart card */}
        <div className="rounded-xl border border-slate-600 bg-slate-950/90 p-4 flex flex-col">
          <h2 className="text-sm font-medium text-slate-200">
            Volume by risk level
          </h2>

          {/* body: take remaining height and space charts nicely */}
          <div className="mt-3 flex-1 flex flex-col justify-between">
            <Chart merchants={merchants} isLoading={isLoading} />

            <div className="mt-4">
              <h2 className="text-sm font-medium text-slate-200 mb-2">
                Status for merchants
              </h2>
              <StatusChart merchants={merchants} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Pie chart card */}
        <div className="rounded-xl border border-slate-600 bg-slate-950/90 p-4 flex flex-col">
          <h2 className="mb-3 text-sm font-medium text-slate-200">
            Merchants by country (%)
          </h2>

          {/* body: center pie vertically */}
          <div className="flex-1 flex items-center justify-center">
            <CountryPieChart merchants={merchants} isLoading={isLoading} />
          </div>
        </div>
      </div>

    </div>
  );
}
