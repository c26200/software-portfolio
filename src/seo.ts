import es from './locales/es.json';
import en from './locales/en.json';
import { extractFaq, getPostContent, posts } from './content/blog';
import { localizePath, stripLocale } from './i18n-paths';

export const SITE_ORIGIN = 'https://carlosgordillo.com';
export const SITE_NAME = 'Carlos Gordillo';
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
export const OG_IMAGE_EN = `${SITE_ORIGIN}/og-image-en.png`;

/** Stable entity identifiers. Referenced from every page so Google can resolve one Person. */
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const SITE_ID = `${SITE_ORIGIN}/#website`;
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const PORTRAIT = `${SITE_ORIGIN}/img/carlos-gordillo.jpg`;
export const LOGO = `${SITE_ORIGIN}/favicon-512.png`;

/** Manual content revision date for the static pages, used by the sitemap. */
export const SITE_LAST_MODIFIED = '2026-11-11';

export const SAME_AS = [
  'https://github.com/c26200',
  'https://www.linkedin.com/in/cmgordillo26/',
  'https://x.com/gord17494',
];

/** X/Twitter handle used for twitter:site. */
export const TWITTER_HANDLE = '@gord17494';

/** One social card per article and language, generated into public/og. */
export function ogImageForPost(slug: string, lang: 'es' | 'en') {
  return `${SITE_ORIGIN}/og/${slug}-${lang}.png`;
}

function organizationNode(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO,
      width: 512,
      height: 512,
    },
    founder: { '@id': PERSON_ID },
    sameAs: SAME_AS,
  };
}

function personNode(seo: typeof es.seo): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    alternateName: ['Carlos Manuel Gordillo Mora', 'Carlos Gordillo Mora'],
    url: `${SITE_ORIGIN}/`,
    image: PORTRAIT,
    description: seo.personDescription,
    jobTitle: seo.jobTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Puerto Boyacá',
      addressRegion: 'Boyacá',
      addressCountry: 'CO',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad de Pamplona',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'SENA',
    },
    knowsAbout: seo.knowsAbout,
    hasOccupation: {
      '@type': 'Occupation',
      name: seo.jobTitle,
      occupationalCategory: '15-1252',
    },
    sameAs: SAME_AS,
  };
}

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
      lastModified: SITE_LAST_MODIFIED,
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          personNode(seo),
          organizationNode(),
          {
            '@type': 'WebSite',
            '@id': SITE_ID,
            url: `${SITE_ORIGIN}/`,
            name: SITE_NAME,
            inLanguage: lang === 'en' ? 'en' : 'es-CO',
            publisher: { '@id': PERSON_ID },
          },
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_ORIGIN}/#webpage`,
            url: canonical,
            name: seo.homeTitle,
            inLanguage: lang,
            isPartOf: { '@id': SITE_ID },
            mainEntity: { '@id': PERSON_ID },
          },
        ],
      },
    };
  }

  if (logical === '/sobre') {
    return {
      title: seo.aboutTitle,
      description: seo.aboutDescription,
      canonical,
      type: 'website',
      lastModified: SITE_LAST_MODIFIED,
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organizationNode(),
          {
            '@type': 'ProfilePage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: seo.aboutTitle,
            description: seo.aboutDescription,
            inLanguage: lang,
            isPartOf: { '@id': SITE_ID },
            mainEntity: { '@id': PERSON_ID },
            breadcrumb: { '@id': `${canonical}#breadcrumb` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: seo.breadcrumbHome,
                item: `${SITE_ORIGIN}${localizePath('/', lang)}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: seo.aboutTitle,
              },
            ],
          },
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
      lastModified: SITE_LAST_MODIFIED,
      ogImage,
      alternates,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organizationNode(),
          {
            '@type': 'Blog',
            name: `Blog — ${SITE_NAME}`,
            url: canonical,
            description: seo.blogDescription,
            inLanguage: lang,
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
          },
        ],
      },
    };
  }

  if (post) {
    const content = getPostContent(post, lang);
    const faq = extractFaq(content.html);
    const articleImage = ogImageForPost(post.slug, lang);
    const article = {
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: content.title,
      description: content.excerpt,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: lang,
      image: articleImage,
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': SITE_ID },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    };

    const blogPath = localizePath('/blog', lang);
    const graph: Record<string, unknown>[] = [
      organizationNode(),
      article,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: seo.breadcrumbHome,
            item: `${SITE_ORIGIN}${localizePath('/', lang)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_ORIGIN}${blogPath}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.title,
          },
        ],
      },
    ];
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
      ogImage: articleImage,
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
