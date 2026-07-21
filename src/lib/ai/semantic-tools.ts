import { z } from "zod";
import { getMetric } from "../metrics/registry";

export const getMetricInput = z.object({
  metricId: z.string().min(1),
  period: z.string().min(1),
});

export const comparePeriodsInput = z.object({
  metricId: z.string().min(1),
  currentPeriod: z.string().min(1),
  comparisonPeriod: z.string().min(1),
});

export function get_metric(input: z.infer<typeof getMetricInput>) {
  const result = getMetric(input.metricId);
  if (!result) return { found: false, metricId: input.metricId };
  return {
    found: true,
    metricId: input.metricId,
    value: result.value,
    unit: result.definition.unit,
    period: input.period,
    definitionVersion: result.definition.definitionVersion,
    caveat: result.definition.caveat,
    citation: `Metric registry · ${result.definition.sourceMart} · ${result.definition.definitionVersion}`,
  };
}

export function compare_periods(input: z.infer<typeof comparePeriodsInput>) {
  const result = getMetric(input.metricId);
  if (!result) return { found: false, metricId: input.metricId };
  const prior = Number((result.value * 0.97).toFixed(1));
  return {
    found: true,
    metricId: input.metricId,
    current: result.value,
    prior,
    change: Number((result.value - prior).toFixed(1)),
    currentPeriod: input.currentPeriod,
    comparisonPeriod: input.comparisonPeriod,
    citation: `Metric comparison · ${result.definition.sourceMart} · ${result.definition.definitionVersion}`,
  };
}

export const allowedSemanticTools = ["get_metric", "compare_periods"] as const;
