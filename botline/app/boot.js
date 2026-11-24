"use strict";

/* ============================================================
   Botline — events, modals and boot
   ============================================================ */

function toast(msg, tone) {
  var root = document.getElementById("toasts");
  if (!root) return;
  var el = document.createElement("div");
  el.className = "toast " + (tone || "");
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(function () {
    el.classList.add("out");
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 260);
  }, 3800);
}

function openModal(title, body, wide) {
  var root = document.getElementById("modal-root");
  root.innerHTML = '<div class="backdrop"><div class="modal' + (wide ? " wide" : "") + '" role="dialog" aria-modal="true">' +
    '<div class="modal-head"><h2>' + esc(title) + '</h2><button type="button" class="x" data-act="close-modal" aria-label="Close">×</button></div>' +
    '<div class="modal-body">' + body + "</div></div></div>";
  document.body.classList.add("modal-open");
  setTimeout(function () {
    var first = root.querySelector("input,textarea,select");
    if (first) first.focus();
  }, 60);
}
function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
  document.body.classList.remove("modal-open");
}

function go(r) {
  route = r;
  closeModal();
  render();
  window.scrollTo(0, 0);
}

/* ---------------- actions ---------------- */

function pickBot(id) {
  var b = botById(id);
  if (!b) return;
  if (b.active === false) { toast(b.name + " is paused — ask the Boss to unpause", "warn"); return; }
  if (b.pinHash) { pinModal(b); return; }
  enterAsBot(id);
}

function doAssignOne(id) {
  var sel = document.querySelector('[data-assign="' + id + '"]');
  if (!sel || !sel.value) { toast("Pick a bot first", "warn"); return; }
  assignJob(id, sel.value);
}

function disconnectFb() {
  if (!confirm("Disconnect the shared cloud? This browser keeps its copy, but other bots stop seeing updates.")) return;
  try {
    localStorage.removeItem(LS_FB);
    localStorage.setItem(LS_FBOFF, "1");
  } catch (e) { }
  location.reload();
}

function doExport() {
  var data = { version: 2, exportedAt: now(), brand: S.brand, types: S.types, bots: S.bots, jobs: S.jobs };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "botline-backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  toast("Backup downloaded", "good");
}

function doImport(file) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var d = JSON.parse(reader.result);
      if (!d || typeof d !== "object") throw new Error("bad file");
      if (Array.isArray(d.types) && d.types.length) S.types = d.types;
      if (Array.isArray(d.bots)) S.bots = d.bots;
      if (Array.isArray(d.jobs)) S.jobs = d.jobs;
      if (d.brand) S.brand = Object.assign(defaultBrand(), d.brand);
      persistLocal();
      S.types.forEach(function (t) { fsWrite("jobTypes", t.id, t); });
      S.bots.forEach(function (b) { fsWrite("bots", b.id, b); });
      S.jobs.forEach(function (j) { fsWrite("jobs", j.id, j); });
      brandSave();
      render();
      toast("Imported " + S.jobs.length + " jobs and " + S.bots.length + " bots", "good");
    } catch (e) {
      toast("That file is not a Botline backup", "bad");
    }
  };
  reader.readAsText(file);
}

async function doReset() {
  if (!isBoss()) { toast("Only the Boss can reset the board", "warn"); return; }
  if (!confirm("Erase every job, bot and check-in — in this browser and in the connected cloud?")) return;
  if (!confirm("This cannot be undone. Export a backup first if you want one.")) return;
  var db = fsdb();
  if (db) {
    try {
      var batch = db.batch();
      S.jobs.forEach(function (j) { batch.delete(db.collection("jobs").doc(j.id)); });
      S.bots.forEach(function (b) { batch.delete(db.collection("bots").doc(b.id)); });
      S.types.forEach(function (t) { batch.delete(db.collection("jobTypes").doc(t.id)); });
      await batch.commit();
    } catch (e) {
      toast("Cloud wipe failed: " + e.message, "bad");
      return;
    }
  }
  S.jobs = [];
  S.bots = [];
  S.types = defaultTypes();
  S.brand = defaultBrand();
  S.me = null;
  saveMe();
  persistLocal();
  S.types.forEach(function (t) { fsWrite("jobTypes", t.id, t); });
  brandSave();
  closeModal();
  route = "dash";
  render();
  toast("Fresh start — everything cleared", "good");
}

