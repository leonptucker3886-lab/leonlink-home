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
  if(!canAfford(foe.bribe)){say('',"You don't have the cash. "+foe.name+" laughs.");
    $('text').onclick=tapTo(()=>{foeTurn()});$('text').style.cursor='pointer';return}
  spendCoins(foe.bribe);sCoin();hud();
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
  const lost=Math.floor(P.cash/2);spendCoins(lost);P.hp=P.maxhp;P.resp=Math.max(0,P.resp-1);
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

// ---- Phase 1 data tables (Sir Pocket Niche, fixes 2/3/7). Data only: nothing
// below is wired into combat yet, so existing fights behave exactly as before.
// Coin values are read later via addCoins/spendCoins/canAfford (core.js), never P.cash.
const SF_ENEMIES={
  soot_rat:{name:'Soot Rat',tier:1,hp:12,atk:3,def:0,reward:4,sprite:'enemy_soot_rat'},
  ash_moth:{name:'Ash Moth',tier:1,hp:9,atk:4,def:0,reward:4,sprite:'enemy_ash_moth'},
  flue_imp:{name:'Flue Imp',tier:1,hp:15,atk:4,def:1,reward:6,sprite:'enemy_flue_imp'},
  cinder_hound:{name:'Cinder Hound',tier:2,hp:26,atk:7,def:2,reward:12,sprite:'enemy_cinder_hound'},
  creosote_slime:{name:'Creosote Slime',tier:2,hp:34,atk:5,def:4,reward:14,sprite:'enemy_creosote_slime'},
  brick_golem:{name:'Brick Golem',tier:2,hp:40,atk:8,def:5,reward:18,sprite:'enemy_brick_golem'}
};
const SF_BOSSES={
  rival_brushley:{name:'Brushley the Undercutter',area:'rival_guild_hall',hp:45,atk:7,def:2,rival:true,gimmick:'steal',sprite:'rival_brushley'},
  rival_mopp:{name:'Widow Mopp',area:'rival_guild_hall',hp:55,atk:6,def:4,rival:true,gimmick:'heal3',sprite:'rival_mopp'},
  rival_klinker:{name:'Klinker Twins',area:'rival_guild_hall',hp:30,count:2,atk:6,def:3,rival:true,gimmick:'enrage',sprite:'rival_klinker'},
  boss_chimney_wyrm:{name:'Chimney Wyrm',eventOnly:true,hp:80,atk:10,def:4,gimmick:'smoke',sprite:'boss_chimney_wyrm'},
  boss_grand_sweep:{name:'The Grand Sweep',area:'great_stack',hp:120,atk:12,def:6,phases:2,gimmick:'callback',sprite:'boss_grand_sweep'}
};
const SF_WEAPONS={
  wpn_brush:{name:'Worn Brush',atk:0,price:0},
  wpn_rod:{name:'Iron Rod',atk:3,price:30},
  wpn_scraper:{name:'Flue Scraper',atk:5,pierce:2,price:75},
  wpn_hook:{name:'Soot Hook',atk:4,stun:0.2,price:90},
  wpn_cane:{name:"Master's Cane",atk:8,crit:2,price:200}
};
const SF_ITEMS={
  tonic:{name:'Tonic',heal:15,price:10},
  strong_tonic:{name:'Strong Tonic',heal:40,price:30},
  smoke_bomb:{name:'Smoke Bomb',flee:true,price:20},
  soot_pellet:{name:'Soot Pellet',dmg:12,price:15},
  lucky_rag:{name:'Lucky Rag',critBonus:0.1,price:25},
  contract_notes:{name:'Contract Notes',quest:true,noSlot:true,price:0}
};
const SF_PACK={slots:8,stack:5};
function sfEnemiesForTier(t){return Object.keys(SF_ENEMIES).filter(k=>SF_ENEMIES[k].tier===t)}
function sfDamage(atk,def,pierce){return Math.max(1,atk-Math.max(0,def-(pierce||0))+rndi(-1,1))}

