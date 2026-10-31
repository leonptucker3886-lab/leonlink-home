/* LeonLink shared bottom navigation — one source for every page (new theme: Top 5 first, text links, scrolls) */
(function(){
if(window.__llBottomNav)return;window.__llBottomNav=1;
var p=location.pathname;
function on(h){return h=="/"?(p=="/"||p=="/index.html"):p.indexOf(h.replace(/\/$/,""))==0;}
var M=[["Top 5","/lineup/"],["Casino","https://afterglow.leonlink.net/"],["How-To","/how-to/"],["Watches","/watchline/"],["Software","/software.html"],["Arcade","/arcadeline/"],["Games","/games.html"],["Ebooks","/ebooks.html"],["Blogs","/blog.html"],["Series","/series.html"],["Moons","/moons.html"],["SNES","/games/snes/"]];
var css="body{padding-bottom:calc(56px + env(safe-area-inset-bottom))!important}.lbn{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:9999;background:rgba(7,10,18,.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,.08);padding:14px 20px calc(14px + env(safe-area-inset-bottom));gap:22px;overflow-x:auto;white-space:nowrap}.lbn a{flex:none;font:600 14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-decoration:none;color:rgba(255,255,255,.75)}.lbn a.on{color:#22e6c8}";
function init(){
if(document.querySelector("nav.lbn"))return;
var s=document.createElement("style");s.id="lbn-css";s.textContent=css;document.head.appendChild(s);
var bn=document.createElement("nav");bn.className="lbn";bn.setAttribute("aria-label","Bottom navigation");
bn.innerHTML=M.map(function(x){return '<a href="'+x[1]+'"'+(on(x[1])?' class="on" aria-current="page"':'')+'>'+x[0]+'</a>';}).join("");
document.body.appendChild(bn);
}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();

;(function(){if(location.pathname.indexOf("/journal/")===0&&!document.getElementById("ll-pt")){var s=document.createElement("script");s.id="ll-pt";s.src="/js/post-tools.js?v=1";s.defer=true;document.head.appendChild(s)}})();
