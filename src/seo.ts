import es from './locales/es.json';
import en from './locales/en.json';
import { extractFaq, getPostContent, posts } from './content/blog';
import { localizePath, stripLocale } from './i18n-paths';

export const SITE_ORIGIN = 'https://carlosgordillo.com';
export const SITE_NAME = 'Carlos Gordillo';
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
export const OG_IMAGE_EN = `${SITE_ORIGIN}/og-image-en.png`;

export interface PageAlternate {
  hreflang: string;
  href: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  type: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  lastModified?: string;
  ogImage: string;
  alternates?: PageAlternate[];
  jsonLd?: Record<string, unknown>;
}

/**
 * Single source of truth for the metadata of every route.
 * Used by the client (PageMeta) and by the build-time prerenderer.
 */
export function getPageMeta(pathname: string, language: string): PageMetadata {
  const lang = language.startsWith('en') ? 'en' : 'es';
  const seo = lang === 'en' ? en.seo : es.seo;
  const logicalRaw = stripLocale(pathname);
  const logical = logicalRaw === '/' ? '/' : logicalRaw.replace(/\/+$/, '') || '/';
  const esPath = localizePath(logical, 'es');
  const enPath = localizePath(logical, 'en');
  const canonicalPath = lang === 'en' ? enPath : esPath;
  const canonical = `${SITE_ORIGIN}${canonicalPath}`;
  const ogImage = lang === 'en' ? OG_IMAGE_EN : OG_IMAGE;
  const alternates: PageAlternate[] = [
    { hreflang: 'es', href: `${SITE_ORIGIN}${esPath}` },
    { hreflang: 'en', href: `${SITE_ORIGIN}${enPath}` },
    { hreflang: 'x-default', href: `${SITE_ORIGIN}${esPath}` },
  ];
  const post = logical.startsWith('/blog/')
    ? posts.find((item) => item.slug === logical.slice('/blog/'.length))
    : undefined;

  if (logical === '/') {
    return {
      title: seo.homeTitle,
      description: seo.homeDescription,
      canonical,
      type: 'website',
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Carlos Manuel Gordillo Mora',
        alternateName: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        image: ogImage,
        jobTitle: seo.jobTitle,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Puerto Boyacá',
          addressRegion: 'Boyacá',
          addressCountry: 'CO',
        },
        sameAs: [
          'https://github.com/c26200',
          'https://www.linkedin.com/in/cmgordillo26/',
        ],
      },
    };
  }

  if (logical === '/blog') {
    return {
      title: `Blog — ${SITE_NAME}`,
      description: seo.blogDescription,
      canonical,
      type: 'website',
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `Blog — ${SITE_NAME}`,
        url: canonical,
        description: seo.blogDescription,
        inLanguage: lang,
        author: { '@type': 'Person', name: SITE_NAME },
      },
    };
  }

  if (post) {
    const content = getPostContent(post, lang);
    const faq = extractFaq(content.html);
    const article = {
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: content.title,
      description: content.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: lang,
      image: ogImage,
      author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        sameAs: [
          'https://github.com/c26200',
          'https://www.linkedin.com/in/cmgordillo26/',
        ],
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    };

    const graph: Record<string, unknown>[] = [article];
    if (faq.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    return {
      title: `${content.title} — ${SITE_NAME}`,
      description: content.excerpt,
      canonical,
      type: 'article',
      publishedTime: post.date,
      lastModified: post.updated ?? post.date,
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': graph,
      },
    };
  }

  return {
    title: seo.notFoundTitle,
    description: seo.notFoundDescription,
    type: 'website',
    noindex: true,
    ogImage: OG_IMAGE,
  };
}
