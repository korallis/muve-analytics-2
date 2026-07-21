import { AppShell } from "@/components/app-shell";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function FinancePage() {
  return (
    <AppShell active="finance">
      <WorkspaceOverview
        eyebrow="Finance"
        title="Financial assurance"
        description="Package economics, Xero accounting health, Spendesk expenses and credit control in one reconciled workspace."
        metrics={[
          { label: "Xero package margin", value: "18.7%", detail: "+1.2 pp", tone: "success" },
          { label: "Unallocated expenses", value: "£1.8k", detail: "6 need approval", tone: "warning" },
          { label: "Overdue receivables", value: "£42k", detail: "−£8k this month", tone: "info" },
          { label: "Broken promises", value: "2", detail: "Action required", tone: "danger" },
        ]}
        queueTitle="Financial exceptions"
        queue={[
          { title: "Package margin below approved floor", detail: "Oak View · staffing variance is the primary driver", status: "High", tone: "danger" },
          { title: "Spendesk allocation has low confidence", detail: "Six transactions · £1,840 total", status: "Approval", tone: "warning" },
          { title: "Payment promise passed without receipt", detail: "Local authority account · invoice INV-382", status: "Overdue", tone: "warning" },
        ]}
      />
    </AppShell>
  );
}
