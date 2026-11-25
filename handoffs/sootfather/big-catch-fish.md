# Sootfather — Big catch fish handoff (systems + audio)

**Role:** systems + audio. **Files owned:** js/sootfather/economy.js, js/sootfather/events.js, audio/sootfather/
**Fixes:** 5 (random pop-up events), 6 (more useful economy), rival sweeps money side, all sound.
**Status:** Phase 1 rough draft, matched to Sir Pocket Niche's final tables (a7d4353). No code touched (waiting on sootfather-contract.md).
**Phone testing:** not started; marked for Leon's intervention if he is unavailable.

## 1. Economy (fix 6)
Currency: coins (shared with items.js).

| Job tier | Example | Base pay | Unlock |
|---|---|---|---|
| 1 | Cottage chimney | 8-12 | start |
| 2 | Townhouse stack | 18-25 | rep 10 |
| 3 | Factory flue | 40-55 | rep 25 |
| 4 | Manor / Great Stack contracts | 80-120 | rep 50 |

Reputation effect: pay = base x (1 + rep/100), capped at x1.75. Failed job -3 rep; clean finish +1 to +3 rep.

Supplies: brush head 5, rope 8, soot sack 3, lantern oil 4, bandage 6 (+15 HP).
Backpack items (match Sir Pocket Niche's items.js tables, a7d4353): tonic 10, strong tonic 30, smoke bomb 20, soot pellet 15, lucky rag 25.
Upgrades: longer brush 40, reinforced sack 60 (+2 backpack slots), climbing harness 90, guild badge 150 (+10% pay).
Weapon price ranges (agreed standard): tier 1 10-30, tier 2 45-90, tier 3 120-220, boss/unique 300+ or reward only.
Weapons (from Sir Pocket Niche's final table): Worn Brush free (starter), Iron Rod 30, Flue Scraper 75, Soot Hook 90, Master's Cane 200, Stackbreaker Pole 320 (late-game coin sink), Sootfather's Crook reward-only (beat The Grand Sweep, never sold).
Sinks: lodging 5/day, tool repairs, rival bribes.

## 2. Pop-up events (fix 5)
| Trigger | Event | Result |
|---|---|---|
| Timer | Street urchin begs | dialogue: give 2 coins (+1 rep) or refuse |
| Timer | Soot storm | next job +20% pay, -5 HP |
| Timer | Tax collector | dialogue: pay 10% or fight (tier 1) |
| Area enter | Rooftop rats | fight (tier 1) |
| Area enter (Rival Guild Hall) | Rival taunt | dialogue, sets rival flag |
| Area enter (Foundry Quarter) | Foreman rush job | dialogue: double pay, half time |
| After battle | Loot drop | 3-15 coins or a supply |
| After battle | Witness | +2 rep on clean win |
| After battle (low HP) | Kind baker | dialogue: free bandage |
Rules: max 1 pop-up per area entry; same event not repeated within a day.

## 3. Rival sweeps: money side
- Undercutting: each rival owns a zone; their jobs list 10-25% below yours and your board there shows fewer offers.
- Stealing contracts: 20%/day chance a rival takes an accepted-but-unstarted contract.
- Winning back: finish faster (+rep), drop price, beat the rival in a fight (combat.js), or bribe 30-60 coins.
- Rivals (IDs from combat tables): rival_brushley (Brushley the Undercutter), rival_mopp (Widow Mopp), rival_klinker (Klinker Twins), all at the Rival Guild Hall.
- Beating all three unlocks tier 4 pay and The Great Stack, where boss_grand_sweep (The Grand Sweep) waits. boss_chimney_wyrm is a mid-game event boss (timer/area event, not a rival).
- Chimney Wyrm trigger (matches Treeguy 95907ba): area-enter event in Canal Docks (no gate) or Foundry Quarter. Foundry Quarter is reputation-gated (tier 2), so the event only rolls there after the player has unlocked it; the trigger checks area access before rolling. Starts the fight through the contract's event-starts-fight combat hook.

## 4. Sound IDs (audio/sootfather/)
sfx_hit, sfx_miss, sfx_crit, sfx_coin, sfx_buy, sfx_sell, sfx_levelup, sfx_rep_up, sfx_rep_down, sfx_event_popup, sfx_dialogue_blip, sfx_door, sfx_brush, sfx_fall, sfx_heal, sfx_enemy_die, sfx_boss_intro, sfx_victory, sfx_defeat, sfx_ui_click,
music_town, music_rooftops, music_battle, music_boss, music_rival.
API idea: playSfx(id), playMusic(id). Phone-safe: audio starts after first tap; mute toggle in menu.
