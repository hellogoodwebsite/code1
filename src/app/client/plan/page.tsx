"use client";
import { demoAssessments, demoClients } from "@/lib/demo-data";

export default function ClientPlanPage() {
  const client = demoClients[0];
  const assessment = demoAssessments[0];

  const downloadPlan = async () => {
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("Employment Readiness Plan", {
      x: 50,
      y: 740,
      size: 18,
      font,
      color: rgb(0.12, 0.12, 0.12)
    });
    page.drawText(`Client: ${client.firstName} ${client.lastName}`, {
      x: 50,
      y: 710,
      size: 12,
      font
    });
    page.drawText(`Readiness score: ${assessment.readiness.total}`, {
      x: 50,
      y: 690,
      size: 12,
      font
    });

    let cursor = 660;
    assessment.plan.forEach((item, index) => {
      page.drawText(`${index + 1}. ${item.title}`, {
        x: 50,
        y: cursor,
        size: 11,
        font
      });
      cursor -= 18;
      page.drawText(item.description, { x: 70, y: cursor, size: 9, font });
      cursor -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plan.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6">
      <section className="card space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Your plan</h2>
        <p className="text-sm text-slate-500">
          Review your next steps and download a copy to share.
        </p>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Readiness score</p>
            <p className="text-3xl font-semibold text-brand-700">
              {assessment.readiness.total}/100
            </p>
          </div>
          <button type="button" onClick={downloadPlan}>
            Download plan PDF
          </button>
        </div>
        <ul className="space-y-3">
          {assessment.plan.map((item) => (
            <li key={item.id} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
