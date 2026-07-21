import { Bot, CalendarClock, Gauge, ScanSearch } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AskMuvePanel } from "@/components/ask-muve-panel";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tools = ["get_metric", "compare_periods", "list_exceptions", "get_record", "search_evidence", "get_action_status", "draft_action", "draft_assurance_narrative"];

export default function AiGovernancePage() {
  return (
    <AppShell active="today">
      <div className="space-y-8">
        <header><p className="text-sm font-semibold text-violet-800">AI governance</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Ask Muve control centre</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Deterministic metrics first, cited explanation second. The model cannot query free SQL, submit regulatory material or change care records.</p></header>
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-violet-200 bg-violet-50/50"><CardContent className="p-6"><AskMuvePanel /></CardContent></Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Bot, "Allowlisted tools", `${tools.length} Zod-validated semantic tools; caller scope reauthorised per invocation.`],
              [Gauge, "Gateway budgets", "Feature tags, approved provider routes and monthly caps; zero AWS credentials."],
              [CalendarClock, "Narratives and digests", "Prompt-hash caching, graceful fallback, weekly digest and underlying-data invalidation."],
              [ScanSearch, "Anomaly review", "Deterministic incident, DSO and training-change detection with cited explanation."],
            ].map(([Icon, title, detail]) => {
              const ControlIcon = Icon;
              return <Card key={String(title)}><CardContent className="p-5"><ControlIcon className="size-5 text-violet-700" aria-hidden="true" /><h2 className="mt-3 font-semibold">{String(title)}</h2><p className="mt-2 text-sm leading-5 text-slate-600">{String(detail)}</p><Badge tone="success" className="mt-3">Human controlled</Badge></CardContent></Card>;
            })}
          </div>
        </div>
        <Card><CardHeader><div><CardTitle>Approved semantic tool surface</CardTitle><CardDescription>No production text-to-SQL path exists.</CardDescription></div></CardHeader><CardContent className="flex flex-wrap gap-2">{tools.map((name) => <code key={name} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs">{name}</code>)}</CardContent></Card>
        <CapabilityEvidence route="/ai-governance" title="AI-first delivery controls" />
      </div>
    </AppShell>
  );
}
