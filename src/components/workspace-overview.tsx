import { ArrowRight, CheckCircle2, Clock3, Database, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type WorkspaceMetric = {
  label: string;
  value: string;
  detail: string;
  tone: "neutral" | "success" | "warning" | "danger" | "info";
};

export function WorkspaceOverview({
  eyebrow,
  title,
  description,
  metrics,
  queueTitle,
  queue,
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics: WorkspaceMetric[];
  queueTitle: string;
  queue: Array<{ title: string; detail: string; status: string; tone: WorkspaceMetric["tone"] }>;
}) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-800">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
        </div>
        <Button variant="outline"><Database className="size-4" aria-hidden="true" />View data lineage</Button>
      </header>

      <section aria-label={`${title} summary`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              <p className="mt-4 text-3xl font-bold tracking-tight">{metric.value}</p>
              <Badge tone={metric.tone} className="mt-3">{metric.detail}</Badge>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card aria-labelledby="queue-heading">
          <CardHeader>
            <div>
              <CardTitle id="queue-heading">{queueTitle}</CardTitle>
              <CardDescription>Approved exceptions in the current scope and period.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {queue.map((item) => (
                <li key={item.title} className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 gap-3">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                  <Badge tone={item.tone} className="self-start sm:self-auto">{item.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card aria-labelledby="cycle-heading">
          <CardHeader>
            <div>
              <CardTitle id="cycle-heading">Current assurance cycle</CardTitle>
              <CardDescription>Evidence and actions for 1–31 July.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4"><CheckCircle2 className="size-5 text-emerald-700" aria-hidden="true" /><div><p className="text-sm font-semibold">12 checks complete</p><p className="text-xs text-slate-500">All with reviewed evidence</p></div></div>
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4"><Clock3 className="size-5 text-amber-700" aria-hidden="true" /><div><p className="text-sm font-semibold">4 actions in progress</p><p className="text-xs text-slate-500">One due within 24 hours</p></div></div>
            <Button className="w-full">Open Action Centre <ArrowRight className="size-4" aria-hidden="true" /></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
