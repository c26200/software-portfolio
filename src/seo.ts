import es from './locales/es.json';
import en from './locales/en.json';
import { posts } from './content/blog';

export const SITE_ORIGIN = 'https://carlosgordillo.com';
export const SITE_NAME = 'Carlos Gordillo';
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  type: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
}

/**
 * Single source of truth for the metadata of every route.
 * Used by the client (PageMeta) and by the build-time prerenderer.
 */
export function getPageMeta(pathname: string, language: string): PageMetadata {
  const seo = language.startsWith('en') ? en.seo : es.seo;
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const post = path.startsWith('/blog/')
    ? posts.find((item) => item.slug === path.slice('/blog/'.length))
    : undefined;

  if (path === '/') {
    return {
      title: seo.homeTitle,
      description: seo.homeDescription,
      canonical: `${SITE_ORIGIN}/`,
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Carlos Manuel Gordillo Mora',
        alternateName: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        image: OG_IMAGE,
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

  if (path === '/blog') {
    return {
      title: `Blog — ${SITE_NAME}`,
      description: seo.blogDescription,
      canonical: `${SITE_ORIGIN}/blog`,
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `Blog — ${SITE_NAME}`,
        url: `${SITE_ORIGIN}/blog`,
        description: seo.blogDescription,
        author: { '@type': 'Person', name: SITE_NAME },
      },
    };
  }

  if (post) {
    return {
      title: `${post.title} — ${SITE_NAME}`,
      description: post.excerpt,
      canonical: `${SITE_ORIGIN}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'es',
        image: OG_IMAGE,
        author: { '@type': 'Person', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_ORIGIN}/blog/${post.slug}`,
        },
      },
    };
  }

  return {
    title: seo.notFoundTitle,
    description: seo.notFoundDescription,
    type: 'website',
    noindex: true,
  };
}
