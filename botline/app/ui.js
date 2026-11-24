"use strict";

/* ============================================================
   Botline — views, cards and modal contents
   ============================================================ */

var route = "dash";
var currentJobId = null;
var boardFilter = { status: "all", type: "all", mine: false };
var ui = { autoType: "all" };

/* ---------------- shared bits ---------------- */

function applyBrand() {
  var b = S.brand || defaultBrand();
  var root = document.documentElement.style;
  root.setProperty("--accent", b.accent || DEFAULT_BRAND.accent);
  root.setProperty("--accent-2", b.accent2 || DEFAULT_BRAND.accent2);
  document.title = (b.name || "Botline") + " — Bot operations";
  Array.prototype.forEach.call(document.querySelectorAll(".brand-name"), function (e) {
    e.textContent = b.name || "Botline";
  });
  var tag = document.getElementById("login-tag");
  if (tag) tag.textContent = b.tag || "";
}
function wordmark() {
  return '<span class="brandmark"><i></i>' + esc(String((S.brand && S.brand.name) || "Botline").toUpperCase()) + "</span>";
}
function pageHead(title, sub, actions) {
  return '<div class="pagehead"><div><h1>' + esc(title) + "</h1>" +
    (sub ? '<p class="muted">' + esc(sub) + "</p>" : "") + "</div>" +
    (actions ? '<div class="headacts">' + actions + "</div>" : "") + "</div>";
}
function kpi(label, value, note, tone) {
  return '<div class="kpi ' + (tone || "") + '"><span class="kpi-label">' + esc(label) + "</span><strong>" +
    esc(value) + '</strong><span class="kpi-note">' + esc(note || "") + "</span></div>";
}
function statusMeta(s) {
  var m = {
    Open: { label: "Open", cls: "open" }, Active: { label: "Active", cls: "active" },
    Blocked: { label: "Blocked", cls: "blocked" }, Review: { label: "In review", cls: "review" },
    Done: { label: "Done", cls: "done" }
  }[s];
  return m || { label: s || "Open", cls: "open" };
}
function statusPill(s) {
  var m = statusMeta(s);
  return '<span class="pill st-' + m.cls + '"><i></i>' + esc(m.label) + "</span>";
}
function typeColor(id) {
  var t = typeById(id);
  return (t && t.color) || "#6ea8fe";
}
function typeTag(job) {
  return '<span class="tag" style="--t:' + esc(typeColor(job.type)) + '">' + esc(job.typeName || "Job") + "</span>";
}
function avatar(name, cls) {
  return '<span class="av ' + (cls || "") + '">' + esc(initials(name)) + "</span>";
}
function greeting() {
  var h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

/* ---------------- render ---------------- */

function render() {
  applyBrand();
  var login = document.getElementById("login");
  var shell = document.getElementById("shell");
  var u = currentUser();
  if (!u) {
    shell.hidden = true;
    login.hidden = false;
    renderLogin();
    return;
  }
  login.hidden = true;
  shell.hidden = false;
  renderChrome(u);
  if (route === "settings" && !isBoss()) route = "dash";
  if (route === "job" && !jobById(currentJobId)) route = "board";
  document.getElementById("view").innerHTML = renderView();
}
function renderView() {
  if (route === "job") return viewJob();
  if (route === "board") return viewBoard();
  if (route === "assign") return viewAssign();
  if (route === "checkins") return viewCheckins();
  if (route === "bots") return viewBots();
  if (route === "settings") return viewSettings();
  return viewDash();
}
function renderChrome(u) {
  Array.prototype.forEach.call(document.querySelectorAll("#nav .navitem"), function (b) {
    var on = b.dataset.r === route || (route === "job" && b.dataset.r === "board");
    b.classList.toggle("on", on);
  });
  document.getElementById("nav-settings").hidden = !isBoss();
  var mc = document.getElementById("me-card");
  mc.innerHTML = '<span class="av' + (u.kind === "boss" ? " boss" : "") + '">' +
    esc(u.kind === "boss" ? "B" : initials(u.name)) + "</span><div><b>" + esc(u.name) + "</b><span>" +
    esc(u.kind === "boss" ? "Boss · full access" : (u.bot.role || "Bot")) + "</span></div>";
  var need = S.jobs.filter(needsCheckin).length;
  var badge = document.querySelector('[data-badge="checkins"]');
  if (badge) { badge.hidden = !need; badge.textContent = need; }
}
function renderLogin() {
  document.getElementById("login-brand").innerHTML = wordmark();
  document.getElementById("login-tag").textContent = (S.brand && S.brand.tag) || "";
  var grid = document.getElementById("login-bots");
  var bots = S.bots.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
  grid.innerHTML = bots.length ? bots.map(botTile).join("") :
    '<div class="empty-login">No bots on the roster yet.<br><span>Sign in as Boss to add your team, project types and first job.</span></div>';
  var btn = document.getElementById("login-boss");
  btn.textContent = fbConfigured() ? "Sign in as Boss with Google" : "Continue as Boss";
  var note = document.getElementById("login-sync");
  if (!fbConfigured()) note.textContent = "Local mode — data stays in this browser";
  else if (fb.ready) note.textContent = "Synced to Firebase" + (fb.user && !fb.user.isAnonymous ? " as " + (fb.user.email || "Boss") : "");
  else if (fb.error) note.textContent = "Firebase: " + fb.error;
  else note.textContent = "Connecting to Firebase…";
}
function botTile(b) {
  var job = activeJobOf(b.id);
  var cats = (b.categories || []).map(function (id) {
    var t = typeById(id);
    return t ? t.name : "";
  }).filter(Boolean).join(" · ") || "Any category";
  var sub = b.active === false ? "Paused" : job ? "On " + job.id : "Free";
  return '<button class="bottile" data-act="pick-bot" data-id="' + esc(b.id) + '">' +
    avatar(b.name) + '<span style="min-width:0"><b>' + esc(b.name) + "</b><span>" +
    esc(sub) + " · " + esc(cats) + "</span></span></button>";
}

/* ---------------- dashboard ---------------- */

function viewDash() {
  var u = currentUser();
  var jobs = S.jobs;
  var open = jobs.filter(function (j) { return j.status === "Open"; });
  var active = jobs.filter(function (j) { return j.status === "Active"; });
  var review = jobs.filter(function (j) { return j.status === "Review"; });
  var blocked = jobs.filter(function (j) { return j.status === "Blocked"; });
  var done = jobs.filter(function (j) { return j.status === "Done"; });
  var overdue = jobs.filter(function (j) {
    return j.status !== "Done" && j.deadline && new Date(j.deadline).getTime() < Date.now();
  });
  var stale = active.filter(needsCheckin);
  var mine = currentBot() ? activeJobOf(currentBot().id) : null;
  var h = "";

  h += pageHead("Dashboard", greeting() + ", " + u.name + ".",
    (isBoss() ? '<button class="btn" data-act="new-job">New job</button>' : "") +
    (mine ? '<button class="btn ghost" data-act="checkin-open" data-id="' + esc(mine.id) + '">Check in</button>' : ""));

  if (currentBot()) h += myJobPanel(mine);
  if (isBoss() && !S.bots.length) h += setupPanel();

  h += '<div class="kpis">' +
    kpi("Open", open.length, open.length ? "waiting to be claimed" : "nothing in the pool") +
    kpi("Active", active.length, stale.length ? stale.length + " need a check-in" : "all checked in", stale.length ? "warn" : "") +
    kpi("In review", review.length, review.length ? "waiting on a reviewer" : "clear") +
    kpi("Overdue", overdue.length, overdue.length ? "past the deadline" : "on time", overdue.length ? "bad" : "") +
    kpi("Needs check-in", stale.length, stale.length ? "silent jobs" : "nobody is quiet", stale.length ? "warn" : "") +
    kpi("Done", done.length, "all time", "good") +
    "</div>";

  var seen = {};
  var items = [];
  function push(list, label, cls) {
    list.forEach(function (j) {
      if (seen[j.id]) return;
      seen[j.id] = 1;
      items.push({ j: j, label: label, cls: cls });
    });
  }
  push(blocked, "Blocked", "st-blocked");
  push(review, "Ready to review", "st-review");
  push(overdue.filter(function (j) { return j.status !== "Done"; }), "Overdue", "st-blocked");
  push(stale, "Needs check-in", "st-review");

  var attn = items.length ? items.slice(0, 6).map(function (x) {
    return '<button class="attn" data-act="open-job" data-id="' + esc(x.j.id) + '">' +
      '<span class="attn-main"><b>' + esc(x.j.id) + " · " + esc(x.j.title) + "</b>" +
      '<span class="muted">' + esc(x.j.assigneeName || "Unassigned") + " · " + esc(x.j.typeName || "") +
      " · " + esc(dueInfo(x.j).text) + "</span></span>" +
      '<span class="pill ' + x.cls + '">' + esc(x.label) + "</span></button>";
  }).join("") : '<p class="empty">Nothing is stuck. The board is under control.</p>';

  h += '<div class="grid2">' +
    '<section class="panel"><div class="panel-head"><h2>Needs you</h2>' +
    '<button class="btn ghost sm" data-act="nav" data-r="board">Open board</button></div>' + attn + "</section>" +
    teamPanel() + "</div>" +
    loadPanel() +
    '<section class="panel"><div class="panel-head"><h2>Recent activity</h2>' +
    '<button class="btn ghost sm" data-act="nav" data-r="checkins">Check-ins</button></div>' +
    activityFeed(8) + "</section>";
  return h;
}

function myJobPanel(job) {
  if (!job) {
    var me = currentBot();
    var pool = S.jobs.filter(function (j) {
      return j.status === "Open" && (!me.categories || !me.categories.length || me.categories.indexOf(j.type) >= 0);
    });
    return '<section class="panel"><div class="panel-head"><div><h2>You are free</h2>' +
      '<p class="muted">' + (pool.length ? pool.length + " open job" + (pool.length === 1 ? "" : "s") + " in your categories." : "Nothing open in your categories yet.") +
      '</p></div><button class="btn" data-act="nav" data-r="board">Find a job</button></div></section>';
  }
  var p = progressOf(job);
  var next = (job.checkpoints || []).filter(function (c) { return !c.done; })[0];
  return '<section class="panel"><div class="panel-head"><div><div class="chiprow">' + typeTag(job) +
    statusPill(job.status) + "</div><h2 style=\"margin-top:8px\">" + esc(job.title) + "</h2></div>" +
    '<button class="btn ghost sm" data-act="open-job" data-id="' + esc(job.id) + '">Open job</button></div>' +
    '<div class="bar big"><i style="width:' + p.pct + '%"></i></div>' +
    '<div class="row" style="justify-content:space-between"><span class="muted small">' + p.done + " of " + p.total +
    " checkpoints · last check-in " + esc(rel(job.lastCheckinAt)) + '</span><span class="' + dueInfo(job).cls + ' small">' +
    esc(dueInfo(job).text) + "</span></div>" +
    (next ? '<p class="muted" style="margin-top:10px">Next up: <strong>' + esc(next.label) + "</strong></p>" : "") +
    '<div class="row" style="margin-top:12px"><button class="btn" data-act="checkin-open" data-id="' + esc(job.id) + '">Check in</button></div>' +
    "</section>";
}

function setupPanel() {
  return '<section class="panel"><div class="panel-head"><div><h2>Set up your board</h2>' +
    '<p class="muted">Fresh board, no sample data. Three steps and it is live.</p></div></div>' +
    '<div class="stack">' +
    '<div class="setrow"><div class="tinfo"><b>1. Add your bots</b><span>Name, role and the categories each one takes.</span></div>' +
    '<button class="btn ghost sm" data-act="add-bot">Add a bot</button></div>' +
    '<div class="setrow"><div class="tinfo"><b>2. Shape your project types</b><span>Each type carries its SLA, check-in rhythm and checkpoints.</span></div>' +
    '<button class="btn ghost sm" data-act="nav" data-r="settings">Project types</button></div>' +
    '<div class="setrow"><div class="tinfo"><b>3. Post the first job</b><span>It lands in the pool. A bot claims it, or auto-assign picks.</span></div>' +
    '<button class="btn sm" data-act="new-job">New job</button></div>' +
    "</div></section>";
}

function teamPanel() {
  var rows = "";
  if (isBoss()) {
    rows += '<div class="trow"><span class="av boss">B</span><div class="tinfo"><b>Boss</b>' +
      '<span>You · full access</span></div><span class="pill st-done">Online</span></div>';
  }
  rows += S.bots.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); }).map(function (b) {
    var job = activeJobOf(b.id);
    var on = botOnline(b);
    var cat = (b.categories || []).length + " cat";
    return '<div class="trow">' + avatar(b.name) + '<div class="tinfo"><b>' + esc(b.name) + "</b><span>" +
      esc(b.role || "Bot") + " · " + (job ? esc(job.id) : "free") + (b.active === false ? " · paused" : "") +
      "</span></div>" + (b.active === false ? '<span class="pill">Paused</span>' :
        '<span class="pill ' + (on ? "st-done" : "") + '"><i></i>' + (on ? "Online" : "Away") + "</span>") + "</div>";
  }).join("");
  if (!S.bots.length) rows += '<p class="empty">No bots yet.</p>';
  return '<section class="panel"><div class="panel-head"><h2>Team</h2>' +
    '<button class="btn ghost sm" data-act="nav" data-r="bots">Manage</button></div>' + rows + "</section>";
}

