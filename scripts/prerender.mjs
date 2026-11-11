import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, getPageMeta, posts } = await import(pathToFileURL(ssrEntry).href);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function setMeta(html, attr, key, content) {
  const pattern = new RegExp(`<meta ${attr}="${escapeRegExp(key)}" content="[^"]*"\\s*/>`);
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function inject(html, body, meta, lang) {
  let out = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  out = setMeta(out, 'name', 'description', meta.description);
  out = setMeta(out, 'name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
  out = setMeta(out, 'property', 'og:title', meta.title);
  out = setMeta(out, 'property', 'og:description', meta.description);
  out = setMeta(out, 'property', 'og:url', meta.canonical ?? `https://carlosgordillo.com${lang}`);
  out = setMeta(out, 'property', 'og:type', meta.type);
  out = setMeta(out, 'name', 'twitter:title', meta.title);
  out = setMeta(out, 'name', 'twitter:description', meta.description);

  if (meta.type === 'article' && meta.publishedTime) {
    out = setMeta(out, 'property', 'article:published_time', meta.publishedTime);
    out = setMeta(out, 'property', 'article:author', 'Carlos Gordillo');
  }

  if (meta.canonical) {
    out = out.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    );
  }

  if (meta.jsonLd) {
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    out = out.replace(
      '</head>',
      `    <script type="application/ld+json" id="page-jsonld">${json}</script>\n  </head>`,
    );
  }

  return out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const routes = ['/', '/blog', ...posts.map((post) => `/blog/${post.slug}`)];

for (const route of routes) {
  const body = await render(route, 'es');
  const meta = getPageMeta(route, 'es');
  const output = inject(template, body, meta, 'es');
  const relative = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  const file = path.join(dist, relative);

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, output);
  console.log(`prerendered ${route} -> dist/${relative.replace(/\\/g, '/')} (${body.length} bytes)`);
}

console.log(`prerender complete: ${routes.length} routes`);
