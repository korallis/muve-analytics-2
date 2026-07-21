import { AppShell } from "@/components/app-shell";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { metricRegistry, renderMetricValue, type MetricId } from "@/lib/metrics/registry";

export default function MetricGlossaryPage() {
  const metrics = Object.values(metricRegistry);
  return (
    <AppShell active="evidence">
      <div className="space-y-8">
        <header>
          <p className="text-sm font-semibold text-cyan-800">Metric governance</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Approved metric glossary</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">One definition feeds dashboards, exports and allowlisted AI tools. Historical snapshots retain the effective definition version.</p>
        </header>
        <div className="grid gap-4 xl:grid-cols-2">
          {metrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader>
                <div>
                  <div className="flex flex-wrap gap-2"><Badge tone="success">Approved</Badge><Badge tone="info">{metric.qualityQuestion}</Badge><Badge tone="neutral">v{metric.definitionVersion}</Badge></div>
                  <CardTitle className="mt-3">{metric.name}: {renderMetricValue(metric.id as MetricId)}</CardTitle>
                  <CardDescription>{metric.businessQuestion}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="font-semibold">Numerator</dt><dd className="mt-1 text-slate-600">{metric.numerator}</dd></div>
                  <div><dt className="font-semibold">Denominator</dt><dd className="mt-1 text-slate-600">{metric.denominator}</dd></div>
                  <div><dt className="font-semibold">Population / exclusions</dt><dd className="mt-1 text-slate-600">{metric.population}; {metric.exclusions}</dd></div>
                  <div><dt className="font-semibold">Source / grain</dt><dd className="mt-1 text-slate-600">{metric.sourceMart}; {metric.grain}</dd></div>
                  <div><dt className="font-semibold">Owner / approval</dt><dd className="mt-1 text-slate-600">{metric.owner}; {metric.approvedBy}</dd></div>
                  <div><dt className="font-semibold">Coverage rule</dt><dd className="mt-1 text-slate-600">{metric.nullCoverageRule}</dd></div>
                </dl>
                {metric.caveat ? <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-950"><strong>Caveat:</strong> {metric.caveat}</p> : null}
                <p className="mt-3 text-xs text-slate-500">Watermark 21 Jul 2026 09:34 · loaded 09:42 · effective {metric.effectiveFrom}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <CapabilityEvidence route="/metric-glossary" title="Metric governance controls" />
      </div>
    </AppShell>
  );
}
