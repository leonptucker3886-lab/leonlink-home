(function(){
var L=[["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["Watchline","/watchline/"],["Top 5","/lineup/"],["\uD83D\uDD25 Hire me","/hire-me.html"]];
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
+'.hw-pump{position:fixed;top:0;pointer-events:none;z-index:9990;will-change:transform}'
+(RM?'':'@keyframes hwFall{0%{transform:translate3d(0,-12vh,0) rotate(-8deg)}25%{transform:translate3d(2.2vw,22vh,0) rotate(7deg)}50%{transform:translate3d(-1.6vw,52vh,0) rotate(-6deg)}75%{transform:translate3d(2vw,80vh,0) rotate(8deg)}100%{transform:translate3d(-1vw,112vh,0) rotate(-5deg)}}')
+'.hw-dude{position:fixed;bottom:0;pointer-events:none;z-index:1;opacity:.13}'
+'.hw-dudebar{position:absolute;right:118px;top:4px;height:54px;opacity:.32;pointer-events:none}'
+'.hw-dudefoot{position:absolute;right:10px;bottom:0;height:120px;opacity:.28;pointer-events:none}';
var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
var DUDE='<svg viewBox="0 0 60 160" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="14" rx="17" ry="4.5" fill="#050508"/><path d="M22 12 L38 12 L36 26 L24 26 Z" fill="#050508"/><circle cx="30" cy="33" r="8.5" fill="#050508"/><circle cx="27" cy="32" r="1.3" fill="#d8d8e2" opacity=".55"/><circle cx="33" cy="32" r="1.3" fill="#d8d8e2" opacity=".55"/><path d="M18 44 C18 40 42 40 42 44 L47 158 L13 158 Z" fill="#050508"/><path d="M18 48 L6 120 L11 121 L20 60 Z" fill="#050508"/><path d="M42 48 L54 120 L49 121 L40 60 Z" fill="#050508"/></svg>';
var PUMP='<svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg"><path d="M30 8 C30 3 35 2 38 4 C36 6 35 8 35 11 Z" fill="#5a4020"/><ellipse cx="32" cy="33" rx="27" ry="21" fill="#e8760f"/><ellipse cx="32" cy="33" rx="17" ry="21" fill="#f2820f"/><ellipse cx="32" cy="33" rx="8" ry="21" fill="#e8760f"/><path d="M20 26 L26 26 L23 33 Z" fill="#1a0d02"/><path d="M38 26 L44 26 L41 33 Z" fill="#1a0d02"/><path d="M18 40 L26 44 L31 39 L36 44 L46 39 L42 47 L22 47 Z" fill="#1a0d02"/></svg>';
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
    var N=window.innerWidth<700?7:12;
    for(var i=0;i<N;i++){
      var p=document.createElement('div'); p.className='hw-pump';
      var sz=22+Math.random()*30;
      p.style.left=(Math.random()*96)+'vw'; p.style.width=sz+'px'; p.style.opacity=(0.75+Math.random()*0.25);
      p.innerHTML=PUMP;
      p.style.animation='hwFall '+(11+Math.random()*10)+'s linear '+(Math.random()*14)+'s infinite';
      document.body.appendChild(p);
    }
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
}catch(e){}
})();
