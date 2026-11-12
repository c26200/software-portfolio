import { StrictMode, lazy, type ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/fonts.css';
import './styles/kinetic.css';
import './styles/pipeline.css';
import './i18n';
import App, { type PageComponents } from './App';
import { pageForPath, pageLoaders } from './page-loaders';

// Load the chunk for the current URL before hydrating, so the prerendered HTML
// has its components ready. Other pages stay lazy and load on navigation.
const activePage = pageForPath(window.location.pathname);
const activeModule = await pageLoaders[activePage]();

const pages = {} as PageComponents;
for (const name of Object.keys(pageLoaders) as (keyof PageComponents)[]) {
  pages[name] =
    name === activePage
      ? activeModule.default
      : lazy(pageLoaders[name] as () => Promise<{ default: ComponentType }>);
}

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>
  </StrictMode>
);

// Production pages arrive prerendered; the Vite dev server sends an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
