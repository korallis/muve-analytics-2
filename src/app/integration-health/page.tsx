import { CheckCircle2, CircleAlert, DatabaseZap } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { integrationHealth } from "@/lib/integrations/health";

export default function IntegrationHealthPage() {
  return (
    <AppShell active="evidence">
      <div className="space-y-6">
        <header>
          <p className="text-sm font-semibold text-cyan-800">Administration</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Integration health</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Source watermarks, serving freshness and last-good promotion state in one place.</p>
        </header>
        <Card>
          <CardHeader><div><CardTitle>Connected data services</CardTitle><CardDescription>Failed loads retain the last reconciled dataset and raise a visible warning.</CardDescription></div></CardHeader>
          <CardContent className="divide-y divide-slate-100">
            {integrationHealth.map((integration) => {
              const healthy = integration.status === "healthy";
              return (
                <article key={integration.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(180px,0.7fr)_minmax(0,1.3fr)_auto] md:items-center">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-slate-100"><DatabaseZap className="size-4" aria-hidden="true" /></span>
                    <div><h2 className="text-sm font-semibold">{integration.name}</h2><p className="text-xs text-slate-500">{integration.id}</p></div>
                  </div>
                  <div><p className="text-sm text-slate-600">{integration.detail}</p><p className="mt-1 text-xs text-slate-500">Watermark: {integration.watermark ?? "Not available"} · Loaded: {integration.loaded_at ?? "Not yet"}</p></div>
                  <Badge tone={healthy ? "success" : integration.status === "stale" ? "warning" : "neutral"}>
                    {healthy ? <CheckCircle2 className="size-3" aria-hidden="true" /> : <CircleAlert className="size-3" aria-hidden="true" />}{integration.status}
                  </Badge>
                </article>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