function loadPanel() {
  if (!S.types.length) return "";
  var rows = S.types.map(function (t) {
    var n = S.jobs.filter(function (j) {
      return j.type === t.id && (j.status === "Open" || j.status === "Active" || j.status === "Review" || j.status === "Blocked");
    }).length;
    return { t: t, n: n };
  });
  var max = Math.max.apply(null, rows.map(function (r) { return r.n; }).concat([1]));
  var body = rows.map(function (r) {
    return '<div class="loadrow"><span>' + esc(r.t.name) + "</span>" +
      '<div class="bar" style="margin:0"><i style="width:' + Math.round((r.n / max) * 100) + "%;background:" +
      esc(r.t.color || "var(--accent)") + '"></i></div><em>' + r.n + "</em></div>";
  }).join("");
  return '<section class="panel"><div class="panel-head"><h2>Open work by category</h2>' +
    '<button class="btn ghost sm" data-act="nav" data-r="assign">Auto-assign</button></div>' + body + "</section>";
}

function activityFeed(limit) {
  var rows = [];
  S.jobs.forEach(function (j) {
    (j.activity || []).forEach(function (a) { rows.push({ j: j, a: a }); });
  });
  rows.sort(function (x, y) { return String(y.a.at || "").localeCompare(String(x.a.at || "")); });
  if (!rows.length) return '<p class="empty">No activity yet. Claims, check-ins and reviews land here.</p>';
  return rows.slice(0, limit || 10).map(function (r) {
    return '<div class="act"><span class="act-dot ' + esc(r.a.kind || "") + '"></span><div><b>' +
      esc(r.a.by || "Someone") + '</b> <span class="muted">' + esc(r.j.id) + "</span><p>" +
      esc(r.a.text || "") + '</p><span class="stamp">' + esc(rel(r.a.at)) + "</span></div></div>";
  }).join("");
}

