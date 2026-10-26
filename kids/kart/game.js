// Bert Kart - LeonLink Kids (ages 10-12). 3D kart racing, upgrades, Ghost Bert time trials.
import * as THREE from 'three';
const $=s=>document.querySelector(s);
const KEY='leonlink-kart-v1';
const today=()=>new Date().toISOString().slice(0,10);
let S=JSON.parse(localStorage.getItem(KEY)||'null')||{coins:0,day:'',dayCoins:0,up:{eng:0,grip:0,boost:0},color:0,best:{},ghost:{},medals:{},tut:0,muted:false};
function save(){localStorage.setItem(KEY,JSON.stringify(S))}
const DAILY_CAP=150;
function earn(n){if(S.day!==today()){S.day=today();S.dayCoins=0}const g=Math.max(0,Math.min(n,DAILY_CAP-S.dayCoins));S.dayCoins+=g;S.coins+=g;save();hudCoins();return g}
const UPS={eng:{e:'🔥',n:'Engine',d:'Higher top speed',cost:[60,120,200]},grip:{e:'🛞',n:'Tyres',d:'Sharper turns, less slowdown on grass',cost:[50,100,180]},boost:{e:'⚡',n:'Booster',d:'Stronger, longer boosts',cost:[40,90,160]}};
const COLORS=[0x22f0ff,0xff4d6d,0xffc83d,0x7cff6b,0xb388ff,0xffffff];
const W=12,LAPS=3,N=600;
const TRACKS=[
 {id:'meadow',n:'Meadow Loop',e:'🌳',sky:0x8fd3ff,ground:0x5cbf4a,road:0x55555f,edge:0xffffff,gold:72,silver:82,bronze:95,
  pts:[[0,0],[60,-10],[110,10],[120,60],[80,100],[30,85],[-10,110],[-60,90],[-70,40],[-40,10]]},
 {id:'desert',n:'Dune Dash',e:'🏜️',sky:0xffd9a0,ground:0xe8c07a,road:0x6b5a4a,edge:0xff7a3d,gold:108,silver:122,bronze:140,unlock:'meadow',
  pts:[[0,0],[80,0],[140,-30],[170,20],[130,70],[150,120],[90,150],[40,110],[-20,140],[-70,100],[-40,50],[-80,20]]},
 {id:'city',n:'Neon Night',e:'🌃',sky:0x0b1030,ground:0x1a1f3a,road:0x2a2a3a,edge:0x22f0ff,gold:120,silver:136,bronze:155,night:true,unlock:'desert',
  pts:[[0,0],[70,0],[90,-50],[150,-50],[170,10],[120,40],[160,90],[100,130],[40,90],[0,130],[-60,110],[-50,50],[-90,20],[-40,-20]]}
];
let AC=null,engO=null,engG=null;
function audio(){if(AC||S.muted)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();engO=AC.createOscillator();engO.type='sawtooth';engG=AC.createGain();engG.gain.value=0;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=700;engO.connect(f);f.connect(engG);engG.connect(AC.destination);engO.start()}catch(e){}}
function beep(fr,d=.12,type='square',v=.08){if(!AC||S.muted)return;const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=fr;g.gain.value=v;g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}
const bert=$('#bert'),bub=$('#bert .bubble');let bT=0;
function say(t){bub.textContent=t;bert.classList.add('show','talking');clearTimeout(bT);bT=setTimeout(()=>bert.classList.remove('talking'),2500);
 if(!S.muted&&'speechSynthesis'in window){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/[^\w\s!?.,'-]/g,''));u.rate=1.05;u.pitch=1.15;speechSynthesis.speak(u)}catch(e){}}}
bert.onclick=()=>{bert.classList.remove('boing');void bert.offsetWidth;bert.classList.add('boing');say(mode==='race'?['Stay on the road, grass slows you down!','Drive over the yellow pads for a boost!','Let go of GO before sharp corners, then floor it.','Ghost Bert shows the line to beat.'][Math.floor(Math.random()*4)]:'Pick a track and race. Win coins, then upgrade your kart in the Garage!')};
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const cvs=$('#c');const R=new THREE.WebGLRenderer({canvas:cvs,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(65,1,.1,900);
function resize(){R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',resize);resize();
const hemi=new THREE.HemisphereLight(0xffffff,0x446644,.9),sun=new THREE.DirectionalLight(0xffffff,1.1);sun.position.set(50,100,30);scene.add(hemi,sun);
let world=new THREE.Group();scene.add(world);
const toon=c=>new THREE.MeshToonMaterial({color:c});
function makeKart(color,ghost){const g=new THREE.Group();const gm=ghost?new THREE.MeshBasicMaterial({color:0x9fe8ff,transparent:true,opacity:.45,depthWrite:false}):null;const M=c=>gm||toon(c);
 const add=(geo,c,x,y,z)=>{const m=new THREE.Mesh(geo,M(c));m.position.set(x,y,z);g.add(m);return m};
 add(new THREE.BoxGeometry(2.2,.6,3.4),color,0,.6,0);add(new THREE.BoxGeometry(1.8,.4,1),color,0,.5,2);add(new THREE.BoxGeometry(2.4,.12,.6),0x222222,0,1.3,-1.6);
 const wg=new THREE.CylinderGeometry(.45,.45,.4,14);wg.rotateZ(Math.PI/2);g.userData.wheels=[[-1.2,1.2],[1.2,1.2],[-1.2,-1.2],[1.2,-1.2]].map(([x,z])=>add(wg,0x18181b,x,.45,z));
 add(new THREE.SphereGeometry(.5,16,12),0xffd2b0,0,1.45,-.2);add(new THREE.SphereGeometry(.53,16,8,0,Math.PI*2,0,Math.PI/2),0x14b8a6,0,1.55,-.2);add(new THREE.BoxGeometry(.7,.06,.45),0x0f766e,0,1.58,.32);
 return g}
let samples=[],kart,ghostK,boosts=[],coinsM=[],track;
function strip(w,y,col){const pos=[],idx=[];samples.forEach((s,i)=>{const a=s.p.clone().addScaledVector(s.n,w),b=s.p.clone().addScaledVector(s.n,-w);pos.push(a.x,y,a.z,b.x,y,b.z);const j=i*2,k=((i+1)%N)*2;idx.push(j,k,j+1,j+1,k,k+1)});
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();world.add(new THREE.Mesh(g,new THREE.MeshToonMaterial({color:col,side:THREE.DoubleSide})))}
function nearest(p,hint){let best=1e9,bi=0;const lo=hint==null?0:hint-40,hi=hint==null?N:hint+40;for(let k=lo;k<hi;k++){const i=(k%N+N)%N,d=samples[i].p.distanceToSquared(p);if(d<best){best=d;bi=i}}return{i:bi,d:Math.sqrt(best)}}
function build(t){scene.remove(world);world=new THREE.Group();scene.add(world);track=t;
 scene.background=new THREE.Color(t.sky);scene.fog=new THREE.Fog(t.sky,90,340);hemi.intensity=t.night?.5:.9;sun.intensity=t.night?.45:1.1;
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),toon(t.ground));gr.rotation.x=-Math.PI/2;world.add(gr);
 const curve=new THREE.CatmullRomCurve3(t.pts.map(([x,z])=>new THREE.Vector3(x*1.4,0,z*1.4)),true,'centripetal');
 samples=[];for(let i=0;i<N;i++){const p=curve.getPointAt(i/N),tg=curve.getTangentAt(i/N);samples.push({p,tg,n:new THREE.Vector3(-tg.z,0,tg.x)})}
 strip(W+1,.02,t.edge);strip(W,.04,t.road);
 for(let i=0;i<N;i+=5){const s=samples[i];[1,-1].forEach(sd=>{const k=new THREE.Mesh(new THREE.BoxGeometry(1.2,.3,2.2),toon((i/5)%2?0xff3b3b:0xffffff));k.position.copy(s.p).addScaledVector(s.n,sd*(W+1.6));k.position.y=.15;k.lookAt(k.position.clone().add(s.tg));world.add(k)})}
 const s0=samples[0],face=(m,y)=>{m.position.copy(s0.p);m.position.y=y;m.lookAt(s0.p.clone().add(s0.tg).setY(y));world.add(m)};
 face(new THREE.Mesh(new THREE.BoxGeometry(W*2,.05,2.5),new THREE.MeshBasicMaterial({color:0xffffff})),.07);
 face(new THREE.Mesh(new THREE.BoxGeometry(W*2+6,2,.6),toon(0x0b1030)),9);
 [1,-1].forEach(sd=>{const p=new THREE.Mesh(new THREE.BoxGeometry(1,9,1),toon(0x22f0ff));p.position.copy(s0.p).addScaledVector(s0.n,sd*(W+2.5));p.position.y=4.5;world.add(p)});
 const rnd=mulberry(t.id.length*99+7);
 for(let i=0;i<170;i++){const s=samples[Math.floor(rnd()*N)],side=rnd()<.5?1:-1,pos=s.p.clone().addScaledVector(s.n,side*(W+8+rnd()*70));if(nearest(pos).d<W+6)continue;
  const o=new THREE.Group();
  if(t.id==='meadow'){const a=new THREE.Mesh(new THREE.CylinderGeometry(.6,.8,3),toon(0x8b5a2b));a.position.y=1.5;const b=new THREE.Mesh(new THREE.ConeGeometry(3,6,8),toon(rnd()<.5?0x2e8b3a:0x3fae4a));b.position.y=5.5;o.add(a,b)}
  else if(t.id==='desert'){const a=new THREE.Mesh(new THREE.CylinderGeometry(.7,.8,5,8),toon(0x3f9e4d));a.position.y=2.5;const b=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,2,8),toon(0x3f9e4d));b.position.set(1,3,0);b.rotation.z=.9;o.add(a,b);if(rnd()<.4){const r=new THREE.Mesh(new THREE.DodecahedronGeometry(3),toon(0xc98a4b));r.position.set(4,1,2);o.add(r)}}
  else{const h=8+rnd()*30;const a=new THREE.Mesh(new THREE.BoxGeometry(8,h,8),toon(0x22264a));a.position.y=h/2;const w=new THREE.Mesh(new THREE.BoxGeometry(8.2,.6,8.2),new THREE.MeshBasicMaterial({color:[0x22f0ff,0xff4dd8,0xffc83d][Math.floor(rnd()*3)]}));w.position.y=h*.7;o.add(a,w)}
  o.position.copy(pos);o.rotation.y=rnd()*6;world.add(o)}
 boosts=[];[.13,.38,.62,.86].forEach((f,k)=>{const i=Math.floor(f*N),s=samples[i],m=new THREE.Mesh(new THREE.BoxGeometry(6,.08,5),new THREE.MeshBasicMaterial({color:0xffd60a}));
  m.position.copy(s.p).addScaledVector(s.n,(k%2?1:-1)*4);m.position.y=.09;m.lookAt(m.position.clone().add(s.tg));world.add(m);
  const ar=new THREE.Mesh(new THREE.ConeGeometry(1.4,2.2,3),new THREE.MeshBasicMaterial({color:0xff7a00}));ar.rotation.x=Math.PI/2;ar.position.set(0,.2,0);ar.scale.y=.3;m.add(ar);boosts.push({m,i})});
 coinsM=[];const cg=new THREE.CylinderGeometry(.9,.9,.25,18);cg.rotateX(Math.PI/2);const cm=toon(0xffd34d);
 for(let r=0;r<10;r++){const base=Math.floor((r+.5)/10*N),off=(rnd()*2-1)*7;for(let c=0;c<3;c++){const s=samples[(base+c*4)%N],m=new THREE.Mesh(cg,cm);m.position.copy(s.p).addScaledVector(s.n,off);m.position.y=1.2;world.add(m);coinsM.push(m)}}
 kart=makeKart(COLORS[S.color],false);world.add(kart);ghostK=makeKart(0,true);world.add(ghostK);
 const pl=new THREE.PointLight(0x22f0ff,t.night?2:0,30);kart.add(pl);pl.position.set(0,3,3)}
// ---------- race state ----------
let mode='menu',K={},G=null,raceT=0,lapT=0,lap=1,lastI=0,prog=0,rec=[],coinsGot=0,boostT=0,countdown=0,paused=false,keys={},touch={l:0,r:0,g:0,b:0};
function stats(){return{top:34+S.up.eng*4,acc:22+S.up.eng*2,turn:1.9+S.up.grip*.22,grass:.5+S.up.grip*.1,boost:1.5+S.up.boost*.4}}
function startRace(t){build(t);mode='race';paused=false;$('#menu').hidden=true;$('#garage').hidden=true;$('#results').hidden=true;$('#hud').hidden=false;$('#pad').hidden=false;
 const s0=samples[N-8];K={p:s0.p.clone(),a:Math.atan2(samples[0].tg.x,samples[0].tg.z),v:0,steer:0};
 raceT=0;lapT=0;lap=1;lastI=N-8;prog=0;rec=[];coinsGot=0;boostT=0;countdown=3.5;
 const gd=S.ghost[t.id];G=gd?{d:gd,mine:true}:{d:null,mine:false};ghostK.visible=true;
 audio();if(engG)engG.gain.value=.03;
 if(S.tut<1){say('Hold GO to drive, use the arrows to steer. Stay on the road!');S.tut=1;save()}else say(G.mine?'Ghost Bert is your best lap. Beat it!':'Ghost Bert is racing too. Catch me if you can!')}
function ghostAt(t){// recorded lap or default Bert line at gold+15% pace
 if(G.d){const d=G.d,i=Math.min(d.length-2,Math.floor(t*10)),f=t*10-i;if(i<0)return null;const a=d[i],b=d[i+1]||a;return{x:a[0]+(b[0]-a[0])*f,z:a[1]+(b[1]-a[1])*f,a:b[2]}}
 const lt=track.gold*1.15/LAPS,fr=((t%lt)/lt+(N-8)/N)%1,i=Math.floor(fr*N),s=samples[i];return{x:s.p.x,z:s.p.z,a:Math.atan2(s.tg.x,s.tg.z)}}
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key==='Escape'&&mode==='race')togglePause()});addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=0});
document.querySelectorAll('#pad [data-k]').forEach(b=>{const k=b.dataset.k,on=e=>{e.preventDefault();touch[k]=1;b.classList.add('on')},off=e=>{e.preventDefault();touch[k]=0;b.classList.remove('on')};
 b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off)});
