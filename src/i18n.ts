import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

let stored: string | null = null;
try {
  stored = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
} catch {
  stored = null;
}

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: stored || 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
