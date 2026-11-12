import type { PageComponents } from './App';

export type PageName = keyof PageComponents;

/**
 * One chunk per page. The client loads only the chunk for the current URL
 * before hydrating, so article bodies never ship with the home page.
 */
export const pageLoaders: Record<PageName, () => Promise<{ default: PageComponents[PageName] }>> = {
  Home: () => import('./pages/Home'),
  Sobre: () => import('./pages/Sobre'),
  Blog: () => import('./pages/Blog'),
  BlogPost: () => import('./pages/BlogPost'),
  CaseStudy: () => import('./pages/CaseStudy'),
  NotFound: () => import('./pages/NotFound'),
};

export function pageForPath(pathname: string): PageName {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/' || path === '/en') return 'Home';
  if (path === '/sobre' || path === '/en/sobre') return 'Sobre';
  if (path === '/blog' || path === '/en/blog') return 'Blog';
  if (/^\/(en\/)?blog\/[^/]+$/.test(path)) return 'BlogPost';
  if (/^\/(en\/)?proyectos\/[^/]+$/.test(path)) return 'CaseStudy';
  return 'NotFound';
}
