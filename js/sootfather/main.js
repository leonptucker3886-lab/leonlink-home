"use strict";
/* Sootfather - main.js (split from sootfather.html, Phase 0; behaviour unchanged) */
/* ---------- main loop ---------- */
let last=0;
function frame(t){
  requestAnimationFrame(frame);
  const dt=Math.min(.05,(t-last)/1000||0);last=t;
  if(!$('ovTitle').hidden||!$('ovEnd').hidden){drawScene(dt);return}
  drawScene(dt);
}
/* ---------- music + art upgrade (2026-10) ---------- */
(function(){
  var RM=false;try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var bus=null,mood='club',step=0,timer=null,nextT=0;
  // noir jazz: walking bass + brushed hats + sparse minor piano voicings
  var KEYS={club:{root:110,bpm:96,prog:[[0,3,7,10],[5,8,12,15],[7,10,14,17],[0,3,7,10]]},
            roof:{root:98,bpm:72,prog:[[0,3,7,10],[8,12,15,19],[3,7,10,14],[7,11,14,17]]},
            street:{root:103.8,bpm:84,prog:[[0,3,7,10],[10,14,17,20],[8,12,15,19],[7,11,14,17]]},
            fight:{root:82.4,bpm:138,prog:[[0,3,7],[1,5,8],[0,3,7],[6,10,13]]}};
  function hz(r,s){return r*Math.pow(2,s/12)}
  function mbus(){var a=ac();if(!a)return null;if(!bus){bus=a.createGain();bus.gain.value=0;bus.connect(a.destination)}return bus}
  function note(f,t,d,type,v,cut){var a=ac(),b=mbus();if(!a||!b)return;var o=a.createOscillator(),g=a.createGain(),fl=a.createBiquadFilter();
    o.type=type;o.frequency.value=f;fl.type='lowpass';fl.frequency.value=cut||1800;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(fl);fl.connect(g);g.connect(b);o.start(t);o.stop(t+d+.05)}
  var nb=null;function noise(t,d,v,hp){var a=ac(),b=mbus();if(!a||!b)return;if(!nb){nb=a.createBuffer(1,a.sampleRate*.3,a.sampleRate);var c=nb.getChannelData(0);for(var i=0;i<c.length;i++)c[i]=Math.random()*2-1}
    var s=a.createBufferSource(),g=a.createGain(),f=a.createBiquadFilter();s.buffer=nb;f.type='highpass';f.frequency.value=hp||6000;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(b);s.start(t);s.stop(t+d+.02)}
  function tick(){var a=ac();if(!a||muted)return;var K=KEYS[mood],spb=60/K.bpm/2;
    while(nextT<a.currentTime+.25){var t=Math.max(nextT,a.currentTime),bar=Math.floor(step/8)%4,ch=K.prog[bar],e=step%8;
      if(e%2===0){var walk=[0,ch[1],ch[2],ch[1]+2][(e/2)|0];note(hz(K.root/2,walk),t,spb*1.8,'triangle',mood==='fight'?.16:.13,700)}
      if(mood==='fight'){if(e%2===0)noise(t,.05,.06,4000);if(e===0||e===4)note(55,t,.18,'sine',.2,200)}
      else{ if(e===2||e===6)noise(t,.09,.035,7000); if(e===3||e===7&&Math.random()<.4)noise(t,.04,.02,8000)}
      if(e===0||(e===5&&Math.random()<.5)){ch.forEach(function(s,i){note(hz(K.root*2,s),t+i*.012,spb*(mood==='roof'?6:3),'sine',.035,2400)})}
      if(mood!=='fight'&&e===4&&Math.random()<.35){var mel=ch[rndi(1,ch.length-1)]+12;note(hz(K.root*2,mel),t,spb*2,'triangle',.04,3000)}
      step++;nextT+=spb}}
  function setVol(){var a=ac(),b=mbus();if(!a||!b)return;b.gain.cancelScheduledValues(a.currentTime);b.gain.setTargetAtTime(muted?0:.55,a.currentTime,.4)}
  window.sfMusic=function(m){if(m&&KEYS[m])mood=m;var a=ac();if(!a)return;if(!timer){nextT=a.currentTime+.1;timer=setInterval(tick,90)}setVol()};
  // hook game moments
  var _start=startCombat;startCombat=function(f,sc){sfMusic('fight');return _start.apply(this,arguments)};
  var _win=winFight;winFight=function(){var r=_win.apply(this,arguments);sfMusic(scene==='club'?'club':scene==='roof'?'roof':'street');return r};
  var _ko=knockedOut;knockedOut=function(){var r=_ko.apply(this,arguments);sfMusic('street');return r};
  var _set=setScene;setScene=function(s,foe){_set.apply(this,arguments);if(mood!=='fight')sfMusic(s==='club'?'club':s==='roof'?'roof':'street')};
  var _end=ending;ending=function(){var r=_end.apply(this,arguments);var a=ac(),b=mbus();if(a&&b)b.gain.setTargetAtTime(0,a.currentTime+.6,.8);return r};
  ['bNew','bCont','bAgain'].forEach(function(id){var el=$(id);if(el)el.addEventListener('click',function(){sfMusic(scene==='roof'?'roof':scene==='club'?'club':'street')})});
  $('bMute').addEventListener('click',function(){if(!muted)sfMusic();setVol()});
  // art: drifting soot, chimney smoke, rain on streets, neon flicker, film grain + vignette
  var P2=[];for(var i=0;i<70;i++)P2.push({x:Math.random(),y:Math.random(),r:rnd(.6,2.4),v:rnd(.01,.04),d:rnd(-.01,.01),e:Math.random()<.12});
  var _draw=drawScene;drawScene=function(dt){_draw(dt);var w=art.width,h=art.height,T=sceneT;
    if(!RM){
      // chimney smoke plumes
      for(var k=0;k<3;k++){var cx=w*(.18+k*.3),base=h*.62;for(var j=0;j<6;j++){var ph=((T*.18+j/6+k*.33)%1),yy=base-ph*h*.55,rr=(6+ph*28)*(w/600);
        ax.fillStyle='rgba(70,66,80,'+(.22*(1-ph))+')';ax.beginPath();ax.arc(cx+Math.sin(T+j+k)*10*ph,yy,rr,0,7);ax.fill()}}
      // rain in the street
      if(scene!=='club'&&scene!=='roof'){ax.strokeStyle='rgba(160,170,210,.18)';ax.lineWidth=1;ax.beginPath();for(var q=0;q<60;q++){var rx=((q*97.3+T*40)%w),ry=((q*53.1+T*520)%h);ax.moveTo(rx,ry);ax.lineTo(rx-3,ry+12)}ax.stroke()}
      // soot + embers
      P2.forEach(function(p){p.y+=p.v*dt*(p.e?-1:1);p.x+=p.d*dt+Math.sin(T+p.r)*.0004;if(p.y>1.05)p.y=-.05;if(p.y<-.05)p.y=1.05;if(p.x>1)p.x=0;if(p.x<0)p.x=1;
        ax.fillStyle=p.e?'rgba(255,'+(120+((T*200+p.r*99)%80|0))+',40,.75)':'rgba(30,28,34,.55)';ax.beginPath();ax.arc(p.x*w,p.y*h,p.r,0,7);ax.fill()});
    }
    // neon sign flicker in the club
    if(scene==='club'){var on=RM||Math.sin(T*13)>-.85||Math.random()>.1;ax.font='bold '+Math.round(h*.09)+'px Georgia,serif';ax.textAlign='left';
      ax.shadowColor='#ff2a6d';ax.shadowBlur=on?18:0;ax.fillStyle=on?'rgba(255,90,140,.9)':'rgba(120,40,70,.5)';ax.fillText('SAL\u2019S',w*.05,h*.16);ax.shadowBlur=0}
    // vignette
    var vg=ax.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');ax.fillStyle=vg;ax.fillRect(0,0,w,h);
    // sepia film grain
    if(!RM){ax.fillStyle='rgba(255,230,180,.035)';for(var g2=0;g2<40;g2++)ax.fillRect(Math.random()*w,Math.random()*h,1.5,1.5)}
  };
})();

sizeArt();
requestAnimationFrame(frame);
