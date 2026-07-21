import { AppShell } from "@/components/app-shell";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function PeopleSupportedPage() {
  return (
    <AppShell active="people">
      <WorkspaceOverview
        eyebrow="People Supported"
        title="Person-centred assurance"
        description="A single authorised view of outcomes, care delivery, risks, incidents, feedback and legal authorisations."
        metrics={[
          { label: "People in scope", value: "42", detail: "Across 6 services", tone: "info" },
          { label: "Reviews due", value: "5", detail: "2 within 7 days", tone: "warning" },
          { label: "Outcome plans current", value: "90%", detail: "+4 pp this month", tone: "success" },
          { label: "Open authorisation actions", value: "2", detail: "One due today", tone: "danger" },
        ]}
        queueTitle="People requiring review"
        queue={[
          { title: "Risk review due within 48 hours", detail: "Person RH-014 · Rose House", status: "Due soon", tone: "warning" },
          { title: "Outcome evidence has not been reviewed", detail: "Person NSL-008 · North Supported Living", status: "9 days old", tone: "warning" },
          { title: "Legal authorisation action needs sign-off", detail: "Person OV-003 · Oak View", status: "High", tone: "danger" },
        ]}
      />
    </AppShell>
  );
}
