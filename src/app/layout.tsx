import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employment Readiness & Placement Platform",
  description: "ERPP MVP for non-profits in Canada"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                ERPP Platform
              </p>
              <h1 className="text-xl font-semibold">Employment Readiness & Placement</h1>
            </div>
            <nav className="flex gap-3 text-sm">
              <a className="text-slate-600 hover:text-brand-700" href="/">
                Home
              </a>
              <a className="text-slate-600 hover:text-brand-700" href="/app">
                Staff
              </a>
              <a className="text-slate-600 hover:text-brand-700" href="/client/intake">
                Client Intake
              </a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
