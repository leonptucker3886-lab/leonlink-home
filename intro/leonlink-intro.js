/* LeonLink shared game intro - A Colonel Pip Production
   Usage: <script src="https://www.leonlink.net/intro/leonlink-intro.js" data-style="arcade|casino|normal" data-game="Game Name"></script>
   Style auto-detects by host (arcadeline=arcade, afterglow=casino) if data-style is omitted.
   Game name falls back to document.title. ~5s, tap to skip. */
(function(){
  var s=document.currentScript||{};var ds=(s.dataset||{});
  var h=location.hostname;var q=new URLSearchParams(location.search);
  var style=q.get('introStyle')||ds.style||(/arcadeline/.test(h)?'arcade':/afterglow/.test(h)?'casino':'normal');
  var game=q.get('introGame')||ds.game||(document.title||'LeonLink').split(/[|\u2014\u2013-]/)[0].trim();
  var C={
   arcade:{bg:'#05010f',fg:'#39ff14',ac:'#ff2bd6',font:'"Press Start 2P","Courier New",monospace'},
   casino:{bg:'radial-gradient(circle,#0b5d2a,#02210f)',fg:'#ffd54a',ac:'#e53935',font:'Georgia,"Times New Roman",serif'},
   normal:{bg:'radial-gradient(circle,#13203a,#05070d)',fg:'#ffffff',ac:'#4fc3ff',font:'system-ui,-apple-system,Segoe UI,Roboto,sans-serif'}
  }[style]||null; if(!C)return;
  var css='#llI{position:fixed;inset:0;z-index:2147483647;background:'+C.bg+';color:'+C.fg+';font-family:'+C.font+';display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;text-align:center;cursor:pointer;transition:opacity .5s}'+
  '#llI .t{opacity:0;letter-spacing:.2em;text-transform:uppercase;font-size:clamp(12px,3.6vw,20px);margin:6px 0}'+
  '#llI .p1{animation:llF 1.6s .1s forwards}#llI .p2{animation:llF 1.6s 1s forwards;color:'+C.ac+'}'+
  '#llI .lg{width:min(38vw,170px);height:min(38vw,170px);margin:18px 0;opacity:0;animation:llS 2.4s 1.6s forwards;perspective:600px}'+
  '#llI .lg>div{width:100%;height:100%;animation:llR 1.2s 1.6s 2 linear}'+
  '#llI .gn{opacity:0;font-weight:900;font-size:clamp(26px,9vw,64px);animation:llG .8s 3.3s forwards;text-shadow:0 0 18px '+C.ac+'}'+
  '#llI .sk{position:absolute;bottom:14px;font-size:11px;opacity:.5;letter-spacing:.1em}'+
  '@keyframes llF{to{opacity:1}}@keyframes llS{to{opacity:1}}@keyframes llR{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}'+
  '@keyframes llG{0%{opacity:0;transform:scale(1.6)}100%{opacity:1;transform:scale(1)}}'+
  '@keyframes llP{0%,100%{opacity:1}50%{opacity:.2}}'+
  '#llI .card{position:absolute;width:52px;height:74px;border-radius:6px;background:#fff;color:#111;font:bold 22px Georgia;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px #0008;animation:llC 4.5s linear forwards}'+
  '@keyframes llC{from{transform:translateY(-120px) rotate(0)}to{transform:translateY(115vh) rotate(540deg)}}'+
  '#llI .px{position:absolute;inset:0;background:repeating-linear-gradient(0deg,#0000 0 3px,#0006 3px 4px);pointer-events:none}'+
  '@media (prefers-reduced-motion:reduce){#llI *{animation-duration:.01s!important;animation-delay:0s!important;opacity:1!important}}';
  var logo;
  if(style==='arcade'){ // blocky pixel L
    var m=['11000','11000','11000','11000','11111','11111'],r='';
    m.forEach(function(row,y){row.split('').forEach(function(c,x){if(c==='1')r+='<rect x="'+(x*20+50)+'" y="'+(y*20+40)+'" width="18" height="18" fill="'+C.fg+'"/>';});});
    logo='<svg viewBox="0 0 200 200" width="100%" height="100%"><rect x="10" y="10" width="180" height="180" fill="none" stroke="'+C.ac+'" stroke-width="12" stroke-dasharray="18 6"/>'+r+'</svg>';
  }else if(style==='casino'){ // poker chip
    logo='<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="92" fill="'+C.ac+'"/><circle cx="100" cy="100" r="92" fill="none" stroke="#fff" stroke-width="16" stroke-dasharray="30 18"/><circle cx="100" cy="100" r="62" fill="#111" stroke="'+C.fg+'" stroke-width="5"/><text x="100" y="122" text-anchor="middle" font-family="Georgia" font-weight="bold" font-size="64" fill="'+C.fg+'">LL</text></svg>';
  }else{
    logo='<svg viewBox="0 0 200 200" width="100%" height="100%"><defs><linearGradient id="llg" x1="0" x2="1"><stop offset="0" stop-color="'+C.ac+'"/><stop offset="1" stop-color="#a66bff"/></linearGradient></defs><circle cx="100" cy="100" r="88" fill="none" stroke="url(#llg)" stroke-width="10"/><path d="M70 50v100h60" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  var extra='';
  if(style==='casino'){var su=['\u2660','\u2665','\u2666','\u2663','A'];for(var i=0;i<12;i++){var c=su[i%5],red=(c==='\u2665'||c==='\u2666');extra+='<div class="card" style="left:'+(Math.random()*92)+'%;animation-delay:'+(Math.random()*1.8).toFixed(2)+'s;color:'+(red?'#c62828':'#111')+'">'+c+'</div>';}}
  if(style==='arcade')extra='<div class="px"></div>';
  function run(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var d=document.createElement('div');d.id='llI';d.setAttribute('role','presentation');
    d.innerHTML=extra+'<div class="t p1">LeonLink presents</div><div class="t p2">A Colonel Pip Production</div><div class="lg"><div>'+logo+'</div></div><div class="gn"></div><div class="sk">TAP TO SKIP</div>';
    d.querySelector('.gn').textContent=game;
    if(style==='arcade')d.querySelector('.sk').style.animation='llP 1s infinite';
    document.body.appendChild(d);
    var done=false;function end(){if(done)return;done=true;d.style.opacity='0';setTimeout(function(){d.remove();st.remove();},520);}
    d.addEventListener('click',end);setTimeout(end,5000);
  }
  if(document.body)run();else document.addEventListener('DOMContentLoaded',run);
})();
