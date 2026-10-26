#!/usr/bin/env python3
"""Builds mushroom-index.json: the Mushroom chat's search brain of every public page."""
import json, os, re, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP = ('node_modules', 'tabs-preview')
out = []
for d, dirs, files in os.walk(ROOT):
    dirs[:] = [x for x in dirs if not x.startswith('.') and x not in SKIP]
    for f in files:
        if not f.endswith('.html') or 'tabs-preview' in f: continue
        p = os.path.join(d, f); rel = '/' + os.path.relpath(p, ROOT).replace(os.sep, '/')
        src = open(p, encoding='utf-8', errors='ignore').read()
        if re.search(r'<meta[^>]+noindex', src, re.I): continue
        def g(rx):
            m = re.search(rx, src, re.I | re.S)
            return html.unescape(re.sub(r'\s+', ' ', m.group(1))).strip() if m else ''
        title = g(r'<title>(.*?)</title>') or f
        desc = g(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']')
        body = re.sub(r'<(script|style|nav|footer|header)[^>]*>.*?</\1>', ' ', src, flags=re.I | re.S)
        text = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body))).strip()
        url = (rel[:-10] or '/') if rel.endswith('/index.html') else rel
        out.append({'t': title[:120], 'u': url, 'd': desc[:240], 'x': text[:1500]})
out.sort(key=lambda r: r['u'])
json.dump(out, open(os.path.join(ROOT, 'mushroom-index.json'), 'w'), separators=(',', ':'), ensure_ascii=False)
print(len(out), 'pages indexed')