/* ---------------- board ---------------- */

function jobCard(j) {
  var p = progressOf(j);
  var due = dueInfo(j);
  var me = currentBot();
  var canClaim = j.status === "Open" && me && !activeJobOf(me.id);
  var mine = me && j.assignee === me.id && (j.status === "Active" || j.status === "Blocked");
  var acts = "";
  if (canClaim) acts += '<button class="btn sm" data-act="claim" data-id="' + esc(j.id) + '">Claim</button>';
  if (mine) acts += '<button class="btn ghost sm" data-act="checkin-open" data-id="' + esc(j.id) + '">Check in</button>';
  acts += '<span class="openlink">Open →</span>';
  return '<article class="jcard pri-' + esc(j.priority || "Normal") + '" data-act="open-job" data-id="' + esc(j.id) + '">' +
    '<div class="jcard-top">' + typeTag(j) + statusPill(j.status) + "</div>" +
    "<h3>" + esc(j.title) + "</h3>" +
    '<p class="brief">' + esc(j.brief || "No brief yet.") + "</p>" +
    '<div class="bar"><i style="width:' + p.pct + '%"></i></div>' +
    '<div class="jcard-meta"><span><i class="dot ' + (j.assignee ? "on" : "") + '"></i>' +
    esc(j.assigneeName || "Unassigned") + "</span><span>" + p.done + "/" + p.total +
    ' · <span class="' + due.cls + '">' + esc(due.text) + "</span></span></div>" +
    '<div class="jcard-acts">' + acts + "</div></article>";
}

function viewBoard() {
  var list = S.jobs.slice();
  if (boardFilter.status !== "all") list = list.filter(function (j) { return j.status === boardFilter.status; });
  if (boardFilter.type !== "all") list = list.filter(function (j) { return j.type === boardFilter.type; });
  var me = currentBot();
  if (boardFilter.mine && me) list = list.filter(function (j) { return j.assignee === me.id; });
  var order = { Open: 0, Active: 1, Review: 2, Blocked: 3, Done: 4 };
  list.sort(function (a, b) {
    var s = (order[a.status] || 0) - (order[b.status] || 0);
    if (s) return s;
    return (PRI[a.priority] - PRI[b.priority]) || String(a.deadline || "").localeCompare(String(b.deadline || ""));
  });

  var segs = [["all", "All"], ["Open", "Open"], ["Active", "Active"], ["Review", "In review"], ["Blocked", "Blocked"], ["Done", "Done"]];
  var toolbar = '<div class="toolbar">' + segs.map(function (s) {
    return '<button class="seg' + (boardFilter.status === s[0] ? " on" : "") + '" data-act="filter" data-key="status" data-val="' +
      s[0] + '">' + s[1] + "</button>";
  }).join("") +
    '<select data-change="filter-type" style="max-width:190px"><option value="all">All categories</option>' +
    S.types.map(function (t) {
      return '<option value="' + esc(t.id) + '"' + (boardFilter.type === t.id ? " selected" : "") + ">" + esc(t.name) + "</option>";
    }).join("") + "</select>" +
    (me ? '<label class="switch"><input type="checkbox" data-change="filter-mine"' + (boardFilter.mine ? " checked" : "") + "> Only mine</label>" : "") +
    "</div>";

  var body = list.length ? '<div class="jobgrid">' + list.map(jobCard).join("") + "</div>" :
    '<section class="panel"><p class="empty">' + (S.jobs.length ? "No jobs match this filter." :
      (isBoss() ? "No jobs yet. Post the first one and it lands in the pool." : "No jobs yet. The Boss posts them here.")) + "</p>" +
    (isBoss() && !S.jobs.length ? '<button class="btn sm" data-act="new-job">New job</button>' : "") + "</section>";

  return pageHead("Board", "Every job in one place. Claim one and check in as you go.",
    isBoss() ? '<button class="btn" data-act="new-job">New job</button>' : "") + toolbar + body;
}

