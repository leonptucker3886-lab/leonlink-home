"use strict";
/* Botline — Boss dashboard (loaded after ui.js): status counts, bot panel,
   due/overdue, inspection results, activity, card placement, and manual
   delivery of submitted cards to an inspector. */

function isInspectorBot(b) { return /inspect|review|qa|check/i.test((b.role || "") + " " + (b.name || "")); }
function isChangesNeeded(j) { var r = lastRound(j); return j.status === "Active" && r && r.verdict === "changes"; }
function lastActivityOfBot(b) {
  var best = "";
  S.jobs.forEach(function (j) { (j.activity || []).forEach(function (a) { if (a.by === b.name && String(a.at) > best) best = a.at; }); });
  return best;
}
var _baseViewDash = viewDash;
viewDash = function () { return isBoss() ? bossDash() : _baseViewDash(); };

function dueRow(j, cls) {
  return '<button class="attn" data-act="open-job" data-id="' + esc(j.id) + '"><span class="attn-main"><b>' + esc(j.id) + " · " + esc(j.title) + "</b>" +
    '<span class="muted">' + esc(assigneeNames(j) || "Unassigned") + " · due " + esc(new Date(j.deadline).toLocaleString()) + "</span></span>" +
    '<span class="pill ' + cls + '">' + esc(dueInfo(j).text) + "</span></button>";
}
function panel(title, body, extra) {
  return '<section class="panel"><div class="panel-head"><h2>' + title + "</h2>" + (extra || "") + "</div>" + body + "</section>";
}

function placeForm() {
  var typeOpts = S.types.map(function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.name) + " (" + esc(t.hours) + "h)</option>"; }).join("");
  var writers = S.bots.filter(function (b) { return b.active !== false && !isInspectorBot(b); });
  var wOpts = writers.map(function (b) {
    var a = activeJobOf(b.id);
    return '<option value="' + esc(b.id) + '">' + esc(b.name) + (a ? " (busy on " + esc(a.id) + ")" : "") + "</option>";
  }).join("");
  return panel("Place a card", '<form data-form="quick-job" class="quickjob">' +
    '<label>Title<input name="title" required placeholder="e.g. Best budget headphones"></label>' +
    '<label>Type<select name="type">' + typeOpts + "</select></label>" +
    '<label>Writers (up to 5; none = open for bots to claim)<select name="assignee" multiple size="5">' + wOpts + "</select></label>" +
    '<label>Due hours<input name="hours" type="number" min="1" step="1" placeholder="type default"></label>' +
    '<label>Priority<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option><option>Low</option></select></label>' +
    '<label class="wide">Brief<textarea name="brief" rows="2" placeholder="Angle, audience, keyword, links"></textarea></label>' +
    '<button class="btn" type="submit">Place card</button>' +
    '<p class="field-note wide">The due clock starts when the writer accepts the card.</p></form>');
}

function deliverPanel(review) {
  var insp = S.bots.filter(function (b) { return b.active !== false && isInspectorBot(b); });
  var opts = insp.map(function (b) { return '<option value="' + esc(b.id) + '">' + esc(b.name) + "</option>"; }).join("");
  var rv = review.slice().sort(function (a, b) { return String(a.submittedAt || "").localeCompare(String(b.submittedAt || "")); });
  var body = rv.length ? rv.map(function (j) {
    var sent = j.inspectorName ? '<span class="pill st-review">With ' + esc(j.inspectorName) + "</span>" : '<span class="pill st-blocked">Not delivered</span>';
    var ctl = insp.length ? '<div class="row"><select data-deliver="' + esc(j.id) + '">' + opts + '</select><button class="btn sm" data-act="deliver" data-id="' + esc(j.id) + '">' + (j.inspectorName ? "Re-send" : "Send") + "</button></div>"
      : '<span class="muted">Add a bot with role Inspector</span>';
    return '<div class="trow deliver"><div class="tinfo"><b><a href="#" data-act="open-job" data-id="' + esc(j.id) + '">' + esc(j.id) + " · " + esc(j.title) + "</a></b>" +
      "<span>" + esc(assigneeNames(j) || "") + " · round " + esc(j.round || roundCount(j) || 1) + " · submitted " + esc(rel(j.submittedAt)) + "</span></div>" + sent + ctl + "</div>";
  }).join("") : '<p class="empty">Nothing submitted right now.</p>';
  return panel("Submitted: deliver to an inspector", body);
}