const fmt=t=>t==null?'--':(Math.floor(t/60)+':'+(t%60).toFixed(2).padStart(5,'0'));
let recAcc=0,last=performance.now();
function step(dt){const st=stats();
 if(countdown>0){const c0=Math.ceil(countdown);countdown-=dt;const c1=Math.ceil(countdown);$('#count').textContent=countdown>0?(c1>3?'':c1):'GO!';if(c1!==c0&&c1>=0)beep(c1>0?440:880,.25);if(countdown<=0)setTimeout(()=>$('#count').textContent='',700);return}
 const gas=keys['arrowup']||keys['w']||touch.g,brk=keys['arrowdown']||keys['s']||touch.b,L=keys['arrowleft']||keys['a']||touch.l,Rr=keys['arrowright']||keys['d']||touch.r;
 const nr=nearest(K.p,lastI),off=nr.d>W+.5;
 let top=st.top*(off?st.grass:1);if(boostT>0){top*=st.boost;boostT-=dt}
 if(gas)K.v+=st.acc*dt*(K.v<top?1:0);else if(brk)K.v-=40*dt;else K.v-=8*dt;
 if(K.v>top)K.v-=Math.min(K.v-top,30*dt);K.v=Math.max(-8,K.v);
 const want=(L?1:0)-(Rr?1:0);K.steer+=(want-K.steer)*Math.min(1,dt*8);
 K.a+=K.steer*st.turn*dt*Math.min(1,Math.abs(K.v)/10)*Math.sign(K.v||1);
 K.p.x+=Math.sin(K.a)*K.v*dt;K.p.z+=Math.cos(K.a)*K.v*dt;
 if(nr.d>W+28){const s=samples[nr.i];K.p.copy(s.p);K.a=Math.atan2(s.tg.x,s.tg.z);K.v*=.3;say('Oops! Back on the road.')}
 // progress / laps
 let di=nr.i-lastI;if(di<-N/2)di+=N;if(di>N/2)di-=N;prog+=di;lastI=nr.i;
 raceT+=dt;lapT+=dt;
 if(prog>=8+N*lap-4){lap++;beep(660,.15);beep(990,.2);if(lap>LAPS){finish();return}$('#lap').textContent=lap+'/'+LAPS;say(lap===LAPS?'Final lap! Give it everything!':'Lap '+lap+'!');lapT=0}
 boosts.forEach(b=>{if(K.p.distanceTo(b.m.position)<4){if(boostT<.3){beep(300,.3,'sawtooth',.06)}boostT=1.2+S.up.boost*.3}});
 coinsM.forEach(c=>{if(c.visible&&K.p.distanceTo(c.position)<2.4){c.visible=false;coinsGot++;beep(1200,.08,'triangle',.07);$('#rc').textContent=coinsGot}});
 recAcc+=dt;while(recAcc>=.1){recAcc-=.1;rec.push([+K.p.x.toFixed(2),+K.p.z.toFixed(2),+K.a.toFixed(3)])}
 const g=ghostAt(raceT);if(g){ghostK.visible=true;ghostK.position.set(g.x,0,g.z);ghostK.rotation.y=g.a}else ghostK.visible=false;
 if(engO){engO.frequency.value=60+Math.abs(K.v)*5;engG.gain.value=S.muted?0:.025+Math.abs(K.v)/1500}
 $('#time').textContent=fmt(raceT);$('#spd').textContent=Math.round(Math.abs(K.v)*3.2);$('#boostbar').style.opacity=boostT>0?1:0;$('#offroad').style.opacity=off?1:0}
