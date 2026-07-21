import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SignInPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><Card className="w-full max-w-md"><CardContent className="p-8 text-center"><span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-950 text-cyan-300"><ShieldCheck aria-hidden="true" /></span><h1 className="mt-5 text-2xl font-bold">Muve secure access</h1><p className="mt-3 text-sm leading-6 text-slate-600">This environment requires an approved organisational session. Contact a Muve administrator if your access has expired.</p></CardContent></Card></main>;
}
