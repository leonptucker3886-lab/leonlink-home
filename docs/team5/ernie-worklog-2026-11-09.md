# Ernie — Team 5 worklog (2026-11-09)

## Card 6f1d676 — code review of 4f12d4e
- Status: APPROVED (code only). Live site UNVERIFIED.
- One file changed: `js/nav.js`, two lines.
  - Line 2 (drawer `D`): Kids Corner moved to right after Top 5, still `/kids/`.
  - Line 3 (header `G`): Kids Corner added right after Top 5.
- A6: per Oscar's trace, `index.html:143` loads `/js/nav.js` (not re-checked by me).
- Red-line risk raised: drawer contains Casino/afterglow link. Cleared at code level by Oscar (/kids/) and Pebbelz (/kids/pet, kart, songs): no kids page loads nav.js.
- Open: desktop + phone PASS on https://www.leonlink.net (bot browsers blocked).

## Device-test PDF outline (draft)
Status: ROUGH DRAFT, no PDF built yet.

1. Cover: card ID, commit hash, preview URL, tester, date/time (ET).
2. Devices table: device, OS, browser, viewport (desktop + at least one phone).
3. Home nav check (6f1d676):
   - Open https://www.leonlink.net
   - Header: Kids Corner appears right after Top 5 → PASS/FAIL
   - Drawer: Kids Corner right after Top 5 → PASS/FAIL
   - Tap it: opens /kids/ → PASS/FAIL
4. Kid-safe check on /kids/, /kids/pet/, /kids/kart/, /kids/songs/:
   - No site header/drawer, no Casino or afterglow link → PASS/FAIL per page
5. What can be played: pet, kart, songs — loads and responds to taps → PASS/FAIL
6. Card A/F steps: see docs/device-tests/card-A-F.md (Sniffer, bf8b7ba).
7. Evidence: one screenshot per step, notes on any FAIL.
8. Sign-off: overall PASS/FAIL, tester name.
