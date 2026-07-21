import { describe, expect, it } from "vitest";
import { breachesThreshold, getMetric, metricRegistry } from "./registry";

describe("metric registry", () => {
  it("keeps one governed definition for every metric", () => {
    for (const metric of Object.values(metricRegistry)) {
      expect(metric.numerator).toBeTruthy();
      expect(metric.denominator).toBeTruthy();
      expect(metric.qualityStatement).toBeTruthy();
      expect(metric.definitionVersion).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });

  it("evaluates approved thresholds", () => {
    expect(breachesThreshold("training_compliance", 94)).toBe(true);
    expect(getMetric("missing")).toBeNull();
  });
});
