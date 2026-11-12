export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseSection {
  heading: string;
  html: string;
}

export interface CaseStudyContent {
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  sections: CaseSection[];
  metrics: CaseMetric[];
  lessons: string[];
}

export interface CaseStudy {
  slug: string;
  href: string;
  image: string;
  stack: string[];
  date: string;
  relatedPosts: string[];
  es: CaseStudyContent;
  en: CaseStudyContent;
}

/**
 * Case studies for the projects in the carousel. Each page follows the same
 * narrative: problem, approach, construction and result. Copy is written per
 * language; no machine-translated placeholders.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'saas-landing-page',
    href: 'https://github.com/c26200/saas-landing-page',
    image: '/projects/saas-landing-page.webp',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    date: '2026-11-11',
    relatedPosts: ['diseno-dashboards-react'],
    es: {
      title: 'Nexus: una landing que explica un producto de IA en una pantalla',
      subtitle:
        'Tipografía a gran escala, bloques de prueba y una jerarquía que lleva del problema al botón sin ruido.',
      category: 'Landing SaaS',
      summary:
        'Caso de estudio de Nexus: cómo diseño y construyo una landing para un producto de IA con React, Tailwind y Framer Motion, priorizando jerarquía, prueba y velocidad.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Una landing de producto de IA tiene un reto incómodo: el producto es abstracto y el visitante decide en segundos. La mayoría de plantillas resuelven esto acumulando secciones, degradados y capturas genéricas. El resultado se ve moderno y no dice nada.</p>
<p>Para Nexus el objetivo era distinto: una sola página que explicara qué hace el producto, por qué debería importarle a quien la lee y qué hacer después. Sin carruseles de testimonios inventados y sin una sección por cada funcionalidad.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>Empecé por el orden de las decisiones, no por el diseño. Primero qué es el producto, después la prueba de que funciona y al final la acción. Cada sección debía responder una pregunta concreta antes de pasar a la siguiente.</p>
<p>La identidad visual salió de esa estructura: tipografía de alto contraste a gran escala para el mensaje, acentos lima reservados para lo accionable, y bloques de métricas que funcionan como prueba rápida. El movimiento se usa para revelar, no para decorar: si una animación no ayuda a leer, se queda fuera.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>La página es una aplicación React con Tailwind para el sistema de espaciado y color, y Framer Motion para las transiciones de entrada. Los tokens viven en variables de CSS, así que el modo claro y el oscuro comparten la misma estructura y solo cambian los valores.</p>
<p>Las imágenes van con dimensiones explícitas para evitar saltos de layout, y las animaciones respetan <code>prefers-reduced-motion</code>. El objetivo de rendimiento era que la primera pantalla se leyera de inmediato: poco JavaScript, fuentes controladas y nada bloqueando el render.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El resultado es una landing que se recorre como un argumento: qué es, qué demuestra y qué hacer. La misma estructura sirve como plantilla para otros productos porque el sistema de tokens y los componentes están separados del contenido.</p>
<p>La lección que me llevo es que una landing no se diseña llenando secciones, sino decidiendo qué pregunta responde cada una. El diseño llega después, cuando la estructura ya funciona sin estilos.</p>`,
        },
      ],
      metrics: [
        { label: 'Formato', value: 'Una página' },
        { label: 'Stack', value: 'React · Tailwind' },
        { label: 'Movimiento', value: 'Framer Motion' },
      ],
      lessons: [
        'Ordenar las secciones por decisiones, no por funcionalidades.',
        'Reservar el color de acento para lo que se puede hacer.',
        'Tratar el movimiento como una ayuda de lectura.',
      ],
    },
    en: {
      title: 'Nexus: a landing page that explains an AI product in one screen',
      subtitle:
        'Large-scale type, proof blocks and a hierarchy that walks from problem to button without noise.',
      category: 'SaaS landing',
      summary:
        'Nexus case study: how I design and build a landing page for an AI product with React, Tailwind and Framer Motion, prioritizing hierarchy, proof and speed.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>An AI product landing page has an awkward challenge: the product is abstract and the visitor decides in seconds. Most templates solve this by stacking sections, gradients and generic screenshots. The result looks modern and says nothing.</p>
<p>Nexus had a different goal: a single page that explains what the product does, why the reader should care and what to do next. No carousel of invented testimonials and no section per feature.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I started with the order of decisions, not with the design. First what the product is, then proof that it works and finally the action. Each section had to answer one concrete question before moving on.</p>
<p>The visual identity came from that structure: large-scale, high-contrast type for the message, lime accents reserved for actionable elements, and metric blocks that work as quick proof. Motion is used to reveal, not to decorate: if an animation does not help reading, it is out.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>The page is a React application with Tailwind for the spacing and color system, and Framer Motion for entrance transitions. Tokens live in CSS variables, so light and dark mode share the same structure and only change values.</p>
<p>Images ship with explicit dimensions to avoid layout shifts, and animations respect <code>prefers-reduced-motion</code>. The performance goal was an immediately readable first screen: little JavaScript, controlled fonts and nothing blocking the render.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The result is a landing page you read as an argument: what it is, what it proves and what to do. The same structure works as a template for other products because the token system and components are separated from the content.</p>
<p>The lesson is that a landing page is not designed by filling sections, but by deciding which question each one answers. Design comes later, once the structure works without styles.</p>`,
        },
      ],
      metrics: [
        { label: 'Format', value: 'One page' },
        { label: 'Stack', value: 'React · Tailwind' },
        { label: 'Motion', value: 'Framer Motion' },
      ],
      lessons: [
        'Order sections by decisions, not by features.',
        'Reserve the accent color for what can be done.',
        'Treat motion as a reading aid.',
      ],
    },
  },
  {
    slug: 'cinetrack',
    href: 'https://github.com/c26200/cinetrack',
    image: '/projects/cinetrack.webp',
    stack: ['React 19', 'Vite', 'OMDB API', 'localStorage'],
    date: '2026-11-11',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'CineTrack: un índice de cine personal que vive en el navegador',
      subtitle:
        'Búsqueda real de películas, tres formas de ver la misma colección y persistencia local sin cuentas.',
      category: 'Índice de cine',
      summary:
        'Caso de estudio de CineTrack: un índice de cine con React 19, Vite, OMDB y localStorage. Búsqueda, vistas wall/kanban/lista, puntuaciones y notas sin backend.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Quien lleva un registro de películas suele terminar con la información repartida entre notas, capturas y una hoja de cálculo. Las apps existentes piden una cuenta, sincronizan lo que no quieres compartir y esconden tus propios datos detrás de una suscripción.</p>
<p>CineTrack partió de una restricción clara: sin backend y sin registro. Todo lo que el usuario guarda debía quedarse en su navegador y sobrevivir a recargas. La búsqueda de pósters y metadatos sí necesitaba una fuente externa.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>La decisión central fue tratar la colección como un dato local con forma estable, no como el estado efímero de una pantalla. Cada película tiene un identificador, un estado de visionado, una puntuación y notas; la interfaz es una vista sobre ese modelo.</p>
<p>Por eso la misma colección se puede recorrer de tres maneras: un muro visual para explorar, un tablero kanban para organizar por estado y una lista compacta para editar rápido. La vista cambia la presentación, no los datos.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>La aplicación usa React 19 y Vite. La búsqueda consulta la API de OMDB y normaliza la respuesta antes de guardarla, para no depender del formato exacto del proveedor. Las escrituras en <code>localStorage</code> están centralizadas y se hacen con un esquema versionado: si el modelo cambia, los datos viejos se migran en lugar de romper la app.</p>
<p>La búsqueda aplica un retardo corto para no lanzar una petición por tecla y muestra estados de carga y error explícitos. Los pósters usan dimensiones fijas para que el muro no salte mientras llegan las imágenes.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>CineTrack funciona sin conexión para consultar y editar lo ya guardado; solo la búsqueda de títulos nuevos necesita red. No hay cuentas, no hay servidor y el usuario puede exportar su colección si quiere moverla.</p>
<p>La lección fue que “local-first” no significa improvisar: exige un esquema, migraciones y una separación estricta entre lo que se guarda y cómo se muestra.</p>`,
        },
      ],
      metrics: [
        { label: 'Vistas', value: 'Muro · Kanban · Lista' },
        { label: 'Datos', value: 'OMDB API' },
        { label: 'Persistencia', value: 'localStorage' },
      ],
      lessons: [
        'Modelar la colección antes de diseñar las vistas.',
        'Versionar el esquema local desde el primer día.',
        'Separar la red de la lectura de datos guardados.',
      ],
    },
    en: {
      title: 'CineTrack: a personal film index that lives in the browser',
      subtitle:
        'Real movie search, three ways to see the same collection and local persistence without accounts.',
      category: 'Film index',
      summary:
        'CineTrack case study: a film index built with React 19, Vite, OMDB and localStorage. Search, wall/kanban/list views, ratings and notes with no backend.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>Anyone who keeps a film log ends up with information scattered across notes, screenshots and a spreadsheet. Existing apps require an account, sync data you would rather keep private and hide your own records behind a subscription.</p>
<p>CineTrack started from a clear constraint: no backend and no sign-up. Everything the user saves had to stay in the browser and survive reloads. Poster and metadata search did need an external source.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>The central decision was to treat the collection as local data with a stable shape, not as ephemeral screen state. Every film has an identifier, a watch status, a rating and notes; the interface is a view over that model.</p>
<p>That is why the same collection can be browsed three ways: a visual wall for exploring, a kanban board for organizing by status and a compact list for fast editing. The view changes the presentation, not the data.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>The app uses React 19 and Vite. Search calls the OMDB API and normalizes the response before storing it, so the app does not depend on the provider's exact format. Writes to <code>localStorage</code> are centralized and use a versioned schema: when the model changes, old data is migrated instead of breaking the app.</p>
<p>Search applies a short delay to avoid one request per keystroke and shows explicit loading and error states. Posters use fixed dimensions so the wall does not jump while images load.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>CineTrack works offline for reading and editing what is already saved; only searching for new titles needs the network. There are no accounts, no server, and the user can export the collection if they want to move it.</p>
<p>The lesson was that “local-first” does not mean improvising: it requires a schema, migrations and a strict separation between what is stored and how it is displayed.</p>`,
        },
      ],
      metrics: [
        { label: 'Views', value: 'Wall · Kanban · List' },
        { label: 'Data', value: 'OMDB API' },
        { label: 'Persistence', value: 'localStorage' },
      ],
      lessons: [
        'Model the collection before designing the views.',
        'Version the local schema from day one.',
        'Separate the network from reading stored data.',
      ],
    },
  },
  {
    slug: 'kanban-task-manager',
    href: 'https://github.com/c26200/kanban-task-manager',
    image: '/projects/kanban-task-manager.webp',
    stack: ['React', '@dnd-kit', 'Tailwind CSS', 'localStorage'],
    date: '2026-11-11',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'Kanban Flow: un tablero que se siente físico y no pide cuenta',
      subtitle:
        'Arrastrar y soltar preciso, edición en línea y un estado que sobrevive a la recarga.',
      category: 'Gestión de tareas',
      summary:
        'Caso de estudio de Kanban Flow: tablero con arrastrar y soltar entre columnas, edición en línea y persistencia en localStorage, construido con React y @dnd-kit.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Los tableros de tareas se rompen en dos momentos: cuando arrastras una tarjeta y el destino no es el que esperabas, y cuando recargas y el orden cambió. También suelen exigir una cuenta para algo que debería funcionar en un archivo local.</p>
<p>Kanban Flow debía comportarse como un tablero real: mover una tarjeta se siente inmediato, el orden es explícito y nada se pierde al cerrar la pestaña.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>Separé la interacción del almacenamiento. <code>@dnd-kit</code> se encarga del gesto, las zonas de destino y la accesibilidad por teclado; el estado del tablero vive en un modelo por columnas que se guarda en <code>localStorage</code> después de cada cambio.</p>
<p>La edición en línea evita abrir un formulario para cambiar un título. Cada tarjeta se puede renombrar en su sitio, y el cambio se refleja en el modelo sin pasos intermedios.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>React maneja el estado y Tailwind el sistema visual, con una estética de plano técnico: líneas finas, retículas y etiquetas monoespaciadas. El modelo guarda el orden dentro de cada columna, no solo a qué columna pertenece una tarjeta; así el tablero recupera exactamente la disposición anterior.</p>
<p>Al arrastrar se usa un identificador estable y se actualiza el estado una sola vez al soltar, en lugar de reordenar en cada movimiento del puntero. Los controles tienen equivalentes de teclado para quienes no usan ratón.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El tablero se siente directo: el gesto no compite con animaciones pesadas y la recarga devuelve el mismo estado. No hay backend, ni cuentas, ni datos saliendo del navegador.</p>
<p>La lección fue que el arrastre no es un efecto visual: es una operación de datos con un estado intermedio. Cuanto más simple sea ese estado, menos se rompe la interfaz.</p>`,
        },
      ],
      metrics: [
        { label: 'Interacción', value: 'Drag & drop' },
        { label: 'Persistencia', value: 'localStorage' },
        { label: 'Accesibilidad', value: 'Teclado' },
      ],
      lessons: [
        'Guardar el orden dentro de cada columna, no solo la columna.',
        'Actualizar el modelo al soltar, no en cada movimiento.',
        'Ofrecer una alternativa de teclado al gesto.',
      ],
    },
    en: {
      title: 'Kanban Flow: a board that feels physical and asks for no account',
      subtitle: 'Precise drag and drop, inline editing and state that survives a reload.',
      category: 'Task management',
      summary:
        'Kanban Flow case study: a board with drag and drop across columns, inline editing and localStorage persistence, built with React and @dnd-kit.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>Task boards break at two moments: when you drag a card and the drop target is not the one you expected, and when you reload and the order has changed. They also tend to require an account for something that should work from a local file.</p>
<p>Kanban Flow had to behave like a real board: moving a card feels immediate, the order is explicit and nothing is lost when the tab closes.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I separated interaction from storage. <code>@dnd-kit</code> handles the gesture, drop zones and keyboard accessibility; the board state lives in a per-column model that is written to <code>localStorage</code> after every change.</p>
<p>Inline editing avoids opening a form just to change a title. Each card can be renamed in place, and the change is reflected in the model without intermediate steps.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>React manages state and Tailwind the visual system, with a technical blueprint aesthetic: thin lines, grids and monospaced labels. The model stores the order inside each column, not just which column a card belongs to, so the board restores exactly the previous layout.</p>
<p>Dragging uses a stable identifier and updates state once on drop, instead of reordering on every pointer move. Controls have keyboard equivalents for people who do not use a mouse.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The board feels direct: the gesture does not compete with heavy animations and a reload returns the same state. There is no backend, no accounts and no data leaving the browser.</p>
<p>The lesson was that dragging is not a visual effect: it is a data operation with an intermediate state. The simpler that state is, the less the interface breaks.</p>`,
        },
      ],
      metrics: [
        { label: 'Interaction', value: 'Drag & drop' },
        { label: 'Persistence', value: 'localStorage' },
        { label: 'Accessibility', value: 'Keyboard' },
      ],
      lessons: [
        'Store order within each column, not just the column.',
        'Update the model on drop, not on every move.',
        'Offer a keyboard alternative to the gesture.',
      ],
    },
  },
  {
    slug: 'dashloud',
    href: 'https://github.com/c26200/dashloud',
    image: '/projects/dashloud.webp',
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    date: '2026-11-11',
    relatedPosts: ['diseno-dashboards-react'],
    es: {
      title: 'DashLoud: un dashboard editorial que se lee de un vistazo',
      subtitle:
        'Pocas métricas, una gráfica que responde y una tabla que se puede escanear, en claro y oscuro.',
      category: 'Dashboard analítico',
      summary:
        'Caso de estudio de DashLoud: dashboard analítico con React, Tailwind, Recharts y Framer Motion. Jerarquía editorial, métricas clave, gráfica de ingresos y transacciones.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Muchos dashboards muestran todo lo que la base de datos permite consultar y no lo que alguien necesita decidir. El resultado son doce tarjetas iguales, una gráfica sin contexto y una tabla que nadie lee.</p>
<p>DashLoud partió de la pregunta inversa: si solo pudieras mirar tres cosas al abrir el panel, ¿cuáles serían? El diseño se construyó alrededor de esa respuesta.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>La jerarquía es editorial: un titular con la cifra principal, un bloque pequeño de métricas de apoyo y una gráfica de ingresos que muestra tendencia, no cada punto. La tabla de transacciones queda debajo porque se consulta, no se vigila.</p>
<p>El contraste se trató como parte del contenido. Los dos temas comparten la misma estructura y la misma intensidad de jerarquía; el oscuro no es una inversión automática del claro.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>React organiza los componentes por nivel de lectura, Tailwind aporta el sistema de espaciado y Recharts dibuja la serie de ingresos con tooltips y ejes discretos. Framer Motion anima la entrada de los bloques una sola vez, sin bucles que distraigan.</p>
<p>Los datos de ejemplo viven separados de la presentación, de modo que conectar una API real implica reemplazar una fuente, no reescribir la interfaz. Las cifras usan formato local y las fechas se muestran en una zona horaria explícita.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El panel se entiende en el primer pantallazo: qué pasó, cuánto y dónde mirar después. La tabla sigue disponible para el detalle sin competir con la lectura principal.</p>
<p>La lección fue que un dashboard no es una colección de gráficas, sino un orden de lectura. Si todo tiene el mismo peso, nada se lee.</p>`,
        },
      ],
      metrics: [
        { label: 'Métricas', value: 'KPIs + tendencia' },
        { label: 'Gráficas', value: 'Recharts' },
        { label: 'Temas', value: 'Claro y oscuro' },
      ],
      lessons: [
        'Decidir qué se mira primero y diseñar para eso.',
        'Tratar el contraste como parte del contenido.',
        'Separar los datos de ejemplo de la presentación.',
      ],
    },
    en: {
      title: 'DashLoud: an editorial dashboard you read at a glance',
      subtitle:
        'Few metrics, one chart that answers and a scannable table, in light and dark themes.',
      category: 'Analytics dashboard',
      summary:
        'DashLoud case study: an analytics dashboard built with React, Tailwind, Recharts and Framer Motion. Editorial hierarchy, key metrics, revenue chart and transactions.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>Many dashboards show everything the database can query instead of what someone needs to decide. The result is twelve identical cards, a chart without context and a table nobody reads.</p>
<p>DashLoud started from the opposite question: if you could only look at three things when opening the panel, which would they be? The design was built around that answer.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>The hierarchy is editorial: a headline with the main figure, a small block of supporting metrics and a revenue chart that shows trend, not every point. The transactions table sits below because it is consulted, not monitored.</p>
<p>Contrast was treated as part of the content. Both themes share the same structure and the same strength of hierarchy; dark mode is not an automatic inversion of light mode.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>React organizes components by reading level, Tailwind provides the spacing system and Recharts draws the revenue series with tooltips and restrained axes. Framer Motion animates the blocks in once, without distracting loops.</p>
<p>Sample data lives separately from the presentation, so connecting a real API means replacing a source, not rewriting the interface. Figures use local formatting and dates are shown in an explicit time zone.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The panel makes sense on the first screen: what happened, how much and where to look next. The table remains available for detail without competing with the main reading.</p>
<p>The lesson was that a dashboard is not a collection of charts, but an order of reading. If everything has the same weight, nothing gets read.</p>`,
        },
      ],
      metrics: [
        { label: 'Metrics', value: 'KPIs + trend' },
        { label: 'Charts', value: 'Recharts' },
        { label: 'Themes', value: 'Light and dark' },
      ],
      lessons: [
        'Decide what gets looked at first and design for it.',
        'Treat contrast as part of the content.',
        'Keep sample data separate from presentation.',
      ],
    },
  },
  {
    slug: 'trading-predictor',
    href: 'https://github.com/c26200/trading-predictor',
    image: '/projects/trading-predictor.webp',
    stack: ['Python', 'PyTorch', 'LSTM', 'Transformers', 'FastAPI', 'WebSocket'],
    date: '2026-11-11',
    relatedPosts: ['series-temporales-producto', 'ia-en-tiempo-real'],
    es: {
      title: 'TradeScope AI: del notebook a un servicio en tiempo real',
      subtitle:
        'Un ensemble LSTM + Transformer servido por WebSocket, con validación temporal estricta y un dashboard de señales.',
      category: 'Predicción bursátil',
      summary:
        'Caso de estudio de TradeScope AI: ensemble LSTM + Transformer en PyTorch, servido con FastAPI y WebSocket, con validación walk-forward y operación en contenedores.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Pronosticar una serie financiera en un notebook es fácil de demostrar y difícil de sostener. El modelo se evalúa con filas barajadas, la normalización se ajusta con todo el dataset y el resultado parece bueno hasta que se enfrenta a la siguiente ventana.</p>
<p>El reto de TradeScope AI no era ganar un benchmark: era convertir un experimento de deep learning en un servicio que respondiera a tiempo, mostrara sus señales y fallara de forma controlada.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>Empecé por la validación. Separé por tiempo, nunca al azar, y usé ventanas expansivas para medir MAE, RMSE y precisión direccional por ventana. Un baseline de persistencia quedó como referencia: si el modelo no lo supera de forma consistente, no hay producto.</p>
<p>El ensemble combina una rama LSTM, que captura dependencias locales, con una rama Transformer, que modela relaciones de largo alcance. La combinación pondera cada rama según la ventana y registra su contribución para poder explicar el resultado.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>El entrenamiento corre en PyTorch con semilla fija, ventanas deslizantes y el preprocesador guardado junto al modelo. Servir una normalización distinta a la del entrenamiento es una fuente silenciosa de errores, así que ambos se versionan como una unidad.</p>
<p>El backend usa FastAPI y expone las predicciones por WebSocket porque el panel necesita varias actualizaciones por minuto. Si el modelo falla, el servicio devuelve el último pronóstico válido y registra el error en lugar de romper la interfaz. Todo corre en contenedores Docker sobre un VPS propio, con healthchecks, logs con contexto y una alerta cuando el flujo de datos se detiene.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El proyecto obtuvo el primer puesto en el concurso de deep learning de la Universidad de Pamplona y quedó como un servicio observable: dashboard en tiempo real, métricas por ventana y un procedimiento claro para volver a una versión anterior.</p>
<p>La lección fue que el modelo es una parte del producto. La validación honesta, la latencia, el fallback y el monitoreo deciden si sirve para tomar una decisión.</p>`,
        },
      ],
      metrics: [
        { label: 'Resultado', value: 'Primer puesto' },
        { label: 'Modelo', value: 'LSTM + Transformer' },
        { label: 'Entrega', value: 'WebSocket' },
      ],
      lessons: [
        'Separar por tiempo y no barajar nunca la serie.',
        'Guardar el preprocesador con el modelo.',
        'Medir latencia contra la ventana de decisión.',
      ],
    },
    en: {
      title: 'TradeScope AI: from notebook to a real-time service',
      subtitle:
        'An LSTM + Transformer ensemble served over WebSocket, with strict temporal validation and a signal dashboard.',
      category: 'Market prediction',
      summary:
        'TradeScope AI case study: an LSTM + Transformer ensemble in PyTorch, served with FastAPI and WebSocket, with walk-forward validation and container operations.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>Forecasting a financial series in a notebook is easy to demonstrate and hard to sustain. The model is evaluated with shuffled rows, normalization is fitted on the whole dataset and the result looks good until it faces the next window.</p>
<p>TradeScope AI's challenge was not to win a benchmark: it was to turn a deep learning experiment into a service that answers on time, shows its signals and fails in a controlled way.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>I started with validation. I split by time, never at random, and used expanding windows to measure MAE, RMSE and directional accuracy per window. A persistence baseline stayed as the reference: if the model does not beat it consistently, there is no product.</p>
<p>The ensemble combines an LSTM branch, which captures local dependencies, with a Transformer branch, which models long-range relationships. The combination weights each branch by window and records its contribution so the result can be explained.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>Training runs in PyTorch with a fixed seed, sliding windows and the preprocessor saved next to the model. Serving a different normalization than the one used in training is a silent source of bugs, so both are versioned as one unit.</p>
<p>The backend uses FastAPI and exposes predictions over WebSocket because the panel needs several updates per minute. If the model fails, the service returns the last valid forecast and logs the error instead of breaking the interface. Everything runs in Docker containers on a self-managed VPS, with healthchecks, contextual logs and an alert when the data stream stops.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The project took first place in the Universidad de Pamplona deep learning contest and became an observable service: a real-time dashboard, per-window metrics and a clear procedure to roll back to a previous version.</p>
<p>The lesson was that the model is one part of the product. Honest validation, latency, fallback and monitoring decide whether it is useful for a decision.</p>`,
        },
      ],
      metrics: [
        { label: 'Result', value: '1st place' },
        { label: 'Model', value: 'LSTM + Transformer' },
        { label: 'Delivery', value: 'WebSocket' },
      ],
      lessons: [
        'Split by time and never shuffle the series.',
        'Save the preprocessor with the model.',
        'Measure latency against the decision window.',
      ],
    },
  },
  {
    slug: 'portfolio-mecatronica',
    href: 'https://github.com/c26200/mechatronics-portfolio',
    image: '/projects/portfolio-mecatronica.webp',
    stack: ['Astro', 'TypeScript', 'CSS Grid', 'Drag & drop'],
    date: '2026-11-11',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'Portafolio Mecatrónico: un lienzo que muestra cómo pienso',
      subtitle:
        'Notas y piezas técnicas arrastrables, navegación por teclado y una disposición que se guarda entre visitas.',
      category: 'Portafolio interactivo',
      summary:
        'Caso de estudio del Portafolio Mecatrónico: un portafolio Astro con lienzo arrastrable, notas y piezas técnicas, navegación por teclado y disposición persistente.',
      sections: [
        {
          heading: 'El problema',
          html: `<p>Un portafolio de ingeniería suele ser un PDF con proyectos ordenados por fecha. Muestra qué se hizo, pero no cómo se piensa. Para mecatrónica, donde el valor está en conectar mecánica, electrónica y software, ese formato pierde justo lo interesante.</p>
<p>El objetivo era una página que se pudiera explorar como un escritorio de trabajo: piezas, notas y conexiones visibles, sin convertir el portafolio en un videojuego.</p>`,
        },
        {
          heading: 'El enfoque',
          html: `<p>El lienzo es la metáfora y también la estructura. Cada nota o pieza se puede mover, y la posición es información: agrupar cosas significa algo. La disposición se guarda, así que la visita siguiente conserva el mapa que dejaste.</p>
<p>La interacción se diseñó primero para teclado y después para puntero. Un portafolio que solo funciona arrastrando excluye a parte de quien lo lee, y en un contexto profesional eso no es aceptable.</p>`,
        },
        {
          heading: 'Cómo está construido',
          html: `<p>Astro genera el sitio estático, con islas de interactividad solo donde hacen falta. TypeScript tipa el modelo de notas y piezas, y CSS Grid resuelve la retícula del lienzo sin posicionar cada elemento a mano.</p>
<p>El arrastre usa eventos de puntero y guarda la posición final, no cada píxel del recorrido. La disposición vive en <code>localStorage</code>, con un botón explícito para volver al orden original. El contenido principal sigue siendo HTML legible aunque el JavaScript no cargue.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El portafolio se recorre como un tablero de trabajo y también se lee en orden si se prefiere. La carga es rápida porque el HTML se genera en el build y la interactividad es una capa pequeña encima.</p>
<p>La lección fue que la metáfora visual solo funciona si respeta el contenido: primero la información, después el gesto.</p>`,
        },
      ],
      metrics: [
        { label: 'Framework', value: 'Astro' },
        { label: 'Interacción', value: 'Lienzo drag & drop' },
        { label: 'Persistencia', value: 'Disposición guardada' },
      ],
      lessons: [
        'Diseñar primero para teclado y después para puntero.',
        'Guardar el estado final, no cada movimiento.',
        'Mantener el contenido legible sin JavaScript.',
      ],
    },
    en: {
      title: 'Mechatronics Portfolio: a canvas that shows how I think',
      subtitle:
        'Draggable notes and technical parts, keyboard navigation and a layout that persists between visits.',
      category: 'Interactive portfolio',
      summary:
        'Mechatronics Portfolio case study: an Astro portfolio with a draggable canvas, notes and technical parts, keyboard navigation and persistent layout.',
      sections: [
        {
          heading: 'The problem',
          html: `<p>An engineering portfolio is usually a PDF with projects ordered by date. It shows what was done, but not how the person thinks. For mechatronics, where the value is in connecting mechanics, electronics and software, that format loses the interesting part.</p>
<p>The goal was a page that could be explored like a workbench: visible parts, notes and connections, without turning the portfolio into a video game.</p>`,
        },
        {
          heading: 'The approach',
          html: `<p>The canvas is both the metaphor and the structure. Every note or part can be moved, and position is information: grouping things means something. The layout is saved, so the next visit keeps the map you left.</p>
<p>Interaction was designed for keyboard first and pointer second. A portfolio that only works by dragging excludes part of its readers, and in a professional context that is not acceptable.</p>`,
        },
        {
          heading: 'How it is built',
          html: `<p>Astro generates the static site, with interactivity islands only where they are needed. TypeScript types the notes and parts model, and CSS Grid handles the canvas grid without positioning every element by hand.</p>
<p>Dragging uses pointer events and saves the final position, not every pixel of the path. The layout lives in <code>localStorage</code>, with an explicit button to return to the original order. The main content remains readable HTML even if JavaScript fails to load.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The portfolio can be explored like a workbench and also read in order if preferred. It loads fast because the HTML is generated at build time and interactivity is a small layer on top.</p>
<p>The lesson was that a visual metaphor only works when it respects the content: information first, gesture second.</p>`,
        },
      ],
      metrics: [
        { label: 'Framework', value: 'Astro' },
        { label: 'Interaction', value: 'Drag & drop canvas' },
        { label: 'Persistence', value: 'Saved layout' },
      ],
      lessons: [
        'Design for keyboard first, pointer second.',
        'Save the final state, not every move.',
        'Keep content readable without JavaScript.',
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseContent(study: CaseStudy, language: string): CaseStudyContent {
  return language.startsWith('en') ? study.en : study.es;
}
