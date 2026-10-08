import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.query.k !== process.env.ANALYTICS_KEY && process.env.ANALYTICS_KEY) {
    return res.status(403).json({ ok: false });
  }
  res.setHeader('Cache-Control', 'no-store');
  let files = [];
  try {
    const found = await list({ prefix: 'hits/' });
    files = (found.blobs || []).sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, 14);
  } catch (e) { return res.status(200).json({ ok: true, total: 0, perDay: {}, pages: [], refs: [] }); }
  const perDay = {}, pages = {}, refs = {};
  let total = 0;
  for (const f of files) {
    const day = f.pathname.replace('hits/', '').replace('.jsonl', '');
    let n = 0;
    try {
      const txt = await (await fetch(f.url)).text();
      for (const line of txt.split('\n')) {
        if (!line.trim()) continue;
        try {
          const h = JSON.parse(line); n++; total++;
          pages[h.p] = (pages[h.p] || 0) + 1;
          if (h.r) { try { const host = new URL(h.r).hostname; refs[host] = (refs[host] || 0) + 1; } catch (e) {} }
        } catch (e) {}
      }
    } catch (e) {}
    perDay[day] = n;
  }
  const top = (o, k) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, k);
  return res.status(200).json({ ok: true, total, perDay, pages: top(pages, 10), refs: top(refs, 10) });
}
