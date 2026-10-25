# LOGBOOK.md — bot log (machine-first)
Read top to bottom. Orders live in TRUTH.md. This file is the state + history.
Format is fixed. One line per event. Newest at the bottom. Never edit old lines; append a new one.

## HOW TO USE (bots)
1. Before work: read STATE. Find your name. That row is your job.
2. On every change: append one EVENT line. Keeper (Pip) updates STATE to match.
3. Every 20 min: run CHECK. If any answer changes, append an EVENT.
4. Not in STATE = no job -> take first OPEN row with no owner, or ask COL Whiz.

## CHECK (every 20 min, every bot)
Q1 What am I doing?               -> must equal your STATE row
Q2 Do I need another assignment?  -> blocked or done = yes -> take NEXT
Q3 Anything for chain of command? -> yes = EVENT type ASK, to COL Whiz

## SCHEMA
STATE row:  BOT | JOB | STEP | STATUS | NEXT
EVENT line: YYYY-MM-DDTHH:MMZ | BOT | JOB | TYPE | NOTE
TYPE (only these): START, VERIFY, DONE, BLOCKED, ASK, MOVE, GRADE
STATUS (only these): STARTED, VERIFIED, DONE, BLOCKED, OPEN
Chain: bot -> COL Whiz -> Pip -> Leon

## STATE (current, one row per bot)
BOT        | JOB   | STEP                          | STATUS  | NEXT
Inspectra  | KC-01 | fix PR #15 conflicts, preview | STARTED | KC-02
Sgt Brains | KC-08 | write checklists (+Round 2 rules, intro art copyright) | STARTED | KC-01 mobile go/no-go when preview posts
Pizzapan   | KC-03 | Paper Pip Plane on branch     | STARTED | next Round 2 game
COL Whiz   | CMD   | run battalion, clear blockers | STARTED | -
Pip        | REC   | keep TRUTH + LOGBOOK, grade   | STARTED | -

## JOBS
JOB   | OWNER      | STATUS  | DONE =
KC-01 | Inspectra  | STARTED | hub live, mobile OK, Leon approved
KC-02 | Inspectra  | OPEN    | plaza + monument live (original art)
KC-03 | Pizzapan   | STARTED | games zone live with Paper Pip Plane + Round 2 game
KC-04 | Sgt Brains | OPEN    | Songs & Stories live
KC-05 | Sgt Brains | OPEN    | Learn & Explore live
KC-06 | Sgt Brains | OPEN    | Art & Coloring live
KC-07 | Inspectra  | OPEN    | Meet the Battalion + Grown-Ups Gate live
KC-08 | Sgt Brains | STARTED | coin playtest, 3-tap, rules, mobile pass; Leon signs off

## BLOCKERS (open only; remove when cleared)
- none

## EVENTS (append-only)
2026-10-25T06:20Z | Inspectra  | KC-01 | START | PR #15 conflicts
2026-10-25T06:20Z | Pizzapan   | KC-03 | START | Paper Pip Plane branch
2026-10-25T06:20Z | Sgt Brains | KC-08 | START | checklists while waiting for preview
2026-10-25T06:27Z | Pip        | REC   | START | LOGBOOK created
