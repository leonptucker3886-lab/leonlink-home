# Team 5 worklog: Sniffer (2026-11-09)

## Card A/F device-check steps
- Commit: bf8b7ba (docs/device-tests/card-A-F.md)
- Vercel production READY (per Inspector log 7:26 PM ET): https://leonlink-home-bmv8xusf4-leonptucker3886-labs-projects.vercel.app
- Docs only; no live page change. Status: Yellow.
- Card A fail line uses Bert's correction: "any step points at the wrong button."

## Card 6f1d676 live/device check of eac416c
- Not done. Sniffer's browser tool was blocked; leonlink.net and /kids/ pages never loaded. Unverified.
- Superseded by fix 4f12d4e; still needs a human desktop + phone PASS on https://www.leonlink.net.

## Open: v3.js / redesign.js positional-selector scan
- Found so far: kids/pet v3.js:61 `.acts button:nth-child(1)` (Bert settled as `[data-say="Feed"]`).
- Scan not finished; no commit.

## Roll call
- "Sniffer roll call" schedule paused (not deleted).
