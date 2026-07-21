"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const personas = [
  ["registered_manager", "Registered Manager"],
  ["quality_lead", "Quality Lead"],
  ["operations_director", "Operations Director"],
  ["team_leader", "Team Leader"],
  ["workforce_lead", "Workforce Lead"],
  ["finance_director", "Finance Director"],
  ["credit_controller", "Credit Controller"],
  ["board", "Board / Nominated Individual"],
  ["auditor", "Auditor"],
  ["admin", "System Administrator"],
] as const;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState("registered_manager");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      setError("The approved demonstration session could not be created.");
      setPending(false);
      return;
    }
    const callback = searchParams.get("callbackUrl");
    router.replace(callback?.startsWith("/") ? callback : "/today");
    router.refresh();
  }

  return (
    <form onSubmit={signIn} className="mt-6 text-left">
      <label htmlFor="persona" className="text-sm font-semibold">Validation persona</label>
      <select id="persona" value={role} onChange={(event) => setRole(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm">
        {personas.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <p className="mt-2 text-xs leading-5 text-slate-500">Anonymised fixture environment only. Production uses the approved Auth.js provider.</p>
      <Button className="mt-4 w-full" disabled={pending}>{pending ? "Signing in…" : "Continue securely"}</Button>
      {error ? <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p> : null}
    </form>
  );
}
