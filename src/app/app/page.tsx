import { ClientAttentionList } from "@/components/ClientAttentionList";
import { MetricCard } from "@/components/MetricCard";
import { demoAssessments, demoClients, demoPrograms } from "@/lib/demo-data";

export default function DashboardPage() {
  const attentionClients = demoClients
    .map((client) => {
      const assessment = demoAssessments.find(
        (item) => item.clientId === client.id
      );
      return {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        readinessScore: assessment?.readiness.total ?? 0,
        statusLabel: client.status,
        programName:
          demoPrograms.find((program) => program.id === client.programId)?.name ??
          "Unassigned",
        lastInteractionDays: client.lastInteractionDays
      };
    })
    .filter((client) => client.lastInteractionDays >= 30 || client.readinessScore < 50);

  return (
    <main className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Clients Served (30d)"
          value="24"
          description="New intakes across programs"
          trend="up"
        />
        <MetricCard
          title="Job-ready"
          value="58%"
          description="Readiness score ≥ 70"
          trend="neutral"
        />
        <MetricCard
          title="Placements (Quarter)"
          value="9"
          description="3 pending 30-day retention checks"
          trend="up"
        />
      </section>

      <section className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Clients needing attention
            </h2>
            <p className="text-sm text-slate-500">
              No interaction in 30+ days or readiness below 50.
            </p>
          </div>
          <button className="secondary" type="button">
            View all clients
          </button>
        </div>
        <ClientAttentionList clients={attentionClients} />
      </section>
    </main>
  );
}
