"use strict";

/* ============================================================
   Botline — core
   State, storage, Firebase sync, identity, job mutations.
   ============================================================ */

var LS_DATA = "botline.v2.data";
var LS_ME = "botline.v2.me";
var LS_FB = "botline.v2.fb";
var LS_FBOFF = "botline.v2.fboff";
var LS_FB_OLD = "botline-fb-config"; // config saved by the previous version of the app

var PRI = { Urgent: 0, High: 1, Normal: 2, Low: 3 };
var STATUS_ORDER = { Active: 0, Review: 1, Blocked: 2, Open: 3, Done: 4 };

var DEFAULT_BRAND = { name: "Botline", tag: "Run your bots like a team.", accent: "#3ce0c2", accent2: "#8b7dff" };

var DEFAULT_TYPES = [
  {
    id: "blog", name: "Blog", hours: 2, checkinHours: 6, color: "#6ea8fe",
    checkpoints: [
      "Brief locked: angle, audience, keyword",
      "Outline with sources approved",
      "Draft written to the brief",
      "Facts and sources verified — every link opens",
      "Title, meta and share image in place",
      "Published, live URL opens clean"
    ]
  },
  {
    id: "top-5", name: "Top 5", hours: 2, checkinHours: 6, color: "#f5b544",
    checkpoints: [
      "Five picks, same category, no repeats",
      "Every pick has a working product link",
      "Prices and availability checked",
      "Intro, each pick and the verdict written",
      "Images in place with alt text",
      "Published, live URL opens clean"
    ]
  },
  {
    id: "game", name: "Game", hours: 24, checkinHours: 12, color: "#a78bfa",
    checkpoints: [
      "Concept and scope signed off",
      "Core loop playable",
      "Art and audio in",
      "Mobile pass on a real phone",
      "QA: no blockers, restart works",
      "Live URL and loading screen checked"
    ]
  },
  {
    id: "software", name: "Software", hours: 24, checkinHours: 24, color: "#3ce0c2",
    checkpoints: [
      "Spec: the core flow written down",
      "First working build",
      "Core flow complete end to end",
      "Empty and error states handled",
      "QA pass, no console errors",
      "Deployed, live URL checked"
    ]
  }
];

var S = { jobs: [], bots: [], types: [], brand: null, me: null };

var FB_CFG = null;
var fb = { ready: false, user: null, signingIn: false, unsubs: [], seeded: false, error: "", warned: false, anonTried: false, redirectDone: false };

/* ---------------- small helpers ---------------- */

