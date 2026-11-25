"use strict";
/* Ashbusten Town - economy.js (Phase 1, owner: Big catch fish). Fix 6 + rival sweeps money side.
   Uses only core.js shared API: addCoins/spendCoins/canAfford, repTier, playSound. Never writes P.cash. */
const SF_JOB_TIERS=[
  {tier:1,name:'Cottage chimney',min:8,max:12,rep:0},
  {tier:2,name:'Townhouse stack',min:18,max:25,rep:1},
  {tier:3,name:'Factory flue',min:40,max:55,rep:2},
  {tier:4,name:'Great Stack contract',min:80,max:120,rep:3,needsRivals:true}];
const SF_SUPPLIES={brush_head:5,rope:8,soot_sack:3,lantern_oil:4,bandage:6};
const SF_UPGRADES={longer_brush:40,reinforced_sack:60,climbing_harness:90,guild_badge:150};
const SF_RIVALS=['rival_brushley','rival_mopp','rival_klinker'];
const SF_LODGING=5;
function sfRivalsAllBeaten(){return !!(P&&P.rivalsBeaten)&&SF_RIVALS.every(r=>P.rivalsBeaten[r])}
function sfPayMult(){const r=P?Math.max(0,P.resp|0):0;let m=Math.min(1.75,1+r/100);
  if(P&&P.flags&&P.flags.up_guild_badge)m*=1.1;if(P&&P.flags&&P.flags.stormBonus)m*=1.2;return m}
function sfAvailableJobTiers(){const t=typeof repTier==='function'?repTier():0;
  return SF_JOB_TIERS.filter(j=>j.rep<=t&&(!j.needsRivals||sfRivalsAllBeaten()))}
/* rival undercut: a rival not yet beaten owns the zone and lists 10-25% lower */
function sfRivalUndercut(area){if(area!=='rival_guild_hall'&&area!=='market_lane')return 0;
  return sfRivalsAllBeaten()?0:0.1+Math.random()*0.15}
function sfJobPay(tier,area){const j=SF_JOB_TIERS.find(x=>x.tier===tier)||SF_JOB_TIERS[0];
  const base=j.min+Math.random()*(j.max-j.min);return Math.round(base*sfPayMult()*(1-sfRivalUndercut(area)))}
function sfPayJob(tier,area,clean){const n=sfJobPay(tier,area);addCoins(n,'job');
  if(P){P.resp=(P.resp|0)+(clean?1+(tier>2?2:tier>1?1:0):0);if(P.flags)P.flags.stormBonus=false}return n}
function sfFailJob(){if(P)P.resp=Math.max(0,(P.resp|0)-3);playSound('lose')}
function sfBuy(kind,id){const t=kind==='upgrade'?SF_UPGRADES:SF_SUPPLIES;const c=t[id];if(c==null)return false;
  if(!spendCoins(c,kind+':'+id))return false;playSound('coin');
  if(kind==='upgrade'&&P)P.flags['up_'+id]=true;return true}
/* contracts: {id,tier,area,pay,day} in P.contracts */
function sfAcceptContract(tier,area){if(!P)return null;const c={id:'c'+Date.now().toString(36),tier,area,pay:sfJobPay(tier,area),day:P.day};
  P.contracts.push(c);return c}
/* daily tick: lodging cost, rival may steal one unstarted contract (20%) */
function sfNewDay(){if(!P)return null;P.day=(P.day|0)+1;const out={day:P.day,stolen:null};
  if(!spendCoins(SF_LODGING,'lodging'))P.hp=Math.max(1,(P.hp|0)-3);
  if(!sfRivalsAllBeaten()&&P.contracts.length&&Math.random()<0.2){
    const left=SF_RIVALS.filter(r=>!P.rivalsBeaten[r]);const i=Math.floor(Math.random()*P.contracts.length);
    out.stolen=Object.assign({by:left[Math.floor(Math.random()*left.length)]},P.contracts.splice(i,1)[0]);
    P.flags.lastStolen=out.stolen}
  return out}
/* win back a stolen contract by bribe (30-60) */
function sfBribeCost(){return 30+Math.floor(Math.random()*31)}
function sfWinBackByBribe(cost){const s=P&&P.flags&&P.flags.lastStolen;if(!s||!spendCoins(cost,'bribe'))return false;
  delete s.by;P.contracts.push(s);P.flags.lastStolen=null;return true}
function sfWinBackByFight(){const s=P&&P.flags&&P.flags.lastStolen;if(!s||typeof startBattle!=='function')return false;
  return startBattle(s.by,{source:'event'})}
