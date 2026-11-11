export type Lang = 'es' | 'en';

export function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export function pathLanguage(pathname: string): Lang {
  return isEnglishPath(pathname) ? 'en' : 'es';
}

/** Removes the `/en` prefix from a localized path. */
export function stripLocale(pathname: string): string {
  if (!isEnglishPath(pathname)) return pathname || '/';
  return pathname.replace(/^\/en/, '') || '/';
}

/** Adds the `/en` prefix when the target language is English. */
export function localizePath(pathname: string, language: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!language.startsWith('en')) return path;
  return path === '/' ? '/en' : `/en${path}`;
}
