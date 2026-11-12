import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPageMeta, SITE_NAME, SITE_ORIGIN, TWITTER_HANDLE, type PageAlternate } from '../seo';

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

function setAlternates(alternates?: PageAlternate[]) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  for (const alternate of alternates ?? []) {
    const el = document.createElement('link');
    el.rel = 'alternate';
    el.hreflang = alternate.hreflang;
    el.href = alternate.href;
    document.head.appendChild(el);
  }
}

/**
 * Keeps the document metadata in sync with the active route and language.
 * The same metadata is injected at build time by scripts/prerender.mjs.
 */
export default function PageMeta() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = i18n.language.startsWith('en') ? 'en' : 'es';
    const page = getPageMeta(pathname, lang);
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const currentUrl = page.canonical ?? `${SITE_ORIGIN}${cleanPath}`;

    document.title = page.title;
    document.documentElement.lang = lang;

    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', page.type);
    setMeta('property', 'og:image', page.ogImage);
    setMeta('property', 'og:image:alt', page.title);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'es_CO');
    setMeta('property', 'og:locale:alternate', lang === 'en' ? 'es_CO' : 'en_US');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', TWITTER_HANDLE);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', page.ogImage);
    setMeta('name', 'twitter:image:alt', page.title);
    setCanonical(page.canonical);
    setAlternates(page.alternates);

    if (page.type === 'article' && page.publishedTime) {
      setMeta('property', 'article:published_time', page.publishedTime);
      setMeta('property', 'article:author', SITE_NAME);
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:author');
    }

    if (page.type === 'article' && page.lastModified) {
      setMeta('property', 'article:modified_time', page.lastModified);
    } else {
      removeMeta('property', 'article:modified_time');
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
  }, [i18n.language, pathname]);

  return null;
}
