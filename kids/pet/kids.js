// LeonLink Kids Pet - Little Kids mode (26 Oct 2026): full-screen play lock, Bert the guide,
// one simple bag, beginner tutorial, features unlock gently. Ages 3-6.
(function(){
const $q=s=>document.querySelector(s);
// ---------- Bert: animated cartoon guide of all Bert games ----------
const BERT_SVG=`<svg viewBox="0 0 120 160" class="bertsvg" aria-hidden="true">
<defs><radialGradient id="bSk" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffe2c6"/><stop offset=".7" stop-color="#ffc59a"/><stop offset="1" stop-color="#eda274"/></radialGradient>
<linearGradient id="bJk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46b981"/><stop offset="1" stop-color="#1f6b4a"/></linearGradient>
<linearGradient id="bCp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ae8f8"/><stop offset="1" stop-color="#1597ad"/></linearGradient></defs>
<ellipse class="b-shadow" cx="60" cy="156" rx="30" ry="4.5" fill="#0005"/>
<g class="b-all">
<g class="b-legs"><rect x="46" y="128" width="11" height="20" rx="5" fill="#2e3f7a"/><rect x="63" y="128" width="11" height="20" rx="5" fill="#2e3f7a"/>
<path d="M41 151Q41 143 51 143Q58 143 58 151Z" fill="#6b4430"/><path d="M62 151Q62 143 69 143Q79 143 79 151Z" fill="#6b4430"/></g>
<g class="b-body"><path d="M32 134Q32 100 60 98Q88 100 88 134Q88 138 84 138L36 138Q32 138 32 134Z" fill="url(#bJk)" stroke="#164d35" stroke-width="2"/>
<path d="M52 100L60 114L68 100Z" fill="#fff"/><circle cx="64" cy="121" r="2.3" fill="#ffd166"/><circle cx="64" cy="130" r="2.3" fill="#ffd166"/></g>
<g class="b-arml"><path d="M34 108Q22 120 28 134" stroke="url(#bJk)" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="28" cy="135" r="6.5" fill="url(#bSk)"/></g>
<g class="b-arm"><path d="M86 108Q102 98 103 80" stroke="url(#bJk)" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="103" cy="75" r="7.5" fill="url(#bSk)" stroke="#d98c5f"/></g>
<g class="b-head"><circle cx="27" cy="64" r="7.5" fill="url(#bSk)"/><circle cx="93" cy="64" r="7.5" fill="url(#bSk)"/>
<ellipse cx="60" cy="62" rx="34" ry="33" fill="url(#bSk)" stroke="#d98c5f" stroke-width="1.5"/>
<path d="M29 50q4 9 11 4q2 7 9 3l-4-9Z" fill="#6b3f22"/>
<path d="M25 49Q26 17 60 15Q94 17 95 49Z" fill="url(#bCp)" stroke="#0f6f80" stroke-width="2"/>
<path d="M38 27Q50 20 62 21" stroke="#fff9" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M19 47Q60 38 101 47Q103 54 98 54Q60 47 22 54Q17 54 19 47Z" fill="#1690a3"/>
<g transform="translate(60 33)" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><circle cy="-7" r="2.6"/><path d="M0-4V8M-6-1H6M-8 3Q-7 9 0 9Q7 9 8 3"/></g>
<g class="b-brows" stroke="#5a3418" stroke-width="3" fill="none" stroke-linecap="round"><path d="M38 54Q45 50 52 53"/><path d="M68 53Q75 50 82 54"/></g>
<ellipse cx="37" cy="79" rx="6.5" ry="4.5" fill="#ff7f99" opacity=".5"/><ellipse cx="83" cy="79" rx="6.5" ry="4.5" fill="#ff7f99" opacity=".5"/>
<g class="b-eyes"><ellipse cx="46" cy="66" rx="8" ry="9.5" fill="#fff"/><ellipse cx="74" cy="66" rx="8" ry="9.5" fill="#fff"/>
<g class="b-pupils"><circle cx="47" cy="67" r="5.5" fill="#1b1b3a"/><circle cx="75" cy="67" r="5.5" fill="#1b1b3a"/><circle cx="49" cy="64.5" r="2" fill="#fff"/><circle cx="77" cy="64.5" r="2" fill="#fff"/></g></g>
<g class="b-smile"><path d="M47 81Q60 94 73 81Q60 86 47 81Z" fill="#7a2e2e"/><path d="M52 84Q60 87 68 84L67 82Q60 84 53 82Z" fill="#fff"/></g>
<g class="b-talk"><ellipse cx="60" cy="85" rx="7.5" ry="6" fill="#7a2e2e"/><ellipse cx="60" cy="88" rx="4.5" ry="2.4" fill="#ff8a9a"/></g></g></g>
<g class="b-spark" fill="#ffd166"><path d="M12 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M108 20l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z"/></g></svg>`;
let bertEl=null,talkT=0;
function bert(){if(bertEl&&document.body.contains(bertEl))return bertEl;
 bertEl=document.createElement('button');bertEl.className='bert';bertEl.setAttribute('aria-label','Bert, your helper');
 bertEl.innerHTML=BERT_SVG+'<div class="bubble"></div>';bertEl.onclick=e=>{e.stopPropagation();bertBoing();onBertTap()};document.body.appendChild(bertEl);return bertEl}
function bertSay(t,icon){const b=bert(),bb=b.querySelector('.bubble');b.classList.add('show','talking');bb.textContent=icon||'';
 bb.style.display=icon?'':'none';say(t);clearTimeout(talkT);talkT=setTimeout(()=>b.classList.remove('talking'),Math.min(6000,600+t.length*70))}
function bertHide(){if(bertEl)bertEl.classList.remove('show','talking');document.querySelectorAll('.bpoint').forEach(e=>e.remove())}
function bertBoing(){const b=bertEl;if(!b)return;b.classList.remove('boing');void b.offsetWidth;b.classList.add('boing');setTimeout(()=>b.classList.remove('boing'),700)}
function bertLook(x,y){document.querySelectorAll('.bertsvg .b-pupils').forEach(p=>{const r=p.ownerSVGElement.getBoundingClientRect();if(!r.width)return;
 const dx=x-(r.left+r.width/2),dy=y-(r.top+r.height*.4),d=Math.hypot(dx,dy)||1;p.style.transform='translate('+(dx/d*2.6).toFixed(2)+'px,'+(dy/d*2.4).toFixed(2)+'px)'})}
addEventListener('pointerdown',e=>bertLook(e.clientX,e.clientY),{passive:true});
setInterval(()=>{if(!document.querySelector('.bertsvg'))return;if(Math.random()<.5)bertLook(Math.random()*innerWidth,Math.random()*innerHeight);
 const b=bertEl;if(b&&b.classList.contains('show')&&!b.classList.contains('talking')&&Math.random()<.35){b.classList.add('cheer');setTimeout(()=>b.classList.remove('cheer'),1200)}},2600);
window.Bert={say:bertSay,hide:bertHide,boing:bertBoing};
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
 const hm=g.querySelector('.pg-home');let gone=0;const goKC=e=>{if(e)e.preventDefault();if(gone)return;gone=1;KM=false;
 try{if(isFull())(document.exitFullscreen||document.webkitExitFullscreen).call(document)}catch(_){}
 try{speechSynthesis.cancel()}catch(_){}hm.classList.add('going');location.assign(location.origin+'/kids/')};
 hm.addEventListener('click',goKC);hm.addEventListener('pointerup',goKC);hm.addEventListener('touchend',goKC);
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
addEventListener('beforeunload',e=>{if(KM&&!e.target.activeElement?.classList?.contains('pg-home')){e.preventDefault();e.returnValue=''}});
document.addEventListener('contextmenu',e=>{if(KM)e.preventDefault()});
document.addEventListener('gesturestart',e=>{if(KM)e.preventDefault()});
['fullscreenchange','webkitfullscreenchange'].forEach(t=>document.addEventListener(t,()=>{if(KM&&!isFull())gate(true)}));
document.addEventListener('visibilitychange',()=>{if(KM&&!document.hidden&&!isFull())gate(true)});
applyLocks();
setTimeout(()=>gate(false),7100); // right after the splash
})();
