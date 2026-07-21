import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "muve-analytics-2",
      phase: "phase-0",
      timestamp: new Date().toISOString(),
      checks: {
        runtime: "ok",
        routing: "ok",
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
