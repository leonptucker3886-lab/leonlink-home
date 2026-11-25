"use strict";
/* Ashbusten Town - events.js (Phase 1, owner: Big catch fish). Fix 5: random pop-up events.
   Uses core.js registerEvent/triggerEvents, Treeguy's startDialogue(beats,onDone), Sir Pocket Niche's startBattle. */
function sfTalk(lines,done){if(typeof startDialogue==='function'){if(startDialogue(lines,done)!==false)return}
  if(done)done()}
function sfFight(id){return typeof startBattle==='function'&&startBattle(id,{source:'event'})}
function sfDayOk(id){return !(P.flags['seen_'+id]===P.day)}
function sfMark(id){P.flags['seen_'+id]=P.day;playSound('tap')}
function sfEv(id,area,when,chance,cond,run){registerEvent({id,area,when,
  cond:p=>sfDayOk(id)&&Math.random()<chance&&(!cond||cond(p)),run:p=>{sfMark(id);run(p)}})}
/* timer */
sfEv('ev_urchin',null,'timer',0.15,p=>canAfford(2),p=>sfTalk([{who:'Urchin',t:'Spare two coins, guv?'}],()=>{if(spendCoins(2,'urchin'))p.resp=(p.resp|0)+1}));
sfEv('ev_soot_storm',null,'timer',0.1,null,p=>{p.flags.stormBonus=true;p.hp=Math.max(1,(p.hp|0)-5);playSound('hit')});
sfEv('ev_tax',null,'timer',0.08,p=>p.cash>=20,p=>sfTalk([{who:'Tax collector',t:'The ward takes its tenth.'}],()=>{spendCoins(Math.round(p.cash*0.1),'tax')}));
/* area enter */
sfEv('ev_rats',null,'enter',0.12,null,()=>sfFight('soot_rat'));
sfEv('ev_rival_taunt','rival_guild_hall','enter',0.5,null,p=>{p.flags.rivalTaunted=true;sfTalk([{who:'Brushley',t:'Your prices are a joke. Mine are lower.'}])});
sfEv('ev_rush_job','foundry_quarter','enter',0.25,null,p=>sfTalk([{who:'Foreman',t:'Rush job. Double pay.'}],()=>{if(typeof sfAcceptContract==='function'){const c=sfAcceptContract(3,'foundry_quarter');if(c)c.pay*=2}}));
sfEv('ev_wyrm_docks','canal_docks','enter',0.08,null,()=>sfFight('boss_chimney_wyrm'));
sfEv('ev_wyrm_foundry','foundry_quarter','enter',0.08,null,()=>sfFight('boss_chimney_wyrm'));
/* after battle */
sfEv('ev_loot',null,'afterBattle',0.35,null,()=>addCoins(3+Math.floor(Math.random()*13),'loot'));
sfEv('ev_witness',null,'afterBattle',0.2,null,p=>{p.resp=(p.resp|0)+2});
sfEv('ev_baker',null,'afterBattle',0.5,p=>p.hp<p.maxhp*0.3,p=>sfTalk([{who:'Baker',t:'You look rough. Take this.'}],()=>{p.hp=Math.min(p.maxhp,p.hp+15)}));
/* helpers for hub/map callers: one pop-up max per call (triggerEvents stops at the first) */
function sfOnEnter(area){return triggerEvents(area,'enter')}
function sfOnTimer(area){return triggerEvents(area||'soot_row','timer')}
function sfAfterBattle(area){return triggerEvents(area||'soot_row','afterBattle')}
