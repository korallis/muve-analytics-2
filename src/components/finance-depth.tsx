"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { renderMetricValue } from "@/lib/metrics/registry";

const tabs = ["P&L", "Balance sheet", "Cash flow", "Budget", "Aged payables", "Contacts"] as const;
const accounts = [
  ["Local Authority A", "£28,400", "61–90 days", "Promise due", "High"],
  ["NHS ICB Demo", "£9,800", "31–60 days", "Dispute review", "Medium"],
  ["Private payer group", "£3,800", "1–30 days", "Contact queued", "Low"],
];

export function FinanceDepth() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("P&L");
  return (
    <div className="space-y-6">
      <Card><CardHeader><div><CardTitle>Xero accounting workspace</CardTitle><CardDescription>Organisation: Muve Care Demo Ltd · snapshot 21 Jul 2026 08:58 · reconciled to Xero.</CardDescription></div></CardHeader><CardContent><div className="flex flex-wrap gap-2" role="tablist" aria-label="Xero reports">{tabs.map((item) => <Button key={item} role="tab" aria-selected={tab === item} variant={tab === item ? "default" : "outline"} onClick={() => setTab(item)}>{item}</Button>)}</div><div className="mt-4 rounded-xl bg-slate-50 p-5" role="tabpanel"><h3 className="font-semibold">{tab}</h3><p className="mt-2 text-sm text-slate-600">Stored Xero snapshot · multi-organisation context retained across every tab.</p><p className="mt-3 text-2xl font-bold">£{tab === "P&L" ? "184,220" : tab === "Cash flow" ? "72,940" : "126,500"}</p></div></CardContent></Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><div><CardTitle>Credit-control worklist</CardTitle><CardDescription>Priority = balance × age × promise/dispute rule; AI suggestions require approval.</CardDescription></div></CardHeader><CardContent className="space-y-3">{accounts.map(([name, balance, age, state, risk]) => <article key={name} className="rounded-xl border border-slate-200 p-4"><div className="flex justify-between gap-3"><div><h3 className="font-semibold">{name}</h3><p className="mt-1 text-sm text-slate-500">{balance} · {age} · {state}</p></div><Badge tone={risk === "High" ? "danger" : risk === "Medium" ? "warning" : "neutral"}>{risk}</Badge></div><p className="mt-3 text-xs text-slate-500">Single account timeline · no state changed by AI</p></article>)}</CardContent></Card>
        <Card><CardHeader><div><CardTitle>Package economics and funding</CardTitle><CardDescription>Birdie delivery + Xero revenue + Spendesk expenses through semantic contracts.</CardDescription></div><Badge tone="success">Margin {renderMetricValue("package_margin")}</Badge></CardHeader><CardContent><dl className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-slate-50 p-3"><dt>Revenue</dt><dd className="mt-1 text-xl font-bold">£24,600</dd></div><div className="rounded-xl bg-slate-50 p-3"><dt>Delivered hours</dt><dd className="mt-1 text-xl font-bold">612h</dd></div><div className="rounded-xl bg-slate-50 p-3"><dt>Staffing cost</dt><dd className="mt-1 text-xl font-bold">£17,420</dd></div><div className="rounded-xl bg-amber-50 p-3"><dt>Unallocated costs</dt><dd className="mt-1 text-xl font-bold">£1,840</dd></div></dl><p className="mt-4 text-sm text-slate-600">Movement: volume +£1.2k · rate +£0.4k · staffing −£0.8k · expense −£0.2k.</p><p className="mt-3 text-sm text-slate-600">Funding mix: LA 64% · NHS 28% · private 8% · scenario +2% LA rate → +£492.</p></CardContent></Card>
      </div>
      <Card><CardHeader><div><CardTitle>Spendesk allocation approvals</CardTitle><CardDescription>Confidence and rationale are visible; overrides create append-only audit events.</CardDescription></div></CardHeader><CardContent className="grid gap-3 md:grid-cols-3">{[["EXP-88", "93%", "Known service card", "Auto-matched"], ["EXP-91", "62%", "Merchant + cost centre", "Approval required"], ["EXP-94", "Unknown", "No client reference", "Unallocated"]].map(([id, confidence, rationale, status]) => <article key={id} className="rounded-xl border border-slate-200 p-4"><Badge tone={confidence === "93%" ? "success" : "warning"}>{confidence} confidence</Badge><h3 className="mt-3 font-semibold">{id}</h3><p className="mt-2 text-sm text-slate-600">{rationale}</p><p className="mt-2 text-xs text-slate-500">{status}</p></article>)}</CardContent></Card>
    </div>
  );
}
