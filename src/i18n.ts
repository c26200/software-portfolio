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
  // Init síncrono: el cliente debe tener las traducciones en su primer render
  // para que la hidratación coincida con el HTML prerenderizado.
  initImmediate: false,
  interpolation: { escapeValue: false },
});

export default i18n;