/* ---------------- job detail ---------------- */

function viewJob() {
  var j = jobById(currentJobId);
  if (!j) return viewBoard();
  var p = progressOf(j);
  var due = dueInfo(j);
  var cps = j.checkpoints || [];
  var editable = canEditJob(j);
  var t = typeById(j.type);
  var acts = "";

  if (j.status === "Open") {
    if (currentBot()) acts += '<button class="btn" data-act="claim" data-id="' + esc(j.id) + '">Claim this job</button>';
    if (isBoss()) acts += '<button class="btn" data-act="assign-modal" data-id="' + esc(j.id) + '">Assign to a bot</button>';
  }
  if ((j.status === "Active" || j.status === "Blocked") && editable) {
    acts += '<button class="btn" data-act="checkin-open" data-id="' + esc(j.id) + '">Check in</button>';
    if (j.status === "Active") acts += '<button class="btn ghost" data-act="block" data-id="' + esc(j.id) + '">Block</button>';
    else acts += '<button class="btn ghost" data-act="unblock" data-id="' + esc(j.id) + '">Unblock</button>';
  }
  if (j.status === "Active" && editable) {
    acts += '<button class="btn ghost" data-act="submit-review" data-id="' + esc(j.id) + '">Submit for review</button>';
  }
  if (j.status === "Review" && canReview()) {
    acts += '<button class="btn" data-act="review-pass" data-id="' + esc(j.id) + '">Pass</button>' +
      '<button class="btn danger solid" data-act="review-fail" data-id="' + esc(j.id) + '">Send back</button>';
  }
  if (j.status === "Done" && isBoss()) acts += '<button class="btn ghost" data-act="reopen" data-id="' + esc(j.id) + '">Reopen</button>';
  if (isBoss()) acts += '<button class="btn ghost sm" data-act="edit-job" data-id="' + esc(j.id) + '">Edit</button>' +
    '<button class="btn danger sm" data-act="delete-job" data-id="' + esc(j.id) + '">Delete</button>';
  if ((j.status === "Active" || j.status === "Blocked") && isBoss()) {
    acts += '<button class="btn ghost sm" data-act="release" data-id="' + esc(j.id) + '">Release</button>';
  }

  var cpHtml = cps.length ? '<div class="cplist">' + cps.map(function (cp) {
    return '<label class="cp' + (cp.done ? " done" : "") + '"><input type="checkbox" data-cp="' + esc(cp.id) +
      '" data-job="' + esc(j.id) + '"' + (cp.done ? " checked" : "") + (editable ? "" : " disabled") + ">" +
      '<span class="cp-label">' + esc(cp.label) + "</span>" +
      '<span class="cp-who">' + (cp.done ? esc(cp.by || "") + " · " + esc(rel(cp.at)) : "") + "</span></label>";
  }).join("") + "</div>" : '<p class="empty">No checkpoints on this job yet.</p>';

  var checkins = (j.checkins && j.checkins.length) ? j.checkins.map(function (c) {
    return '<div class="checkin"><b>' + esc(c.by) + '</b> <span class="stamp">' + esc(rel(c.at)) + " · " + c.progress +
      '%</span><p>' + esc(c.note) + "</p></div>";
  }).join("") : '<p class="empty">No check-ins yet. The first one starts the clock.</p>';

  var kv = '<dl class="kv">' +
    "<dt>Project</dt><dd>" + esc(j.typeName || "") + "</dd>" +
    "<dt>Priority</dt><dd>" + esc(j.priority || "Normal") + "</dd>" +
    "<dt>Assignee</dt><dd>" + esc(j.assigneeName || "Unassigned") + "</dd>" +
    "<dt>Deadline</dt><dd>" + esc(fmt(j.deadline)) + " <span class=\"" + due.cls + "\">(" + esc(due.text) + ")</span></dd>" +
    "<dt>SLA</dt><dd>" + (j.slaHours ? esc(j.slaHours) + " hours" : "—") + "</dd>" +
    "<dt>Check-in</dt><dd>every " + esc(j.checkinHours || 12) + " hours · last " + esc(rel(j.lastCheckinAt)) + "</dd>" +
    "<dt>Created</dt><dd>" + esc(fmt(j.createdAt)) + " by " + esc(j.createdBy || "Boss") + "</dd>" +
    (j.rework ? "<dt>Sent back</dt><dd>" + esc(j.rework) + " time" + (j.rework === 1 ? "" : "s") + "</dd>" : "") +
    "</dl>";

  return '<button class="back" data-act="nav" data-r="board">← Board</button>' +
    '<div class="detail-head"><div><div class="chiprow">' + typeTag(j) + statusPill(j.status) +
    '<span class="pill pri">' + esc(j.priority || "Normal") + "</span></div><h1>" + esc(j.title) + "</h1>" +
    '<p class="muted">' + esc(j.id) + " · " + esc(j.assigneeName || "unassigned") + " · " + esc(due.text) + "</p></div>" +
    '<div class="headacts">' + acts + "</div></div>" +
    (j.status === "Blocked" && j.blockedReason ? '<div class="panel" style="border-color:color-mix(in srgb,var(--bad) 40%,transparent)"><b class="bad">Blocked — </b>' + esc(j.blockedReason) + "</div>" : "") +
    (j.reviewNote ? '<div class="panel"><b>Review note — </b>' + esc(j.reviewNote) + "</div>" : "") +
    (j.submissionUrl ? '<div class="panel"><b>Submitted — </b>' +
      (/^https?:\/\//i.test(j.submissionUrl) ? '<a href="' + esc(j.submissionUrl) + '" target="_blank" rel="noopener">' + esc(j.submissionUrl) + "</a>" : esc(j.submissionUrl)) +
      (j.submissionNote ? "<p>" + esc(j.submissionNote) + "</p>" : "") +
      ' <span class="stamp">' + esc(rel(j.submittedAt)) + " by " + esc(j.submittedBy || "") + "</span></div>" : "") +
    '<div class="detail-grid"><div class="col">' +
    '<section class="panel"><div class="panel-head"><h2>Checkpoints</h2><span class="muted small">' + p.done + " / " + p.total + "</span></div>" +
    '<div class="bar big"><i style="width:' + p.pct + '%"></i></div>' + cpHtml +
    (editable ? '<div class="row end"><button class="btn ghost sm" data-act="edit-cps" data-id="' + esc(j.id) + '">Edit checkpoints</button></div>' : "") +
    "</section>" +
    '<section class="panel"><div class="panel-head"><h2>Check-ins</h2>' +
    (canEditJob(j) ? '<button class="btn sm" data-act="checkin-open" data-id="' + esc(j.id) + '">Check in</button>' : "") +
    "</div>" + checkins + "</section>" +
    "</div><div class=\"col\">" +
    '<section class="panel"><div class="panel-head"><h2>Brief</h2></div><p class="brieftext">' +
    esc(j.brief || "No brief yet.") + "</p></section>" +
    '<section class="panel"><div class="panel-head"><h2>Details</h2></div>' + kv + "</section>" +
    '<section class="panel"><div class="panel-head"><h2>Activity</h2></div>' +
    ((j.activity || []).length ? (j.activity || []).slice().sort(function (a, b) {
      return String(b.at || "").localeCompare(String(a.at || ""));
    }).map(function (a) {
      return '<div class="act"><span class="act-dot ' + esc(a.kind || "") + '"></span><div><b>' + esc(a.by || "Someone") +
        '</b><p>' + esc(a.text || "") + '</p><span class="stamp">' + esc(rel(a.at)) + "</span></div></div>";
    }).join("") : '<p class="empty">Nothing logged yet.</p>') +
    (t ? '<p class="field-note">' + esc(t.name) + " template: " + (t.checkpoints || []).length + " checkpoints, check-in every " +
      esc(t.checkinHours || 12) + "h.</p>" : "") +
    "</section></div></div>";
}

/* ---------------- auto-assign ---------------- */

function viewAssign() {
  var open = S.jobs.filter(function (j) {
    return j.status === "Open" && (ui.autoType === "all" || j.type === ui.autoType);
  }).sort(function (a, b) {
    return (PRI[a.priority] - PRI[b.priority]) || String(a.deadline || "").localeCompare(String(b.deadline || ""));
  });
  var free = S.bots.filter(function (b) { return b.active !== false && !activeJobOf(b.id); });

  var rows = open.length ? open.map(function (j) {
    var cands = eligibleBots(j);
    var others = S.bots.filter(function (b) { return b.active !== false; });
    return "<tr><td><b>" + esc(j.id) + "</b><br><span class=\"muted small\">" + esc(j.typeName) + " · " + esc(j.priority) + "</span></td>" +
      "<td>" + esc(j.title) + '<br><span class="muted small">' + esc(dueInfo(j).text) + "</span></td>" +
      "<td>" + (cands.length ? '<span class="ok">' + esc(cands[0].name) + "</span>" : '<span class="muted">no free bot</span>') + "</td>" +
      '<td><select data-assign="' + esc(j.id) + '" style="max-width:170px;display:inline-block">' +
      others.map(function (b) {
        return '<option value="' + esc(b.id) + '"' + (cands[0] && cands[0].id === b.id ? " selected" : "") + ">" + esc(b.name) + "</option>";
      }).join("") + "</select> " +
      '<button class="btn sm" data-act="assign-one" data-id="' + esc(j.id) + '">Assign</button></td></tr>';
  }).join("") : '<tr><td colspan="4"><p class="empty">No open jobs in this category.</p></td></tr>';

  var cap = S.bots.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); }).map(function (b) {
    var job = activeJobOf(b.id);
    return '<div class="trow">' + avatar(b.name) + '<div class="tinfo"><b>' + esc(b.name) + "</b><span>" +
      esc((b.categories || []).length ? "categories: " + (b.categories || []).map(function (id) {
        var t = typeById(id); return t ? t.name : id;
      }).join(", ") : "any category") + "</span></div>" +
      (b.active === false ? '<span class="pill">Paused</span>' :
        job ? '<span class="pill st-active">' + esc(job.id) + "</span>" : '<span class="pill st-done">free</span>') + "</div>";
  }).join("") || '<p class="empty">No bots yet.</p>';

  return pageHead("Auto-assign", "Fill the board without hand-picking every job.",
    isBoss() ? '<button class="btn" data-act="new-job">New job</button>' : "") +
    '<section class="panel"><div class="panel-head"><div><h2>Auto-assign</h2>' +
    '<p class="muted">Each open job goes to the free bot whose category fits — fewest pickups first.</p></div>' +
    '<span class="pill">' + open.length + " open</span></div>" +
    '<div class="row"><select data-change="auto-type" style="max-width:230px"><option value="all">All categories</option>' +
    S.types.map(function (t) {
      return '<option value="' + esc(t.id) + '"' + (ui.autoType === t.id ? " selected" : "") + ">" + esc(t.name) + "</option>";
    }).join("") + "</select>" +
    '<button class="btn" data-act="auto-assign"' + (isBoss() ? "" : " disabled") + ">Auto-assign " + open.length + " job" + (open.length === 1 ? "" : "s") + "</button>" +
    '<span class="muted small">' + free.length + " bot" + (free.length === 1 ? "" : "s") + " free now</span></div>" +
    (isBoss() ? "" : '<p class="field-note">Only the Boss can run auto-assign. You can still claim a job from the board.</p>') +
    "</section>" +
    '<section class="panel"><div class="panel-head"><h2>Open jobs</h2><span class="muted small">' + open.length + " to place</span></div>" +
    '<div class="tablewrap"><table><thead><tr><th>Job</th><th>Title</th><th>Suggested</th><th>Assign</th></tr></thead><tbody>' +
    rows + "</tbody></table></div></section>" +
    '<section class="panel"><div class="panel-head"><h2>Capacity</h2><span class="muted small">Who is on what</span></div>' + cap + "</section>";
}

