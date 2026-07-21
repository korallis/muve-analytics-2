import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { SignInForm } from "@/components/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-950 text-cyan-300"><ShieldCheck aria-hidden="true" /></span>
          <h1 className="mt-5 text-2xl font-bold">Muve secure access</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sign in as an approved persona. Every session is scope-limited and audited.</p>
          <Suspense fallback={<p className="mt-6 text-sm text-slate-500">Preparing secure sign-in…</p>}><SignInForm /></Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
