"use strict";
/* Sootfather - hub.js (split from sootfather.html, Phase 0; behaviour unchanged) */
/* ---------- hub & shop ---------- */
function missionId(ch,mi){return ch+'-'+mi}
function hub(msg){
  screen='hub';combatBar(false);showPanel(true);
  setScene('map');hud();buildPins();
  const ch=CHAPTERS[P.ch];
  say(ch.title,(msg||'Soot City. Your town. Your flues.')+'<br><span class="tap">Tap a marker on the map, or pick below.</span>');
  $('text').onclick=null;
  let locked=false;
  ch.missions.forEach((m,mi)=>{
    const id=missionId(P.ch,mi),done=P.done.includes(id);
    if(!locked){
      if(done)addChoice('✓ '+m.name+' — done',()=>{});
      else{addChoice((m.boss?'🔥 ':'💼 ')+m.name+' <span class="req">GO</span>',()=>startMission(P.ch,mi),'',m.boss?'danger':'gold');locked=true}
    }else addChoice('🔒 '+m.name,()=>{},null);
  });
  addChoice("🏪 Luigi's Pawn (shop)",()=>shop());
  if(P.heat>0)addChoice('🔥 Lay Low <span class="req">$'+(P.heat*30)+'</span>',()=>{
    if(P.cash<P.heat*30){say('','Not enough cash to disappear.');return}
    P.cash-=P.heat*30;P.heat=0;sCoin();hud();save();hub('Heat\'s off. You\'re a ghost again.');
  });
  if(P.ch<CHAPTERS.length-1&&ch.missions.every((m,mi)=>P.done.includes(missionId(P.ch,mi))))
    addChoice('Next chapter →',()=>{P.ch++;P.mi=0;save();hub()},'','gold');
}
function startMission(ch,mi){
  const m=CHAPTERS[ch].missions[mi];
  P.mi=mi;save();
  let beats=m.beats.slice();
  if(P.heat>=2&&!m.boss&&Math.random()<P.heat*0.12){
    const amb=P.ch>=2?FOES.goon:FOES.greaser;
    beats=[{t:'say',who:'',scene:'street',foe:amb.art,text:'<b>AMBUSH.</b> The heat brought them straight to you.'},
           {t:'fight',foe:amb,scene:'street'},
           {t:'gain',g:{heat:-1}},
           {t:'say',who:'',text:'They won\'t follow. For now.'}].concat(beats);
  }
  say('','<b>'+m.name+'.</b>');
  $('text').onclick=tapTo(()=>{runScript(beats.concat([
    {t:'fn',fn:()=>{P.done.push(missionId(ch,mi));save();try{LLProfile.unlock('first_job');LLProfile.score(pScore());}catch(_e){}}},
    {t:'say',who:'',text:'<b style="color:#c9a227;letter-spacing:.1em">MISSION PASSED</b><br>The family eats tonight.'},
    {t:'gain',g:m.reward},
    {t:'fn',fn:()=>{if(m.boss&&ch===CHAPTERS.length-1)ending();else hub()}},
  ]))});
  $('text').style.cursor='pointer';
}
function pScore(){return P.lvl*200+P.resp*75+P.cash+P.xp}
const SHOP=[
 {id:'brush',n:'Brass-Bristle Brush',d:'+2 💪 Muscle',c:60},
 {id:'suit',n:'Silk Suit',d:'+2 🗣️ Charm',c:60},
 {id:'coin',n:"St. Florian's Coin",d:'+2 🍀 Luck',c:50},
 {id:'tonic',n:"Doc's Tonic",d:'+10 max ❤, heal full',c:80,rep:true},
 {id:'heal',n:'Patch Up',d:'Heal to full',c:25,rep:true},
 /* backpack items (SF_ITEMS in combat.js): Use now / Put in backpack */
 {id:'pk_tonic',pack:'tonic',n:'Tonic',d:'Heal 15 \u00b7 backpack item',c:10,rep:true},
 {id:'pk_strong_tonic',pack:'strong_tonic',n:'Strong Tonic',d:'Heal 40 \u00b7 backpack item',c:30,rep:true},
 {id:'pk_smoke_bomb',pack:'smoke_bomb',n:'Smoke Bomb',d:'Escape a fight (not bosses)',c:20,rep:true},
 {id:'pk_soot_pellet',pack:'soot_pellet',n:'Soot Pellet',d:'Throw for 12 damage in a fight',c:15,rep:true},
 {id:'pk_lucky_rag',pack:'lucky_rag',n:'Lucky Rag',d:'+10% crit chance next fight',c:25,rep:true},
];
function shop(){
  setScene('club');
  say("LUIGI'S PAWN",'Luigi counts your money twice. "For luck."<br>You have <b>$'+P.cash+'</b>.');
  $('text').onclick=null;
  const c=$('choices');
  SHOP.forEach(it=>{
    const owned=P.gear.includes(it.id)&&!it.rep;
    const row=document.createElement('div');row.className='shoprow';
    row.innerHTML='<div class="nm"><b>'+it.n+'</b><span>'+it.d+'</span></div>';
    const b=document.createElement('button');
    b.textContent=owned?'OWNED':(it.pack?'$'+it.c+' / $'+packPrice(it)+' \ud83c\udf92':'$'+it.c);
    b.disabled=owned||P.cash<it.c;
    b.onclick=()=>{sTap();buy(it)};
    row.appendChild(b);c.appendChild(row);
  });
  addChoice('← Back to the club',()=>hub());
}
/* backpack rules (agreed 08:34): 8 slots, stacks of 5 (SF_PACK in combat.js),
   storing an item costs 1.5x its price; using it on the spot costs the base price */