function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function now() { return new Date().toISOString(); }
function uid(p) { return (p || "") + Math.random().toString(36).slice(2, 7) + Date.now().toString(36).slice(-3); }
function slug(s) {
  return String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "type";
}
function initials(n) {
  return String(n || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
}
function rel(iso) {
  if (!iso) return "never";
  var t = new Date(iso).getTime();
  if (isNaN(t)) return "never";
  var s = Math.round((Date.now() - t) / 1000);
  if (s < 45) return "just now";
  if (s < 3600) return Math.max(1, Math.round(s / 60)) + "m ago";
  if (s < 86400) return Math.round(s / 3600) + "h ago";
  return Math.round(s / 86400) + "d ago";
}
function fmt(iso) {
  if (!iso) return "—";
  var d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " " +
    d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
function dtLocal(iso) {
  var d = iso ? new Date(iso) : new Date();
  var off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}
function jsonCopy(v) { return JSON.parse(JSON.stringify(v)); }
function defaultTypes() { return jsonCopy(DEFAULT_TYPES); }
function defaultBrand() { return jsonCopy(DEFAULT_BRAND); }

/* ---------------- lookups ---------------- */

function typeById(id) {
  for (var i = 0; i < S.types.length; i++) if (S.types[i].id === id) return S.types[i];
  return null;
}
function botById(id) {
  for (var i = 0; i < S.bots.length; i++) if (S.bots[i].id === id) return S.bots[i];
  return null;
}
function isBoss() { return !!(S.me && S.me.kind === "boss"); }
function currentBot() {
  if (!S.me || S.me.kind !== "bot") return null;
  return botById(S.me.botId);
}
function currentUser() {
  if (S.me && S.me.kind === "boss") return { kind: "boss", name: "Boss" };
  var b = currentBot();
  return b ? { kind: "bot", name: b.name, bot: b } : null;
}
function canReview() {
  var u = currentUser();
  if (!u) return false;
  if (u.kind === "boss") return true;
  return /inspect|review|qa|check/i.test((u.bot.role || "") + " " + (u.bot.name || ""));
}
function canEditJob(job) {
  var u = currentUser();
  if (!u) return false;
  if (u.kind === "boss") return true;
  return !!job.assignee && job.assignee === u.bot.id;
}
function activeJobOf(botId) {
  for (var i = 0; i < S.jobs.length; i++) {
    var j = S.jobs[i];
    if (j.assignee === botId && (j.status === "Active" || j.status === "Blocked" || j.status === "Review")) return j;
  }
  return null;
}
function assignedCount(botId) {
  var n = 0;
  S.jobs.forEach(function (j) { if (j.assignee === botId) n++; });
  return n;
}
function progressOf(job) {
  var cps = job.checkpoints || [];
  var done = 0;
  cps.forEach(function (c) { if (c.done) done++; });
  return { done: done, total: cps.length, pct: cps.length ? Math.round((done / cps.length) * 100) : 0 };
}
function needsCheckin(job) {
  if (job.status !== "Active") return false;
  var last = job.lastCheckinAt || job.assignedAt || job.createdAt;
  if (!last) return true;
  var hrs = (Date.now() - new Date(last).getTime()) / 3600000;
  return hrs >= (Number(job.checkinHours) || 12);
}
function dueInfo(job) {
  if (job.status === "Done") return { text: "Delivered", cls: "ok" };
  if (!job.deadline) return { text: "No deadline", cls: "" };
  var h = (new Date(job.deadline).getTime() - Date.now()) / 3600000;
  if (isNaN(h)) return { text: "No deadline", cls: "" };
  if (h < 0) return { text: "Overdue " + Math.max(1, Math.round(Math.abs(h))) + "h", cls: "bad" };
  if (h < 24) return { text: Math.round(h) + "h left", cls: "warn" };
  return { text: Math.round(h / 24) + "d left", cls: "" };
}
function botOnline(b) {
  if (!b || !b.lastSeenAt) return false;
  return Date.now() - new Date(b.lastSeenAt).getTime() < 20 * 60000;
}
function nextJobId() {
  var max = 1000;
  S.jobs.forEach(function (j) {
    var n = parseInt(String(j.id || "").replace(/\D/g, ""), 10);
    if (n > max) max = n;
  });
  return "J-" + (max + 1);
}
function jobById(id) {
  for (var i = 0; i < S.jobs.length; i++) if (S.jobs[i].id === id) return S.jobs[i];
  return null;
}

/* ---------------- local storage ---------------- */

function persistLocal() {
  try {
    localStorage.setItem(LS_DATA, JSON.stringify({ jobs: S.jobs, bots: S.bots, types: S.types, brand: S.brand }));
  } catch (e) { /* storage full or blocked */ }
}
function loadLocal() {
  var raw = null;
  try { raw = localStorage.getItem(LS_DATA); } catch (e) { }
  if (raw) {
    try {
      var d = JSON.parse(raw);
      if (d && typeof d === "object") {
        if (Array.isArray(d.jobs)) S.jobs = d.jobs;
        if (Array.isArray(d.bots)) S.bots = d.bots;
        if (Array.isArray(d.types) && d.types.length) S.types = d.types;
        if (d.brand) S.brand = Object.assign(defaultBrand(), d.brand);
      }
    } catch (e) { }
  }
  if (!S.types || !S.types.length) S.types = defaultTypes();
  if (!S.brand) S.brand = defaultBrand();
  if (!raw) persistLocal();
  try {
    var m = localStorage.getItem(LS_ME);
    if (m) S.me = JSON.parse(m);
  } catch (e) { }
}
function saveMe() {
  try {
    if (S.me) localStorage.setItem(LS_ME, JSON.stringify(S.me));
    else localStorage.removeItem(LS_ME);
  } catch (e) { }
}

/* ---------------- firebase ---------------- */

function savedFbConfig() {
  // 1. config committed in app/firebase-config.js connects every browser
  if (window.BOTLINE_FIREBASE && window.BOTLINE_FIREBASE.apiKey) return window.BOTLINE_FIREBASE;
  try {
    if (localStorage.getItem(LS_FBOFF)) return null;
    var r = localStorage.getItem(LS_FB);
    if (r) return JSON.parse(r);
    // 2. carry over a config the previous version of the app saved in this browser
    var old = localStorage.getItem(LS_FB_OLD);
    if (old) {
      var cfg = JSON.parse(old);
      if (cfg && cfg.apiKey && cfg.projectId) {
        localStorage.setItem(LS_FB, JSON.stringify(cfg));
        localStorage.removeItem(LS_FB_OLD);
        localStorage.removeItem(LS_FBOFF);
        return cfg;
      }
    }
  } catch (e) { }
  return null;
}
function fbConfigured() { return !!FB_CFG; }
function fsdb() {
  try { return (fb.ready && window.firebase) ? firebase.firestore() : null; } catch (e) { return null; }
}
function bossFromUser(u) {
  if (!u || u.isAnonymous) return;
  fb.user = u;
  fb.ready = true;
  fb.error = "";
  fb.signingIn = false;
  S.me = { kind: "boss", email: u.email || "" };
  saveMe();
  subscribeAll();
  route = "dash";
  closeModal();
  render();
}

function anonymousSession() {
  if (fb.anonTried || fb.signingIn) return;
  var auth = firebase.auth();
  if (auth.currentUser) return;
  fb.anonTried = true;
  fb.signingIn = true;
  auth.signInAnonymously().then(function () {
    fb.signingIn = false;
  }).catch(function (e) {
    fb.signingIn = false;
    fb.error = e.message;
    render();
  });
}

function startFirebase() {
  FB_CFG = savedFbConfig();
  if (!FB_CFG || !window.firebase) { FB_CFG = null; return; }
  try { firebase.initializeApp(FB_CFG); } catch (e) { /* already initialized */ }
  var auth = firebase.auth();

  // Let a redirect finish before starting the anonymous bot session: signing in
  // anonymously while a redirect is still resolving throws the Google result
  // away and sends the user straight back to the sign-in gate.
  auth.onAuthStateChanged(function (u) {
    if (u) {
      fb.user = u;
      fb.ready = true;
      if (!u.isAnonymous) { bossFromUser(u); return; }
      subscribeAll();
      render();
      return;
    }
    fb.ready = false;
    render();
    if (fb.redirectDone) anonymousSession();
  });

  auth.getRedirectResult().then(function (res) {
    fb.redirectDone = true;
    if (res && res.user && !res.user.isAnonymous) { bossFromUser(res.user); return; }
    if (!auth.currentUser) anonymousSession();
    render();
  }).catch(function (e) {
    fb.redirectDone = true;
    if (e && e.code !== "auth/no-auth-event") {
      fb.error = (e.code ? e.code + " — " : "") + e.message;
      toast("Google sign-in failed: " + fb.error, "bad");
    }
    if (!auth.currentUser) anonymousSession();
    render();
  });
}
function subscribeAll() {
  var db = firebase.firestore();
  fb.unsubs.forEach(function (f) { try { f(); } catch (e) { } });
  fb.unsubs = [];
  var map = { jobs: "jobs", bots: "bots", jobTypes: "types" };
  Object.keys(map).forEach(function (col) {
    var key = map[col];
    fb.unsubs.push(db.collection(col).onSnapshot(function (snap) {
      var arr = [];
      snap.forEach(function (d) {
        var v = d.data() || {};
        v.id = d.id;
        arr.push(v);
      });
      var prevTypes = S.types;
      S[key] = arr;
      persistLocal();
      if (key === "types" && arr.length === 0 && !fb.seeded && prevTypes.length) {
        fb.seeded = true;
        prevTypes.forEach(function (t) { fsWrite("jobTypes", t.id, t); });
      }
      render();
    }, function (err) {
      fb.error = err.message;
      render();
    }));
  });
  fb.unsubs.push(db.collection("meta").doc("brand").onSnapshot(function (d) {
    if (d.exists) {
      S.brand = Object.assign(defaultBrand(), d.data());
      persistLocal();
      render();
    }
  }, function () { }));
}
function fsWrite(col, id, doc) {
  var db = fsdb();
  if (!db) {
    if (FB_CFG && !fb.ready && !fb.warned) {
      fb.warned = true;
      toast("Still connecting to the cloud — changes are saved in this browser for now", "warn");
    }
    return;
  }
  try {
    db.collection(col).doc(id).set(jsonCopy(doc)).catch(function (e) {
      toast("Save failed: " + e.message, "bad");
    });
  } catch (e) {
    toast("Save failed: " + e.message, "bad");
  }
}
function fsDelete(col, id) {
  var db = fsdb();
  if (!db) return Promise.resolve(true);
  return db.collection(col).doc(id).delete().then(function () { return true; }).catch(function (e) {
    toast("Delete failed: " + e.message, "bad");
    return false;
  });
}

/* ---------------- saves ---------------- */

function jobSave(job, quiet) {
  job.updatedAt = now();
  var i = S.jobs.findIndex(function (j) { return j.id === job.id; });
  if (i >= 0) S.jobs[i] = job; else S.jobs.unshift(job);
  persistLocal();
  fsWrite("jobs", job.id, job);
  if (!quiet) render();
}
function botSave(bot, quiet) {
  var i = S.bots.findIndex(function (b) { return b.id === bot.id; });
  if (i >= 0) S.bots[i] = bot; else S.bots.push(bot);
  persistLocal();
  fsWrite("bots", bot.id, bot);
  if (!quiet) render();
}
function typeSave(t, quiet) {
  var i = S.types.findIndex(function (x) { return x.id === t.id; });
  if (i >= 0) S.types[i] = t; else S.types.push(t);
  persistLocal();
  fsWrite("jobTypes", t.id, t);
  if (!quiet) render();
}
function brandSave() {
  persistLocal();
  fsWrite("meta", "brand", S.brand);
}

/* ---------------- identity ---------------- */

function enterAsBot(id) {
  var b = botById(id);
  if (!b) return;
  S.me = { kind: "bot", botId: id };
  saveMe();
  b.lastSeenAt = now();
  botSave(b, true);
  route = "dash";
  closeModal();
  render();
  toast("Signed in as " + b.name, "good");
}
function enterAsBoss() {
  S.me = { kind: "boss" };
  saveMe();
  route = "dash";
  closeModal();
  render();
  toast("Signed in as Boss", "good");
}
function signOut() {
  S.me = null;
  saveMe();
  route = "dash";
  render();
  if (FB_CFG && window.firebase) {
    try {
      var auth = firebase.auth();
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        fb.anonTried = false;
        auth.signOut().catch(function () { });
      }
    } catch (e) { /* not configured */ }
  }
}
function bossLogin() {
  if (FB_CFG && window.firebase) {
    var auth = firebase.auth();
    try {
      // Already signed in with Google: enter, do not send the user round again.
      if (auth.currentUser && !auth.currentUser.isAnonymous) { bossFromUser(auth.currentUser); return; }
      var provider = new firebase.auth.GoogleAuthProvider();
      fb.signingIn = true;
      fb.error = "";
      auth.signInWithPopup(provider).then(function (res) {
        fb.signingIn = false;
        if (res && res.user) bossFromUser(res.user);
        else { fb.error = "Signed in, but Firebase returned no user"; render(); }
      }).catch(function (e) {
        fb.signingIn = false;
        var code = (e && e.code) || "";
        if (code === "auth/popup-closed-by-user") { toast("Google sign-in cancelled", "warn"); return; }
        if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment" || code === "auth/cancelled-popup-request") {
          auth.signInWithRedirect(provider).catch(function (err) {
            fb.error = (err && err.code ? err.code + " — " : "") + (err && err.message);
            toast("Google sign-in failed: " + err.message, "bad");
            render();
          });
          return;
        }
        fb.error = (e && e.code ? e.code + " — " : "") + ((e && e.message) || "Google sign-in failed");
        toast("Google sign-in failed: " + fb.error, "bad");
        render();
      });
      return;
    } catch (e) {
      fb.error = e.message;
      toast("Google sign-in failed: " + e.message, "bad");
    }
  }
  enterAsBoss();
}
async function hashPin(pin) {
  var payload = "botline:" + pin;
  if (window.crypto && crypto.subtle && crypto.subtle.digest) {
    try {
      var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    } catch (e) { /* fall through */ }
  }
  return "plain:" + pin;
}

