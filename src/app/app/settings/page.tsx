export default function SettingsPage() {
  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900">Organization settings</h2>
        <p className="text-sm text-slate-500">
          Manage organization profile, staff access, and export permissions.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Organization</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Organization name: Harbour Community Services</p>
            <p>Primary contact: admin@harbour.org</p>
          </div>
        </div>
        <div className="card space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Users & roles</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Jordan Lee — Admin</li>
            <li>Priya Shah — Case Worker</li>
            <li>Sam Torres — Read-Only</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
