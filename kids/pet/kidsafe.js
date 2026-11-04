// LeonLink Kids Pet - kid-safe guard (4 Nov 2026)
// Fix for tester 2.6: the Pet page must never show links out to the rest of LeonLink.
// Removes any link/menu that leaves /kids/, blocks outside navigation, and shows a
// visible "Little Kids mode" badge (fix for tester 3.1). No data collected.
(function(){
  function outside(href){
    try{var u=new URL(href,location.href);
      if(u.protocol!=='http:'&&u.protocol!=='https:')return false;
      return !(u.host===location.host&&u.pathname.indexOf('/kids/')===0);}catch(e){return true}
  }
  function sweep(root){
    (root.querySelectorAll?root:document).querySelectorAll('a[href]').forEach(function(a){
      if(outside(a.getAttribute('href'))){a.remove();}
    });
    document.querySelectorAll('.site-nav,.sitenav,.ll-nav,#site-nav,#ll-nav,footer nav').forEach(function(n){n.remove()});
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(a&&outside(a.getAttribute('href'))){e.preventDefault();e.stopPropagation();a.remove();}
  },true);
  try{var w=window.open;window.open=function(u){if(u&&outside(u))return null;return w.apply(window,arguments)}}catch(e){}
  function badge(){
    if(document.getElementById('lkbadge'))return;
    var b=document.createElement('div');b.id='lkbadge';b.setAttribute('role','status');
    b.textContent='\u{1F476} Little Kids mode ON';
    b.style.cssText='position:fixed;left:8px;top:calc(env(safe-area-inset-top,0px) + 52px);z-index:50;background:#ff3fb4;color:#fff;font:700 13px system-ui,sans-serif;padding:4px 10px;border-radius:12px;pointer-events:none;opacity:.9';
    document.body.appendChild(b);
  }
  function run(){sweep(document);if(document.body.classList.contains('little'))badge();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)sweep(n)})});if(document.body.classList.contains('little'))badge();})
    .observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();
