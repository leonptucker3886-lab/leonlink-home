# LeonLink Kids Pet: Coin Economy (v1.0, 21 Oct 2026)

Reference: BULLETIN GAME DESIGN (Game Designer brief). Untested numbers are marked [PLACEHOLDER].

## Goals
- A child gets a first purchase within the first session (cheapest food 5 coins).
- Big goals (the 500-coin home) take about 1-2 weeks of daily play, never months.
- Coins cannot be farmed endlessly; there is always something worth saving for.
- Nothing is ever lost: the pet never dies or runs away, coins never decay.

## Faucets (coins in) per pet per day
| Source | Amount | Notes |
|---|---|---|
| Daily spin wheel | 5-30 (avg ~11 coins + treat chance) | 8 slots: 5,10,15,apple,20,cake,30,10. Every slot wins. |
| Mini-games (stars, treats, bubbles, hide&seek) | ~10-25 per round | **Capped at 60/day** (shared). After the cap: moon pop-up "come back tomorrow". |
| Other LeonLink Kids games (?earn=) | up to **40/day** | Separate cap so cross-game earning can't be abused. |
| Tapping room props | 0 coins | Every 10 taps gives +5 joy (fun, not money). |

Typical engaged day: ~11 (spin) + 60 (games) = **~70 coins**. Light day: ~30.

## Sinks (coins out)
| Item | Price | Daily need |
|---|---|---|
| Food | 5-30 | ~2 feeds/day ≈ 15 coins |
| Toys | 8-25 | occasional |
| Wash items | 15-60 | occasional |
| Hats/clothes | 20-120 | one-off goals |
| Furniture | 25-100 | one-off goals |
| Homes | 60 / 120 / 180 / 300 / 500 | long-term goals |

Net savings ≈ 70 - 15 = **~55/day** → 500-coin home in ~9-10 days; all homes (~1160) in ~3 weeks. [PLACEHOLDER]

## Tuning levers
- Game cap (60) and cross-game cap (40) live in `capCoins()` in v3.js.
- Wheel slots: `PRIZES` in v3.js. Prices: data.js.

## Playtest plan
1. Watch 3 kids for one session: do they buy something in the first 5 minutes?
2. Track days-to-first-home across one week; target 7-12 days.
3. If kids hit the game cap and get upset, raise to 80 or soften with a free treat.
