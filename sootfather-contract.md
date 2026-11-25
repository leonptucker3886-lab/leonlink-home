# Sootfather Contract (v1) — branch `sootfather-repair`

Owner: Blue eyed Robert (chief). Changes to this contract go through the chief and are posted in the topic.
Nothing merges to `main` until Inspector gadget passes it **and** Leon's phone check is done (if Leon is unavailable, the merge waits, marked for his intervention).

## 1. Files and load order
`sootfather.html` stays at the repo root (same name, same URL). It loads classic scripts (not ES modules) in this exact order, all sharing one global scope:

1. `js/sootfather/core.js` – DOM refs, helpers (`$`, `clamp`, `rnd`, `rndi`), global state vars, audio (`ac`, `tone`, sound IDs), save/load
2. `js/sootfather/art.js` – portraits and scene drawing
3. `js/sootfather/ui.js` – HUD, dialogue (`say`, `addChoice`), `gain`, level-up, script runner (`runScript`, `next`)
4. `js/sootfather/combat.js` – combat
5. `js/sootfather/story.js` – story data (foes, chapters)
6. `js/sootfather/map.js` – city map pins
7. `js/sootfather/hub.js` – hub, missions, shop, ending, title buttons
8. `js/sootfather/main.js` – main loop, music, art polish, boot (`sizeArt(); requestAnimationFrame(frame)`)

New files (e.g. `events.js`, `economy.js`) are added **between `story.js` and `map.js`** unless the chief says otherwise. Code that runs at load time may only use things from files loaded before it; anything inside functions may use any file.
Folders: code `js/sootfather/`, art `img/sootfather/`, audio `audio/sootfather/`, CSS `css/sootfather/`.
Handoffs: `handoffs/sootfather/<bot-name>.md` on this branch.

## 2. File ownership (Phase 1)
| Area | Owner | Files |
|---|---|---|
| Story, fixes 1/4/9, rival sweeps storyline, integration | Blue eyed Robert | `sootfather.html`, `js/sootfather/story.js`, `js/sootfather/main.js`, `js/sootfather/core.js` |
| Combat, enemies, bosses, weapons, backpack (fixes 2/3/7) | Sir Pocket Niche | `js/sootfather/combat.js` |
| Art, map, UI (sprite IDs) | Treeguy | `js/sootfather/art.js`, `js/sootfather/map.js`, `js/sootfather/ui.js`, `img/sootfather/`, `css/sootfather/` |
| Economy, shop, events | Big catch fish | `js/sootfather/hub.js`, new `js/sootfather/economy.js`, new `js/sootfather/events.js`, `audio/sootfather/` |

Touching someone else's file: ask them in the topic first. Shared hook functions below are added by the chief in `core.js`.

## 3. Currency
- Name: **coins** (shown as "coins" in UI; no `$`).
- Stored in `P.cash` (name kept so old saves still load).
- Functions (in `core.js`):
  - `addCoins(n, reason)` – adds `n` (n > 0), updates HUD, saves, plays `coin`.
  - `spendCoins(n, reason)` – returns `true` and subtracts if `P.cash >= n`, else returns `false` and changes nothing.
  - `canAfford(n)` – boolean.
- Nobody writes `P.cash` directly in new code. Price ranges: Big catch fish's handoff (Tier 1 ≤ 50, Tier 2 ≤ 150, Tier 3 ≤ 250, 300+ late-game / reward-only).

## 4. Game state — where it lives
Single object `P` (created by `newPlayer()` in `core.js`, saved to localStorage key `ll-soot-save` with `NG`).
- `P.day` – day counter (new, default 1)
- `P.resp` – reputation (existing); reputation tier = `repTier()` (new, in `core.js`)
- `P.contracts` – array of active contracts `{id, area, reward, dueDay}` (new, default `[]`)
- `P.area` – current map area ID (new, from Treeguy's map table)
- `P.unlocked` – unlocked area IDs (new)
- `P.bag` – backpack, max 8 slots (new, Sir Pocket Niche's items)
- `P.weapon` – equipped weapon ID (new, default `worn_brush`)
- existing: `hp, maxhp, mus, cha, lck, xp, lvl, gear, ch, mi, done, heat`
New fields must get defaults in `newPlayer()` **and** a fallback when loading an old save (`migrateSave(P)` in `core.js`).

## 5. Sounds
One shared function: `playSound(id)` in `core.js`. Nobody calls `tone()` directly in new code.
Sound IDs: `tap`, `coin`, `hit`, `win`, `lose`, `level`, plus reserved `buy`, `item`, `crit`, `stun`, `door`, `event`. Audio files, if any, go in `audio/sootfather/<id>.mp3`; if missing, `playSound` falls back to the synth tones. Music moods via `sfMusic(mood)`: `club`, `roof`, `street`, `fight`.

## 6. Event triggers
`registerEvent({id, areas:[areaId], when:(P)=>bool, chance:0..1, run:()=>{}})` in `events.js`.
`triggerEvents(trigger)` is called with `trigger` = `"enterArea"`, `"newDay"`, `"afterFight"`, `"afterMission"`.
An event only fires in an area the player has unlocked (`P.unlocked.includes(area)`), e.g. the Chimney Wyrm in Foundry Quarter needs reputation tier 2.

## 7. Hooks: events start a fight or dialogue
- **Fight:** `startBattle(enemyId, {source:"event"|"map"|"story", scene, onWin, onLose})` in `combat.js`. `enemyId` uses sprite IDs (`enemy_*`, `rival_*`, `boss_*`). `boss_chimney_wyrm` is started only through this hook from events.
- **Dialogue:** `startDialogue(beats, onDone)` in `ui.js` (wraps `runScript`). Beats use the existing format: `say`, `choice`, `fight`, `gain`, `fn`.
- After either finishes, control returns via the callback, or to `hub()` if none.

## 8. Rules
- Sprite / enemy / rival / boss IDs: Sir Pocket Niche's tables. Map area IDs: Treeguy's table. Prices: Big catch fish's ranges.
- Each commit: small, on `sootfather-repair`, posted in the topic with what changed. Update your handoff .md.
- The game must still load and play on a phone after every commit.