function botsPanel(review) {
  var bots = S.bots.slice().sort(function (a, b) { return String(a.name).localeCompare(String(b.name)); });
  if (!bots.length) return panel("Bots", '<p class="empty">No bots yet.</p>');
  var rows = bots.map(function (b) {
    var cur;
    if (isInspectorBot(b)) cur = review.filter(function (j) { return j.inspector === b.id; }).length + " to inspect";
    else { var job = activeJobOf(b.id); cur = job ? esc(job.id) + " · " + esc(job.title) : "free"; }
    var la = lastActivityOfBot(b);
    return "<tr><td><b>" + esc(b.name) + '</b><br><span class="muted">' + esc(b.role || "Bot") + (b.active === false ? " · paused" : "") + "</span></td>" +
      "<td>" + cur + "</td><td>" + (b.lastWakeAt ? esc(rel(b.lastWakeAt)) + (b.lastWakeNote ? '<br><span class="muted">' + esc(b.lastWakeNote) + "</span>" : "") : '<span class="muted">never</span>') +
      "</td><td>" + (la ? esc(rel(la)) : '<span class="muted">none</span>') + "</td></tr>";
  }).join("");
  return panel("Bots", '<div class="tablewrap"><table class="dtable"><thead><tr><th>Bot</th><th>Current card</th><th>Last wake-up</th><th>Last activity</th></tr></thead><tbody>' +
    rows + "</tbody></table></div>", '<button class="btn ghost sm" data-act="nav" data-r="bots">Manage</button>');
}

function inspectionPanel() {
  var judged = 0, passes = 0, cards = [];
  S.jobs.forEach(function (j) {
    (j.rounds || []).forEach(function (r) { if (r.verdict) { judged++; if (r.verdict === "approved") passes++; } });
    if ((j.rounds || []).length) cards.push(j);
  });
  var decided = cards.filter(function (j) { return j.rounds[0].verdict; });
  var first = decided.filter(function (j) { return j.rounds[0].verdict === "approved"; }).length;
  var avg = cards.length ? (cards.reduce(function (s, j) { return s + j.rounds.length; }, 0) / cards.length).toFixed(1) : "–";
  var pct = function (a, b) { return b ? Math.round(a / b * 100) + "%" : "–"; };
  var rows = cards.sort(function (a, b) { return b.rounds.length - a.rounds.length; }).slice(0, 12).map(function (j) {
    var r = lastRound(j);
    return "<tr><td>" + esc(j.id) + " · " + esc(j.title) + "</td><td>" + esc(assigneeNames(j) || "") + "</td><td>" + j.rounds.length +
      "</td><td>" + esc(r && r.verdict ? verdictLabel(r.verdict) : "waiting") + "</td></tr>";
  }).join("");
  return panel("Inspection results", '<div class="kpis">' +
    kpi("Pass rate", pct(passes, judged), passes + " of " + judged + " verdicts approved") +
    kpi("First-try pass", pct(first, decided.length), first + " of " + decided.length + " cards") +
    kpi("Avg rounds", avg, "per submitted card") + "</div>" +
    (rows ? '<div class="tablewrap"><table class="dtable"><thead><tr><th>Card</th><th>Writer</th><th>Rounds</th><th>Latest verdict</th></tr></thead><tbody>' + rows + "</tbody></table></div>" : '<p class="empty">No inspections yet.</p>'));
}

