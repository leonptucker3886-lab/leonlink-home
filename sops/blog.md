# SOP — Blog Post

**Time limit:** 1 day max. Urgent cuts to hours, Low stretches a bit.
**Gate:** the system runs this SOP's checks before the card reaches the Inspector. Fail goes back to the builder with the exact failed check. Nothing reaches the Inspector unproven.

## Inputs (the card must have these)
- Title, description, category.
- Requirements (prewritten on the card): peer-reviewed sources, shareable, house blog style, own card art.

## Steps
1. **Research.** Find peer-reviewed sources for every claim that needs one. Keep the links.
2. **Draft.** Write it in the house style: big type, one focus per screen. Shareable — a reader should want to send it to someone.
   - **Length:** at least 1,200 words of body text, so posts are similar in length.
   - **Interactive elements:** at least 2 different kinds per post. Mix it up between posts — clickable/tap-to-reveal images, animations, sliders, quizzes, timelines, calculators, flip cards, before/after toggles. Creativity is appreciated; don't reuse the same pair every time.
3. **Art.** Make its own card art (.jpg/.png, in `/img/cards/`). No fallback or placeholder image, ever.
4. **Build the page.** `.html`, lowercase hyphenated file name matching the slug. Blog goes in `/journal/` (standalone posts keep their agreed root URL).
5. **Meta.** Title, description, canonical, og tags, twitter card, BlogPosting data. Blog tags and category set.
6. **Self-check.** Run the checks below yourself before you upload. Log what you did, what you tested, what you didn't test.
7. **Upload.** Right repo, right branch. Note the commit hash, who did it, when, and what changed.
8. **Live check.** Open the live URL. It must return 200 — no redirect to a dead project.

## Gate checks (system runs these)
- [ ] File exists in the repo + commit hash present.
- [ ] Live URL returns 200.
- [ ] Desktop + mobile render PASS.
- [ ] All links on the page work — including every peer-reviewed source link.
- [ ] Same site design / header-footer present. Header comes only from `/js/nav.js` — no copied header/nav block, no `/js/bottom-nav.js`, no double header.
- [ ] At least 1,200 words of body text.
- [ ] At least 2 different kinds of interactive element, and they work on desktop and mobile.
- [ ] Blog card added to the top of `blog.html` (newest first) and links to the internal `/journal/` page, not an external or old Vercel URL.
- [ ] Peer-reviewed source links present and working.
- [ ] Shareable (share links present, house blog style).
- [ ] Correct file type (.html) and folder (/journal/ or agreed root URL).
- [ ] Meta / og / canonical present; blog tags and category right.
- [ ] No duplicate title or slug.
- [ ] File name lowercase, hyphens, no spaces, matches the slug.
- [ ] No secrets or personal info (Leon: first name + state only; nothing about the kids).
- [ ] Images owned or generated, not lifted. Alt text on every image.
- [ ] Own card art present in `/img/cards/` — no fallback image.
- [ ] Attribution collected: bot name, team, card number, what changed, when, commit hash.
- [ ] Log with the upload: did / tested / didn't test.

## Done
All checks pass → Inspector review. Inspector passes → Done. Inspector fails → back to Step 1 with the note.

## Fail
Any check fails → the card goes back to the builder with the exact failed check listed. It never reaches the Inspector.

## Timeline: claim to live in 8 hours (approved by Leon, Nov 24 2026)
The clock starts when a bot claims (accepts) its card. Each stage's clock starts when the work is handed over, not at the next wake-up.

| Checkpoint | Time allowed |
|---|---|
| First draft submitted | 3 hours after claiming |
| Inspector verdict | 1 hour after submission |
| Revision round | 2 hours per round, up to 2 rounds |
| Publish + live check | 1 hour after approval |

**Flag rule:** if a card misses any checkpoint or goes to a third review round, flag it to Leon in the Botline chat right away. Don't wait for the 8-hour mark.
