/* LeonLens V8 — Creator Lens Studio. Local-first, optional Supabase sync. */
(() => {
  const $ = id => document.getElementById(id);
  const KEY = 'leonlens_custom_lenses_v8';
  const presets = [
    {id:'creator-sunset',name:'Creator Sunset',emoji:'🌅',type:'color',color:'#ff6b4a',intensity:72,blur:0,grain:18,glow:24},
    {id:'electric-blue',name:'Electric Blue',emoji:'⚡',type:'color',color:'#35a7ff',intensity:62,blur:0,grain:8,glow:30},
    {id:'dreamy',name:'Dreamy',emoji:'✨',type:'soft',color:'#dca7ff',intensity:48,blur:1.5,grain:4,glow:42}
  ];
  let currentCustom = null;
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)||'[]') } catch { return [] } };
  const write = a => localStorage.setItem(KEY, JSON.stringify(a.slice(0,30)));
  const esc = v => String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function all(){ const own=read(); return [...presets,...own]; }
  function addUI(){
    const nav=document.querySelector('.bottom-nav');
    if(nav && !$('#studioNav')){ const b=document.createElement('button');b.className='nav';b.id='studioNav';b.innerHTML='✎<span>Studio</span>';nav.insertBefore(b, nav.lastElementChild); b.onclick=()=>openStudio(); }
    const top=document.querySelector('.top-actions');
    if(top && !$('#studioBtn')){const b=document.createElement('button');b.id='studioBtn';b.setAttribute('aria-label','Lens Studio');b.textContent='✎';top.insertBefore(b,top.firstChild);b.onclick=openStudio;}
    if($('#studioPanel'))return;
    const p=document.createElement('div');p.id='studioPanel';p.className='panel';p.innerHTML=`<div class="panel-head"><button class="close" data-close>×</button><h2>Lens Studio</h2><button id="newLens" class="text-btn">New</button></div>
      <div class="studio-tabs"><button class="studio-tab active" data-tab="my">My Lenses</button><button class="studio-tab" data-tab="featured">Featured</button></div>
      <div id="studioMy" class="studio-content"><div class="studio-grid" id="myLensGrid"></div><div id="myLensEmpty" class="empty">No custom lenses yet. Build your first one.</div></div>
      <div id="studioFeatured" class="studio-content" hidden><div class="studio-grid" id="featuredGrid"></div></div>
      <div id="lensEditor" class="lens-editor" hidden><h3>Create a Lens</h3><input id="lensTitle" class="field" maxlength="28" placeholder="Lens name"><div class="editor-row"><label>Emoji<input id="lensEmoji" class="field" maxlength="2" value="✨"></label><label>Color<input id="lensColor" type="color" value="#ff4d8d"></label></div><label class="range-label">Intensity <output id="lensIntensityOut">65</output><input id="lensIntensity" type="range" min="10" max="100" value="65"></label><label class="range-label">Glow <output id="lensGlowOut">25</output><input id="lensGlow" type="range" min="0" max="80" value="25"></label><label class="range-label">Grain <output id="lensGrainOut">10</output><input id="lensGrain" type="range" min="0" max="40" value="10"></label><div class="editor-row"><button id="saveLens" class="primary">Save Lens</button><button id="cancelLens" class="ghost">Cancel</button></div><p class="small-note">Custom lenses are saved on this device. Cloud publishing can be added when your Supabase project is configured.</p></div>`;
    document.body.appendChild(p);
    p.querySelectorAll('.studio-tab').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
    $('#newLens').onclick=()=>showEditor(); $('#cancelLens').onclick=()=>hideEditor(); $('#saveLens').onclick=saveLens;
    ['lensIntensity','lensGlow','lensGrain'].forEach(id=>$(id).addEventListener('input',()=>$(id+'Out').textContent=$(id).value));
    renderStudio();
  }
  function switchTab(tab){document.querySelectorAll('.studio-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('#studioMy').hidden=tab!=='my';$('#studioFeatured').hidden=tab!=='featured';}
  function openStudio(){ if(typeof openPanel==='function')openPanel('studioPanel'); else $('#studioPanel').classList.add('open'); renderStudio(); }
  function showEditor(l){ currentCustom=l||null; $('#lensEditor').hidden=false; $('#lensTitle').value=l?.name||''; $('#lensEmoji').value=l?.emoji||'✨'; $('#lensColor').value=l?.color||'#ff4d8d'; $('#lensIntensity').value=l?.intensity??65; $('#lensGlow').value=l?.glow??25; $('#lensGrain').value=l?.grain??10; ['lensIntensity','lensGlow','lensGrain'].forEach(id=>$(id+'Out').textContent=$(id).value); }
  function hideEditor(){currentCustom=null;$('#lensEditor').hidden=true;}
  function saveLens(){const name=$('#lensTitle').value.trim()||'My Lens';const lens={id:currentCustom?.id||('custom-'+Date.now()),name,emoji:$('#lensEmoji').value.trim()||'✨',type:'custom',color:$('#lensColor').value,intensity:+$('#lensIntensity').value,glow:+$('#lensGlow').value,grain:+$('#lensGrain').value,createdAt:new Date().toISOString()};const a=read().filter(x=>x.id!==lens.id);a.unshift(lens);write(a);hideEditor();renderStudio();applyCustom(lens);if($('recordStatus'))$('recordStatus').textContent=`${name} is ready.`;}
  function renderStudio(){if(!$('#myLensGrid'))return;const mine=read();$('#myLensEmpty').style.display=mine.length?'none':'block';$('#myLensGrid').innerHTML=mine.map(card).join('');$('#featuredGrid').innerHTML=presets.map(card).join('');document.querySelectorAll('.lens-card [data-use]').forEach(b=>b.onclick=()=>{const l=all().find(x=>x.id===b.dataset.use);if(l)applyCustom(l);});document.querySelectorAll('.lens-card [data-edit]').forEach(b=>b.onclick=()=>{const l=read().find(x=>x.id===b.dataset.edit);if(l)showEditor(l);});document.querySelectorAll('.lens-card [data-delete]').forEach(b=>b.onclick=()=>{write(read().filter(x=>x.id!==b.dataset.delete));renderStudio();});}
  function card(l){return `<article class="lens-card"><div class="lens-art" style="--lens:${esc(l.color)};--int:${(l.intensity||60)/100}"><span>${esc(l.emoji||'✨')}</span></div><div class="lens-card-body"><b>${esc(l.name)}</b><small>${l.type==='custom'?'Your lens':'LeonLens featured'}</small><div class="lens-card-actions"><button data-use="${esc(l.id)}" class="primary mini">Use</button>${l.type==='custom'?`<button data-edit="${esc(l.id)}" class="ghost mini">Edit</button><button data-delete="${esc(l.id)}" class="ghost mini">Delete</button>`:''}</div></div></article>`;}
  function applyCustom(l){currentCustom=l;window.LEONLENS_CUSTOM_LENS=l;const video=$('video');if(video){video.className='';video.style.setProperty('--custom-color',l.color);video.style.setProperty('--custom-intensity',String((l.intensity||60)/100));video.style.setProperty('--custom-glow',String((l.glow||0)/100));video.style.setProperty('--custom-grain',String((l.grain||0)/100));video.classList.add('custom-lens');}if($('lensName'))$('lensName').textContent=l.name;if($('arBadge')){$('arBadge').textContent='CREATOR';$('arBadge').classList.add('on');}if(typeof renderFilters==='function')renderFilters();}
  window.LeonLensStudio={open:openStudio,apply:applyCustom,all};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addUI);else addUI();
})();
