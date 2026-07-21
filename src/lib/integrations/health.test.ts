import { describe, expect, it } from "vitest";
import { integrationHealth } from "./health";

describe("integration health", () => {
  it("publishes lineage for configured data sources", () => {
    const snowflake = integrationHealth.find((item) => item.id === "snowflake");
    expect(snowflake?.loaded_at).toBeTruthy();
    expect(snowflake?.watermark).toBeTruthy();
    expect(snowflake?.last_success).toBeTruthy();
  });
});