/* ---------------- bots ---------------- */

function viewBots() {
  var cards = S.bots.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); }).map(function (b) {
    var job = activeJobOf(b.id);
    var cats = (b.categories || []).map(function (id) {
      var t = typeById(id);
      return t ? t.name : "";
    }).filter(Boolean);
    return '<article class="botcard"><div class="bothead">' + avatar(b.name, "lg") + "<div><b>" + esc(b.name) +
      "</b><span>" + esc(b.role || "Bot") + "</span></div>" +
      (b.active === false ? '<span class="pill">Paused</span>' :
        '<span class="pill ' + (botOnline(b) ? "st-done" : "") + '"><i></i>' + (botOnline(b) ? "Online" : "Away") + "</span>") +
      "</div>" +
      '<div class="chiprow">' + (cats.length ? cats.map(function (c) {
        return '<span class="tag" style="--t:var(--dim)">' + esc(c) + "</span>";
      }).join("") : '<span class="tag" style="--t:var(--dim)">any category</span>') +
      (b.pinHash ? '<span class="pill">PIN</span>' : "") + "</div>" +
      '<p class="muted small">' + (job ? "On " + esc(job.id) + " · " + esc(job.title) : "No job claimed") +
      " · last seen " + esc(rel(b.lastSeenAt)) + "</p>" +
      '<div class="botfoot">' +
      (isBoss() ? '<button class="btn ghost sm" data-act="edit-bot" data-id="' + esc(b.id) + '">Edit</button>' +
        '<button class="btn ghost sm danger" data-act="del-bot" data-id="' + esc(b.id) + '">Remove</button>' : "") +
      "</div></article>";
  }).join("");

  return pageHead("Bots", "The roster. Categories decide what auto-assign can hand them.",
    isBoss() ? '<button class="btn" data-act="add-bot">Add bot</button>' : "") +
    (S.bots.length ? '<div class="botgrid2">' + cards + "</div>" :
      '<section class="panel"><p class="empty">No bots yet.</p>' +
      (isBoss() ? '<button class="btn sm" data-act="add-bot">Add the first bot</button>' : "") + "</section>") +
    '<section class="panel" style="margin-top:16px"><h2>How bots work here</h2>' +
    '<p class="muted small" style="margin-top:8px">A bot signs in from the picker, claims a job in its categories, ticks checkpoints and checks in. ' +
    "A bot holds one job at a time. Inspectors (role contains review, QA or check) can pass or send back finished jobs. " +
    "A PIN adds a soft gate to the picker — it is not real security.</p></section>";
}