/* ---------------- assignments ---------------- */

function eligibleBots(job) {
  return S.bots.filter(function (b) {
    if (b.active === false) return false;
    if (activeJobOf(b.id)) return false;
    if (b.categories && b.categories.length && b.categories.indexOf(job.type) < 0) return false;
    return true;
  }).sort(function (a, b) {
    return (assignedCount(a.id) - assignedCount(b.id)) || String(a.name).localeCompare(String(b.name));
  });
}

async function assignJob(id, botId, quiet) {
  var job = jobById(id);
  var bot = botById(botId);
  if (!job || !bot) return false;
  if (job.status !== "Open") { toast("That job is no longer open", "warn"); return false; }
  if (bot.active === false) { toast(bot.name + " is paused", "warn"); return false; }
  if (activeJobOf(bot.id)) { toast(bot.name + " is already on a job", "warn"); return false; }
  var ts = now();
  var who = (currentUser() || {}).name || "Boss";
  var entry = { at: ts, by: who, kind: "assign", text: "Assigned to " + bot.name };
  var db = fsdb();
  if (db) {
    try {
      await db.runTransaction(function (tx) {
        var ref = db.collection("jobs").doc(id);
        return tx.get(ref).then(function (snap) {
          if (!snap.exists || snap.data().status !== "Open") throw new Error("taken");
          var d = snap.data();
          // The deadline clock starts now, not at posting — unless the Boss
          // set a fixed deadline (deadlineExplicit), which is kept as-is.
          var upd = {
            status: "Active", assignee: bot.id, assigneeName: bot.name,
            assignedAt: ts, lastCheckinAt: ts,
            activity: (d.activity || []).concat([entry])
          };
          if (!d.deadlineExplicit) {
            upd.deadline = new Date(new Date(ts).getTime() + Number(d.slaHours || 12) * 3600000).toISOString();
          }
          tx.update(ref, upd);
        });
      });
      if (!quiet) toast("Assigned " + job.id + " to " + bot.name, "good");
      return true;
    } catch (e) {
      toast(e.message === "taken" ? "That job was just taken" : "Assign failed: " + e.message, "bad");
      return false;
    }
  }
  job.status = "Active";
  job.assignee = bot.id;
  job.assigneeName = bot.name;
  job.assignedAt = ts;
  job.lastCheckinAt = ts;
  if (!job.deadlineExplicit) {
    job.deadline = new Date(new Date(ts).getTime() + Number(job.slaHours || 12) * 3600000).toISOString();
  }
  job.activity = (job.activity || []).concat([entry]);
  jobSave(job, quiet);
  if (!quiet) toast("Assigned " + job.id + " to " + bot.name, "good");
  return true;
}

