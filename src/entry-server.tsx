import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import i18n from './i18n';

export { getPageMeta } from './seo';
export { posts } from './content/blog';

/**
 * Renders one route to static HTML at build time.
 * No browser APIs may run during this render.
 */
export async function render(pathname: string, language = 'es') {
  await i18n.changeLanguage(language);
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
