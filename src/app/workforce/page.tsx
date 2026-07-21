import { AppShell } from "@/components/app-shell";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { WorkforceDepth } from "@/components/workforce-depth";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function WorkforcePage() {
  return (
    <AppShell active="workforce">
      <div className="space-y-8">
      <WorkspaceOverview
        eyebrow="Workforce"
        title="Safe staffing readiness"
        description="Required, scheduled and delivered staffing aligned with competence, training, absence and continuity."
        metrics={[
          { label: "Services safely covered", value: "5/6", detail: "1 staffing gap", tone: "warning" },
          { label: "Mandatory training", value: "94%", detail: "+2 pp this month", tone: "success" },
          { label: "Competency matches", value: "91%", detail: "3 allocations to review", tone: "warning" },
          { label: "Continuity", value: "86%", detail: "Approved definition v1", tone: "info" },
        ]}
        queueTitle="Workforce risks"
        queue={[
          { title: "Night shift lacks an approved epilepsy competency", detail: "North Supported Living · Tuesday", status: "High", tone: "danger" },
          { title: "Three training records expire within 14 days", detail: "Two services affected", status: "Due soon", tone: "warning" },
          { title: "Supervision evidence needs review", detail: "Four staff records", status: "Review", tone: "neutral" },
        ]}
      />
      <WorkforceDepth />
      <CapabilityEvidence route="/workforce" title="Workforce readiness controls" />
      </div>
    </AppShell>
  );
}
