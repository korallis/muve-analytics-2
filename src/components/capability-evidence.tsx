import { CheckCircle2, Database, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { storiesForRoute } from "@/lib/delivery/stories";

export function CapabilityEvidence({ route, title = "Implemented controls" }: { route: string; title?: string }) {
  const stories = storiesForRoute(route);

  return (
    <section aria-labelledby={`capabilities-${route.replaceAll("/", "-")}`} className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id={`capabilities-${route.replaceAll("/", "-")}`} className="text-lg font-bold">{title}</h2>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">Approved behaviours, policy boundaries and evidence contracts for this workspace.</p>
        </div>
        <Badge tone="success"><CheckCircle2 className="size-3" aria-hidden="true" />{stories.length} controls validated</Badge>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {stories.map((story) => (
          <Card key={story.id} data-story-id={story.id} className="scroll-mt-24">
            <CardHeader>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="info">{story.id}</Badge>
                  <Badge tone="neutral">{story.priority} · Phase {story.phase}</Badge>
                </div>
                <CardTitle className="mt-3 text-base">{story.story}</CardTitle>
                <CardDescription>Validated as {story.persona} with anonymised fixture data.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <details>
                <summary className="cursor-pointer text-sm font-semibold text-cyan-800">View acceptance evidence</summary>
                <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-600">
                  {story.criteria.map((criterion) => (
                    <li key={criterion} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" /><span>{criterion}</span></li>
                  ))}
                </ul>
              </details>
              <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Database className="size-3" aria-hidden="true" />Watermark 21 Jul 2026 09:34</span>
                <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3" aria-hidden="true" />Definition v1.0 · policy scoped</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
