# Process overview

## What I built

**SLOP4386: Jet Fighter Piloting — Departure and Recovery.** Twelve weeks that
teach you to take a single-seat jet off the ground and bring it back, and that
refuse to teach air combat. The title is the syllabus and also the threat:
*departure* is takeoff, and *departure from controlled flight* is the thing
that kills you.

## Deciding what a course is

I started from the wrong premise. My first instinct was that "how to fly an
F-16" fails as a university course because operational training is not an
academic subject, and I argued myself out of it: a conservatorium teaches you
to play the cello, and "Coding Fundamentals" is a Java course with a better
name. Skill is not the disqualifier.

What actually makes the brief work is narrower and funnier — **no civilian
university could run this course**, because none of them has the aircraft. The
joke is not that it is unserious. It is that it is completely serious about
something institutionally impossible.

That reframing set the scope. A course is one idea held for a semester, so I
picked the smallest honest promise the subject allows: *the aircraft comes
back serviceable*. Every later decision fell out of that. The check ride is
marked holistically ([`0de9032`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/0de9032))
because a sortie is not the average of its control inputs, and marking it by
criteria would have rewarded exactly the behaviour the course exists to
discourage — flying a marginal approach to a landing because each segment was
individually inside tolerance.

## What I encoded, and where

Two course-design decisions became executable, in a file kept separate from
the one answering the published spec
([`c19188d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/c19188d)).
The first asserts that the simulator check's deadline falls before the week 10
sortie. That is the course's actual safety claim, and nothing in the schemas
would notice if a date edit quietly let a student fly before passing the gate.
The second requires a named person on every period.

The harness carried forward from week 6
([`208f064`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/208f064))
did more work than I expected. Its rule against letting build notes leak into
user-facing copy is what kept twenty-odd content pages reading as a course
rather than as assembly instructions. I dropped its sections about last week's
template, which described a platform that no longer exists here.

## What I left out on purpose

No check that the twelve weeks differ from one another. I could have written a
word-overlap heuristic; it would have gone green on a syllabus that was still
boring, and a check that passes while the thing is bad is worse than no check.
That judgement stays mine.

## Knowing it was right

Mobile screenshots showed every page clipped at the right edge, including
pages whose layout I had not touched. Rather than start fixing CSS I measured
the DOM through the debugging protocol, and the page reported `scrollWidth`
exactly equal to `clientWidth`: nothing overflowed. Headless Chrome had not
applied the layout viewport, and I had nearly rebuilt a layout to fix a
screenshot artefact. The one real defect underneath it was a four-column table
twelve pixels wide of its container
([`8c268f3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/commit/8c268f3)).

The full run is
[`ea843d9...8c268f3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-BlendSpitfire/compare/ea843d9...8c268f3).
