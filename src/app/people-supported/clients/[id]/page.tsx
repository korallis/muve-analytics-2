import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { canAccessClient, demoAccess } from "@/lib/auth/access";
import { getClient } from "@/lib/clients/data";

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clientId = decodeURIComponent(id);
  if (!canAccessClient(demoAccess, clientId)) notFound();
  const client = getClient(clientId);
  if (!client) notFound();

  return (
    <AppShell active="people">
      <div className="space-y-6">
        <header>
          <Link href="/people-supported" className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-800 hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />People supported</Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-sm font-semibold text-cyan-800">Client 360 · {client.service}</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{client.name}</h1><p className="mt-2 text-sm text-slate-500">Demonstration identifier · no personal data</p></div>
            <Badge tone={client.assurance === "Weak" ? "danger" : client.assurance === "Strong" ? "success" : "info"}>{client.assurance} assurance</Badge>
          </div>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Client summary">
          {[["Visits delivered", "98%"], ["Medication exceptions", "1 open"], ["Safeguarding", "1 review"], ["Plan review", "Due in 18 days"]].map(([label, value]) => <Card key={label}><CardContent className="p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-2xl font-bold">{value}</p></CardContent></Card>)}
        </section>
        <Card aria-labelledby="timeline-heading">
          <CardHeader><div><CardTitle id="timeline-heading">Unified timeline</CardTitle><CardDescription>Visits, medication, incidents, safeguarding, observations and legal authorisations.</CardDescription></div></CardHeader>
          <CardContent>
            <ol className="relative ml-2 border-l border-slate-200 pl-6">
              {client.timeline.map((event) => (
                <li key={event.id} className="relative pb-6 last:pb-0">
                  <span className="absolute -left-[1.77rem] top-1.5 size-3 rounded-full border-2 border-white bg-cyan-600" />
                  <div className="flex flex-wrap items-center gap-2"><Badge tone={event.status === "Open" ? "danger" : event.status === "Review" ? "warning" : "success"}>{event.type}</Badge><span className="inline-flex items-center gap-1 text-xs text-slate-500"><Clock3 className="size-3" aria-hidden="true" />{event.at}</span></div>
                  <h2 className="mt-2 text-sm font-semibold">{event.title}</h2><p className="mt-1 text-sm leading-5 text-slate-600">{event.detail}</p><p className="mt-1 text-xs text-slate-500">Source record {event.id} · {event.status}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
