import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const p = String(req.query.p || '').slice(0, 120);
  if (!p || p.startsWith('/film-room')) return res.status(200).json({ ok: true, skip: true });
  const r = String(req.query.r || '').slice(0, 200);
  const day = new Date().toISOString().slice(0, 10);
  const name = 'hits/' + day + '.jsonl';
  let lines = [];
  try {
    const found = await list({ prefix: name });
    const f = (found.blobs || []).find(b => b.pathname === name);
    if (f) {
      const txt = await (await fetch(f.url)).text();
      lines = txt.split('\n').filter(Boolean);
    }
  } catch (e) {}
  lines.push(JSON.stringify({ t: Date.now(), p, r }));
  if (lines.length > 20000) lines = lines.slice(-20000);
  try {
    await put(name, lines.join('\n'), { access: 'public', contentType: 'application/x-ndjson', addRandomSuffix: false, allowOverwrite: true });
  } catch (e) {}
  return res.status(200).json({ ok: true });
}
