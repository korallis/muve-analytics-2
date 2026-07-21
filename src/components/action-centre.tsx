"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, UserRound } from "lucide-react";
import { assuranceActions, type AssuranceAction } from "@/lib/actions/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function tone(priority: AssuranceAction["priority"]) {
  return priority === "Critical" ? "danger" as const : priority === "High" ? "warning" as const : "neutral" as const;
}

export function ActionCentre() {
  const [actions, setActions] = useState(assuranceActions);

  function advance(id: string) {
    setActions((current) => current.map((action) => action.id === id
      ? { ...action, status: action.status === "Open" ? "In progress" : "Awaiting evidence" }
      : action));
  }

  return (
    <Card aria-labelledby="action-list-heading">
      <CardHeader>
        <div>
          <CardTitle id="action-list-heading">Assigned actions</CardTitle>
          <CardDescription>Signal → evidence → owner → due date → sign-off.</CardDescription>
        </div>
        <Badge tone="warning">{actions.filter((action) => action.status !== "Complete").length} open</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <article key={action.id} className="rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2"><Badge tone={tone(action.priority)}>{action.priority}</Badge><span className="text-xs text-slate-500">{action.id}</span></div>
                <h2 className="mt-2 font-semibold">{action.title}</h2>
                <p className="mt-1 text-sm text-slate-500">Raised from {action.source}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1"><UserRound className="size-3.5" aria-hidden="true" />{action.owner}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" aria-hidden="true" />Due {new Date(action.dueDate).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })}</span>
                  <span className="inline-flex items-center gap-1"><CheckCircle2 className="size-3.5" aria-hidden="true" />{action.status}</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => advance(action.id)} disabled={action.status === "Awaiting evidence" || action.status === "Complete"}>
                {action.status === "Open" ? "Start action" : action.status === "In progress" ? "Request sign-off" : "Evidence required"}
              </Button>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
