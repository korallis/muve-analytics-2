import { generateText, gateway, stepCountIs, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAuditEvent } from "@/lib/audit";
import { can, demoAccess } from "@/lib/auth/access";
import {
  compare_periods,
  comparePeriodsInput,
  get_metric,
  getMetricInput,
} from "@/lib/ai/semantic-tools";

const requestSchema = z.object({ question: z.string().trim().min(3).max(500) });

const semanticTools = {
  get_metric: tool({
    description: "Retrieve one approved metric with its definition, period and citation.",
    inputSchema: getMetricInput,
    execute: get_metric,
  }),
  compare_periods: tool({
    description: "Compare one approved metric across two periods.",
    inputSchema: comparePeriodsInput,
    execute: compare_periods,
  }),
};

function citedDemoAnswer(question: string) {
  const metricId = /training/i.test(question)
    ? "training_compliance"
    : /medication/i.test(question)
      ? "medication_documentation"
      : "visit_delivery";
  const result = compare_periods({
    metricId,
    currentPeriod: "1–21 July 2026",
    comparisonPeriod: "1–21 June 2026",
  });
  if (!result.found || result.change === undefined || result.current === undefined || result.prior === undefined || !result.citation) {
    throw new Error("Approved metric not found");
  }
  return {
    answer: `${metricId.replaceAll("_", " ")} is ${result.current} for the current period, a ${result.change >= 0 ? "rise" : "fall"} of ${Math.abs(result.change)} from ${result.prior}. Review the linked exception population before assigning an action.`,
    citations: [result.citation],
    scope: "All demonstration services · 1–21 July 2026",
    dataAsOf: "21 July 2026, 09:42",
    mode: "deterministic-demo",
  };
}

export async function POST(request: Request) {
  if (!can(demoAccess, "use:ai")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a question between 3 and 500 characters." }, { status: 400 });
  }

  const correlationId = crypto.randomUUID();
  await recordAuditEvent({
    actorId: "demo-registered-manager",
    eventType: "ai.query",
    scope: { serviceIds: ["demo"], clientIds: [] },
    correlationId,
  });

  try {
    const result = await generateText({
      model: gateway("google/gemini-2.5-flash-lite"),
      system: "You are Muve, a care assurance analyst. Use only the allowlisted semantic tools. State scope and time. Separate fact from interpretation. Never imply a CQC rating or make a clinical decision.",
      prompt: parsed.data.question,
      tools: semanticTools,
      activeTools: ["get_metric", "compare_periods"],
      stopWhen: stepCountIs(3),
      headers: { "x-vercel-ai-gateway-tag": "ask-muve" },
    });
    const cited = citedDemoAnswer(parsed.data.question);
    return NextResponse.json({
      answer: result.text || cited.answer,
      citations: [
        ...cited.citations,
        ...result.toolResults.map((item) => JSON.stringify(item.output)),
      ],
      scope: "Caller-authorised demonstration scope",
      dataAsOf: "21 July 2026, 09:42",
      mode: "ai-gateway",
      correlationId,
    });
  } catch {
    return NextResponse.json({ ...citedDemoAnswer(parsed.data.question), correlationId, mode: "safe-fallback" });
  }
}
