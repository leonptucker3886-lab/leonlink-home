// Sims-style life layer: mood gem (plumbob) over the pet, thought bubbles, a needs panel,
// a 5th need "Friends" (hugs), and free will: the pet walks to things on its own when it needs them.
(function(){
if(S.soc==null)S.soc=80;
const NEED={h:{e:'🍗',w:'Hungry',spot:[-3.6,-2.6],act:'eat',say:'yum'},c:{e:'🛁',w:'Dirty',spot:[3.6,-2.6],act:'wash'},en:{e:'💤',w:'Sleepy',spot:[-3.2,1.8],act:'nap'},j:{e:'⚽',w:'Bored',spot:[3,1.6],act:'play'},soc:{e:'❤️',w:'Lonely'}};
const val=k=>k==='soc'?S.soc:S.st[k];
const add=(k,n)=>{if(k==='soc')S.soc=Math.min(100,S.soc+n);else S.st[k]=Math.min(100,S.st[k]+n)};
let idleAt=Date.now(),busy=0;
addEventListener('pointerdown',()=>{idleAt=Date.now()},{passive:true,capture:true});
// Friends need: drops slowly, hugs fill it
setInterval(()=>{S.soc=Math.max(10,S.soc-0.4);save();paint()},60000);
const _pat=window.pat;window.pat=function(f){S.soc=Math.min(100,S.soc+6);save();paint();return _pat.apply(this,arguments)};
function mood(){const ks=['h','c','en','j','soc'];let lo=ks[0];ks.forEach(k=>{if(val(k)<val(lo))lo=k});const avg=ks.reduce((a,k)=>a+val(k),0)/5;
 if(val(lo)<35)return{e:NEED[lo].e,w:NEED[lo].w,k:lo};return avg>80?{e:'🤩',w:'Very happy'}:{e:'😊',w:'Happy'}}
// HUD gem button + needs panel
function ui(){if(!S.pet||S.view!=='home')return;if(document.getElementById('simGem'))return;
 const g=document.createElement('button');g.id='simGem';g.className='simgem';g.setAttribute('aria-label','Feelings');g.innerHTML='<i></i>';g.onclick=e=>{e.stopPropagation();panel()};document.body.appendChild(g);paint()}
function paint(){const g=document.getElementById('simGem');if(!g)return;const ks=['h','c','en','j','soc'],mn=Math.min(...ks.map(val));g.style.setProperty('--hue',Math.max(0,Math.min(120,(mn-15)/65*120)));
 const p=document.getElementById('simPanel');if(p)fill(p)}
function fill(p){const m=mood();p.querySelector('.sm-head').innerHTML=`<b>${m.e}</b> ${S.name||'Pet'}: ${m.w}`;
 p.querySelector('.sm-bars').innerHTML=['h','c','en','j','soc'].map(k=>{const v=Math.round(val(k)),hue=Math.max(0,Math.min(120,(v-15)/65*120));return`<div class="sm-row" data-say="${{h:'Food',c:'Clean',en:'Sleep',j:'Fun',soc:'Friends'}[k]}"><span>${{h:'🍗',c:'🫧',en:'💤',j:'⚽',soc:'❤️'}[k]}</span><div class="sm-bar"><i style="width:${v}%;background:hsl(${hue},75%,50%)"></i></div></div>`}).join('')}
function panel(){let p=document.getElementById('simPanel');if(p){p.remove();return}
 p=document.createElement('div');p.id='simPanel';p.className='simpanel';p.innerHTML='<div class="sm-head"></div><div class="sm-bars"></div><button class="sm-x" aria-label="Close">✖</button>';
 p.querySelector('.sm-x').onclick=()=>p.remove();document.body.appendChild(p);fill(p);const m=mood();say(m.k?(S.name||'Your pet')+' is '+m.w.toLowerCase()+'!':(S.name||'Your pet')+' is happy!')}
// Free will
const idleThoughts=['🦋','🎵','🍪','🌈','⭐','🐟','🌸'];
function tick(){ui();paint();const P=window.Pet3D;if(!P||!P.walkTo||!S.pet||S.view!=='home'||document.hidden||busy)return;
 if(S.tut!==undefined&&S.tut<99)return;if(document.querySelector('.sheet.open,.sheet.show,#simPanel'))return;
 if(Date.now()-idleAt<12000)return;
 const ks=['h','c','en','j','soc'];let lo=ks[0];ks.forEach(k=>{if(val(k)<val(lo))lo=k});
 if(val(lo)<60){const n=NEED[lo];P.think(n.e,4.5);busy=1;
  if(lo==='soc'){const p=P.petPos();P.walkTo(p.x*.3,2.8);setTimeout(()=>{P.act('happy','❤️');window.Bert&&Bert.say&&Bert.say((S.name||'Your pet')+' wants a hug!','🤗');busy=0;idleAt=Date.now()},2600);return}
  P.walkTo(n.spot[0],n.spot[1]);
  setTimeout(()=>{P.act(n.act,n.e);add(lo,6);save();paint();window.refreshMeters&&refreshMeters();
   if(val(lo)<35&&window.Bert&&Bert.say)Bert.say({h:'I\'m hungry! Give me food!',c:'I need a bath!',en:'I\'m sleepy!',j:'Let\'s play!'}[lo],n.e);
   setTimeout(()=>{busy=0;idleAt=Date.now()},2500)},3000)}
 else if(Math.random()<.55){P.think(idleThoughts[Math.random()*idleThoughts.length|0],3);P.walkTo((Math.random()-.5)*7,(Math.random()-.5)*5);idleAt=Date.now()-6000}}
setInterval(tick,4000);setTimeout(tick,800);
const _r=window.render;window.render=function(){const r=_r.apply(this,arguments);if(S.view!=='home'){const g=document.getElementById('simGem');g&&g.remove();const p=document.getElementById('simPanel');p&&p.remove()}else setTimeout(ui,50);return r};
})();
