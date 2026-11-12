import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App, { type PageComponents } from './App';
import i18n from './i18n';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

export { getPageMeta, TWITTER_HANDLE } from './seo';
export { posts, extractFaq } from './content/blog';
export { caseStudies } from './content/caseStudies';
export { postIndex } from './content/blog-index';
export { caseStudyIndex } from './content/case-studies-index';

const pages: PageComponents = { Home, Sobre, Blog, BlogPost, CaseStudy, NotFound };

/**
 * Renders one route to static HTML at build time.
 * No browser APIs may run during this render.
 */
export async function render(pathname: string, language = 'es') {
  await i18n.changeLanguage(language);
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App pages={pages} />
      </StaticRouter>
    </StrictMode>,
  );
}
