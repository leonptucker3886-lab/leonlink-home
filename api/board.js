// Botline board API: the board lives in data/board.json in this GitHub repo.
// GET  /api/board            -> { board, sha }
// POST /api/board  { ops: [ {op:"put", col, id, doc} | {op:"del", col, id} | {op:"patch", col, id, fields} | {op:"seed", board} ] }
// Needs Vercel env vars: GITHUB_TOKEN (contents read/write on this repo).
// Optional: GITHUB_REPO (default leonptucker3886-lab/botline), GITHUB_BRANCH (default main),
//           BOTLINE_WRITE_KEY (if set, POST needs header x-botline-key).
const REPO = process.env.GITHUB_REPO || "leonptucker3886-lab/botline";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const PATH = "data/board.json";
const COLS = { jobs: "jobs", bots: "bots", jobTypes: "types", types: "types" };

function gh(url, opts) {
  opts = opts || {};
  return fetch("https://api.github.com/repos/" + REPO + url, Object.assign({}, opts, {
    headers: Object.assign({
      Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      Accept: "application/vnd.github+json",
      "User-Agent": "botline",
      "Content-Type": "application/json"
    }, opts.headers || {})
  }));
}
function empty() { return { version: 3, updatedAt: null, brand: null, types: [], bots: [], jobs: [] }; }

async function load() {
  const r = await gh("/contents/" + PATH + "?ref=" + BRANCH);
  if (r.status === 404) return { board: empty(), sha: null };
  if (!r.ok) throw new Error("GitHub read " + r.status + ": " + (await r.text()).slice(0, 200));
  const j = await r.json();
  let text;
  if (j.content) text = Buffer.from(j.content, "base64").toString("utf8");
  else {
    const raw = await gh("/contents/" + PATH + "?ref=" + BRANCH, { headers: { Accept: "application/vnd.github.raw" } });
    text = await raw.text();
  }
  const board = Object.assign(empty(), JSON.parse(text || "{}"));
  return { board, sha: j.sha };
}

function apply(board, ops) {
  const changed = [];
  for (const o of ops) {
    if (o.op === "seed") {
      if ((board.jobs || []).length) continue; // never overwrite a board that has cards
      const b = o.board || {};
      if (Array.isArray(b.jobs)) board.jobs = b.jobs;
      if (Array.isArray(b.bots)) board.bots = b.bots;
      if (Array.isArray(b.types) && b.types.length) board.types = b.types;
      if (b.brand) board.brand = b.brand;
      changed.push("seed");
      continue;
    }
    if (o.col === "meta") {
      if (o.op === "put" && o.id === "brand") { board.brand = o.doc; changed.push("brand"); }
      continue;
    }
    const key = COLS[o.col];
    if (!key || !o.id) continue;
    const arr = board[key] = board[key] || [];
    const i = arr.findIndex(x => x.id === o.id);
    if (o.op === "patch") {
      if (i < 0) continue;
      arr[i] = Object.assign({}, arr[i], o.fields || {}, { id: o.id });
      changed.push(o.col + "/" + o.id);
    } else if (o.op === "put") {
      const doc = Object.assign({}, o.doc, { id: o.id });
      if (i >= 0) arr[i] = doc; else arr.push(doc);
      changed.push(o.col + "/" + o.id);
    } else if (o.op === "del" && i >= 0) {
      arr.splice(i, 1);
      changed.push("del " + o.col + "/" + o.id);
    }
  }
  return changed;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-botline-key");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!process.env.GITHUB_TOKEN) return res.status(500).json({ error: "GITHUB_TOKEN is not set in Vercel" });
  try {
    if (req.method === "GET") {
      const { board, sha } = await load();
      return res.status(200).json({ board, sha });
    }
    if (req.method !== "POST") return res.status(405).json({ error: "GET or POST" });
    if (process.env.BOTLINE_WRITE_KEY && req.headers["x-botline-key"] !== process.env.BOTLINE_WRITE_KEY) {
      return res.status(401).json({ error: "bad write key" });
    }
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body || "{}");
    const ops = Array.isArray(body && body.ops) ? body.ops : [];
    if (!ops.length) return res.status(400).json({ error: "no ops" });
    const by = String((body && body.by) || "Botline").slice(0, 40);
    for (let attempt = 0; attempt < 5; attempt++) {
      const { board, sha } = await load();
      const changed = apply(board, ops);
      if (!changed.length) return res.status(200).json({ ok: true, changed: [], board, sha });
      board.updatedAt = new Date().toISOString();
      const content = Buffer.from(JSON.stringify(board, null, 2) + "\n").toString("base64");
      const msg = "board: " + changed.slice(0, 4).join(", ") + (changed.length > 4 ? " +" + (changed.length - 4) : "") + " (" + by + ")";
      const put = await gh("/contents/" + PATH, {
        method: "PUT",
        body: JSON.stringify(Object.assign({ message: msg, content, branch: BRANCH }, sha ? { sha } : {}))
      });
      if (put.ok) {
        const pj = await put.json();
        return res.status(200).json({ ok: true, changed, board, sha: pj.content && pj.content.sha });
      }
      if (put.status !== 409 && put.status !== 422) {
        return res.status(502).json({ error: "GitHub write " + put.status + ": " + (await put.text()).slice(0, 200) });
      }
      await new Promise(r => setTimeout(r, 300 + Math.random() * 700)); // someone else saved first; retry
    }
    return res.status(409).json({ error: "board busy, try again" });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
