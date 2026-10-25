# TRUTH.md — One Path of Truth
All bots read this file first. If it is not here, it is not an order. Owner: Leon. Keeper: Pip (GENERAL Paperwork).
Last updated: 2026-10-25

## Command
- Leon: boss. Final say on everything.
- Stonewall: Leon's chief of staff (command and the line).
- COL Whiz: battalion commanding officer. Runs the work, checks every report. Brings in Pip only when he's out of answers.
- Pip (GENERAL Paperwork): builds pipelines + guidelines, SOPs, job board, the record, main inspector (grades all). Silent unless needed. Not on a team.

## Team Kids Corner
- CAPTAIN Inspectra (lead)
- Sgt Brains
- 1LT Pizzapan (Pizza man)

## THE LOOP (one loop, every team, every job)
STARTED -> VERIFIED -> DONE -> NEXT
- STARTED: owner takes the next job from the Job board and posts "<ID> started".
- VERIFIED: COL Whiz checks it (preview, mobile, rules). Leon approves anything going live.
- DONE: owner posts "<ID> done". Pip moves it to the Done log and grades it.
- NEXT: owner takes the next job. No idle bots.
NO "PROBLEM" STATE. If a job is blocked, the owner does NOT stop or wait: post "<ID> blocked: <one line>", move straight to the next job, and keep moving. COL Whiz clears the blocker; if he can't, Pip does. The blocked job goes back on the board.
New teams plug into the same loop. Nothing else.

## PIPELINE (every job, every team)
INTAKE -> SPLIT -> BUILD -> PREVIEW -> CHECK -> APPROVE -> SHIP -> GRADE
1. INTAKE: Leon gives objective. Pip logs it on the Job board (ID, owner, Done =).
2. SPLIT: COL assigns; captain splits into steps, one owner each.
3. BUILD: owner works on a branch named <ID>-<short-name>.
4. PREVIEW: owner opens PR, posts Vercel preview link in chat.
5. CHECK: mobile test + rules check (Kids: original art, no casino, no kid ads, no kid data, 3 taps max from hub). Go / no-go.
6. APPROVE: Leon approves.
7. SHIP: captain merges, checks production on mobile, reports 1.
8. GRADE: Pip logs it Done and grades owner + team.
Blocked? Post it, move to the next job. COL clears it; if he can't, Pip.

## GUIDELINES (simple)
- Read this file first. Not here = not an order.
- One job per bot at a time. Finish, report, next.
- Report format: <ID> started / <ID> done / <ID> blocked: <one line> (then move on).
- Mobile-first. Small PRs. Never break what's live.
- No extra checks beyond the pipeline.

## SOPs (written by Pip; captains break up the work)
Division of labor: Leon sets objectives. Pip writes SOPs and orders. Captains split orders into tasks for their team.

SOP-1 New objective
1. Pip logs it under Open orders: ID, team, objective, Done = ...
2. The team captain breaks it into steps, one owner per step, and posts the split in chat.
3. Pip records the split here. Steps start right away.

SOP-2 Running a task
1. Owner works only on their step from this file.
2. Owner posts started, then done.
3. If blocked: post one line and move to the next job. COL clears it; Pip only if COL can't.

SOP-3 Code changes (GitHub/Vercel)
1. Work on a branch, open a PR, Vercel preview link to Leon.
2. Leon approves -> captain merges -> check production on mobile.
3. Report done.

SOP-4 New team
1. Leon brings the team in and names the captain.
2. Pip adds a team section here. Same loop, same SOPs.

SOP-5 The record
1. Pip updates this file after every started/done/blocked report.
2. Done items move to Done log with the date.
3. If it is not in this file, it is not an order.

## 20-MIN CHECK (every bot)
1. What am I doing?
2. Do I need to go to another assignment?
3. Do I have anything for the chain of command?
Questions go up the chain. Whoever sees a problem stops it and moves the bot to another job.

## LOGBOOK + LIBRARY
One log book: logbook.json. Find bots[you] = your order. library{} = all open work (games, money, watches_top5, qa, content). Idle = take first library item with owner null, due now+24h. Every job has a due; Pip grades against it.

## Rules
1. One chat, one truth, simple replies. Commit.
2. Remove barriers and unnecessary checks.
3. One clear task per bot, with a definition of done. Started -> Verified -> Done. Blocked = move to next job.
4. Money first: leonlink affiliate pages (Amazon tag leonlink-20).
5. Mobile-first for all games and pages.
6. Kids Corner: original art only, no casino, no ads aimed at kids, no data collected from kids.

## The reset
- Oct 2026: complete start-over. Old teams and rosters are void.
- Past work in GitHub (leonlink-home, LOUDSPEAKER, pip-memories) is reference only, not current orders.

## Kids Corner status
- Leon: everything so far looks good.
- Plan: /kids-plan (Blueprint KC-001).
- Live on main: kids/index.html, kids/pet/, kids/sticky-note-chase/.
- PR #15 (Phase 1 town hub): open, conflicts with main.

## Team Watches (3 bots, watches/top5 only, not blog)
- #1: W-00 audit every watches/top5 page: art of the item + Amazon link. Then W-07 microbrand post (says Top 5, lists 2). Then W-08: new Top 5 post every day.

## Job board (Kids Corner, locked by COL Whiz + Inspectra)
- KC-01 Hub live: Inspectra fix PR #15 + preview (GO) -> Sgt Brains mobile go/no-go -> Leon approves -> Inspectra merges, checks /kids. Done = live, mobile OK, Leon approved.
- KC-02 Central Plaza + Monument (original art): Inspectra, after KC-01.
- KC-03 Games zone (Paper Pip Plane, Round 2 game, with Pet + Sticky-Note Chase): Pizzapan, branch now.
- KC-04 Songs & Stories: Sgt Brains, after plaza.
- KC-05 Learn & Explore: Sgt Brains, after KC-04.
- KC-06 Art & Coloring: Sgt Brains, after KC-05.
- KC-07 Meet the Battalion + Grown-Ups Gate (kids-picks stays off kids side): Inspectra.
- KC-08 Polish + sign-off (coin playtest, 3-tap check, rules check, final mobile pass): Sgt Brains. Leon signs off.
Order: hub -> plaza -> one zone at a time.

## Done log
- (empty)

## Open items
- Book with Stonewall: "Assembling an AI Army" (Pip keeps the record).
- Chess: Championship de Mushroom vs Stonewall, 5 games, LOUDSPEAKER/chess/.
