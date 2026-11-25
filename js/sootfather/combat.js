"use strict";
/* Sootfather - combat.js (split from sootfather.html, Phase 0; behaviour unchanged) */
/* ---------- combat ---------- */
let foe=null,foeEnraged=false;
function foeHp(f){return NG?Math.round(f.hp*1.5):f.hp}
function startCombat(f,sc){
  foe=Object.assign({},f);foe.hp=foe.maxhp=foeHp(f);foe.atk=NG?f.atk+2:f.atk;
  foeEnraged=false;
  setScene(sc||'street',foe.art);
  say('','<b>'+foe.name+'</b> blocks your way.<br><i>'+foe.line+'</i>');
  $('text').onclick=tapTo(()=>{combatMenu()});
  $('text').style.cursor='pointer';
}
function combatMenu(){
  clearChoices();
  combatBar(true);
  say('',foe.name+' — what do you do?');
  $('text').onclick=null;
  const dmg=3+P.mus*2+(P.gear.includes('brush')?4:0);
  addChoice('🧹 Swing the brush <span class="req">~'+dmg+' dmg</span>',()=>playerHit(dmg));
  addChoice('🗣️ Sweet-talk',()=>playerTalk(),P.cha>=foe.will?'CHA '+P.cha+' vs '+foe.will:null);
  addChoice('💵 Bribe <span class="req">$'+foe.bribe+'</span>',()=>playerBribe(),null,foe.boss?'danger':null);
  if(!foe.boss)addChoice('💨 Smoke bomb',()=>playerRun());
}
function combatBar(v){$('combatbar').style.display=v?'flex':'none';combatHud()}
function combatHud(){
  if(!foe)return;
  $('hpYou').style.width=(100*P.hp/P.maxhp)+'%';$('hpYouT').textContent='YOU '+P.hp+'/'+P.maxhp;
  $('hpFoe').style.width=Math.max(0,100*foe.hp/foe.maxhp)+'%';$('hpFoeT').textContent=foe.name.toUpperCase()+' '+Math.max(0,foe.hp);
}
function playerHit(dmg){
  const d=dmg+rndi(-2,2);foe.hp-=d;sHit();combatHud();
  say('','You catch '+foe.name+' with the brush for <b>'+d+'</b>.');
  $('text').onclick=tapTo(()=>{if(foe.hp<=0)winFight();else foeTurn()});
  $('text').style.cursor='pointer';
}
function playerTalk(){
  const roll=P.cha+rndi(0,4)+(P.gear.includes('suit')?2:0);
  if(roll>=foe.will){
    sWin();say('','"'+foe.convinced+'"<br>'+foe.name+' steps aside.');
    $('text').onclick=tapTo(()=>{winFight(true)});$('text').style.cursor='pointer';
  }else{
    foeEnraged=true;foe.atk+=2;sLose();
    say('','That landed wrong. '+foe.name+' sees red.');
    $('text').onclick=tapTo(()=>{foeTurn()});$('text').style.cursor='pointer';
  }
}
function playerBribe(){
  if(P.cash<foe.bribe){say('',"You don't have the cash. "+foe.name+" laughs.");
    $('text').onclick=tapTo(()=>{foeTurn()});$('text').style.cursor='pointer';return}
  P.cash-=foe.bribe;sCoin();hud();
  say('',"Money talks. "+foe.name+" walks.");
  $('text').onclick=tapTo(()=>{winFight(true)});$('text').style.cursor='pointer';
}
function playerRun(){
  const roll=P.lck+rndi(0,4)+(P.gear.includes('coin')?2:0);
  if(roll>=6){say('',"Smoke bomb. Gone.");
    $('text').onclick=tapTo(()=>{combatBar(false);next()});$('text').style.cursor='pointer'}
  else{say('',"The bomb fizzles. No way out but through.");
    $('text').onclick=tapTo(()=>{foeTurn()});$('text').style.cursor='pointer'}
}
function foeTurn(){
  clearChoices();
  const d=Math.max(1,foe.atk+rndi(-2,2)-(P.gear.includes('suit')?1:0));
  P.hp-=d;sHit();combatHud();hud();
  if(P.hp<=0){knockedOut();return}
  say('',foe.name+' hits you for <b>'+d+'</b>.');
  $('text').onclick=tapTo(()=>{combatMenu()});$('text').style.cursor='pointer';
}
function winFight(talked){
  combatBar(false);sWin();
  const xp=foe.boss?100:25, cash=foe.cash||rndi(15,30), resp=foe.boss?3:1;
  say('',(talked?'Handled with words. ':'Handled.')+'<br>The family hears about it.');
  gain({xp,cash:cash,respect:resp});
  $('text').onclick=tapTo(()=>{next()});$('text').style.cursor='pointer';
}
function knockedOut(){
  combatBar(false);sLose();screen='wasted';showPanel(false);
  $('ovWasted').hidden=false;
  const lost=Math.floor(P.cash/2);P.cash-=lost;P.hp=P.maxhp;P.resp=Math.max(0,P.resp-1);
  P.heat=Math.max(0,P.heat-2);
  hud();save();
  setTimeout(()=>{$('ovWasted').hidden=true;
    hub("You wake up at Doc's. Ribs taped. Wallet lighter.<br>(-$"+lost+", -1 ★)");
  },2100);
}

/* ---------- story ---------- */
let lvlUpShown=false;
checkLvl=function(){
  let need=P.lvl*100;
  while(P.xp>=need){
    P.xp-=need;P.lvl++;need=P.lvl*100;P.maxhp+=4;P.hp=P.maxhp;sLvl();
    lvlUpShown=true;levelUpScreen();return;
  }
};
afterLvl=function(){lvlUpShown=false;hud();save();checkLvl();
  if(!lvlUpShown&&(si>=script.length&&!afterScript))hub();else next()};
const _next=next;
next=function(){if(lvlUpShown)return;_next()};
