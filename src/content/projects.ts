export interface ShowcaseProject {
  slug: string;
  href: string;
  image: string;
  stack: string[];
}

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
];
