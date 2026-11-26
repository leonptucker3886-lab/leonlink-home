"use strict";
/* Sootfather - story.js (split from sootfather.html, Phase 0; behaviour unchanged) */

const FOES={
  punk:{name:'Punk Kid',art:'punk',hp:16,atk:4,will:3,bribe:20,cash:25,line:'"Toll\'s a dollar, sweep."',convinced:'"Okay okay! Family business, I get it!"'},
  greaser:{name:'Greaser',art:'punk',hp:26,atk:7,will:4,bribe:40,cash:40,line:'"Ash sends his regards."',convinced:'"Tell Ash... actually don\'t tell Ash."'},
  brick:{name:'Brick',art:'brick',hp:42,atk:8,will:5,bribe:120,cash:90,boss:true,line:'"These rooftops answer to Morano now."',convinced:'"Brick... respects the brush."'},
  goon:{name:'Task Force Goon',art:'goon',hp:36,atk:9,will:6,bribe:70,cash:50,line:'"Cease and desist, citizen."',convinced:'"My pension ain\'t worth this."'},
  ash:{name:'Ash Morano',art:'ash',hp:62,atk:11,will:7,bribe:200,cash:150,boss:true,line:'"This town ain\'t big enough for two sweeps."',convinced:'"Fine. The east side is yours. ...For now."'},
  grey:{name:'Councilman Grey',art:'grey',hp:85,atk:12,will:9,bribe:300,cash:300,boss:true,line:'"Sweeps are a relic. The future is electric."',convinced:'"...Perhaps the future has room for tradition."'},
};
const CHAPTERS=[
{title:'CHAPTER 1 — TRIBUTE DAY',missions:[
 {name:'The Rounds',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Sal runs every flue in this town. Bakeries, barbers, brownstones — they all pay the sweep.'},
  {t:'say',who:'SAL',text:'The chimneys pay. The shops pay. <i>You</i> collect. That\'s the business, kid. Don\'t embarrass me.'},
  {t:'say',who:'',scene:'street',text:'<b>Luigi\'s Bakery.</b> The fee is $40. Luigi is "counting".'},
  {t:'choice',who:'',text:'How do you collect?',opts:[
    {label:'🗣️ Talk nice',req:'CHA 5',check:{stat:'cha',need:5},
     win:{text:'Luigi laughs, pays $50, throws in a cannoli. "For the family!"',g:{cash:50,resp:1,xp:10}},
     lose:{text:'Luigi shrugs. "$40. Take it."',g:{cash:40,xp:5}}},
    {label:'💪 Talk loud',req:'MUS 5',check:{stat:'mus',need:5},
     win:{text:'You lean on the counter. It creaks. Luigi pays $60 fast.',g:{cash:60,resp:-1,xp:10}},
     lose:{text:'Luigi calls your bluff. "$40."',g:{cash:40,xp:5}}},
    {label:'🤝 Just take the $40',g:{cash:40,xp:5},then:[{t:'say',who:'',text:'Clean. Boring. The family likes boring.'}]},
  ]},
  {t:'say',who:'',scene:'street',text:'An alley. A punk kid is shaking down the delivery boy. <b>Family turf.</b>'},
  {t:'fight',foe:FOES.punk,scene:'street'},
  {t:'say',who:'YOU',text:'Not on our street.'},
  {t:'say',who:'',scene:'street',text:'<b>The barber.</b> He counts the $40 twice. Slowly. Too slowly.'},
  {t:'choice',who:'',text:'Something\'s short.',opts:[
    {label:'🍀 Trust your gut',req:'LCK 5',check:{stat:'lck',need:5},
     win:{text:'You catch the short count. He pays double and apologizes to your brush.',g:{cash:80,resp:1,xp:10}},
     lose:{text:'False alarm. He pays $40 and you feel silly.',g:{cash:40,xp:5}}},
    {label:'🤝 Let it slide',g:{cash:40,xp:5},then:[{t:'say',who:'VINNIE',text:'Soft. But the money\'s right. Sal notices restraint.'}]},
  ]},
 ],reward:{cash:40,resp:1,xp:40}},
 {name:'Brick',boss:true,beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Ash Morano\'s crew is sweeping OUR chimneys. Brick is their muscle. Docks. Tonight.'},
  {t:'say',who:'BRICK',scene:'street',foe:'brick',text:'"You\'re the new broom? Turn around. These rooftops answer to Morano now."'},
  {t:'fight',foe:FOES.brick,scene:'street'},
  {t:'say',who:'SAL',scene:'club',text:'Brick sweeps no more. Ash knows our name now. <i>Good work, kid.</i>'},
 ],reward:{cash:80,resp:2,xp:60}},
]},
{title:'CHAPTER 2 — THE ASH WAR',missions:[
 {name:'Smoke Signals',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Ash hit three of our shops last night. Soot everywhere. Send a message.'},
  {t:'say',who:'',scene:'street',text:'A greaser guards Ash\'s supply shed. Brushes, ladders, <i>our</i> brushes.'},
  {t:'fight',foe:FOES.greaser,scene:'street'},
  {t:'choice',who:'',text:'The shed. What\'s the message?',opts:[
    {label:'💪 Torch it',req:'MUS 6',check:{stat:'mus',need:6},
     win:{text:'The shed burns beautifully. Ash\'s crew sweeps with sticks now.',g:{cash:50,resp:2,xp:15,heat:1}},
     lose:{text:'The lock holds. You leave a dent and your dignity.',g:{xp:5}}},
    {label:'🗣️ Turn his guy',req:'CHA 6',check:{stat:'cha',need:6},
     win:{text:'The greaser flips. "Ash never paid on time anyway." New ear on the inside.',g:{resp:2,xp:15}},
     lose:{text:'"Nice try, pretty boy." He spits at your shoes.',g:{xp:5}}},
    {label:'🚶 Walk away',g:{xp:5},then:[{t:'say',who:'YOU',text:'Message sent. The brush did the talking.'}]},
  ]},
 ],reward:{cash:60,resp:1,xp:50}},
 {name:'Ash Morano',boss:true,beats:[
  {t:'say',who:'ASH',scene:'roof',foe:'ash',text:'"So. The new broom. This town ain\'t big enough for two sweeps, pretty boy."'},
  {t:'fight',foe:FOES.ash,scene:'roof'},
  {t:'say',who:'SAL',scene:'club',text:'The war is over. Ash pays tribute now. Or Ash pays in teeth. <i>You did this.</i>'},
 ],reward:{cash:100,resp:3,xp:70}},
]},
{title:'CHAPTER 3 — CLEAN AIR',missions:[
 {name:'Paperwork',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Councilman Grey. "Clean Air Task Force." Fines. Padlocks. Inspectors at every flue. He\'s coming for us.'},
  {t:'choice',who:'',scene:'street',text:'An inspector eyes your brushes. Clipboard out.',opts:[
    {label:'🍀 Dodge the paperwork',req:'LCK 6',check:{stat:'lck',need:6},
     win:{text:'You\'re gone before the ink dries. The inspector fines a pigeon.',g:{resp:1,xp:15}},
     lose:{text:'Fined on the spot. The city thanks you for your contribution.',g:{cash:-40,xp:5,heat:1}}},
    {label:'🗣️ Charm offensive',req:'CHA 7',check:{stat:'cha',need:7},
     win:{text:'"My grandmother had a sweep," he sighs, and walks away.',g:{resp:1,xp:15}},
     lose:{text:'He is immune to charm. It\'s in the job description.',g:{cash:-40,xp:5}}},
  ]},
  {t:'say',who:'',scene:'street',text:'A Task Force goon padlocks Sal\'s favorite flue.'},
  {t:'fight',foe:FOES.goon,scene:'street'},
 ],reward:{cash:80,resp:2,xp:60}},
 {name:'The Councilman',boss:true,beats:[
  {t:'say',who:'GREY',scene:'club',foe:'grey',text:'"Sweeps are a relic, my boy. The future is electric. And fined."'},
  {t:'fight',foe:FOES.grey,scene:'club'},
  {t:'say',who:'SAL',scene:'club',text:'Grey withdrew the task force this morning. Funny how that works.'},
 ],reward:{cash:200,resp:4,xp:80}},
]},
];
