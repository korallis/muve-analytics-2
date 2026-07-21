import { AppShell } from "@/components/app-shell";
import { QualityDashboard } from "@/components/quality-dashboard";

export default function QualityGovernancePage() {
  return (
    <AppShell active="quality">
      <QualityDashboard />
    </AppShell>
  );
}
