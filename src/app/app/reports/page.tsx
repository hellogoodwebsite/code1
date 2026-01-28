"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const placementData = [
  { month: "Jan", placements: 2 },
  { month: "Feb", placements: 3 },
  { month: "Mar", placements: 1 },
  { month: "Apr", placements: 4 },
  { month: "May", placements: 2 },
  { month: "Jun", placements: 3 }
];

export default function ReportsPage() {
  return (
    <main className="space-y-6">
      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Reports</h2>
            <p className="text-sm text-slate-500">
              Filter outcomes and export funder-ready summaries.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="secondary" type="button">Export CSV</button>
            <button type="button">Export PDF</button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Clients served", value: "84" },
          { label: "Job-ready", value: "46" },
          { label: "Placements", value: "14" },
          { label: "Avg wage", value: "$21.40" },
          { label: "30-day retention", value: "78%" },
          { label: "90-day retention", value: "62%" }
        ].map((metric) => (
          <div key={metric.label} className="card">
            <p className="text-xs uppercase text-slate-400">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <section className="card space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Placements over time
          </h3>
          <p className="text-sm text-slate-500">
            Monthly placements across programs.
          </p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="placements" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
