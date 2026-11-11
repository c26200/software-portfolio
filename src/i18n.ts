import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';
import { isEnglishPath } from './i18n-paths';

const initialLanguage = () => {
  if (typeof window === 'undefined') return 'es';
  return isEnglishPath(window.location.pathname) ? 'en' : 'es';
};

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: initialLanguage(),
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
