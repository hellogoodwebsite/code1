import { StatusBadge } from "@/components/StatusBadge";
import { demoAssessments, demoClients, demoPrograms } from "@/lib/demo-data";

export default function ClientsPage() {
  const rows = demoClients.map((client) => {
    const assessment = demoAssessments.find(
      (item) => item.clientId === client.id
    );
    return {
      id: client.id,
      name: `${client.firstName} ${client.lastName}`,
      status: client.status,
      program:
        demoPrograms.find((program) => program.id === client.programId)?.name ??
        "Unassigned",
      readiness: assessment?.readiness.total ?? 0,
      assigned: client.assignedWorker
    };
  });

  return (
    <main className="space-y-6">
      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Clients</h2>
            <p className="text-sm text-slate-500">
              Search, filter, and manage client caseloads.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="secondary" type="button">
              Filters
            </button>
            <a href="/app/clients/new">New client</a>
          </div>
        </div>
      </section>

      <section className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-3">Client</th>
              <th className="px-3 py-3">Program</th>
              <th className="px-3 py-3">Assigned</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Readiness</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-3 py-3 font-medium text-slate-900">
                  {row.name}
                </td>
                <td className="px-3 py-3 text-slate-600">{row.program}</td>
                <td className="px-3 py-3 text-slate-600">{row.assigned}</td>
                <td className="px-3 py-3">
                  <StatusBadge label={row.status} />
                </td>
                <td className="px-3 py-3 text-slate-600">{row.readiness}</td>
                <td className="px-3 py-3">
                  <a
                    className="text-brand-700 hover:underline"
                    href={`/app/clients/${row.id}`}
                  >
                    View profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
