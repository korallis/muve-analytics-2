import { describe, expect, it } from "vitest";
import { qualityStatements } from "./model";

describe("CQC assurance model", () => {
  it("models the correct 34-statement distribution", () => {
    const counts = Object.groupBy(qualityStatements, (statement) => statement.question);
    expect(counts.Safe).toHaveLength(8);
    expect(counts.Effective).toHaveLength(6);
    expect(counts.Caring).toHaveLength(5);
    expect(counts.Responsive).toHaveLength(7);
    expect(counts["Well-led"]).toHaveLength(8);
  });

  it("uses Unknown for missing coverage", () => {
    const missing = qualityStatements.filter((statement) => statement.evidenceCoverage === null);
    expect(missing.length).toBeGreaterThan(0);
    expect(missing.every((statement) => statement.status === "Unknown")).toBe(true);
  });
});
