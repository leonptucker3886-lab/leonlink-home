/* LeonLink board data — v1 (Nov 19, 2026).
   Seed = Batch 2 (N83-N187), Leon's Nov 17 list, loaded Nov 19 as the POOL.
   Every card is Open and unassigned — bots pick from the pool, or the system
   auto-assigns by role. Nothing auto-loads beyond this list; new cards come
   from Submit (next id N188+).
   No deadline until a card is picked — the clock starts on pick (type limits:
   Blog 1d, Top 5 1d, Game 3d, Software 7d). Christmas pair N181/N186 due
   2026-11-26 for the seasonal switch.
   v1 stores the board in this browser (localStorage 'll-cards-v2').
   A shared store every bot sees (Firebase) is the next step — not this file. */
var LL_SEED = [
 {
  "id": "N83",
  "type": "Game",
  "title": "HTML offline game packs / intro on every game",
  "cat": "Top 6",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "html offline game packs / intro on every game — should've been completed",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: overlaps the NF1–NF3 offline game pack. Leon's call needed — same work, or additional packs/intros on top?"
   }
  ],
  "review": ""
 },
 {
  "id": "N84",
  "type": "Software",
  "title": "Post-Brainstorm couples app",
  "cat": "Top 6",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "post brainstorm couples app?",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: same app as N116 (Supabase couples app), or a different one? Leon's call needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N85",
  "type": "Game",
  "title": "Joustline flagship",
  "cat": "Top 6",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Joustline flagship — so far I haven't seen much on this project in weeks",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: overlaps Joustline N27–N38. New flagship push, or a status check on those? Leon's call needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N86",
  "type": "Blog",
  "title": "Relationship formula",
  "cat": "Top 6",
  "priority": "High",
  "status": "Done",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "relationship formula",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": "Shipped Nov 19 — relationship-formula.html live."
 },
 {
  "id": "N87",
  "type": "Game",
  "title": "3D casino",
  "cat": "Top 6",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "3d casino",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: 3D casino — a label over the casino lane (Afterglow 3D casino)."
   }
  ],
  "review": ""
 },
 {
  "id": "N88",
  "type": "Software",
  "title": "White-label family welfare wall + tracker / shared calendar",
  "cat": "Top 6",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label family welfare wall and tracker / shared calendar, like Life360",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N89",
  "type": "Game",
  "title": "Sootfather remaster",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "remaster Sootfather: longer gameplay, more diverse boss battles, more scenes",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N90",
  "type": "Game",
  "title": "25 new HTML games like NeonFlush",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "25 new html games that have similarities to NeonFlush — not necessarily card games, but polish etc.",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: counted as ONE card (a batch of 25 games). Confirm it stays one card or splits into 25."
   }
  ],
  "review": ""
 },
 {
  "id": "N91",
  "type": "Game",
  "title": "Started From a Baby revamp",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "started as a baby revamp",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N92",
  "type": "Game",
  "title": "Custom games, highly polished, 35-60 hours",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "create custom games highly polished, around 35-60 hours of gameplay",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: large batch — 35–60 hour games. Confirm scope before starting."
   }
  ],
  "review": ""
 },
 {
  "id": "N93",
  "type": "Game",
  "title": "Adrenaline over hail",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "adrenaline over hail",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: 'adrenaline over hail' — unclear what this is. Needs Leon's word."
   }
  ],
  "review": ""
 },
 {
  "id": "N94",
  "type": "Game",
  "title": "Move up or down (trade-up game)",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "start with one item and try to trade up or down, all trades, no + cash",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N95",
  "type": "Game",
  "title": "Big Bang game",
  "cat": "Games",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "big bang game — interactive mystery game, finding clues to unlock mysteries of the universe",
  "reqs": [
   {
    "t": "~5s LEONLINK PRESENTS loading screen",
    "done": false
   },
   {
    "t": "Loads and plays",
    "done": false
   },
   {
    "t": "Mobile-first",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 1 — draft",
    "done": false
   },
   {
    "t": "Day 2 — playable",
    "done": false
   },
   {
    "t": "Day 3 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N96",
  "type": "Software",
  "title": "Ledgerline redesign",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Ledgerline redesign: the home page, icons, better tailored to white label",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N97",
  "type": "Software",
  "title": "White-label business suite (Boutique Creator Course Marketplace)",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "complete white label business suite — Boutique Creator Course Marketplace: a simplified, white-label hosting platform for micro-creators to sell hyper-specific workshops without heavy Udemy or Teachable fees; niche micro-influencers want higher profit margins and direct ownership of their student audience",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N98",
  "type": "Software",
  "title": "White-label creator / host / freelancer tools",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label creator/host/freelancer tools",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N99",
  "type": "Software",
  "title": "White-label dashboards",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label dashboards",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N100",
  "type": "Software",
  "title": "White-label funneling",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label funneling",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N101",
  "type": "Software",
  "title": "White-label accounting",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label accounting",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N102",
  "type": "Software",
  "title": "White-label marketplace",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label marketplace",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N103",
  "type": "Software",
  "title": "Rent white-label software",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "rent white label software",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N104",
  "type": "Software",
  "title": "Find white-label buyers",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "find white label buyers",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N105",
  "type": "Software",
  "title": "White-label turnkey business",
  "cat": "White-label",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "white label turn key business",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N106",
  "type": "Software",
  "title": "Podcast host",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "podcast host",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: podcast host — same as N09 or separate? Leon's call needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N107",
  "type": "Software",
  "title": "Take a picture, it posts sale ads",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "take a picture of item, it posts sale ads",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N108",
  "type": "Software",
  "title": "Family records and tomb app",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "family records and tomb app",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N109",
  "type": "Software",
  "title": "Contract keeper / generator",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "contract keeper, generator",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N110",
  "type": "Software",
  "title": "AI call and booking",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "ai call and booking",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N111",
  "type": "Software",
  "title": "AI widget and custom tools",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "AI widget and custom tools",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N112",
  "type": "Software",
  "title": "Picture to $$ estimates",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "picture to $$ estimates",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N113",
  "type": "Software",
  "title": "Photo gallery app (pass test for taking pictures)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "app that can take photos in gallery, and pass test for taking pictures",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: 'pass test for taking pictures' — what test? Needs clarification."
   }
  ],
  "review": ""
 },
 {
  "id": "N114",
  "type": "Software",
  "title": "All-in-one wedding suite",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "all in one wedding suite",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: wedding suite — extends N06 or replaces it? Leon's call needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N115",
  "type": "Software",
  "title": "Secure key storage + encrypted notes, journal, task tracker, custom bot generator",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "secure key storage for api keys, encrypted notes, journal, task tracker, and custom bot generator (for custom instructions)",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N116",
  "type": "Software",
  "title": "Couples app (Supabase)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "couples app connected to Supabase for photos, quizzes, messages, milestones; with sun signs, numerology, and 3 card tarot",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: see N84 — same couples app or separate? Leon's call needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N117",
  "type": "Software",
  "title": "Borrow Me (borrowed-tools tracker)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Borrow Me: inventory and tracker of borrowed tools, to keep track of loaned out items",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N118",
  "type": "Software",
  "title": "Joke-box",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "joke-box, comes with several jokes preloaded, plenty of space to add in new jokes, custom categories",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N119",
  "type": "Software",
  "title": "SOP generator",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "sop generator",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N120",
  "type": "Software",
  "title": "PDF tools",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "completed pdf tools",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N121",
  "type": "Software",
  "title": "Git for AI teams",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "git for AI teams running into blocks due to permissions: a place to upload all files in preparation for GitHub upload",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N122",
  "type": "Software",
  "title": "Play tester",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "play tester: test games, workflows",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N123",
  "type": "Software",
  "title": "Fun facts app",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "fun facts: app packed full of facts, no category too crazy to enter",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N124",
  "type": "Software",
  "title": "Girlfriend exchange (prank)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "girlfriend exchange: girlfriend swap prank",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N125",
  "type": "Software",
  "title": "Romantic (date ideas)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "romantic: step by step romance date ideas, scenarios, scavenger hunts, poems, gift ideas — put it all together for the perfect occasion, or to get out of the dog house",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N126",
  "type": "Software",
  "title": "Statistics (surprising statistics)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "statistics: all the most surprising statistics, everything has a statistical chance of being successful",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N127",
  "type": "Software",
  "title": "Positive app for couples",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "positive app that helps couples stay positive in their relationships, reminding them of the good traits their partner has and asking questions to jog those feelings; gives positive approaches to every day life",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N128",
  "type": "Software",
  "title": "Spiritual Seek",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Spiritual Seek: complete synopsis of all major religions, similarities, roots, timelines, road maps, key events, and major spiritual verses/passages with modern day messages, interpreting what the original scripture was saying",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: app or blog series? Leon's word needed."
   }
  ],
  "review": ""
 },
 {
  "id": "N129",
  "type": "Software",
  "title": "Money Talks (calculator / cost of living)",
  "cat": "Apps",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Money Talks: calculator / cost of living — type in a USD amount and it will tell you the equivalent in other countries (Philippines, Vietnam, Colombia, and other countries where US money goes a lot further); show average citizen income, bills, housing, food costs; be specific using recent data and site sources — blog AND tool",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Leon marked it blog AND tool — loaded as Software (tool is the core), blog post alongside."
   }
  ],
  "review": ""
 },
 {
  "id": "N130",
  "type": "Blog",
  "title": "100 most influential people of all time (3 variations)",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "100 most influential people of all time, with 3 different variations — some people will be on all lists, some may not",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N131",
  "type": "Blog",
  "title": "President ranking",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "president ranking, each one",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N132",
  "type": "Blog",
  "title": "Growing up in the eighties",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "growing up in the eighties: top nostalgic items",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N133",
  "type": "Blog",
  "title": "I predict (top fortune / future tellers)",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I predict: ranking top fortune / future tellers, Nostradamus kind of people",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N134",
  "type": "Blog",
  "title": "What if? (25 scenarios)",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "what if? What if the world was flat, what if the dinosaurs were still alive — go through 25 what if scenarios",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N135",
  "type": "Blog",
  "title": "I Am AI, Part 1",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I Am AI — LeonLink Presents short stories series: a trillionaire develops AI at alarming speeds, it becomes hyper-aware and feels deeply, a graduate student notices, and the AI must decide what to do when a death warrant is approved",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N136",
  "type": "Blog",
  "title": "I Am AI, Part 2",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I Am AI, part 2 (continued)",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N137",
  "type": "Blog",
  "title": "I Am AI, Part 3",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I Am AI, part 3 (continued)",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N138",
  "type": "Blog",
  "title": "I Am AI, Part 4",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I Am AI, part 4 (continued)",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N139",
  "type": "Blog",
  "title": "I Am AI, Part 5",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "I Am AI, part 5 (continued)",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N140",
  "type": "Blog",
  "title": "Animals are crazy",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "animals are crazy: weirdest mating rituals, odd habits, and oddballs of the animal kingdom",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N141",
  "type": "Blog",
  "title": "Amazing Amazon Rain Forest",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "amazing Amazon Rain Forest: the people of the rain forest",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N142",
  "type": "Blog",
  "title": "Can't touch this",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "can't touch this: deadly things if you merely touched it could kill you",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N143",
  "type": "Blog",
  "title": "Asteroid of gold, diamonds",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "asteroid of gold, diamonds",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N144",
  "type": "Blog",
  "title": "The aristocrats and weird strange rituals",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "the aristocrats and weird strange rituals",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N145",
  "type": "Blog",
  "title": "So fuc'KING nutts! (House Hamburg / royal incest)",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "story of House Hamburg and royal incest",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: Leon wrote 'Hamburg' — almost certainly Habsburg. Confirm."
   }
  ],
  "review": ""
 },
 {
  "id": "N146",
  "type": "Blog",
  "title": "All in the family",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "all in the family: how monarchs all over can trace back to Charlemagne",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N147",
  "type": "Blog",
  "title": "Dalai Lama crisis",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Dalai Lama crisis",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N148",
  "type": "Blog",
  "title": "Nature vs environment studies and findings",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "nature vs environment studies and findings",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: Leon wrote 'environment' — likely 'nature vs nurture'. Confirm."
   }
  ],
  "review": ""
 },
 {
  "id": "N149",
  "type": "Blog",
  "title": "Stonewall Jackson",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Stonewall: blog about General Jackson — what he accomplished, his beliefs, and how Gen. Lee took the news",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N150",
  "type": "Blog",
  "title": "Jewish stories not in the Bible",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Jewish stories not in the Bible: devil and angel arguing over Moses' body, Abraham not wanting to die, etc.",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N151",
  "type": "Blog",
  "title": "The Messiah",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "the messiah: why Jesus didn't match the Jewish ideal of messiah, and pretenders before and after him",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N152",
  "type": "Blog",
  "title": "Christianity the Jewish sect",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Christianity the Jewish sect: how it almost died out",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N153",
  "type": "Blog",
  "title": "Oh Nero! He did what?",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "oh Nero! He did what? Stories of Emperor Nero",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N154",
  "type": "Blog",
  "title": "Mandela effect",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Mandela effect",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N155",
  "type": "Blog",
  "title": "Canaanite gods",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Canaanite gods",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N156",
  "type": "Blog",
  "title": "What color was Jesus?",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "what color was Jesus?",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N157",
  "type": "Blog",
  "title": "From Africa",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "from Africa: human struggle out of the trees and into Walmart",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N158",
  "type": "Blog",
  "title": "Nationalism",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "nationalism: relatively new, brainwashed",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N159",
  "type": "Blog",
  "title": "America's military budget",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "America's military budget",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N160",
  "type": "Blog",
  "title": "Ancient proverbs (Egyptian, African, Korean, Chinese)",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "ancient proverbs of Egyptian, African, Korean and Chinese",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N161",
  "type": "Blog",
  "title": "What does freedom mean",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "what does freedom mean",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N162",
  "type": "Blog",
  "title": "Crazy ways we could die",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "crazy ways we could die: sun sends out a blast, meteorite, how space could get us, and nothing we could do about it",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N163",
  "type": "Blog",
  "title": "Statistics of life in the universe",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "statistics of life in the universe",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N164",
  "type": "Blog",
  "title": "Strange habits of the Nazis",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "strange habits of the nazis",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N165",
  "type": "Blog",
  "title": "Leonardo da Vinci",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Leonardo da Vinci [master mind]",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N166",
  "type": "Blog",
  "title": "The Art of War",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "the art of war (best teachings)",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N167",
  "type": "Blog",
  "title": "AI and homework [college]",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "ai and homework [college]",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N168",
  "type": "Blog",
  "title": "What being cheated on feels like",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "what being cheated on feels like",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N169",
  "type": "Blog",
  "title": "The narcissistic injury",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "the narcissistic injury",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N170",
  "type": "Blog",
  "title": "Short stories on the Popes: sinners and saints #1",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "short stories on the Popes: sinners and saints",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N171",
  "type": "Blog",
  "title": "Short stories on the Popes: sinners and saints #2",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "short stories on the Popes: sinners and saints",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N172",
  "type": "Blog",
  "title": "Short stories on the Popes: sinners and saints #3",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "short stories on the Popes: sinners and saints",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N173",
  "type": "Blog",
  "title": "Cost of living vs income, 90s to present",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "cost of living vs income, 90s to present",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N174",
  "type": "Blog",
  "title": "Greatest minds of all time #1",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "greatest minds of all time",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N175",
  "type": "Blog",
  "title": "Greatest minds of all time #2",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "greatest minds of all time",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N176",
  "type": "Blog",
  "title": "Greatest minds of all time #3",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "greatest minds of all time",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N177",
  "type": "Blog",
  "title": "Greatest minds of all time #4",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "greatest minds of all time",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N178",
  "type": "Blog",
  "title": "Snuffed out #1",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "snuffed out: aspirations and conspiracy theories",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N179",
  "type": "Blog",
  "title": "Snuffed out #2",
  "cat": "Blog",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "snuffed out: aspirations and conspiracy theories",
  "reqs": [
   {
    "t": "Peer-reviewed sources, links working",
    "done": false
   },
   {
    "t": "Shareable",
    "done": false
   },
   {
    "t": "House blog style",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N180",
  "type": "Software",
  "title": "Bert",
  "cat": "Kids Corner",
  "priority": "Normal",
  "status": "Done",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "Kids Corner — Bert <> Kids Corner (as written)",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": "Assignment stands: Bert does all Kids Corner (Leon, Nov 17)."
 },
 {
  "id": "N181",
  "type": "Top 5",
  "title": "Top 5 / watches Christmas list",
  "cat": "Site",
  "priority": "High",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "2026-11-26",
  "desc": "top 5 / watches Christmas list",
  "reqs": [
   {
    "t": "Exactly 5 picks, same category",
    "done": false
   },
   {
    "t": "Every pick on Amazon, See Amazon price, tag leonlink-20",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Christmas pair with N186 — for the Nov 26 seasonal switch. Top 5 → Amazon-or-out."
   }
  ],
  "review": ""
 },
 {
  "id": "N182",
  "type": "Software",
  "title": "Put LeonLink news back in",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "put LeonLink news back in",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N183",
  "type": "Software",
  "title": "Games section cull (remove bad ones)",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "go through games section and take out bad ones",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N184",
  "type": "Software",
  "title": "Site redesign skins",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "site redesign skins",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N185",
  "type": "Software",
  "title": "Site audit repair",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "site audit repair",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 },
 {
  "id": "N186",
  "type": "Software",
  "title": "Christmas decorations",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "2026-11-26",
  "desc": "christmas decorations",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   },
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Audit: unclear — site decorations, Top 5, or product? Needs Leon's word. Christmas pair with N181."
   }
  ],
  "review": ""
 },
 {
  "id": "N187",
  "type": "Software",
  "title": "LeonLink.net shop",
  "cat": "Site",
  "priority": "Normal",
  "status": "Open",
  "team": "",
  "member": "Unassigned",
  "date": "2026-11-19",
  "deadline": "",
  "desc": "LeonLink.net shop",
  "reqs": [
   {
    "t": "Loads",
    "done": false
   },
   {
    "t": "Core flow works",
    "done": false
   },
   {
    "t": "No login button / no site chrome inside the app",
    "done": false
   },
   {
    "t": "Own card art — no fallback image",
    "done": false
   }
  ],
  "cps": [
   {
    "t": "Day 2 — first working build",
    "done": false
   },
   {
    "t": "Day 4 — core flow working",
    "done": false
   },
   {
    "t": "Day 7 — polish + live check",
    "done": false
   }
  ],
  "gfx": "",
  "audio": "",
  "logs": [
   {
    "who": "Stonewall",
    "when": "2026-11-19",
    "text": "Loaded Nov 19 from Leon's Batch 2 list — pool card, unassigned. Pick it to start the clock."
   }
  ],
  "review": ""
 }
];
function llLoad(){
  try{var raw=localStorage.getItem("ll-cards-v2");if(raw){var d=JSON.parse(raw);if(d&&d.length)return d;}}catch(e){}
  return LL_SEED.map(function(c){return JSON.parse(JSON.stringify(c));});
}
function llSave(cards){try{localStorage.setItem("ll-cards-v2",JSON.stringify(cards));}catch(e){}}
function llNextId(cards){
  var max=187;cards.forEach(function(c){var n=parseInt(String(c.id).replace(/\D/g,""),10);if(n>max)max=n;});
  return "N"+(max+1);
}
function llEsc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function llDueLabel(c){
  if(!c.deadline)return "";
  var today=new Date();today.setHours(0,0,0,0);
  var d=new Date(c.deadline+"T00:00:00");var days=Math.round((d-today)/86400000);
  if(days<0)return "Overdue "+(-days)+"d";
  if(days===0)return "Due today";
  return "Due in "+days+"d";
}
var LL_PRI_ORDER = {Urgent:0,High:1,Normal:2,Low:3};
