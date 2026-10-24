// Pet v4 (Leon, 24 Oct): basic care is free, tokens only buy extras, toy box + closet, less interface.
(function(){
const FREE_TOYS=['ball','yarn'];
// Care tabs leave the shop: food and bath are free now.
delete TABS.food;delete TABS.care;if(S.tab==='food'||S.tab==='care')S.tab='toys';
// Old bag toys move into the toy box for good; old food/soap refunded so nobody loses coins.
for(const id in S.inv){const i=ALL.find(x=>x.id===id);if(!i||!S.inv[id])continue;if(SHOP.toys.includes(i))S.owned[id]=1;else S.tokens+=i.p*S.inv[id];S.inv[id]=0}
save();
const up=(k,n)=>S.st[k]=Math.min(100,S.st[k]+n);
const CARE={eat:{k:'h',n:30,e:'🍎',w:'Yum yum!',b:['feed',5,'feed5']},wash:{k:'c',n:45,e:'🛁',w:'Squeaky clean!',b:['wash',5,'wash5']},play:{k:'j',n:30,e:'⚽',w:'That was fun!',b:['play',5,'play5']}};
window.quick=function(kind){const c=CARE[kind];if(kind==='play')return openBox('toys');up(c.k,c.n);save();render();bounce();window.Pet3D&&Pet3D.act(kind,c.e);pop(c.e+' 😍',c.w);try{bump(...c.b)}catch(e){}};
window.playToy=function(id){const i=ALL.find(x=>x.id===id);closeBox();up('j',i.j||25);save();render();bounce();window.Pet3D&&Pet3D.act('play',i.e);pop(i.e+' 😍',S.name+' loves it!');try{bump('play',5,'play5')}catch(e){}};
const _buy=buy;window.buy=function(id){const i=ALL.find(x=>x.id===id);if(SHOP.toys.includes(i)){if(S.owned[id]||FREE_TOYS.includes(id))return;if(S.tokens<i.p)return pop('🪙❌ ➡️ 🎮','Not enough coins. Play a game to win more!');S.owned[id]=1;S.tokens-=i.p;save();render();return pop('✅ '+i.e,'It is in your toy box!')}_buy(id)};
// Toy box + closet pop-up
function box(html){closeBox();const d=document.createElement('div');d.id='pbox';d.style.cssText='position:fixed;inset:0;z-index:500;background:#000a;display:flex;align-items:center;justify-content:center;padding:16px';d.onclick=e=>{if(e.target===d)closeBox()};d.innerHTML=`<div class="card" style="max-width:520px;width:100%;max-height:85vh;overflow:auto">${html}<button class="empty tap" data-say="Close" onclick="closeBox()" style="margin-top:12px">✖️</button></div>`;document.body.appendChild(d)}
window.closeBox=function(){const d=document.getElementById('pbox');if(d)d.remove()};
const tile=(i,fn,on)=>`<button class="item tap ${on?'on':''}" aria-label="${i.n}" data-say="${i.n}" onclick="${fn}"><div class="e">${i.e}</div>${on!==undefined?`<div class="go">${on?'✅':'⬜'}</div>`:''}</button>`;
window.openBox=function(){const toys=SHOP.toys.filter(i=>FREE_TOYS.includes(i.id)||S.owned[i.id]);const furn=SHOP.furniture.filter(i=>S.owned[i.id]);
 box(`<div class="sec" data-say="Toy box">🧸📦</div><div class="grid">${toys.map(i=>tile(i,`playToy('${i.id}')`)).join('')}</div>${furn.length?`<div class="sec">🛋️</div><div class="grid">${furn.map(i=>tile(i,`place('${i.id}');openBox()`,S.placed.includes(i.id))).join('')}</div>`:''}<button class="empty tap" data-say="Get more toys in the shop" onclick="closeBox();S.tab='toys';go('shop')">🛍️ ➕🧸</button>`);say('Toy box')};
window.openCloset=function(){const cl=SHOP.style.filter(i=>S.owned[i.id]);
 box(`<div class="sec" data-say="Closet">👗🚪</div>${cl.length?`<div class="grid">${cl.map(i=>tile(i,`wear('${i.id}');openCloset()`,S.wear===i.id)).join('')}</div>`:''}<button class="empty tap" data-say="Get clothes and hats in the shop" onclick="closeBox();S.tab='style';go('shop')">🛍️ ➕👑</button>`);say('Closet')};
// Less interface: home is just the pet, its buttons and the meters.
const _hv=homeView;window.homeView=function(){let h=_hv();const cut=h.indexOf('<div class="card"><div class="sec">');if(cut>0)h=h.slice(0,cut);
 h=h.replace(/<button[^>]*data-say="Photo"[^>]*>[^<]*<\/button>/,'');
 h=h.replace('<div class="acts">','<div class="acts"><button aria-label="Toy box" data-say="Toy box" onclick="openBox()">🧸</button><button aria-label="Closet" data-say="Closet" onclick="openCloset()">👗</button>');
 return h};
render();
})();
