"use strict";
/* Sootfather - core.js (split from sootfather.html, Phase 0; behaviour unchanged) */
/* ================= THE SOOTFATHER ================= */
const stage=document.getElementById('stage'),art=document.getElementById('art'),ax=art.getContext('2d');
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>v<a?a:v>b?b:v, rnd=(a,b)=>a+Math.random()*(b-a), rndi=(a,b)=>Math.floor(rnd(a,b+1));
function sizeArt(){const r=stage.getBoundingClientRect();art.width=Math.max(2,r.width);art.height=Math.max(2,r.height*.42)}
window.addEventListener('resize',sizeArt);

let screen='title';
let P=null,NG=false,scene='club',sceneT=0,foePortrait=null;

/* ---------- audio ---------- */
let AC=null,muted=false;try{muted=localStorage.getItem('ll-soot-mute')==='1'}catch(e){}
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}return AC}
function tone(f,dur,type,vol,delay,slide){if(muted)return;const a=ac();if(!a)return;const t0=a.currentTime+(delay||0);
  const o=a.createOscillator(),g=a.createGain();o.type=type||'triangle';o.frequency.setValueAtTime(f,t0);
  if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,slide),t0+dur);
  g.gain.setValueAtTime(vol||.05,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+dur+.02)}
const sTap=()=>tone(500,.06,'triangle',.04);
let lastTap=0;
function tapTo(fn){return()=>{const n=Date.now();if(n-lastTap<400)return;lastTap=n;sTap();fn()}}
const sCoin=()=>{tone(950,.07,'triangle',.05);tone(1420,.1,'triangle',.05,.07)};
const sHit=()=>tone(180,.15,'sawtooth',.07,0,60);
const sWin=()=>{[392,523,659].forEach((f,i)=>tone(f,.16,'triangle',.06,i*.11))};
const sLose=()=>tone(300,.4,'sawtooth',.06,0,90);
const sLvl=()=>{[523,659,784,1046].forEach((f,i)=>tone(f,.14,'triangle',.06,i*.09))};

/* ---------- state ---------- */
function newPlayer(){return{hp:24,maxhp:24,mus:3,cha:3,lck:3,cash:40,resp:0,xp:0,lvl:1,
  gear:[],ch:0,mi:0,done:[],heat:0}}
function save(){try{localStorage.setItem('ll-soot-save',JSON.stringify({P,NG}))}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem('ll-soot-save'));if(s&&s.P){P=s.P;NG=!!s.NG;return true}}catch(e){}return false}
function wipe(){try{localStorage.removeItem('ll-soot-save')}catch(e){}}
