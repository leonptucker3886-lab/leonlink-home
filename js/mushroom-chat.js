/* Mushroom Madness chat: Mushroom, LeonLink's friendly chat rep. Rule-based, family-friendly, no server. */
(function(){if(window.__llMush)return;window.__llMush=1;
var KB=[
 [/\b(hi|hello|hey|yo|sup|howdy)\b/,"Hey there, spore friend! I'm Mushroom, LeonLink's chat rep. Ask me about games, watches, ebooks, Kids Corner, horoscopes or anything on the site."],
 [/game|arcade|play/,"We've got a whole arcade! Check out the games here: <a href='/games.html'>Games</a>. They're built mobile-first, so they play great on your phone."],
 [/watch|watchline|top ?5|top five/,"Watch fans, this way: <a href='/watchline/'>Watchline</a> has our watch posts and Top 5 picks."],
 [/ebook|book|read|kindle|library|gutenberg/,"Our ebook store has Kindle picks, a Free Classics Library and an Open-Source Bookshelf: <a href='/ebooks.html'>Ebooks</a>."],
 [/horoscope|astrolog|zodiac|numerolog|tarot|fortune|moon|cauldron|got-?ursix/,"Visit <a href='/moons.html'>Moons &amp; Cauldrons</a> and let Col Got-ursix, the veteran mystic of ancient wars in the cosmos, read your stars, numbers and tarot. Just for fun!"],
 [/kid|child|pet|nursery|family/,"Kids Corner is our family zone with games, a virtual pet and more: <a href='/kids/'>Kids Corner</a>."],
 [/blog|post|article|journal|news/,"Fresh reads live on the <a href='/blog.html'>Blog</a> and the <a href='/journal/'>Journal</a>."],
 [/software|tool|app|invoice|estimate|qr/,"Free tools and software: <a href='/software.html'>Software</a> and <a href='/free-tools.html'>Free Tools</a> (invoice, estimate and QR code generators)."],
 [/how ?to|guide|tutorial/,"Step-by-step guides are in <a href='/how-to/'>How-To</a>."],
 [/glow|coin|afterglow|crypto/,"Glow coins are play money for fun on LeonLink. Learn more in the <a href='/whitepaper.html'>whitepaper</a> or visit <a href='https://afterglow.leonlink.net'>Afterglow</a>."],
 [/amazon|affiliate|buy|shop|price|deal/,"Some links on LeonLink are Amazon affiliate links. If you buy through them, we may earn a small commission at no extra cost to you. Prices are always set on Amazon."],
 [/who|about|leon|owner|contact|email/,"LeonLink is Leon's corner of the web. Meet the crew on the <a href='/about.html'>About</a> page."],
 [/mushroom|your name|who are you/,"I'm Mushroom! A fun-guy who lives on LeonLink and helps folks find their way. 🍄"],
 [/joke|funny|laugh/,"Why did the mushroom get invited to every party? Because he's a fun-guy! 🍄"],
 [/thank|thx|cool|awesome|nice/,"Anytime! Holler if you need anything else. 🍄"],
 [/bye|later|goodbye|see ya/,"Catch you later, spore friend! 🍄"]
];
var BAD=/\b(f+u+c+k|shit|bitch|ass(hole)?|damn|dick|cock|pussy|sex|porn|nude|kill|suicide|drug|weed|cocaine|gun|nazi|racist|slur)\w*/i;
var css="#mush-btn{position:fixed;right:16px;bottom:84px;z-index:9998;width:60px;height:60px;border-radius:50%;border:2px solid #ff4fd8;background:radial-gradient(circle at 30% 30%,#3a1a5c,#140a24);box-shadow:0 0 18px #ff4fd8aa;font-size:32px;cursor:pointer;animation:mushb 3s ease-in-out infinite}@keyframes mushb{50%{transform:translateY(-5px)}}#mush-box{position:fixed;right:16px;bottom:154px;z-index:9999;width:min(340px,calc(100vw - 32px));height:440px;max-height:70vh;display:none;flex-direction:column;background:#170d2b;border:1px solid #ff4fd866;border-radius:16px;box-shadow:0 10px 40px #000a,0 0 24px #22f0ff33;font-family:'DM Sans',system-ui,sans-serif;color:#eee;overflow:hidden}#mush-box.open{display:flex}#mush-h{padding:12px 14px;background:linear-gradient(90deg,#ff4fd8,#8a3cff);font-weight:700;display:flex;justify-content:space-between;align-items:center}#mush-h small{display:block;font-weight:400;opacity:.85;font-size:12px}#mush-x{background:none;border:0;color:#fff;font-size:20px;cursor:pointer}#mush-m{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}.mm{max-width:85%;padding:8px 12px;border-radius:14px;font-size:14px;line-height:1.4}.mm.b{background:#2a1a47;align-self:flex-start;border-bottom-left-radius:4px}.mm.u{background:#22f0ff;color:#0b0b14;align-self:flex-end;border-bottom-right-radius:4px}.mm a{color:#ffd15c}#mush-q{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px}#mush-q button{background:#2a1a47;color:#22f0ff;border:1px solid #22f0ff55;border-radius:999px;padding:4px 10px;font-size:12px;cursor:pointer}#mush-f{display:flex;border-top:1px solid #ffffff1a}#mush-i{flex:1;background:transparent;border:0;color:#fff;padding:12px;font-size:14px;outline:none}#mush-s{background:#ff4fd8;border:0;color:#fff;padding:0 16px;font-weight:700;cursor:pointer}";
var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
var b=document.createElement('button');b.id='mush-btn';b.setAttribute('aria-label','Chat with Mushroom');b.textContent='🍄';
var x=document.createElement('div');x.id='mush-box';x.setAttribute('role','dialog');x.setAttribute('aria-label','Mushroom Madness chat');
x.innerHTML="<div id='mush-h'><div>🍄 Mushroom Madness<small>Mushroom, your LeonLink guide</small></div><button id='mush-x' aria-label='Close'>×</button></div><div id='mush-m' aria-live='polite'></div><div id='mush-q'></div><form id='mush-f'><input id='mush-i' maxlength='200' placeholder='Ask Mushroom something…' autocomplete='off'><button id='mush-s'>Send</button></form>";
document.body.appendChild(b);document.body.appendChild(x);
var M=x.querySelector('#mush-m'),I=x.querySelector('#mush-i');
function add(t,c){var d=document.createElement('div');d.className='mm '+c;if(c=='u')d.textContent=t;else d.innerHTML=t;M.appendChild(d);M.scrollTop=M.scrollHeight}
function reply(q){var l=q.toLowerCase();
 if(BAD.test(l))return "Whoa, let's keep it family-friendly, spore friend! 🍄 I can help with games, watches, ebooks, Kids Corner or horoscopes.";
 for(var k=0;k<KB.length;k++)if(KB[k][0].test(l))return KB[k][1];
 return "Hmm, that one's a little outside my patch. 🍄 Try asking about games, watches, ebooks, Kids Corner, horoscopes, tools or the blog, or tap a button below.";}
function ask(q){q=(q||'').trim();if(!q)return;add(q,'u');setTimeout(function(){add(reply(q),'b')},400)}
['Games','Watches','Ebooks','Horoscopes','Kids Corner','Tell me a joke'].forEach(function(t){var c=document.createElement('button');c.type='button';c.textContent=t;c.onclick=function(){ask(t)};x.querySelector('#mush-q').appendChild(c)});
var greeted=0;
b.onclick=function(){x.classList.toggle('open');if(!greeted){greeted=1;add("Hi! I'm Mushroom 🍄 Welcome to Mushroom Madness. What can I help you find on LeonLink?",'b')}if(x.classList.contains('open'))I.focus()};
x.querySelector('#mush-x').onclick=function(){x.classList.remove('open')};
x.querySelector('#mush-f').onsubmit=function(e){e.preventDefault();ask(I.value);I.value=''};
})();