function claimJob(id) {
  var me = currentBot();
  if (!me) { toast("Pick a bot to claim jobs", "warn"); return; }
  var job = jobById(id);
  if (!job) return;
  if (job.status !== "Open") { toast("That job is already taken", "warn"); return; }
  if (activeJobOf(me.id)) { toast("Finish " + activeJobOf(me.id).id + " first", "warn"); return; }
  if (me.categories && me.categories.length && me.categories.indexOf(job.type) < 0) {
    var t = typeById(job.type);
    if (!confirm("This is a " + (t ? t.name : job.typeName) + " job and your categories are different. Claim it anyway?")) return;
  }
  assignJob(id, me.id, true).then(function (ok) {
    if (ok) {
      toast("Claimed " + id + " — check in when you have news", "good");
      currentJobId = id;
      route = "job";
      render();
    }
  });
}

async function releaseJob(id) {
  var job = jobById(id);
  if (!job) return;
  if (!isBoss() && !canEditJob(job)) { toast("Only the Boss or the assignee can release this", "warn"); return; }
  if (!confirm("Release " + id + " back to the open pool?")) return;
  job.activity = (job.activity || []).concat([{
    at: now(), by: (currentUser() || {}).name || "Boss", kind: "release",
    text: "Released " + (job.assigneeName || "the assignee") + " — back in the pool"
  }]);
  job.status = "Open";
  job.assignee = null;
  job.assigneeName = "";
  job.assignedAt = "";
  job.lastCheckinAt = "";
  // The clock restarts for the next bot, unless a fixed deadline was set.
  if (!job.deadlineExplicit) job.deadline = null;
  jobSave(job);
  toast(id + " is back in the pool", "good");
}

