---
name: prose-style
description:
  Applies this project's anti-slop writing rules, either while drafting a
  document from scratch or while auditing and polishing text that already
  exists. Use for "write a README/report/doc", "draft this section", "review
  this text for style", "does this sound AI-written", "polish this copy", or
  any request to check prose for filler words, hedges, or canned AI phrasing
  ("delve", "leverage", "it's worth noting", "Bottom line:", "In short:",
  "This isn't about X, it's about Y").
allowed-tools: Read, Edit, Write, Grep
---

# Prose style: cutting AI-slop phrasing

Two modes. Figure out which one the request is before starting.

- **Draft mode** — the text doesn't exist yet (a new doc, section, commit
  message, reply). Write it clean the first time; don't draft loosely and
  fix afterward.
- **Audit mode** — the text already exists somewhere. Read it, find
  violations with their location, then fix them. If the file is one this
  project restricts (`PROCESS.md`, anything under `reflections/`), report
  the violations instead of editing — those files are off-limits without
  explicit request, per `CLAUDE.md`.

## Rules to enforce

- No filler words or hedges: "delve," "foster," "leverage," "it's worth
  noting," "importantly," "genuinely."
- No canned rhetorical moves: "Question? Answer." framing, "This isn't about
  X, it's about Y," and "X, not Y" contrasts that introduce an alternative
  nobody raised.
- No summary crutches at the end of a piece: "Bottom line:," "In short:,"
  "The simplest mental model is:," or any sentence that just restates a
  conclusion already given.
- State the action or fact directly. Don't also list what wasn't done, what
  stays unchanged, or how the answer is being categorized, unless that was
  asked for.
- No invented compound labels (e.g. "exact-head checks") and no hyphenated
  compound adjectives strung together for effect. Use plain verbs and
  prepositions to say the actual relationship.

## Audit mode specifics

1. Read the target file(s) in full — don't judge from a partial excerpt.
2. List each violation: quote the offending phrase, give its location
   (line number or section), and name which rule it breaks.
3. Propose the fix inline (the rewritten sentence), not just a diagnosis.
4. Apply the fixes with Edit, unless the file is restricted (see above) or
   the user only asked for a review.

## Draft mode specifics

Write the full piece first, applying the rules as you go, then do one pass
rereading it against the rules list above before finishing — treat it the
same as a proofread for spelling.
