/* leonlink-profile.js — shared LeonLink game profile client.
 * Usage:
 *   <script src="https://www.leonlink.net/js/leonlink-profile.js" defer></script>
 *   LLProfile.init('huntline');
 *   LLProfile.unlock('first_hunt');      // milestone, once per account (server-enforced)
 *   LLProfile.score(1234);               // best score + play count
 *   LLProfile.onReady(function(st){ st.signedIn, st.user });
 * Guests: events queue in localStorage and sync the next time they play signed in.
 * Never throws into the game; any failure is silent.
 */
(function (w) {
  'use strict';
  if (w.LLProfile) return;
  var URL_ = 'https://cjtutkvhyzjsgclqvylg.supabase.co';
  var KEY = 'sb_publishable_E48ovT9wWxduLxnzPXL_5g_SnNl2rqz';
  var ESM = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  var HUB = 'https://www.leonlink.net';
  var game = null, sb = null, user = null, ready = false, waiters = [], titles = {};
  function safe(f) { try { f(); } catch (e) {} }
  function qKey() { return 'llp_q_' + game; }
  function loadQ() { try { return JSON.parse(localStorage.getItem(qKey()) || '[]'); } catch (e) { return []; } }
  function saveQ(q) { try { localStorage.setItem(qKey(), JSON.stringify(q.slice(-200))); } catch (e) {} }
  function seenKey() { return 'llp_seen_' + game; }
  function seen() { try { return JSON.parse(localStorage.getItem(seenKey()) || '{}'); } catch (e) { return {}; } }

  function toast(msg) {
    safe(function () {
      var d = document.createElement('div');
      d.setAttribute('role', 'status');
      d.textContent = msg;
      d.style.cssText = 'position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:99999;background:#141d27;color:#ffd970;border:1px solid #ffd970;border-radius:999px;padding:8px 16px;font:700 14px system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.4);pointer-events:none;transition:opacity .4s';
      document.body.appendChild(d);
      setTimeout(function () { d.style.opacity = '0'; }, 2600);
      setTimeout(function () { safe(function () { d.remove(); }); }, 3100);
    });
  }

  function client() {
    if (sb) return Promise.resolve(sb);
    return import(ESM).then(function (m) { sb = m.createClient(URL_, KEY); return sb; });
  }

  function send(ev) {
    if (!sb || !user) return Promise.reject(new Error('offline'));
    var p = ev.t === 'm'
      ? sb.rpc('unlock_milestone', { p_game: game, p_key: ev.k })
      : sb.rpc('report_score', { p_game: game, p_score: Math.floor(ev.s) });
    return p.then(function (r) { if (r && r.error) throw r.error; return r; });
  }

  function flush() {
    var q = loadQ(); if (!q.length || !user) return;
    saveQ([]);
    q.reduce(function (pr, ev) {
      return pr.then(function () { return send(ev).catch(function () { var cur = loadQ(); cur.push(ev); saveQ(cur); }); });
    }, Promise.resolve());
  }

  function finish() {
    ready = true;
    var st = { signedIn: !!user, user: user };
    waiters.splice(0).forEach(function (f) { safe(function () { f(st); }); });
    flush();
  }

  function init(g) {
    if (game) return;
    game = String(g || '').toLowerCase();
    client().then(function (c) {
      c.from('game_milestones').select('key,title,xp').eq('game', game)
        .then(function (r) { (r.data || []).forEach(function (m) { titles[m.key] = m; }); }, function () {});
      return c.auth.getSession().then(function (r) {
        user = r && r.data && r.data.session && r.data.session.user || null;
        if (user || location.origin === HUB || !w.LLID) return finish();
        // Subdomain: pull the shared session from the hub.
        w.LLID.boot({
          onSession: function () { c.auth.getSession().then(function (r2) { user = r2.data.session && r2.data.session.user || null; finish(); }, finish); },
          onSignedOut: finish
        });
      });
    }).catch(finish);
  }

  function unlock(k) {
    if (!game || !k) return;
    var s = seen(); if (s[k]) return; // already celebrated on this device
    s[k] = 1; try { localStorage.setItem(seenKey(), JSON.stringify(s)); } catch (e) {}
    var m = titles[k];
    toast('🏆 ' + (m ? m.title + ' +' + m.xp + ' XP' : 'Milestone unlocked') + (user ? '' : ' · sign in to save'));
    var ev = { t: 'm', k: k };
    if (user) send(ev).catch(function () { var q = loadQ(); q.push(ev); saveQ(q); });
    else { var q = loadQ(); q.push(ev); saveQ(q); }
  }

  function score(n) {
    if (!game || !(n >= 0)) return;
    var ev = { t: 's', s: n };
    if (user) send(ev).catch(function () { var q = loadQ(); q.push(ev); saveQ(q); });
    else { var q = loadQ(); q.push(ev); saveQ(q); }
  }

  function onReady(f) { if (ready) safe(function () { f({ signedIn: !!user, user: user }); }); else waiters.push(f); }
  function signInURL() { return HUB + '/account?next=' + encodeURIComponent(location.href); }

  w.LLProfile = { init: init, unlock: unlock, score: score, onReady: onReady, signInURL: signInURL };
})(window);
