#!/usr/bin/env python3
"""On-page SEO audit for every .html page. Writes a Markdown report to the job summary."""
import re,os,glob
rows=[]
for p in sorted(glob.glob('**/*.html',recursive=True)):
    if p.startswith(('node_modules','.')):continue
    s=open(p,encoding='utf8',errors='ignore').read()
    if 'noindex' in s:continue
    L=[];t=re.search(r'<title>(.*?)</title>',s,re.S)
    if not t:L.append('no title')
    elif len(t.group(1).strip())>65:L.append('title over 65 chars')
    if not re.search(r'name=["\']description["\']',s,re.I):L.append('no meta description')
    if 'rel="canonical"' not in s:L.append('no canonical')
    n=len(re.findall(r'<h1[\s>]',s,re.I))
    if n!=1:L.append('%d h1 tags'%n)
    if not re.search(r'<html[^>]+lang=',s,re.I):L.append('no lang')
    if 'og:title' not in s:L.append('no Open Graph')
    if 'application/ld+json' not in s:L.append('no structured data')
    a=len([i for i in re.findall(r'<img[^>]*>',s,re.I) if 'alt=' not in i])
    if a:L.append('%d images without alt'%a)
    if L:rows.append('| %s | %s |'%(p,', '.join(L)))
out='## SEO audit\n\n%d pages with issues\n\n| Page | Issues |\n|---|---|\n'%len(rows)+'\n'.join(rows)+'\n'
print(out);f=os.environ.get('GITHUB_STEP_SUMMARY')
if f:open(f,'a').write(out)
