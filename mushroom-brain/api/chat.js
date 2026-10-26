// Mushroom AI brain for leonlink.net. Set GEMINI_API_KEY (free tier) in Vercel env vars.
const ALLOW = ['https://www.leonlink.net', 'https://leonlink.net'];
const hits = new Map(); // per-IP limit: 20 messages / 10 min
const SYS = "You are Mushroom, the friendly mushroom guide on LeonLink (leonlink.net): games, Kids Corner, watches and Top 5 picks, ebooks, blogs, How-To money guides and tools. Be warm, playful (occasional 🍄), family-friendly and brief (under 90 words). Point to LeonLink pages from CONTEXT with HTML links like <a href='/path'>Title</a>. Never invent URLs. No medical, legal or personalized financial advice; for money questions give general education and point to the How-To guides. Refuse anything not kid-safe.";
export default async function handler(req, res) {
  const o = req.headers.origin || '';
  res.setHeader('Access-Control-Allow-Origin', ALLOW.includes(o) ? o : ALLOW[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: 'AI not configured' });
  const ip = String(req.headers['x-forwarded-for'] || 'x').split(',')[0], now = Date.now();
  const h = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (h.length >= 20) return res.status(429).json({ error: 'slow down' });
  h.push(now); hits.set(ip, h);
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const q = String(b.q || '').slice(0, 300);
  if (!q) return res.status(400).json({ error: 'empty' });
  const ctx = (Array.isArray(b.ctx) ? b.ctx : []).slice(0, 4).map(c => `- ${String(c.t).slice(0,120)} (${String(c.u).slice(0,200)}): ${String(c.d||'').slice(0,400)}`).join('\n');
  const hist = (Array.isArray(b.h) ? b.h : []).slice(-6).map(m => ({ role: m.r === 'u' ? 'user' : 'model', parts: [{ text: String(m.t).slice(0, 400) }] }));
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYS }] },
        contents: [...hist, { role: 'user', parts: [{ text: `CONTEXT (LeonLink pages):\n${ctx || '(none)'}\n\nVisitor: ${q}` }] }],
        generationConfig: { maxOutputTokens: 220, temperature: 0.7 },
        safetySettings: ['HARASSMENT','HATE_SPEECH','SEXUALLY_EXPLICIT','DANGEROUS_CONTENT'].map(c => ({ category: 'HARM_CATEGORY_' + c, threshold: 'BLOCK_LOW_AND_ABOVE' }))
      })
    });
    const j = await r.json();
    const a = (j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts || []).map(p => p.text).join('');
    if (!a) return res.status(502).json({ error: 'no answer' });
    const clean = a.replace(/<(?!\/?(a|b|i|br)\b)[^>]*>/gi, '').replace(/href=['"](?!\/|https:\/\/(www\.)?leonlink\.net)[^'"]*['"]/gi, "href='/'");
    res.status(200).json({ a: clean });
  } catch (e) { res.status(502).json({ error: 'upstream' }); }
}
