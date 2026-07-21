import { AppShell } from "@/components/app-shell";
import { TodayDashboard } from "@/components/today-dashboard";

export default function HomePage() {
  return (
    <AppShell active="today">
      <TodayDashboard />
    </AppShell>
  );
}
