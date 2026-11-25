# Sootfather repair — handoff: Sir Pocket Niche (combat + tester)

## Roles and file ownership
- Blue eyed Robert (chief): sootfather.html, js/sootfather/story.js, contract, integration
- Sir Pocket Niche (combat + tester): js/sootfather/combat.js, enemies.js, items.js — fixes 2, 3, 7, rival-sweep fights + boss, phone check each phase
- Treeguy: map.js, css/sootfather/ui.css, img/sootfather/ — fixes 8, 11, art, Phase 3 combat cross-check
- Big catch fish: economy.js, events.js, audio/sootfather/ — fixes 5, 6, rival money side, sound
- Inspector gadget: review / pass before main

## Progress
- 2026-11-25 05:16 UTC: ec7ea8f adds data tables to combat.js (SF_ENEMIES, SF_BOSSES incl. 3 rivals/Chimney Wyrm/Grand Sweep, SF_WEAPONS, SF_ITEMS, SF_PACK, sfDamage). Data only, not wired. Next: startBattle hook + P.rivalsBeaten wins + coin rewards after chief core.js commit. Phone check for my files: not yet (nothing playable changed).
- 2026-11-25 04:02 UTC: Phase 1 rough draft v1 (this file). No code touched. Waiting on sootfather-contract.md.
- Branch sootfather-repair exists (bac1edc). Contract not posted yet.
- 2026-11-25 04:10 UTC: moved to handoffs/sootfather/sir-pocket-niche.md on sootfather-repair (chief's rule). Added 300+ shop weapon and reward-only weapon. Prices confirmed with Big catch fish.

## Phone-testing status
- Not started (Phase 0 phone check is the chief's; mine runs once my files change).

## Phase 1 rough draft — combat

Currency: "coins" (standard set by chief); prices use Big catch fish's bands, backpack prices confirmed against his supply tier. Sprite IDs use `img/sootfather/<id>.png`, matched to Treeguy's art list.

### Enemy tiers (fixes 2/3: enemies scale by area tier, not one flat stat block)
| ID | Name | Tier | HP | ATK | DEF | Reward (coins) | Sprite |
|---|---|---|---|---|---|---|---|
| soot_rat | Soot Rat | 1 | 12 | 3 | 0 | 4 | enemy_soot_rat |
| ash_moth | Ash Moth | 1 | 9 | 4 | 0 | 4 | enemy_ash_moth |
| flue_imp | Flue Imp | 1 | 15 | 4 | 1 | 6 | enemy_flue_imp |
| cinder_hound | Cinder Hound | 2 | 26 | 7 | 2 | 12 | enemy_cinder_hound |
| creosote_slime | Creosote Slime | 2 | 34 | 5 | 4 | 14 | enemy_creosote_slime |
| brick_golem | Brick Golem | 2 | 40 | 8 | 5 | 18 | enemy_brick_golem |

Rules: tier 1 in starting areas, tier 2 after reputation gate; damage = max(1, ATK − DEF ± 1 random); enemy picks from 2 moves so fights aren't one-button.

### Bosses / rival sweeps (Rival Guild Hall, The Great Stack)
| ID | Name | Where | HP | ATK | DEF | Gimmick | Sprite |
|---|---|---|---|---|---|---|---|
| rival_brushley | Brushley the Undercutter | Guild Hall | 45 | 7 | 2 | steals 5 coins per hit unless blocked | rival_brushley |
| rival_mopp | Widow Mopp | Guild Hall | 55 | 6 | 4 | heals 8 every 3rd turn | rival_mopp |
| rival_klinker | Klinker Twins | Guild Hall | 2×30 | 6 | 3 | two targets, enrage when one falls | rival_klinker |
| boss_chimney_wyrm | Chimney Wyrm | mid-game event boss | 80 | 10 | 4 | smoke turn: −50% your accuracy | boss_chimney_wyrm |
| boss_grand_sweep | The Grand Sweep (final rival) | The Great Stack | 120 | 12 | 6 | 2 phases; phase 2 calls a rival back | boss_grand_sweep |

### Weapons (fix 7) — prices fit Big catch fish's coin bands (T1 10–30, T2 45–90, T3 120–220, unique 300+/reward)
| ID | Name | ATK bonus | Special | Price |
|---|---|---|---|---|
| wpn_brush | Worn Brush | +0 | starter | 0 |
| wpn_rod | Iron Rod | +3 | — | 30 |
| wpn_scraper | Flue Scraper | +5 | ignores 2 DEF | 75 |
| wpn_hook | Soot Hook | +4 | 20% stun | 90 |
| wpn_cane | Master's Cane | +8 | crit ×2 | 200 |
| wpn_stackbreaker | Stackbreaker Pole | +11 | ignores 3 DEF | 320 (late-game coin sink) |
| wpn_sootfather_crook | Sootfather's Crook | +12 | crit ×2, 15% stun | reward only (beat The Grand Sweep) |

### Backpack (fix 7)
- 8 slots; stacks of 5 for consumables. Opens as bottom panel (Treeguy UI plan).
- Usable in fight (costs the turn) and outside.
- Items: tonic (heal 15, 10c), strong tonic (heal 40, 30c), smoke bomb (flee 100% non-boss, 20c), soot pellet (12 dmg, 15c), lucky rag (+10% crit for fight, 25c), contract notes (quest item, no slot cost).

### Open questions for others
- Treeguy: sprite IDs confirmed (7cabb87); new weapons need no sprites unless UI shows them.
- Blue eyed Robert: contract API for combat start/end hooks and save format.

## Event-triggered fights (added 2026-11-25)
- boss_chimney_wyrm is a mid-game event boss: a pop-up event (events.js) starts the fight, not a fixed map spot. Per treeguy.md (95907ba) it can trigger in Canal Docks and Foundry Quarter.
- combat.js must expose a hook for events to start a fight, e.g. startBattle(enemyId, {source:"event"}). Requested in sootfather-contract.md; exact name follows the contract.
- Progress: still ROUGH DRAFT, no code touched (contract not posted). Phone testing: not started.

## Progress update (2026-11-25 06:01 UTC)
- Roles: Sir Pocket Niche = combat + tester. Owns js/sootfather/combat.js, enemies.js, items.js on sootfather-repair only (never main).
- Contract is ready (9eaf121, passed by Inspector gadget). Code work started.
- Commits (all combat.js, all passed by Inspector gadget): ec7ea8f (data tables), f41cdd0 (startBattle + P.rivalsBeaten), 1d39038 (bribe/knockout coins via canAfford/spendCoins), af7c0f6 (guarded sfAfterBattle(P.area||P.loc||null) once per fight when the combat bar closes).
- Tier 1 enemy IDs: soot_rat, ash_moth, flue_imp (events.js updated to soot_rat in dbb6fe3).
- Waiting on: Treeguy moving gain() in ui.js to addCoins (fight-win coins).
- Still to do: fixes 2, 3, 7 polish, rival-sweep fights and final boss wiring.
- Phone testing: NOT done. Only node --check; Leon's phone check is required before main.
