import { EN_PATH_BY_ES_PATH } from './content/locale-paths';

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

function normalizePath(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return path === '/' ? '/' : path.replace(/\/+$/, '') || '/';
}

const ES_PATH_BY_EN_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(EN_PATH_BY_ES_PATH).map(([es, en]) => [en, es]),
);

/**
 * Maps a path in either language back to the Spanish logical path used
 * internally for lookups. English pages have their own slugs, so a request
 * to /en/projects/mechatronics-portfolio resolves to /proyectos/portfolio-mecatronica.
 */
export function canonicalPath(pathname: string): string {
  let path = normalizePath(pathname);
  if (path === '/en') path = '/';
  else if (path.startsWith('/en/')) path = path.slice(3);
  return ES_PATH_BY_EN_PATH[path] ?? path;
}

/** Adds the `/en` prefix and translates the slug when the target language is English. */
export function localizePath(pathname: string, language: string): string {
  const canonical = canonicalPath(pathname);
  if (!language.startsWith('en')) return canonical;
  const enPath = EN_PATH_BY_ES_PATH[canonical] ?? canonical;
  return enPath === '/' ? '/en' : `/en${enPath}`;
}
