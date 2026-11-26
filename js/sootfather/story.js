"use strict";
/* Sootfather - story.js (split from sootfather.html, Phase 0; behaviour unchanged) */

const FOES={
  punk:{name:'Punk Kid',art:'punk',hp:16,atk:4,will:3,bribe:20,cash:25,line:'"Toll\'s a dollar, sweep. Or a finger. Your pick."',convinced:'"Okay! Okay. Just... don\'t tell Sal my name."'},
  greaser:{name:'Greaser',art:'punk',hp:26,atk:7,will:4,bribe:40,cash:40,line:'"Ash sends his regards. The last sweep got them in a sack."',convinced:'"Don\'t tell Ash. He\'ll brick me into a flue."'},
  brick:{name:'Brick',art:'brick',hp:42,atk:8,will:5,bribe:120,cash:90,boss:true,line:'"Fresh soot on your boots. Whose house did you burn tonight?"',convinced:'"Brick... is done bleeding for Morano."'},
  goon:{name:'Task Force Goon',art:'goon',hp:36,atk:9,will:6,bribe:70,cash:50,line:'"Cease and desist, citizen. Or just cease."',convinced:'"My pension ain\'t worth dying on a roof."'},
  ash:{name:'Ash Morano',art:'ash',hp:62,atk:11,will:7,bribe:200,cash:150,boss:true,line:'"Every flue in this town\'s got a dead man in it. Want to be the next one?"',convinced:'"Fine. The east side is yours. Sleep with the damper shut."'},
  grey:{name:'Councilman Grey',art:'grey',hp:85,atk:12,will:9,bribe:300,cash:300,boss:true,line:'"Your kind swept my chimney once. They found him at the bottom of it. Still holding the brush."',convinced:'"Go on, then. Ashbusten will just elect another one of me."'},
};
const CHAPTERS=[
{title:'CHAPTER 1 — TRIBUTE DAY',missions:[
 {name:'The Rounds',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Sal runs every flue in this town. Bakeries, barbers, brownstones. The ones that don\'t pay catch fire.'},
  {t:'say',who:'SAL',text:'The chimneys pay. The shops pay. <i>You</i> collect. That\'s the business, kid. Don\'t embarrass me. The last kid who did is still up a chimney.'},
  {t:'say',who:'',scene:'street',text:'<b>Luigi\'s Bakery.</b> The fee is $40. Luigi is "counting". His daughter coughs in the back room.'},
  {t:'choice',who:'',text:'How do you collect?',opts:[
    {label:'🗣️ Talk nice',req:'CHA 5',check:{stat:'cha',need:5},
     win:{text:'Luigi pays $50 with shaking hands. "For the family. Please."',g:{cash:50,resp:1,xp:10}},
     lose:{text:'Luigi shrugs. "$40. Take it."',g:{cash:40,xp:5}}},
    {label:'💪 Talk loud',req:'MUS 5',check:{stat:'mus',need:5},
     win:{text:'You lean on the counter. You break a jar. Luigi pays $60 and doesn\'t look up.',g:{cash:60,resp:-1,xp:10}},
     lose:{text:'Luigi calls your bluff. "$40."',g:{cash:40,xp:5}}},
    {label:'🤝 Just take the $40',g:{cash:40,xp:5},then:[{t:'say',who:'',text:'Clean. Quiet. Nobody bleeds. The family likes quiet.'}]},
  ]},
  {t:'say',who:'',scene:'street',text:'An alley. A punk kid has a delivery boy pinned, blade at his ear. <b>Family turf.</b>'},
  {t:'fight',foe:FOES.punk,scene:'street'},
  {t:'say',who:'YOU',text:'Not on our street. Nobody cuts anybody here but us.'},
  {t:'say',who:'',scene:'street',text:'<b>The barber.</b> He counts the $40 twice. Slowly. Too slowly.'},
  {t:'choice',who:'',text:'Something\'s short.',opts:[
    {label:'🍀 Trust your gut',req:'LCK 5',check:{stat:'lck',need:5},
     win:{text:'You catch the short count. He pays double, razor trembling on the counter.',g:{cash:80,resp:1,xp:10}},
     lose:{text:'False alarm. He pays $40 and you feel silly.',g:{cash:40,xp:5}}},
    {label:'🤝 Let it slide',g:{cash:40,xp:5},then:[{t:'say',who:'VINNIE',text:'Soft. Sal notices soft. He notices everything.'}]},
  ]},
 ],reward:{cash:40,resp:1,xp:40}},
 {name:'Brick',boss:true,beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Ash Morano\'s crew is sweeping OUR chimneys. Brick broke two of our boys\' hands. Docks. Tonight.'},
  {t:'say',who:'BRICK',scene:'street',foe:'brick',text:'"You\'re the new broom? Turn around, or they\'ll sweep you out of the canal."'},
  {t:'fight',foe:FOES.brick,scene:'street'},
  {t:'say',who:'SAL',scene:'club',text:'Brick won\'t climb again. Ash knows our name now. <i>Wash your hands, kid.</i>'},
 ],reward:{cash:80,resp:2,xp:60}},
]},
{title:'CHAPTER 2 — THE ASH WAR',missions:[
 {name:'Smoke Signals',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Ash torched three of our shops last night. The baker\'s boy didn\'t get out. Send a message.'},
  {t:'say',who:'',scene:'street',text:'A greaser guards Ash\'s supply shed. Brushes, ladders, <i>our</i> brushes. Still sticky.'},
  {t:'fight',foe:FOES.greaser,scene:'street'},
  {t:'choice',who:'',text:'The shed. What\'s the message?',opts:[
    {label:'💪 Torch it',req:'MUS 6',check:{stat:'mus',need:6},
     win:{text:'The shed burns. Someone inside was sleeping. You hear it stop.',g:{cash:50,resp:2,xp:15,heat:1}},
     lose:{text:'The lock holds. You leave blood on the latch.',g:{xp:5}}},
    {label:'🗣️ Turn his guy',req:'CHA 6',check:{stat:'cha',need:6},
     win:{text:'The greaser flips. "Ash never paid on time anyway." New ear on the inside. He\'ll be dead in a week.',g:{resp:2,xp:15}},
     lose:{text:'"Nice try, sweep." He spits blood at your shoes.',g:{xp:5}}},
    {label:'🚶 Walk away',g:{xp:5},then:[{t:'say',who:'YOU',text:'Message sent. I stopped counting the bodies. It\'s the crying I can\'t shake.'}]},
  ]},
 ],reward:{cash:60,resp:1,xp:50}},
 {name:'Ash Morano',boss:true,beats:[
  {t:'say',who:'ASH',scene:'roof',foe:'ash',text:'"So. The new broom. I\'ve got nothing against you, kid. Sal pays by the body, and so do I."'},
  {t:'fight',foe:FOES.ash,scene:'roof'},
  {t:'say',who:'SAL',scene:'club',text:'The war is over. Ash pays tribute now, or Ash pays in teeth. <i>You\'re ours now, kid.</i>'},
 ],reward:{cash:100,resp:3,xp:70}},
]},
{title:'CHAPTER 3 — CLEAN AIR',missions:[
 {name:'Paperwork',beats:[
  {t:'say',who:'VINNIE',scene:'club',text:'Councilman Grey. "Clean Air Task Force." Fines. Padlocks. Inspectors at every flue. He\'s coming for us. Men have gone missing in his cells.'},
  {t:'choice',who:'',scene:'street',text:'An inspector eyes your brushes. Clipboard out.',opts:[
    {label:'🍀 Dodge the paperwork',req:'LCK 6',check:{stat:'lck',need:6},
     win:{text:'You\'re gone before the ink dries. The inspector finds someone else to ruin.',g:{resp:1,xp:15}},
     lose:{text:'Fined on the spot. He smiles while he writes it. He enjoys this.',g:{cash:-40,xp:5,heat:1}}},
    {label:'🗣️ Charm offensive',req:'CHA 7',check:{stat:'cha',need:7},
     win:{text:'"My grandmother had a sweep," he whispers. "They found him in the bricks." He walks away.',g:{resp:1,xp:15}},
     lose:{text:'He doesn\'t blink. Men like him stopped feeling years ago.',g:{cash:-40,xp:5}}},
  ]},
  {t:'say',who:'',scene:'street',text:'A Task Force goon padlocks Sal\'s flue. The family inside is still in there.'},
  {t:'fight',foe:FOES.goon,scene:'street'},
 ],reward:{cash:80,resp:2,xp:60}},
 {name:'The Councilman',boss:true,beats:[
  {t:'say',who:'GREY',scene:'club',foe:'grey',text:'"You climbed all this way to save a town that sold your mother for coal. I\'m not your enemy, child. I\'m the receipt."'},
  {t:'fight',foe:FOES.grey,scene:'club'},
  {t:'say',who:'SAL',scene:'club',text:'Grey\'s seat is empty this morning. Something worse is already waiting in the bricks.'},
 ],reward:{cash:200,resp:4,xp:80}},
]},
];