function render(){if(kart&&mode==='race'){kart.position.set(K.p.x,0,K.p.z);kart.rotation.y=K.a;kart.rotation.z=-K.steer*.08*Math.min(1,K.v/20);
  kart.userData.wheels.forEach(w=>w.rotation.x+=K.v*.02);
  const back=new THREE.Vector3(-Math.sin(K.a),0,-Math.cos(K.a)),fov=65+(boostT>0?10:0)+K.v*.15;cam.fov+=(fov-cam.fov)*.1;cam.updateProjectionMatrix();
  const want=K.p.clone().addScaledVector(back,10).setY(4.8);cam.position.lerp(want,.12);cam.lookAt(K.p.x+Math.sin(K.a)*6,1.5,K.p.z+Math.cos(K.a)*6)}
 else if(samples.length){const t=performance.now()/9000,s=samples[Math.floor((t%1)*N)];cam.position.set(s.p.x+40,30,s.p.z+40);cam.lookAt(s.p)}
 coinsM.forEach(c=>c.rotation.y+=.05);R.render(scene,cam)}
function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(mode==='race'&&!paused)step(dt);render();requestAnimationFrame(loop)}
function medalFor(t,tr){return t<=tr.gold?'🥇':t<=tr.silver?'🥈':t<=tr.bronze?'🥉':''}
function finish(){mode='done';if(engG)engG.gain.value=0;$('#pad').hidden=true;
 const t=raceT,tr=track,prev=S.best[tr.id],pb=prev==null||t<prev,m=medalFor(t,tr),beatG=G.d?t<G.d.length/10:t<tr.gold*1.15;
 if(pb){S.best[tr.id]=+t.toFixed(2);S.ghost[tr.id]=rec}
 const rank={'🥇':3,'🥈':2,'🥉':1,'':0};let bonus=coinsGot;if(m)bonus+=[0,10,20,30][rank[m]];if(rank[m]>rank[S.medals[tr.id]||'']){S.medals[tr.id]=m;bonus+=15}
 const got=earn(bonus);save();
 $('#results').hidden=false;$('#rtitle').textContent=m?m+' '+(m==='🥇'?'Gold!':m==='🥈'?'Silver!':'Bronze!'):'Finished!';
 $('#rbody').innerHTML=`<p>Time <b>${fmt(t)}</b>${pb?' <span class="pb">NEW BEST</span>':''}</p><p>Best ${fmt(S.best[tr.id])} · 🥇 ${fmt(tr.gold)} 🥈 ${fmt(tr.silver)} 🥉 ${fmt(tr.bronze)}</p><p>🪙 +${got}${got<bonus?' <small>(daily coin limit reached, come back tomorrow)</small>':''}</p>`;
 say(beatG?'You beat Ghost Bert! Now you are the ghost.':pb?'New personal best! Try again to beat Ghost Bert.':'Nice driving! Tip: let go of GO before a sharp turn.');beep(523,.15);setTimeout(()=>beep(784,.3),150)}
