/* Team 5 intro engine (3, the build). Drop-in: <script src="/ll-intro.js" data-cat="arcade|regular|casino|kids" defer></script>
   Spine: "LEONLINK PRESENTS" -> logo.png spins in -> category beat slot -> fade hand-off.
   Player is never trapped: any click/key/tap skips; hard cap 3.5s; fails open if anything errors. */
(function(){
  try{
    var s=document.currentScript||{}, cat=(s.dataset&&s.dataset.cat)||'regular', logo=(s.dataset&&s.dataset.logo)||'/logo.png';
    if(sessionStorage.getItem('ll-intro-'+location.pathname)){return;}
    var css='#ll-intro{position:fixed;inset:0;z-index:2147483646;background:#050810;color:#eef3ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;font:700 16px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;transition:opacity .4s ease;cursor:pointer}'+
    '#ll-intro.ll-out{opacity:0;pointer-events:none}'+
    '#ll-intro .ll-t{font-size:clamp(28px,7vw,72px);letter-spacing:.08em;background:linear-gradient(90deg,#ff6a2a,#ffb02a,#a64dff);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:0;transform:scale(.9);animation:llIn .5s ease forwards}'+
    '#ll-intro img{width:min(28vw,160px);opacity:0;animation:llSpin .9s cubic-bezier(.2,.8,.2,1) .5s forwards}'+
    '#ll-intro .ll-beat{min-height:60px}'+
    '#ll-intro .ll-skip{position:absolute;bottom:16px;right:18px;font-size:13px;color:#9aa6c2;font-weight:400}'+
    '@keyframes llIn{to{opacity:1;transform:none}}'+
    '@keyframes llSpin{from{opacity:0;transform:rotate(-540deg) scale(.2)}to{opacity:1;transform:none}}'+
    '@media (prefers-reduced-motion:reduce){#ll-intro *{animation-duration:.01s!important;animation-delay:0s!important}}';
    var st=document.createElement('style');st.textContent=css;
    var el=document.createElement('div');el.id='ll-intro';el.setAttribute('role','presentation');el.dataset.cat=cat;
    el.innerHTML='<div class="ll-t">LEONLINK PRESENTS</div><img alt="LeonLink" src="'+logo+'"><div class="ll-beat" id="ll-beat"></div><div class="ll-skip">tap or press any key to skip</div>';
    var done=false;
    function end(){ if(done)return; done=true; el.classList.add('ll-out');
      try{sessionStorage.setItem('ll-intro-'+location.pathname,'1');}catch(e){}
      setTimeout(function(){el.remove();st.remove();window.dispatchEvent(new Event('ll-intro-done'));},420);
      removeEventListener('keydown',end,true); }
    el.addEventListener('pointerdown',end); addEventListener('keydown',end,true);
    el.querySelector('img').onerror=function(){this.style.display='none';};
    function mount(){ document.head.appendChild(st); document.body.appendChild(el);
      /* Category beat hook: 2's art registers window.LL_BEATS[cat](beatEl) — runs 1.4s in. */
      setTimeout(function(){ try{ var b=window.LL_BEATS&&window.LL_BEATS[cat]; if(b&&!done) b(document.getElementById('ll-beat')); }catch(e){} },1400);
      setTimeout(end,3500); }
    if(document.body) mount(); else document.addEventListener('DOMContentLoaded',mount);
    window.LL_skipIntro=end;
  }catch(e){ var x=document.getElementById('ll-intro'); if(x) x.remove(); }
})();
