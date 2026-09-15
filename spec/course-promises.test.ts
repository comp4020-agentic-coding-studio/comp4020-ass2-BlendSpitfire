/* Promises this course makes that the build cannot hold for it.
 *
 * `course-contract.test.ts` answers the published Assignment 2 spec. This file
 * answers SLOP4386 itself: two things the site says are true, that nothing in
 * the schemas or the build would notice going wrong. */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as {
  nodes: ApiNode[];
};

const dateOnly = (value: unknown): string => String(value).slice(0, 10);
const sessions = api.nodes.filter((node) => node.type === "sessions");

describe("SLOP4386 course promises", () => {
  it("gates the first solo behind the simulator check", () => {
    const gate = api.nodes.find((node) => node.id === "assessments/simulator-progression-check");
    const solo = sessions.find((node) => Number(node.meta?.week) === 10);

    expect(gate, "the simulator progression check is the gate and must exist").toBeDefined();
    expect(solo, "week 10 is the first solo and must exist").toBeDefined();

    const gateDue = dateOnly(gate!.meta?.due);
    const soloDate = dateOnly(solo!.meta?.date);
    expect(
      gateDue < soloDate,
      `the gate closes ${gateDue} and the aircraft flies ${soloDate} — nobody flies before passing it`,
    ).toBe(true);
  });

  it("puts a named person on every period", () => {
    for (const session of sessions) {
      const teachers = session.meta?.teachers;
      expect(
        Array.isArray(teachers) && teachers.length > 0,
        `${session.id} has no one accountable for it`,
      ).toBe(true);
    }
  });
});
