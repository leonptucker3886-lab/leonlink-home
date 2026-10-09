/* LeonLens V9 — Lens Marketplace. Local-first demo with optional Supabase-ready hooks. */
(()=>{
 const $=id=>document.getElementById(id), KEY='leonlens_market_lenses_v9', INST='leonlens_installed_lenses_v9';
 const featured=[
  {id:'v9-neon-pulse',name:'Neon Pulse',emoji:'⚡',creator:'LeonLens',category:'Glow',color:'#25d9ff',intensity:78,glow:55,grain:8,uses:12840,likes:2180,featured:true},
  {id:'v9-film-dust',name:'Film Dust',emoji:'🎞️',creator:'MayaLens',category:'Vintage',color:'#d5a35c',intensity:42,glow:12,grain:32,uses:9420,likes:1740},
  {id:'v9-candy-pop',name:'Candy Pop',emoji:'🍭',creator:'Juno',category:'Color',color:'#ff4d9d',intensity:70,glow:38,grain:5,uses:7310,likes:1210},
  {id:'v9-midnight',name:'Midnight',emoji:'🌙',creator:'NorthStar',category:'Mood',color:'#6274ff',intensity:60,glow:26,grain:14,uses:6840,likes:980},
  {id:'v9-retro',name:'Retro Tape',emoji:'📼',creator:'AnalogKid',category:'Vintage',color:'#b98b63',intensity:55,glow:8,grain:36,uses:5210,likes:760},
  {id:'v9-sun-kissed',name:'Sun Kissed',emoji:'☀️',creator:'GlowHouse',category:'Glow',color:'#ff9d43',intensity:58,glow:46,grain:4,uses:4930,likes:690}
 ];
 const categories=['All','Trending','New','Glow','Color','Vintage','Mood']; let selected='All', query='';
 function local(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
 function installed(){try{return JSON.parse(localStorage.getItem(INST)||'[]')}catch{return []}}
 function writeInstalled(a){localStorage.setItem(INST,JSON.stringify(a.slice(0,100)))}
 function all(){return [...featured,...local()]}
 function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
 function filtered(){let a=all(); if(selected==='Trending')a=a.sort((x,y)=>y.uses-x.uses); else if(selected==='New')a=a.filter(x=>x.id.startsWith('custom-')).concat(a.filter(x=>!x.id.startsWith('custom-'))); else if(selected!=='All')a=a.filter(x=>x.category===selected); if(query){const q=query.toLowerCase();a=a.filter(x=>(x.name+' '+x.creator+' '+x.category).toLowerCase().includes(q))} return a}
 function isInstalled(id){return installed().some(x=>x.id===id)}
 function addInstalled(l){const a=installed().filter(x=>x.id!==l.id);a.unshift({...l,installedAt:Date.now()});writeInstalled(a)}
 function removeInstalled(id){writeInstalled(installed().filter(x=>x.id!==id))}
 function addUI(){
  const nav=document.querySelector('.bottom-nav'); if(nav&&!$('marketNav')){const b=document.createElement('button');b.className='nav';b.id='marketNav';b.innerHTML='🛍<span>Market</span>';nav.insertBefore(b,nav.lastElementChild);b.onclick=()=>open()}
  const top=document.querySelector('.top-actions'); if(top&&!$('marketBtn')){const b=document.createElement('button');b.id='marketBtn';b.setAttribute('aria-label','Lens Marketplace');b.textContent='🛍';top.insertBefore(b,top.firstChild);b.onclick=open}
  if($('marketPanel'))return;
  const p=document.createElement('div');p.id='marketPanel';p.className='panel';p.innerHTML=`<div class="panel-head"><button class="close" data-close>×</button><h2>Lens Marketplace</h2><button id="marketCreate" class="text-btn">Create</button></div><div class="market-hero"><div><span class="eyebrow">LEONLENS V9</span><h3>Find your next look.</h3><p>Discover community lenses, install them, then use them in your camera.</p></div><div class="market-spark">✦</div></div><div class="market-search"><input id="marketSearch" class="field" placeholder="Search lenses or creators"><button id="marketSearchBtn" class="search-btn">Search</button></div><div class="market-cats" id="marketCats"></div><div class="market-section-head"><h3>Discover lenses</h3><span id="marketCount"></span></div><div id="marketGrid" class="market-grid"></div><div id="marketEmpty" class="empty" hidden>No lenses match that search.</div><div class="market-note">Marketplace is local-first in this build. Cloud publishing can be connected to your Supabase project.</div></div>`;document.body.appendChild(p);
  $('marketCreate').onclick=()=>{openStudio();}; $('marketSearchBtn').onclick=()=>{query=$('marketSearch').value.trim();render()}; $('marketSearch').onkeydown=e=>{if(e.key==='Enter'){query=e.target.value.trim();render()}}; renderCats(); render();
 }
 function renderCats(){const box=$('marketCats');box.innerHTML=categories.map(c=>`<button class="market-cat ${selected===c?'active':''}" data-cat="${c}">${c}</button>`).join('');box.querySelectorAll('button').forEach(b=>b.onclick=()=>{selected=b.dataset.cat;renderCats();render()})}
 function card(l){const ins=isInstalled(l.id);return `<article class="market-card"><div class="lens-art" style="--lens:${esc(l.color)}"><span>${esc(l.emoji)}</span></div><div class="market-card-body"><div class="market-title"><div><h4>${esc(l.name)}</h4><small>by ${esc(l.creator||'Creator')}</small></div>${l.featured?'<span class="featured-pill">Featured</span>':''}</div><div class="market-meta"><span>${esc(l.category||'Custom')}</span><span>♥ ${Number(l.likes||0).toLocaleString()}</span><span>↗ ${Number(l.uses||0).toLocaleString()}</span></div><div class="market-actions"><button class="use-lens ${ins?'installed':''}" data-id="${esc(l.id)}">${ins?'✓ Installed':'Install'}</button><button class="preview-lens" data-id="${esc(l.id)}">Preview</button></div></div></article>`}
 function render(){const box=$('marketGrid'),items=filtered();if(!box)return;box.innerHTML=items.map(card).join('');$('marketCount').textContent=`${items.length} lens${items.length===1?'':'es'}`;$('marketEmpty').hidden=!!items.length;box.querySelectorAll('.use-lens').forEach(b=>b.onclick=()=>use(b.dataset.id));box.querySelectorAll('.preview-lens').forEach(b=>b.onclick=()=>preview(b.dataset.id))}
 function use(id){const l=all().find(x=>x.id===id);if(!l)return;addInstalled(l); apply(l); render();}
 function apply(l){try{localStorage.setItem('leonlens_active_market_lens',JSON.stringify(l))}catch{}; if(typeof window.applyCustomLens==='function')window.applyCustomLens(l); else if(typeof window.setLens==='function'){window.setLens('normal'); const vn=$('video'); if(vn)vn.style.filter=`saturate(${0.8+l.intensity/120}) sepia(${l.category==='Vintage'?0.22:0}) hue-rotate(${l.category==='Mood'?'15deg':'0deg'})`; const ln=$('lensName');if(ln)ln.textContent=l.name;} if($('recordStatus'))$('recordStatus').textContent=`${l.name} installed and ready.`}
 function preview(id){const l=all().find(x=>x.id===id);if(!l)return;const box=document.createElement('div');box.className='market-preview';box.innerHTML=`<div class="preview-card"><button class="preview-close">×</button><div class="preview-art" style="--lens:${esc(l.color)}"><span>${esc(l.emoji)}</span></div><h3>${esc(l.name)}</h3><p>by ${esc(l.creator||'Creator')}</p><div class="preview-stats"><span>Intensity ${l.intensity}%</span><span>Glow ${l.glow}%</span><span>Grain ${l.grain}%</span></div><button class="primary preview-use">${isInstalled(id)?'Use Lens':'Install & Use'}</button></div>`;document.body.appendChild(box);box.querySelector('.preview-close').onclick=()=>box.remove();box.querySelector('.preview-use').onclick=()=>{use(id);box.remove()}}
 function open(){if(typeof openPanel==='function')openPanel('marketPanel');else $('marketPanel').classList.add('open');render()}
 function openStudio(){if(typeof window.openStudio==='function')window.openStudio();else $('studioBtn')?.click()}
 document.addEventListener('DOMContentLoaded',addUI); if(document.readyState!=='loading')addUI();
 window.LeonMarketplace={open,all,installed,use,render};
})();
