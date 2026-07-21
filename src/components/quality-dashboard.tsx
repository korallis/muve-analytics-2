import { AlertTriangle, ArrowRight, CheckCircle2, CircleHelp, FileCheck2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const domains = [
  { name: "Safe", statements: 8, strong: 5, adequate: 2, weak: 1, unknown: 0, coverage: 88 },
  { name: "Effective", statements: 6, strong: 2, adequate: 3, weak: 0, unknown: 1, coverage: 76 },
  { name: "Caring", statements: 5, strong: 2, adequate: 2, weak: 0, unknown: 1, coverage: 69 },
  { name: "Responsive", statements: 7, strong: 1, adequate: 3, weak: 2, unknown: 1, coverage: 61 },
  { name: "Well-led", statements: 8, strong: 4, adequate: 3, weak: 1, unknown: 0, coverage: 81 },
];

const evidenceCategories = [
  ["People’s experience", "68%", "Needs review"],
  ["Staff and leader feedback", "91%", "Current"],
  ["Partner feedback", "54%", "Gap"],
  ["Observation", "77%", "Current"],
  ["Processes", "94%", "Current"],
  ["Outcomes", "72%", "Needs review"],
];

export function QualityDashboard() {
  const totalStatements = domains.reduce((sum, domain) => sum + domain.statements, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-800">Quality & Governance</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Quality statement assurance</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Evidence, findings and actions across all {totalStatements} CQC Single Assessment Framework quality statements.
          </p>
        </div>
        <Button>Start governance review</Button>
      </header>

      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="flex gap-3 p-4 sm:items-center">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700 sm:mt-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-950">Internal assurance, not a predicted CQC rating</p>
            <p className="mt-1 text-sm leading-5 text-amber-900">Statuses combine approved evidence coverage, findings and actions. Unknown evidence is never treated as zero or complete.</p>
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="domains-heading">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 id="domains-heading" className="text-lg font-bold">Five key questions</h2>
            <p className="mt-1 text-sm text-slate-500">Correct statement distribution: 8 / 6 / 5 / 7 / 8.</p>
          </div>
          <Badge tone="info">34 statements</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {domains.map((domain) => (
            <Card key={domain.name}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold">{domain.name}</h3>
                  <span className="text-xs text-slate-500">{domain.statements} statements</span>
                </div>
                <p className="mt-5 text-3xl font-bold tracking-tight">{domain.coverage}%</p>
                <p className="mt-1 text-xs text-slate-500">evidence coverage</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100" role="meter" aria-label={`${domain.name} evidence coverage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={domain.coverage}>
                  <div className="h-full rounded-full bg-cyan-600" style={{ width: `${domain.coverage}%` }} />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div><dt className="text-slate-500">Strong</dt><dd className="font-bold text-emerald-700">{domain.strong}</dd></div>
                  <div><dt className="text-slate-500">Adequate</dt><dd className="font-bold text-cyan-800">{domain.adequate}</dd></div>
                  <div><dt className="text-slate-500">Weak</dt><dd className="font-bold text-rose-700">{domain.weak}</dd></div>
                  <div><dt className="text-slate-500">Unknown</dt><dd className="font-bold text-slate-600">{domain.unknown}</dd></div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card aria-labelledby="evidence-heading">
          <CardHeader>
            <div>
              <CardTitle id="evidence-heading">Evidence category coverage</CardTitle>
              <CardDescription>The six categories used in CQC assessment evidence collection.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-slate-100">
              {evidenceCategories.map(([name, coverage, status]) => (
                <li key={name} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {status === "Current" ? <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" /> : <CircleHelp className="size-4 text-amber-600" aria-hidden="true" />}
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-bold">{coverage}</span>
                    <span className="block text-xs text-slate-500">{status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card aria-labelledby="gaps-heading">
          <CardHeader>
            <div>
              <CardTitle id="gaps-heading">Priority assurance gaps</CardTitle>
              <CardDescription>Gaps ranked by evidence weakness and open risk.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <article className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
              <Badge tone="danger">Weak assurance</Badge>
              <h3 className="mt-2 text-sm font-semibold">Listening to and involving people</h3>
              <p className="mt-1 text-sm leading-5 text-slate-600">Partner feedback is out of date and two complaint actions remain open.</p>
            </article>
            <article className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <Badge tone="warning">Unknown evidence</Badge>
              <h3 className="mt-2 text-sm font-semibold">Equity in experiences and outcomes</h3>
              <p className="mt-1 text-sm leading-5 text-slate-600">No approved outcome breakdown is available for the current review period.</p>
            </article>
            <Button variant="outline" className="w-full">
              Open evidence register <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card aria-labelledby="snapshot-heading">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-100 text-cyan-900"><FileCheck2 className="size-5" aria-hidden="true" /></span>
            <div>
              <h2 id="snapshot-heading" className="font-semibold">Inspection workspace</h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">Freeze a cited evidence snapshot with metric versions and source watermarks.</p>
            </div>
          </div>
          <Button variant="outline">Create snapshot</Button>
        </CardContent>
      </Card>
    </div>
  );
}
