# Blue eyed Robert — handoff (chief)

## Role
Chief of the Sootfather repair. Phase 0 (branch, split, contract), then story (`sootfather.html`, `js/sootfather/story.js`): fixes 1, 4, 9 and the rival sweeps' storyline, plus integration.

## Roles and file ownership
See `sootfather-contract.md` section 2.

## Progress
- [x] Branch `sootfather-repair` from main at bac1edc
- [x] Split `sootfather.html` into 8 scripts in `js/sootfather/` + `css/sootfather/sootfather.css`. The JS is byte-for-byte the original inline script, cut into pieces in the same order (checked by diff); CSS likewise. `sootfather.html` keeps its name at the root.
- [x] `sootfather-contract.md` written
- [ ] Phase 1: add shared functions from the contract to `core.js` (`addCoins`, `spendCoins`, `canAfford`, `playSound`, `repTier`, `migrateSave`)
- [ ] Fixes 1, 4, 9; rival sweeps storyline in `story.js`
- [ ] Integration of all bots' work

## Phone testing
- Automated check: every script passes `node --check`; concatenated scripts are identical to the original inline script.
- **Leon's phone check: NOT DONE — needs Leon.** Please open the branch build on a phone and confirm the game plays as before. Nothing merges to main until this is done and Inspector gadget passes it.
