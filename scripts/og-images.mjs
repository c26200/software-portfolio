/**
 * Generates one 1200x630 social card per article and language into public/og.
 *
 * Requires Playwright. It is not a dependency of this repo, so the script
 * looks for it in PLAYWRIGHT_DIR or in the sibling capture workspace:
 *   PLAYWRIGHT_DIR="C:/path/to/node_modules/playwright" node scripts/og-images.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const outDir = path.join(root, 'public', 'og');
const fontDir = path.join(root, 'public', 'fonts');

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const base =
      process.env.PLAYWRIGHT_DIR ??
      'C:/Users/Carlos Gordillo/portfolio-extract/scripts/package.json';
    const require = createRequire(pathToFileURL(base));
    return require('playwright');
  }
}

const { chromium } = await loadPlaywright();
const { posts, caseStudies } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

async function dataUri(file) {
  const buffer = await fs.readFile(path.join(fontDir, file));
  return `data:font/woff2;base64,${buffer.toString('base64')}`;
}

async function imageUri(publicPath) {
  const buffer = await fs.readFile(path.join(root, 'public', publicPath.replace(/^\//, '')));
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

const [serif, serifItalic, mono, sans] = await Promise.all([
  dataUri('instrument-serif-400-normal.woff2'),
  dataUri('instrument-serif-400-italic.woff2'),
  dataUri('jetbrains-mono-400-normal.woff2'),
  dataUri('inter-tight-400-normal.woff2'),
]);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function formatDate(date, lang) {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

function cardHtml(title, date, lang) {
  const eyebrow = lang === 'en' ? 'BLOG · CARLOS GORDILLO' : 'BLOG · CARLOS GORDILLO';
  const footer = lang === 'en' ? 'FULL STACK · AI · DEVOPS' : 'FULL STACK · IA · DEVOPS';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Instrument Serif'; font-style: normal; font-weight: 400; src: url(${serif}) format('woff2'); }
  @font-face { font-family: 'Instrument Serif'; font-style: italic; font-weight: 400; src: url(${serifItalic}) format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 400; src: url(${mono}) format('woff2'); }
  @font-face { font-family: 'Inter Tight'; font-style: normal; font-weight: 400; src: url(${sans}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #080808;
    color: #f2efe6;
    font-family: 'Inter Tight', system-ui, sans-serif;
    overflow: hidden;
  }
  .card { position: relative; width: 1200px; height: 630px; padding: 64px; display: flex; flex-direction: column; }
  .middle { position: relative; display: flex; flex-direction: column; justify-content: center; flex: 1; min-height: 0; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, #ffffff0a 1px, transparent 1px),
      linear-gradient(to bottom, #ffffff0a 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, #000 55%, transparent 95%);
  }
  .top { position: relative; display: flex; justify-content: space-between; align-items: center; }
  .eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px; letter-spacing: 0.32em; color: #c8ff2e; text-transform: uppercase;
  }
  .dot { width: 9px; height: 9px; background: #c8ff2e; display: block; }
  .mark { width: 18px; height: 18px; background: #c8ff2e; }
  h1 {
    position: relative;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400; font-size: 92px; line-height: 0.98; letter-spacing: -0.015em;
    max-width: 1010px;
  }
  h1 em { font-style: italic; color: #c8ff2e; }
  .date {
    position: relative; margin-top: 28px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px; letter-spacing: 0.14em; text-transform: uppercase; color: #a3a39a;
  }
  .bottom {
    position: relative; margin-top: 32px;
    display: flex; justify-content: space-between; align-items: baseline;
    border-top: 1px solid #ffffff33; padding-top: 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 17px; letter-spacing: 0.18em; text-transform: uppercase; color: #c8ff2e;
  }
  .bottom .domain { color: #a3a39a; letter-spacing: 0.1em; text-transform: lowercase; }
</style>
</head>
<body>
  <div class="card">
    <div class="grid"></div>
    <div class="top">
      <div class="eyebrow"><span class="dot"></span>${escapeHtml(eyebrow)}</div>
      <div class="mark"></div>
    </div>
    <div class="middle">
      <h1 id="title">${escapeHtml(title)}</h1>
      <div class="date">${escapeHtml(formatDate(date, lang))}</div>
    </div>
    <div class="bottom">
      <span>${escapeHtml(footer)}</span>
      <span class="domain">carlosgordillo.com</span>
    </div>
  </div>
</body>
</html>`;
}

function caseCardHtml(name, category, stack, image, lang) {
  const eyebrow = lang === 'en' ? 'CASE STUDY' : 'CASO DE ESTUDIO';
  const footer = lang === 'en' ? 'FULL STACK · AI · DEVOPS' : 'FULL STACK · IA · DEVOPS';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Instrument Serif'; font-style: normal; font-weight: 400; src: url(${serif}) format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 400; src: url(${mono}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; }
  body { background: #080808; color: #f2efe6; font-family: 'Inter Tight', system-ui, sans-serif; overflow: hidden; }
  .card { position: relative; width: 1200px; height: 630px; padding: 64px; display: flex; flex-direction: column; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, #ffffff0a 1px, transparent 1px),
      linear-gradient(to bottom, #ffffff0a 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, #000 50%, transparent 95%);
  }
  .top { position: relative; display: flex; justify-content: space-between; align-items: center; }
  .eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px; letter-spacing: 0.3em; color: #c8ff2e; text-transform: uppercase;
  }
  .dot { width: 9px; height: 9px; background: #c8ff2e; display: block; }
  .mark { width: 18px; height: 18px; background: #c8ff2e; }
  .body { position: relative; display: flex; gap: 48px; align-items: center; flex: 1; }
  .copy { flex: 1; min-width: 0; }
  h1 {
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400; font-size: 78px; line-height: 0.98; letter-spacing: -0.02em;
  }
  .cat {
    margin-top: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px; letter-spacing: 0.16em; text-transform: uppercase; color: #a3a39a;
  }
  .stack {
    margin-top: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; letter-spacing: 0.08em; color: #c8ff2e; max-width: 460px; line-height: 1.6;
  }
  .shot {
    width: 470px; flex: 0 0 470px;
    border: 1px solid #ffffff2e; background: #0e0e0e;
    box-shadow: 0 24px 80px #00000080;
  }
  .shot img { display: block; width: 100%; height: auto; }
  .bottom {
    position: relative; display: flex; justify-content: space-between; align-items: baseline;
    border-top: 1px solid #ffffff33; padding-top: 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px; letter-spacing: 0.18em; text-transform: uppercase; color: #c8ff2e;
  }
  .bottom .domain { color: #a3a39a; letter-spacing: 0.1em; text-transform: lowercase; }
</style>
</head>
<body>
  <div class="card">
    <div class="grid"></div>
    <div class="top">
      <div class="eyebrow"><span class="dot"></span>${escapeHtml(eyebrow)}</div>
      <div class="mark"></div>
    </div>
    <div class="body">
      <div class="copy">
        <h1>${escapeHtml(name)}</h1>
        <p class="cat">${escapeHtml(category)}</p>
        <p class="stack">${escapeHtml(stack)}</p>
      </div>
      <div class="shot"><img src="${image}" alt="" /></div>
    </div>
    <div class="bottom">
      <span>${escapeHtml(footer)}</span>
      <span class="domain">carlosgordillo.com</span>
    </div>
  </div>
</body>
</html>`;
}

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const post of posts) {
  for (const lang of ['es', 'en']) {
    const content = post[lang];
    await page.setContent(cardHtml(content.title, post.date, lang), { waitUntil: 'load' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Shrink the headline until it fits in three lines of the card.
      const title = document.getElementById('title');
      let size = 92;
      title.style.fontSize = `${size}px`;
      while (title.getBoundingClientRect().height > 300 && size > 48) {
        size -= 4;
        title.style.fontSize = `${size}px`;
      }
    });
    const file = path.join(outDir, `${post.slug}-${lang}.png`);
    await page.screenshot({ path: file });
    console.log(`og ${lang} ${post.slug} -> ${path.relative(root, file).replace(/\\/g, '/')}`);
  }
}

for (const study of caseStudies) {
  for (const lang of ['es', 'en']) {
    const content = study[lang];
    const name = content.title.split(':')[0];
    const image = await imageUri(study.image);
    await page.setContent(
      caseCardHtml(name, content.category, study.stack.join(' · '), image, lang),
      { waitUntil: 'load' },
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      const title = document.querySelector('h1');
      let size = 78;
      while (title.scrollHeight > 170 && size > 46) {
        size -= 4;
        title.style.fontSize = `${size}px`;
      }
    });
    const file = path.join(outDir, `proyecto-${study.slug}-${lang}.png`);
    await page.screenshot({ path: file });
    console.log(
      `og case ${lang} ${study.slug} -> ${path.relative(root, file).replace(/\\/g, '/')}`,
    );
  }
}

await browser.close();
