import { AppShell } from "@/components/app-shell";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function EvidenceReportsPage() {
  return (
    <AppShell active="evidence">
      <WorkspaceOverview
        eyebrow="Evidence & Reports"
        title="Traceable assurance evidence"
        description="Evidence records, inspection snapshots, saved views and scheduled packs with complete lineage."
        metrics={[
          { label: "Current evidence", value: "214", detail: "Across 34 statements", tone: "success" },
          { label: "Due for review", value: "12", detail: "5 within 7 days", tone: "warning" },
          { label: "Signed snapshots", value: "4", detail: "Immutable versions", tone: "info" },
          { label: "Open evidence gaps", value: "9", detail: "2 high priority", tone: "danger" },
        ]}
        queueTitle="Evidence requiring attention"
        queue={[
          { title: "People’s experience evidence needs review", detail: "Responsive · North Supported Living", status: "High", tone: "danger" },
          { title: "Partner feedback is outside its review period", detail: "Caring · Oak View", status: "Due", tone: "warning" },
          { title: "Governance pack awaits final sign-off", detail: "June 2026 organisation snapshot", status: "Approval", tone: "info" },
        ]}
      />
    </AppShell>
  );
}
