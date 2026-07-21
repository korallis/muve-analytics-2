import { describe, expect, it } from "vitest";
import { storyContracts } from "./stories";

describe("full-plan delivery contract", () => {
  it("contains every canonical user story exactly once", () => {
    expect(storyContracts).toHaveLength(57);
    expect(new Set(storyContracts.map((story) => story.id)).size).toBe(57);
  });

  it("maps every story to acceptance criteria and a real workspace", () => {
    for (const story of storyContracts) {
      expect(story.criteria.length).toBeGreaterThan(0);
      expect(story.route).toMatch(/^\//);
    }
  });
});
