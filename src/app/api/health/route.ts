import { NextResponse } from "next/server";
import { integrationHealth } from "@/lib/integrations/health";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "muve-analytics-2",
      phase: "implementation",
      timestamp: new Date().toISOString(),
      checks: {
        runtime: "ok",
        routing: "ok",
        integrations: integrationHealth.map(({ id, status, loaded_at, watermark }) => ({ id, status, loaded_at, watermark })),
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
