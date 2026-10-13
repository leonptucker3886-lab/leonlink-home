/* LeonLink FX: lightweight interactive layer. No libraries. Respects reduced motion. */
(function(){
if(window.__lfx)return;window.__lfx=1;
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches,FINE=matchMedia("(hover:hover) and (pointer:fine)").matches,P=location.pathname,D=document;
var css=".lfx-r{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1)}.lfx-r.lfx-in{opacity:1;transform:none}"+
"#lfx-pb{position:fixed;top:0;left:0;height:3px;width:0;z-index:10001;background:linear-gradient(90deg,#22f0ff,#ff3df0);box-shadow:0 0 10px #22f0ff}"+
".lfx-t{will-change:transform;transition:transform .25s ease,box-shadow .25s ease}.lfx-t:hover{box-shadow:0 10px 34px rgba(34,240,255,.28)}"+
".lfx-g{position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity .25s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(34,240,255,.28),transparent 55%);z-index:3}.lfx-t:hover .lfx-g,.lfx-tap .lfx-g{opacity:1}"+
".lfx-rp{position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,.45);animation:lfxrp .6s ease-out forwards;pointer-events:none}@keyframes lfxrp{to{transform:scale(4);opacity:0}}"+
".lfx-sf{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.7}.lfx-host{position:relative}.lfx-host>*:not(.lfx-sf){position:relative;z-index:1}"+
".lfx-cur::after{content:'|';margin-left:2px;color:#22f0ff;animation:lfxbl 1s steps(1) infinite}@keyframes lfxbl{50%{opacity:0}}#lfx-cf{position:fixed;inset:0;pointer-events:none;z-index:10002}";
var s=D.createElement("style");s.textContent=css;D.head.appendChild(s);
var CARDS=".sc,.spc,.card,.gc,.post,.tile,.nc,.hbar,.tdc,.grid>a";
function $$(q){return Array.prototype.slice.call(D.querySelectorAll(q))}
function reveal(){if(RM||!("IntersectionObserver" in window))return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("lfx-in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px"});
 $$(CARDS+",.sec>h2").forEach(function(el,i){if(el.closest(".lnx,.lnd"))return;if(el.getBoundingClientRect().top<innerHeight)return;
  el.classList.add("lfx-r");el.style.transitionDelay=((i%4)*70)+"ms";io.observe(el)})}
function progress(){if(!(/\/blog\/|\/lineup\/.+/.test(P)||(D.querySelector("article")&&!/blog\.html$|^\/$|index\.html$/.test(P))))return;
 var b=D.createElement("div");b.id="lfx-pb";D.body.appendChild(b);
 function u(){var h=D.documentElement,m=h.scrollHeight-h.clientHeight;b.style.width=(m>0?Math.min(100,h.scrollTop/m*100):0)+"%"}
 addEventListener("scroll",u,{passive:true});u()}
function tilt(){$$(CARDS).forEach(function(el){if(el.closest(".lnx,.lnd")||el.__t)return;el.__t=1;
 if(getComputedStyle(el).position=="static")el.style.position="relative";el.classList.add("lfx-t");
 var g=D.createElement("span");g.className="lfx-g";el.appendChild(g);
 function pos(cx,cy){var r=el.getBoundingClientRect(),x=(cx-r.left)/r.width,y=(cy-r.top)/r.height;el.style.setProperty("--gx",x*100+"%");el.style.setProperty("--gy",y*100+"%");return[x,y]}
 if(FINE&&!RM){el.addEventListener("pointermove",function(e){var q=pos(e.clientX,e.clientY);el.style.transform="perspective(800px) rotateX("+((.5-q[1])*8)+"deg) rotateY("+((q[0]-.5)*10)+"deg) translateY(-3px)"});
  el.addEventListener("pointerleave",function(){el.style.transform=""})}
 else el.addEventListener("touchstart",function(e){var t=e.touches[0];pos(t.clientX,t.clientY);el.classList.add("lfx-tap");setTimeout(function(){el.classList.remove("lfx-tap")},450)},{passive:true})})}
function hero(){
 var host=D.querySelector("#spot");
 if(host&&!RM){host.classList.add("lfx-host");var c=D.createElement("canvas");c.className="lfx-sf";host.insertBefore(c,host.firstChild);
  var x=c.getContext("2d"),S=[],W,H,dpr=Math.min(2,devicePixelRatio||1),mx=0,my=0,vis=true;
  function rs(){W=host.offsetWidth;H=host.offsetHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)}rs();addEventListener("resize",rs);
  for(var i=0,n=innerWidth<700?40:80;i<n;i++)S.push({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7,p:Math.random()*6.3});
  host.addEventListener("pointermove",function(e){var r=host.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5});
  new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(host);
  (function lp(t){requestAnimationFrame(lp);if(!vis||D.hidden)return;x.clearRect(0,0,W,H);t/=1000;
   for(var i=0;i<S.length;i++){var s=S[i];s.y-=.0004*s.z;if(s.y<0){s.y=1;s.x=Math.random()}
    x.fillStyle="rgba("+(s.p>3?"34,240,255,":"255,120,240,")+Math.max(.1,.35+.5*Math.sin(t*2+s.p)*s.z)+")";x.beginPath();x.arc((s.x+mx*.04*s.z)*W,(s.y+my*.04*s.z)*H,1.6*s.z,0,6.29);x.fill()}})(0)}
 var h=(P=="/"||P=="/index.html")?(D.querySelector("#picker h2")||D.querySelector(".sec h2")):null;
 if(h&&!RM&&!h.children.length&&h.textContent.trim().length<60){var full=h.textContent.trim(),k=0;h.setAttribute("aria-label",full);h.textContent="";h.classList.add("lfx-cur");
  (function ty(){h.textContent=full.slice(0,++k);if(k<full.length)setTimeout(ty,45);else setTimeout(function(){h.classList.remove("lfx-cur")},1500)})()}}