/* ---------------- check-ins ---------------- */

function viewCheckins() {
  var active = S.jobs.filter(function (j) { return j.status === "Active"; });
  var stale = active.filter(needsCheckin).sort(function (a, b) {
    return String(a.lastCheckinAt || "").localeCompare(String(b.lastCheckinAt || ""));
  });
  var rows = stale.length ? stale.map(function (j) {
    return '<div class="trow">' + avatar(j.assigneeName || "?") + '<div class="tinfo"><b>' + esc(j.id) + " · " + esc(j.title) +
      "</b><span>" + esc(j.assigneeName || "Unassigned") + " · last check-in " + esc(rel(j.lastCheckinAt)) + " · " +
      esc(progressOf(j).done) + "/" + esc(progressOf(j).total) + " checkpoints</span></div>" +
      '<button class="btn ghost sm" data-act="open-job" data-id="' + esc(j.id) + '">Open</button></div>';
  }).join("") : '<p class="empty">Every active job has checked in inside its window.</p>';

  var feed = [];
  S.jobs.forEach(function (j) {
    (j.checkins || []).forEach(function (c) { feed.push({ j: j, c: c }); });
  });
  feed.sort(function (a, b) { return String(b.c.at || "").localeCompare(String(a.c.at || "")); });
  var feedHtml = feed.length ? feed.slice(0, 20).map(function (f) {
    return '<div class="checkin"><b>' + esc(f.c.by) + "</b> on " + esc(f.j.id) +
      ' <span class="stamp">' + esc(rel(f.c.at)) + " · " + f.c.progress + '%</span><p>' + esc(f.c.note) + "</p></div>";
  }).join("") : '<p class="empty">No check-ins yet.</p>';

  var mine = currentBot() ? activeJobOf(currentBot().id) : null;
  return pageHead("Check-ins", "The heartbeat. A silent job shows up here before it becomes a missed deadline.",
    mine ? '<button class="btn" data-act="checkin-open" data-id="' + esc(mine.id) + '">Check in on ' + esc(mine.id) + "</button>" : "") +
    '<div class="grid2"><section class="panel"><div class="panel-head"><h2>Needs a check-in</h2>' +
    '<span class="pill ' + (stale.length ? "st-review" : "") + '">' + stale.length + "</span></div>" + rows + "</section>" +
    '<section class="panel"><div class="panel-head"><h2>Recent check-ins</h2></div>' + feedHtml + "</section></div>";
}

/* ---------------- settings ---------------- */

function viewSettings() {
  if (!isBoss()) return viewDash();
  var typeRows = S.types.map(function (t) {
    return '<div class="typerow"><span class="swatch" style="background:' + esc(t.color || "#6ea8fe") + '"></span>' +
      '<div class="tinfo"><b>' + esc(t.name) + '</b><span class="muted">' + esc(t.hours) + "h deadline · check-in every " +
      esc(t.checkinHours || 12) + "h · " + (t.checkpoints || []).length + " checkpoints</span></div>" +
      '<div class="row"><button class="btn ghost sm" data-act="edit-type" data-id="' + esc(t.id) + '">Edit</button>' +
      '<button class="btn ghost sm danger" data-act="del-type" data-id="' + esc(t.id) + '">Delete</button></div></div>';
  }).join("") || '<p class="empty">No project types yet.</p>';

  var cloud = fbConfigured()
    ? (fb.ready ? '<b class="ok">Connected</b> — ' + (fb.user && !fb.user.isAnonymous ? "Boss signed in with Google" : "anonymous bot session") :
      '<b class="warn">Connecting…</b>' + (fb.error ? " — " + esc(fb.error) : ""))
    : '<b class="muted">Local mode</b> — everything stays in this browser';

  return pageHead("Settings", "Project types, checkpoints, branding and data.", "") +
    '<section class="panel"><div class="panel-head"><div><h2>Project types</h2>' +
    '<p class="muted">Each type carries its own deadline, check-in rhythm and checkpoints. New jobs copy the template.</p></div>' +
    '<button class="btn sm" data-act="add-type">Add type</button></div><div class="typelist">' + typeRows + "</div></section>" +
    '<section class="panel"><div class="panel-head"><div><h2>Appearance</h2>' +
    '<p class="muted">Name, tagline and accent colours. The whole app follows.</p></div>' +
    '<button class="btn ghost sm" data-act="edit-brand">Edit branding</button></div>' +
    '<div class="setrow"><div class="tinfo"><b>' + esc(S.brand.name) + "</b><span>" + esc(S.brand.tag || "") + "</span></div>" +
    '<div class="chiprow"><span class="swatch" style="background:' + esc(S.brand.accent) + '"></span>' +
    '<span class="swatch" style="background:' + esc(S.brand.accent2) + '"></span></div></div></section>' +
    '<section class="panel"><div class="panel-head"><div><h2>Shared cloud</h2>' +
    '<p class="muted">Firebase keeps every bot on the same board. Without it the app is local to this browser.</p></div></div>' +
    '<div class="setrow"><div class="tinfo"><b>Status</b><span>' + cloud + "</span></div>" +
    '<div class="row">' +
    (fbConfigured() ? '<button class="btn ghost sm danger" data-act="disconnect-fb">Disconnect</button>' : "") +
    '<button class="btn ghost sm" data-act="connect-fb">' + (fbConfigured() ? "Change config" : "Connect Firebase") + "</button></div></div>" +
    '<p class="field-note">Rules live in firestore.rules. Bots sign in anonymously; the Boss signs in with Google.</p></section>' +
    '<section class="panel"><div class="panel-head"><div><h2>Data</h2>' +
    '<p class="muted">Export a backup any time. Import replaces the board with the file.</p></div></div>' +
    '<div class="row"><button class="btn ghost sm" data-act="export">Export backup</button>' +
    '<button class="btn ghost sm" data-act="import">Import backup</button>' +
    '<button class="btn ghost sm danger" data-act="reset">Reset everything</button></div>' +
    '<p class="field-note">Reset erases every job, bot and check-in in the browser and in the connected cloud, then restores the default project types.</p></section>';
}

