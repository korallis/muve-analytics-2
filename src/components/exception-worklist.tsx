"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { assuranceExceptions, type ExceptionStatus } from "@/lib/actions/exceptions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const filters = ["All", "Visit", "Medication", "Incident", "Staffing", "Review"] as const;

export function ExceptionWorklist() {
  const [domain, setDomain] = useState<(typeof filters)[number]>("All");
  const [statuses, setStatuses] = useState<Record<string, ExceptionStatus>>(() => Object.fromEntries(assuranceExceptions.map((item) => [item.id, item.status])));
  const visible = useMemo(() => assuranceExceptions.filter((item) => domain === "All" || item.domain === domain), [domain]);

  function advance(id: string) {
    setStatuses((current) => {
      const status = current[id];
      const next: ExceptionStatus = status === "New" ? "Acknowledged" : status === "Acknowledged" || status === "Reopened" ? "Resolved" : "Reopened";
      return { ...current, [id]: next };
    });
  }

  return (
    <Card aria-labelledby="exception-heading">
      <CardHeader><div><CardTitle id="exception-heading">Unified exception worklist</CardTitle><CardDescription>Duplicate signals are grouped without hiding their underlying records.</CardDescription></div></CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2" aria-label="Filter exceptions">
          {filters.map((filter) => <Button key={filter} variant={domain === filter ? "default" : "outline"} onClick={() => setDomain(filter)}>{filter}</Button>)}
        </div>
        <div className="space-y-3">
          {visible.map((item) => {
            const status = statuses[item.id];
            return (
              <article key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap gap-2"><Badge tone={item.severity === "Critical" ? "danger" : item.severity === "High" ? "warning" : "neutral"}>{item.severity}</Badge><Badge tone="info">{item.domain}</Badge><Badge tone={status === "Resolved" ? "success" : "warning"}>{status}</Badge></div>
                    <h3 className="mt-2 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.service} · open {item.age} · {item.underlyingRecords.length} underlying record{item.underlyingRecords.length === 1 ? "" : "s"}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.underlyingRecords.join(" · ")} {item.actionId ? `· linked ${item.actionId}` : "· no action assigned"}</p>
                  </div>
                  <Button variant="outline" onClick={() => advance(item.id)}><RotateCcw className="size-4" aria-hidden="true" />{status === "New" ? "Acknowledge" : status === "Resolved" ? "Reopen" : "Resolve"}</Button>
                </div>
              </article>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
