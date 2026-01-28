import clsx from "clsx";

type StatusBadgeProps = {
  label: string;
  tone?: "neutral" | "good" | "warning" | "info";
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        tone === "neutral" && "bg-slate-100 text-slate-600",
        tone === "good" && "bg-emerald-100 text-emerald-700",
        tone === "warning" && "bg-amber-100 text-amber-700",
        tone === "info" && "bg-brand-100 text-brand-700"
      )}
    >
      {label}
    </span>
  );
}
