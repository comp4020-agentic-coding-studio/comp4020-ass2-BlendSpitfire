# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

The site is the course-overview page the assignment asks for: SLOP4386, Jet
Fighter Piloting — Departure and Recovery, a twelve-week course on taking an
F-16 off, flying it, and landing it.

## How I got here

### Coming up with the idea

Once the brief was clear, I asked the AI for course ideas. Maybe it's partly
my own bias, but every topic it proposed had a faint "no human would land on
this" quality — one was "Acoustic Archaeology of Buildings," on-brief but
oddly overworked. I picked the topic myself
([`ea843d9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/ea843d9994468d019b825cc64749c2849b5cb67f)).

Also worth noting: I've seen this discussed elsewhere too — Claude lately
seems overly cautious and critical, nitpicking ideas or requests even when
its own reasoning is weak, which adds real friction. I don't think this is
easy to fix: it at least hasn't swung the other way into blanket "you are
absolutely right!" agreement, and telling it in the harness to "ease up"
would likely be too vague and risk letting real issues slip through.

### Building it

After a short back-and-forth on whether an F-16 course was plausible and
what it should cover, I had the AI generate the site.

This build needed little visual design and already had a ready-made theme,
so the visual side went fine.

The copy was a different story, with two problems. First, it read too much
like a pitch. Second, it kept slipping in "meta" references to what it
thought I wanted — it seemed to have misread the brief and treated the site
as an admissions page rather than a plain course site. The harness already
said not to write copy like an ad or a pitch before this build started, but
the AI didn't fully treat that as binding
([`208f064`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/208f064654d6dd89c869de74ea6a1992290135dc)).

That was unsettling — the harness had less grip on the AI's output than I'd
expected. I asked why the rule was ignored; the gist was "the run wasn't
finished, so it hadn't reread the harness" — meaning the harness fell out of
memory once enough later content piled on top. So I added a rule to reread
the harness often enough to keep it in memory. That rule lives in the
harness too, so whether it holds is something only later behaviour can show.

Building on that, I asked the AI to model the copy on COMP4020's own course
homepage — a genuine course introduction, not a promotional page
([`5ff1834`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/5ff1834923d452b86d12931fa933b102ad23eb12),
[`3cfc895`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/3cfc89529f3dee688862bbc7db93422b57060e0a),
[`aa68329`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/aa68329dab22408d1bbc17530c0e5c8e035cc05d)).
That helped, but wasn't quite there yet.

I wanted a more fundamental fix. GPT-6 had just shipped with an official
["prompting guide"](https://developers.openai.com/api/docs/guides/latest-model)
— written for GPT, but I think the issues it steers clear of apply to Claude
too. The harness was also getting long, so I had Claude split the copy rules
into their own skill, used it to rewrite the copy a few more times, and
refined the skill's description along the way. I also had it write a second
skill for arranging a page's visual elements, probably unneeded here
([`03c0d5e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/03c0d5ed4ad0d3c7edb51c959776b92855957452),
[`3c74c19`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/3c74c19ceadb7dc68155379939abf4a1dda999b9)).
By the time the skill was ready, most of the copy already met my bar, so its
usefulness wasn't well proven — as in earlier write-ups, whether a change
was right tends to only show up once later work runs into it.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
