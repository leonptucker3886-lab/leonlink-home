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