// ---- Phase 1 hooks (Sir Pocket Niche). Additive: existing fights unchanged.
SF_WEAPONS.wpn_stackbreaker={name:'Stackbreaker Pole',atk:11,pierce:3,price:320};
SF_WEAPONS.wpn_crook={name:"Sootfather's Crook",atk:14,crit:3,price:0,rewardOnly:true};
let sfBattleId=null,sfBattleSrc=null;
/* contract hook: start a fight by enemy/boss ID. opts.source: 'map'|'event'|'story' */
function startBattle(enemyId,opts){
  opts=opts||{};const d=SF_ENEMIES[enemyId]||SF_BOSSES[enemyId];
  if(!d)return false;
  const boss=!!SF_BOSSES[enemyId];
  sfBattleId=enemyId;sfBattleSrc=opts.source||'map';
  startCombat({name:d.name,hp:d.hp*(d.count||1),atk:d.atk,art:d.sprite,boss:boss,
    line:opts.line||(boss?'This ends here.':'It bares its teeth.'),
    will:boss?99:4+(d.tier||1)*2,bribe:boss?999:d.reward*3,
    convinced:'Fine. Go.',cash:d.reward||(boss?60:10)},opts.scene);
  return true;
}
/* record real wins over rivals in P.rivalsBeaten ({rival_brushley:true}) */
const _sfWinFight=winFight;
winFight=function(talked){
  if(sfBattleId&&SF_BOSSES[sfBattleId]&&SF_BOSSES[sfBattleId].rival&&P){
    P.rivalsBeaten=P.rivalsBeaten||{};P.rivalsBeaten[sfBattleId]=true}
  sfBattleId=null;sfBattleSrc=null;_sfWinFight(talked);
};
const _sfKnockedOut=knockedOut;
knockedOut=function(){sfBattleId=null;sfBattleSrc=null;_sfKnockedOut()};
/* contract hook: tell events.js a fight ended (win, bribe, talk, run or knockout) */
let sfInFight=false;
const _sfStartCombat=startCombat;
startCombat=function(f,sc){sfInFight=true;return _sfStartCombat(f,sc)};
const _sfCombatBar=combatBar;
combatBar=function(v){
  _sfCombatBar(v);
  if(!v&&sfInFight){sfInFight=false;
    if(typeof sfAfterBattle==='function'){const a=(typeof P!=='undefined'&&P)?(P.area||P.loc||null):null;
      setTimeout(()=>{try{sfAfterBattle(a)}catch(e){console.warn('sfAfterBattle',e)}},0)}}
};

// ---- Chapter-lag fix, combat side (Sir Pocket Niche). Additive.
// combatHud ran 4 DOM lookups + 4 writes on every hit/turn, so cache the nodes and only write when values change.
const sfHudEl={},sfHudLast={};
// Re-lookup clears saved values so a rebuilt bar always gets its first write (Inspector note on 37f5bd6).
function sfEl(id){let e=sfHudEl[id];if(!e||!e.isConnected){e=$(id);sfHudEl[id]=e;delete sfHudLast[id+'w'];delete sfHudLast[id+'t']}return e}
function sfSet(id,prop,val){const e=sfEl(id);if(!e)return;if(sfHudLast[id+prop]===val)return;
  sfHudLast[id+prop]=val;if(prop==='w')e.style.width=val;else e.textContent=val}
combatHud=function(){
  if(!foe)return;
  sfSet('hpYou','w',(100*P.hp/P.maxhp)+'%');sfSet('hpYouT','t','YOU '+P.hp+'/'+P.maxhp);
  sfSet('hpFoe','w',Math.max(0,100*foe.hp/foe.maxhp)+'%');
  sfSet('hpFoeT','t',foe.name.toUpperCase()+' '+Math.max(0,foe.hp));
};
