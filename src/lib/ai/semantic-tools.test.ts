import { describe, expect, it } from "vitest";
import { allowedSemanticTools, compare_periods, get_metric } from "./semantic-tools";

describe("AI semantic tools", () => {
  it("allows metric tools but no free SQL tool", () => {
    expect(allowedSemanticTools).toEqual(["get_metric", "compare_periods"]);
    expect(allowedSemanticTools.join(" ")).not.toMatch(/sql/i);
  });

  it("returns cited deterministic facts", () => {
    expect(get_metric({ metricId: "visit_delivery", period: "July" }).citation).toContain("Metric registry");
    expect(compare_periods({ metricId: "visit_delivery", currentPeriod: "July", comparisonPeriod: "June" }).found).toBe(true);
  });
});
