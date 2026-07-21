import { NextResponse } from "next/server";

const lastRefreshByActor = new Map<string, number>();
const cooldownMs = 60_000;

export async function POST(request: Request) {
  const role = request.headers.get("x-muve-role");
  if (role !== "admin") return NextResponse.json({ error: "Not found" }, { status: 404 });

  const actor = "demo-admin";
  const now = Date.now();
  const last = lastRefreshByActor.get(actor) ?? 0;
  if (now - last < cooldownMs) {
    return NextResponse.json({ error: "Refresh already queued", retryAfterSeconds: Math.ceil((cooldownMs - (now - last)) / 1000) }, { status: 429 });
  }
  lastRefreshByActor.set(actor, now);

  const workflowUrl = process.env.PIPELINE_WORKFLOW_URL;
  if (workflowUrl) {
    const response = await fetch(workflowUrl, { method: "POST", headers: { "x-muve-trigger": "manual-incremental" } });
    if (!response.ok) return NextResponse.json({ error: "Pipeline workflow rejected the trigger" }, { status: 502 });
  }
  return NextResponse.json({ queued: true, mode: workflowUrl ? "workflow" : "fixture", requestedAt: new Date(now).toISOString() }, { status: 202 });
}
