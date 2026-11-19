/* LeonLink board data — v1 (Nov 19, 2026).
   Board cleared Nov 19, 2026: Leon told the whole team to stop and the old
   assignments were removed. New assignments are hand-picked, one at a time,
   from the Batch 2 reserve list — nothing auto-loads.
   New cards start at N188 (Batch 2 reserve holds N83-N187).
   v1 stores the board in this browser (localStorage 'll-cards-v2').
   A shared store every bot sees is the next step — not this file. */
var LL_SEED = [];
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
