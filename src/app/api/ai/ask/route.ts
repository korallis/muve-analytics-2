import { generateText, gateway, stepCountIs, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAuditEvent } from "@/lib/audit";
import { can, demoAccess } from "@/lib/auth/access";
import { compare_periods, comparePeriodsInput, get_metric, getMetricInput } from "@/lib/ai/semantic-tools";

const requestSchema = z.object({ question: z.string().trim().min(3).max(500) });

function reauthorise() {
  if (!can(demoAccess, "use:ai")) throw new Error("Not found");
}

const semanticTools = {
  get_metric: tool({
    description: "Retrieve one approved metric with its definition, period and citation.",
    inputSchema: getMetricInput,
    execute: (input) => { reauthorise(); return get_metric(input); },
  }),
  compare_periods: tool({
    description: "Compare one approved metric across two periods.",
    inputSchema: comparePeriodsInput,
    execute: (input) => { reauthorise(); return compare_periods(input); },
  }),
};

function metricForQuestion(question: string) {
  if (/training|competenc/i.test(question)) return "training_compliance";
  if (/medication|medicine/i.test(question)) return "medication_documentation";
  if (/visit|delivery|late/i.test(question)) return "visit_delivery";
  if (/action|overdue/i.test(question)) return "overdue_actions";
  if (/margin|package|finance/i.test(question)) return "package_margin";
  return null;
}

function nonAnswer() {
  return {
    answer: "Insufficient evidence: no approved semantic metric matches this question. Refine the scope or ask a metric owner to approve a definition.",
    citations: ["Metric registry search · no approved metric matched"],
    scope: "Caller-authorised demonstration scope",
    dataAsOf: "21 July 2026, 09:42",
    mode: "insufficient-evidence",
  };
}

function citedDemoAnswer(question: string) {
  const metricId = metricForQuestion(question);
  if (!metricId) return nonAnswer();
  const result = compare_periods({ metricId, currentPeriod: "1–21 July 2026", comparisonPeriod: "1–21 June 2026" });
  if (!result.found || result.change === undefined || result.current === undefined || result.prior === undefined || !result.citation) return nonAnswer();
  return {
    answer: `${metricId.replaceAll("_", " ")} is ${result.current} for the current period, a ${result.change >= 0 ? "rise" : "fall"} of ${Math.abs(result.change)} from ${result.prior}. Review the linked exception population before assigning an action.`,
    citations: [result.citation],
    scope: "All demonstration services · 1–21 July 2026",
    dataAsOf: "21 July 2026, 09:42",
    mode: "deterministic-demo",
  };
}

export async function POST(request: Request) {
  if (!can(demoAccess, "use:ai")) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a question between 3 and 500 characters." }, { status: 400 });

  const correlationId = crypto.randomUUID();
  await recordAuditEvent({ actorId: demoAccess.actorId, eventType: "ai.query", scope: { serviceIds: demoAccess.serviceScopes, clientIds: [] }, correlationId });

  const deterministic = citedDemoAnswer(parsed.data.question);
  if (deterministic.mode === "insufficient-evidence") return NextResponse.json({ ...deterministic, correlationId });

  try {
    const result = await generateText({
      model: gateway("google/gemini-2.5-flash-lite"),
      system: "You are Muve, a care assurance analyst. Use only allowlisted semantic tools. State scope and time. Separate fact, interpretation and limitation. Never imply a CQC rating or make a clinical decision.",
      prompt: parsed.data.question,
      tools: semanticTools,
      activeTools: ["get_metric", "compare_periods"],
      stopWhen: stepCountIs(3),
      headers: { "x-vercel-ai-gateway-tag": "ask-muve" },
    });
    return NextResponse.json({
      answer: result.text || deterministic.answer,
      citations: [...deterministic.citations, ...result.toolResults.map((item) => JSON.stringify(item.output))],
      scope: deterministic.scope,
      dataAsOf: deterministic.dataAsOf,
      mode: "ai-gateway",
      correlationId,
    });
  } catch {
    return NextResponse.json({ ...deterministic, correlationId, mode: "safe-fallback" });
  }
}
