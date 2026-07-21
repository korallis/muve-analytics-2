"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefreshButton() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function refresh() {
    setPending(true);
    const response = await fetch("/api/integrations/refresh", { method: "POST" });
    const payload = await response.json();
    setMessage(response.ok ? "Incremental watermark check queued." : payload.error ?? "Refresh failed.");
    setPending(false);
  }
  return <div className="text-right"><Button onClick={refresh} disabled={pending}><RefreshCw className={`size-4 ${pending ? "animate-spin" : ""}`} aria-hidden="true" />{pending ? "Queueing…" : "Refresh now"}</Button>{message ? <p role="status" className="mt-2 text-xs text-slate-500">{message}</p> : null}</div>;
}
