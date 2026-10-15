/* ll-id.js — LeonLink ID: one login for every leonlink.net property.
 *
 * Drop-in for APP surfaces only (Dashline, Linkline editor, Ledgerline login).
 * HARD RULE: NEVER load this on user-content surfaces (Linkline /p renderer,
 * public portfolio pages, game pages that don't need identity).
 *
 * API:
 *   LLID.boot({ onSession(user, profile), onSignedOut(), timeoutMs })
 *     Embeds a hidden iframe to the apex hub (https://www.leonlink.net/__llid),
 *     receives the canonical Supabase session via origin-checked postMessage,
 *     writes it to this origin's standard Supabase storage key, then resolves
 *     the session and the arc_profiles row through a stock Supabase client.
 *     Any failure (hub unreachable, no session, CDN blocked) -> onSignedOut()
 *     and the host app is left exactly as it was. Never throws into the host.
 *   LLID.accountURL(next) -> 'https://www.leonlink.net/account?next=...'
 *   LLID.validNext(next)  -> sanitized next URL, or null (open-redirect guard)
 *   LLID.signOut(cb)      -> hub sign-out + local session clear (best effort)
 *
 * Failure posture mirrors core/link.js: inert on any failure, guests/signed-out
 * users see zero behavior change.
 */
(function (global) {
  'use strict';
  if (global.LLID) return; // already loaded

  var HUB_ORIGIN = 'https://www.leonlink.net';
  var HUB_PATHS = ['/__llid', '/__llid.html']; // extension-less first, .html fallback
  var ORIGIN_RE = /^https:\/\/([a-z0-9-]+\.)*leonlink\.net$/;
  var PROJECT_URL = 'https://cjtutkvhyzjsgclqvylg.supabase.co';
  var PUBLISHABLE_KEY = 'sb_publishable_E48ovT9wWxduLxnzPXL_5g_SnNl2rqz';
  var SUPA_ESM = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  var DEFAULT_TIMEOUT = 3500;

  var booted = false;

  /* Open-redirect guard: absolute https URL on a leonlink.net host, or a
   * root-relative path. Everything else -> null. */
  function validNext(next) {
    if (typeof next !== 'string') return null;
    next = next.trim();
    if (!next || next.length > 2048) return null;
    if (/[\r\n\t\\]/.test(next)) return null; // \ is a path separator per WHATWG URL
    var lower = next.toLowerCase();
    if (lower.indexOf('javascript:') === 0) return null;
    if (next.charAt(0) === '/') {
      return next.charAt(1) === '/' ? null : next; // refuse protocol-relative
    }
    var m = /^https:\/\/([^\/:?#\s]+)(\/[^?#\s]*)?([?#][^\s]*)?$/.exec(lower);
    if (!m) return null;
    if (!ORIGIN_RE.test('https://' + m[1])) return null;
    return next;
  }

  function safe(fn) { try { fn(); } catch (e) {} }

  function getClient() {
    try {
      var seam = global.__LLID_SUPABASE__; // test seam only; never set in production
      if (seam && seam.createClient) return Promise.resolve(seam.createClient(PROJECT_URL, PUBLISHABLE_KEY));
    } catch (e) {}
    return import(SUPA_ESM).then(function (mod) { return mod.createClient(PROJECT_URL, PUBLISHABLE_KEY); });
  }

  function clearLocalSession() {
    try {
      var ls = global.localStorage, kill = [], i, k;
      for (i = 0; i < ls.length; i++) kill.push(ls.key(i));
      for (i = 0; i < kill.length; i++) {
        k = kill[i];
        if (/^sb-[a-z0-9-]+-auth-token$/.test(k)) { try { ls.removeItem(k); } catch (e) {} }
      }
    } catch (e) {}
  }

  function boot(opts) {
    opts = opts || {};
    if (booted) return;
    booted = true;
    var timeoutMs = (typeof opts.timeoutMs === 'number' && opts.timeoutMs > 0) ? opts.timeoutMs : DEFAULT_TIMEOUT;
    var settled = false, timer = null, pinger = null, frame = null;

    function signedOut() { if (!settled) { settled = true; safe(opts.onSignedOut); } }

    function cleanup() {
      if (timer) { clearTimeout(timer); timer = null; }
      if (pinger) { clearInterval(pinger); pinger = null; }
      try { global.removeEventListener('message', onMsg); } catch (e) {}
      try { if (frame && frame.parentNode) frame.parentNode.removeChild(frame); } catch (e) {}
    }

    function onMsg(ev) {
      var d;
      try {
        if (ev.origin !== HUB_ORIGIN) return;               // strict: the apex hub only
        if (!frame || ev.source !== frame.contentWindow) return;
        d = ev.data || {};
        if (!d || d.type !== 'llid-session') return;
      } catch (e) { return; }
      cleanup();
      settled = true;
      if (!(d.key && typeof d.value === 'string' && d.value)) { safe(opts.onSignedOut); return; }
      try { global.localStorage.setItem(d.key, d.value); } catch (e) {}
      getClient()
        .then(function (sb) {
          return sb.auth.getSession().then(function (r) {
            var user = r && r.data && r.data.session && r.data.session.user;
            if (!user) throw new Error('no-user');
            return sb.from('arc_profiles')
              .select('nickname,tokens,avatar,frame,color,title')
              .eq('id', user.id).maybeSingle()
              .then(function (pr) { return { user: user, profile: (pr && pr.data) || null }; });
          });
        })
        .then(function (res) { safe(function () { opts.onSession(res.user, res.profile); }); })
        .catch(function () { safe(opts.onSignedOut); });
    }

    function hello() {
      try { if (frame && frame.contentWindow) frame.contentWindow.postMessage({ type: 'llid-hello' }, HUB_ORIGIN); } catch (e) {}
    }

    try {
      var doc = global.document;
      frame = doc.createElement('iframe');
      frame.setAttribute('aria-hidden', 'true');
      frame.setAttribute('tabindex', '-1');
      frame.style.cssText = 'position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;border:0!important;';
      var pathIx = 0;
      frame.src = HUB_ORIGIN + HUB_PATHS[pathIx];
      global.addEventListener('message', onMsg);
      try {
        frame.addEventListener('load', hello);
      } catch (e) {}
      frame.onerror = function () {
        pathIx++;
        if (pathIx < HUB_PATHS.length) { try { frame.src = HUB_ORIGIN + HUB_PATHS[pathIx]; } catch (e) {} }
        // otherwise: wait for the timeout -> signedOut (inert)
      };
      (doc.body || doc.documentElement).appendChild(frame);
      hello();
      pinger = setInterval(hello, 500);
      timer = setTimeout(function () { cleanup(); signedOut(); }, timeoutMs);
    } catch (e) { cleanup(); signedOut(); }
  }

  function accountURL(next) {
    var n = validNext(next);
    return HUB_ORIGIN + '/account' + (n ? '?next=' + encodeURIComponent(n) : '');
  }

  function signOut(cb) {
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      getClient()
        .then(function (sb) { return sb.auth.signOut().catch(function () {}); })
        .catch(function () {})
        .then(function () { clearLocalSession(); safe(cb); });
    }
    var frame2 = null, timer2 = null;
    function onSignoutMsg(ev) {
      try {
        if (ev.origin === HUB_ORIGIN && frame2 && ev.source === frame2.contentWindow &&
            ev.data && ev.data.type === 'llid-signed-out') {
          if (timer2) clearTimeout(timer2);
          try { global.removeEventListener('message', onSignoutMsg); } catch (e) {}
          try { if (frame2.parentNode) frame2.parentNode.removeChild(frame2); } catch (e) {}
          finish();
        }
      } catch (e) {}
    }
    try {
      var doc = global.document;
      frame2 = doc.createElement('iframe');
      frame2.setAttribute('aria-hidden', 'true');
      frame2.style.cssText = 'position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;border:0!important;';
      frame2.src = HUB_ORIGIN + HUB_PATHS[0];
      global.addEventListener('message', onSignoutMsg);
      try {
        frame2.addEventListener('load', function () {
          try { frame2.contentWindow.postMessage({ type: 'llid-signout' }, HUB_ORIGIN); } catch (e) {}
        });
      } catch (e) {}
      (doc.body || doc.documentElement).appendChild(frame2);
      timer2 = setTimeout(finish, 2500); // hub unreachable: still clear local
    } catch (e) { finish(); }
  }

  global.LLID = {
    boot: boot,
    accountURL: accountURL,
    validNext: validNext,
    signOut: signOut,
    HUB_ORIGIN: HUB_ORIGIN
  };
})(typeof window !== 'undefined' ? window : globalThis);
