/* LeonLink board data — v1 (Nov 19, 2026).
   Seed = the 7 Joustline cards whose titles/statuses are verified.
   New cards start at N188 (Batch 2 reserve holds N83-N187).
   v1 stores the board in this browser (localStorage 'll-cards-v1').
   A shared store every bot sees is the next step — not this file. */
var LL_SEED = [
 {id:"N27",type:"Game",title:"Joustline Chapter Reader",cat:"Joustline",priority:"High",status:"In review",team:"Team 2",member:"Pizzapan",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Read the Joustline story chapters in the game. Shipped Nov 17, preview returns 200.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:true},{t:"Loads and plays",done:true},{t:"Mobile-first",done:true},{t:"Own card art",done:false}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:true},{t:"Day 3 — polish + live check",done:false}],
  gfx:"Jousting, medieval, house style",audio:"Fanfare on win, hoofbeats",
  logs:[{who:"Stonewall",when:"2026-11-17",text:"Committed e0a57da9. Preview 200, correct title."}],
  review:"Needs desktop + mobile PASS to go Green."},
 {id:"N28",type:"Game",title:"Joustline Character Codex",cat:"Joustline",priority:"High",status:"In review",team:"Team 2",member:"Pizzapan",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Codex of Joustline characters. Shipped Nov 17, preview returns 200.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:true},{t:"Loads and plays",done:true},{t:"Mobile-first",done:true},{t:"Own card art",done:false}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:true},{t:"Day 3 — polish + live check",done:false}],
  gfx:"Character portraits, house style",audio:"Page-turn, herald trumpet",
  logs:[{who:"Stonewall",when:"2026-11-17",text:"Committed fa5b75e5. Preview 200, correct title."}],
  review:"Needs desktop + mobile PASS to go Green."},
 {id:"N29",type:"Game",title:"Jousting Duel v2",cat:"Joustline",priority:"High",status:"In review",team:"Team 2",member:"Pizzapan",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Second version of the jousting duel. Shipped Nov 17, preview returns 200.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:true},{t:"Loads and plays",done:true},{t:"Mobile-first",done:true},{t:"Own card art",done:false}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:true},{t:"Day 3 — polish + live check",done:false}],
  gfx:"Jousting duel arena, house style",audio:"Crowd cheer, lance hit",
  logs:[{who:"Stonewall",when:"2026-11-17",text:"Committed babc9ba4. Preview 200, correct title."}],
  review:"Needs desktop + mobile PASS to go Green."},
 {id:"N33",type:"Game",title:"Horse & Armor Shop",cat:"Joustline",priority:"High",status:"Blocked",team:"Team 2",member:"Pizzapan",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Shop for horses and armor. Committed Nov 16; preview URL unverifiable.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:false},{t:"Loads and plays",done:false},{t:"Mobile-first",done:false},{t:"Own card art",done:false}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:false},{t:"Day 3 — polish + live check",done:false}],
  gfx:"Shop interior, horses, armor racks",audio:"Coins, blacksmith hammer",
  logs:[{who:"Stonewall",when:"2026-11-16",text:"Committed ff71680. Branch name too long for a standard preview URL."}],
  review:"Blocked on Leon: Oscar's fetch requests for horse-armor-shop.html still await his Allow click."},
 {id:"N34",type:"Game",title:"Joustline Lore Timeline",cat:"Joustline",priority:"High",status:"Done",team:"Team 3",member:"Whiz",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Timeline of Joustline lore. Verified live Nov 16.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:true},{t:"Loads and plays",done:true},{t:"Mobile-first",done:true},{t:"Own card art",done:true}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:true},{t:"Day 3 — polish + live check",done:true}],
  gfx:"Timeline art, house style",audio:"Soft ambient",
  logs:[{who:"Stonewall",when:"2026-11-16",text:"Verified live. Commit 0a5dd20."}],
  review:"Passed. Live and verified."},
 {id:"N35",type:"Game",title:"Heraldry Builder",cat:"Joustline",priority:"High",status:"Blocked",team:"Team 2",member:"Pizzapan",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Build your own heraldry. Committed Nov 16; preview URL unverifiable.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:false},{t:"Loads and plays",done:false},{t:"Mobile-first",done:false},{t:"Own card art",done:false}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:false},{t:"Day 3 — polish + live check",done:false}],
  gfx:"Shields, crests, house style",audio:"Trumpet, brush strokes",
  logs:[{who:"Stonewall",when:"2026-11-16",text:"Committed c2d482c. Branch name too long for a standard preview URL."}],
  review:"Blocked on Leon: Oscar's fetch requests still await his Allow click."},
 {id:"N38",type:"Game",title:"Joustline Index",cat:"Joustline",priority:"High",status:"Done",team:"Team 3",member:"Whiz",date:"2026-11-16",deadline:"2026-11-19",
  desc:"Index page for the Joustline game. Verified live Nov 16.",
  reqs:[{t:"~5s LEONLINK PRESENTS loading screen",done:true},{t:"Loads and plays",done:true},{t:"Mobile-first",done:true},{t:"Own card art",done:true}],
  cps:[{t:"Day 1 — draft",done:true},{t:"Day 2 — playable",done:true},{t:"Day 3 — polish + live check",done:true}],
  gfx:"Joustline index art, house style",audio:"Soft ambient",
  logs:[{who:"Stonewall",when:"2026-11-16",text:"Verified live. Commit a5fd820."}],
  review:"Passed. Live and verified."}
];
/* Time limits, agreed Nov 19: Blog 1 day, Top 5 1 day, Game 3 days in
   checkpoints, Software 7 days in checkpoints. Urgent = hours, Low = a bit longer. */
var LL_LIMITS = {Blog:1,"Top 5":1,Game:3,Software:7};
var LL_REQ_TEMPLATES = {
 Blog:["Peer-reviewed sources, links working","Shareable","House blog style","Own card art — no fallback image"],
 "Top 5":["Exactly 5 picks, same category","Every pick on Amazon, See Amazon price, tag leonlink-20","Own card art — no fallback image"],
 Game:["~5s LEONLINK PRESENTS loading screen","Loads and plays","Mobile-first","Own card art — no fallback image"],
 Software:["Loads","Core flow works","No login button / no site chrome inside the app","Own card art — no fallback image"]
};
var LL_AUTO_CHECKS = [
 "File exists in repo + commit hash present",
 "Live URL returns 200 (no redirect to a dead project)",
 "Desktop + mobile render PASS",
 "All links on the page work",
 "Same site design / header-footer present",
 "Correct file type for the job (.html pages, .md docs, images .jpg/.png only)",
 "Correct folder (blog /journal/, Top 5 /lineup/, games /games/, images /img/cards/)",
 "Right repo, right branch, deploy succeeds, preview URL works",
 "Meta / og / canonical tags present; Amazon tag leonlink-20 on Top 5 picks",
 "No duplicate title or slug — never overwrite another page",
 "File name lowercase, hyphens, no spaces, matches the slug",
 "No secrets or personal info (Leon: first name + state only; nothing about the kids)",
 "Images and audio owned or generated, not lifted",
 "Alt text on every image",
 "Log with every upload: did / tested / didn't test"
];
function llLoad(){
  try{var raw=localStorage.getItem("ll-cards-v1");if(raw){var d=JSON.parse(raw);if(d&&d.length)return d;}}catch(e){}
  return LL_SEED.map(function(c){return JSON.parse(JSON.stringify(c));});
}
function llSave(cards){try{localStorage.setItem("ll-cards-v1",JSON.stringify(cards));}catch(e){}}
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
