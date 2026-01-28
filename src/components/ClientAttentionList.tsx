import { StatusBadge } from "@/components/StatusBadge";
import type { ClientSummary } from "@/types";

const readinessTone = (score: number) => {
  if (score >= 70) return "good";
  if (score >= 50) return "info";
  return "warning";
};

export function ClientAttentionList({ clients }: { clients: ClientSummary[] }) {
  return (
    <div className="space-y-3">
      {clients.map((client) => (
        <div
          key={client.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
        >
          <div>
            <p className="font-semibold text-slate-900">
              {client.firstName} {client.lastName}
            </p>
            <p className="text-xs text-slate-500">
              {client.programName} · Last touch {client.lastInteractionDays}d
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge
              label={`Readiness ${client.readinessScore}`}
              tone={readinessTone(client.readinessScore)}
            />
            <StatusBadge label={client.statusLabel} tone="neutral" />
          </div>
        </div>
      ))}
    </div>
  );
}
