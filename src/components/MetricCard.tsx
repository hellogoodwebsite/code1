import clsx from "clsx";

type MetricCardProps = {
  title: string;
  value: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
};

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-2xl font-semibold text-slate-900">{value}</span>
        {trend && (
          <span
            className={clsx(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              trend === "up" && "bg-emerald-100 text-emerald-700",
              trend === "down" && "bg-rose-100 text-rose-700",
              trend === "neutral" && "bg-slate-100 text-slate-600"
            )}
          >
            {trend === "up" && "Improving"}
            {trend === "down" && "Needs focus"}
            {trend === "neutral" && "Stable"}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      )}
    </div>
  );
}
