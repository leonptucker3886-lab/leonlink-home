/* LeonLink shared bottom navigation — one source for every page (mobile, <=700px) */
(function(){
if(window.__llBottomNav)return;window.__llBottomNav=1;
var p=location.pathname;
function on(h){return h=="/"?(p=="/"||p=="/index.html"):p.indexOf(h.replace(/\/$/,""))==0;}
var M=[["Top 5","/lineup/"],["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["Watchline","/watchline/"]];
var css=".lbn{display:none}@media(max-width:700px){body{padding-bottom:calc(66px + env(safe-area-inset-bottom))!important}.lbn{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:9999;background:rgba(6,6,11,.96);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.08);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}.lbn a,.lbn button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:48px;font-size:19px;text-decoration:none;color:#9a9ab5;background:none;border:0;cursor:pointer;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lbn span{font-size:11px;font-weight:600}.lbn .on{color:#22f0ff}.lbm{position:fixed;left:0;right:0;top:0;bottom:calc(62px + env(safe-area-inset-bottom));z-index:9998;background:rgba(6,6,11,.97);display:none;flex-direction:column;padding:10px 16px;overflow:auto}.lbm.op{display:flex}.lbm a{color:#fff;text-decoration:none;font:600 18px system-ui,sans-serif;padding:15px 8px;border-bottom:1px solid rgba(255,255,255,.08)}.lbm a.on{color:#ff9100}}";
function init(){
if(document.querySelector("nav.lbn"))return;
var s=document.createElement("style");s.id="lbn-css";s.textContent=css;document.head.appendChild(s);
var bn=document.createElement("nav");bn.className="lbn";bn.setAttribute("aria-label","Bottom navigation");
bn.innerHTML=[["\uD83C\uDFC6","Top 5","/lineup/"],["\uD83C\uDFE0","Home","/"],["\uD83D\uDCBB","Software","/software.html"],["\uD83C\uDFAE","Games","/games.html"],["\uD83D\uDCDD","Blog","/blog.html"],["\u231A","Watchline","/watchline/"]].map(function(x){return '<a href="'+x[2]+'"'+(on(x[2])?' class="on" aria-current="page"':'')+'>'+x[0]+'<span>'+x[1]+'</span></a>';}).join("")+'<button type="button" aria-label="More" aria-expanded="false">\u2630<span>More</span></button>';
document.body.appendChild(bn);
var mo=bn.querySelector("button");
mo.onclick=function(){var d=document.querySelector(".lnd");
 if(!d){d=document.createElement("div");d.className="lbm lnd-fallback";d.innerHTML=M.map(function(x){return '<a href="'+x[1]+'"'+(on(x[1])?' class="on"':'')+'>'+x[0]+'</a>';}).join("");document.body.appendChild(d);}
 var o=d.classList.toggle("op");mo.firstChild.nodeValue=o?"\u2715":"\u2630";mo.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";};
}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();

;(function(){if(location.pathname.indexOf("/journal/")===0&&!document.getElementById("ll-pt")){var s=document.createElement("script");s.id="ll-pt";s.src="/js/post-tools.js?v=1";s.defer=true;document.head.appendChild(s)}})();
