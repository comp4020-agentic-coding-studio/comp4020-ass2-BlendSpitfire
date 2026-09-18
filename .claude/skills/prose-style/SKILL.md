---
name: prose-style
description:
  Applies this project's anti-slop writing rules, either while drafting a
  document from scratch or while auditing and polishing text that already
  exists. Also covers matching website copy's tone to real examples of the
  page's genre (course site, product page, portfolio, ...) before applying
  the project's own copy defaults. Use for "write a README/report/doc",
  "draft this section", "write copy for this page", "review this text for
  style", "does this sound AI-written", "polish this copy", or any request to
  check prose for filler words, hedges, or canned AI phrasing ("delve",
  "leverage", "it's worth noting", "Bottom line:", "In short:", "This isn't
  about X, it's about Y").
allowed-tools: Read, Edit, Write, Grep, WebSearch, WebFetch
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

The example words/phrases under each rule below are illustrations, not an
exhaustive list to string-match against. Judge each sentence by the function
it serves — a violation can use none of the listed words and still break
the rule's intent (a keyword search alone will under-catch).

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
- No inspirational or dramatic flourish that adds no information. Judge by
  whether the sentence could be deleted without losing anything the reader
  needs — if so, it's decoration, not content (e.g. "Nothing stops you but
  you" next to a list of hard rules — a self-help-style line, not a
  technical one). A dramatic-sounding sentence that goes on to correct a
  real misconception or state a consequence is fine; one that only adds
  tone is not.

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

## Website copy: match the genre

When the text is going onto a real, live page (not a doc, reply, or commit
message), first work out what kind of site it is, then look up real
examples of that genre — search for and read a few live sites of the same
kind (a university course site, a product landing page, a portfolio, a
nonprofit) — and match the tone those examples actually use rather than
guessing at a generic house style.

`CLAUDE.md`'s copy rules assume an informational/course-style site and say
not to sound like a pitch. That default doesn't hold everywhere: if the page
genuinely has a promotional or sales purpose — a product page, a landing
page meant to convert a visitor — write toward what the real, successful
examples of that genre do, even where that reads more like a pitch than
`CLAUDE.md`'s copy rules would otherwise allow. This override only applies
when the site itself actually has that character; confirm the genre against
the references before overriding, rather than treating "written for a real
site" alone as license to sell.

The same reference check also applies to register, not just overall tone.
Even where a site deliberately writes with voice elsewhere, a purely
operational fact — a schedule note, why something isn't happening, a
procedural detail — should read as a plain statement first. Check it
against how real sites of the genre phrase the same kind of notice; if a
reader skimming for the fact has to parse a rhetorical turn of phrase to get
it, restate it plainly and keep the voice for where the page is making an
argument instead.