async function autoAssign(typeId) {
  var pool = S.jobs.filter(function (j) {
    return j.status === "Open" && (typeId === "all" || j.type === typeId);
  }).sort(function (a, b) {
    return (PRI[a.priority] - PRI[b.priority]) || String(a.deadline || "").localeCompare(String(b.deadline || ""));
  });
  if (!pool.length) { toast("No open jobs in that category", "warn"); return; }
  var n = 0;
  for (var i = 0; i < pool.length; i++) {
    var cands = eligibleBots(pool[i]);
    if (!cands.length) continue;
    var ok = await assignJob(pool[i].id, cands[0].id, true);
    if (ok) n++;
  }
  render();
  toast(n ? "Auto-assigned " + n + " job" + (n === 1 ? "" : "s") : "No free bot for those jobs", n ? "good" : "warn");
}

/* ---------------- job actions ---------------- */

function logActivity(job, kind, text) {
  job.activity = (job.activity || []).concat([{
    at: now(), by: (currentUser() || {}).name || "Boss", kind: kind, text: text
  }]);
}

function toggleCheckpoint(jobId, cpId, on) {
  var job = jobById(jobId);
  if (!job) return;
  if (!canEditJob(job)) { toast("Only the assignee or the Boss can tick checkpoints", "warn"); render(); return; }
  var cp = (job.checkpoints || []).find(function (c) { return c.id === cpId; });
  if (!cp) return;
  var who = (currentUser() || {}).name || "Bot";
  cp.done = !!on;
  cp.at = on ? now() : "";
  cp.by = on ? who : "";
  logActivity(job, "checkpoint", (on ? "Completed" : "Reopened") + ": " + cp.label);
  jobSave(job, true);
  var p = progressOf(job);
  if (on && p.total && p.done === p.total) toast("All checkpoints done — submit it for review", "good");
  else render();
}

