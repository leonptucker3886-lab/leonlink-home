/* LeonLink two-screen intro. Usage: <script src="/leonlink-intro.js" defer></script>
   Tap/click/any key skips. Shows once per session per page. */
(function(){
  if (window.__llIntro) return; window.__llIntro = 1;
  var KEY='llintro:'+location.pathname;
  try{ if(sessionStorage.getItem(KEY)) return; sessionStorage.setItem(KEY,'1'); }catch(e){}
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var css = '#ll-intro{position:fixed;inset:0;z-index:2147483647;background:#0b0d12;color:#fff;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;cursor:pointer;transition:opacity .4s;-webkit-tap-highlight-color:transparent}'+
  '#ll-intro .s{position:absolute;text-align:center;padding:24px;opacity:0;transition:opacity .5s}'+
  '#ll-intro .s.on{opacity:1}'+
  '#ll-intro h1{margin:0;font-size:clamp(36px,10vw,84px);font-weight:900;letter-spacing:-.02em}'+
  '#ll-intro h1 b{color:#2A78D6}'+
  '#ll-intro p{margin:12px 0 0;font-size:clamp(14px,4vw,20px);opacity:.8}'+
  '#ll-intro .k{position:absolute;bottom:max(20px,env(safe-area-inset-bottom));left:0;right:0;text-align:center;font-size:13px;opacity:.6}';
  var st=document.createElement('style');st.textContent=css;
  var el=document.createElement('div');el.id='ll-intro';el.setAttribute('role','dialog');el.setAttribute('aria-label','Intro, tap to skip');
  el.innerHTML='<div class="s"><h1>Leon<b>Link</b></h1><p>leonlink.net</p></div>'+
    '<div class="s"><h1>Get Ready</h1><p>'+(document.title||'Loading…')+'</p></div>'+
    '<div class="k">Tap to skip</div>';
  var done=false,timers=[];
  function close(){ if(done)return; done=true; timers.forEach(clearTimeout); el.style.opacity=0;
    setTimeout(function(){el.remove();st.remove();document.removeEventListener('keydown',close);},400);}
  function start(){
    document.head.appendChild(st); document.body.appendChild(el);
    var s=el.querySelectorAll('.s'), d=reduce?900:1800;
    s[0].classList.add('on');
    timers.push(setTimeout(function(){s[0].classList.remove('on');s[1].classList.add('on');},d));
    timers.push(setTimeout(close,d*2));
    el.addEventListener('pointerdown',close); document.addEventListener('keydown',close);
  }
  document.body?start():document.addEventListener('DOMContentLoaded',start);
})();
