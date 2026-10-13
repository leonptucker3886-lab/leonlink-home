(function(){
var L=[["Home","/"],["Software","/software.html"],["Games","/games.html"],["Blog","/blog.html"],["Clock's Corner","/lineup/clocks-corner/"],["Starting Lineup","/lineup/"],["\uD83D\uDD25 Hire me","/hire-me.html"]];
var p=location.pathname;
function on(h){return h=="/"?(p=="/"||p=="/index.html"):p.indexOf(h.replace(/\/$/,""))==0;}
var css=".lnx{position:sticky;top:0;z-index:9999;display:flex;align-items:center;gap:10px;height:52px;padding:0 14px;background:rgba(6,6,11,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);font:600 15px system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.lnx a{color:#e8e8f0;text-decoration:none}.lnx .lg{font-weight:800;font-size:17px;margin-right:auto;color:#fff}.lnx .lk{display:flex;gap:4px}.lnx .lk a{padding:7px 10px;border-radius:8px;opacity:.85}.lnx .lk a:hover,.lnx .lk a.on{background:rgba(255,255,255,.08);opacity:1}.lnx .hm{padding:8px 14px;border-radius:999px;color:#fff;font-weight:800;background:linear-gradient(90deg,#ff3d00,#ff9100)}.lnx .mb{display:none;width:44px;height:44px;border:0;background:none;color:#fff;font-size:24px;cursor:pointer}.lnd{position:fixed;inset:52px 0 0 0;z-index:9998;background:rgba(6,6,11,.97);display:none;flex-direction:column;padding:10px 16px;overflow:auto}.lnd.op{display:flex}.lnd a{color:#fff;text-decoration:none;font:600 18px system-ui,sans-serif;padding:15px 8px;border-bottom:1px solid rgba(255,255,255,.08)}.lnd a.on{color:#ff9100}.lnx .lk{display:none!important}.lnx .mb{display:block}";
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var h=document.createElement("div");h.className="lnx";h.setAttribute("role","navigation");h.setAttribute("aria-label","Main");
var lk=L.map(function(x){return '<a href="'+x[1]+'"'+(on(x[1])?' class="on" aria-current="page"':'')+'>'+x[0]+'</a>';}).join("");
h.innerHTML='<a class="lg" href="/">LeonLink</a><div class="lk">'+lk+'</div><button class="mb" aria-label="Menu" aria-expanded="false">\u2630</button>';
var d=document.createElement("div");d.className="lnd";d.innerHTML=lk;
document.body.insertBefore(d,document.body.firstChild);document.body.insertBefore(h,document.body.firstChild);
var b=h.querySelector(".mb");b.onclick=function(){var o=d.classList.toggle("op");b.textContent=o?"\u2715":"\u2630";b.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":"";};
})();
