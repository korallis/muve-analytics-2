import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { metricRegistry } from "../metrics/registry";

const martDesign = readFileSync(resolve(process.cwd(), "docs/mart-schema.md"), "utf8");
const catalogue = readFileSync(resolve(process.cwd(), "pipeline/muve_pipeline/catalogue.py"), "utf8");

describe("pipeline and semantic contracts", () => {
  it("documents every metric source mart in the mart design", () => {
    for (const metric of Object.values(metricRegistry)) expect(martDesign).toContain(metric.sourceMart);
  });

  it("keeps every documented mart in the Python catalogue", () => {
    const names = [...martDesign.matchAll(/`((?:dim|fact|mart)_[a-z_]+)`/g)].map((match) => match[1]);
    expect(names.length).toBeGreaterThanOrEqual(20);
    for (const name of names) expect(catalogue).toContain(`"${name}"`);
  });

  it("does not allow live-relation truncation in pipeline code", () => {
    const pipeline = readFileSync(resolve(process.cwd(), "pipeline/muve_pipeline/runner.py"), "utf8");
    expect(pipeline.toLowerCase()).not.toContain("truncate");
    expect(pipeline).toContain("promote_watermark");
  });
});
