import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

describe("Assignment 2 spec contract", () => {
  it("runs across twelve dated teaching weeks", () => {
    const sessions = api.nodes.filter((node) => node.type === "sessions");
    const weeks = sessions
      .map((session) => Number(session.meta?.week))
      .sort((a, b) => a - b);
    expect(weeks, "the sessions collection must cover weeks 1 through 12").toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1),
    );
  });

  it("links at least one lecture to a real deck, not the starter placeholder", () => {
    const withSlides = api.nodes.filter(
      (node) => node.type === "lectures" && typeof node.meta?.slides === "string",
    );
    expect(withSlides.length, "at least one lecture needs a linked deck").toBeGreaterThan(0);

    const hasRealDeck = withSlides.some((lecture) => {
      const deckName = (lecture.meta!.slides as string).replace(/^\/decks\//, "").replace(/\/$/, "");
      const deckPath = resolve(`src/decks/${deckName}.deck.mdx`);
      if (!existsSync(deckPath)) return false;
      const source = readFileSync(deckPath, "utf8");
      return !source.includes("STARTER_CONTENT") && !/placeholder deck/i.test(source);
    });
    expect(hasRealDeck, "the linked deck still reads like the starter placeholder").toBe(true);
  });

  it("adds up assessment weights to 100%", () => {
    const assessments = api.nodes.filter((node) => node.type === "assessments");
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, `assessment weights sum to ${total}, not 100`).toBe(100);
  });
});