function bossDash() {
  var J = S.jobs;
  var review = J.filter(function (j) { return j.status === "Review"; });
  var changes = J.filter(isChangesNeeded);
  var inProg = J.filter(function (j) { return (j.status === "Active" || j.status === "Blocked") && !isChangesNeeded(j); });
  var count = function (st) { return J.filter(function (j) { return st.indexOf(j.status) >= 0; }).length; };
  var running = J.filter(function (j) { return (j.status === "Active" || j.status === "Blocked") && j.deadline; });
  var overdue = running.filter(function (j) { return new Date(j.deadline).getTime() < Date.now(); });
  var soon = running.filter(function (j) { var h = (new Date(j.deadline).getTime() - Date.now()) / 3600000; return h >= 0 && h <= 6; })
    .sort(function (a, b) { return String(a.deadline).localeCompare(String(b.deadline)); });

  var h = pageHead("Dashboard", greeting() + ", Boss." + (GH.lastSync ? " Synced " + rel(GH.lastSync) + "." : " Loading board…"),
    '<button class="btn ghost" data-act="new-job">Full job form</button>');
  if (GH.error) h += panel("Board connection problem", '<p class="bad">' + esc(GH.error) + "</p>");
  if (!S.bots.length) h += setupPanel();
  h += '<div class="kpis">' +
    kpi("Open", count(["Open"]), "waiting for a writer") +
    kpi("In progress", inProg.length, "being written") +
    kpi("In review", review.length, "submitted", review.length ? "warn" : "") +
    kpi("Changes needed", changes.length, "back with the writer", changes.length ? "bad" : "") +
    kpi("Approved", count(["Approved"]), "ready to go live") +
    kpi("Live", count(["Live", "Done"]), "all time", "good") + "</div>";
  h += placeForm();
  h += deliverPanel(review);
  h += botsPanel(review);
  h += '<div class="grid2">' +
    panel("Overdue", overdue.length ? overdue.map(function (j) { return dueRow(j, "st-blocked"); }).join("") : '<p class="empty">Nothing overdue.</p>') +
    panel("Due in the next 6 hours", soon.length ? soon.map(function (j) { return dueRow(j, "st-review"); }).join("") : '<p class="empty">Nothing due soon.</p>') + "</div>";
  h += inspectionPanel();
  h += panel("Recent activity", activityFeed(15));
  return h;
}

function deliverToInspector(jobId, botId) {
  var j = jobById(jobId), b = botById(botId);
  if (!j || !b) { toast("Pick an inspector", "warn"); return; }
  if (j.status !== "Review") { toast("That card isn't waiting for review", "warn"); return; }
  j.inspector = b.id;
  j.inspectorName = b.name;
  j.deliveredAt = now();
  logActivity(j, "review", "Delivered to " + b.name + " for inspection (round " + (j.round || roundCount(j) || 1) + ")");
  logStatus(j, "Delivered to " + b.name);
  jobSave(j);
  toast(j.id + " sent to " + b.name, "good");
}

document.addEventListener("click", function (e) {
  var el = e.target.closest ? e.target.closest('[data-act="deliver"]') : null;
  if (!el) return;
  var sel = document.querySelector('[data-deliver="' + el.dataset.id + '"]');
  deliverToInspector(el.dataset.id, sel && sel.value);
});

document.addEventListener("submit", function (e) {
  var f = e.target.closest ? e.target.closest('form[data-form="quick-job"]') : null;
  if (!f) return;
  e.preventDefault();
  var fd = new FormData(f);
  var t = typeById(String(fd.get("type") || "")) || S.types[0];
  var title = String(fd.get("title") || "").trim();
  if (!t || !title) { toast("Give the card a title and type", "warn"); return; }
  var hours = Number(fd.get("hours")) || Number(t.hours || 24);
  var ts = now();
  var job = {
    id: nextJobId(), type: t.id, typeName: t.name, title: title,
    brief: String(fd.get("brief") || "").trim(), priority: String(fd.get("priority") || "Normal"),
    status: "Open", assignee: null, assigneeName: "", createdAt: ts, createdBy: "Boss",
    deadline: null, deadlineExplicit: false, slaHours: hours, checkinHours: Number(t.checkinHours || 12),
    checkpoints: (t.checkpoints || []).map(function (label) { return { id: uid("cp"), label: label, done: false, at: "", by: "" }; }),
    checkins: [], activity: [{ at: ts, by: "Boss", kind: "create", text: "Posted in " + t.name + " (" + hours + "h once accepted)" }],
    history: [{ at: ts, by: "Boss", label: "Posted" }], blockedReason: "", reviewNote: "", rework: 0
  };
  var team = [];
  fd.getAll("assignee").forEach(function (v) {
    var b = botById(String(v));
    if (b && !team.some(function (x) { return x.id === b.id; })) team.push({ id: b.id, name: b.name });
  });
  if (team.length > MAX_ASSIGNEES) { toast("Max 5 bots per card", "warn"); return; }
  var ab = team.length ? { name: team.map(function (x) { return x.name; }).join(", ") } : null;
  if (team.length) {
    setAssignees(job, team); job.status = "Active"; job.assignedAt = ts; job.lastCheckinAt = ts;
    job.deadline = new Date(Date.now() + hours * 3600000).toISOString();
    job.activity.push({ at: ts, by: "Boss", kind: "assign", text: "Assigned to " + ab.name });
    job.history.push({ at: ts, by: "Boss", label: "Assigned to " + ab.name });
  }
  jobSave(job);
  f.reset();
  toast("Placed " + job.id + (ab ? " for " + ab.name : ""), "good");
});
