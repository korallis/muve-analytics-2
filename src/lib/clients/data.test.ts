import { describe, expect, it } from "vitest";
import { getClient } from "./data";

describe("Client 360", () => {
  it("combines safety domains on one timeline", () => {
    const client = getClient("RH-014");
    expect(client?.timeline.map((event) => event.type)).toEqual(expect.arrayContaining(["Medication", "Safeguarding", "Visit"]));
  });

  it("returns no data for an unknown client", () => {
    expect(getClient("UNKNOWN")).toBeNull();
  });
});
