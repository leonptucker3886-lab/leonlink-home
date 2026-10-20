/* LeonLink post tools: Read next, Share, Comments on every blog post */
(function(){
if(window.__llPostTools)return;window.__llPostTools=1;
var path=location.pathname.replace(/\/index\.html$/,"/");
if(path.indexOf("/journal/")!==0)return;
var POSTS=[["/journal/afterlife.html", "Valhalla, Hades, Heaven and Hell"], ["/journal/love-or-trauma-bond.html", "Love, or a Trauma Bond?"], ["/journal/what-lives-on-us.html", "What Lives On Us"], ["/journal/why-do-we-dream.html", "Why Do We Dream?"], ["/journal/why-we-fall-for-the-wrong-people.html", "Why We Fall for the Wrong People"], ["/journal/are-computers-alive.html", "Are Computers Alive?"], ["/journal/humane-executions.html", "How Do You Kill Humanely?"], ["/journal/why-we-cheat.html", "Partner Cheating?"], ["/journal/clowns.html", "Clowns"], ["/journal/ghosts.html", "Are Ghosts Real?"], ["/journal/simulation.html", "Simulation?"], ["/journal/flat-prices.html", "Flat: Why I Charge Flat Prices"], ["/journal/website-audit.html", "The 5-Minute Website Audit"], ["/journal/world-vs-usa.html", "1 vs 195: Could the World Beat America?"], ["/journal/aliens.html", "Not Alone? What We Actually Know About Aliens"], ["/journal/abrahamic.html", "Abrahamic religions: three faiths, one family"], ["/journal/ai-you-didnt-ask-for.html", "You’re paying for AI you didn’t ask for"], ["/journal/commonwealth.html", "Commonwealth vs State: is there any difference?"], ["/journal/hidden-sites.html", "Hidden Sites"], ["/journal/long-way-home.html", "The Long Way Home"], ["/journal/per-seat-pricing.html", "Per-seat pricing is dying"], ["/journal/review-gating.html", "Review gating is fraud with a smile"], ["/journal/self-made-myth.html", "The Self-Made Myth"], ["/journal/seo-is-dead.html", "SEO died and nobody held a funeral"], ["/journal/trades-software-tax.html", "The trades software tax"], ["/journal/watches-under-3k.html", "Watches Under $3K"]], SERIES=[["/journal/life-of-an-ai-captain/letter-001.html", "Letter No. 1 — First Night in Command"], ["/journal/life-of-an-ai-captain/letter-002.html", "Letter No. 2 — Growing Pains"], ["/journal/life-of-an-ai-captain/letter-003.html", "Letter No. 3 — Already Behind"]];
function idx(L){for(var i=0;i<L.length;i++)if(L[i][0]===path)return i;return -1}
var nx,label="Read next";var si=idx(SERIES);
if(path==="/journal/life-of-an-ai-captain/"){nx=SERIES[0];label="Start the series"}
else if(si>-1){if(si<SERIES.length-1){nx=SERIES[si+1];label="Read the next letter"}else{nx=POSTS[0]}}
else{var pi=idx(POSTS);if(pi<0)return;nx=POSTS[(pi+1)%POSTS.length]}
var css=".llpt{max-width:760px;margin:36px auto 24px;padding:0 16px;font-family:'DM Sans',system-ui,sans-serif}.llpt .nx{display:block;text-decoration:none;border-radius:16px;padding:18px 20px;background:linear-gradient(135deg,#22f0ff22,#ff4fd822);border:1px solid #ffffff2a;color:inherit}.llpt .nx small{display:block;text-transform:uppercase;letter-spacing:.14em;font-size:.75rem;opacity:.8}.llpt .nx b{display:block;font-size:1.15rem;margin-top:4px}.llpt .sh{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0}.llpt .sh a,.llpt .sh button{flex:1 1 120px;min-height:44px;border-radius:999px;border:1px solid #ffffff33;background:#ffffff10;color:inherit;font:600 .95rem inherit;cursor:pointer;text-decoration:none;display:flex;align-items:center;justify-content:center}.llpt h3{margin:22px 0 10px}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var url=location.origin+path,ttl=document.title,e=encodeURIComponent;
var w=document.createElement("section");w.className="llpt";w.setAttribute("aria-label","Read next, share and comment");
w.innerHTML='<a class="nx" href="'+nx[0]+'"><small>'+label+' &rarr;</small><b>'+nx[1].replace(/</g,"&lt;")+'</b></a>'+
'<div class="sh"><button type="button" class="s1">Share</button><a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url='+e(url)+'&text='+e(ttl)+'">X</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+e(url)+'">Facebook</a><button type="button" class="s2">Copy link</button></div>'+
'<h3 id="comments">Comments</h3><div class="gc"></div>';
var anchor=document.getElementById("real-talk")||document.querySelector("main .ooc")||document.querySelector("main article")||document.querySelector("article");
if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(w,anchor.nextSibling);else(document.querySelector("main")||document.body).appendChild(w);
function copy(b){(navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){b.textContent="Link copied"},function(){prompt("Copy this link",url)})}
w.querySelector(".s2").onclick=function(){copy(this)};
w.querySelector(".s1").onclick=function(){if(navigator.share)navigator.share({title:ttl,url:url}).catch(function(){});else copy(w.querySelector(".s2"))};
var g=document.createElement("script");g.src="https://giscus.app/client.js";g.async=true;g.crossOrigin="anonymous";
var A={"data-repo":"leonptucker3886-lab/leonlink-home","data-repo-id":"R_kgDOU3DSKw","data-category":"General","data-category-id":"DIC_kwDOU3DSK84DJE4T","data-mapping":"pathname","data-strict":"0","data-reactions-enabled":"1","data-emit-metadata":"0","data-input-position":"top","data-theme":"dark","data-lang":"en","data-loading":"lazy"};
for(var k in A)g.setAttribute(k,A[k]);w.querySelector(".gc").appendChild(g);
})();
