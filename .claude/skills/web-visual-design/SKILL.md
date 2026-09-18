---
name: web-visual-design
description:
  Applies graphic-design and layout principles when building or redesigning
  a page on this site, using real high-quality examples of the page's genre
  as reference and working out concrete proportions (grid, spacing, type
  scale) before writing markup or CSS. Use for "design this page", "lay out
  this section", "this page looks off", "improve the visual design", "pick a
  layout for X", or any request that's about how a page looks rather than
  what it says.
allowed-tools: Read, Edit, Write, Grep, WebSearch, WebFetch, Bash
---

# Web visual design: reference, then proportion, then build

This site's colors and fonts come from the theme package
(`astro-theme-university` + the brand CSS in `astro.config.ts`) — don't
invent new ones. What this skill governs is everything the theme doesn't
fix for you: how elements on a given page are arranged, sized relative to
each other, and spaced.

## 1. Reference real examples

Identify the page's genre (a course listing, a session detail page, a
people/bio grid, a landing page, ...) and look up two or three real,
well-regarded live sites of that same genre — read them, don't just recall
them from memory. Note concretely what they do: column structure, how much
whitespace surrounds a block, where hierarchy comes from (size vs. weight vs.
color), how dense or sparse the page is. This is the same "find real
examples of the genre" step as the `prose-style` skill's website-copy
section — for a page that needs both, do this lookup once and use it for
both text and layout.

## 2. Apply design fundamentals

Ground the layout in established principles, not taste alone:

- **Hierarchy** — one clear entry point per view; size, weight, and position
  should agree about what matters most, not fight each other.
- **Grid and alignment** — everything lines up to a shared set of columns or
  edges; a stray element that aligns to nothing reads as a mistake even if
  no one can say why.
- **Spacing rhythm** — pick a small spacing scale (e.g. a 4px or 8px base
  unit) and spend from it consistently, rather than one-off pixel values per
  element. Related items sit closer together than unrelated ones (proximity
  is what signals grouping, not borders or boxes).
- **Contrast with restraint** — use contrast (size, weight, color) to mark
  the one or two things that should stand out; if everything is emphasized,
  nothing is.
- **Repetition** — recurring patterns (card layout, heading treatment,
  spacing before a section) should look identical across the site unless a
  difference is meaningful.

## 3. Turn it into numbers before building

Before writing markup or CSS, decide the actual values: how many columns,
what the spacing scale is, what the type scale ratio is between heading
levels, what the max content width is. Write these down as you go (a
comment at the top of the component, or state them in your response) so the
build is executing a decision, not improvising one element at a time.

## 4. Build, then compare against the references

After implementing, open the page in a browser (per `CLAUDE.md`: the
rendered page is the truth) and compare it side by side against the
reference examples from step 1 — not for literal similarity, but to check
the same design fundamentals actually landed. Revise proportions that don't
hold up rather than moving on.
