/* glow-account.js - LeonLink sign-in, matching Afterglow's Glow Link.
 * Same Supabase project, same email+password account, same shared Glow pile
 * (arc_profiles.tokens, moved only via arc_glow_delta). Inert on failure.
 * API: window.LLGlow = { ready, user(), balance(), delta(n,reason)->Promise<bal|null>, on(fn), open() }
 */
(function(){
if(window.LLGlow)return;
var PROJECT_URL='https://cjtutkvhyzjsgclqvylg.supabase.co';
var PUBLISHABLE_KEY='sb_publishable_E48ovT9wWxduLxnzPXL_5g_SnNl2rqz';
var SUPA_ESM='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
var sb=null,user=null,bal=null,subs=[],btn=null,readyRes;
var ready=new Promise(function(r){readyRes=r});
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function emit(){paint();subs.forEach(function(f){try{f(user,bal)}catch(e){}})}
function who(){return String((user&&user.user_metadata&&user.user_metadata.nickname)||(user&&user.email)||'Account').split('@')[0].slice(0,14)}
var css='.gacct{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;min-height:38px;border-radius:999px;border:1px solid rgba(34,240,255,.55);background:rgba(34,240,255,.08);color:#e8fbff;font:800 14px system-ui,sans-serif;cursor:pointer;box-shadow:0 0 12px rgba(34,240,255,.25);margin-left:6px;white-space:nowrap}.gacct:hover{background:rgba(34,240,255,.18)}.gacct .dot{width:8px;height:8px;border-radius:50%;background:#b8ff3b;box-shadow:0 0 8px #b8ff3b}.gacct .gb{opacity:.8;font-weight:700}'+
'.gam-bg{position:fixed;inset:0;z-index:100000;background:rgba(4,4,10,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px}.gam{width:100%;max-width:400px;background:#11111c;border:1px solid #26263d;border-radius:18px;padding:22px;color:#fff;font:15px system-ui,sans-serif;box-shadow:0 0 40px rgba(255,61,200,.25)}.gam h2{margin:0 0 6px;font-size:21px}.gam .dim{color:#a0a2c2;font-size:14px;line-height:1.45}.gam label{display:block;margin:10px 0 3px;font-size:13px;opacity:.75}.gam input{width:100%;box-sizing:border-box;padding:12px;border-radius:10px;border:1px solid #26263d;background:rgba(255,255,255,.05);color:#fff;font-size:15px}.gam input:focus{outline:none;border-color:#22f0ff}.gam .acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.gam .b{flex:1;min-height:44px;padding:10px 14px;border-radius:12px;border:1px solid #26263d;background:rgba(255,255,255,.06);color:#fff;font-weight:800;cursor:pointer}.gam .b.pri{background:linear-gradient(90deg,#22f0ff,#ff3dc8);color:#06060b;border:0}.gam .msg{min-height:20px;font-size:13.5px;color:#ff8a8a;margin-top:8px}.gam .row{display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid #26263d;margin-top:10px}.gam a{color:#22f0ff}@media(max-width:700px){.gacct .gb{display:none}}';
function paint(){if(!btn)return;if(!user){btn.innerHTML='Sign in';btn.title='Sign in with your Afterglow / LeonLink account'}else{btn.innerHTML='<i class="dot"></i><span>'+esc(who())+'</span>'+(bal!=null?'<span class="gb">'+Number(bal).toLocaleString('en-US')+' Glow</span>':'');btn.title='Account'}}
function mount(){if(btn)return;var bar=document.querySelector('.lnx');if(!bar)return;btn=document.createElement('button');btn.className='gacct';btn.type='button';btn.setAttribute('aria-label','Account');btn.onclick=open;var mb=bar.querySelector('.mb');bar.insertBefore(btn,mb||null);paint()}
function modal(html,wire){var bg=document.createElement('div');bg.className='gam-bg';bg.innerHTML='<div class="gam" role="dialog" aria-modal="true">'+html+'</div>';function close(){if(bg.parentNode)bg.parentNode.removeChild(bg)}bg.onclick=function(e){if(e.target===bg)close()};document.body.appendChild(bg);wire(bg.firstChild,close);var f=bg.querySelector('input');if(f)f.focus()}
function pull(){if(!sb||!user)return Promise.resolve(null);return sb.from('arc_profiles').select('tokens').eq('id',user.id).maybeSingle().then(function(r){if(r.error)return bal;bal=Math.max(0,Math.floor(Number((r.data&&r.data.tokens)||0)));return bal})}
function setUser(u){user=u||null;if(!user){bal=null;emit();return Promise.resolve()}return pull().then(emit)}
function delta(n,reason){n=Math.floor(n);if(!sb||!user||!n)return Promise.resolve(bal);if(n<0&&bal!=null&&bal<-n)return Promise.resolve(null);
return sb.rpc('arc_glow_delta',{p_delta:n,p_reason:String(reason||'leonlink').slice(0,80)}).then(function(r){if(r.error)return null;var b=Number(r.data);if(Number.isFinite(b)){bal=b;emit();return b}return null}).catch(function(){return null})}
function open(){
 if(!sb){alert('Sign-in is unavailable right now. Everything else still works.');return}
 if(user){modal('<h2>Glow linked</h2><p class="dim">Signed in as <b style="color:#fff">'+esc(user.email||'')+'</b>. One account and one Glow balance across LeonLink, Afterglow and Arcadeline.</p><div class="row"><span>Shared balance</span><b>'+(bal!=null?Number(bal).toLocaleString('en-US'):'...')+' Glow</b></div><p class="dim"><a href="/account.html">Profile &amp; avatar</a> &middot; <a href="https://afterglow.leonlink.net" target="_blank" rel="noopener">Play Afterglow</a></p><div class="acts"><button class="b" id="gout">Sign out</button><button class="b pri" id="gx">Close</button></div>',function(m,close){m.querySelector('#gx').onclick=close;m.querySelector('#gout').onclick=function(){sb.auth.signOut().catch(function(){}).then(function(){setUser(null);close()})}});return}
 modal('<h2>Link your Glow</h2><p class="dim">One account, one balance: LeonLink, Afterglow and Arcadeline share the same Glow pile. Sign in with your Afterglow account, or create a free one.</p><div class="msg" id="gmsg"></div><label for="gem">Email</label><input id="gem" type="email" autocomplete="email"><label for="gpw">Password</label><input id="gpw" type="password" autocomplete="current-password"><p class="dim" style="font-size:12.5px">New accounts need email confirmation. Check your inbox, then sign in.</p><div class="acts"><button class="b pri" id="ggo">Sign in</button><button class="b" id="gnew">Create account</button><button class="b" id="gx">Cancel</button></div>',function(m,close){
  var msg=function(t){m.querySelector('#gmsg').textContent=t};m.querySelector('#gx').onclick=close;
  function go(create){var email=m.querySelector('#gem').value.trim(),pw=m.querySelector('#gpw').value;if(!email||!pw){msg('Enter an email and password.');return}msg('...');
   (create?sb.auth.signUp({email:email,password:pw,options:{emailRedirectTo:location.origin+location.pathname}}):sb.auth.signInWithPassword({email:email,password:pw})).then(function(r){if(r.error){msg(r.error.message);return}if(!r.data.session){msg('Check your email to confirm, then sign in.');return}close();setUser(r.data.session.user)}).catch(function(){msg('Something went wrong. Try again.')})}
  m.querySelector('#ggo').onclick=function(){go(false)};m.querySelector('#gnew').onclick=function(){go(true)};
  m.querySelector('#gpw').onkeydown=function(e){if(e.key==='Enter')go(false)}})}
window.LLGlow={ready:ready,user:function(){return user},balance:function(){return bal},delta:delta,on:function(f){subs.push(f)},open:open};
function boot(){var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);mount();if(!btn)setTimeout(mount,800);
 import(SUPA_ESM).then(function(mod){sb=mod.createClient(PROJECT_URL,PUBLISHABLE_KEY);
  sb.auth.onAuthStateChange(function(ev,sess){if(ev==='SIGNED_IN'&&sess&&sess.user&&(!user||user.id!==sess.user.id))setUser(sess.user);if(ev==='SIGNED_OUT')setUser(null)});
  return sb.auth.getSession().then(function(r){return setUser(r.data&&r.data.session&&r.data.session.user)})}).catch(function(){sb=null}).then(function(){readyRes(true)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
