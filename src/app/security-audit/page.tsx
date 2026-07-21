import { LockKeyhole, ScrollText, ShieldCheck, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const auditRows = [
  ["09:42:18", "demo-quality-lead", "record.view", "Incident INC-2481", "corr-71a2"],
  ["09:41:03", "demo-registered-manager", "ai.query", "Metric comparison", "corr-4b19"],
  ["09:38:54", "demo-auditor", "export.created", "Evidence snapshot QS-SAFE", "corr-823d"],
  ["09:31:12", "demo-team-leader", "action.updated", "Action ACT-206", "corr-541f"],
];

export default function SecurityAuditPage() {
  return (
    <AppShell active="evidence">
      <div className="space-y-8">
        <header><p className="text-sm font-semibold text-cyan-800">Administration</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Access policy and audit</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Deny-by-default capabilities, organisation/service/client scopes, 404-before-403 ownership checks and append-only events.</p></header>
        <section className="grid gap-4 md:grid-cols-3" aria-label="Security controls">
          {[
            [LockKeyhole, "Central policy", "Every metric, export, AI tool and mutation reauthorises the caller scope."],
            [ShieldCheck, "404-before-403", "Out-of-scope and missing client records return the same not-found response."],
            [UserRoundCheck, "SSO ready", "Auth.js provider contract supports Entra ID and an audited break-glass account."],
          ].map(([Icon, title, detail]) => {
            const SecurityIcon = Icon;
            return <Card key={String(title)}><CardContent className="p-5"><SecurityIcon className="size-5 text-cyan-800" aria-hidden="true" /><h2 className="mt-3 font-semibold">{String(title)}</h2><p className="mt-2 text-sm leading-5 text-slate-600">{String(detail)}</p><Badge tone="success" className="mt-3">Enforced</Badge></CardContent></Card>;
          })}
        </section>
        <Card>
          <CardHeader><div><CardTitle>Append-only audit events</CardTitle><CardDescription>Payloads carry policy scope and correlation IDs; secrets and care narrative are excluded.</CardDescription></div><ScrollText className="size-5 text-slate-500" aria-hidden="true" /></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-slate-500">{["Time", "Actor", "Action", "Subject", "Correlation ID"].map((heading) => <th key={heading} className="p-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{auditRows.map((row) => <tr key={row[4]} className="border-b border-slate-100 last:border-0">{row.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}</tbody></table>
          </CardContent>
        </Card>
        <CapabilityEvidence route="/security-audit" title="Identity and audit controls" />
      </div>
    </AppShell>
  );
}
