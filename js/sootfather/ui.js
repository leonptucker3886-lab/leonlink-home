"use strict";
/* Sootfather - ui.js (split from sootfather.html, Phase 0; behaviour unchanged) */
/* ---------- UI engine ---------- */
function hud(){
  $('hHP').textContent=P.hp+'/'+P.maxhp;$('hCash').textContent=P.cash;
  $('hResp').textContent=P.resp;$('hLvl').textContent=P.lvl;$('hHeat').textContent=P.heat;
}
function setScene(s,foe){scene=s;foePortrait=foe||null}
function showPanel(v){$('panel').hidden=!v;$('hud').hidden=!v}
function say(who,text,choices){
  $('who').textContent=who||'';
  const t=$('text');t.innerHTML=text+'<br><span class="tap">tap to continue ▸</span>';
  const c=$('choices');c.innerHTML='';
  t.onclick=tapTo(()=>next());
  t.style.cursor='pointer';
  if(choices){t.onclick=null;t.style.cursor='default';t.innerHTML=text;
    choices.forEach(ch=>addChoice(ch.label,ch.fn,ch.req,ch.cls));}
}
function addChoice(label,fn,req,cls){
  const b=document.createElement('button');b.className='cbtn'+(cls?' '+cls:'');
  b.innerHTML=(req?'<span class="req">'+req+'</span>':'')+label;
  b.onclick=()=>{sTap();fn()};
  $('choices').appendChild(b);
}
function clearChoices(){$('choices').innerHTML='';$('text').onclick=null;$('text').style.cursor='default'}
function float2(txt){const f=$('float');f.textContent=txt;f.style.opacity=1;setTimeout(()=>f.style.opacity=0,1100)}
function gain(e){
  let s=[];
  if(e.cash){P.cash+=e.cash;s.push((e.cash>0?'+':'')+'$'+e.cash);if(e.cash>0)sCoin()}
  if(e.resp){P.resp=Math.max(0,P.resp+e.resp);s.push((e.resp>0?'+':'')+e.resp+' ★')}
  if(e.hp){P.hp=clamp(P.hp+e.hp,0,P.maxhp);s.push((e.hp>0?'+':'')+e.hp+' ❤')}
  if(e.heat){P.heat=clamp(P.heat+e.heat,0,5);s.push('🔥'+(e.heat>0?'+':'')+e.heat)}
  if(e.xp){P.xp+=e.xp;checkLvl()}
  if(s.length)float2(s.join('  '));
  hud();save();
}
function checkLvl(){
  let need=P.lvl*100;
  while(P.xp>=need){
    P.xp-=need;P.lvl++;need=P.lvl*100;P.maxhp+=4;P.hp=P.maxhp;sLvl();
    levelUpScreen();return;
  }
}
function levelUpScreen(){
  say('','<b>LEVEL UP.</b> The family notices you.<br>Pick what grows:',[
    {label:'💪 Muscle +1',fn:()=>{P.mus++;afterLvl()}},
    {label:'🗣️ Charm +1',fn:()=>{P.cha++;afterLvl()}},
    {label:'🍀 Luck +1',fn:()=>{P.lck++;afterLvl()}},
  ]);
}
function afterLvl(){hud();save();next()}

/* script runner: array of beats */
let script=[],si=0,afterScript=null;
function runScript(beats,after){script=beats;si=0;afterScript=after||null;next()}
function next(){
  clearChoices();
  if(si>=script.length){const a=afterScript;afterScript=null;if(a)a();return}
  const b=script[si++];
  if(b.t==='say'){setScene(b.scene||scene,b.foe);say(b.who,b.text)}
  else if(b.t==='choice'){
    setScene(b.scene||scene,b.foe);
    say(b.who,b.text,b.opts.map(o=>({label:o.label,req:o.req,cls:o.cls,fn:()=>{
      if(o.check){
        const st=P[o.check.stat],roll=st+rndi(0,4);
        if(roll>=o.check.need){say('',o.win.text);gain(o.win.g||{});script.splice(si,0,...(o.win.then||[]))}
        else{say('',o.lose.text);gain(o.lose.g||{});script.splice(si,0,...(o.lose.then||[]))}
      }else{if(o.g)gain(o.g);if(o.text)say('',o.text);if(o.then)script.splice(si,0,...o.then);else next()}
    }})));
  }
  else if(b.t==='fight'){startCombat(b.foe,b.scene)}
  else if(b.t==='gain'){gain(b.g);next()}
  else if(b.t==='fn'){b.fn();next()}
}

/* ---------- Phase 1 (Treeguy): dialogue hook per sootfather-contract.md ---------- */
/* startDialogue(npcId, beats, opts) - start a conversation from map, events or story.
   beats: script-beat array (same format as runScript). opts.after: callback when done.
   opts.who: default speaker name for 'say' beats without one. Returns false on bad input. */
function startDialogue(npcId,beats,opts){
  opts=opts||{};
  if(!Array.isArray(beats)||!beats.length)return false;
  const who=opts.who||'';
  const list=beats.map(b=>(b&&(b.t==='say'||b.t==='choice')&&b.who==null)?Object.assign({},b,{who}):b);
  if(npcId&&typeof P==='object'&&P){
    if(!P.flags||typeof P.flags!=='object')P.flags={};
    P.flags['talked_'+npcId]=true;
  }
  if(typeof playSound==='function')playSound('tap');
  runScript(list,opts.after||null);
  return true;
}
