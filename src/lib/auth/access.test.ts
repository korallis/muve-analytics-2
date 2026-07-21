import { describe, expect, it } from "vitest";
import { can, canAccessClient, contextForRole, demoAccess } from "./access";

describe("access controls", () => {
  it("enforces role capabilities", () => {
    expect(can(demoAccess, "manage:actions")).toBe(true);
    expect(can(demoAccess, "view:finance")).toBe(false);
  });

  it("denies clients outside the caller scope", () => {
    expect(canAccessClient(demoAccess, "RH-014")).toBe(true);
    expect(canAccessClient(demoAccess, "OUT-OF-SCOPE")).toBe(false);
  });

  it("uses deny-by-default capability sets for specialist roles", () => {
    const finance = contextForRole("finance_director");
    expect(can(finance, "view:finance")).toBe(true);
    expect(can(finance, "view:clients")).toBe(false);
  });
});
