import { AppShell } from "@/components/app-shell";
import { CapabilityEvidence } from "@/components/capability-evidence";
import { GovernanceDepth } from "@/components/governance-depth";
import { QualityDashboard } from "@/components/quality-dashboard";

export default function QualityGovernancePage() {
  return (
    <AppShell active="quality">
      <div className="space-y-8">
        <QualityDashboard />
        <GovernanceDepth />
        <CapabilityEvidence route="/quality-governance" title="CQC assurance controls" />
      </div>
    </AppShell>
  );
}
