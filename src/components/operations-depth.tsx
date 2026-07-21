import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const visitOutcomes = [["Completed", "294", "Verified"], ["Late", "6", "Exception"], ["Shortened", "2", "Exception"], ["Cancelled", "4", "Reviewed"], ["Incomplete", "1", "Critical"], ["Missing source", "Unknown", "Coverage gap"]];
const medicineOutcomes = [["Given", "408"], ["Refused", "2"], ["Omitted", "1"], ["Unavailable", "1"], ["Late", "3"], ["Undocumented", "Unknown"]];

export function OperationsDepth() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader><div><CardTitle>Visit-delivery assurance</CardTitle><CardDescription>Double-up delivery is reconciled at visit grain; missing source data is never treated as completed.</CardDescription></div><Badge tone="info">Status coverage 99.0%</Badge></CardHeader><CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">{visitOutcomes.map(([name, value, state]) => <div key={name} className="rounded-xl bg-slate-50 p-3"><p className="text-sm text-slate-500">{name}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{state}</p></div>)}</CardContent></Card>
      <Card><CardHeader><div><CardTitle>Medication and care-task outcomes</CardTitle><CardDescription>PRN and repeated patterns are grouped by client, medication and outcome risk.</CardDescription></div><Badge tone="warning">1 clinical review</Badge></CardHeader><CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">{medicineOutcomes.map(([name, value]) => <div key={name} className="rounded-xl bg-slate-50 p-3"><p className="text-sm text-slate-500">{name}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</CardContent></Card>
    </div>
  );
}
