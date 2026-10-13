// Live news plugin: pulls free public RSS feeds and returns the shape news.html expects.
// Cached at Vercel's edge for 15 minutes, so the page stays current all day.
const FEEDS = {
  National: [
    ['NPR', 'https://feeds.npr.org/1003/rss.xml'],
    ['CBS News', 'https://www.cbsnews.com/latest/rss/us'],
    ['ABC News', 'https://abcnews.go.com/abcnews/usheadlines']
  ],
  International: [
    ['BBC', 'https://feeds.bbci.co.uk/news/world/rss.xml'],
    ['NPR', 'https://feeds.npr.org/1004/rss.xml'],
    ['Al Jazeera', 'https://www.aljazeera.com/xml/rss/all.xml']
  ],
  Tech: [
    ['BBC', 'https://feeds.bbci.co.uk/news/technology/rss.xml'],
    ['Ars Technica', 'https://feeds.arstechnica.com/arstechnica/index'],
    ['The Verge', 'https://www.theverge.com/rss/index.xml']
  ]
};
const PER_SECTION = 9;
const ent = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');
const strip = s => ent(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const tag = (x, n) => { const m = x.match(new RegExp('<' + n + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + n + '>', 'i')); return m ? m[1] : ''; };
const attr = (x, re) => { const m = x.match(re); return m ? ent(m[1]) : ''; };
function img(x) {
  return attr(x, /<media:thumbnail[^>]*url="([^"]+)"/i) || attr(x, /<media:content[^>]*url="([^"]+\.(?:jpe?g|png|webp)[^"]*)"/i) ||
    attr(x, /<media:content[^>]*medium="image"[^>]*url="([^"]+)"/i) || attr(x, /<media:content[^>]*url="([^"]+)"[^>]*medium="image"/i) ||
    attr(x, /<enclosure[^>]*url="([^"]+)"[^>]*type="image/i) || attr(x, /<enclosure[^>]*type="image[^"]*"[^>]*url="([^"]+)"/i) ||
    attr(ent(x), /<img[^>]*src="(https?:[^"]+)"/i);
}
async function pull(name, url) {
  try {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': 'LeonLinkNews/1.0 (+https://www.leonlink.net/news.html)' } });
    clearTimeout(to); if (!r.ok) return [];
    const xml = await r.text();
    const items = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || [];
    return items.slice(0, 12).map(x => {
      const link = strip(tag(x, 'link')) || attr(x, /<link[^>]*href="([^"]+)"/i);
      const date = Date.parse(strip(tag(x, 'pubDate') || tag(x, 'published') || tag(x, 'updated') || tag(x, 'dc:date'))) || 0;
      let f = strip(tag(x, 'description') || tag(x, 'summary') || tag(x, 'content'));
      if (f.length > 240) f = f.slice(0, 237).replace(/\s+\S*$/, '') + '…';
      return { t: strip(tag(x, 'title')), f, s: [[name, link]], i: img(x), c: name, d: date };
    }).filter(a => a.t && /^https?:/.test(a.s[0][1]));
  } catch (e) { return []; }
}
export default async function handler(req, res) {
  const sections = {};
  await Promise.all(Object.entries(FEEDS).map(async ([sec, list]) => {
    const all = (await Promise.all(list.map(([n, u]) => pull(n, u)))).flat();
    const seen = new Set(); const out = [];
    all.sort((a, b) => (b.i ? 1 : 0) - (a.i ? 1 : 0) || b.d - a.d); // photos first, newest first
    all.sort((a, b) => b.d - a.d);
    // newest first, but prefer stories with photos within the top set
    const ranked = all.slice(0, 30).sort((a, b) => (b.i ? 1 : 0) - (a.i ? 1 : 0) || b.d - a.d);
    for (const a of ranked) {
      const k = a.t.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
      if (seen.has(k)) continue; seen.add(k); delete a.d; out.push(a);
      if (out.length >= PER_SECTION) break;
    }
    sections[sec] = out;
  }));
  const total = Object.values(sections).reduce((n, a) => n + a.length, 0);
  if (!total) return res.status(503).json({ ok: false });
  const updated = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ET';
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
  return res.status(200).json({ updated, live: true, sections: { National: sections.National, International: sections.International, Tech: sections.Tech } });
}
