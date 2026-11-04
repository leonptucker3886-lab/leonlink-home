// LeonLink Kids Pet - Economy v1.1 (Task 5, piece 1): kindness safety net + small care rewards.
// Rules: ages 3-6, no real money, no pay pressure, pet never dies, nothing leaves the device.
(function(){
  if(typeof S==='undefined')return;
  var DAY=new Date().toDateString();
  function econ(){if(!S.econ||S.econ.day!==DAY)S.econ={day:DAY,care:0,gifts:0,lastGift:(S.econ&&S.econ.lastGift)||0};return S.econ}
  var CARE_CAP=10, GIFT_GAP=30*60000, GIFT_MAX=3;
  // 1) Safety net: a hungry pet with no food and too few coins gets a free apple (max 3/day, 30 min apart).
  function hasFood(){return SHOP.food.some(function(i){return S.inv[i.id]>0})}
  function safetyNet(){
    if(!S.pet)return false;var e=econ();
    if(S.st.h>=40||hasFood()||S.tokens>=5)return false;
    if(e.gifts>=GIFT_MAX||Date.now()-e.lastGift<GIFT_GAP)return false;
    S.inv.apple=(S.inv.apple||0)+1;e.gifts++;e.lastGift=Date.now();save();
    try{render()}catch(x){}
    pop('\uD83C\uDF81 \uD83C\uDF4E','A free apple for '+(S.name||'your pet')+'!');return true}
  // 2) Care reward: +1 coin per caring action (food, wash, toys), capped at 10 a day.
  if(typeof use==='function'){var _use=use;window.use=use=function(id){var had=S.inv[id]>0;_use.apply(this,arguments);
    if(had){var e=econ();if(e.care<CARE_CAP){e.care++;S.tokens+=1;save()}}}}
  // Wrap buy: if a child taps food they can't afford, help instead of only saying "not enough".
  if(typeof buy==='function'){var _buy=buy;window.buy=buy=function(id){var i=ALL.find(function(x){return x.id===id});
    if(i&&S.tokens<i.p&&SHOP.food.indexOf(i)>=0&&safetyNet())return;return _buy.apply(this,arguments)}}
  window.LeonLinkEconomy={version:'1.1',careCap:CARE_CAP,giftMax:GIFT_MAX,check:safetyNet,state:function(){return econ()}};
  setInterval(safetyNet,60000);setTimeout(safetyNet,5000);
})();
