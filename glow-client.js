/* Glow client — drop into Afterglow / Arcadeline.
   Usage: Glow.ready(function(){ Glow.get(); Glow.add(-50); Glow.add(200); });
   Falls back to a local key when the vault iframe is blocked, and seeds the
   vault from the app's old local balance on first run. */
(function(){
  var VAULT='https://www.leonlink.net/wallet.html';
  var frame=null, ready=false, queue=[], balance=0, listeners=[];
  var FALLBACK_KEY=window.GLOW_LEGACY_KEY||'glow_balance_local';
  function emit(){ listeners.forEach(function(f){try{f(balance)}catch(_){}}); }
  function localGet(){ var v=parseInt(localStorage.getItem(FALLBACK_KEY)||'0',10); return isNaN(v)||v<0?0:v; }
  function send(msg){
    if(ready&&frame&&frame.contentWindow){ frame.contentWindow.postMessage(Object.assign({glow:1},msg),'https://www.leonlink.net'); }
  }
  window.addEventListener('message',function(e){
    if(e.origin!=='https://www.leonlink.net')return;
    var m=e.data; if(!m||m.glow!==1)return;
    if(m.type==='ready'||m.type==='balance'){
      var first=!ready; ready=true; balance=m.value;
      if(first){
        /* migrate: if this app had its own pile and the vault is lower, seed up */
        var old=localGet();
        if(old>balance){ send({type:'seed',value:old}); balance=old; }
        queue.splice(0).forEach(function(f){f()});
      }
      emit();
    }
  });
  function init(){
    frame=document.createElement('iframe');
    frame.src=VAULT; frame.style.display='none'; frame.setAttribute('aria-hidden','true');
    document.body.appendChild(frame);
    setTimeout(function(){ if(!ready){ balance=localGet(); ready='local'; queue.splice(0).forEach(function(f){f()}); emit(); } },1200);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.Glow={
    ready:function(f){ if(ready)f(); else queue.push(f); },
    get:function(){ return balance; },
    onChange:function(f){ listeners.push(f); },
    add:function(d){
      balance=Math.max(0,balance+(parseInt(d,10)||0));
      if(ready==='local'){ localStorage.setItem(FALLBACK_KEY,String(balance)); }
      else send({type:'add',delta:d});
      emit(); return balance;
    },
    set:function(v){
      balance=Math.max(0,parseInt(v,10)||0);
      if(ready==='local'){ localStorage.setItem(FALLBACK_KEY,String(balance)); }
      else send({type:'set',value:balance});
      emit(); return balance;
    }
  };
})();
