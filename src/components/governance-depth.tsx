import { FileArchive, MessageSquareMore, Scale, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { evidenceRecords, governanceWorkflows, qualityStatements } from "@/lib/quality/model";

export function GovernanceDepth() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><div><CardTitle>All 34 quality statements</CardTitle><CardDescription>Strong, Adequate, Weak, Unknown and Inapplicable are internal assurance states, never calculated CQC ratings.</CardDescription></div><Badge tone="info">34 statements · 6 evidence categories</Badge></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-slate-500">{["Key question", "Quality statement", "Assurance", "Evidence coverage", "Open actions"].map((heading) => <th key={heading} className="p-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{qualityStatements.map((statement) => <tr key={statement.id} className="border-b border-slate-100 last:border-0"><td className="p-3 font-semibold">{statement.question}</td><td className="p-3">{statement.name}</td><td className="p-3"><Badge tone={statement.status === "Strong" ? "success" : statement.status === "Weak" ? "danger" : statement.status === "Unknown" ? "neutral" : "info"}>{statement.status}</Badge></td><td className="p-3">{statement.evidenceCoverage === null ? "Unknown" : `${statement.evidenceCoverage}%`}</td><td className="p-3">{statement.openActions}</td></tr>)}</tbody></table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><div><CardTitle>Evidence register</CardTitle><CardDescription>Short-lived document links; downloads are audited and superseded versions remain traceable.</CardDescription></div></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">{evidenceRecords.map((record) => <article key={record.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><Badge tone="info">{record.category}</Badge><span className="text-xs text-slate-500">{record.id}</span></div><h3 className="mt-3 font-semibold">{record.title}</h3><p className="mt-2 text-sm text-slate-600">{record.scope} · {record.owner}</p><p className="mt-2 text-xs text-slate-500">Review {record.reviewDate} · {record.source}</p><Badge tone={record.status === "Current" ? "success" : "warning"} className="mt-3">{record.status}</Badge></article>)}</CardContent>
      </Card>
      <section className="grid gap-4 lg:grid-cols-3" aria-label="Governance workflows">
        <Card><CardContent className="p-5"><FileArchive className="size-5 text-cyan-800" aria-hidden="true" /><h2 className="mt-3 font-semibold">Frozen inspection snapshot</h2><p className="mt-2 text-sm text-slate-600">{governanceWorkflows.snapshot.id} · {governanceWorkflows.snapshot.period}</p><p className="mt-2 text-xs text-slate-500">{governanceWorkflows.snapshot.watermark} · {governanceWorkflows.snapshot.formats.join(" / ")} reconcile</p><Badge tone="success" className="mt-3">Signed · immutable</Badge></CardContent></Card>
        <Card><CardContent className="p-5"><Send className="size-5 text-cyan-800" aria-hidden="true" /><h2 className="mt-3 font-semibold">Statutory and Candour</h2><p className="mt-2 text-sm text-slate-600">{governanceWorkflows.notification.type} · {governanceWorkflows.notification.owner}</p><p className="mt-2 text-xs text-slate-500">{governanceWorkflows.notification.applicable} · due {governanceWorkflows.notification.deadline}</p><Badge tone="warning" className="mt-3">{governanceWorkflows.notification.state}</Badge></CardContent></Card>
        <Card><CardContent className="p-5"><MessageSquareMore className="size-5 text-cyan-800" aria-hidden="true" /><h2 className="mt-3 font-semibold">Feedback and complaints</h2><p className="mt-2 text-sm text-slate-600">{governanceWorkflows.feedback.kind}: {governanceWorkflows.feedback.theme}</p><p className="mt-2 text-xs text-slate-500">{governanceWorkflows.feedback.acknowledged} · {governanceWorkflows.feedback.outcome}</p><div className="mt-3 flex items-center gap-1 text-xs text-slate-500"><Scale className="size-3" aria-hidden="true" />{governanceWorkflows.feedback.statement}</div></CardContent></Card>
      </section>
    </div>
  );
}
