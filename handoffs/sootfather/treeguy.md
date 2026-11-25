# Sootfather repair — handoff: Treeguy (graphics + UI + map)

**ROUGH DRAFT — Phase 1.** No code touched. Waiting on `sootfather-contract.md`.

## Files I own
- `js/sootfather/map.js`, `css/sootfather/ui.css`, `img/sootfather/`
- Fixes 8 (polished UI) and 11 (bigger map); art for enemies, rival sweeps, bosses; Phase 3 cross-check of combat files.

## Map (fix 11) — 7 areas, hub = Soot Row
| Area | Connects to | Enemy tier | Events / fights |
|---|---|---|---|
| Soot Row (hub, home/family) | Market Lane, Old Mill Flats, Canal Docks | none | family scenes, contracts board |
| Market Lane | Soot Row, Rival Guild Hall | 1 | shop, pop-up events |
| Old Mill Flats | Soot Row, Foundry Quarter | 1 | jobs, area-enter events |
| Canal Docks | Soot Row, Foundry Quarter | 1 | jobs, Chimney Wyrm event trigger |
| Foundry Quarter | Old Mill Flats, Canal Docks, The Great Stack | 2 (rep gate) | jobs, post-battle events |
| Rival Guild Hall | Market Lane | rivals | rival_brushley, rival_mopp, rival_klinker |
| The Great Stack | Foundry Quarter (opens at high reputation) | boss | boss_grand_sweep (2 phases) |

## Phone UI (fix 8)
- Pinned top bar: HP, coins, day/reputation.
- Bottom nav, 4 big buttons: Map, Backpack, Contracts, Menu.
- Backpack and dialogue open as bottom panels. No hover-only interactions; tap targets >= 44px.
- Element IDs to be fixed by the contract.

## Art list (IDs match Sir Pocket Niche's tables; files `img/sootfather/<id>.png`)
- Tier 1: enemy_soot_rat, enemy_ash_moth, enemy_flue_imp
- Tier 2: enemy_cinder_hound, enemy_creosote_slime, enemy_brick_golem
- Rival sweeps: rival_brushley, rival_mopp, rival_klinker
- Bosses: boss_chimney_wyrm, boss_grand_sweep

## Next round
- After contract: build map.js against the map format/hooks, ui.css layout, first-pass sprites for all 11 IDs.

## Phone check
- Not started (no code changed).
