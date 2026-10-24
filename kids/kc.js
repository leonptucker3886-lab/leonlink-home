/* Kids Corner core: on-device save, sound toggle, bottom nav. No network, no tracking. */
(function(){const KEY='kc_save_v1';
const KC=window.KC={load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return{}}},
save(d){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}},
get(k,d){const s=KC.load();return k in s?s[k]:d},set(k,v){const s=KC.load();s[k]=v;KC.save(s)},
addCoins(n){KC.set('coins',Math.max(0,KC.get('coins',0)+n));return KC.get('coins',0)},
soundOn(){return KC.get('sound',true)},
beep(f=660,ms=90){if(!KC.soundOn())return;try{const a=KC._ac||(KC._ac=new(window.AudioContext||window.webkitAudioContext)());const o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+ms/1000)}catch(e){}}};
const NAV=[['/kids/','🏠','Town'],['/kids/games/','🎮','Games'],['/kids/stories/','📖','Stories'],['/kids/learn/','🔬','Learn'],['/kids/art/','🎨','Art']];
document.addEventListener('DOMContentLoaded',()=>{const p=location.pathname.replace(/index\.html$/,'');
const n=document.createElement('nav');n.className='kc-nav';n.setAttribute('aria-label','Kids Corner');
n.innerHTML=NAV.map(([h,e,l])=>`<a href="${h}"${p===h?' aria-current="page"':''}><span aria-hidden="true">${e}</span>${l}</a>`).join('');document.body.appendChild(n);
const s=document.getElementById('kc-sound');if(s){const r=()=>{s.textContent=KC.soundOn()?'🔊':'🔇';s.setAttribute('aria-label',KC.soundOn()?'Sound on':'Sound off')};r();s.onclick=()=>{KC.set('sound',!KC.soundOn());r();KC.beep()}}
const c=document.getElementById('coins');if(c)c.textContent=KC.get('coins',0);
});})();
