"use strict";
/* ============================================================
   Botline — GitHub-backed store (replaces Firebase).
   The board lives in data/board.json in the botline repo.
   Reads and writes go through /api/board (a Vercel function).
   Loaded after app.js, so these definitions replace the Firebase ones.
   ============================================================ */

var GH = { ready: false, sha: null, error: "", queue: [], flushing: false, timer: null, lastSync: "" };
var API_BOARD = "/api/board";
var POLL_MS = 15000;

function fbConfigured() { return true; }       // "cloud" = GitHub now
function fsdb() { return null; }                // no transactions; assignJob uses its local path
function fsWrite(col, id, doc) { ghQueue({ op: "put", col: col, id: id, doc: jsonCopy(doc) }); }
function fsDelete(col, id) { ghQueue({ op: "del", col: col, id: id }); return Promise.resolve(true); }
function bossLogin() { enterAsBoss(); }

function ghQueue(op) {
  // keep only the newest write per document
  GH.queue = GH.queue.filter(function (o) { return !(o.col === op.col && o.id === op.id); });
  GH.queue.push(op);
  clearTimeout(GH.timer);
  GH.timer = setTimeout(ghFlush, 600);
}

async function ghFlush() {
  if (GH.flushing || !GH.queue.length) return;
  GH.flushing = true;
  var ops = GH.queue.slice();
  GH.queue = [];
  try {
    var r = await fetch(API_BOARD, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ops: ops, by: (currentUser() || {}).name || "Botline" })
    });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error(j.error || ("HTTP " + r.status));
    GH.error = "";
    if (j.board) ghApply(j.board, j.sha);
  } catch (e) {
    GH.error = e.message;
    GH.queue = ops.concat(GH.queue);   // keep them; retry on next poll
    toast("Save failed (will retry): " + e.message, "bad");
  } finally {
    GH.flushing = false;
    if (GH.queue.length) { clearTimeout(GH.timer); GH.timer = setTimeout(ghFlush, 3000); }
  }
}

function ghApply(board, sha) {
  if (!board) return;
  // don't clobber edits still waiting to be saved
  var pending = {};
  GH.queue.forEach(function (o) { pending[o.col + "/" + o.id] = o; });
  function merge(arr, col, cur) {
    var out = (arr || []).filter(function (x) { var p = pending[col + "/" + x.id]; return !(p && p.op === "del"); })
      .map(function (x) { var p = pending[col + "/" + x.id]; return p && p.op === "put" ? p.doc : x; });
    Object.keys(pending).forEach(function (k) {
      var p = pending[k];
      if (p.col === col && p.op === "put" && !out.some(function (x) { return x.id === p.id; })) out.push(p.doc);
    });
    return out;
  }
  S.jobs = merge(board.jobs, "jobs");
  S.bots = merge(board.bots, "bots");
  var t = merge(board.types, "jobTypes");
  if (t.length) S.types = t;
  if (board.brand) S.brand = Object.assign(defaultBrand(), board.brand);
  GH.sha = sha || GH.sha;
  GH.ready = true;
  GH.lastSync = now();
  normalizeJobs();
  persistLocal();
  applyBrand();
  render();
}

async function ghPull() {
  try {
    var r = await fetch(API_BOARD, { cache: "no-store" });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error(j.error || ("HTTP " + r.status));
    GH.error = "";
    var remote = j.board || {};
    // First run after the move off Firebase: if GitHub has no cards but this
    // browser still has its old copy, upload it once.
    if (!GH.ready && !(remote.jobs || []).length && S.jobs.length) {
      GH.ready = true;
      await fetch(API_BOARD, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ by: "migration", ops: [{ op: "seed", board: { jobs: S.jobs, bots: S.bots, types: S.types, brand: S.brand } }] })
      }).then(function (x) { return x.json(); }).then(function (k) {
        if (k.board) { ghApply(k.board, k.sha); toast("Moved this browser's board to GitHub (" + S.jobs.length + " cards)", "good"); }
      }).catch(function (e) { toast("Upload failed: " + e.message, "bad"); });
      return;
    }
    if (j.sha && j.sha === GH.sha && GH.ready) return;
    ghApply(remote, j.sha);
  } catch (e) {
    if (!GH.error) toast("Can't reach the board: " + e.message, "bad");
    GH.error = e.message;
    render();
  }
  if (GH.queue.length) ghFlush();
}

function startFirebase() {
  // name kept so boot.js stays the same
  fb.ready = true;
  ghPull();
  setInterval(ghPull, POLL_MS);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) ghPull(); });
}