/* ---------------- modals ---------------- */

function jobModal() {
  var opts = S.types.map(function (t) {
    return '<option value="' + esc(t.id) + '">' + esc(t.name) + " — " + esc(t.hours) + "h</option>";
  }).join("");
  var bots = '<option value="">Leave open for a bot to claim</option>' + S.bots.filter(function (b) { return b.active !== false; })
    .map(function (b) { return '<option value="' + esc(b.id) + '">' + esc(b.name) + " — " + esc(b.role || "Bot") + "</option>"; }).join("");
  openModal("New job", '<form data-form="new-job">' +
    '<label for="nj-type">Project type</label><select id="nj-type" name="type" data-change="job-type">' + opts + "</select>" +
    '<label for="nj-title">Title</label><input id="nj-title" name="title" type="text" placeholder="What is being made" required>' +
    '<label for="nj-brief">Brief</label><textarea id="nj-brief" name="brief" placeholder="What it is, who it is for, what done looks like"></textarea>' +
    '<label for="nj-pri">Priority</label><select id="nj-pri" name="priority"><option>Urgent</option><option>High</option><option selected>Normal</option><option>Low</option></select>' +
    '<label for="nj-assignee">Assign to</label><select id="nj-assignee" name="assignee">' + bots + "</select>" +
    '<label for="nj-deadline">Deadline</label><input id="nj-deadline" name="deadline" type="datetime-local" value="">' +
    '<p class="field-note">Leave blank — the deadline starts when a bot takes the job. Pick a date only for a fixed deadline.</p>' +
    '<p class="field-note">Checkpoints are copied from the project type. Edit them on the job after posting.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Post job</button></div></form>');
}

