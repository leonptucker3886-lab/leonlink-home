/* LeonLink shared game intro - A General Pip Production
   Usage: <script src="https://www.leonlink.net/intro/leonlink-intro.js" data-style="arcade|casino|normal" data-game="Game Name"></script>
   Style auto-detects by host (arcadeline=arcade, afterglow=casino) if data-style is omitted.
   Game name falls back to document.title. ~5s, tap to skip. */
(function(){
  var s=document.currentScript||{};var ds=(s.dataset||{});
  var h=location.hostname;var q=new URLSearchParams(location.search);
  var style=q.get('introStyle')||ds.style||(/arcadeline/.test(h)?'arcade':/afterglow/.test(h)?'casino':'normal');
  var combo=(style==='combo'||style==='all');if(combo)style='normal';
  var game=q.get('introGame')||ds.game||(document.title||'LeonLink').split(/[|\u2014\u2013-]/)[0].trim();
  var C={
   arcade:{bg:'#05010f',fg:'#39ff14',ac:'#ff2bd6',font:'"Press Start 2P","Courier New",monospace'},
   casino:{bg:'radial-gradient(circle,#0b5d2a,#02210f)',fg:'#ffd54a',ac:'#e53935',font:'Georgia,"Times New Roman",serif'},
   normal:{bg:'radial-gradient(circle,#13203a,#05070d)',fg:'#ffffff',ac:'#4fc3ff',font:'system-ui,-apple-system,Segoe UI,Roboto,sans-serif'}
  }[style]||null; if(!C)return;
  if(combo)C={bg:'radial-gradient(circle,#0a0716,#000)',fg:'#ffffff',ac:'#ff2bd6',font:'"Press Start 2P","Courier New",monospace'};
  if(combo||style==='arcade'){try{if(!document.getElementById('llPF')){var lf=document.createElement('link');lf.id='llPF';lf.rel='stylesheet';lf.href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';document.head.appendChild(lf);}}catch(e){}}
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
  '#llI .rf{position:absolute;left:calc(50% - 32px);top:calc(50% - 60px);width:64px;height:92px;border-radius:8px;background:#fff;color:#111;border:2px solid #d4af37;box-shadow:0 0 18px #ffd54a88,0 6px 14px #000a;z-index:3;opacity:0;transform-origin:50% 160%;display:flex;flex-direction:column;align-items:center;justify-content:center;font:bold 24px Georgia;animation:llRf .7s cubic-bezier(.3,1.5,.6,1) forwards,llRg 1.2s ease-in-out infinite alternate}#llI .rf i{font-style:normal;font-size:26px}'+
  '@keyframes llRf{from{opacity:0;transform:translateY(60vh) rotate(0) scale(.5)}to{opacity:1;transform:rotate(var(--a)) translateY(-70px)}}'+
  '@keyframes llRg{to{box-shadow:0 0 34px #ffd54a,0 6px 14px #000a}}'+
  '#llI .card{position:absolute;width:52px;height:74px;border-radius:6px;background:#fff;color:#111;font:bold 22px Georgia;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px #0008;animation:llC 4.5s linear forwards}'+
  '@keyframes llC{from{transform:translateY(-120px) rotate(0)}to{transform:translateY(115vh) rotate(540deg)}}'+
  '#llI .px{position:absolute;inset:0;background:repeating-linear-gradient(0deg,#0000 0 3px,#0006 3px 4px);pointer-events:none}'+
  '@media (prefers-reduced-motion:reduce){#llI *{animation-duration:.01s!important;animation-delay:0s!important;opacity:1!important}}'+
  '#llI .t,#llI .lg,#llI .gn{position:relative;z-index:5}#llI .p2{text-shadow:0 0 10px currentColor}'+
  '#llI .spot{position:absolute;inset:-50%;background:conic-gradient(#fff0 0 40deg,#fff3 50deg,#fff0 60deg 180deg,#fff2 190deg,#fff0 200deg);animation:llSp 6s linear infinite;pointer-events:none}'+
  '@keyframes llSp{to{transform:rotate(360deg)}}'+
'#llI .dogs{position:absolute;right:2%;bottom:44px;width:min(46vw,260px);z-index:4;opacity:0;filter:drop-shadow(0 6px 14px #000c);animation:llDg .9s .6s forwards}#llI .dogs .hd{animation:llDb 1s ease-in-out infinite alternate;transform-origin:center}@keyframes llDg{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}@keyframes llDb{to{transform:translateY(-2px) rotate(-3deg)}}'+
  '#llI .jk{position:absolute;bottom:8%;width:min(22vw,110px);z-index:4;filter:drop-shadow(0 8px 16px #000a);opacity:0}'+
  '#llI .jk.l{left:4%;animation:llJl 1s .3s forwards,llDa 1.1s 1.3s ease-in-out infinite}'+
  '#llI .jk.r{right:4%;animation:llJr 1s .5s forwards,llDa 1.1s 1.5s ease-in-out infinite}'+
  '#llI .jk.c{top:5%;bottom:auto;left:calc(50% - min(8vw,40px));width:min(16vw,80px);animation:llJc 1.2s 2.8s forwards}'+
  '@keyframes llJl{from{opacity:0;transform:translateX(-140%) rotate(-40deg)}to{opacity:1;transform:rotate(-12deg)}}'+
  '@keyframes llJr{from{opacity:0;transform:translateX(140%) rotate(40deg)}to{opacity:1;transform:rotate(12deg)}}'+
  '@keyframes llJc{from{opacity:0;transform:rotateY(90deg) scale(.4)}to{opacity:1;transform:none}}'+
  '@keyframes llDa{50%{translate:0 -14px}}'+
  '#llI .sp{position:absolute;width:6px;height:6px;border-radius:50%;background:#ffe27a;box-shadow:0 0 10px #ffd54a;animation:llTw 1.4s ease-in-out infinite;opacity:0}'+
  '@keyframes llTw{50%{opacity:1;transform:scale(1.8)}}'+
  '#llI .gr{position:absolute;left:0;right:0;bottom:0;height:48px;z-index:3;background:repeating-linear-gradient(90deg,#c84c0c 0 30px,#7a2a04 30px 32px);border-top:6px solid #39ff14;box-shadow:0 -4px 20px #39ff1466}'+
  '#llI .qb{position:absolute;bottom:160px;left:58%;width:40px;height:40px;z-index:3;background:#ffb300;border:3px solid #7a4a00;color:#7a4a00;font:bold 26px monospace;display:flex;align-items:center;justify-content:center;animation:llQ .25s 2.2s 1}'+
  '@keyframes llQ{50%{transform:translateY(-12px)}}'+
  '#llI .hero{position:absolute;bottom:48px;left:-70px;width:56px;z-index:4;animation:llRun 4s .4s linear forwards}'+
  '#llI .hero>svg{animation:llHop .8s 1.75s 1 ease-out}'+
'#llI .hero.st{animation:llRunS 2.2s .4s ease-out forwards}@keyframes llRunS{to{left:calc(30% - 28px)}}'+
  '#llI .dc{position:absolute;left:0;top:0;width:44px;height:64px;border-radius:6px;background:#fff;color:#111;border:2px solid #d4af37;box-shadow:0 0 14px #ffd54a88,0 4px 10px #000a;z-index:5;opacity:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:bold 17px Georgia}#llI .dc i{font-style:normal;font-size:18px}'+
  '@keyframes llRun{to{left:110%}}@keyframes llHop{45%{transform:translateY(-100px)}}'+
  '#llI .coin{position:absolute;bottom:205px;left:calc(58% + 8px);width:24px;height:24px;border-radius:50%;background:radial-gradient(#fff6a0,#ffb300);border:3px solid #a86c00;z-index:3;opacity:0;animation:llCo .9s 2.2s forwards}'+
  '@keyframes llCo{0%{opacity:1}50%{transform:translateY(-70px) scaleX(.2)}100%{opacity:0;transform:translateY(-110px)}}'+
  '#llI .gun{position:absolute;left:2%;bottom:6%;width:min(36vw,190px);z-index:4;opacity:0;animation:llGI .6s .2s forwards}'+
  '@keyframes llGI{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:none}}'+
  '#llI .gun .rc{animation:llRe .2s 1s 6}@keyframes llRe{50%{transform:translateX(-5px)}}'+
  '#llI .gun .fl{opacity:0;animation:llFl .2s 1s 6}@keyframes llFl{0%,50%{opacity:1}100%{opacity:0}}'+
  '#llI .bo{position:absolute;height:4px;width:60px;border-radius:4px;background:linear-gradient(90deg,#4fc3ff00,#fff,#ffe27a);box-shadow:0 0 12px #4fc3ff;z-index:4;opacity:0}'+
  '#llI .fg{position:absolute;bottom:6%;width:min(9vw,46px);z-index:4;opacity:0;animation:llFgI .4s forwards,llFgB .25s ease-in-out infinite alternate,llFgR 1.6s 1.25s ease-in forwards}#llI .fg svg{display:block}'+
  '@keyframes llFgI{from{opacity:0;transform:translateY(30px)}to{opacity:1}}@keyframes llFgB{to{translate:0 -6px}}@keyframes llFgR{0%{transform:none}12%{transform:translateY(-34px) scaleX(-1)}100%{transform:translateX(60vw) scaleX(-1)}}'+
  '#llI .fg .ex{position:absolute;left:30%;top:-26px;font:bold 22px "Press Start 2P",monospace;color:#ffe27a;opacity:0;animation:llS .1s 1.15s forwards}'+
  '#llI .bm{position:absolute;left:50%;top:50%;width:20px;height:20px;margin:-10px;border-radius:50%;z-index:4;opacity:0;background:radial-gradient(#fff,#ffe27a 40%,#4fc3ff00 70%);animation:llBm .7s 1.6s forwards}'+
  '@keyframes llBm{0%{opacity:1}100%{opacity:0;transform:scale(24)}}'+
  '#llI .pip{position:relative;display:inline-block;vertical-align:middle;margin-left:10px;width:min(13vw,62px);z-index:6;opacity:0;filter:drop-shadow(0 6px 14px #000a);animation:llPi .7s 1.5s cubic-bezier(.3,1.6,.6,1) forwards}'+
  '@keyframes llPi{from{opacity:0;transform:scale(0) rotate(-30deg)}to{opacity:1;transform:rotate(8deg)}}'+
  '#llI .pip .wk{animation:llWk .6s 2.3s,llWk .6s 4.6s}#llI .pip .wl{animation:llWl .6s 2.3s,llWl .6s 4.6s}'+
  '@keyframes llWk{20%,80%{opacity:0}}@keyframes llWl{20%,80%{opacity:1}}';
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
  if(false){var rf=['10','J','Q','K','A'];for(var i=0;i<5;i++){extra+='<div class="rf" style="--a:'+((i-2)*22)+'deg;animation-delay:'+(1.7+i*.18).toFixed(2)+'s,3.2s"><b>'+rf[i]+'</b><i>\\u2660</i></div>';}}
if(style==='casino'){var su=['\u2660','\u2665','\u2666','\u2663','A'];for(var i=0;i<12;i++){var c=su[i%5],red=(c==='\u2665'||c==='\u2666');extra+='<div class="card" style="left:'+(Math.random()*92)+'%;animation-delay:'+(Math.random()*1.8).toFixed(2)+'s;color:'+(red?'#c62828':'#111')+'">'+c+'</div>';}}
  if(style==='arcade')extra='<div class="px"></div>';

  var DOGS='<svg viewBox="0 0 200 110" width="100%"><ellipse cx="100" cy="92" rx="96" ry="16" fill="#5a3410"/><ellipse cx="100" cy="88" rx="90" ry="13" fill="#0b6b2e"/><g transform="translate(40 0)"><path d="M-14 16 Q-20 30 -10 34 L-6 18Z" fill="#5c3313"/><path d="M14 16 Q20 30 10 34 L6 18Z" fill="#5c3313"/><ellipse cx="0" cy="26" rx="14" ry="15" fill="#a0612b"/><ellipse cx="0" cy="34" rx="8" ry="6" fill="#f3e2c7"/><circle cx="-5" cy="23" r="2.2" fill="#111"/><circle cx="5" cy="23" r="2.2" fill="#111"/><ellipse cx="0" cy="30" rx="3" ry="2.2" fill="#111"/><rect x="-14" y="40" width="28" height="22" rx="6" fill="#a0612b"/><path d="M-15 12 Q0 4 15 12 L18 16 H-18Z" fill="#2e7d32"/><g class="hd"><rect x="-16" y="44" width="11" height="15" rx="1.5" fill="#fff" stroke="#111" transform="rotate(-15 -10 52)"/><rect x="-10" y="43" width="11" height="15" rx="1.5" fill="#fff" stroke="#111"/><text x="-4.5" y="53" font-size="7" text-anchor="middle" fill="#c62828" font-family="Georgia">&#9829;</text></g></g><g transform="translate(100 0)"><path d="M-14 16 Q-20 30 -10 34 L-6 18Z" fill="#8a5a2b"/><path d="M14 16 Q20 30 10 34 L6 18Z" fill="#8a5a2b"/><ellipse cx="0" cy="26" rx="14" ry="15" fill="#d9b48a"/><ellipse cx="0" cy="34" rx="8" ry="6" fill="#f3e2c7"/><circle cx="-5" cy="23" r="2.2" fill="#111"/><circle cx="5" cy="23" r="2.2" fill="#111"/><ellipse cx="0" cy="30" rx="3" ry="2.2" fill="#111"/><rect x="-14" y="40" width="28" height="22" rx="6" fill="#d9b48a"/><path d="M-6 6 Q-2 -2 0 8 Q2 -2 6 6" fill="none" stroke="#111" stroke-width="1.5"/><path d="M8 32 l14 4" stroke="#6d4c41" stroke-width="3"/><circle cx="23" cy="36" r="1.8" fill="#ff7043"/><g class="hd"><rect x="-16" y="44" width="11" height="15" rx="1.5" fill="#fff" stroke="#111" transform="rotate(-15 -10 52)"/><rect x="-10" y="43" width="11" height="15" rx="1.5" fill="#fff" stroke="#111"/><text x="-4.5" y="53" font-size="7" text-anchor="middle" fill="#c62828" font-family="Georgia">&#9829;</text></g></g><g transform="translate(160 0)"><path d="M-14 16 Q-20 30 -10 34 L-6 18Z" fill="#111"/><path d="M14 16 Q20 30 10 34 L6 18Z" fill="#111"/><ellipse cx="0" cy="26" rx="14" ry="15" fill="#2b2b2b"/><ellipse cx="0" cy="34" rx="8" ry="6" fill="#f3e2c7"/><circle cx="-5" cy="23" r="2.2" fill="#111"/><circle cx="5" cy="23" r="2.2" fill="#111"/><ellipse cx="0" cy="30" rx="3" ry="2.2" fill="#111"/><rect x="-14" y="40" width="28" height="22" rx="6" fill="#2b2b2b"/><ellipse cx="4" cy="22" rx="6" ry="5" fill="#fff"/><circle cx="5" cy="23" r="2.2" fill="#111"/><g class="hd"><rect x="-16" y="44" width="11" height="15" rx="1.5" fill="#fff" stroke="#111" transform="rotate(-15 -10 52)"/><rect x="-10" y="43" width="11" height="15" rx="1.5" fill="#fff" stroke="#111"/><text x="-4.5" y="53" font-size="7" text-anchor="middle" fill="#c62828" font-family="Georgia">&#9829;</text></g></g><g><circle cx="78" cy="86" r="4" fill="#e53935" stroke="#fff"/><circle cx="84" cy="84" r="4" fill="#1e88e5" stroke="#fff"/><circle cx="120" cy="86" r="4" fill="#fdd835" stroke="#fff"/><circle cx="126" cy="84" r="4" fill="#e53935" stroke="#fff"/><circle cx="100" cy="85" r="4" fill="#43a047" stroke="#fff"/></g></svg>';
  function R(a,b){return (a+Math.random()*(b-a)).toFixed(1);}
  var JOKER='<svg viewBox="0 0 100 140"><rect x="3" y="3" width="94" height="134" rx="9" fill="#fffdf4" stroke="#ffd54a" stroke-width="4"/><text x="9" y="22" font-family="Georgia" font-weight="bold" font-size="12" fill="#c62828">JOKER</text><path d="M25 62L18 34L38 50L50 26L62 50L82 34L75 62Z" fill="#7b1fa2" stroke="#111" stroke-width="2"/><path d="M50 26L62 50L75 62H50Z" fill="#c62828"/><circle cx="18" cy="34" r="5" fill="#ffd54a"/><circle cx="50" cy="26" r="5" fill="#ffd54a"/><circle cx="82" cy="34" r="5" fill="#ffd54a"/><ellipse cx="50" cy="82" rx="23" ry="22" fill="#fff" stroke="#111" stroke-width="2"/><path d="M38 77l6-5 6 5M50 77l6-5 6 5" stroke="#111" stroke-width="2.5" fill="none"/><circle cx="50" cy="86" r="4" fill="#c62828"/><path d="M36 92Q50 106 64 92" stroke="#c62828" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M28 104l8 10 7-8 7 9 7-9 7 8 8-10" fill="#ffd54a" stroke="#111" stroke-width="2"/></svg>';
  function pix(m,p,w){var o='';m.forEach(function(row,y){row.split('').forEach(function(c,x){if(p[c])o+='<rect x="'+x+'" y="'+y+'" width="1.05" height="1.05" fill="'+p[c]+'"/>';});});return '<svg viewBox="0 0 '+w+' '+m.length+'" width="100%" shape-rendering="crispEdges">'+o+'</svg>';}
  var HERO=pix(['....gggg....','..gggggggg..','.ggggyygggg.','gggggggggggg','..wwwwwwww..','..wkwwwwkw..','..wwwwwwww..','..wwkkkkww..','...wwwwww...','.oooooooooo.','woooyoooooow','wooooooooo.w','.oooooooooo.','..ooo..ooo..','..ooo..ooo..','.ddd....ddd.'],{g:'#3d7a2a',y:'#ffd54a',w:'#fffef6',k:'#18181b',o:'#6b8e23',d:'#3a2a1a'},12);
  var FA=pix(['..pppppp..','.pppppppp.','ppwwppwwpp','ppkwppkwpp','pppppppppp','pppppppppp','pp.pp.pp.p','p...p...pp'],{p:'#ff2bd6',w:'#fff',k:'#18181b'},10);
  var FB=pix(['...cccc...','..cccccc..','.ccwccwcc.','.cckcckcc.','cccccccccc','c.cccccc.c','c.c....c.c','...cc.cc..'],{c:'#4fc3ff',w:'#fff',k:'#18181b'},10);
  var FC=pix(['..yyyyyy..','.yyyyyyyy.','yywwyywwyy','yykwyykwyy','yyyyyyyyyy','yyykkkkyyy','.yyyyyyyy.','.yy....yy.'],{y:'#ffd54a',w:'#fff',k:'#18181b'},10);
  var GUNNER='<svg viewBox="0 0 200 160"><g class="rc"><ellipse cx="60" cy="153" rx="46" ry="6" fill="#0006"/><rect x="40" y="96" width="16" height="52" rx="5" fill="#3d5229"/><rect x="62" y="96" width="16" height="52" rx="5" fill="#34481f"/><rect x="34" y="143" width="26" height="10" rx="4" fill="#111"/><rect x="58" y="143" width="26" height="10" rx="4" fill="#111"/><rect x="34" y="56" width="50" height="48" rx="10" fill="#4b6b2f"/><rect x="34" y="74" width="50" height="7" fill="#2f421c"/><circle cx="59" cy="40" r="17" fill="#f1c27d"/><path d="M39 40Q59 10 80 40Z" fill="#3d5229" stroke="#2a3a18" stroke-width="2"/><rect x="60" y="38" width="16" height="5" rx="2" fill="#111"/><path d="M54 50Q61 55 68 50" stroke="#7a3b10" stroke-width="2" fill="none"/><rect x="60" y="62" width="100" height="12" rx="3" fill="#2b2f36"/><rect x="150" y="60" width="18" height="16" rx="2" fill="#4fc3ff"/><rect x="80" y="72" width="12" height="20" rx="3" fill="#1a1d22"/><rect x="66" y="54" width="40" height="8" rx="3" fill="#444b55"/><circle cx="72" cy="80" r="8" fill="#f1c27d"/></g><g class="fl"><polygon points="168,68 196,56 186,68 198,80" fill="#ffe27a"/><circle cx="172" cy="68" r="8" fill="#fff"/></g></svg>';
  if(style==='casino'||combo){extra+='<div class="spot"></div>'+'<div class="jk l">'+JOKER+'</div>'+(combo?'<div class="dogs">'+DOGS+'</div>':'<div class="jk r">'+JOKER+'</div>')+'<div class="jk c">'+JOKER+'</div>';for(var k=0;k<24;k++)extra+='<div class="sp" style="left:'+R(0,100)+'%;top:'+R(0,100)+'%;animation-delay:'+R(0,1.5)+'s"></div>';}
  if(style==='arcade'||combo){for(var k=0;k<(combo?0:40);k++)extra='<div class="sp" style="background:#fff;box-shadow:0 0 6px #ff2bd6;width:3px;height:3px;left:'+R(0,100)+'%;top:'+R(0,70)+'%;animation-delay:'+R(0,2)+'s"></div>'+extra;extra+='<div class="gr"></div><div class="qb">&#9733;</div><div class="coin"></div><div class="hero'+(combo?' st':'')+'">'+HERO+'</div>';}
  if(style==='normal'){for(var k=0;k<40;k++)extra+='<div class="sp" style="background:#fff;box-shadow:0 0 6px #4fc3ff;width:3px;height:3px;left:'+R(0,100)+'%;top:'+R(0,100)+'%;animation-delay:'+R(0,2)+'s"></div>';if(!combo){extra+='<div class="gun">'+GUNNER+'</div>';[[FA,62,0],[FB,74,.12],[FC,86,.24]].forEach(function(f){extra+='<div class="fg" style="left:'+f[1]+'%;animation-delay:'+f[2]+'s,'+f[2]+'s,'+(1.25+f[2])+'s">'+f[0]+'<span class="ex">!</span></div>';});}}
  function deal(d){if(!combo||!d.animate)return;var rf=['10','J','Q','K','A'],W=innerWidth,H=innerHeight,sx=W/2-22,sy=H*.14,hx=W*.3-22,hy=H-48-56-80;for(var i=0;i<5;i++){var c=document.createElement('div');c.className='dc';c.innerHTML='<b>'+rf[i]+'</b><i>\u2660</i>';d.appendChild(c);var ex=hx+(i-2)*16,ey=hy+Math.abs(i-2)*5,r=(i-2)*14;c.animate([{opacity:0,transform:'translate('+sx+'px,'+sy+'px) rotate(0deg) scale(.6)'},{opacity:1,offset:.1,transform:'translate('+sx+'px,'+sy+'px) rotate(0deg) scale(.8)'},{opacity:1,transform:'translate('+ex+'px,'+ey+'px) rotate('+(720+r)+'deg) scale(1)'}],{duration:650,delay:3100+i*260,fill:'forwards',easing:'cubic-bezier(.2,.7,.3,1)'});}}
  function fire(d){if(style!=='normal'||combo||!d.animate||!d.querySelector('.gun'))return;var g=d.querySelector('.gun').getBoundingClientRect();var sx=g.left+g.width*.9,sy=g.top+g.height*.42,tx=innerWidth*.74+(Math.random()*40-20),ty=innerHeight*.94-30;var ang=Math.atan2(ty-sy,tx-sx)*180/Math.PI;for(var i=0;i<6;i++){var b=document.createElement('div');b.className='bo';d.appendChild(b);b.animate([{opacity:1,transform:'translate('+sx+'px,'+sy+'px) rotate('+ang+'deg)'},{opacity:1,transform:'translate('+(tx-30)+'px,'+ty+'px) rotate('+ang+'deg)'},{opacity:0,transform:'translate('+(tx-30)+'px,'+ty+'px) rotate('+ang+'deg) scaleX(.2)'}],{duration:420,delay:1000+i*200,fill:'forwards',easing:'ease-in'});}}

  var PIP='<svg viewBox="0 0 120 130"><rect x="20" y="34" width="80" height="90" rx="10" fill="#fffef6" stroke="#18181b" stroke-width="4"/><path d="M80 34v20h20" fill="#e8e4d4" stroke="#18181b" stroke-width="3"/><path d="M14 40Q60 4 106 40L108 46H12Z" fill="#3d5229" stroke="#18181b" stroke-width="3"/><rect x="10" y="42" width="100" height="9" rx="4" fill="#2a3a18"/><g fill="#ffd54a" stroke="#8a6d00" stroke-width="1">'+[30,48,66,84].map(function(x){return '<path transform="translate('+x+',24) scale(.55)" d="M10 0l3 7 7 .5-5.5 4.5 2 7-6.5-4-6.5 4 2-7L0 7.5 7 7z"/>';}).join('')+'</g><circle cx="44" cy="76" r="8" fill="#18181b"/><circle cx="46" cy="73" r="2.5" fill="#fff"/><g class="wk"><circle cx="78" cy="76" r="8" fill="#18181b"/><circle cx="80" cy="73" r="2.5" fill="#fff"/></g><path class="wl" d="M70 77Q78 70 86 77" stroke="#18181b" stroke-width="4" fill="none" stroke-linecap="round" opacity="0"/><circle cx="34" cy="92" r="6" fill="#ff9aa2" opacity=".7"/><circle cx="88" cy="92" r="6" fill="#ff9aa2" opacity=".7"/><path d="M46 96Q60 110 76 96" stroke="#18181b" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
  var PIPH='<span class="pip">'+PIP+'</span>';
  function run(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var d=document.createElement('div');d.id='llI';d.setAttribute('role','presentation');
    d.innerHTML=extra+'<div class="t p1">LeonLink presents</div><div class="t p2">A General Pip Production</div><div class="lg"><div>'+logo+'</div></div><div class="gn"></div><div class="sk">TAP TO SKIP</div>';
    d.querySelector('.gn').textContent=game;
    if(style==='arcade')d.querySelector('.sk').style.animation='llP 1s infinite';
    document.body.appendChild(d);fire(d);deal(d);if(d.getAnimations)setTimeout(function(){d.getAnimations({subtree:true}).forEach(function(x){x.playbackRate=.75;});},0);
    var done=false;function end(){if(done)return;done=true;d.style.opacity='0';setTimeout(function(){d.remove();st.remove();},520);}
    d.addEventListener('click',end);setTimeout(end,7000);
  }
  if(document.body)run();else document.addEventListener('DOMContentLoaded',run);
})();
