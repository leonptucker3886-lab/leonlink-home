// LeonLink Kids Pet – clean UI (24 Oct 2026): full-screen pet, 4 big buttons, outside map.
(function(){
const clamp=v=>Math.max(5,Math.min(100,v));
const lvl2=v=>v<30?'low':v<60?'mid':'ok';
document.body.classList.add('clean');
document.querySelector('header').insertAdjacentHTML('beforeend','<button class="menub" aria-label="Menu" data-say="Menu" onclick="openSheet(\'menu\')">☰</button>');
// ---------- HOME: the pet, a small status strip, 4 big buttons ----------
homeView=function(){const h=HOMES.find(x=>x.id===S.home),w=S.wear&&ALL.find(x=>x.id===S.wear),p=PETS.find(x=>x.id===S.pet);
 const [me,mw]=mood(),d=S.days||1,age=d<4?'🍼':d<9?'🌱':'⭐';
 const m=(k,e,word)=>`<button class="meter ${lvl2(S.st[k])}" aria-label="${word}" data-say="${word}${S.st[k]<30?', getting low!':''}"><span class="mi">${e}</span><span class="bar"><i style="width:${S.st[k]}%"></i></span></button>`;
 const b=(c,e,w,fn)=>`<button class="${c}" aria-label="${w}" data-say="${w}" onclick="${fn}"><b>${e}</b></button>`;
 return `<div class="stage home" id="stage" style="background:${h.bg}">
 <div class="pet fallback" onclick="pat()">${p.e}${w?`<span class="acc">${w.e}</span>`:''}</div>
 <div class="hud"><button class="mood" aria-label="${mw}" data-say="${mw}">${me}</button><div class="meters">${m('h','🍗','Tummy')}${m('j','😊','Happy')}${m('c','🫧','Clean')}${m('en','⚡','Energy')}</div><span class="age">${age}</span></div>
 <button class="trickf" aria-label="Do a trick" data-say="Do a trick!" onclick="doTrick()">🎪</button></div>
 <div class="dock">${b('d-stuff','🎒','Toys and clothes',"openSheet('stuff')")}${b('d-out','🌳',"Let's go outside!","go('map')")}${b('d-care','🛁','Bath and food',"openSheet('care')")}${b('d-photo','📸','Take a picture','Pet3D.photo(S.name)')}</div>`};
// ---------- bottom sheets ----------
let SH=null,STAB='toys';
window.closeSheet=function(){document.querySelectorAll('.sheet,.shade').forEach(e=>e.remove());SH=null};
const tile=(i,fn,extra='',on=false)=>`<button class="item tap ${on?'on':''}" aria-label="${i.n}" data-say="${i.n}" onclick="${fn}"><div class="e">${i.e}</div>${extra}</button>`;
const dots=n=>`<div class="cnt">${'●'.repeat(Math.min(n,5))}${n>5?'+':''}</div>`;
const shopTile=tab=>`<button class="item tap more" aria-label="Shop" data-say="Get more in the shop" onclick="closeSheet();S.tab='${tab}';go('shop')"><div class="e">🛍️</div><div class="go">➕</div></button>`;
function sheetBody(k){
 if(k==='stuff'){const tabs=[['toys','⚽','Toys'],['style','👑','Clothes'],['furniture','🛋️','Furniture']];
  let items,body;
  if(STAB==='toys'){items=SHOP.toys.filter(i=>S.inv[i.id]>0);body=items.map(i=>tile(i,`sheetDo(()=>use('${i.id}'))`,dots(S.inv[i.id]))).join('')}
  else if(STAB==='style'){items=SHOP.style.filter(i=>S.owned[i.id]);body=items.map(i=>tile(i,`sheetDo(()=>wear('${i.id}'))`,`<div class="go">${S.wear===i.id?'✅':'⬜'}</div>`,S.wear===i.id)).join('')}
  else{items=SHOP.furniture.filter(i=>S.owned[i.id]);body=items.map(i=>tile(i,`sheetDo(()=>place('${i.id}'))`,`<div class="go">${S.placed.includes(i.id)?'✅':'⬜'}</div>`,S.placed.includes(i.id))).join('')}
  return `<div class="row tabs">${tabs.map(([t,e,w])=>`<button class="${STAB===t?'on':''}" aria-label="${w}" data-say="${w}" onclick="STAB_('${t}')">${e}</button>`).join('')}</div><div class="grid sg">${body}${shopTile(STAB)}</div>`}
 if(k==='care'){const food=SHOP.food.filter(i=>S.inv[i.id]>0),care=SHOP.care.filter(i=>S.inv[i.id]>0);
  return `<div class="sec">🍎</div><div class="grid sg">${food.map(i=>tile(i,`sheetDo(()=>use('${i.id}'))`,dots(S.inv[i.id]))).join('')}${shopTile('food')}</div>
  <div class="sec">🛁</div><div class="grid sg">${care.map(i=>tile(i,`sheetDo(()=>use('${i.id}'))`,dots(S.inv[i.id]))).join('')}${tile({n:'Sleep',e:'💤'},'sheetDo(nap)')}${shopTile('care')}</div>`}
 if(k==='menu'){const r=(e,w,fn)=>`<button class="item tap" aria-label="${w}" data-say="${w}" onclick="closeSheet();${fn}"><div class="e">${e}</div></button>`;
  return `<div class="grid sg">${r('🛍️','Shop',"go('shop')")}${r('🏡','Homes',"go('homes')")}${r('📒','Sticker book',"go('book')")}${r('👥','Change pet',"go('who')")}${r(S.mute?'🔇':'🔊',S.mute?'Sound on':'Sound off','mute()')}${r('🦉','Help','startGuide()')}</div>`}}
window.openSheet=function(k){closeSheet();SH=k;const s=document.createElement('div');s.className='shade';s.onclick=closeSheet;document.body.appendChild(s);
 const d=document.createElement('div');d.className='sheet';d.innerHTML=`<div class="grab"></div><button class="x" aria-label="Close" data-say="Close" onclick="closeSheet()">✖️</button><div class="sbody">${sheetBody(k)}</div>`;document.body.appendChild(d)};
window.STAB_=t=>{STAB=t;const b=document.querySelector('.sheet .sbody');if(b)b.innerHTML=sheetBody('stuff')};
window.sheetDo=fn=>{const k=SH;fn();if(k){const b=document.querySelector('.sheet .sbody');if(b)b.innerHTML=sheetBody(k)}};
// ---------- OUTSIDE MAP ----------
// x,y in % of the map; higher y = closer = bigger (depth)
const SPOTS=[
 {id:'home',e:'🏠',w:'Go home',x:50,y:92,fn:"go('home')"},
 {id:'roam',e:'🌳',w:'Walk in the park',x:22,y:78,out:1},
 {id:'mud',e:'🟤',w:'Muddy puddle',x:76,y:80,out:1},
 {id:'pond',e:'🦆',w:'Splash in the pond',x:30,y:62,out:1},
 {id:'snoop',e:'🧺',w:'Sneak a picnic snack',x:70,y:64,out:1},
 {id:'stars',e:'⭐',w:'Star hill game',x:52,y:70,game:1},
 {id:'dig',e:'🕳️',w:'Dig for treasure',x:16,y:46,out:1},
 {id:'treats',e:'🍖',w:'Treat stand game',x:44,y:52,game:1},
 {id:'bugs',e:'🦋',w:'Chase butterflies',x:80,y:48,out:1},
 {id:'bubbles',e:'🫧',w:'Bubble beach game',x:62,y:38,game:1},
 {id:'seek',e:'🙈',w:'Hide and seek woods',x:26,y:30,game:1},
 {id:'match',e:'🃏',w:'Memory house game',x:78,y:26,game:1},
 {id:'shop',e:'🛍️',w:'Shop',x:46,y:22,fn:"go('shop')"},
 {id:'homes',e:'🏡',w:'New homes',x:14,y:14,fn:"go('homes')"},
 {id:'book',e:'📒',w:'Sticker book',x:86,y:12,fn:"go('book')"}];
const DECO=[['🌲',8,20],['🌲',92,30],['🌳',6,60],['🌷',40,84],['🌼',62,88],['🌲',36,12],['🌳',94,62],['🍄',58,56],['🌻',88,90],['⛰️',30,4],['⛰️',66,3],['☁️',20,1],['🌲',60,16],['🪨',34,44],['🌸',10,92],['🌳',50,40]];
function mapView(){const p=PETS.find(x=>x.id===S.pet),sc=y=>(0.55+y/100*0.75).toFixed(2);
 const spots=SPOTS.map(s=>`<button class="spot ${s.game?'g':s.out?'o':'n'}" style="left:${s.x}%;top:${s.y}%;--s:${sc(s.y)};z-index:${s.y|0}" aria-label="${s.w}" data-say="${s.w}" onclick="${s.fn||(s.game?`playGame('${s.id}')`:`goOut('${s.id}')`)}"><b>${s.e}</b></button>`).join('');
 const spin=S.spin?`<button class="spot g" style="left:50%;top:84%;--s:1.2;z-index:85" aria-label="Spin the wheel" data-say="Spin the wheel!" onclick="go('spin')"><b>🎡</b></button>`:'';
 const deco=DECO.map(([e,x,y])=>`<span class="deco" style="left:${x}%;top:${y}%;--s:${sc(y)};z-index:${y|0}">${e}</span>`).join('');
 return `<div class="map"><div class="msky"></div><div class="mland"><svg class="path" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 95 C20 85,30 70,52 70 S80 58,44 52 S20 40,30 30 S70 30,46 22 S20 14,14 14" fill="none" stroke="#f3d9a4" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 0"/></svg>${deco}${spots}${spin}
 <span class="mpet" style="left:50%;top:88%">${p.e}</span></div></div>
 <div class="dock"><button class="d-back" aria-label="Go home" data-say="Go home" onclick="go('home')"><b>🏠</b></button><button class="d-stat" aria-label="Energy" data-say="Energy"><b>⚡</b><span class="bar"><i style="width:${S.st.en}%"></i></span></button></div>`}
// ---------- OUTINGS (roam, mischief) ----------
const OUTS={
 roam:{bg:'park',say:"Let's go for a walk!",things:['🐿️','🍂','🦋','🌸','🐦'],fx:{j:15,en:-10,h:-5},end:'What a nice walk!'},
 mud:{bg:'mud',say:'Oh no! A muddy puddle! Splash!',things:['💦','🟤','💦','🐸'],fx:{j:20,c:-35,en:-5},end:'Oops! So muddy! Time for a bath!'},
 pond:{bg:'pond',say:'Splash in the pond!',things:['🦆','🐟','💧','🪷'],fx:{c:25,j:10,en:-10},end:'Splish splash!'},
 snoop:{bg:'park',say:'Shh! Sneaky snack time!',things:['🥪','🍓','🧃','🐜'],fx:{h:20,j:10,c:-10},end:'Hee hee! Sneaky!'},
 dig:{bg:'dirt',say:'Dig dig dig! Is there treasure?',things:['🪱','🪨','🦴','💎'],fx:{en:-10,c:-15,j:5},end:'You found treasure!',treasure:1},
 bugs:{bg:'meadow',say:'Tap the butterflies!',things:['🦋','🦋','🐝','🐞'],fx:{j:20,en:-15},end:'So many butterflies!',catch:1}};
let OT=[];
window.goOut=function(id){if(S.st.en<20){pop('😴⚡❌','Too sleepy! Take a nap first.');return}
 const o=OUTS[id],p=PETS.find(x=>x.id===S.pet),w=S.wear&&ALL.find(x=>x.id===S.wear);S.view='out';save();closeSheet();$('nav').innerHTML='';
 $('app').innerHTML=`<div class="out ${o.bg}"><div class="l1"></div><div class="l2"></div><div class="l3"></div><div class="walker">${p.e}${w?`<span class="acc">${w.e}</span>`:''}</div><div class="timer otm"><i id="otm" style="width:100%"></i></div></div>`;
 say(o.say);const box=document.querySelector('.out'),wk=box.querySelector('.walker');let caught=0,t=0;
 OT.push(setInterval(()=>{const e=document.createElement('button');e.className='thing';e.textContent=o.things[Math.random()*o.things.length|0];e.style.top=(15+Math.random()*55)+'%';e.style.animationDuration=(3+Math.random()*2)+'s';
  e.onclick=()=>{e.onclick=null;e.textContent='✨';caught++;blip(1100+caught*40);wk.classList.remove('hop');void wk.offsetWidth;wk.classList.add('hop');setTimeout(()=>e.remove(),300)};box.appendChild(e);setTimeout(()=>e.remove(),5200)},700));
 OT.push(setInterval(()=>{t++;const b=$('otm');if(b)b.style.width=(100-t/10*100)+'%';if(t%3===0){wk.classList.remove('hop');void wk.offsetWidth;wk.classList.add('hop')}if(t>=10)finishOut(id,caught)},1000))};
function finishOut(id,caught){OT.forEach(clearInterval);OT=[];const o=OUTS[id];for(const k in o.fx)S.st[k]=clamp(S.st[k]+o.fx[k]);S.st.j=clamp(S.st.j+Math.min(caught,10));
 let coins=0,msg=o.end,emo='🎉';
 if(o.treasure){if(Math.random()<.35){const it=['bone','carrot','apple','cookie'][Math.random()*4|0];S.inv[it]=(S.inv[it]||0)+1;emo='🎁 '+ALL.find(x=>x.id===it).e}else coins=3+(Math.random()*6|0)}
 else if(o.catch)coins=Math.min(caught,8);
 else if(Math.random()<.3)coins=2+(Math.random()*3|0);
 S.cnt=S.cnt||{};S.cnt.out=(S.cnt.out||0)+1;save();
 const box=document.querySelector('.out');if(box)box.insertAdjacentHTML('beforeend',`<div class="oend">${emo}</div>`);say(msg);confetti(20);
 setTimeout(()=>{if(coins>0){const g=capCoins(coins);if(g>0)LeonLinkPet.addTokens(g)}if(S.cnt.out>=5)sticker('explore');if(id==='mud')sticker('muddy');S.view='map';save();render()},2200)}
if(!STK.find(s=>s[0]==='explore'))STK.push(['explore','🗺️','Explorer'],['muddy','🟤','Muddy paws']);
// ---------- routing ----------
const _r=render;
render=function(){
 if(S.view==='out'&&OT.length)return;if(S.view==='out')S.view='map';
 if(S.view==='games')S.view='map';
 if(S.pet&&S.view==='map'){$('tok').textContent=S.tokens;$('nav').innerHTML='';document.body.dataset.v='map';$('app').innerHTML=mapView();return}
 _r.apply(this,arguments);document.body.dataset.v=S.view;
 if(!S.pet)return;
 if(S.view==='home'){$('nav').innerHTML='';return}
 if(S.view==='mg')return;
 const back=['play','spin'].includes(S.view)?['map','🌳','Back outside']:['home','🏠','Go home'];
 $('nav').innerHTML=`<button class="backb" aria-label="${back[2]}" data-say="${back[2]}" onclick="go('${back[0]}')">⬅️ ${back[1]}</button>`;
 if(S.view==='play'){const b=document.querySelector('.playbar .back');if(b)b.remove()}};
// guide follows the new layout
GUIDE.splice(0,GUIDE.length,
 ['#stage','Hi! I am Ollie the owl. Tap your pet to give it a hug!'],
 ['.meters','These bars show how your pet feels. Green is good! Red means help!'],
 ['.dock .d-care','Feed your pet and give it a bath here.'],
 ['.dock .d-stuff','Toys, clothes and furniture live in this bag.'],
 ['.dock .d-out','Go outside to explore, get muddy and play games for coins!'],
 ['.dock .d-photo','Take a picture of your pet!'],
 ['.menub','The menu has the shop, homes and your sticker book. Have fun!']);
if(S.view==='games')S.view='map';
render();
})();