function editJobModal(id) {
  var j = jobById(id);
  if (!j) return;
  openModal("Edit " + j.id, '<form data-form="edit-job" data-id="' + esc(j.id) + '">' +
    '<label>Title</label><input name="title" type="text" value="' + esc(j.title) + '" required>' +
    '<label>Brief</label><textarea name="brief">' + esc(j.brief || "") + "</textarea>" +
    '<label>Priority</label><select name="priority">' + ["Urgent", "High", "Normal", "Low"].map(function (p) {
      return '<option' + (j.priority === p ? " selected" : "") + ">" + p + "</option>";
    }).join("") + "</select>" +
    '<label>Deadline</label><input name="deadline" type="datetime-local" value="' + (j.deadline ? dtLocal(j.deadline) : "") + '">' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Save job</button></div></form>', true);
}

function checkinModal(id) {
  var j = jobById(id);
  if (!j) return;
  var cps = j.checkpoints || [];
  var list = cps.length ? '<div class="catgrid" style="flex-direction:column;align-items:stretch">' + cps.map(function (cp) {
    return '<label class="catcheck' + (cp.done ? " on" : "") + '"><input type="checkbox" name="cps" value="' + esc(cp.id) + '"' +
      (cp.done ? " checked disabled" : "") + "> " + esc(cp.label) + "</label>";
  }).join("") + "</div>" : '<p class="empty">This job has no checkpoints.</p>';
  openModal("Check in — " + j.id, '<form data-form="checkin" data-id="' + esc(j.id) + '">' +
    '<label>What moved since last time?</label><textarea name="note" placeholder="Shipped the draft, fixed the loader, blocked on copy…" required></textarea>' +
    '<label>Checkpoints finished</label>' + list +
    '<p class="field-note">Checked ones are already done. Your report lands on the job and the dashboard sees the clock reset.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Check in</button></div></form>');
}

function assignModal(id) {
  var j = jobById(id);
  if (!j) return;
  var cands = eligibleBots(j);
  var all = S.bots.filter(function (b) { return b.active !== false; });
  openModal("Assign " + j.id, '<form data-form="assign" data-id="' + esc(j.id) + '">' +
    '<label>Bot</label><select name="bot">' + all.map(function (b) {
      var busy = activeJobOf(b.id);
      return '<option value="' + esc(b.id) + '"' + (cands[0] && cands[0].id === b.id ? " selected" : "") + ">" +
        esc(b.name) + (busy ? " — busy on " + esc(busy.id) : " — free") + "</option>";
    }).join("") + "</select>" +
    '<p class="field-note">Categories: ' + esc(j.typeName) + " jobs want a bot that takes that category.</p>" +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Assign</button></div></form>');
}

function botModal(id) {
  var b = id ? botById(id) : null;
  var cats = S.types.map(function (t) {
    var on = b && b.categories && b.categories.indexOf(t.id) >= 0;
    return '<label class="catcheck' + (on ? " on" : "") + '"><input type="checkbox" name="cats" value="' + esc(t.id) + '"' +
      (on ? " checked" : "") + "> " + esc(t.name) + "</label>";
  }).join("");
  openModal(b ? "Edit " + b.name : "Add a bot", '<form data-form="bot" data-id="' + esc(b ? b.id : "") + '">' +
    '<label>Name</label><input name="name" type="text" value="' + esc(b ? b.name : "") + '" placeholder="Forge" required>' +
    '<label>Role</label><input name="role" type="text" value="' + esc(b ? b.role || "" : "") + '" placeholder="Builder, Writer, Inspector…">' +
    '<label>Categories this bot takes</label><div class="catgrid">' + cats + "</div>" +
    '<p class="field-note">Leave all unticked to let this bot take any category.</p>' +
    '<label>Bot PIN <span class="muted">(optional soft gate)</span></label><input name="pin" type="password" autocomplete="off" placeholder="' +
    (b && b.pinHash ? "Leave blank to keep the current PIN" : "No PIN") + '">' +
    (b && b.pinHash ? '<label class="switch" style="margin-top:10px"><input type="checkbox" name="clearpin"> Remove the PIN</label>' : "") +
    '<label class="switch" style="margin-top:14px"><input type="checkbox" name="active"' + (b && b.active === false ? "" : " checked") + "> Available for work</label>" +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">' + (b ? "Save bot" : "Add bot") + "</button></div></form>");
}

function typeModal(id) {
  var t = id ? typeById(id) : null;
  var colors = ["#6ea8fe", "#f5b544", "#a78bfa", "#3ce0c2", "#ff6b8a", "#8b7dff", "#7dd3fc", "#fb923c"];
  openModal(t ? "Edit " + t.name : "New project type", '<form data-form="type" data-id="' + esc(t ? t.id : "") + '">' +
    '<label>Name</label><input name="name" type="text" value="' + esc(t ? t.name : "") + '" placeholder="Newsletter" required>' +
    '<div class="row"><div style="flex:1"><label>Deadline (hours)</label><input name="hours" type="number" min="1" step="1" value="' +
    esc(t ? t.hours : 24) + '"></div><div style="flex:1"><label>Check-in every (hours)</label><input name="checkinHours" type="number" min="1" step="1" value="' +
    esc(t ? t.checkinHours || 12 : 12) + '"></div></div>' +
    '<label>Colour</label><select name="color">' + colors.map(function (c) {
      return '<option value="' + c + '"' + (t && t.color === c ? " selected" : "") + ">" + c + "</option>";
    }).join("") + "</select>" +
    '<label>Checkpoints — one per line</label><textarea name="checkpoints" style="min-height:150px" placeholder="One checkpoint per line">' +
    esc(t ? (t.checkpoints || []).join("\n") : "") + "</textarea>" +
    '<p class="field-note">New jobs copy this list. Ticking a checkpoint proves progress before review.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">' + (t ? "Save type" : "Add type") + "</button></div></form>", true);
}

function cpModal(id) {
  var j = jobById(id);
  if (!j) return;
  openModal("Checkpoints — " + j.id, '<form data-form="cps" data-id="' + esc(j.id) + '">' +
    '<label>One checkpoint per line</label><textarea name="checkpoints" style="min-height:180px">' +
    esc((j.checkpoints || []).map(function (c) { return c.label; }).join("\n")) + "</textarea>" +
    '<p class="field-note">Ticked checkpoints keep their tick when the line is unchanged. Removed lines are dropped.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Save checkpoints</button></div></form>');
}

function brandModal() {
  openModal("Branding", '<form data-form="brand">' +
    '<label>Product name</label><input name="name" type="text" value="' + esc(S.brand.name) + '" required>' +
    '<label>Tagline</label><input name="tag" type="text" value="' + esc(S.brand.tag || "") + '">' +
    '<div class="row"><div style="flex:1"><label>Accent</label><input name="accent" type="color" value="' + esc(S.brand.accent) + '"></div>' +
    '<div style="flex:1"><label>Second accent</label><input name="accent2" type="color" value="' + esc(S.brand.accent2) + '"></div></div>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Save branding</button></div></form>');
}

function fbModal() {
  var current = "";
  try { current = localStorage.getItem(LS_FB) || ""; } catch (e) { }
  openModal("Firebase config", '<form data-form="fb">' +
    '<label>Web app config (JSON)</label><textarea name="config" style="min-height:150px" placeholder=\'{"apiKey":"…","authDomain":"…","projectId":"…","appId":"…"}\'>' +
    esc(current) + "</textarea>" +
    '<p class="field-note">App settings → your web app → Config. Anonymous sign-in and Firestore must be enabled. The page reloads after saving. To connect every browser at once, put the same object in <code>app/firebase-config.js</code> instead.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Save &amp; connect</button></div></form>', true);
}

function blockModal(id) {
  openModal("Block " + id, '<form data-form="block" data-id="' + esc(id) + '">' +
    '<label>What is in the way?</label><textarea name="reason" placeholder="Waiting on a decision only the Boss can make" required></textarea>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn danger solid" type="submit">Mark blocked</button></div></form>');
}

function submitModal(id) {
  openModal("Submit " + id + " for review", '<form data-form="submit-review" data-id="' + esc(id) + '">' +
    '<label>Link to the work</label><input name="link" type="text" inputmode="url" placeholder="github.com/owner/repo/pull/12 — or the live URL" required>' +
    '<p class="field-note">GitHub reference, live URL, doc — whatever proves the work.</p>' +
    '<label>Note (optional)</label><textarea name="note" placeholder="What changed, where to look, anything the reviewer should know"></textarea>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Submit for review</button></div></form>');
}

function failModal(id) {
  openModal("Send " + id + " back", '<form data-form="fail" data-id="' + esc(id) + '">' +
    '<label>What needs fixing?</label><textarea name="note" placeholder="The mobile layout breaks at the checkout step" required></textarea>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn danger solid" type="submit">Send back</button></div></form>');
}

function pinModal(bot) {
  openModal("Sign in as " + bot.name, '<form data-form="pin" data-id="' + esc(bot.id) + '">' +
    '<label>PIN</label><input name="pin" type="password" inputmode="numeric" autocomplete="off" required>' +
    '<p class="field-note">This bot is PIN-protected by the Boss.</p>' +
    '<div class="modal-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancel</button>' +
    '<button class="btn" type="submit">Sign in</button></div></form>');
}
