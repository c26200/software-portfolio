import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { posts } from '../content/blog';

const ORIGIN = 'https://carlosgordillo.com';
const OG_IMAGE = `${ORIGIN}/og-image.png`;
const NAME = 'Carlos Gordillo';

interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  type: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function setCanonical(href?: string) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.href = href;
    return;
  }
  const el = document.createElement('link');
  el.rel = 'canonical';
  el.href = href;
  document.head.appendChild(el);
}

export default function PageMeta() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = i18n.language.startsWith('en') ? 'en' : 'es';
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const currentUrl = `${ORIGIN}${cleanPath}`;
    const post = pathname.startsWith('/blog/')
      ? posts.find((item) => item.slug === pathname.slice('/blog/'.length))
      : undefined;

    let page: PageMetadata;

    if (pathname === '/') {
      page = {
        title: t('seo.homeTitle'),
        description: t('seo.homeDescription'),
        canonical: `${ORIGIN}/`,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Carlos Manuel Gordillo Mora',
          alternateName: NAME,
          url: `${ORIGIN}/`,
          image: OG_IMAGE,
          jobTitle: t('seo.jobTitle'),
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
    } else if (pathname === '/blog') {
      page = {
        title: `Blog — ${NAME}`,
        description: t('seo.blogDescription'),
        canonical: `${ORIGIN}/blog`,
        type: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Blog — ${NAME}`,
          url: `${ORIGIN}/blog`,
          description: t('seo.blogDescription'),
          author: { '@type': 'Person', name: NAME },
        },
      };
    } else if (post) {
      page = {
        title: `${post.title} — ${NAME}`,
        description: post.excerpt,
        canonical: `${ORIGIN}/blog/${post.slug}`,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'es',
          image: OG_IMAGE,
          author: { '@type': 'Person', name: NAME, url: `${ORIGIN}/` },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${ORIGIN}/blog/${post.slug}`,
          },
        },
      };
    } else {
      page = {
        title: t('seo.notFoundTitle'),
        description: t('seo.notFoundDescription'),
        type: 'website',
        noindex: true,
      };
    }

    document.title = page.title;
    document.documentElement.lang = lang;

    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', page.canonical ?? currentUrl);
    setMeta('property', 'og:type', page.type);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('property', 'og:site_name', NAME);
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'es_CO');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', OG_IMAGE);
    setCanonical(page.canonical);

    if (post && page.type === 'article') {
      setMeta('property', 'article:published_time', post.date);
      setMeta('property', 'article:author', NAME);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:author');
    }

    const id = 'page-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (page.jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(page.jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [t, i18n.language, pathname]);

  return null;
}
