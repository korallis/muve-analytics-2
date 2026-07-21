import { describe, expect, it } from "vitest";
import { assuranceActions } from "./data";

describe("assurance actions", () => {
  it("requires an owner, due date and evidence source", () => {
    for (const action of assuranceActions) {
      expect(action.owner).toBeTruthy();
      expect(Number.isNaN(Date.parse(action.dueDate))).toBe(false);
      expect(action.source).toBeTruthy();
    }
  });
});
