// LeonLink Kids Pet – polish pass (24 Oct 2026): feel, tricks, memory game, new treats.
(function(){
const has=x=>typeof x!=='undefined';
// ---------- 1. Feel ----------
// soft tap "pop" + tiny buzz on every button press
let AC2=null;
function tick(){try{if(S.mute)return;AC2=AC2||new (window.AudioContext||window.webkitAudioContext)();if(AC2.state==='suspended')AC2.resume();const t=AC2.currentTime,o=AC2.createOscillator(),g=AC2.createGain();o.type='sine';o.frequency.setValueAtTime(520,t);o.frequency.exponentialRampToValueAtTime(880,t+.06);g.gain.setValueAtTime(.06,t);g.gain.exponentialRampToValueAtTime(.001,t+.08);o.connect(g).connect(AC2.destination);o.start(t);o.stop(t+.09)}catch(e){}}
document.addEventListener('pointerdown',e=>{if(e.target.closest('button')){tick();try{navigator.vibrate&&navigator.vibrate(8)}catch(_){}}},{passive:true});
// update bars in place (no flicker / no 3D remount) every minute
window.refreshMeters=function(){const ks=['h','j','c','en'];document.querySelectorAll('.meters .meter').forEach((m,i)=>{const k=ks[i];if(!k)return;const v=S.st[k];m.classList.remove('low','mid','ok');m.classList.add(lvl(v));const b=m.querySelector('i');if(b)b.style.width=v+'%'});const mb=document.querySelector('.mood');if(mb){const[me,mw]=mood();mb.textContent=me;mb.dataset.say=mw;mb.setAttribute('aria-label',mw)}$('tok').textContent=S.tokens};
// phone woke up after a while: catch up on time passed
document.addEventListener('visibilitychange',()=>{if(document.hidden){try{speechSynthesis.cancel()}catch(e){}return}const m=(Date.now()-S.t)/60000;if(m>1){decay(m);save();if(S.view==='home')refreshMeters()}});
// ---------- 2. Tricks ----------
const TRICKS=[['flip','Backflip!'],['spin','Spin!'],['wave','Hello!'],['love','I love you!']];let ti=0,lastTrick=0;
window.doTrick=function(){if(!window.Pet3D)return;const now=Date.now();if(now-lastTrick<1200)return;lastTrick=now;const[k,w]=TRICKS[ti++%TRICKS.length];Pet3D.act(k);setTimeout(()=>say(w),200);
 S.st.j=Math.min(100,S.st.j+2);S.cnt=S.cnt||{};S.cnt.trick=(S.cnt.trick||0)+1;save();refreshMeters();if(S.cnt.trick>=5&&has(sticker))sticker('trick')};
if(has(STK)){STK.push(['trick','\u{1F3AA}','Trick star'],['match','\u{1F0CF}','Memory master'])}
// ---------- 3. More to do: new treats & toys ----------
if(has(SHOP)&&!ALL.find(i=>i.id==='icecream')){const add=(cat,arr)=>arr.forEach(i=>{SHOP[cat].push(i);ALL.push(i)});
 add('food',[{id:'cookie',e:'\u{1F36A}',n:'Cookie',p:8,h:20,j:3},{id:'melon',e:'\u{1F349}',n:'Watermelon',p:12,h:30},{id:'icecream',e:'\u{1F366}',n:'Ice Cream',p:18,h:30,j:10}]);
 add('toys',[{id:'drum',e:'\u{1F941}',n:'Drum',p:35,j:40},{id:'blocks',e:'\u{1F9F1}',n:'Building Blocks',p:25,j:30}])}
// Memory match game (picture-only)
const _gv=gamesView;gamesView=function(){return _gv().replace('</div></div>',`<button class="item tap" aria-label="Memory match" data-say="Find the pairs" onclick="playGame('match')"><div class="e">\u{1F0CF}</div><div class="go">\u25B6\uFE0F</div></button></div></div>`)};
const _pg=playGame;playGame=function(id){if(id!=='match')return _pg(id);S.view='mg';save();
 $('app').innerHTML=`<div class="card"><div class="row playbar"><button class="startbtn" data-say="Back" aria-label="Back" onclick="endMG(0)">\u2B05\uFE0F</button><b id="gs" class="score">\u{1FA99} 0</b></div><div class="timer"><i id="gt" style="width:100%"></i></div><div id="game" class="mg match"></div></div>`;
 say('Find the pairs!');const pics=['\u{1F34E}','\u{1F9B4}','\u2B50','\u{1F380}','\u{1F41F}','\u26BD'],deck=pics.concat(pics).sort(()=>Math.random()-.5),box=$('game');let open=[],pairs=0,got=0,left=45,lock=false;
 deck.forEach((e,i)=>{const c=document.createElement('button');c.className='mcard';c.dataset.e=e;c.innerHTML='<span>\u2753</span>';c.onclick=()=>{if(lock||c.classList.contains('up'))return;c.classList.add('up');c.innerHTML='<span>'+e+'</span>';open.push(c);
  if(open.length===2){const[a,b]=open;open=[];if(a.dataset.e===b.dataset.e){pairs++;got+=3;$('gs').textContent='\u{1FA99} '+got;a.classList.add('ok');b.classList.add('ok');has(blip)&&blip(1200);if(pairs===6){got+=Math.max(0,Math.floor(left/5));setTimeout(()=>endMG(got,'match'),500)}}
   else{lock=true;setTimeout(()=>{[a,b].forEach(x=>{x.classList.remove('up');x.innerHTML='<span>\u2753</span>'});lock=false},800)}}};box.appendChild(c)});
 MG=[setInterval(()=>{left--;const t=$('gt');if(t)t.style.width=(left/45*100)+'%';if(left<=0)endMG(got,'match')},1000)]};
// ---------- add Trick button to the pet stage ----------
const _r=render;render=function(){_r.apply(this,arguments);const a=document.querySelector('#stage .acts');if(a&&!a.querySelector('.trick'))a.insertAdjacentHTML('afterbegin','<button class="trick" aria-label="Do a trick" data-say="Do a trick!" onclick="doTrick()">\u{1F3AA}</button>')};
render();
})();