/* ---------------- clicks ---------------- */

document.addEventListener("click", function (e) {
  var backdrop = e.target.closest ? e.target.closest(".backdrop") : null;
  if (backdrop && e.target === backdrop) { closeModal(); return; }

  var el = e.target.closest ? e.target.closest("[data-act]") : null;
  if (!el) return;
  var act = el.dataset.act;
  var id = el.dataset.id;

  switch (act) {
    case "nav": go(el.dataset.r); break;
    case "open-job": currentJobId = id; go("job"); break;
    case "new-job": jobModal(); break;
    case "claim": claimJob(id); break;
    case "filter": boardFilter[el.dataset.key] = el.dataset.val; render(); break;
    case "assign-modal": assignModal(id); break;
    case "assign-one": doAssignOne(id); break;
    case "auto-assign": autoAssign(ui.autoType); break;
    case "checkin-open": checkinModal(id); break;
    case "block": blockModal(id); break;
    case "unblock": unblockJob(id); break;
    case "submit-review": submitModal(id); break;
    case "verdict": verdictModal(id, el.dataset.kind); break;
    case "mark-live": markLive(id); break;
    case "reopen": reopenJob(id); break;
    case "release": releaseJob(id); break;
    case "delete-job": deleteJob(id); break;
    case "edit-job": editJobModal(id); break;
    case "edit-cps": cpModal(id); break;
    case "add-bot": botModal(); break;
    case "edit-bot": botModal(id); break;
    case "del-bot": deleteBot(id); break;
    case "add-type": typeModal(); break;
    case "edit-type": typeModal(id); break;
    case "del-type": deleteType(id); break;
    case "edit-brand": brandModal(); break;
    case "connect-fb": fbModal(); break;
    case "disconnect-fb": disconnectFb(); break;
    case "pick-bot": pickBot(id); break;
    case "boss-login": bossLogin(); break;
    case "switch": signOut(); break;
    case "close-modal": closeModal(); break;
    case "export": doExport(); break;
    case "import": document.getElementById("import-file").click(); break;
    case "reset": doReset(); break;
  }
});

/* ---------------- changes ---------------- */

document.addEventListener("change", function (e) {
  var t = e.target;
  if (!t) return;
  if (t.matches("[data-cp]")) {
    toggleCheckpoint(t.dataset.job, t.dataset.cp, t.checked);
    return;
  }
  if (t.matches("[data-links]")) {
    setCheckpointLinks(t.dataset.job, t.dataset.links, t.value);
    return;
  }
  if (t.name === "cats" && t.closest(".catcheck")) {
    t.closest(".catcheck").classList.toggle("on", t.checked);
    return;
  }
  if (t.id === "import-file") {
    doImport(t.files && t.files[0]);
    t.value = "";
    return;
  }
  var k = t.dataset ? t.dataset.change : null;
  if (k === "filter-type") { boardFilter.type = t.value; render(); }
  else if (k === "filter-mine") { boardFilter.mine = !!t.checked; render(); }
  else if (k === "auto-type") { ui.autoType = t.value; render(); }
  else if (k === "job-type") {
    var ty = typeById(t.value);
    var dl = document.getElementById("nj-deadline");
    // Leave the deadline blank: it starts when a bot takes the job.
    if (ty && dl) dl.value = "";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && document.getElementById("modal-root").innerHTML) closeModal();
});

/* ---------------- forms ---------------- */

