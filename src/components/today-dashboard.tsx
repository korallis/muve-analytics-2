import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AskMuvePanel } from "@/components/ask-muve-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Open priority actions", value: "7", change: "2 due today", tone: "danger" as const, icon: ShieldAlert },
  { label: "Visit delivery", value: "98.4%", change: "+0.8 pp", tone: "success" as const, icon: TrendingUp },
  { label: "Medication exceptions", value: "3", change: "−4 vs prior day", tone: "warning" as const, icon: TrendingDown },
  { label: "Evidence coverage", value: "82%", change: "6 statements need review", tone: "info" as const, icon: Database },
];

const priorities = [
  {
    risk: "Critical",
    tone: "danger" as const,
    title: "Medication omission requires clinical review",
    detail: "Rose House · Person RH-014 · recorded 08:12",
    owner: "Clinical lead",
    due: "10:30 today",
  },
  {
    risk: "High",
    tone: "warning" as const,
    title: "Safeguarding follow-up has no recorded outcome",
    detail: "Oak View · incident INC-2481 · open for 18 hours",
    owner: "Safeguarding lead",
    due: "12:00 today",
  },
  {
    risk: "High",
    tone: "warning" as const,
    title: "Two late night visits show a repeated staffing pattern",
    detail: "North Supported Living · 2 people affected",
    owner: "Service manager",
    due: "16:00 today",
  },
];

const assurance = [
  { label: "Safe", value: 88, status: "Strong" },
  { label: "Effective", value: 76, status: "Adequate" },
  { label: "Caring", value: 69, status: "Adequate" },
  { label: "Responsive", value: 61, status: "Weak" },
  { label: "Well-led", value: 81, status: "Strong" },
];

export function TodayDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-800">Monday 21 July</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Good morning, Lee</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Seven items need attention across your services. Two are new since the previous briefing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
          Data current to 09:42 · 8 minutes ago
        </div>
      </header>

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Today summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                    <span className="grid size-9 place-items-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-bold tracking-tight">{metric.value}</p>
                  <Badge tone={metric.tone} className="mt-3">{metric.change}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <Card aria-labelledby="priority-heading">
          <CardHeader>
            <div>
              <CardTitle id="priority-heading">Priority worklist</CardTitle>
              <CardDescription>Ranked by safety, regulatory deadline and time open.</CardDescription>
            </div>
            <Link href="/operations" className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-800 hover:underline">
              View all <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorities.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/70">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <Badge tone={item.tone}>{item.risk}</Badge>
                      <h3 className="mt-2 font-semibold leading-6 text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{item.detail}</p>
                    </div>
                    <Button variant="outline" className="shrink-0" aria-label={`Review: ${item.title}`}>Review</Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><CircleAlert className="size-3.5" aria-hidden="true" />{item.owner}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />Due {item.due}</span>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card id="ask-muve" aria-labelledby="ask-heading" className="overflow-hidden border-violet-200 bg-gradient-to-b from-violet-50 to-white">
          <CardContent className="p-6">
            <AskMuvePanel />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card aria-labelledby="assurance-heading">
          <CardHeader>
            <div>
              <CardTitle id="assurance-heading">Assurance by key question</CardTitle>
              <CardDescription>Internal assurance only — not a predicted CQC rating.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {assurance.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="text-slate-500">{item.status} · {item.value}% evidence coverage</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="meter" aria-label={`${item.label} evidence coverage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.value}>
                  <div className="h-full rounded-full bg-cyan-600" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/quality-governance">Open quality statement matrix</Link>
            </Button>
          </CardContent>
        </Card>

        <Card aria-labelledby="actions-heading">
          <CardHeader>
            <div>
              <CardTitle id="actions-heading">Action progress</CardTitle>
              <CardDescription>Current assurance cycle · 1–31 July</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-emerald-50 p-4"><p className="text-2xl font-bold text-emerald-800">19</p><p className="mt-1 text-xs text-emerald-900">Completed</p></div>
              <div className="rounded-xl bg-amber-50 p-4"><p className="text-2xl font-bold text-amber-800">7</p><p className="mt-1 text-xs text-amber-900">Open</p></div>
              <div className="rounded-xl bg-rose-50 p-4"><p className="text-2xl font-bold text-rose-800">2</p><p className="mt-1 text-xs text-rose-900">Overdue</p></div>
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold">Next governance review</p>
              <p className="mt-1 text-sm text-slate-500">Thursday 24 July · 10:00</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">Three action owners still need to attach completion evidence.</p>
            </div>
            <Button asChild variant="outline" className="mt-4 w-full"><Link href="/actions">Open Action Centre</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
