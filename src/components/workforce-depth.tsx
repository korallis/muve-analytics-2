import { Download, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const training = [
  ["Staff S-018", "Rose House", "Epilepsy awareness", "Current", "12 Dec 2026", "RH-014"],
  ["Staff S-024", "Rose House", "Medication level 2", "Due soon", "03 Aug 2026", "RH-014"],
  ["Staff S-031", "North Supported Living", "PBS plan", "Missing", "Unknown", "NSL-008"],
];

export function WorkforceDepth() {
  return (
    <div className="space-y-6">
      <Card><CardHeader><div><CardTitle>Training and client-competency matrix</CardTitle><CardDescription>Grouped caregiver-to-client coverage at organisation, service and staff grain.</CardDescription></div><Button variant="outline"><Download className="size-4" aria-hidden="true" />Compliance gap XLSX</Button></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-slate-500">{["Staff", "Service", "Requirement", "State", "Expiry", "Client need"].map((item) => <th key={item} className="p-3">{item}</th>)}</tr></thead><tbody>{training.map((row) => <tr key={row[0]} className="border-b border-slate-100">{row.map((cell, index) => <td key={`${row[0]}-${cell}`} className="p-3">{index === 3 ? <Badge tone={cell === "Current" ? "success" : cell === "Missing" ? "danger" : "warning"}>{cell}</Badge> : cell}</td>)}</tr>)}</tbody></table></CardContent></Card>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Workforce detail">
        <Card><CardContent className="p-5"><UsersRound className="size-5 text-cyan-800" aria-hidden="true" /><h2 className="mt-3 font-semibold">Safe staffing status</h2><p className="mt-3 text-2xl font-bold">2 forced check-outs</p><p className="mt-1 text-sm text-slate-500">Status coverage 96.8% · 312/322 visits</p></CardContent></Card>
        <Card><CardContent className="p-5"><h2 className="font-semibold">Hours and capacity</h2><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt>Required</dt><dd>412h</dd></div><div className="flex justify-between"><dt>Scheduled</dt><dd>406h</dd></div><div className="flex justify-between"><dt>Delivered</dt><dd>398h</dd></div><div className="flex justify-between"><dt>Uncovered</dt><dd className="font-bold text-rose-700">6h</dd></div></dl></CardContent></Card>
        <Card><CardContent className="p-5"><h2 className="font-semibold">Continuity</h2><p className="mt-3 text-2xl font-bold">86%</p><p className="mt-1 text-sm text-slate-500">Approved definition v1.0 · substantive 78% · agency 8%</p><Badge tone="warning" className="mt-3">2 absences affect capacity</Badge></CardContent></Card>
        <Card><CardContent className="p-5"><h2 className="font-semibold">Lifecycle gaps</h2><p className="mt-3 text-sm text-slate-600">Onboarding 1 missing · training 3 due soon · supervision 4 due · documents 2 expired</p><p className="mt-3 text-xs text-slate-500">Requirements vary by role and service.</p></CardContent></Card>
      </section>
    </div>
  );
}
