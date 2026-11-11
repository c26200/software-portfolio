export interface ShowcaseProject {
  slug: string;
  href: string;
  image: string;
  stack: string[];
}

/** Responsive variants generated from the 1440 px captures. */
export const projectImageSrcSet = (image: string) =>
  `${image.replace(/\.webp$/, '-480.webp')} 480w, ${image.replace(/\.webp$/, '-960.webp')} 960w, ${image.replace(/\.webp$/, '-1200.webp')} 1200w, ${image} 1440w`;

/**
 * Projects with a real UI that can be previewed in the folder.
 * Copy lives in `locales/{es,en}.json` under `projects.folder.<slug>`.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: 'saas-landing-page',
    href: 'https://github.com/c26200/saas-landing-page',
    image: '/projects/saas-landing-page.webp',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    slug: 'dashloud',
    href: 'https://github.com/c26200/dashloud',
    image: '/projects/dashloud.webp',
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
  },
  {
    slug: 'cinetrack',
    href: 'https://github.com/c26200/cinetrack',
    image: '/projects/cinetrack.webp',
    stack: ['React 19', 'Vite', 'OMDB API', 'localStorage'],
  },
  {
    slug: 'kanban-task-manager',
    href: 'https://github.com/c26200/kanban-task-manager',
    image: '/projects/kanban-task-manager.webp',
    stack: ['React', '@dnd-kit', 'Tailwind CSS', 'localStorage'],
  },
  {
    slug: 'trading-predictor',
    href: 'https://github.com/c26200/trading-predictor',
    image: '/projects/trading-predictor.webp',
    stack: ['Python', 'PyTorch', 'LSTM', 'Transformers', 'FastAPI', 'WebSocket'],
  },
  {
    slug: 'portfolio-mecatronica',
    href: 'https://github.com/c26200/mechatronics-portfolio',
    image: '/projects/portfolio-mecatronica.webp',
    stack: ['Astro', 'TypeScript', 'CSS Grid', 'Drag & drop'],
  },
];
