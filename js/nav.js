(function(){
var L=[["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["Watchline","/watchline/"],["Top 5","/lineup/"]];
var p=location.pathname;
function on(h){return h=="/"?(p=="/"||p=="/index.html"):p.indexOf(h.replace(/\/$/,""))==0;}
var css=".lnx{position:sticky;top:0;z-index:9999;display:flex;align-items:center;gap:10px;height:62px;padding:0 14px;background:rgba(6,6,11,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);font:600 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lnx a{color:#e8e8f0;text-decoration:none}.lnx .lg{display:flex;align-items:center;gap:10px;font-weight:900;font-size:21px;letter-spacing:.05em;margin-right:auto;color:#fff}.lnx .lg .lfx{width:44px;height:44px;display:block}.lnx .lg span{color:#22f0ff}.lnx .lk{display:flex;gap:4px}.lnx .lk a{padding:7px 10px;border-radius:8px;opacity:.85}.lnx .lk a:hover,.lnx .lk a.on{background:rgba(255,255,255,.08);opacity:1}.lnx .hm{padding:8px 14px;border-radius:999px;color:#fff;font-weight:800;background:linear-gradient(90deg,#ff3d00,#ff9100)}.lnx .mb{display:none;width:44px;height:44px;border:0;background:none;color:#fff;font-size:24px;cursor:pointer}.lnd{position:fixed;inset:62px 0 0 0;z-index:9998;background:rgba(6,6,11,.97);display:none;flex-direction:column;padding:10px 16px;overflow:auto}.lnd.op{display:flex}.lnd a{color:#fff;text-decoration:none;font:600 18px system-ui,sans-serif;padding:15px 8px;border-bottom:1px solid rgba(255,255,255,.08)}.lnd a.on{color:#ff9100}.lnx .lk{display:none!important}.lnx .mb{display:block}.lnq{position:sticky;top:62px;z-index:9997;display:flex;justify-content:center;gap:6px;padding:7px 10px;background:rgba(6,6,11,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);font:700 14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lnq a{flex:0 1 auto;color:#e8e8f0;text-decoration:none;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,.06);white-space:nowrap}.lnq a:hover{background:rgba(255,255,255,.14)}.lnq a.on{background:#22f0ff;color:#06060b}@media(max-width:600px){.lnq{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px}.lnq a{text-align:center;padding:10px 4px;font-size:14px}}.lbn{display:none}@media(max-width:700px){.lnq{display:none!important}.lnx .mb{display:none!important}body{padding-bottom:calc(66px + env(safe-area-inset-bottom))}.lnd{bottom:calc(62px + env(safe-area-inset-bottom))}.lbn{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:9999;background:rgba(6,6,11,.96);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.08);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}.lbn a,.lbn button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:48px;font-size:19px;text-decoration:none;color:#9a9ab5;background:none;border:0;cursor:pointer;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lbn span{font-size:11px;font-weight:600}.lbn .on{color:#22f0ff}}";
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var h=document.createElement("div");h.className="lnx";h.setAttribute("role","navigation");h.setAttribute("aria-label","Main");
var lk=L.map(function(x){return '<a href="'+x[1]+'"'+(on(x[1])?' class="on" aria-current="page"':'')+'>'+x[0]+'</a>';}).join("");
h.innerHTML='<a class="lg" href="/" aria-label="LeonLink home"><canvas class="lfx" width="88" height="88" role="img" aria-label="LeonLink anchor logo"></canvas>LEON<span>LINK</span></a><div class="lk">'+lk+'</div><button class="mb" aria-label="Menu" aria-expanded="false">\u2630</button>';
var d=document.createElement("div");d.className="lnd";d.innerHTML=lk;
var q=document.createElement("div");q.className="lnq";q.setAttribute("aria-label","Quick links");q.innerHTML=[["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["Watchline","/watchline/"],["Top 5","/lineup/"]].map(function(x){return '<a href="'+x[1]+'"'+((x[1]=="/lineup/"?on(x[1])&&p.indexOf("/lineup/clocks-corner")!=0:on(x[1]))?' class="on"':'')+'>'+x[0]+'</a>';}).join("");
document.body.insertBefore(q,document.body.firstChild);document.body.insertBefore(d,document.body.firstChild);document.body.insertBefore(h,document.body.firstChild);
var b=h.querySelector(".mb");b.onclick=function(){var o=d.classList.toggle("op");b.textContent=o?"\u2715":"\u2630";b.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";};
var bn=document.createElement("nav");bn.className="lbn";bn.setAttribute("aria-label","Bottom navigation");
bn.innerHTML=[["\uD83C\uDFE0","Home","/"],["\uD83D\uDCBB","Software","/software.html"],["\uD83C\uDFAE","Games","/games.html"],["\uD83D\uDCDD","Blog","/blog.html"],["\u231A","Watchline","/watchline/"]].map(function(x){return '<a href="'+x[2]+'"'+(on(x[2])?' class="on" aria-current="page"':'')+'>'+x[0]+'<span>'+x[1]+'</span></a>';}).join("")+'<button type="button" aria-label="More" aria-expanded="false">\u2630<span>More</span></button>';
document.body.appendChild(bn);
var mo=bn.querySelector("button");mo.onclick=function(){var o=d.classList.toggle("op");mo.firstChild.nodeValue=o?"\u2715":"\u2630";mo.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";};
(function(){var cv=h.querySelector(".lfx");if(!cv||!cv.getContext)return;var c=cv.getContext("2d"),im=new Image();im.src="/img/logo-128.png";var rd=matchMedia("(prefers-reduced-motion: reduce)").matches,E=[],i;for(i=0;i<10;i++)E.push({x:12+Math.random()*64,y:Math.random()*88,s:1+Math.random()*1.8,v:7+Math.random()*10,p:Math.random()*6.28});
function dr(t){c.clearRect(0,0,88,88);c.save();c.translate(44,80);if(!rd)c.rotate(Math.sin(t*1.4)*.09);c.translate(-44,-80);c.shadowColor="rgba(34,240,255,.95)";c.shadowBlur=rd?10:11+5*Math.sin(t*6.3)+3*Math.sin(t*11.7);if(im.complete&&im.naturalWidth)c.drawImage(im,6,6,76,76);c.restore();if(!rd)for(i=0;i<E.length;i++){var e=E[i];e.y-=e.v/60;if(e.y<2){e.y=86;e.x=12+Math.random()*64}c.fillStyle="rgba(140,235,255,"+(.25+.6*(e.y/88))+")";c.beginPath();c.arc(e.x+Math.sin(t*3+e.p)*4,e.y,e.s,0,6.29);c.fill();}}
if(rd){im.onload=function(){dr(0)};dr(0)}else{var t0=performance.now();(function lp(n){dr((n-t0)/1000);requestAnimationFrame(lp)})(t0)}})();
})();
(function(){if(document.getElementById("lfx-js"))return;var s=document.createElement("script");s.id="lfx-js";s.src="/js/fx.js?v=1";s.defer=true;document.head.appendChild(s)})();

/* HALLOWEEN SKIN — Oct 2026 (auto-expires after Nov 1) */
(function(){
try{
var now=new Date(); if(now>new Date('2026-11-01T23:59:59')) return;
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var css=''
+'.lnx .lg{position:relative}'
+'.hw-drips{position:absolute;left:2px;top:40px;width:44px;height:30px;pointer-events:none;z-index:5}'
+'.hw-drips i{position:absolute;top:0;width:5px;border-radius:0 0 6px 6px;background:linear-gradient(#f21636,#8f0c22);transform-origin:top}'
+'.hw-drips i:after{content:"";position:absolute;left:0;bottom:-4px;width:5px;height:7px;border-radius:50%;background:#c01028}'
+(RM?'':'.hw-drips i{animation:hwDrip 3.6s ease-in infinite}.hw-drips i:after{animation:hwDrop 3.6s ease-in infinite}')
+'@keyframes hwDrip{0%{transform:scaleY(.25)}55%{transform:scaleY(1)}100%{transform:scaleY(1)}}'
+'@keyframes hwDrop{0%,55%{transform:translateY(0);opacity:0}62%{opacity:1}88%{transform:translateY(24px);opacity:1}100%{transform:translateY(30px);opacity:0}}'
+'.hw-hline{position:absolute;left:0;right:0;bottom:-7px;height:8px;pointer-events:none}'
+'.hw-hline i{position:absolute;top:-1px;width:6px;border-radius:0 0 6px 6px;background:linear-gradient(#d40f2a,#7d0a1e)}'
+'.hw-witch{position:fixed;top:0;left:0;pointer-events:none;z-index:9990;will-change:transform}'
+(RM?'':'@keyframes hwFlyR{0%{transform:translate3d(-16vw,0,0)}25%{transform:translate3d(16vw,-12px,0)}50%{transform:translate3d(48vw,6px,0)}75%{transform:translate3d(80vw,-10px,0)}100%{transform:translate3d(112vw,0,0)}}@keyframes hwFlyL{0%{transform:translate3d(112vw,0,0) scaleX(-1)}25%{transform:translate3d(80vw,-12px,0) scaleX(-1)}50%{transform:translate3d(48vw,6px,0) scaleX(-1)}75%{transform:translate3d(16vw,-10px,0) scaleX(-1)}100%{transform:translate3d(-16vw,0,0) scaleX(-1)}}')
+'.hw-dude{position:fixed;bottom:0;pointer-events:none;z-index:1;opacity:.13}'
+'.hw-dudebar{position:absolute;right:118px;top:4px;height:54px;opacity:.32;pointer-events:none}'
+'.hw-dudefoot{position:absolute;right:10px;bottom:0;height:120px;opacity:.28;pointer-events:none}';
var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
var DUDE='<svg viewBox="0 0 60 160" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="14" rx="17" ry="4.5" fill="#050508"/><path d="M22 12 L38 12 L36 26 L24 26 Z" fill="#050508"/><circle cx="30" cy="33" r="8.5" fill="#050508"/><circle cx="27" cy="32" r="1.3" fill="#d8d8e2" opacity=".55"/><circle cx="33" cy="32" r="1.3" fill="#d8d8e2" opacity=".55"/><path d="M18 44 C18 40 42 40 42 44 L47 158 L13 158 Z" fill="#050508"/><path d="M18 48 L6 120 L11 121 L20 60 Z" fill="#050508"/><path d="M42 48 L54 120 L49 121 L40 60 Z" fill="#050508"/></svg>';
var WITCH='<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><path d="M2 38 L16 41 L4 54 L18 47 L30 44 L28 39 L14 35 Z" fill="#0a0a12"/><rect x="24" y="39.5" width="46" height="3" rx="1.5" transform="rotate(-4 24 39)" fill="#0a0a12"/><path d="M59 4 L66 20 L51 20 Z" fill="#0a0a12"/><ellipse cx="58" cy="21" rx="11" ry="2.4" fill="#0a0a12"/><circle cx="57" cy="26" r="4.4" fill="#0a0a12"/><path d="M53 29 C46 34 41 39 36 46 L62 44 C60 38 58 32 57 29 Z" fill="#0a0a12"/><path d="M55 32 L66 38 L65 40.5 L54 35 Z" fill="#0a0a12"/><path d="M58 41 L72 42.5 L71.6 45.4 L57.6 44 Z" fill="#0a0a12"/></svg>';
function go(){
  var lg=document.querySelector('.lnx .lg');
  if(lg && !lg.querySelector('.hw-drips')){
    var d=document.createElement('div'); d.className='hw-drips';
    var specs=[[3,15],[13,22],[24,12],[35,19]];
    specs.forEach(function(s,i){var el=document.createElement('i');el.style.left=s[0]+'px';el.style.height=s[1]+'px';el.style.animationDelay=(i*0.9)+'s';d.appendChild(el);});
    lg.appendChild(d);
    var dude=document.createElement('div'); dude.className='hw-dudebar'; dude.innerHTML=DUDE;
    var lnx=document.querySelector('.lnx'); if(lnx){lnx.appendChild(dude);
      var hl=document.createElement('div'); hl.className='hw-hline';
      [[6,9],[19,13],[47,8],[63,12],[81,9],[92,14]].forEach(function(s){var el=document.createElement('i');el.style.left=s[0]+'%';el.style.height=s[1]+'px';hl.appendChild(el);});
      lnx.appendChild(hl);}
  }
  var foot=document.querySelector('footer');
  if(foot && !foot.querySelector('.hw-dudefoot')){foot.style.position='relative';var fd=document.createElement('div');fd.className='hw-dudefoot';fd.innerHTML=DUDE;foot.appendChild(fd);}
  var watcher=document.createElement('div'); watcher.className='hw-dude'; watcher.style.left='-14px'; watcher.style.height='42vh'; watcher.innerHTML=DUDE; document.body.appendChild(watcher);
  if(!RM){
    var N=window.innerWidth<700?3:4;
    for(var i=0;i<N;i++){
      var p=document.createElement('div'); p.className='hw-witch';
      var sz=54+Math.random()*34;
      p.style.top=(2+Math.random()*54)+'px'; p.style.width=sz+'px'; p.style.opacity=(0.8+Math.random()*0.2);
      p.innerHTML=WITCH;
      var L=Math.random()<0.5;
      p.style.animation=(L?'hwFlyL ':'hwFlyR ')+(17+Math.random()*12)+'s linear '+(-Math.random()*20)+'s infinite';
      document.body.appendChild(p);
    }
    setTimeout(function(){ document.querySelectorAll('.hw-witch').forEach(function(p){ p.style.transition='opacity 1.2s'; p.style.opacity='0'; setTimeout(function(){ p.remove(); },1300); }); }, 30000);
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
}catch(e){}
})();

/* Floating Share button: page headers sit under the site nav, so surface Share here */
(function(){try{var sb=document.querySelector('.sharebtn');if(!sb||document.querySelector('.lsf'))return;
var st=document.createElement('style');st.textContent='.lsf{position:fixed;right:16px;bottom:20px;z-index:9996;display:flex;align-items:center;gap:8px;padding:12px 20px;min-height:46px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(11,16,24,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font:700 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.55);cursor:pointer;-webkit-tap-highlight-color:transparent}.lsf:hover{border-color:#22f0ff}@media(max-width:700px){.lsf{bottom:calc(78px + env(safe-area-inset-bottom))}}';document.head.appendChild(st);
var f=document.createElement('button');f.type='button';f.className='lsf';f.setAttribute('aria-label','Share this page');f.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg><span>Share</span>';
f.onclick=function(){sb.click();if(!navigator.share){var s=f.querySelector('span');s.textContent='Link copied';setTimeout(function(){s.textContent='Share'},2000)}};
document.body.appendChild(f)}catch(e){}})();
