import { AppShell } from "@/components/app-shell";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function OperationsPage() {
  return (
    <AppShell active="operations">
      <WorkspaceOverview
        eyebrow="Operations"
        title="Care delivery exceptions"
        description="Visits, medicines, care tasks and documentation presented as an actionable, reconciled worklist."
        metrics={[
          { label: "Visits delivered", value: "98.4%", detail: "+0.8 pp", tone: "success" },
          { label: "Late visits", value: "6", detail: "2 repeated patterns", tone: "warning" },
          { label: "Medication exceptions", value: "3", detail: "1 needs review", tone: "danger" },
          { label: "Task completion", value: "97.1%", detail: "Source coverage 99%", tone: "info" },
        ]}
        queueTitle="Operational exceptions"
        queue={[
          { title: "Medication omission awaiting clinical review", detail: "Rose House · recorded 08:12", status: "Critical", tone: "danger" },
          { title: "Repeated late night visits", detail: "North Supported Living · two people affected", status: "High", tone: "warning" },
          { title: "Visit note is incomplete", detail: "Oak View · visit VIS-9147", status: "Review", tone: "neutral" },
        ]}
      />
    </AppShell>
  );
}
