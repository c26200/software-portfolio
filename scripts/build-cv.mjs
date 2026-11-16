import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const outDir = path.join(root, 'public', 'cv');
fs.mkdirSync(outDir, { recursive: true });

function browserCandidates() {
  const candidates = [process.env.CHROME_PATH];
  const local = process.env.LOCALAPPDATA;
  const programFiles = process.env.PROGRAMFILES;
  const programFilesX86 = process.env['PROGRAMFILES(X86)'];

  if (local) {
    const cache = path.join(local, 'ms-playwright');
    if (fs.existsSync(cache)) {
      const builds = fs
        .readdirSync(cache)
        .filter((name) => name.startsWith('chromium-'))
        .sort()
        .reverse();
      for (const build of builds) {
        candidates.push(path.join(cache, build, 'chrome-win64', 'chrome.exe'));
        candidates.push(path.join(cache, build, 'chrome-win', 'chrome.exe'));
      }
    }
    candidates.push(path.join(local, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    candidates.push(path.join(local, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
  }

  for (const base of [programFiles, programFilesX86]) {
    if (!base) continue;
    candidates.push(path.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    candidates.push(path.join(base, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
  }

  candidates.push('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser');
  return candidates.filter(Boolean);
}

function findBrowser() {
  const found = browserCandidates().find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error(
      'No Chromium-based browser found. Set CHROME_PATH to a Chrome, Edge or Chromium executable.',
    );
  }
  return found;
}

const browser = findBrowser();
const targets = [
  { source: 'cv-es.html', output: 'carlos-gordillo-cv-es.pdf' },
  { source: 'cv-en.html', output: 'carlos-gordillo-cv-en.pdf' },
];

for (const target of targets) {
  const source = path.join(root, 'cv', target.source);
  const output = path.join(outDir, target.output);
  if (fs.existsSync(output)) fs.rmSync(output);

  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=10000',
      '--no-pdf-header-footer',
      `--print-to-pdf=${output}`,
      pathToFileURL(source).href,
    ],
    { stdio: 'pipe' },
  );

  if (!fs.existsSync(output)) {
    throw new Error(`Chrome did not produce ${target.output}`);
  }

  const size = fs.statSync(output).size;
  if (size < 20_000) {
    throw new Error(`${target.output} looks empty (${size} bytes)`);
  }
  console.log(`${target.output} — ${(size / 1024).toFixed(1)} kB`);
}