function togglePause(){paused=!paused;$('#pause').hidden=!paused;if(engG)engG.gain.value=paused?0:.03}
function hudCoins(){document.querySelectorAll('.coins').forEach(e=>e.textContent=S.coins)}
function unlocked(t){return !t.unlock||!!S.medals[t.unlock]}
function menu(){mode='menu';$('#menu').hidden=false;$('#garage').hidden=true;$('#results').hidden=true;$('#hud').hidden=true;$('#pad').hidden=true;$('#pause').hidden=true;
 $('#tracks').innerHTML=TRACKS.map(t=>{const u=unlocked(t);return`<button class="trk${u?'':' lock'}" data-id="${t.id}"><span class="te">${u?t.e:'🔒'}</span><b>${t.n}</b><small>${u?('Best '+fmt(S.best[t.id])+' '+(S.medals[t.id]||'')):'Get any medal on '+TRACKS.find(x=>x.id===t.unlock).n}</small></button>`}).join('');
 document.querySelectorAll('.trk').forEach(b=>b.onclick=()=>{const t=TRACKS.find(x=>x.id===b.dataset.id);audio();if(!unlocked(t)){say('Win a medal on the track before to unlock this one.');return}startRace(t)});
 hudCoins();if(!samples.length)build(TRACKS[0]);
 if(!S.tut){say("Hi, I'm Bert! Welcome to Bert Kart. Pick Meadow Loop to start your first race.")}}
