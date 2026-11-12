import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const entry = 'C:/Users/Carlos Gordillo/repos/portfolio/dist-ssr/entry-server.js';
const { posts, caseStudies } = await import(pathToFileURL(entry).href);

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function toPlainText(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function extractFaq(html) {
  const heading = html.match(
    /<h2>([^<]*(?:Preguntas frecuentes|Frequently asked questions)[^<]*)<\/h2>/,
  );
  if (!heading || heading.index === undefined) return [];
  const after = html.slice(heading.index + heading[0].length);
  const nextHeading = after.indexOf('<h2>');
  const block = nextHeading === -1 ? after : after.slice(0, nextHeading);
  return [...block.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)]
    .map((match) => ({
      question: toPlainText(match[1]),
      answer: toPlainText(match[2]),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

const blogIndex = posts.map((post) => ({
  slug: post.slug,
  date: post.date,
  ...(post.updated ? { updated: post.updated } : {}),
  es: {
    title: post.es.title,
    excerpt: post.es.excerpt,
    faq: extractFaq(post.es.html),
  },
  en: {
    title: post.en.title,
    excerpt: post.en.excerpt,
    faq: extractFaq(post.en.html),
  },
}));

const caseIndex = caseStudies.map((study) => ({
  slug: study.slug,
  href: study.href,
  image: study.image,
  stack: study.stack,
  date: study.date,
  relatedPosts: study.relatedPosts,
  es: {
    title: study.es.title,
    subtitle: study.es.subtitle,
    category: study.es.category,
    summary: study.es.summary,
  },
  en: {
    title: study.en.title,
    subtitle: study.en.subtitle,
    category: study.en.category,
    summary: study.en.summary,
  },
}));

const banner = `/**
 * Generated from the full content by scripts/build-indexes.mjs.
 * Keep it free of article bodies: it is imported by the app shell and the
 * prerenderer, and must stay small.
 */
`;

const blogSource = `${banner}
export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostSummary {
  slug: string;
  date: string;
  updated?: string;
  es: { title: string; excerpt: string; faq: FaqItem[] };
  en: { title: string; excerpt: string; faq: FaqItem[] };
}

export const postIndex: PostSummary[] = ${JSON.stringify(blogIndex, null, 2)};

export function getPostSummary(post: PostSummary, language: string) {
  return language.startsWith('en') ? post.en : post.es;
}
`;

const caseSource = `${banner}
export interface CaseSummary {
  slug: string;
  href: string;
  image: string;
  stack: string[];
  date: string;
  relatedPosts: string[];
  es: { title: string; subtitle: string; category: string; summary: string };
  en: { title: string; subtitle: string; category: string; summary: string };
}

export const caseStudyIndex: CaseSummary[] = ${JSON.stringify(caseIndex, null, 2)};

export function getCaseSummary(study: CaseSummary, language: string) {
  return language.startsWith('en') ? study.en : study.es;
}
`;

const root = 'C:/Users/Carlos Gordillo/repos/portfolio/src/content';
await fs.writeFile(`${root}/blog-index.ts`, blogSource);
await fs.writeFile(`${root}/case-studies-index.ts`, caseSource);
console.log(`blog-index: ${blogIndex.length} posts`);
console.log(`case-studies-index: ${caseIndex.length} studies`);
