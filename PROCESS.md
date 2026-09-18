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

Once the brief was clear, I asked the AI to pitch some course ideas. Maybe
it's partly my own bias, but I think there's something real to it too: every
topic it proposed had a faint "no human would land on this" quality — one was
"Acoustic Archaeology of Buildings," which isn't off-brief exactly, just
oddly overworked. In the end I picked the topic myself
([`ea843d9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/ea843d9994468d019b825cc64749c2849b5cb67f)).

### Building it

After a short back-and-forth with the AI about whether an F-16 course was
plausible and roughly what it should cover, I had it generate the site. 

This build needed little visual design and already had a ready-made theme to
sit on, so nothing went wrong on the visual side.

The copy was a different story. Its problems fell into two buckets: first,
it read too much like a pitch. Second, it kept slipping in "meta" references
to what it thought I, the user, wanted — from its own explanations, I think
it had misread part of the brief and convinced itself the site needed to
read like an admissions page rather than a plain course site. Before this
build even started, the harness already said something close to "don't
write copy that reads like an ad or a pitch," but the AI didn't fully treat
that as binding
([`208f064`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/208f064654d6dd89c869de74ea6a1992290135dc)).

That was unsettling — the harness's grip on the AI's own output was less
solid than I'd expected. I asked why the rule had been ignored; the gist of
the answer was "the generation run wasn't finished yet, so it hadn't reread
the harness" — which really means that once enough later content piled on
top of the first read, the harness fell out of working memory. So I added a
rule telling it to reread the harness often enough to keep that in memory.
That instruction lives in the harness too, though, so whether it actually
holds is something only later behaviour can show.

Building on that, I asked the AI to look at COMP4020's own course homepage
and make the copy read like a genuine course introduction rather than a
promotional page
([`5ff1834`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/5ff1834923d452b86d12931fa933b102ad23eb12),
[`3cfc895`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/3cfc89529f3dee688862bbc7db93422b57060e0a),
[`aa68329`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/aa68329dab22408d1bbc17530c0e5c8e035cc05d)).
That helped, but still wasn't quite there.

I wanted a more fundamental fix after that. GPT-6 had just shipped, with an
official ["prompting guide"](https://developers.openai.com/api/docs/guides/latest-model)
— written for GPT, but I think the issues it tries to steer clear of apply to
Claude too.
Separately, the harness itself was getting long, so I had Claude split the
copy-writing rules out into their own skill, used it to rewrite the copy a
few more times, and refined the skill's own description along the way. While
at it, I also had it write a second skill for arranging a page's visual
elements, which this build probably didn't need
([`03c0d5e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/03c0d5ed4ad0d3c7edb51c959776b92855957452),
[`3c74c19`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/3c74c19ceadb7dc68155379939abf4a1dda999b9)).
By the time the skill was ready, though, most of the copy already met my
bar, so its usefulness wasn't well proven either — same as in earlier
process write-ups, whether a change was actually right tends to only show up
once later work runs into it.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
