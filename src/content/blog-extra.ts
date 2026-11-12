import type { BlogPost } from './blog';

/**
 * Articles added in Phase 4. They live here to keep blog.ts readable;
 * blog.ts re-exports the merged list.
 */
export const extraPosts: BlogPost[] = [
  {
    slug: 'estado-local-react',
    date: '2026-11-11',
    es: {
      title: 'Estado local en React: persistir datos sin backend',
      excerpt:
        'Cómo modelar, versionar y escribir estado local en React para que una app sin backend no se rompa cuando cambia el esquema, con ejemplos y errores comunes.',
      html: `<p class="blog-summary">Guardar datos en el navegador parece un atajo y termina siendo una decisión de arquitectura. Una app local-first responde al instante, funciona sin red y no pide una cuenta, pero también exige un modelo estable, migraciones y un lugar único donde se lea y se escriba. Esta guía muestra cómo hacerlo en React sin que la primera refactorización borre los datos de nadie.</p>
<h2>Qué significa trabajar local-first</h2>
<p>Local-first significa que la copia principal de los datos vive en el dispositivo y la aplicación puede leerla y modificarla sin red. No implica que nunca haya backend: implica que la interfaz no espera a un servidor para mostrar lo que el usuario ya guardó. La red puede enriquecer los datos, pero no es la fuente de verdad.</p>
<p>Ese cambio trae ventajas concretas: interacción inmediata, privacidad por defecto y funcionamiento sin conexión. También trae costes que conviene asumir desde el principio: qué ocurre cuando cambia el formato, cómo se exportan los datos y qué pasa si el almacenamiento está lleno o bloqueado.</p>
<p>No todas las funciones necesitan este modelo. Un panel que depende de datos de otras personas exige un servidor. Una colección personal, una lista de tareas o una disposición de trabajo se benefician de quedarse en el navegador. Decide por función, no por moda.</p>
<h2>Empieza por el modelo, no por la pantalla</h2>
<p>Antes de escribir el primer componente, define qué entidades existen, qué campos tienen y cuál es su identidad. En una colección de películas, por ejemplo, el identificador estable no es la posición en la lista sino el identificador externo del título:</p>
<pre><code class="language-ts">type Film = {
  id: string;          // estable entre importaciones
  title: string;
  year: number | null;
  status: 'pending' | 'watching' | 'watched';
  rating: number | null;
  notes: string;
};

type Store = {
  version: 1;
  films: Film[];
};</code></pre>
<p>Las vistas son proyecciones de ese modelo: un muro, un tablero o una lista cambian la presentación, no la estructura. Cuando el modelo está claro, agregar una vista es barato. Cuando la estructura vive dentro de los componentes, cada pantalla nueva obliga a reescribir el almacenamiento.</p>
<h2>Versiona el esquema desde el primer día</h2>
<p> La primera versión de una app suele guardar datos sin número de versión. El problema aparece en la segunda: el formato cambia y los datos viejos ya no encajan. Sin una migración, la app falla al leer o, peor, muestra información incompleta como si fuera válida.</p>
<p>Guarda un sobre con versión y una función de migración explícita:</p>
<pre><code class="language-ts">function migrate(raw: unknown): Store {
  if (!raw || typeof raw !== 'object') return { version: 1, films: [] };
  const data = raw as Partial&lt;Store&gt;;
  if (data.version === 1 &amp;&amp; Array.isArray(data.films)) {
    return { version: 1, films: data.films };
  }
  // Versiones antiguas se transforman aquí, nunca en los componentes.
  return { version: 1, films: [] };
}</code></pre>
<p>Si el JSON está corrupto, no lo sobrescribas en silencio: guarda una copia bajo otra clave y arranca con un estado vacío. Un usuario puede recuperar datos de un backup manual; no puede recuperar lo que la app borró sin avisar.</p>
<h2>Centraliza lectura y escritura</h2>
<p>Los componentes no deberían llamar a <code>localStorage</code> directamente. Un módulo de almacenamiento con una API tipada concentra el parseo, las migraciones y el manejo de errores. También evita que dos partes de la app usen claves distintas para lo mismo.</p>
<pre><code class="language-ts">const KEY = 'cinetrack';

export function load(): Store {
  try {
    return migrate(JSON.parse(localStorage.getItem(KEY) ?? 'null'));
  } catch {
    return { version: 1, films: [] };
  }
}

export function save(store: Store): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    return true;
  } catch {
    return false; // cuota llena o almacenamiento bloqueado
  }
}</code></pre>
<p>La escritura puede fallar por cuota, por modo privado o por políticas del navegador. La interfaz debe enterarse: guardar sin comprobar convierte un problema visible en pérdida de datos silenciosa.</p>
<h2>Separa la red de lo guardado</h2>
<p>Si la app busca datos externos, normaliza la respuesta antes de guardarla. Así el proveedor puede cambiar su formato sin obligar a migrar toda la colección. La red enriquece un registro existente; no reemplaza la fuente local.</p>
<p>La búsqueda tampoco debe bloquear la lectura. Muestra lo guardado al instante, indica que hay una consulta en curso y deja claro cuándo un resultado depende de la conexión. En CineTrack ese principio permite abrir la colección sin red y buscar títulos nuevos solo cuando hay conexión.</p>
<h2>Cuidado con la hidratación</h2>
<p>En una app con render en servidor o prerender, el primer render debe coincidir con el HTML generado. Leer <code>localStorage</code> durante el render produce una diferencia entre servidor y cliente que React marca como error de hidratación.</p>
<p>La solución es leer después del montaje, en un efecto, y renderizar un estado neutro en el primer paso. Si la interfaz no puede mostrar nada útil sin datos locales, muéstrala con un esqueleto estable y cárgala justo después, no durante el render.</p>
<h2>Cuándo localStorage no alcanza</h2>
<p><code>localStorage</code> guarda texto y tiene un límite pequeño, distinto en cada navegador. No sirve para archivos binarios, búsquedas complejas ni datos que varias pestañas deben compartir sin coordinación. Para eso existe IndexedDB, que también es local y permite transacciones y almacenamiento mayor.</p>
<p>Antes de saltar a un backend, pregúntate si el problema es realmente de sincronización. Si solo necesitas más espacio o consultas, IndexedDB resuelve el caso. Si necesitas que dos dispositivos vean lo mismo, entonces sí aparece un servidor y con él el problema de resolver conflictos.</p>
<h2>Pruebas que valen</h2>
<ul>
<li>Recargar la página y comprobar que el estado es idéntico.</li>
<li>Leer un JSON corrupto y verificar que la app arranca sin borrar la copia.</li>
<li>Migrar desde la versión anterior con datos reales, no con un ejemplo vacío.</li>
<li>Simular cuota llena y confirmar que la interfaz avisa.</li>
<li>Abrir dos pestañas y decidir qué ocurre con las escrituras concurrentes.</li>
</ul>
<h2>Preguntas frecuentes</h2>
<h3>¿Es seguro guardar datos en localStorage?</h3>
<p>Para datos personales de baja sensibilidad, sí. No guardes tokens, contraseñas ni información que no quieras exponer: cualquier script que se ejecute en la página puede leerlo. La seguridad depende de evitar inyección de código, no del almacenamiento en sí.</p>
<h3>¿Cómo sincronizo los datos entre dispositivos?</h3>
<p>Necesitas un servidor y una política de conflictos: quién gana cuando dos dispositivos editan lo mismo. Un enfoque común es registrar cambios con marca de tiempo y resolver por campo, pero no es automático ni gratis. Mientras no lo necesiten los usuarios, un botón de exportar e importar cubre muchos casos.</p>
<h3>¿Cuánto puedo guardar?</h3>
<p>Depende del navegador; suele rondar los 5 MB por origen para <code>localStorage</code>. Si el contenido incluye imágenes o historiales largos, IndexedDB es la opción sensata.</p>
<h3>¿Necesito una librería de estado?</h3>
<p>No para empezar. Un módulo tipado y un estado de React bien ubicado bastan. Una librería ayuda cuando hay muchas escrituras concurrentes o sincronización compleja, pero no sustituye entender el modelo.</p>
<h2>Para seguir</h2>
<p>Puedes ver estos principios en funcionamiento en los casos de <a href="/proyectos/cinetrack">CineTrack</a>, <a href="/proyectos/kanban-task-manager">Kanban Flow</a> y el <a href="/proyectos/portfolio-mecatronica">Portafolio Mecatrónico</a>. Si tu siguiente paso es desplegar la app, revisa <a href="/blog/docker-fundamentals">Docker para Desarrolladores</a>.</p>
`,
    },
    en: {
      title: 'Local state in React: persisting data without a backend',
      excerpt:
        'How to model, version and write local state in React so a backend-free app survives schema changes, with examples and common mistakes.',
      html: `<p class="blog-summary">Saving data in the browser looks like a shortcut and turns into an architecture decision. A local-first app responds instantly, works offline and asks for no account, but it also demands a stable model, migrations and one place where data is read and written. This guide shows how to do that in React without the first refactor erasing anyone's data.</p>
<h2>What local-first means</h2>
<p>Local-first means the primary copy of the data lives on the device and the application can read and modify it without a network. It does not mean there is never a backend: it means the interface does not wait for a server to show what the user already saved. The network can enrich data, but it is not the source of truth.</p>
<p>That shift brings concrete benefits: immediate interaction, privacy by default and offline operation. It also brings costs worth accepting up front: what happens when the format changes, how data is exported and what happens when storage is full or blocked.</p>
<p>Not every feature needs this model. A dashboard that depends on other people's data needs a server. A personal collection, a task list or a workspace layout benefit from staying in the browser. Decide per feature, not by fashion.</p>
<h2>Start with the model, not the screen</h2>
<p>Before writing the first component, define which entities exist, which fields they have and what their identity is. In a film collection, for example, the stable identifier is not the position in the list but the title's external id:</p>
<pre><code class="language-ts">type Film = {
  id: string;          // stable across imports
  title: string;
  year: number | null;
  status: 'pending' | 'watching' | 'watched';
  rating: number | null;
  notes: string;
};

type Store = {
  version: 1;
  films: Film[];
};</code></pre>
<p>Views are projections of that model: a wall, a board or a list changes the presentation, not the structure. When the model is clear, adding a view is cheap. When structure lives inside components, every new screen forces a rewrite of storage.</p>
<h2>Version the schema from day one</h2>
<p>The first version of an app usually saves data without a version number. The problem shows up in the second one: the format changes and old data no longer fits. Without a migration, the app fails to read it or, worse, displays incomplete information as if it were valid.</p>
<p>Store a versioned envelope and an explicit migration function:</p>
<pre><code class="language-ts">function migrate(raw: unknown): Store {
  if (!raw || typeof raw !== 'object') return { version: 1, films: [] };
  const data = raw as Partial&lt;Store&gt;;
  if (data.version === 1 &amp;&amp; Array.isArray(data.films)) {
    return { version: 1, films: data.films };
  }
  // Older versions are transformed here, never inside components.
  return { version: 1, films: [] };
}</code></pre>
<p>If the JSON is corrupt, do not overwrite it silently: keep a copy under another key and start from an empty state. A user can recover data from a manual backup; they cannot recover what the app deleted without notice.</p>
<h2>Centralize reads and writes</h2>
<p>Components should not call <code>localStorage</code> directly. A storage module with a typed API concentrates parsing, migrations and error handling. It also prevents two parts of the app from using different keys for the same thing.</p>
<pre><code class="language-ts">const KEY = 'cinetrack';

export function load(): Store {
  try {
    return migrate(JSON.parse(localStorage.getItem(KEY) ?? 'null'));
  } catch {
    return { version: 1, films: [] };
  }
}

export function save(store: Store): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    return true;
  } catch {
    return false; // quota full or storage blocked
  }
}</code></pre>
<p>Writing can fail because of quota, private mode or browser policies. The interface must know: saving without checking turns a visible problem into silent data loss.</p>
<h2>Separate the network from stored data</h2>
<p>If the app fetches external data, normalize the response before storing it. That way the provider can change its format without forcing a migration of the whole collection. The network enriches an existing record; it does not replace the local source.</p>
<p>Search should not block reading either. Show stored data immediately, indicate that a request is in progress and make clear when a result depends on connectivity. In CineTrack that principle lets the collection open offline and only searches for new titles when there is a connection.</p>
<h2>Watch out for hydration</h2>
<p>In an app with server rendering or prerendering, the first render must match the generated HTML. Reading <code>localStorage</code> during render produces a server/client mismatch that React reports as a hydration error.</p>
<p>The fix is to read after mount, in an effect, and render a neutral state on the first pass. If the interface cannot show anything useful without local data, show a stable skeleton and load it right after, not during render.</p>
<h2>When localStorage is not enough</h2>
<p><code>localStorage</code> stores text and has a small limit that differs per browser. It is not suitable for binary files, complex queries or data that several tabs must share without coordination. IndexedDB exists for that, and it is still local, with transactions and larger storage.</p>
<p>Before jumping to a backend, ask whether the problem is really synchronization. If you only need more space or queries, IndexedDB covers it. If two devices must see the same data, then a server appears, and with it the problem of resolving conflicts.</p>
<h2>Tests worth writing</h2>
<ul>
<li>Reload the page and check that the state is identical.</li>
<li>Read corrupt JSON and verify that the app starts without deleting the copy.</li>
<li>Migrate from the previous version with real data, not an empty example.</li>
<li>Simulate a full quota and confirm that the interface warns.</li>
<li>Open two tabs and decide what happens with concurrent writes.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>Is localStorage safe?</h3>
<p>For low-sensitivity personal data, yes. Do not store tokens, passwords or anything you would not want exposed: any script running on the page can read it. Security depends on preventing code injection, not on the storage itself.</p>
<h3>How do I sync data across devices?</h3>
<p>You need a server and a conflict policy: who wins when two devices edit the same thing. A common approach records changes with timestamps and resolves per field, but it is neither automatic nor free. Until users need it, an export/import button covers many cases.</p>
<h3>How much can I store?</h3>
<p>It depends on the browser; it is usually around 5 MB per origin for <code>localStorage</code>. If the content includes images or long histories, IndexedDB is the sensible choice.</p>
<h3>Do I need a state library?</h3>
<p>Not to start. A typed module and well-placed React state are enough. A library helps with many concurrent writes or complex synchronization, but it does not replace understanding the model.</p>
<h2>Further reading</h2>
<p>You can see these principles at work in the <a href="/en/proyectos/cinetrack">CineTrack</a>, <a href="/en/proyectos/kanban-task-manager">Kanban Flow</a> and <a href="/en/proyectos/portfolio-mecatronica">Mechatronics Portfolio</a> case studies. If your next step is shipping the app, read <a href="/en/blog/docker-fundamentals">Docker for Developers</a>.</p>
`,
    },
  },
  {
    slug: 'diseno-dashboards-react',
    date: '2026-11-11',
    es: {
      title: 'Dashboards que se leen: jerarquía y datos en React',
      excerpt:
        'Cómo diseñar un dashboard que responda preguntas: jerarquía editorial, pocas métricas, gráficas honestas, tablas escaneables y temas claro/oscuro con React.',
      html: `<p class="blog-summary">Un dashboard no se juzga por la cantidad de gráficas sino por la velocidad con la que alguien encuentra la respuesta. La mayoría de los paneles fallan por exceso: métricas con el mismo peso, colores que compiten y tablas que nadie escanea. Esta guía recorre las decisiones que hacen legible un panel construido con React.</p>
<h2>Un dashboard no es una colección de gráficas</h2>
<p>Cuando el objetivo es mostrar todo lo que la base de datos permite consultar, el resultado es una pared de widgets. El usuario tiene que leerla entera para encontrar lo que busca. Un dashboard útil hace lo contrario: elige qué se mira primero y construye el resto como apoyo.</p>
<p>La pregunta que ordena el diseño es simple: si al abrir el panel solo pudieras ver tres cosas, ¿cuáles serían? Esa respuesta define la jerarquía. Todo lo demás es detalle consultable, no lectura principal.</p>
<h2>Empieza por la pregunta, no por el dato</h2>
<p>Antes de elegir una gráfica, escribe la pregunta que debe responder. «¿Cómo van las ventas este mes?» no pide lo mismo que «¿qué producto explica la caída de ayer?». La primera es una tendencia; la segunda es una comparación por categoría. La forma del dato sugiere la visualización, no al revés.</p>
<p>Si la pregunta no se puede formular, probablemente la métrica no pertenece al primer nivel. Muévela a una vista de detalle o elimínala. Un panel que no responde nada concreto suele ser una colección de números sin dueño.</p>
<h2>Jerarquía antes que color</h2>
<p>La jerarquía se construye con tamaño, posición y peso tipográfico antes de tocar la paleta. La cifra principal va grande y arriba; las métricas de apoyo, más pequeñas y agrupadas; el detalle, debajo. Si todo está al mismo tamaño, el ojo no sabe dónde empezar.</p>
<p>El color de acento se reserva para lo accionable o para un cambio de estado. Cuando cada tarjeta tiene su propio color, el acento deja de significar algo. En un panel con dos temas, define los colores como tokens y comprueba el contraste en ambos: el modo oscuro no es una inversión automática.</p>
<h2>Una gráfica que responde</h2>
<p>Para tendencia, una línea con pocos puntos y un eje legible funciona mejor que un área con degradado. Para comparar categorías, barras ordenadas por valor. Para una sola proporción, un número grande con contexto basta; un pastel con ocho porciones no se lee.</p>
<p>La gráfica debe incluir unidades, periodo y una referencia clara. Un tooltip que repite el valor sin decir la fecha completa obliga a adivinar. Si el eje empieza en cero solo cuando la comparación lo exige, dilo en el subtítulo: truncar un eje puede exagerar una diferencia.</p>
<h2>Tablas que se escanean</h2>
<p>La tabla es el lugar del detalle, y su enemigo es la columna de más. Deja las columnas que se comparan, alinea los números a la derecha con cifras tabulares y usa una sola fuente monoespaciada para ellos. Un encabezado fijo y filas con separación suficiente hacen el resto.</p>
<p>Si la tabla necesita explicar cada celda, probablemente debería ser otra vista. Y si el usuario solo mira las primeras filas, ordena por lo que importa y permite cambiar el criterio sin recargar la página.</p>
<h2>Datos de ejemplo separados de la presentación</h2>
<p>Conecta el panel a una interfaz de datos, no a un arreglo incrustado en el componente. Así puedes reemplazar los datos de ejemplo por una API sin reescribir la vista, y puedes probar estados de carga, error y vacío antes de tener el backend.</p>
<pre><code class="language-ts">type MetricsSource = {
  load(): Promise&lt;{ revenue: number[]; transactions: Transaction[] }&gt;;
};</code></pre>
<p>Formatea números y fechas en un solo lugar, con una zona horaria explícita. Un panel que muestra «ayer» sin decir en qué zona horaria está genera discusiones que no son de diseño.</p>
<h2>Rendimiento en un panel</h2>
<p>Las gráficas cuestan más que el texto: cada punto es un elemento y cada actualización puede recalcular escalas. Memoiza los componentes que no cambian, evita recrear configuraciones en cada render y no animes series completas cuando solo cambió un valor.</p>
<p>Si el panel tiene varias vistas, carga las que no se usan de forma diferida. Y mide con datos reales: una gráfica con diez puntos y otra con diez mil no se comportan igual, aunque el código sea el mismo.</p>
<h2>Errores comunes</h2>
<ul>
<li>Mostrar todas las métricas con el mismo peso visual.</li>
<li>Usar color decorativo en lugar de color con significado.</li>
<li>Truncar ejes sin avisar o mezclar unidades en la misma escala.</li>
<li>Construir tablas con demasiadas columnas y sin alineación numérica.</li>
<li>Ignorar los estados de carga, error y vacío.</li>
<li>Suponer que el modo oscuro es invertir el modo claro.</li>
</ul>
<h2>Preguntas frecuentes</h2>
<h3>¿Cuántas métricas debe tener un dashboard?</h3>
<p>Tres a cinco en el primer nivel. El resto pertenece al detalle. Si necesitas más, probablemente sean varios paneles con preguntas distintas, no uno con todo.</p>
<h3>¿Qué gráfica uso para tendencias?</h3>
<p>Una línea con el periodo explícito. Las barras funcionan para comparar categorías y los números grandes para una sola cifra con contexto. Evita gráficas 3D y pasteles con muchas porciones.</p>
<h3>¿Recharts o D3?</h3>
<p>Recharts cubre la mayoría de paneles de producto con menos código y buen comportamiento responsive. D3 tiene sentido cuando necesitas una visualización a medida que ninguna librería de componentes resuelve.</p>
<h3>¿Cómo hago el panel accesible?</h3>
<p>Contraste suficiente en ambos temas, información que no dependa solo del color y una tabla o resumen textual como alternativa a cada gráfica. Los tooltips deben poder alcanzarse con teclado.</p>
<h2>Para seguir</h2>
<p>Estas decisiones están aplicadas en el caso de <a href="/proyectos/dashloud">DashLoud</a> y, en la parte de jerarquía y tipografía, en <a href="/proyectos/saas-landing-page">Nexus</a>. Para llevar el panel a producción, revisa <a href="/blog/docker-fundamentals">Docker para Desarrolladores</a>.</p>
`,
    },
    en: {
      title: 'Dashboards people can read: hierarchy and data in React',
      excerpt:
        'How to design a dashboard that answers questions: editorial hierarchy, few metrics, honest charts, scannable tables and light/dark themes with React.',
      html: `<p class="blog-summary">A dashboard is judged not by the number of charts but by how quickly someone finds the answer. Most panels fail from excess: metrics with the same weight, competing colors and tables nobody scans. This guide walks through the decisions that make a React panel readable.</p>
<h2>A dashboard is not a collection of charts</h2>
<p>When the goal is to show everything the database can query, the result is a wall of widgets. The user has to read all of it to find what they need. A useful dashboard does the opposite: it decides what gets looked at first and builds the rest as support.</p>
<p>The question that orders the design is simple: if you could only see three things when opening the panel, which would they be? That answer defines the hierarchy. Everything else is consultable detail, not primary reading.</p>
<h2>Start with the question, not the datum</h2>
<p>Before choosing a chart, write the question it must answer. “How are sales doing this month?” is not the same as “which product explains yesterday's drop?”. The first is a trend; the second is a comparison by category. The shape of the data suggests the visualization, not the other way around.</p>
<p>If the question cannot be formulated, the metric probably does not belong on the first level. Move it to a detail view or remove it. A panel that answers nothing concrete is usually a collection of numbers without an owner.</p>
<h2>Hierarchy before color</h2>
<p>Hierarchy is built with size, position and typographic weight before touching the palette. The main figure is large and at the top; supporting metrics are smaller and grouped; detail sits below. If everything is the same size, the eye does not know where to start.</p>
<p>The accent color is reserved for what is actionable or for a state change. When every card has its own color, the accent stops meaning anything. In a two-theme panel, define colors as tokens and check contrast in both: dark mode is not an automatic inversion.</p>
<h2>A chart that answers</h2>
<p>For a trend, a line with few points and a readable axis works better than a gradient area. To compare categories, bars ordered by value. For a single proportion, a large number with context is enough; a pie with eight slices is not readable.</p>
<p>The chart must include units, period and a clear reference. A tooltip that repeats the value without the full date forces guessing. If the axis starts at zero only when the comparison requires it, say so in the subtitle: truncating an axis can exaggerate a difference.</p>
<h2>Tables that scan</h2>
<p>The table is where detail lives, and its enemy is the extra column. Keep the columns being compared, right-align numbers with tabular figures and use a single monospaced font for them. A fixed header and rows with enough separation do the rest.</p>
<p>If the table needs to explain every cell, it probably should be another view. And if the user only looks at the first rows, sort by what matters and let them change the criterion without reloading the page.</p>
<h2>Sample data separate from presentation</h2>
<p>Connect the panel to a data interface, not to an array embedded in the component. That lets you replace sample data with an API without rewriting the view, and test loading, error and empty states before the backend exists.</p>
<pre><code class="language-ts">type MetricsSource = {
  load(): Promise&lt;{ revenue: number[]; transactions: Transaction[] }&gt;;
};</code></pre>
<p>Format numbers and dates in one place, with an explicit time zone. A panel that shows “yesterday” without saying which time zone creates arguments that are not about design.</p>
<h2>Performance in a panel</h2>
<p>Charts cost more than text: every point is an element and every update can recalculate scales. Memoize components that do not change, avoid recreating configurations on every render and do not animate entire series when a single value changed.</p>
<p>If the panel has several views, load the unused ones lazily. And measure with real data: a chart with ten points and one with ten thousand do not behave the same, even with identical code.</p>
<h2>Common mistakes</h2>
<ul>
<li>Showing every metric with the same visual weight.</li>
<li>Using decorative color instead of meaningful color.</li>
<li>Truncating axes without warning or mixing units on one scale.</li>
<li>Building tables with too many columns and no numeric alignment.</li>
<li>Ignoring loading, error and empty states.</li>
<li>Assuming dark mode is an inversion of light mode.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>How many metrics should a dashboard have?</h3>
<p>Three to five at the first level. The rest belongs to detail. If you need more, they are probably several panels with different questions, not one with everything.</p>
<h3>Which chart should I use for trends?</h3>
<p>A line with an explicit period. Bars work for comparing categories and large numbers for a single figure with context. Avoid 3D charts and pies with many slices.</p>
<h3>Recharts or D3?</h3>
<p>Recharts covers most product panels with less code and good responsive behavior. D3 makes sense when you need a custom visualization that no component library solves.</p>
<h3>How do I make the panel accessible?</h3>
<p>Enough contrast in both themes, information that does not rely on color alone and a table or textual summary as an alternative to each chart. Tooltips must be reachable by keyboard.</p>
<h2>Further reading</h2>
<p>These decisions are applied in the <a href="/en/proyectos/dashloud">DashLoud</a> case study and, for hierarchy and typography, in <a href="/en/proyectos/saas-landing-page">Nexus</a>. To ship the panel, read <a href="/en/blog/docker-fundamentals">Docker for Developers</a>.</p>
`,
    },
  },
  {
    slug: 'ia-en-tiempo-real',
    date: '2026-11-11',
    es: {
      title: 'IA en tiempo real: servir un modelo sin romper la interfaz',
      excerpt:
        'Qué cambia al servir un modelo de IA en tiempo real: transporte, contrato de inferencia, latencia, fallback, versionado y monitoreo para un servicio confiable.',
      html: `<p class="blog-summary">Un modelo que funciona en el notebook todavía no es un servicio. En tiempo real aparecen preguntas que el entrenamiento no plantea: cuánto tarda una respuesta, qué muestra la interfaz mientras espera, qué pasa si el modelo falla y cómo se sabe que los datos siguen llegando. Esta guía cubre esa última milla.</p>
<h2>Qué cambia cuando el modelo pasa a producción</h2>
<p>En un experimento, el modelo se evalúa una vez al final. En producción, cada predicción tiene un contexto: quién la consume, cuánto puede esperar y qué decisión depende de ella. Un pronóstico correcto que llega tarde es, para el usuario, un error.</p>
<p>Ese contexto cambia el diseño. Ya no basta con la métrica de error: importan la latencia, la disponibilidad, la claridad de la señal y la capacidad de explicar por qué el sistema dice lo que dice.</p>
<h2>Elige el transporte según la frecuencia de decisión</h2>
<p>Si la decisión se toma varias veces por minuto, una conexión persistente evita abrir una petición por actualización. WebSocket encaja cuando el servidor debe empujar datos y el cliente mantener una vista viva. Si la actualización es diaria o por lote, una API REST es más simple de operar y de cachear.</p>
<p>No elijas WebSocket por parecer más avanzado. Añade estado en el servidor, reconexión y orden de mensajes. Para un pronóstico que cambia una vez al día, esa complejidad no compra nada.</p>
<h2>Define el contrato de inferencia</h2>
<p>El modelo debe recibir una entrada explícita: campos, tipos, unidades, zona horaria y ventana temporal. No aceptes un objeto libre y lo interpretes dentro del modelo. Valida en el borde y devuelve un error claro cuando la entrada no cumple el contrato.</p>
<p>La salida también es un contrato: valor, unidad, horizonte, marca de tiempo y versión del modelo. Si el cliente no puede distinguir una predicción de hace cinco minutos de una de hace cinco horas, la interfaz está mintiendo aunque los números sean correctos.</p>
<h2>Mide latencia contra la ventana de decisión</h2>
<p>La métrica útil no es el promedio sino el percentil alto: p95 o p99 de la latencia de punta a punta, desde la llegada del dato hasta la predicción disponible en el cliente. Un promedio bueno puede esconder una cola que deja al usuario esperando justo cuando más importa.</p>
<p>Si el modelo tarda más que la ventana de decisión, la precisión es irrelevante. Reduce el trabajo en la ruta crítica, cachea lo que no cambia y mueve a segundo plano lo que no necesita estar en la respuesta.</p>
<h2>Diseña un fallback explícito</h2>
<p>Los servicios fallan: el modelo no carga, la entrada viene incompleta, la cola se atasca. El sistema debe decidir antes qué hacer. Una opción razonable es devolver el último pronóstico válido con una marca de antigüedad visible, en lugar de un panel vacío o un error técnico.</p>
<p>Lo que no es aceptable es fallar en silencio. Si la interfaz muestra datos viejos como si fueran actuales, el usuario toma decisiones con información que no corresponde. Un indicador de «sin actualizar desde…» es parte del producto, no un detalle.</p>
<h2>Versiona modelo y preprocesador juntos</h2>
<p>La normalización, el escalado y la selección de variables forman parte del modelo. Servir una transformación distinta a la del entrenamiento produce predicciones que parecen razonables y no lo son. Guarda el artefacto completo y versiona ambos como una unidad.</p>
<p>Registra la versión en cada respuesta y en los logs. Cuando algo cambia, necesitas saber qué modelo respondió, con qué datos y desde cuándo. Sin esa trazabilidad, comparar dos comportamientos es adivinar.</p>
<h2>Monitorea resultados, no solo ejecuciones</h2>
<p>Un proceso verde solo indica que los pasos terminaron. Las señales que importan son otras: error reciente, deriva en la distribución de entradas, proporción de predicciones fuera de rango, latencia y antigüedad del último dato.</p>
<p>Define bandas y alertas por señal, no una alerta por cada ejecución. Una alerta por ausencia de datos suele ser más valiosa que cien notificaciones de éxito. Y distingue un cambio real del mundo de un dato roto antes de reentrenar: perseguir ruido también es una forma de degradar el sistema.</p>
<h2>Errores comunes</h2>
<ul>
<li>Elegir WebSocket sin necesidad y cargar con su complejidad.</li>
<li>Aceptar entradas sin validar y fallar dentro del modelo.</li>
<li>Medir latencia promedio e ignorar la cola.</li>
<li>Mostrar datos viejos sin indicar su antigüedad.</li>
<li>Versionar el modelo pero no el preprocesador.</li>
<li>Reentrenar automáticamente ante cualquier alerta.</li>
</ul>
<h2>Preguntas frecuentes</h2>
<h3>¿Necesito WebSocket para servir un modelo?</h3>
<p>No. Depende de la frecuencia de actualización y de si el servidor debe empujar datos. Para una predicción diaria, REST es más simple. Para un panel que se actualiza varias veces por minuto, una conexión persistente evita peticiones innecesarias.</p>
<h3>¿Cómo evito mensajes duplicados o fuera de orden?</h3>
<p>Incluye un identificador de secuencia y una marca de tiempo en cada mensaje, y descarta en el cliente lo que llegue repetido o anterior al último estado aplicado. El orden no se garantiza solo por usar WebSocket.</p>
<h3>¿Debo reentrenar automáticamente?</h3>
<p>No ante cada alerta. Primero distingue un cambio real de un dato roto; después decide si toca reentrenar, recalibrar o corregir la ingesta. Un reentrenamiento automático sin evidencia añade riesgo operativo.</p>
<h3>¿Qué métrica operativa importa más?</h3>
<p>La latencia p95 de punta a punta y la antigüedad del último dato. Con esas dos puedes detectar la mayoría de los incidentes que afectan al usuario.</p>
<h2>Para seguir</h2>
<p>El caso completo está en <a href="/proyectos/trading-predictor">TradeScope AI</a>. Para la parte de datos y validación, lee <a href="/blog/series-temporales-producto">De las series temporales al producto</a>; para la operación en contenedores, <a href="/blog/docker-fundamentals">Docker para Desarrolladores</a>.</p>
`,
    },
    en: {
      title: 'Real-time AI: serving a model without breaking the interface',
      excerpt:
        'What changes when serving an AI model in real time: transport, inference contract, latency, fallback, versioning and monitoring for a reliable service.',
      html: `<p class="blog-summary">A model that works in a notebook is not yet a service. In real time, questions appear that training never asks: how long a response takes, what the interface shows while waiting, what happens if the model fails and how you know data is still arriving. This guide covers that last mile.</p>
<h2>What changes when the model reaches production</h2>
<p>In an experiment, the model is evaluated once at the end. In production, every prediction has a context: who consumes it, how long they can wait and which decision depends on it. A correct forecast that arrives late is, for the user, an error.</p>
<p>That context changes the design. Error metrics are no longer enough: latency, availability, signal clarity and the ability to explain why the system says what it says all matter.</p>
<h2>Choose transport by decision frequency</h2>
<p>If the decision is made several times per minute, a persistent connection avoids opening one request per update. WebSocket fits when the server must push data and the client keeps a live view. If the update is daily or batch-based, a REST API is simpler to operate and cache.</p>
<p>Do not choose WebSocket because it sounds more advanced. It adds server state, reconnection and message ordering. For a forecast that changes once a day, that complexity buys nothing.</p>
<h2>Define the inference contract</h2>
<p>The model must receive an explicit input: fields, types, units, time zone and time window. Do not accept a free-form object and interpret it inside the model. Validate at the edge and return a clear error when the input does not meet the contract.</p>
<p>The output is also a contract: value, unit, horizon, timestamp and model version. If the client cannot tell a prediction from five minutes ago from one from five hours ago, the interface is lying even if the numbers are correct.</p>
<h2>Measure latency against the decision window</h2>
<p>The useful metric is not the average but the high percentile: p95 or p99 end-to-end latency, from data arrival to prediction available in the client. A good average can hide a tail that leaves the user waiting exactly when it matters most.</p>
<p>If the model takes longer than the decision window, accuracy is irrelevant. Reduce work on the critical path, cache what does not change and move to the background what does not need to be in the response.</p>
<h2>Design an explicit fallback</h2>
<p>Services fail: the model does not load, the input is incomplete, the queue backs up. The system must decide in advance what to do. A reasonable option is to return the last valid forecast with a visible age marker, instead of an empty panel or a technical error.</p>
<p>What is not acceptable is failing silently. If the interface shows old data as if it were current, the user makes decisions with information that does not correspond. A “not updated since…” indicator is part of the product, not a detail.</p>
<h2>Version the model and the preprocessor together</h2>
<p>Normalization, scaling and feature selection are part of the model. Serving a transformation different from the one used in training produces predictions that look reasonable and are not. Save the complete artifact and version both as one unit.</p>
<p>Record the version in every response and in the logs. When something changes, you need to know which model answered, with which data and since when. Without that traceability, comparing two behaviors is guessing.</p>
<h2>Monitor outcomes, not just executions</h2>
<p>A green process only means the steps finished. The signals that matter are others: recent error, input distribution drift, share of out-of-range predictions, latency and age of the last datum.</p>
<p>Define bands and per-signal alerts, not one alert per execution. An alert for missing data is often more valuable than a hundred success notifications. And distinguish a real change in the world from broken data before retraining: chasing noise is also a way to degrade the system.</p>
<h2>Common mistakes</h2>
<ul>
<li>Choosing WebSocket without need and carrying its complexity.</li>
<li>Accepting unvalidated inputs and failing inside the model.</li>
<li>Measuring average latency and ignoring the tail.</li>
<li>Showing old data without indicating its age.</li>
<li>Versioning the model but not the preprocessor.</li>
<li>Retraining automatically on every alert.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>Do I need WebSocket to serve a model?</h3>
<p>No. It depends on update frequency and whether the server must push data. For a daily prediction, REST is simpler. For a panel that updates several times per minute, a persistent connection avoids unnecessary requests.</p>
<h3>How do I avoid duplicate or out-of-order messages?</h3>
<p>Include a sequence id and a timestamp in every message, and discard repeated messages or ones older than the last applied state. Order is not guaranteed just by using WebSocket.</p>
<h3>Should I retrain automatically?</h3>
<p>Not on every alert. First distinguish a real change from broken data; then decide whether to retrain, recalibrate or fix ingestion. Automatic retraining without evidence adds operational risk.</p>
<h3>Which operational metric matters most?</h3>
<p>End-to-end p95 latency and the age of the last datum. With those two you can detect most incidents that affect the user.</p>
<h2>Further reading</h2>
<p>The full case study is <a href="/en/proyectos/trading-predictor">TradeScope AI</a>. For the data and validation side, read <a href="/en/blog/series-temporales-producto">From Time Series to Product</a>; for container operations, <a href="/en/blog/docker-fundamentals">Docker for Developers</a>.</p>
`,
    },
  },
];
