import { CheckCircle2, Cloud, FlaskConical, GitPullRequest, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const checks = [
  ["Preview isolation", "Vercel preview + anonymised fixture database; no production PII", "Green"],
  ["Pipeline contracts", "Schema, uniqueness, relationships, row counts, null coverage and invariants", "Green"],
  ["Semantic tests", "Compiled metric definitions reconcile against fixture marts", "Green"],
  ["Journey and a11y", "Persona journeys plus axe scans; serious and critical violations fail", "Green"],
  ["AI evaluations", "Citations, unsupported claims, access leakage, prompt injection and unsafe recommendations", "Green"],
  ["Cutover parity", "Fixture shadow run classifies exact parity, correction, source limitation or defect", "Green"],
];

export default function DeliveryReadinessPage() {
  return (
    <AppShell active="evidence">
      <div className="space-y-8">
        <header><p className="text-sm font-semibold text-cyan-800">Platform delivery</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Release readiness</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Preview isolation, contract tests, browser journeys, accessibility and cutover controls in one release gate.</p></header>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Release summary">
          {[[GitPullRequest, "57/57", "Story gates"], [FlaskConical, "10", "Vitest checks"], [ShieldCheck, "0", "Serious axe issues"], [Cloud, "Ready", "Vercel production"]].map(([Icon, value, label]) => { const SummaryIcon = Icon; return <Card key={String(label)}><CardContent className="p-5"><SummaryIcon className="size-5 text-cyan-800" aria-hidden="true" /><p className="mt-4 text-3xl font-bold">{String(value)}</p><p className="mt-1 text-sm text-slate-500">{String(label)}</p></CardContent></Card>; })}
        </section>
        <Card><CardHeader><div><CardTitle>Full-suite release gate</CardTitle><CardDescription>Each result is reproducible from committed fixtures and scripts.</CardDescription></div></CardHeader><CardContent className="space-y-3">{checks.map(([name, detail, status]) => <div key={name} className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" /><div><h2 className="text-sm font-semibold">{name}</h2><p className="mt-1 text-sm text-slate-600">{detail}</p></div></div><Badge tone="success">{status}</Badge></div>)}</CardContent></Card>
        <CapabilityEvidence route="/delivery-readiness" title="Platform and delivery controls" />
      </div>
    </AppShell>
  );
}
