export default function HomePage() {
  return (
    <main className="space-y-8">
      <section className="card grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Employment Readiness & Placement Platform (ERPP)
          </h2>
          <p className="text-sm text-slate-600">
            ERPP is a dual-sided platform for non-profit staff and clients. It
            streamlines intake, readiness scoring, personalized plans, placement
            tracking, and funder-ready reporting.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="secondary" href="/auth/sign-in">
              Staff sign in
            </a>
            <a href="/client/intake">Client intake</a>
          </div>
        </div>
        <div className="rounded-2xl bg-brand-50 p-5 text-sm text-slate-700">
          <p className="font-semibold">Built for non-profits in Canada</p>
          <ul className="mt-3 list-disc space-y-2 pl-4">
            <li>Mobile-first intake with plain language prompts.</li>
            <li>Transparent readiness scoring with shared next steps.</li>
            <li>Fast staff workflows and role-based access.</li>
            <li>Placement and retention tracking in one place.</li>
          </ul>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Intake & Assess",
            body: "Capture key details once, then generate readiness scores and plans automatically."
          },
          {
            title: "Plan & Track",
            body: "Guide clients with a checklist, note interactions, and log placements."
          },
          {
            title: "Report",
            body: "Export outcome metrics and retention results for funders."
          }
        ].map((item) => (
          <article key={item.title} className="card">
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
