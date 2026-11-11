import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Keeps the tab title, document language and Open Graph title in sync
 * with the active language.
 */
export default function PageMeta() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t('site.title');
    document.title = title;
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'es';
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
  }, [t, i18n.language]);

  return null;
}
