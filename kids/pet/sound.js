/* LeonLink Kids Pet - sound pass (Task 4). Gentle WebAudio synth sounds, no files.
   No sound before the child's first tap. Mute toggle saved on this device only (localStorage, no personal data). */
(function(){
  var KEY='llpet_mute', muted=localStorage.getItem(KEY)==='1', ctx=null, master=null;
  function ac(){ if(!ctx){ var C=window.AudioContext||window.webkitAudioContext; if(!C)return null; ctx=new C(); master=ctx.createGain(); master.gain.value=0.18; master.connect(ctx.destination);} if(ctx.state==='suspended')ctx.resume(); return ctx; }
  function tone(f,t0,d,type,f2){ var c=ac(); if(!c||muted)return; var o=c.createOscillator(), g=c.createGain(), s=c.currentTime+t0;
    o.type=type||'sine'; o.frequency.setValueAtTime(f,s); if(f2)o.frequency.exponentialRampToValueAtTime(f2,s+d);
    g.gain.setValueAtTime(0.0001,s); g.gain.exponentialRampToValueAtTime(1,s+0.02); g.gain.exponentialRampToValueAtTime(0.0001,s+d);
    o.connect(g); g.connect(master); o.start(s); o.stop(s+d+0.05); }
  var SFX={
    tap:function(){tone(660,0,0.08,'sine');},
    feed:function(){tone(330,0,0.1,'triangle',440);tone(392,0.12,0.1,'triangle',523);},
    pat:function(){tone(523,0,0.18,'sine',440);tone(659,0.1,0.2,'sine',587);},
    coin:function(){tone(988,0,0.08,'square');tone(1319,0.08,0.18,'square');},
    happy:function(){tone(784,0,0.09,'sine',988);tone(988,0.1,0.09,'sine',1175);tone(1175,0.2,0.16,'sine',1568);}
  };
  function play(n){ if(SFX[n])try{SFX[n]();}catch(e){} }
  window.PetSound={play:play,isMuted:function(){return muted;}};
  function kind(el){ var s=((el.id||'')+' '+(el.className||'')+' '+(el.textContent||'')+' '+(el.getAttribute('aria-label')||'')).toLowerCase();
    if(/feed|food|eat|snack|🍎|🍖/.test(s))return 'feed';
    if(/\bpat\b|pet it|cuddle|hug|love|stroke|❤/.test(s))return 'pat';
    if(/coin|buy|shop|reward|🪙/.test(s))return 'coin';
    if(/play|ball|toy|dance|bath|wash|sleep/.test(s))return 'happy';
    return 'tap'; }
  document.addEventListener('pointerup',function(e){ var el=e.target.closest&&e.target.closest('button,[role=button],a.btn,.btn'); if(!el||el.id==='llpetMute')return; play(kind(el)); },true);
  function addBtn(){ if(document.getElementById('llpetMute'))return; var b=document.createElement('button'); b.id='llpetMute'; b.type='button';
    b.setAttribute('aria-label','Sound on or off');
    b.style.cssText='position:fixed;top:10px;right:10px;z-index:99999;width:52px;height:52px;border-radius:50%;border:3px solid #22f0ff;background:#0b1a2a;color:#fff;font-size:26px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.4)';
    function upd(){b.textContent=muted?'🔇':'🔊';} upd();
    b.addEventListener('click',function(){ muted=!muted; localStorage.setItem(KEY,muted?'1':'0'); upd(); if(!muted)play('happy'); });
    document.body.appendChild(b); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addBtn); else addBtn();
})();
