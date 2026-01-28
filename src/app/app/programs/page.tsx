import { demoPrograms } from "@/lib/demo-data";

export default function ProgramsPage() {
  return (
    <main className="space-y-6">
      <section className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Programs</h2>
            <p className="text-sm text-slate-500">
              Manage employment and training programs.
            </p>
          </div>
          <button type="button">New program</button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demoPrograms.map((program) => (
          <article key={program.id} className="card space-y-2">
            <h3 className="text-base font-semibold text-slate-900">
              {program.name}
            </h3>
            <p className="text-sm text-slate-600">{program.description}</p>
            <p className="text-xs uppercase text-slate-400">
              {program.isActive ? "Active" : "Inactive"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
