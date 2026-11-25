"use strict";
/* Sootfather - map.js (split from sootfather.html, Phase 0; behaviour unchanged) */

/* ---------- city map ---------- */
let pins=[];
function buildPins(){
  pins=[];
  const ch=CHAPTERS[P.ch];
  const spots=[[.24,.32],[.7,.26],[.42,.58],[.76,.62],[.26,.8]];
  let locked=false;
  ch.missions.forEach((m,mi)=>{
    const id=missionId(P.ch,mi),done=P.done.includes(id);
    let label='\uD83D\uDD12',fn=null,cls='#55556a';
    if(done){label='\u2713';cls='#37c25e'}
    else if(!locked){label='!';cls='#e8c84a';fn=(()=>{const c=P.ch,i=mi;return()=>startMission(c,i)})();locked=true}
    const s=spots[mi%spots.length];
    pins.push({x:s[0],y:s[1],label,fn,cls});
  });
  pins.push({x:.84,y:.84,label:'$',fn:()=>shop(),cls:'#37c25e'});
}
art.addEventListener('pointerdown',e=>{
  if(screen!=='hub')return;
  const r=art.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width*art.width, y=(e.clientY-r.top)/r.height*art.height;
  for(const pn of pins){
    const px=pn.x*art.width,py=pn.y*art.height,dx=x-px,dy=y-py;
    if(dx*dx+dy*dy<32*32&&pn.fn){pn.fn();return}
  }
});

/* ---------- area table (fix 11, Treeguy) ----------
   Area IDs for P.area, P.unlocked and registerEvent({areas}). See sootfather-contract.md s.4/s.6.
   Data + pure helpers only; the pin map above is unchanged. */
const AREAS={
  soot_row:        {name:"Soot Row",         tier:0,      gate:null,        links:["market_lane","old_mill_flats","canal_docks"], hub:true},
  market_lane:     {name:"Market Lane",      tier:1,      gate:null,        links:["soot_row","rival_guild_hall"]},
  old_mill_flats:  {name:"Old Mill Flats",   tier:1,      gate:null,        links:["soot_row","foundry_quarter"]},
  canal_docks:     {name:"Canal Docks",      tier:1,      gate:null,        links:["soot_row","foundry_quarter"], events:["boss_chimney_wyrm"]},
  foundry_quarter: {name:"Foundry Quarter",  tier:2,      gate:{repTier:2}, links:["old_mill_flats","canal_docks","great_stack"], events:["boss_chimney_wyrm"]},
  rival_guild_hall:{name:"Rival Guild Hall", tier:"rival",gate:null,        links:["market_lane"], fights:["rival_brushley","rival_mopp","rival_klinker"]},
  great_stack:     {name:"The Great Stack",  tier:"boss", gate:{repTier:3,rivals:["rival_brushley","rival_mopp","rival_klinker"]}, links:["foundry_quarter"], fights:["boss_grand_sweep"]}
};
const AREA_START="soot_row";
function areaGateOpen(id){
  const a=AREAS[id]; if(!a) return false;
  if(!a.gate) return true;
  const t=(typeof repTier==="function")?repTier():0;
  if(t<(a.gate.repTier||0)) return false;
  if(a.gate.rivals){
    const rb=(typeof P!=="undefined"&&P&&P.rivalsBeaten&&typeof P.rivalsBeaten==="object")?P.rivalsBeaten:null;
    if(!rb) return false;
    for(const r of a.gate.rivals){ if(!rb[r]) return false; }
  }
  return true;
}
function areaUnlocked(id){ return !!(typeof P!=="undefined" && P && Array.isArray(P.unlocked) && P.unlocked.includes(id)); }
function areaNeighbours(id){ return (AREAS[id]&&AREAS[id].links)||[]; }
