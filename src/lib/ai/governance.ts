import { z } from "zod";

export const approvedTools = ["get_metric", "compare_periods", "list_exceptions", "get_record", "search_evidence", "get_action_status", "draft_action", "draft_assurance_narrative"] as const;
export type ApprovedTool = (typeof approvedTools)[number];

export const aiBudget = {
  monthlyLimitUsd: 250,
  warningAtPercent: 80,
  featureTags: ["ask-muve", "explain-change", "narrative", "digest", "anomaly"],
  providers: ["vercel-ai-gateway"],
} as const;

const narrativeSchema = z.object({
  facts: z.array(z.object({ claim: z.string(), citationId: z.string() })),
  interpretation: z.string(),
  limitations: z.array(z.string()),
  recommendations: z.array(z.string()),
  dataAsOf: z.string(),
});

export type Narrative = z.infer<typeof narrativeSchema>;

type CacheEntry = { expiresAt: number; sourceWatermark: string; narrative: Narrative };
const narrativeCache = new Map<string, CacheEntry>();

export function cacheNarrative(promptHash: string, sourceWatermark: string, narrative: Narrative, ttlMs: number) {
  const parsed = narrativeSchema.parse(narrative);
  narrativeCache.set(promptHash, { expiresAt: Date.now() + ttlMs, sourceWatermark, narrative: parsed });
}

export function getCachedNarrative(promptHash: string, sourceWatermark: string) {
  const entry = narrativeCache.get(promptHash);
  if (!entry || entry.expiresAt <= Date.now() || entry.sourceWatermark !== sourceWatermark) return null;
  return entry.narrative;
}

export type DeterministicChange = { metricId: string; current: number; prior: number; change: number; citationId: string };

export function explainChange(change: DeterministicChange): Narrative {
  return narrativeSchema.parse({
    facts: [{ claim: `${change.metricId} moved by ${change.change}.`, citationId: change.citationId }],
    interpretation: "Review the cited exception population before attributing cause.",
    limitations: ["Association does not establish cause.", "Only approved structured factors were retrieved."],
    recommendations: ["Open the cited population and confirm an accountable action if required."],
    dataAsOf: "2026-07-21T09:42:00.000Z",
  });
}

export function detectAnomaly(metricId: string, current: number, baseline: number, approvedDelta: number) {
  const delta = current - baseline;
  return Math.abs(delta) >= approvedDelta ? { metricId, delta, state: "review" as const, citationId: `metric:${metricId}:v1` } : null;
}