function garage(){$('#menu').hidden=true;$('#garage').hidden=false;
 $('#ups').innerHTML=Object.entries(UPS).map(([k,u])=>{const lv=S.up[k],c=u.cost[lv];return`<div class="up"><span class="ue">${u.e}</span><div><b>${u.n}</b> <span class="lv">${'●'.repeat(lv)}${'○'.repeat(3-lv)}</span><br><small>${u.d}</small></div><button data-up="${k}" ${c==null||S.coins<c?'disabled':''}>${c==null?'MAX':'🪙 '+c}</button></div>`}).join('');
 $('#paint').innerHTML=COLORS.map((c,i)=>`<button class="sw${i===S.color?' sel':''}" data-c="${i}" style="background:#${c.toString(16).padStart(6,'0')}" aria-label="Paint ${i+1}"></button>`).join('');
 document.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{const k=b.dataset.up,c=UPS[k].cost[S.up[k]];if(c==null||S.coins<c)return;S.coins-=c;S.up[k]++;save();hudCoins();beep(880,.2,'triangle');say(UPS[k].n+' upgraded!');garage()});
 document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{S.color=+b.dataset.c;save();garage()});
 $('#daily').textContent=`Today: ${S.day===today()?S.dayCoins:0}/${DAILY_CAP} coins from racing`;hudCoins()}
$('#bGarage').onclick=garage;$('#bBack').onclick=menu;$('#bAgain').onclick=()=>startRace(track);$('#bMenu').onclick=menu;
$('#bPause').onclick=togglePause;$('#bResume').onclick=togglePause;$('#bQuit').onclick=()=>{paused=false;if(engG)engG.gain.value=0;menu()};
$('#bMute').onclick=()=>{S.muted=!S.muted;save();$('#bMute').textContent=S.muted?'🔇':'🔊';if(S.muted&&'speechSynthesis'in window)speechSynthesis.cancel()};$('#bMute').textContent=S.muted?'🔇':'🔊';
document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='race'&&!paused)togglePause()});
menu();requestAnimationFrame(loop);