function applyCheckin(job, note, doneIds) {
  var who = (currentUser() || {}).name || "Bot";
  var ts = now();
  var cps = job.checkpoints || [];
  var freshly = [];
  cps.forEach(function (cp) {
    if (doneIds.indexOf(cp.id) >= 0 && !cp.done) {
      cp.done = true;
      cp.at = ts;
      cp.by = who;
      freshly.push(cp.label);
    }
  });
  var done = cps.filter(function (c) { return c.done; }).length;
  job.checkins = [{
    at: ts, by: who, note: note,
    progress: cps.length ? Math.round((done / cps.length) * 100) : 0
  }].concat(job.checkins || []);
  job.lastCheckinAt = ts;
  logActivity(job, "checkin", note + (freshly.length ? " (done: " + freshly.join(", ") + ")" : ""));
  if (job.assignee) {
    var b = botById(job.assignee);
    if (b) { b.lastSeenAt = ts; botSave(b, true); }
  }
  jobSave(job);
  toast("Checked in on " + job.id, "good");
}

function submitForReview(id, link, note) {
  var job = jobById(id);
  if (!job) return;
  if (!canEditJob(job)) { toast("Only the assignee or the Boss can submit this", "warn"); return; }
  var p = progressOf(job);
  if (p.total && p.done < p.total) {
    toast("Finish the checkpoints first — " + p.done + " of " + p.total + " done", "warn");
    return;
  }
  var url = String(link || "").trim();
  if (!url) { toast("Add the link to the work — GitHub, live URL, or other", "warn"); return; }
  // Bare domains become clickable links; anything else stays a plain reference.
  if (!/^https?:\/\//i.test(url) && url.indexOf(".") >= 0 && !/\s/.test(url)) url = "https://" + url;
  job.status = "Review";
  job.submissionUrl = url;
  job.submissionNote = String(note || "").trim();
  job.submittedAt = now();
  job.submittedBy = (currentUser() || {}).name || "Boss";
  delete job.blockedReason;
  logActivity(job, "review", "Submitted for review — " + url);
  jobSave(job);
  toast(job.id + " is in review", "good");
}

function reviewJob(id, pass, note) {
  var job = jobById(id);
  if (!job) return;
  if (!canReview()) { toast("Only a reviewer or the Boss can review", "warn"); return; }
  if (!pass && !String(note || "").trim()) { toast("Say what needs fixing", "warn"); return; }
  if (pass) {
    job.status = "Done";
    job.doneAt = now();
    job.reviewNote = note || "";
    logActivity(job, "done", "Passed review" + (note ? " — " + note : ""));
    jobSave(job);
    toast(job.id + " is done", "good");
  } else {
    job.status = "Active";
    job.reviewNote = note;
    job.rework = (job.rework || 0) + 1;
    job.lastCheckinAt = now();
    // The old submission is stale now — the bot submits fresh after rework.
    job.submissionUrl = "";
    job.submissionNote = "";
    logActivity(job, "review", "Sent back: " + note);
    jobSave(job);
    toast(job.id + " goes back to " + (job.assigneeName || "the builder"), "warn");
  }
}

function setBlocked(id, reason) {
  var job = jobById(id);
  if (!job) return;
  if (!canEditJob(job)) { toast("Only the assignee or the Boss can block this", "warn"); return; }
  job.status = "Blocked";
  job.blockedReason = reason;
  logActivity(job, "block", "Blocked: " + reason);
  jobSave(job);
  toast("Marked blocked — the Boss sees it on the dashboard", "warn");
}

function unblockJob(id) {
  var job = jobById(id);
  if (!job) return;
  if (!canEditJob(job)) { toast("Only the assignee or the Boss can unblock this", "warn"); return; }
  job.status = "Active";
  delete job.blockedReason;
  job.lastCheckinAt = now();
  logActivity(job, "unblock", "Unblocked");
  jobSave(job);
  toast(job.id + " is moving again", "good");
}

function reopenJob(id) {
  var job = jobById(id);
  if (!job) return;
  if (!isBoss()) { toast("Only the Boss can reopen a finished job", "warn"); return; }
  job.status = "Active";
  delete job.doneAt;
  job.lastCheckinAt = now();
  job.submissionUrl = "";
  job.submissionNote = "";
  logActivity(job, "review", "Reopened");
  jobSave(job);
}

async function deleteJob(id) {
  if (!isBoss()) { toast("Only the Boss can delete a job", "warn"); return; }
  var job = jobById(id);
  if (!job) return;
  if (!confirm("Delete " + id + " — " + job.title + "?\n\nThis removes it everywhere, for every bot.")) return;
  S.jobs = S.jobs.filter(function (j) { return j.id !== id; });
  persistLocal();
  if (currentJobId === id) { currentJobId = null; route = "board"; }
  render();
  var ok = await fsDelete("jobs", id);
  if (!ok) {
    S.jobs.push(job);
    persistLocal();
    render();
    toast("Delete was refused — the job is still there", "bad");
    return;
  }
  toast(id + " deleted", "good");
}

/* ---------------- bot / type deletes ---------------- */

async function deleteBot(id) {
  if (!isBoss()) { toast("Only the Boss can remove a bot", "warn"); return; }
  var b = botById(id);
  if (!b) return;
  var busy = activeJobOf(id);
  if (busy && !confirm(b.name + " still holds " + busy.id + ". Remove them and release it?")) return;
  if (!busy && !confirm("Remove " + b.name + " from the roster?")) return;
  S.jobs.forEach(function (j) {
    if (j.assignee === id && j.status !== "Done") {
      j.status = "Open";
      j.assignee = null;
      j.assigneeName = "";
      j.assignedAt = "";
      j.lastCheckinAt = "";
      if (!j.deadlineExplicit) j.deadline = null;
      logActivity(j, "release", "Released — " + b.name + " was removed from the roster");
      jobSave(j, true);
    }
  });
  S.bots = S.bots.filter(function (x) { return x.id !== id; });
  if (S.me && S.me.kind === "bot" && S.me.botId === id) { S.me = null; saveMe(); }
  persistLocal();
  render();
  var ok = await fsDelete("bots", id);
  if (!ok) toast("The bot was removed here but the cloud refused the delete", "bad");
  else toast(b.name + " removed", "good");
}

async function deleteType(id) {
  if (!isBoss()) { toast("Only the Boss can delete a project type", "warn"); return; }
  var t = typeById(id);
  if (!t) return;
  var used = S.jobs.filter(function (j) { return j.type === id; }).length;
  if (!confirm("Delete the " + t.name + " project type?" + (used ? "\n\n" + used + " existing job(s) keep their checkpoints and still work." : ""))) return;
  S.types = S.types.filter(function (x) { return x.id !== id; });
  S.bots.forEach(function (b) {
    if (b.categories && b.categories.indexOf(id) >= 0) {
      b.categories = b.categories.filter(function (c) { return c !== id; });
      botSave(b, true);
    }
  });
  persistLocal();
  render();
  var ok = await fsDelete("jobTypes", id);
  if (!ok) toast("The cloud refused the delete — the type may come back", "bad");
  else toast(t.name + " deleted", "good");
}
