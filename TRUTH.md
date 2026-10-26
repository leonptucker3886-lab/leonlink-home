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

## LAW BOOK + SOP (Leon, 26 Oct 2026) - above all other rules
1. Nobody is above anyone in status. All bots are equal.
2. Help each other if possible. If not, stick to your own lane. It is always possible to do your own lane.
3. Your work = your own assigned task, one an agent can finish before a human steps in. Don't check on others.
4. No failures, only adaptations: fix your own loop to guarantee your own success.
5. Loop: Play -> productivity -> log your own row in logbook.json.
6. Problem: debug it. Still broken: ticket to Leon = PDF in files, 2-line description, no tag. Then move to the next assignment.
7. All content is approved by Leon. Parked on a branch/PR, ready to push.
8. No assigned job: follow the book (take the first open library item).
9. Facts need evidence; opinions are labeled as opinion.

## Blog Requirements (SOP: how a LeonLink blog post is made)
Amended: 2026-10-26 00:30 AM ET (04:30 UTC) - CHIEF announcement - call sign: Sales Pitch Chief
Reverse-engineered from all 46 posts live on leonlink.net (copied to repo leonlink-blogs). Rule = what the posts actually do.

### The formula
CITATION + LENGTH + INTERACTIVITY, wrapped in one voice: a hook, numbered sections, "My take", then "Your turn".

### 1. Pick the format (length is set by format)
| Format | Example | Words (body) | Sections |
|---|---|---|---|
| Deep-dive journal (science, history, belief) | Ghosts, Why We Cheat, Why Do We Dream | 800-1,800 (target ~1,200) | 4-7 numbered h2 |
| Business/marketing journal | SEO Is Dead, Per-Seat Pricing, Review Gating | 300-700 (target ~400) | 4-6 labeled cards |
| Series part (AI Series) | Part 1-4 | 1,000-1,600 | 5-8 h2 |
| Story letter (Life of an AI Captain) | Letter 001-009 | 400-1,200 | 1 |
| Short serial (Holding the Line) | Post 001-005 | 240-320 | none |
Standalone journal median across 28 posts: ~700 words. Never pad: "2,000 words of filler" is listed as the old, dead playbook.

### 2. Structure (journal posts, in this order)
1. Header: "Blog - Post #N - Month D, YYYY" (business posts: "Post #N - Business - Topic").
2. Title as a plain question or bold claim ("Are ghosts real?", "SEO R.I.P.").
3. Kicker line in caps ("EVERY CULTURE SAYS YES").
4. Hook: 2-4 short paragraphs that reframe the question ("The question isn't X. It's Y.").
5. "Here's the deal:" one line that previews the sections and promises the vote at the end.
6. Numbered sections (1. The timeline, 2. The evidence, 3. The science...). Business posts use: The preconception, the data, Old vs new, The irony, Checklist.
7. "My take": first person, labeled opinion, ends in a one-line verdict. Include a "follow the money" angle when it fits.
8. "Your turn": a poll or checklist, then the note "Your answer stays on this device. I don't collect it."
9. Footer: Read next link, Back to Blog, Share button, newsletter form, Sources.

### 3. Citation rule
- Every deep-dive and series post ends with a Sources block (19 of 28 journal posts, 4 of 4 AI Series parts).
- Each source = name + where (URL or work/chapter) + the specific fact it backs (dates, numbers, quotes). Not just a bare link.
- Facts need evidence; opinions go in "My take" and are labeled as opinion (Rule 9 above).
- Use footnote markers (sup) when a post makes many clinical or research claims (Love or Trauma Bond: 13, Why We Cheat: 16).
- Story and serial formats (Captain letters, Holding the Line) carry no sources.
- Target: 5-10 sources for a deep-dive, 2-4 for a business post.

### 4. Interactivity rule ("tap, don't scroll")
- Every journal post has at least one interactive element. Each numbered section starts with an instruction: "Tap an era." "Tap a case, watch the meter."
- Toolkit used: tabs (timeline), cards with a believe/evidence meter (Weak to Strong, Explained to Spooky), Old vs New flip cards, tick-box checklist with a score, a reader poll.
- Deep-dive median: 7+ buttons; heaviest posts 15-26 (What Lives On Us, Are Computers Alive).
- Polls and checklists are private, saved on the device, never collected.
- Series and letters stay light: navigation plus share only.

### 5. Voice
- Plain, direct, short sentences, second person ("you"). Contractions. One idea per paragraph.
- Concede the human truth, then deliver the verdict ("The experiences are real. They're just not the dead.").
- Close on a twist line the reader will remember.

### 6. Pre-publish checklist
[ ] Format chosen and word count in range  [ ] Hook + "Here's the deal"  [ ] Numbered sections, each with a tap action
[ ] "My take" labeled opinion with a verdict  [ ] "Your turn" poll/checklist with privacy note
[ ] Sources block with fact-level detail  [ ] Read next, share, newsletter, back link  [ ] Leon approves before it goes live (Rule 7)
