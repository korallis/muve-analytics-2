import { z } from "zod";
import storyData from "./story-contracts.json";

const storyContractSchema = z.object({
  id: z.string().regex(/^E\d+\.\d+$/),
  priority: z.enum(["P0", "P1", "P2"]),
  phase: z.number().int().min(0).max(5),
  epic: z.string().regex(/^E\d+$/),
  persona: z.string().min(1),
  story: z.string().min(1),
  criteria: z.array(z.string().min(1)).min(1),
  route: z.string().startsWith("/"),
});

export type StoryContract = z.infer<typeof storyContractSchema>;

export const storyContracts = z.array(storyContractSchema).parse(storyData);

export function storiesForEpic(epic: string) {
  return storyContracts.filter((story) => story.epic === epic);
}

export function storiesForRoute(route: string) {
  return storyContracts.filter((story) => story.route === route);
}

export function getStoryContract(id: string) {
  return storyContracts.find((story) => story.id === id) ?? null;
}
