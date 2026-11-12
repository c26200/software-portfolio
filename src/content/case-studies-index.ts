/**
 * Generated from the full content by scripts/build-indexes.mjs.
 * Keep it free of article bodies: it is imported by the app shell and the
 * prerenderer, and must stay small.
 */

export interface CaseSummary {
  slug: string;
  href: string;
  image: string;
  stack: string[];
  date: string;
  relatedPosts: string[];
  es: { title: string; subtitle: string; category: string; summary: string };
  en: { title: string; subtitle: string; category: string; summary: string };
}

export const caseStudyIndex: CaseSummary[] = [
  {
    "slug": "saas-landing-page",
    "href": "https://github.com/c26200/saas-landing-page",
    "image": "/projects/saas-landing-page.webp",
    "stack": [
      "React",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "diseno-dashboards-react"
    ],
    "es": {
      "title": "Nexus: una landing que explica un producto de IA en una pantalla",
      "subtitle": "Tipografía a gran escala, bloques de prueba y una jerarquía que lleva del problema al botón sin ruido.",
      "category": "Landing SaaS",
      "summary": "Caso de estudio de Nexus: cómo diseño y construyo una landing para un producto de IA con React, Tailwind y Framer Motion, priorizando jerarquía, prueba y velocidad."
    },
    "en": {
      "title": "Nexus: a landing page that explains an AI product in one screen",
      "subtitle": "Large-scale type, proof blocks and a hierarchy that walks from problem to button without noise.",
      "category": "SaaS landing",
      "summary": "Nexus case study: how I design and build a landing page for an AI product with React, Tailwind and Framer Motion, prioritizing hierarchy, proof and speed."
    }
  },
  {
    "slug": "cinetrack",
    "href": "https://github.com/c26200/cinetrack",
    "image": "/projects/cinetrack.webp",
    "stack": [
      "React 19",
      "Vite",
      "OMDB API",
      "localStorage"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "estado-local-react"
    ],
    "es": {
      "title": "CineTrack: un índice de cine personal que vive en el navegador",
      "subtitle": "Búsqueda real de películas, tres formas de ver la misma colección y persistencia local sin cuentas.",
      "category": "Índice de cine",
      "summary": "Caso de estudio de CineTrack: un índice de cine con React 19, Vite, OMDB y localStorage. Búsqueda, vistas wall/kanban/lista, puntuaciones y notas sin backend."
    },
    "en": {
      "title": "CineTrack: a personal film index that lives in the browser",
      "subtitle": "Real movie search, three ways to see the same collection and local persistence without accounts.",
      "category": "Film index",
      "summary": "CineTrack case study: a film index built with React 19, Vite, OMDB and localStorage. Search, wall/kanban/list views, ratings and notes with no backend."
    }
  },
  {
    "slug": "kanban-task-manager",
    "href": "https://github.com/c26200/kanban-task-manager",
    "image": "/projects/kanban-task-manager.webp",
    "stack": [
      "React",
      "@dnd-kit",
      "Tailwind CSS",
      "localStorage"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "estado-local-react"
    ],
    "es": {
      "title": "Kanban Flow: un tablero que se siente físico y no pide cuenta",
      "subtitle": "Arrastrar y soltar preciso, edición en línea y un estado que sobrevive a la recarga.",
      "category": "Gestión de tareas",
      "summary": "Caso de estudio de Kanban Flow: tablero con arrastrar y soltar entre columnas, edición en línea y persistencia en localStorage, construido con React y @dnd-kit."
    },
    "en": {
      "title": "Kanban Flow: a board that feels physical and asks for no account",
      "subtitle": "Precise drag and drop, inline editing and state that survives a reload.",
      "category": "Task management",
      "summary": "Kanban Flow case study: a board with drag and drop across columns, inline editing and localStorage persistence, built with React and @dnd-kit."
    }
  },
  {
    "slug": "dashloud",
    "href": "https://github.com/c26200/dashloud",
    "image": "/projects/dashloud.webp",
    "stack": [
      "React",
      "Tailwind CSS",
      "Recharts",
      "Framer Motion"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "diseno-dashboards-react"
    ],
    "es": {
      "title": "DashLoud: un dashboard editorial que se lee de un vistazo",
      "subtitle": "Pocas métricas, una gráfica que responde y una tabla que se puede escanear, en claro y oscuro.",
      "category": "Dashboard analítico",
      "summary": "Caso de estudio de DashLoud: dashboard analítico con React, Tailwind, Recharts y Framer Motion. Jerarquía editorial, métricas clave, gráfica de ingresos y transacciones."
    },
    "en": {
      "title": "DashLoud: an editorial dashboard you read at a glance",
      "subtitle": "Few metrics, one chart that answers and a scannable table, in light and dark themes.",
      "category": "Analytics dashboard",
      "summary": "DashLoud case study: an analytics dashboard built with React, Tailwind, Recharts and Framer Motion. Editorial hierarchy, key metrics, revenue chart and transactions."
    }
  },
  {
    "slug": "trading-predictor",
    "href": "https://github.com/c26200/trading-predictor",
    "image": "/projects/trading-predictor.webp",
    "stack": [
      "Python",
      "PyTorch",
      "LSTM",
      "Transformers",
      "FastAPI",
      "WebSocket"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "series-temporales-producto",
      "ia-en-tiempo-real"
    ],
    "es": {
      "title": "TradeScope AI: del notebook a un servicio en tiempo real",
      "subtitle": "Un ensemble LSTM + Transformer servido por WebSocket, con validación temporal estricta y un dashboard de señales.",
      "category": "Predicción bursátil",
      "summary": "Caso de estudio de TradeScope AI: ensemble LSTM + Transformer en PyTorch, servido con FastAPI y WebSocket, con validación walk-forward y operación en contenedores."
    },
    "en": {
      "title": "TradeScope AI: from notebook to a real-time service",
      "subtitle": "An LSTM + Transformer ensemble served over WebSocket, with strict temporal validation and a signal dashboard.",
      "category": "Market prediction",
      "summary": "TradeScope AI case study: an LSTM + Transformer ensemble in PyTorch, served with FastAPI and WebSocket, with walk-forward validation and container operations."
    }
  },
  {
    "slug": "portfolio-mecatronica",
    "href": "https://github.com/c26200/mechatronics-portfolio",
    "image": "/projects/portfolio-mecatronica.webp",
    "stack": [
      "Astro",
      "TypeScript",
      "CSS Grid",
      "Drag & drop"
    ],
    "date": "2026-11-11",
    "relatedPosts": [
      "estado-local-react"
    ],
    "es": {
      "title": "Portafolio Mecatrónico: un lienzo que muestra cómo pienso",
      "subtitle": "Notas y piezas técnicas arrastrables, navegación por teclado y una disposición que se guarda entre visitas.",
      "category": "Portafolio interactivo",
      "summary": "Caso de estudio del Portafolio Mecatrónico: un portafolio Astro con lienzo arrastrable, notas y piezas técnicas, navegación por teclado y disposición persistente."
    },
    "en": {
      "title": "Mechatronics Portfolio: a canvas that shows how I think",
      "subtitle": "Draggable notes and technical parts, keyboard navigation and a layout that persists between visits.",
      "category": "Interactive portfolio",
      "summary": "Mechatronics Portfolio case study: an Astro portfolio with a draggable canvas, notes and technical parts, keyboard navigation and persistent layout."
    }
  }
];

export function getCaseSummary(study: CaseSummary, language: string) {
  return language.startsWith('en') ? study.en : study.es;
}
