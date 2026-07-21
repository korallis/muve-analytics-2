import { AppShell } from "@/components/app-shell";
import { ActionCentre } from "@/components/action-centre";

export default function ActionsPage() {
  return (
    <AppShell active="today">
      <div className="space-y-6">
        <header>
          <p className="text-sm font-semibold text-cyan-800">Action Centre</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Close the assurance loop</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">Every exception and assurance gap has an accountable owner, due date, source evidence and human sign-off.</p>
        </header>
        <ActionCentre />
      </div>
    </AppShell>
  );
}