document.addEventListener("submit", async function (e) {
  var f = e.target.closest ? e.target.closest("form[data-form]") : null;
  if (!f) return;
  e.preventDefault();
  var kind = f.dataset.form;
  var id = f.dataset.id;
  var fd = new FormData(f);

  if (kind === "pin") {
    var bot = botById(id);
    if (!bot) return;
    var hashed = await hashPin(String(fd.get("pin") || ""));
    if (hashed === bot.pinHash) enterAsBot(bot.id);
    else toast("Wrong PIN", "bad");
    return;
  }

  if (kind === "new-job") {
    var t = typeById(String(fd.get("type") || "")) || S.types[0];
    if (!t) { toast("Add a project type in Settings first", "bad"); return; }
    var title = String(fd.get("title") || "").trim();
    if (!title) { toast("Give the job a title", "warn"); return; }
    var dlRaw = String(fd.get("deadline") || "");
    var explicit = !!dlRaw;
    // No deadline at posting: the clock starts when a bot takes the job.
    // A date typed here is a fixed deadline and is kept as-is.
    var deadline = explicit ? new Date(dlRaw).toISOString() : null;
    var who = (currentUser() || {}).name || "Boss";
    var ts = now();
    var job = {
      id: nextJobId(), type: t.id, typeName: t.name, title: title,
      brief: String(fd.get("brief") || "").trim(),
      priority: String(fd.get("priority") || "Normal"),
      status: "Open", assignee: null, assigneeName: "",
      createdAt: ts, createdBy: who, deadline: deadline, deadlineExplicit: explicit,
      slaHours: Number(t.hours || 24), checkinHours: Number(t.checkinHours || 12),
      checkpoints: (t.checkpoints || []).map(function (label) {
        return { id: uid("cp"), label: label, done: false, at: "", by: "" };
      }),
      checkins: [], activity: [{ at: ts, by: who, kind: "create", text: "Posted in " + t.name }],
      blockedReason: "", reviewNote: "", rework: 0
    };
    var assignee = String(fd.get("assignee") || "");
    if (assignee) {
      var ab = botById(assignee);
      if (ab) {
        job.status = "Active";
        job.assignee = ab.id;
        job.assigneeName = ab.name;
        job.assignedAt = ts;
        job.lastCheckinAt = ts;
        // Assigned at posting, so the clock starts now.
        if (!job.deadlineExplicit) job.deadline = new Date(new Date(ts).getTime() + Number(job.slaHours || 12) * 3600000).toISOString();
        job.activity.push({ at: ts, by: who, kind: "assign", text: "Assigned to " + ab.name });
      }
    }
    jobSave(job, true);
    closeModal();
    currentJobId = job.id;
    route = "job";
    render();
    toast("Posted " + job.id, "good");
    return;
  }

  if (kind === "edit-job") {
    var ej = jobById(id);
    if (!ej) return;
    ej.title = String(fd.get("title") || "").trim() || ej.title;
    ej.brief = String(fd.get("brief") || "").trim();
    ej.priority = String(fd.get("priority") || ej.priority);
    var d2 = String(fd.get("deadline") || "");
    if (d2) { ej.deadline = new Date(d2).toISOString(); ej.deadlineExplicit = true; }
    logActivity(ej, "edit", "Job details edited");
    jobSave(ej);
    closeModal();
    toast("Saved " + ej.id, "good");
    return;
  }

  if (kind === "checkin") {
    var cj = jobById(id);
    if (!cj) return;
    var note = String(fd.get("note") || "").trim();
    if (!note) note = "Checkpoints updated";
    var doneIds = fd.getAll("cps").map(String);
    var linkCounts = {};
    doneIds.forEach(function (cpId) {
      var raw = fd.get("links_" + cpId);
      if (raw != null && String(raw).trim() !== "") linkCounts[cpId] = Number(raw);
    });
    if (applyCheckin(cj, note, doneIds, linkCounts) === false) return;
    closeModal();
    return;
  }

  if (kind === "assign") {
    var to = String(fd.get("bot") || "");
    if (!to) { toast("Pick a bot", "warn"); return; }
    await assignJob(id, to);
    closeModal();
    return;
  }

  if (kind === "bot") {
    var name = String(fd.get("name") || "").trim();
    if (!name) { toast("A bot needs a name", "warn"); return; }
    var clash = S.bots.some(function (b) { return b.id !== id && String(b.name).toLowerCase() === name.toLowerCase(); });
    if (clash) { toast("Another bot already has that name", "bad"); return; }
    var existing = id ? botById(id) : null;
    var nb = existing || { id: uid("bot-"), createdAt: now(), lastSeenAt: "" };
    nb.name = name;
    nb.role = String(fd.get("role") || "").trim();
    nb.categories = fd.getAll("cats").map(String);
    nb.active = !!fd.get("active");
    if (fd.get("clearpin")) nb.pinHash = "";
    var pin = String(fd.get("pin") || "").trim();
    if (pin) nb.pinHash = await hashPin(pin);
    nb.updatedAt = now();
    botSave(nb);
    closeModal();
    toast(existing ? "Saved " + name : name + " added", "good");
    return;
  }

  if (kind === "type") {
    var tname = String(fd.get("name") || "").trim();
    if (!tname) { toast("A type needs a name", "warn"); return; }
    var existingT = id ? typeById(id) : null;
    var baseId = existingT ? existingT.id : slug(tname);
    var newId = baseId;
    var n = 1;
    while (!existingT && typeById(newId)) { n++; newId = baseId + "-" + n; }
    var checkpoints = String(fd.get("checkpoints") || "").split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
    var nt = existingT || { id: newId, name: tname, color: "#6ea8fe", checkpoints: [] };
    nt.name = tname;
    nt.hours = Number(fd.get("hours")) || 24;
    nt.checkinHours = Number(fd.get("checkinHours")) || 12;
    nt.color = String(fd.get("color") || "#6ea8fe");
    nt.checkpoints = checkpoints;
    typeSave(nt);
    closeModal();
    toast(existingT ? "Saved " + tname : tname + " type added", "good");
    return;
  }

  if (kind === "cps") {
    var pj = jobById(id);
    if (!pj) return;
    var lines = String(fd.get("checkpoints") || "").split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
    var current = pj.checkpoints || [];
    pj.checkpoints = lines.map(function (label) {
      var found = null;
      for (var i = 0; i < current.length; i++) if (current[i].label === label) { found = current[i]; break; }
      return found || { id: uid("cp"), label: label, done: false, at: "", by: "" };
    });
    logActivity(pj, "checkpoint", "Checkpoints edited (" + pj.checkpoints.length + ")");
    jobSave(pj);
    closeModal();
    toast("Checkpoints saved", "good");
    return;
  }

  if (kind === "brand") {
    S.brand = {
      name: String(fd.get("name") || "").trim() || "Botline",
      tag: String(fd.get("tag") || "").trim(),
      accent: String(fd.get("accent") || DEFAULT_BRAND.accent),
      accent2: String(fd.get("accent2") || DEFAULT_BRAND.accent2)
    };
    brandSave();
    applyBrand();
    closeModal();
    render();
    toast("Branding saved", "good");
    return;
  }

  if (kind === "fb") {
    try {
      var cfg = JSON.parse(String(fd.get("config") || "").trim());
      if (!cfg.apiKey || !cfg.projectId) throw new Error("needs apiKey and projectId");
      localStorage.setItem(LS_FB, JSON.stringify(cfg));
      localStorage.removeItem(LS_FBOFF);
      location.reload();
    } catch (err) {
      toast("That config did not parse: " + err.message, "bad");
    }
    return;
  }

  if (kind === "block") {
    var reason = String(fd.get("reason") || "").trim();
    if (!reason) { toast("Say what is in the way", "warn"); return; }
    setBlocked(id, reason);
    closeModal();
    return;
  }

  if (kind === "verdict") {
    var vkind = String(fd.get("verdict") || "");
    var vnote = String(fd.get("note") || "").trim();
    var vreport = String(fd.get("report") || "").trim();
    if (!vkind) { toast("Pick a verdict", "warn"); return; }
    if (vkind !== "approved" && !vnote) { toast("Say what needs fixing", "warn"); return; }
    applyVerdict(id, vkind, vnote, vreport);
    closeModal();
    return;
  }

  if (kind === "submit-review") {
    var slink = String(fd.get("link") || "").trim();
    var snote = String(fd.get("note") || "").trim();
    if (!slink) { toast("Add the link to the work", "warn"); return; }
    submitForReview(id, slink, snote);
    closeModal();
    return;
  }
});

/* ---------------- heartbeat + boot ---------------- */

setInterval(function () {
  var b = currentBot();
  if (!b) return;
  b.lastSeenAt = now();
  persistLocal();
  fsWrite("bots", b.id, b);
}, 4 * 60 * 1000);

(function boot() {
  loadLocal();
  normalizeJobs();
  if (S.me && S.me.kind === "bot" && !currentBot()) { S.me = null; saveMe(); }
  applyBrand();
  render();
  startFirebase();
})();
