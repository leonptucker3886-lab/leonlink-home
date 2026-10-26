// LeonLink Kids Pet - Little Kids mode (26 Oct 2026): full-screen play lock, Bert the guide,
// one simple bag, beginner tutorial, features unlock gently. Ages 3-6.
(function(){
const $q=s=>document.querySelector(s);
// ---------- Bert: animated cartoon guide of all Bert games ----------
const BERT_SVG=`<svg viewBox="0 0 120 150" class="bertsvg" aria-hidden="true">
<ellipse cx="60" cy="146" rx="34" ry="4" fill="#0004"/>
<g class="b-body"><path d="M28 140 Q30 98 60 96 Q90 98 92 140Z" fill="#2d6a4f"/><path d="M52 100 L60 116 L68 100Z" fill="#fff"/>
<circle cx="60" cy="122" r="2.5" fill="#ffd166"/><circle cx="60" cy="132" r="2.5" fill="#ffd166"/>
<rect x="34" y="104" width="12" height="5" rx="2" fill="#ffd166"/></g>
<g class="b-arm"><path d="M88 108 Q104 96 104 78" stroke="#2d6a4f" stroke-width="11" fill="none" stroke-linecap="round"/><circle cx="104" cy="74" r="8" fill="#ffcc99"/></g>
<path d="M32 110 Q22 124 28 136" stroke="#2d6a4f" stroke-width="11" fill="none" stroke-linecap="round"/>
<g class="b-head"><circle cx="60" cy="62" r="34" fill="#ffcc99"/><circle cx="27" cy="64" r="7" fill="#ffb98a"/><circle cx="93" cy="64" r="7" fill="#ffb98a"/>
<path d="M24 48 Q26 18 60 16 Q94 18 96 48Z" fill="#22b5c9"/><rect x="20" y="44" width="80" height="9" rx="4.5" fill="#1690a3"/>
<text x="60" y="40" font-size="18" text-anchor="middle" fill="#fff">&#9875;</text>
<circle cx="38" cy="78" r="6" fill="#ff8fa3" opacity=".55"/><circle cx="82" cy="78" r="6" fill="#ff8fa3" opacity=".55"/>
<g class="b-eyes"><ellipse cx="46" cy="66" rx="6" ry="7.5" fill="#1b1b2f"/><ellipse cx="74" cy="66" rx="6" ry="7.5" fill="#1b1b2f"/>
<circle cx="48" cy="63" r="2.2" fill="#fff"/><circle cx="76" cy="63" r="2.2" fill="#fff"/></g>
<path class="b-smile" d="M48 82 Q60 92 72 82" stroke="#7a3b2e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<ellipse class="b-talk" cx="60" cy="86" rx="7" ry="5" fill="#7a3b2e"/></g></svg>`;
let bertEl=null,talkT=0;
function bert(){if(bertEl&&document.body.contains(bertEl))return bertEl;
 bertEl=document.createElement('button');bertEl.className='bert';bertEl.setAttribute('aria-label','Bert, your helper');
 bertEl.innerHTML=BERT_SVG+'<div class="bubble"></div>';bertEl.onclick=e=>{e.stopPropagation();onBertTap()};document.body.appendChild(bertEl);return bertEl}
function bertSay(t,icon){const b=bert(),bb=b.querySelector('.bubble');b.classList.add('show','talking');bb.textContent=icon||'';
 bb.style.display=icon?'':'none';say(t);clearTimeout(talkT);talkT=setTimeout(()=>b.classList.remove('talking'),Math.min(6000,600+t.length*70))}
function bertHide(){if(bertEl)bertEl.classList.remove('show','talking');document.querySelectorAll('.bpoint').forEach(e=>e.remove())}
window.Bert={say:bertSay,hide:bertHide};
// slower, friendlier voice for little ones
window.say=function(t){try{if(S.mute||!t||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.85;u.pitch=1.15;speechSynthesis.speak(u)}catch(e){}};
// retire Ollie
S.guided=99;window.showGuide=function(){document.querySelectorAll('.guide,.gpoint').forEach(e=>e.remove())};
// ---------- gentle unlocks ----------
S.kxp=S.kxp||0;
if(!S.kinit){S.inv=S.inv||{};S.inv.apple=(S.inv.apple||0)+3;S.inv.ball=(S.inv.ball||0)+1;S.inv.soap=(S.inv.soap||0)+1;S.kinit=1;
 if(S.tut===undefined&&S.days>1){S.tut=99;S.kxp=Math.max(S.kxp,12)} // existing players keep everything
 save()}
const UNLOCK=[['bag',0,'🎒',''],['out',5,'🌳','New! Tap the tree to go outside!'],['photo',8,'📸','New! Take a picture of your pet!'],['menu',12,'☰','New! The menu has the shop and more.']];
function isOpen(k){const u=UNLOCK.find(x=>x[0]===k);return S.tut>=99?S.kxp>=u[1]:(k==='bag'&&S.tut>=4)}
function applyLocks(){const B=document.body;B.classList.add('little');UNLOCK.forEach(([k])=>B.classList.toggle('lock-'+k,!isOpen(k)))}
function gain(){S.kxp++;save();
 for(const [k,n,e,t] of UNLOCK){if(S.tut>=99&&S.kxp===n&&n>0){applyLocks();const el=$q(k==='menu'?'.menub':'.dock .d-'+k);
  if(el){el.classList.add('newly');setTimeout(()=>el.classList.remove('newly'),6000)}setTimeout(()=>{bertSay(t,e);setTimeout(bertHide,5000)},700)}}}
const _use=window.use;window.use=function(id){const had=S.inv[id];_use(id);if(had)gain();tutEvent('use:'+id)};
const _nap=window.nap;if(_nap)window.nap=function(){_nap.apply(this,arguments);gain()};
const _pat=window.pat;window.pat=function(f){_pat.apply(this,arguments);tutEvent('pat')};
const _rend=window.render;window.render=function(){_rend.apply(this,arguments);applyLocks()};
// ---------- one simple bag (inventory) ----------
window.openSheet=(o=>function(k){if(k==='stuff')return openInv();o(k);tutEvent('sheet:'+k)})(window.openSheet);
function openInv(){closeSheet();const s=document.createElement('div');s.className='shade';s.onclick=closeSheet;document.body.appendChild(s);
 const d=document.createElement('div');d.className='sheet inv';d.innerHTML=`<div class="grab"></div><button class="x" aria-label="Close" data-say="Close" onclick="closeSheet()">✖️</button><div class="sec">🎒</div><div class="slots"></div>`;
 document.body.appendChild(d);fillInv();say('Your bag');tutEvent('sheet:stuff')}
function fillInv(){const box=$q('.inv .slots');if(!box)return;
 const have=[...SHOP.food,...SHOP.care,...SHOP.toys].filter(i=>S.inv[i.id]>0).map(i=>({i,n:S.inv[i.id],fn:`invUse('${i.id}')`}))
  .concat(SHOP.style.filter(i=>S.owned[i.id]).map(i=>({i,n:0,on:S.wear===i.id,fn:`invWear('${i.id}')`})));
 let h=have.map(x=>`<button class="slot ${x.on?'on':''}" aria-label="${x.i.n}" data-say="${x.i.n}" onclick="${x.fn}"><span class="e">${x.i.e}</span>${x.n?`<span class="n">${x.n}</span>`:''}${x.on?'<span class="n">✅</span>':''}</button>`).join('');
 for(let k=have.length;k<8;k++)h+='<div class="slot empty"></div>';
 if(isOpen('menu'))h+=`<button class="slot shop" aria-label="Shop" data-say="Get more things in the shop" onclick="closeSheet();go('shop')"><span class="e">🛍️</span></button>`;
 box.innerHTML=h}
window.invUse=id=>{use(id);fillInv()};window.invWear=id=>{wear(id);fillInv();say('Looking good!')};
// ---------- beginner tutorial (Bert shows, the child does) ----------
const TUT=[
 [null,'Hi! I am Bert! I help you in all the Bert games. Tap me!','👋',null],
 ['#stage','Tap your pet to give it a hug!','🤗','pat'],
 ['.dock .d-care','Your pet is hungry. Tap here!','🍎','sheet:care'],
 ['.sheet .item','Tap the apple to feed your pet!','🍎','use:'],
 ['.dock .d-stuff','This is your bag. Tap it!','🎒','sheet:stuff'],
 ['.inv .slot:not(.empty)','Tap the ball to play!','⚽','use:'],
 [null,'Great job! Look after your pet and new things will open up. Tap me if you need help!','⭐',null]];
if(S.tut===undefined)S.tut=0;
function tutShow(){document.querySelectorAll('.bpoint').forEach(e=>e.remove());applyLocks();
 if(S.tut>=TUT.length){S.tut=99;save();bertHide();applyLocks();return}
 const [sel,t,ic]=TUT[S.tut];bertSay(t,ic);
 if(sel)setTimeout(()=>{const el=$q(sel);if(!el)return;const r=el.getBoundingClientRect(),p=document.createElement('div');p.className='bpoint';p.textContent='👆';
  p.style.left=(r.left+r.width/2-24)+'px';p.style.top=(r.top+r.height/2)+'px';document.body.appendChild(p)},400)}
function tutEvent(ev){if(!(S.tut<TUT.length)||!S.pet||!KM)return;const need=TUT[S.tut][3];if(!need)return;
 if(ev===need||(need==='use:'&&ev.startsWith('use:'))){S.tut++;save();setTimeout(tutShow,ev.startsWith('sheet:')?300:1000)}}
function onBertTap(){if(S.tut<TUT.length){if(!TUT[S.tut][3]){S.tut++;save();if(S.tut>=TUT.length){bertSay('Have fun!','💖');S.tut=99;save();applyLocks();setTimeout(bertHide,2500)}else tutShow()}else tutShow();return}
 const tips=[['Tap your pet for a hug!','🤗'],['Red bar? Your pet needs you!','❤️'],['Your bag has toys and clothes!','🎒']];
 if(isOpen('out'))tips.push(['Go outside and explore!','🌳']);const p=tips[Math.floor(Math.random()*tips.length)];bertSay(p[0],p[1]);setTimeout(bertHide,4500)}
window.startGuide=function(){if(S.tut>=99){onBertTap();return}if(S.view!=='home')go('home');tutShow()};
// ---------- full-screen play lock ----------
let KM=false;
const de=document.documentElement;
function goFull(){try{const r=de.requestFullscreen||de.webkitRequestFullscreen;if(r){const p=r.call(de,{navigationUI:'hide'});if(p&&p.catch)p.catch(()=>{})}
 if(navigator.keyboard&&navigator.keyboard.lock)navigator.keyboard.lock(['Escape']).catch(()=>{});
 if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('portrait').catch(()=>{})}catch(e){}}
function isFull(){return !!(document.fullscreenElement||document.webkitFullscreenElement)}
function enter(){KM=true;document.body.classList.add('kidmode');goFull();history.pushState({pet:1},'');
 const o=$q('.playgate');if(o)o.remove();
 if(S.pet&&S.tut<TUT.length)setTimeout(tutShow,800);else if(S.pet){bertSay('Hi again! Your pet missed you!','👋');setTimeout(bertHide,4000)}}
function gate(again){if($q('.playgate'))return;const g=document.createElement('div');g.className='playgate';
 g.innerHTML=`<div class="pg-bert">${BERT_SVG}</div><button class="pg-play" aria-label="Play">▶</button><a class="pg-home" href="/kids/" aria-label="Back to Kids Corner"><span>🏠</span><b>Kids Corner</b></a>`;
 g.querySelector('.pg-home').onclick=e=>{KM=false;say('Back to Kids Corner!');e.preventDefault();setTimeout(()=>location.href='/kids/',600)};
 g.querySelector('.pg-play').onclick=()=>{say(again?'Back to your pet!':'Let\'s play!');enter()};document.body.appendChild(g);
 const b=g.querySelector('.pg-bert');b.classList.add('talking');setTimeout(()=>b.classList.remove('talking'),2500)}
function leave(){KM=false;document.body.classList.remove('kidmode');bertHide();closeSheet();
 try{if(navigator.keyboard&&navigator.keyboard.unlock)navigator.keyboard.unlock();if(isFull())(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(e){}
 say('Bye bye! Tap the house to go to Kids Corner.');gate(false)}
// exit button: hold it for 2 seconds so little hands don't leave by accident
const ex=document.createElement('button');ex.className='exitpet';ex.setAttribute('aria-label','Exit Pet. Hold to leave.');ex.innerHTML='<span>🚪</span><i></i>';
let hold=0;const stop=()=>{clearTimeout(hold);ex.classList.remove('holding')};
ex.addEventListener('pointerdown',e=>{e.preventDefault();ex.classList.add('holding');hold=setTimeout(()=>{stop();leave()},2000)});
['pointerup','pointerleave','pointercancel'].forEach(t=>ex.addEventListener(t,stop));
ex.addEventListener('click',e=>{e.preventDefault()});document.body.appendChild(ex);
// while playing: back button, swipes, pinch, long-press menus and leaving the page are all blocked
addEventListener('popstate',()=>{if(KM)history.pushState({pet:1},'')});
addEventListener('beforeunload',e=>{if(KM){e.preventDefault();e.returnValue=''}});
document.addEventListener('contextmenu',e=>{if(KM)e.preventDefault()});
document.addEventListener('gesturestart',e=>{if(KM)e.preventDefault()});
['fullscreenchange','webkitfullscreenchange'].forEach(t=>document.addEventListener(t,()=>{if(KM&&!isFull())gate(true)}));
document.addEventListener('visibilitychange',()=>{if(KM&&!document.hidden&&!isFull())gate(true)});
applyLocks();
setTimeout(()=>gate(false),7100); // right after the splash
})();
