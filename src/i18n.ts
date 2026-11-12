import { useSyncExternalStore } from 'react';
import es from './locales/es.json';
import en from './locales/en.json';
import { isEnglishPath } from './i18n-paths';

type Language = 'es' | 'en';

const resources: Record<Language, typeof es> = { es, en };

const initialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'es';
  return isEnglishPath(window.location.pathname) ? 'en' : 'es';
};

let current: Language = initialLanguage();
const listeners = new Set<() => void>();

export function getLanguage(): Language {
  return current;
}

export function changeLanguage(language: string): Promise<void> {
  const next: Language = language.startsWith('en') ? 'en' : 'es';
  if (next !== current) {
    current = next;
    listeners.forEach((listener) => listener());
  }
  return Promise.resolve();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function resolve(source: unknown, path: string): unknown {
  let node = source;
  for (const part of path.split('.')) {
    if (!node || typeof node !== 'object' || !(part in node)) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function t(key: string, options?: { returnObjects?: boolean }): any {
  const value = resolve(resources[current], key) ?? resolve(resources.es, key);
  if (value !== undefined) return value;
  return options?.returnObjects ? [] : key;
}

const i18n = {
  get language(): Language {
    return current;
  },
  changeLanguage,
};

export function useTranslation() {
  const language = useSyncExternalStore(subscribe, getLanguage, getLanguage);
  return {
    t,
    i18n: { language, changeLanguage },
  };
}

export default i18n;
