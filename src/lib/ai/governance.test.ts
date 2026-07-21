import { describe, expect, it } from "vitest";
import { cacheNarrative, detectAnomaly, explainChange, getCachedNarrative } from "./governance";

const narrative = explainChange({ metricId: "visit_delivery", current: 98.4, prior: 97.6, change: 0.8, citationId: "metric:visit_delivery:v1.1.0" });

describe("AI governance", () => {
  it("keeps facts cited and limitations explicit", () => {
    expect(narrative.facts.every((fact) => fact.citationId.length > 0)).toBe(true);
    expect(narrative.limitations.length).toBeGreaterThan(0);
  });

  it("invalidates cached narratives when source data changes", () => {
    cacheNarrative("prompt-hash", "wm-1", narrative, 10_000);
    expect(getCachedNarrative("prompt-hash", "wm-1")).toEqual(narrative);
    expect(getCachedNarrative("prompt-hash", "wm-2")).toBeNull();
  });

  it("detects changes with deterministic thresholds", () => {
    expect(detectAnomaly("incident_count", 12, 6, 4)?.state).toBe("review");
    expect(detectAnomaly("incident_count", 7, 6, 4)).toBeNull();
  });
});
