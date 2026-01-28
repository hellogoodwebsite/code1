import { StatusBadge } from "@/components/StatusBadge";
import { demoAssessments, demoClients, demoPlacements } from "@/lib/demo-data";

export default function ClientProfilePage({
  params
}: {
  params: { id: string };
}) {
  const client = demoClients.find((item) => item.id === params.id) ?? demoClients[0];
  const assessment = demoAssessments.find((item) => item.clientId === client.id);
  const placement = demoPlacements.find((item) => item.clientId === client.id);

  return (
    <main className="space-y-6">
      <section className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {client.firstName} {client.lastName}
            </h2>
            <p className="text-sm text-slate-500">Preferred language: {client.preferredLanguage}</p>
          </div>
          <StatusBadge label={client.status} />
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div>
            <p className="text-xs uppercase text-slate-400">Email</p>
            <p>{client.email ?? "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">Phone</p>
            <p>{client.phone ?? "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">Assigned worker</p>
            <p>{client.assignedWorker}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Readiness score</h3>
          <p className="text-3xl font-semibold text-brand-700">
            {assessment?.readiness.total ?? 0}/100
          </p>
          <div className="grid gap-2 text-sm text-slate-600">
            <p>Language: {assessment?.readiness.subscoreLanguage ?? 0}/25</p>
            <p>Experience: {assessment?.readiness.subscoreExperience ?? 0}/25</p>
            <p>Credentials: {assessment?.readiness.subscoreCredentials ?? 0}/25</p>
            <p>Job search: {assessment?.readiness.subscoreJobSearch ?? 0}/25</p>
          </div>
        </div>

        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Next-step plan</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {assessment?.plan.map((item) => (
              <li key={item.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Placements</h3>
          {placement ? (
            <div className="space-y-2 text-sm text-slate-600">
              <p>{placement.jobTitle} at {placement.employerName}</p>
              <p>Start date: {placement.startDate}</p>
              <p>Wage: ${placement.wageHourly}/hr</p>
              <div className="flex gap-2">
                <StatusBadge label={placement.retention30 ? "30-day retained" : "30-day pending"} />
                <StatusBadge label={placement.retention90 ? "90-day retained" : "90-day pending"} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No placements recorded yet.</p>
          )}
        </div>
        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Interactions</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold text-slate-800">Workshop attendance</p>
              <p>Attended resume workshop on 2024-05-12.</p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold text-slate-800">1:1 meeting</p>
              <p>Reviewed intake goals and next steps.</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
