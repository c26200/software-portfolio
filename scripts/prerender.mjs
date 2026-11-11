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
  out = setMeta(out, 'property', 'og:url', meta.canonical ?? 'https://carlosgordillo.com/');
  out = setMeta(out, 'property', 'og:type', meta.type);
  out = setMeta(out, 'property', 'og:image', meta.ogImage);
  out = setMeta(out, 'property', 'og:image:alt', meta.title);
  out = setMeta(out, 'property', 'og:locale', lang === 'en' ? 'en_US' : 'es_CO');
  out = setMeta(out, 'property', 'og:locale:alternate', lang === 'en' ? 'es_CO' : 'en_US');
  out = setMeta(out, 'name', 'twitter:title', meta.title);
  out = setMeta(out, 'name', 'twitter:description', meta.description);
  out = setMeta(out, 'name', 'twitter:image', meta.ogImage);

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

  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
  const alternateTags = (meta.alternates ?? [])
    .map(
      (alternate) =>
        `    <link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}" />`,
    )
    .join('\n');
  if (alternateTags) out = out.replace('</head>', `${alternateTags}\n  </head>`);

  if (meta.jsonLd) {
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    out = out.replace(
      '</head>',
      `    <script type="application/ld+json" id="page-jsonld">${json}</script>\n  </head>`,
    );
  }

  return out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const routes = [
  { path: '/', lang: 'es' },
  { path: '/en', lang: 'en' },
  { path: '/sobre', lang: 'es' },
  { path: '/en/sobre', lang: 'en' },
  { path: '/blog', lang: 'es' },
  { path: '/en/blog', lang: 'en' },
  ...posts.flatMap((post) => [
    { path: `/blog/${post.slug}`, lang: 'es' },
    { path: `/en/blog/${post.slug}`, lang: 'en' },
  ]),
];

for (const { path: route, lang } of routes) {
  const body = await render(route, lang);
  const meta = getPageMeta(route, lang);
  const output = inject(template, body, meta, lang);
  const relative = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  const file = path.join(dist, relative);

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, output);
  console.log(
    `prerendered [${lang}] ${route} -> dist/${relative.replace(/\\/g, '/')} (${body.length} bytes)`,
  );
}

const sitemapEntries = routes
  .map(({ path: route, lang }) => {
    const meta = getPageMeta(route, lang);
    const links = (meta.alternates ?? [])
      .map(
        (alternate) =>
          `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}"/>`,
      )
      .join('\n');
    const lastmod = meta.lastModified
      ? `\n    <lastmod>${meta.lastModified}</lastmod>`
      : '';
    return `  <url>\n    <loc>${escapeHtml(meta.canonical ?? '')}</loc>${lastmod}\n${links}\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`prerender complete: ${routes.length} routes and sitemap.xml`);