const PACK_MULT=1.5;
function packPrice(it){return Math.ceil(it.c*PACK_MULT)}
function packRoom(id){
  if(typeof SF_PACK==='undefined')return true;
  const pk=P.pack||{},have=pk[id]||0;
  if(have>=SF_PACK.stack)return false;
  if(have)return true;
  return Object.keys(pk).filter(k=>pk[k]>0&&typeof SF_ITEMS!=='undefined'&&SF_ITEMS[k]&&!SF_ITEMS[k].noSlot).length<SF_PACK.slots;
}
function buyPack(it){
  const pp=packPrice(it);
  const canNow=!!(typeof SF_ITEMS!=='undefined'&&SF_ITEMS[it.pack]&&(SF_ITEMS[it.pack].heal||SF_ITEMS[it.pack].critBonus));
  const have=(P.pack&&P.pack[it.pack])||0;
  say("LUIGI'S PAWN",'<b>'+it.n+'</b>. Use it here for <b>$'+it.c+'</b>, or pay <b>$'+pp+'</b> to carry it in your backpack.<br><span class="req">You carry '+have+'/'+(typeof SF_PACK!=='undefined'?SF_PACK.stack:5)+'.</span>');
  $('text').onclick=null;
  if(canNow)addChoice('Use now <span class="req">$'+it.c+'</span>',()=>{
    if(P.cash<it.c)return shop();
    if(typeof sfUseNow==='function'&&sfUseNow(it.pack)){P.cash-=it.c;sCoin();save();float2('Used '+it.n);hud();shop();return}
    shop();
  },'','gold');
  const room=packRoom(it.pack);
  addChoice((room?'Put in backpack':'Backpack full')+' <span class="req">$'+pp+'</span>',()=>{
    if(!room||P.cash<pp)return shop();
    if(typeof sfPackAdd==='function'&&sfPackAdd(it.pack)){P.cash-=pp;sCoin();save();float2(it.n+' \u2192 backpack');hud();shop();return}
    say("LUIGI'S PAWN",'<b>Backpack full.</b> "No room, no sale."');
    $('text').onclick=tapTo(()=>shop());$('text').style.cursor='pointer';
  });
  if(!room||P.cash<pp){const bs=$('choices').querySelectorAll('button');const last=bs[bs.length-1];if(last)last.disabled=true}
  addChoice('\u2190 Back',()=>shop());
}
function buy(it){
  if(it.pack)return buyPack(it);
  P.cash-=it.c;sCoin();
  if(it.id==='tonic'){P.maxhp+=10;P.hp=P.maxhp}
  else if(it.id==='heal'){P.hp=P.maxhp}
  else{P.gear.push(it.id);if(it.id==='brush')P.mus+=2;if(it.id==='suit')P.cha+=2;if(it.id==='coin')P.lck+=2}
  float2('Bought '+it.n);hud();save();shop();
}
function ending(){
  try{LLProfile.unlock('boss');LLProfile.score(pScore());}catch(_e){}
  screen='end';showPanel(false);
  $('ovEnd').hidden=false;
  $('endTitle').innerHTML='MADE <span class="r">MAN</span>';
  $('endText').innerHTML='Sal slides the ring across the table.<br><br>"Capo of Chimneys."<br><br>The town breathes. The family eats.<br><br>Score: <b>'+pScore()+'</b> · Level '+P.lvl+' · ★ '+P.resp;
  sWin();wipe();
}
$('bAgain').onclick=()=>{$('ovEnd').hidden=true;NG=true;
  const stats={mus:P.mus,cha:P.cha,lck:P.lck,lvl:P.lvl,gear:P.gear.slice(),maxhp:P.maxhp};
  P=newPlayer();Object.assign(P,stats);P.hp=P.maxhp;P.ch=0;save();hub()};
$('bNew').onclick=()=>{sTap();if(ac()&&ac().state==='suspended')ac().resume();wipe();P=newPlayer();NG=false;save();
  $('ovTitle').hidden=true;hub()};
$('bCont').onclick=()=>{sTap();if(ac()&&ac().state==='suspended')ac().resume();$('ovTitle').hidden=true;hub()};
$('bMute').onclick=()=>{muted=!muted;try{localStorage.setItem('ll-soot-mute',muted?'1':'0')}catch(e){}$('bMute').textContent=muted?'🔇':'🔊'};
$('bMute').textContent=muted?'🔇':'🔊';
if(load())$('bCont').hidden=false;

