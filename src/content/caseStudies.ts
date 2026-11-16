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
  /** English URL slug, under /en/projects/. */
  slugEn: string;
  href: string;
  image: string;
  stack: string[];
  date: string;
  /** Last content revision, used for dateModified and the sitemap lastmod. */
  updated?: string;
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
    slugEn: 'saas-landing-page',
    href: 'https://github.com/c26200/saas-landing-page',
    image: '/projects/saas-landing-page.webp',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    date: '2026-11-11',
    updated: '2026-11-14',
    relatedPosts: ['diseno-dashboards-react'],
    es: {
      title: 'Nexus: una landing que explica un producto de IA',
      subtitle:
        'Tipografía a gran escala, bloques de prueba y una jerarquía que lleva del problema al botón sin ruido.',
      category: 'Landing SaaS',
      summary:
        'Caso de estudio de Nexus: una landing para un producto de IA con React, Tailwind y Framer Motion, priorizando jerarquía, prueba y velocidad.',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>Una página única impone límites claros: no hay espacio para explicar cada función ni para responder todas las objeciones. La compensación fue priorizar la promesa del producto y una prueba verificable, y dejar el detalle para una conversación. También renuncié a las animaciones de scroll pesadas: cuestan JavaScript, retrasan la primera lectura y en móvil compiten con el gesto de desplazamiento. Cada componente añadido tenía que justificar qué pregunta respondía.</p>
<p>Sin testimonios reales ni métricas de negocio, la prueba debía salir de la propia interfaz: capturas que muestran el producto y bloques de datos que se leen como evidencia, no como decoración.</p>
<p>El presupuesto de rendimiento también condicionó el contenido: cada bloque de prueba añade peso, así que las capturas se recortaron y los iconos se resolvieron con SVG en línea. La página no carga una librería completa de componentes para usar tres botones.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El resultado es una landing que se recorre como un argumento: qué es, qué demuestra y qué hacer. La misma estructura sirve como plantilla para otros productos porque el sistema de tokens y los componentes están separados del contenido.</p>
<p>La lección que me llevo es que una landing no se diseña llenando secciones, sino decidiendo qué pregunta responde cada una. El diseño llega después, cuando la estructura ya funciona sin estilos.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Volvería a empezar por la estructura, pero dedicaría más tiempo a la versión móvil antes que a la de escritorio: en pantallas pequeñas la jerarquía tipográfica cambia y algunas secciones que en escritorio respiran terminan compitiendo. También separaría el contenido de los componentes desde el primer día, con un archivo de datos que permita cambiar el copy sin tocar JSX. Y mediría la primera pantalla con red real antes de cerrar el diseño; la percepción de velocidad depende más de cuándo aparece el mensaje principal que del peso total de la página.</p>`,
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
      title: 'Nexus: a landing page that explains an AI product',
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
          heading: 'Constraints and trade-offs',
          html: `<p>A single page imposes clear limits: there is no room to explain every feature or answer every objection. The trade-off was to prioritize the product promise and one verifiable piece of proof, leaving detail for a conversation. I also gave up heavy scroll animations: they cost JavaScript, delay the first read and compete with the scroll gesture on mobile. Every component had to justify which question it answered.</p>
<p>Without real testimonials or business metrics, the proof had to come from the interface itself: screenshots that show the product and data blocks that read as evidence, not decoration.</p>
<p>The performance budget shaped the content too: every proof block adds weight, so screenshots were cropped and icons were solved with inline SVG. The page does not load a full component library to render three buttons.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The result is a landing page you read as an argument: what it is, what it proves and what to do. The same structure works as a template for other products because the token system and components are separated from the content.</p>
<p>The lesson is that a landing page is not designed by filling sections, but by deciding which question each one answers. Design comes later, once the structure works without styles.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would start from structure again, but spend more time on mobile before desktop: on small screens the typographic hierarchy changes and sections that breathe on desktop end up competing. I would also separate content from components from day one, with a data file that lets copy change without touching JSX. And I would measure the first screen on a real network before closing the design; perceived speed depends more on when the main message appears than on total page weight.</p>`,
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
    slugEn: 'cinetrack',
    href: 'https://github.com/c26200/cinetrack',
    image: '/projects/cinetrack.webp',
    stack: ['React 19', 'Vite', 'OMDB API', 'localStorage'],
    date: '2026-11-11',
    updated: '2026-11-14',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'CineTrack: un índice de cine que vive en el navegador',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>La búsqueda depende de una API externa: tiene límites de uso, latencia y resultados que no siempre coinciden con el título que el usuario recuerda. La app compensa con debounce, estados de carga explícitos y mensajes distintos para “sin resultados” y “error de red”, en lugar de mostrar una lista vacía que parece un fallo. Guardar en localStorage también impone un techo: la colección debe ser pequeña y exportable, y cada cambio de esquema necesita una migración que no borre lo que ya existe.</p>
<p>Sin servidor no hay sincronización entre dispositivos ni copia remota. Es una decisión de producto: la colección vive donde el usuario la creó, y exportarla es la salida cuando quiere moverla.</p>
<p>La clave de la API viaja en el cliente, y eso obliga a asumir que cualquiera puede verla. Para un proyecto personal es aceptable; para un producto habría que pasar las búsquedas por un proxy propio y aplicar límites por usuario.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>CineTrack funciona sin conexión para consultar y editar lo ya guardado; solo la búsqueda de títulos nuevos necesita red. No hay cuentas, no hay servidor y el usuario puede exportar su colección si quiere moverla.</p>
<p>La lección fue que “local-first” no significa improvisar: exige un esquema, migraciones y una separación estricta entre lo que se guarda y cómo se muestra.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Cambiaría localStorage por IndexedDB cuando la colección crezca: el límite de tamaño y el acceso síncrono de localStorage dejan de ser cómodos con miles de elementos. También añadiría una caché de metadatos para que la vista de detalle no dependa de la red, y un modo de importación que valide el archivo antes de reemplazar la colección. La lección de fondo se mantiene: la interfaz debe leer siempre del almacenamiento local, incluso cuando la red responde.</p>`,
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
          heading: 'Constraints and trade-offs',
          html: `<p>Search depends on an external API: it has rate limits, latency and results that do not always match the title the user remembers. The app compensates with debounce, explicit loading states and different messages for “no results” and “network error”, instead of showing an empty list that looks like a failure. localStorage also imposes a ceiling: the collection must stay small and exportable, and every schema change needs a migration that does not erase what already exists.</p>
<p>With no server there is no sync across devices and no remote copy. That is a product decision: the collection lives where the user created it, and export is the way out when they want to move it.</p>
<p>The API key ships to the client, which means assuming anyone can read it. For a personal project that is acceptable; for a product, searches would go through an owned proxy with per-user limits.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>CineTrack works offline for reading and editing what is already saved; only searching for new titles needs the network. There are no accounts, no server, and the user can export the collection if they want to move it.</p>
<p>The lesson was that “local-first” does not mean improvising: it requires a schema, migrations and a strict separation between what is stored and how it is displayed.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would move from localStorage to IndexedDB once the collection grows: its size limit and synchronous access stop being comfortable with thousands of items. I would also add a metadata cache so the detail view does not depend on the network, and an import mode that validates the file before replacing the collection. The underlying lesson stands: the interface should always read from local storage, even when the network responds.</p>`,
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
    slugEn: 'kanban-task-manager',
    href: 'https://github.com/c26200/kanban-task-manager',
    image: '/projects/kanban-task-manager.webp',
    stack: ['React', '@dnd-kit', 'Tailwind CSS', 'localStorage'],
    date: '2026-11-11',
    updated: '2026-11-14',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'Kanban Flow: un tablero físico que no pide cuenta',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>Sin backend, el tablero no puede compartirse ni sincronizarse, y el orden de las tarjetas tiene que persistirse dentro de cada columna: guardar solo la columna hace que una recarga mezcle el trabajo. Durante el arrastre conviene mantener un estado intermedio en memoria y escribir en el almacenamiento al soltar; escribir en cada movimiento multiplica las operaciones y produce parpadeos. En móvil, el gesto de arrastre compite con el desplazamiento vertical, así que la zona de agarre y el eje deben ser explícitos.</p>
<p>La accesibilidad también condiciona el diseño: si el teclado no puede mover una tarjeta, la función principal queda fuera para parte de los usuarios.</p>
<p>Con varias pestañas abiertas, dos estados pueden competir por el mismo almacenamiento. La app escribe al soltar y relee al enfocar, de modo que la última acción gana sin intentar fusionar tableros que no se pueden reconciliar.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El tablero se siente directo: el gesto no compite con animaciones pesadas y la recarga devuelve el mismo estado. No hay backend, ni cuentas, ni datos saliendo del navegador.</p>
<p>La lección fue que el arrastre no es un efecto visual: es una operación de datos con un estado intermedio. Cuanto más simple sea ese estado, menos se rompe la interfaz.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Separaría el estado del tablero en un reducer con acciones explícitas para mover, reordenar y editar, en lugar de actualizar estructuras anidadas desde los componentes. Eso haría más fáciles las pruebas y permitiría deshacer sin guardar copias completas. También añadiría una versión del esquema desde el inicio y un aviso cuando el almacenamiento esté lleno, dos casos que aparecen cuando el tablero ya tiene datos reales y cuesta perderlos.</p>`,
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
      title: 'Kanban Flow: a physical board that asks for no account',
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
          heading: 'Constraints and trade-offs',
          html: `<p>With no backend, the board cannot be shared or synchronized, and card order has to persist within each column: saving only the column lets a reload shuffle the work. During a drag it is better to keep an intermediate state in memory and write to storage on drop; writing on every move multiplies operations and produces flicker. On mobile the drag gesture competes with vertical scrolling, so the grip area and the axis have to be explicit.</p>
<p>Accessibility shapes the design too: if the keyboard cannot move a card, the main feature is out of reach for part of the audience.</p>
<p>With several tabs open, two states can compete for the same storage. The app writes on drop and re-reads on focus, so the last action wins without trying to merge boards that cannot be reconciled.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The board feels direct: the gesture does not compete with heavy animations and a reload returns the same state. There is no backend, no accounts and no data leaving the browser.</p>
<p>The lesson was that dragging is not a visual effect: it is a data operation with an intermediate state. The simpler that state is, the less the interface breaks.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would move the board state into a reducer with explicit actions for moving, reordering and editing, instead of updating nested structures from components. That makes tests easier and allows undo without storing full copies. I would also add a schema version from the start and a warning when storage is full, two cases that show up once the board holds real data people cannot afford to lose.</p>`,
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
    slugEn: 'dashloud',
    href: 'https://github.com/c26200/dashloud',
    image: '/projects/dashloud.webp',
    stack: ['React', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    date: '2026-11-11',
    updated: '2026-11-14',
    relatedPosts: ['diseno-dashboards-react'],
    es: {
      title: 'DashLoud: un dashboard editorial que se lee de un vistazo',
      subtitle:
        'Pocas métricas, una gráfica que responde y una tabla que se puede escanear, en claro y oscuro.',
      category: 'Dashboard analítico',
      summary:
        'Caso de estudio de DashLoud: dashboard con React, Tailwind, Recharts y Framer Motion. Jerarquía editorial, métricas clave, gráfica de ingresos y transacciones.',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>Trabajar con datos de ejemplo permite fijar el diseño, pero también oculta lo que rompe un dashboard real: huecos, valores nulos, series que cambian de escala y picos que aplastan el resto de la gráfica. La compensación fue construir estados vacíos y de carga desde el principio, y no dejar que una gráfica sin datos se vea como un error. En tema claro y oscuro el contraste no es el mismo, así que los colores de la serie se eligieron para funcionar en ambos, no para verse bien solo sobre fondo negro.</p>
<p>Recharts resuelve el dibujo, pero no decide qué se compara. Cada gráfica tiene una pregunta asignada y una tabla asociada para quien necesita el número exacto.</p>
<p>Los importes y las fechas se formatean con la configuración regional del navegador y una zona horaria fija, para que dos personas no vean cifras distintas del mismo conjunto. Los ceros y los valores faltantes se muestran como tales, no como una línea que cae a cero.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El panel se entiende en el primer pantallazo: qué pasó, cuánto y dónde mirar después. La tabla sigue disponible para el detalle sin competir con la lectura principal.</p>
<p>La lección fue que un dashboard no es una colección de gráficas, sino un orden de lectura. Si todo tiene el mismo peso, nada se lee.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Definiría un contrato de datos tipado antes de montar los componentes, con estados de error y carga por sección en vez de un único indicador global. También mediría el contraste de la paleta con una herramienta en lugar de confiar en la vista, y añadiría exportación a CSV desde la tabla: el detalle numérico suele ser lo primero que alguien quiere llevarse.</p>`,
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
        'DashLoud case study: an analytics dashboard built with React, Tailwind and Recharts. Editorial hierarchy, key metrics, revenue chart and transactions.',
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
          heading: 'Constraints and trade-offs',
          html: `<p>Working with sample data fixes the design, but it also hides what breaks a real dashboard: gaps, null values, series that change scale and spikes that flatten the rest of the chart. The trade-off was to build empty and loading states from the start, and never let a chart with no data look like an error. Contrast is not the same in light and dark themes, so the series colors were chosen to work in both instead of looking good only on black.</p>
<p>Recharts handles the drawing, but it does not decide what is being compared. Every chart has one assigned question and an associated table for whoever needs the exact number.</p>
<p>Amounts and dates are formatted with the browser locale and a fixed time zone, so two people do not see different figures for the same dataset. Zeros and missing values are shown as such, not as a line dropping to zero.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The panel makes sense on the first screen: what happened, how much and where to look next. The table remains available for detail without competing with the main reading.</p>
<p>The lesson was that a dashboard is not a collection of charts, but an order of reading. If everything has the same weight, nothing gets read.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would define a typed data contract before building the components, with per-section error and loading states instead of a single global indicator. I would also measure palette contrast with a tool rather than trusting the eye, and add CSV export from the table: the numeric detail is usually the first thing someone wants to take away.</p>`,
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
    slugEn: 'trading-predictor',
    href: 'https://github.com/c26200/trading-predictor',
    image: '/projects/trading-predictor.webp',
    stack: ['Python', 'PyTorch', 'LSTM', 'Transformers', 'FastAPI', 'WebSocket'],
    date: '2026-11-11',
    updated: '2026-11-16',
    relatedPosts: ['series-temporales-producto', 'ia-en-tiempo-real'],
    es: {
      title: 'TradeScope AI: del notebook a un servicio en tiempo real',
      subtitle:
        'Un ensemble LSTM + Transformer servido por WebSocket, con validación temporal estricta y un dashboard de señales.',
      category: 'Predicción bursátil',
      summary:
        'Caso de estudio de TradeScope AI: ensemble LSTM + Transformer en PyTorch, servido con FastAPI y WebSocket, con validación walk-forward y contenedores.',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>Una serie financiera es ruidosa y no estacionaria: el modelo que acierta en un periodo puede fallar en el siguiente. Por eso la validación se hace por ventanas temporales y nunca se barajan las observaciones; mezclar pasado y futuro produciría métricas excelentes y un servicio inútil. La otra restricción es la latencia: la inferencia debe terminar dentro de la ventana de decisión, así que el tamaño del modelo y el preprocesamiento se eligen por tiempo, no solo por precisión.</p>
<p>El servicio también necesita una salida honesta cuando el modelo no está seguro. Un fallback explícito es mejor que una predicción con confianza inventada.</p>
<p>La reproducibilidad es parte de la operación: semillas fijas, versiones ancladas y el mismo preprocesador en entrenamiento e inferencia. Sin eso, comparar dos ejecuciones se vuelve una discusión sobre qué cambió.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El proyecto obtuvo el primer puesto en el Festival Internacional de IA 2025 y quedó como un servicio observable: dashboard en tiempo real, métricas por ventana y un procedimiento claro para volver a una versión anterior.</p>
<p>La lección fue que el modelo es una parte del producto. La validación honesta, la latencia, el fallback y el monitoreo deciden si sirve para tomar una decisión.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Añadiría un registro de modelos con la versión exacta del preprocesador y del conjunto de entrenamiento, porque reconstruir un resultado semanas después depende de ambos. También mediría deriva de datos y de predicción con alertas, y compararía el ensemble contra un baseline simple en cada ventana: si el modelo complejo no supera al baseline de forma consistente, no merece el coste de operación. Y documentaría los costes de transacción en el backtest, que suelen borrar buena parte de la ventaja aparente.</p>`,
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
          heading: 'Constraints and trade-offs',
          html: `<p>A financial series is noisy and non-stationary: the model that works in one period can fail in the next. That is why validation runs over time windows and observations are never shuffled; mixing past and future would produce excellent metrics and a useless service. Latency is the other constraint: inference has to finish inside the decision window, so model size and preprocessing are chosen for time, not only for accuracy.</p>
<p>The service also needs an honest way out when the model is not confident. An explicit fallback is better than a prediction with invented confidence.</p>
<p>Reproducibility is part of operations: fixed seeds, pinned versions and the same preprocessor in training and inference. Without that, comparing two runs becomes an argument about what changed.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The project took first place at the International AI Festival 2025 and became an observable service: a real-time dashboard, per-window metrics and a clear procedure to roll back to a previous version.</p>
<p>The lesson was that the model is one part of the product. Honest validation, latency, fallback and monitoring decide whether it is useful for a decision.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would add a model registry with the exact version of the preprocessor and the training set, because reconstructing a result weeks later depends on both. I would also measure data and prediction drift with alerts, and compare the ensemble against a simple baseline in every window: if the complex model does not beat the baseline consistently, it does not deserve the operating cost. And I would document transaction costs in the backtest, which usually erase a large part of the apparent edge.</p>`,
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
    slugEn: 'mechatronics-portfolio',
    href: 'https://github.com/c26200/mechatronics-portfolio',
    image: '/projects/portfolio-mecatronica.webp',
    stack: ['Astro', 'TypeScript', 'CSS Grid', 'Drag & drop'],
    date: '2026-11-11',
    updated: '2026-11-14',
    relatedPosts: ['estado-local-react'],
    es: {
      title: 'Portafolio Mecatrónico: un lienzo que muestra cómo pienso',
      subtitle:
        'Notas y piezas técnicas arrastrables, navegación por teclado y una disposición que se guarda entre visitas.',
      category: 'Portafolio interactivo',
      summary:
        'Caso de estudio del Portafolio Mecatrónico: un portafolio Astro con lienzo arrastrable, notas, piezas técnicas y navegación por teclado.',
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
          heading: 'Restricciones y compensaciones',
          html: `<p>La metáfora del lienzo tienta a usarlo todo como decoración, pero el contenido debe seguir siendo legible sin JavaScript y sin puntero. Por eso el HTML se genera en el build y la interactividad es una capa que se añade encima: si el script falla, el portafolio sigue siendo una página de texto. La disposición guardada impone otra decisión: se persiste el estado final, no cada movimiento, para no escribir en el almacenamiento durante el arrastre.</p>
<p>El teclado no es una alternativa secundaria: es la forma principal de recorrer el lienzo para quien no usa puntero, así que el orden de foco y los atajos se diseñan antes que el gesto.</p>
<p>Cada pieza interactiva es una isla pequeña: el resto del HTML no envía JavaScript. Esa disciplina mantiene la página ligera y obliga a decidir qué merece hidratación y qué puede quedarse como texto y CSS.</p>`,
        },
        {
          heading: 'El resultado',
          html: `<p>El portafolio se recorre como un tablero de trabajo y también se lee en orden si se prefiere. La carga es rápida porque el HTML se genera en el build y la interactividad es una capa pequeña encima.</p>
<p>La lección fue que la metáfora visual solo funciona si respeta el contenido: primero la información, después el gesto.</p>`,
        },
        {
          heading: 'Qué haría distinto',
          html: `<p>Empezaría por la versión sin JavaScript y añadiría la capa interactiva después, en lugar de verificar al final que el contenido sigue ahí. También tiparía el esquema de la disposición para que una versión futura pueda migrar posiciones sin perder el orden, y reduciría aún más el JavaScript del cliente: la mayor parte de lo que se ve puede ser HTML y CSS. La regla que mantendría es simple: el gesto añade una forma de explorar, no la única forma de leer.</p>`,
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
        'Mechatronics Portfolio case study: an Astro portfolio with a draggable canvas, notes, technical parts and keyboard navigation.',
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
          heading: 'Constraints and trade-offs',
          html: `<p>The canvas metaphor tempts you to treat everything as decoration, but the content has to stay readable without JavaScript and without a pointer. That is why the HTML is generated at build time and interactivity is a layer added on top: if the script fails, the portfolio is still a text page. The saved layout imposes another decision: persist the final state, not every movement, so nothing is written during a drag.</p>
<p>The keyboard is not a secondary alternative: it is the main way to move through the canvas for anyone not using a pointer, so focus order and shortcuts are designed before the gesture.</p>
<p>Each interactive piece is a small island: the rest of the HTML ships no JavaScript. That discipline keeps the page light and forces a decision about what deserves hydration and what can stay as text and CSS.</p>`,
        },
        {
          heading: 'The result',
          html: `<p>The portfolio can be explored like a workbench and also read in order if preferred. It loads fast because the HTML is generated at build time and interactivity is a small layer on top.</p>
<p>The lesson was that a visual metaphor only works when it respects the content: information first, gesture second.</p>`,
        },
        {
          heading: 'What I would do differently',
          html: `<p>I would start with the no-JavaScript version and add the interactive layer afterwards, instead of checking at the end that the content is still there. I would also type the layout schema so a future version can migrate positions without losing order, and cut client JavaScript even further: most of what is visible can be HTML and CSS. The rule I would keep is simple: the gesture adds a way to explore, not the only way to read.</p>`,
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
