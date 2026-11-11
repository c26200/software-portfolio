import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pathLanguage } from '../i18n-paths';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Keeps i18next in sync with the language prefix of the current URL.
 * Runs before paint on the client to avoid a flash of the wrong language.
 */
export default function LanguageSync() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const language = pathLanguage(pathname);

  useIsomorphicLayoutEffect(() => {
    if (i18n.language !== language) void i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [i18n, language]);

  return null;
}
