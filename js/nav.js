(function(){
/* Chrome guard: kids pages stay chrome-free; pages with static master.css chrome keep theirs (no double header) */
if(location.pathname.indexOf("/kids")===0)return;
if(window.__llNav)return;window.__llNav=1;
if(document.querySelector('[data-chrome="presents"]:not([data-injected]),.bar:not([data-injected])'))return;
var L=[["Top 5","/lineup/"],["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["How-To","/how-to/"],["Watchline","/watchline/"],["Ebooks","/ebooks.html"],["Moons & Cauldrons","/games/moons.html"],["What's New","/whats-new.html"],["About","/about.html"]];
var p=location.pathname;
function on(h){return h=="/"?(p=="/"||p=="/index.html"):p.indexOf(h.replace(/\/$/,""))==0;}
var css=".lnx{position:sticky;top:0;z-index:9999;display:flex;align-items:center;gap:10px;height:62px;padding:0 14px;background:rgba(6,6,11,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);font:600 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lnx a{color:#e8e8f0;text-decoration:none}.lnx .lg{display:flex;align-items:center;gap:10px;font-weight:900;font-size:21px;letter-spacing:.05em;margin-right:auto;color:#fff}.lnx .lg .lfx{width:44px;height:44px;display:block}.lnx .lg span{color:#22f0ff}.lnx .lk{display:flex;gap:4px}.lnx .lk a{padding:7px 10px;border-radius:8px;opacity:.85}.lnx .lk a:hover,.lnx .lk a.on{background:rgba(255,255,255,.08);opacity:1}.lnx .hm{padding:8px 14px;border-radius:999px;color:#fff;font-weight:800;background:linear-gradient(90deg,#ff3d00,#ff9100)}.lnx .mb{display:none;width:44px;height:44px;border:0;background:none;color:#fff;font-size:24px;cursor:pointer}.lnd{position:fixed;inset:62px 0 0 0;z-index:9998;background:rgba(6,6,11,.97);display:none;flex-direction:column;padding:10px 16px;overflow:auto}.lnd.op{display:flex}.lnd a{color:#fff;text-decoration:none;font:600 18px system-ui,sans-serif;padding:15px 8px;border-bottom:1px solid rgba(255,255,255,.08)}.lnd a.on{color:#ff9100}.lnx .lk{display:none!important}.lnx .mb{display:block}.lnq{position:sticky;top:62px;z-index:9997;display:flex;justify-content:center;gap:6px;padding:7px 10px;background:rgba(6,6,11,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);font:700 14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lnq a{flex:0 1 auto;color:#e8e8f0;text-decoration:none;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,.06);white-space:nowrap}.lnq a:hover{background:rgba(255,255,255,.14)}.lnq a.on{background:#22f0ff;color:#06060b}@media(max-width:600px){.lnq{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px}.lnq a{text-align:center;padding:10px 4px;font-size:14px}}@media(max-width:700px){.lnq{display:none!important}.lnx .mb{display:none!important}.lnd{bottom:calc(62px + env(safe-area-inset-bottom))}}";
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var h=document.createElement("div");h.className="lnx";h.setAttribute("data-chrome","presents");h.setAttribute("data-injected","nav.js");h.setAttribute("role","navigation");h.setAttribute("aria-label","Main");
var lk=L.map(function(x){return '<a href="'+x[1]+'"'+(on(x[1])?' class="on" aria-current="page"':'')+'>'+x[0]+'</a>';}).join("");
h.innerHTML='<a class="lg" href="/" aria-label="LeonLink home"><canvas class="lfx" width="88" height="88" role="img" aria-label="LeonLink anchor logo"></canvas>LEON<span>LINK</span></a><div class="lk">'+lk+'</div><button class="mb" aria-label="Menu" aria-expanded="false">\u2630</button>';
var d=document.createElement("div");d.className="lnd";d.innerHTML=lk;
var q=document.createElement("div");q.className="lnq";q.setAttribute("data-chrome","quick-links");q.setAttribute("data-injected","nav.js");q.setAttribute("aria-label","Quick links");q.innerHTML=[["Top 5","/lineup/"],["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["How-To","/how-to/"],["Watchline","/watchline/"],["Ebooks","/ebooks.html"],["\uD83C\uDF19 Moons","/games/moons.html"],["\u2728 New","/whats-new.html"],["More","#"]].map(function(x){if(x[0]=="More")return '<a href="#" onclick="document.querySelector(\'.lnx .mb\').click();return false">'+x[0]+'</a>';return '<a href="'+x[1]+'"'+((x[1]=="/lineup/"?on(x[1])&&p.indexOf("/lineup/clocks-corner")!=0:on(x[1]))?' class="on"':'')+'>'+x[0]+'</a>';}).join("");
document.body.insertBefore(q,document.body.firstChild);document.body.insertBefore(d,document.body.firstChild);document.body.insertBefore(h,document.body.firstChild);
var b=h.querySelector(".mb");b.onclick=function(){var o=d.classList.toggle("op");b.textContent=o?"\u2715":"\u2630";b.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";};
/* bottom nav lives in /js/bottom-nav.js */
(function(){var cv=h.querySelector(".lfx");if(!cv||!cv.getContext)return;var c=cv.getContext("2d"),im=new Image();im.src="/img/logo-128.png";var rd=matchMedia("(prefers-reduced-motion: reduce)").matches,E=[],i;for(i=0;i<10;i++)E.push({x:12+Math.random()*64,y:Math.random()*88,s:1+Math.random()*1.8,v:7+Math.random()*10,p:Math.random()*6.28});
function dr(t){c.clearRect(0,0,88,88);c.save();c.translate(44,80);if(!rd)c.rotate(Math.sin(t*1.4)*.09);c.translate(-44,-80);c.shadowColor="rgba(34,240,255,.95)";c.shadowBlur=rd?10:11+5*Math.sin(t*6.3)+3*Math.sin(t*11.7);if(im.complete&&im.naturalWidth)c.drawImage(im,6,6,76,76);c.restore();if(!rd)for(i=0;i<E.length;i++){var e=E[i];e.y-=e.v/60;if(e.y<2){e.y=86;e.x=12+Math.random()*64}c.fillStyle="rgba(140,235,255,"+(.25+.6*(e.y/88))+")";c.beginPath();c.arc(e.x+Math.sin(t*3+e.p)*4,e.y,e.s,0,6.29);c.fill();}}
if(rd){im.onload=function(){dr(0)};dr(0)}else{var t0=performance.now();(function lp(n){dr((n-t0)/1000);requestAnimationFrame(lp)})(t0)}})();
})();
(function(){if(document.getElementById("lfx-js"))return;var s=document.createElement("script");s.id="lfx-js";s.src="/js/fx.js?v=1";s.defer=true;document.head.appendChild(s)})();


/* Floating Share button: page headers sit under the site nav, so surface Share here */
(function(){try{var sb=document.querySelector('.sharebtn');if(!sb||document.querySelector('.lsf'))return;
var st=document.createElement('style');st.textContent='.lsf{position:fixed;right:16px;bottom:20px;z-index:9996;display:flex;align-items:center;gap:8px;padding:12px 20px;min-height:46px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(11,16,24,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#fff;font:700 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 10px 28px rgba(0,0,0,.55);cursor:pointer;-webkit-tap-highlight-color:transparent}.lsf:hover{border-color:#22f0ff}@media(max-width:700px){.lsf{bottom:calc(78px + env(safe-area-inset-bottom))}}';document.head.appendChild(st);
var f=document.createElement('button');f.type='button';f.className='lsf';f.setAttribute('aria-label','Share this page');f.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg><span>Share</span>';
f.onclick=function(){sb.click();if(!navigator.share){var s=f.querySelector('span');s.textContent='Link copied';setTimeout(function(){s.textContent='Share'},2000)}};
document.body.appendChild(f)}catch(e){}})();

(function(){if(document.querySelector('script[src="/js/bottom-nav.js"]'))return;var s=document.createElement("script");s.src="/js/bottom-nav.js";s.defer=true;document.head.appendChild(s);})();

;(function(){if(location.pathname.indexOf("/journal/")===0&&!document.getElementById("ll-pt")){var s=document.createElement("script");s.id="ll-pt";s.src="/js/post-tools.js?v=1";s.defer=true;document.head.appendChild(s)}})();

/* Crew art in the header: faded group portrait on every page */
(function(){try{var s=document.createElement('style');s.textContent='.lnx,.gh{isolation:isolate;overflow:hidden}.lnx::before,.gh::before{content:"";position:absolute;inset:0;z-index:-1;background:url(/img/cards/group-portrait.jpg) center 38%/cover no-repeat;opacity:.3;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%,#000 70%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 30%,#000 70%,transparent 100%)}';document.head.appendChild(s);}catch(e){}})();

/* Footer quote art: Listening first is the whole job, human or not. */
(function(){try{
var Q='<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Listening first is the whole job, human or not. - Stonewall"><text x="360" y="72" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-style="italic" font-size="38" fill="#e8e8f0">Listening first is the whole job,</text><text x="360" y="122" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-style="italic" font-size="38" fill="#e8e8f0">human or not.</text><line x1="290" y1="158" x2="430" y2="158" stroke="#22f0ff" stroke-width="2"/><text x="360" y="188" text-anchor="middle" font-family="system-ui, sans-serif" font-size="17" letter-spacing="4" fill="#22f0ff">STONEWALL</text></svg>';
var st=document.createElement('style');st.textContent='.ll-quote-art{margin:22px auto 0;max-width:640px}.ll-quote-art svg{width:100%;height:auto;display:block}';document.head.appendChild(st);
var foot=document.querySelector('footer');
var box=document.createElement('div');box.className='ll-quote-art';box.innerHTML=Q;
if(foot){if(!foot.querySelector('.ll-quote-art'))foot.appendChild(box);}
else{var f=document.createElement('footer');f.className='ll-footer';f.style.cssText='border-top:1px solid rgba(128,128,128,.25);padding:22px 16px;text-align:center;';f.appendChild(box);document.body.appendChild(f);}
}catch(e){}})();

/* Mushroom Madness chat widget on every page */
;(function(){if(!document.getElementById("ll-mush")){var s=document.createElement("script");s.id="ll-mush";s.src="/js/mushroom-chat.js?v=1";s.defer=true;(document.body||document.head).appendChild(s)}})();

;(function(){if(!document.getElementById("ll-glow")){var s=document.createElement("script");s.id="ll-glow";s.src="/js/glow-account.js?v=1";s.defer=true;(document.body||document.head).appendChild(s)}})();