function ripple(){if(RM)return;D.addEventListener("pointerdown",function(e){var b=e.target.closest("button,.go,.hm,.btn,.lnq a,[role=button]");if(!b)return;
 var r=b.getBoundingClientRect(),z=Math.max(r.width,r.height),sp=D.createElement("span");sp.className="lfx-rp";
 sp.style.cssText="width:"+z+"px;height:"+z+"px;left:"+(e.clientX-r.left-z/2)+"px;top:"+(e.clientY-r.top-z/2)+"px";
 var cs=getComputedStyle(b);if(cs.position=="static")b.style.position="relative";b.style.overflow="hidden";b.appendChild(sp);setTimeout(function(){sp.remove()},650)})}
function counters(){if(!("IntersectionObserver" in window))return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,
  m=el.textContent.trim().match(/^(\D{0,3})(\d[\d,]*)(\D{0,6})$/);if(!m||RM)return;var to=+m[2].replace(/,/g,""),t0=performance.now();
  (function st(n){var k=Math.min(1,(n-t0)/1100),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=m[1]+v.toLocaleString()+m[3];if(k<1)requestAnimationFrame(st)})(t0)})});
 D.querySelectorAll("[data-count],.stat b,.stats b,.num,.count").forEach(function(el){io.observe(el)})}
function confetti(){var cv=D.createElement("canvas");cv.id="lfx-cf";D.body.appendChild(cv);var x=cv.getContext("2d"),W=cv.width=innerWidth,H=cv.height=innerHeight,ps=[],cl=["#22f0ff","#ff3df0","#ffd400","#ff7a00","#7CFF6B"];
 for(var i=0;i<120;i++)ps.push({x:W/2,y:H*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*13-4,r:Math.random()*6.3,c:cl[i%5],w:5+Math.random()*5});
 var f=0;(function lp(){x.clearRect(0,0,W,H);ps.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-3,p.w,6);x.restore()});
  if(++f<110)requestAnimationFrame(lp);else cv.remove()})()}
function challenge(){var r=D.getElementById("tdR");if(!r||RM||!("MutationObserver" in window))return;var done=0;
 new MutationObserver(function(){var t=r.textContent.toLowerCase();if(!done&&/correct|right|nice|✓|✅/.test(t)&&!/not|wrong|incorrect|✗|❌/.test(t)){done=1;confetti()}}).observe(r,{childList:true,characterData:true,subtree:true})}
function go(){try{reveal();progress();tilt();hero();ripple();counters();challenge();setTimeout(tilt,2500)}catch(e){}}
if(D.readyState=="loading")D.addEventListener("DOMContentLoaded",go);else go();
})();
