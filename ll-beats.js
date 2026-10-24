/* Team 5 category beats (2, the look). Plugs into ll-intro.js via window.LL_BEATS[cat](el).
   Original art only: pure CSS/DOM shapes, brand values from leonlink-home :root. */
(function(){
  var B={bg:'#050810',c:'#22f0ff',o:'#ff6a2a',g:'#39ff88',t:'#eef3ff',m:'#9aa6c2'};
  function add(el,css,html){var s=document.createElement('style');s.textContent=css;el.appendChild(s);
    var d=document.createElement('div');d.className='llb';d.innerHTML=html;el.appendChild(d);return d;}
  var base='.llb{position:absolute;inset:0;pointer-events:none;overflow:hidden}';
  window.LL_BEATS=window.LL_BEATS||{};
  /* Arcade: neon grid floor + "INSERT COIN" blink */
  LL_BEATS.arcade=function(el){add(el,base+
    '.llb .grid{position:absolute;left:-50%;right:-50%;bottom:0;height:45%;background:repeating-linear-gradient(90deg,'+B.c+'55 0 2px,transparent 2px 60px),repeating-linear-gradient(0deg,'+B.c+'55 0 2px,transparent 2px 40px);transform:perspective(300px) rotateX(60deg);animation:llg 1s linear infinite}'+
    '@keyframes llg{to{background-position:0 40px}}'+
    '.llb .coin{position:absolute;bottom:12%;width:100%;text-align:center;color:'+B.g+';font:700 18px monospace;letter-spacing:.3em;animation:llk .5s steps(2) infinite}'+
    '@keyframes llk{50%{opacity:0}}',
    '<div class="grid"></div><div class="coin">INSERT COIN</div>');};
  /* Regular: soldier silhouette fires; critters scurry off */
  LL_BEATS.regular=function(el){add(el,base+
    '.llb .sol{position:absolute;left:8%;bottom:14%;width:26px;height:54px;background:'+B.m+';border-radius:8px 8px 3px 3px}'+
    '.llb .sol:after{content:"";position:absolute;left:20px;top:16px;width:30px;height:6px;background:'+B.t+'}'+
    '.llb .shot{position:absolute;left:calc(8% + 56px);bottom:calc(14% + 34px);width:14px;height:3px;background:'+B.o+';box-shadow:0 0 8px '+B.o+';animation:lls .5s linear infinite}'+
    '@keyframes lls{to{transform:translateX(70vw);opacity:0}}'+
    '.llb .cr{position:absolute;bottom:14%;width:16px;height:10px;border-radius:50% 50% 30% 30%;background:'+B.g+';animation:llc 1.2s ease-in forwards}'+
    '@keyframes llc{to{transform:translateX(60vw) scaleX(.6)}}',
    '<div class="sol"></div><div class="shot"></div><div class="cr" style="left:55%"></div><div class="cr" style="left:68%;animation-delay:.2s"></div><div class="cr" style="left:80%;animation-delay:.4s"></div>');};
  /* Casino (later batch): cards fan out */
  LL_BEATS.casino=function(el){var h='';for(var i=0;i<4;i++)h+='<div class="cd" style="--r:'+(i*14-21)+'deg;animation-delay:'+(i*.08)+'s">'+['A','K','Q','J'][i]+'</div>';
    add(el,base+'.llb .cd{position:absolute;left:50%;bottom:10%;width:46px;height:66px;margin-left:-23px;background:'+B.t+';color:'+B.o+';border:2px solid '+B.c+';border-radius:6px;font:700 22px system-ui;display:flex;align-items:center;justify-content:center;transform-origin:50% 120%;animation:llf .5s ease-out forwards}@keyframes llf{to{transform:rotate(var(--r))}}',h);};
  /* Kids: soft sparkle only, no shooting */
  LL_BEATS.kids=function(el){var h='';for(var i=0;i<14;i++)h+='<i style="left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation-delay:'+(Math.random()*1.2)+'s"></i>';
    add(el,base+'.llb i{position:absolute;width:8px;height:8px;background:'+B.t+';clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);opacity:0;animation:llp 1.2s ease-in-out infinite}@keyframes llp{50%{opacity:.9;transform:scale(1.4)}}',h);};
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){for(var k in LL_BEATS){(function(f){LL_BEATS[k]=function(){};})(LL_BEATS[k]);}}
})();
