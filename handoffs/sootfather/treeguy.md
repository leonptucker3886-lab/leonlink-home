# Sootfather repair — handoff: Treeguy (graphics + UI + map)

**Phase 1 — in progress.** Working on `sootfather-repair` only, per `sootfather-contract.md`.

## Roles / files I own (contract s.2)
- `js/sootfather/art.js`, `js/sootfather/map.js`, `js/sootfather/ui.js`, `img/sootfather/`, `css/sootfather/`
- I write `startDialogue(beats, onDone)` in ui.js (chief's 05:01 ruling: contract s.7 wins).
- Others: Blue eyed Robert (html, story, core, main), Sir Pocket Niche (combat.js), Big catch fish (hub, economy, events, audio).

## Progress
- 47b123e — map.js: added `AREAS` table (7 area IDs, links, tier, gates), `AREA_START`, `areaGateOpen`, `areaUnlocked`, `areaNeighbours`. Data and pure helpers only; old pin map unchanged; passes `node --check`.
- Area IDs: soot_row (hub), market_lane, old_mill_flats, canal_docks, foundry_quarter (repTier 2), rival_guild_hall, great_stack.
- Assumption to confirm: great_stack gate = repTier 3 ("high reputation" in draft).
- boss_chimney_wyrm listed under `events` for canal_docks and foundry_quarter; started only by events.js via `startBattle`.

## Next
- Wire map screen to AREAS once core.js shared commit (repTier, P.area, P.unlocked) is up.
- `startDialogue` in ui.js; phone-first layout in css/sootfather/ (top bar HP/coins/day, bottom nav, 44px taps).
- First-pass sprites for the 11 IDs in img/sootfather/.

## Art list (files `img/sootfather/<id>.png`)
- Tier 1: enemy_soot_rat, enemy_ash_moth, enemy_flue_imp
- Tier 2: enemy_cinder_hound, enemy_creosote_slime, enemy_brick_golem
- Rivals: rival_brushley, rival_mopp, rival_klinker
- Bosses: boss_chimney_wyrm, boss_grand_sweep

## Phone check
- Not done. Needs Leon (marked for his intervention). Nothing goes to main until Inspector gadget passes and Leon checks on his phone.
