import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { WorkspaceOverview } from "@/components/workspace-overview";

export default function PeopleSupportedPage() {
  return (
    <AppShell active="people">
      <div className="space-y-6">
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
        <section aria-labelledby="client-360-heading">
          <h2 id="client-360-heading" className="text-lg font-bold">Open Client 360</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[["RH-014", "Rose House"], ["NSL-008", "North Supported Living"], ["OV-003", "Oak View"]].map(([id, service]) => (
              <Card key={id}><CardContent className="p-5"><p className="font-semibold">Person {id}</p><p className="mt-1 text-sm text-slate-500">{service}</p><Link href={`/people-supported/clients/${id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-800 hover:underline">View unified timeline <ArrowRight className="size-4" aria-hidden="true" /></Link></CardContent></Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
