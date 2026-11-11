export interface BlogContent {
  title: string;
  excerpt: string;
  html: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  es: BlogContent;
  en: BlogContent;
}

export const posts: BlogPost[] = [
  {
    slug: 'series-temporales-producto',
    date: '2026-05-01',
    es: {
      title: 'De las series temporales al producto',
      excerpt:
        'Cómo llevo un ensemble LSTM + Transformer desde el cuaderno hasta un dashboard en tiempo real.',
      html: `<h2>El problema</h2>
<p>Una serie temporal financiera no perdona la ingenuidad: ruido, regímenes que cambian y una relación señal/ruido muy baja. El primer paso no es elegir un modelo, sino decidir qué se quiere predecir y con qué horizonte.</p>
<h2>El ensemble</h2>
<p>Trabajo con dos arquitecturas complementarias. La LSTM captura dependencias locales y de corto plazo; el Transformer modela relaciones de largo alcance entre eventos distantes. Combinar ambas reduce el sesgo de una sola familia de modelos y estabiliza las predicciones.</p>
<p>El entrenamiento se hace en PyTorch, con ventanas deslizantes y una separación temporal estricta entre train y test para no filtrar información del futuro.</p>
<h2>Del notebook al servicio</h2>
<p>Un modelo que solo vive en Jupyter no es un producto. El backend está construido con FastAPI y expone las predicciones por WebSocket; el dashboard se actualiza sin recargar y muestra el histórico junto al pronóstico.</p>
<h2>Infraestructura</h2>
<p>Todo corre en contenedores Docker sobre un VPS Linux propio. El despliegue incluye variables de entorno para los secretos, volúmenes para los datos y un túnel de Cloudflare para exponer el servicio sin abrir puertos.</p>
<h2>Lo que aprendí</h2>
<ul>
<li>La validación temporal importa más que la arquitectura.</li>
<li>Un modelo sin interfaz no se usa: la última milla es parte del producto.</li>
<li>Docker y un túnel seguro convierten un experimento en algo que se puede enseñar.</li>
</ul>
`,
    },
    en: {
      title: 'From Time Series to Product',
      excerpt:
        'How I take an LSTM + Transformer ensemble from the notebook to a real-time dashboard.',
      html: `<h2>The problem</h2>
<p>A financial time series does not forgive naivety: noise, shifting regimes and a very low signal-to-noise ratio. The first step is not choosing a model but deciding what to predict and over which horizon.</p>
<h2>The ensemble</h2>
<p>I work with two complementary architectures. The LSTM captures local, short-term dependencies; the Transformer models long-range relationships between distant events. Combining both reduces the bias of a single model family and stabilizes predictions.</p>
<p>Training runs in PyTorch with sliding windows and a strict temporal split between train and test so no future information leaks in.</p>
<h2>From notebook to service</h2>
<p>A model that only lives in Jupyter is not a product. The backend is built with FastAPI and exposes predictions over WebSocket; the dashboard updates without reloading and shows the history next to the forecast.</p>
<h2>Infrastructure</h2>
<p>Everything runs in Docker containers on a self-managed Linux VPS. Deployment includes environment variables for secrets, volumes for data and a Cloudflare tunnel to expose the service without opening ports.</p>
<h2>What I learned</h2>
<ul>
<li>Temporal validation matters more than architecture.</li>
<li>A model without an interface does not get used: the last mile is part of the product.</li>
<li>Docker and a secure tunnel turn an experiment into something you can show.</li>
</ul>
`,
    },
  },
  {
    slug: 'docker-fundamentals',
    date: '2026-04-15',
    es: {
      title: 'Docker para Desarrolladores — Lo Esencial',
      excerpt: 'Una guía práctica de los comandos y conceptos de Docker que uso a diario.',
      html: `<h2>Por qué Docker</h2>
<p>Docker resuelve el clásico problema del &quot;en mi máquina funciona&quot;. Cada servicio corre en su propio contenedor aislado con sus dependencias exactas.</p>
<h2>Comandos esenciales</h2>
<pre><code class="language-bash"># Construir una imagen
docker build -t mi-app .

# Ejecutar un contenedor
docker run -d -p 3000:3000 --name app mi-app

# Ver logs
docker logs -f app

# Ejecutar shell dentro del contenedor
docker exec -it app sh
</code></pre>
<h2>Docker Compose</h2>
<p>Para proyectos con múltiples servicios, Docker Compose es indispensable:</p>
<pre><code class="language-yaml">services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
  api:
    build: ./api
    ports:
      - &quot;3000:3000&quot;
    depends_on:
      - db
</code></pre>
<p>Con un solo <code>docker compose up -d</code> despliego toda mi infraestructura: PostgreSQL, Redis, n8n, API NestJS, y dashboard React.</p>
<h2>Buenas prácticas</h2>
<ol>
<li><strong>Usa imágenes Alpine</strong> — son mucho más pequeñas (ej: <code>node:20-alpine</code> en vez de <code>node:20</code>)</li>
<li><strong>Multi-stage builds</strong> — compila en una etapa, sirve en otra</li>
<li><strong>Nunca hardcodees secretos</strong> — usa variables de entorno</li>
<li><strong>Healthchecks</strong> — asegura que el contenedor esté realmente funcionando</li>
<li><strong>Volúmenes para datos persistentes</strong> — Postgres y n8n necesitan sobrevivir reinicios</li>
</ol>
`,
    },
    en: {
      title: 'Docker for Developers — The Essentials',
      excerpt: 'A practical guide to the Docker commands and concepts I use every day.',
      html: `<h2>Why Docker</h2>
<p>Docker solves the classic &quot;it works on my machine&quot; problem. Each service runs in its own isolated container with its exact dependencies.</p>
<h2>Essential commands</h2>
<pre><code class="language-bash"># Build an image
docker build -t my-app .

# Run a container
docker run -d -p 3000:3000 --name app my-app

# Follow logs
docker logs -f app

# Open a shell inside the container
docker exec -it app sh
</code></pre>
<h2>Docker Compose</h2>
<p>For projects with multiple services, Docker Compose is essential:</p>
<pre><code class="language-yaml">services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
  api:
    build: ./api
    ports:
      - &quot;3000:3000&quot;
    depends_on:
      - db
</code></pre>
<p>With a single <code>docker compose up -d</code> I deploy my whole stack: PostgreSQL, Redis, n8n, a NestJS API and a React dashboard.</p>
<h2>Best practices</h2>
<ol>
<li><strong>Use Alpine images</strong> — they are much smaller (e.g. <code>node:20-alpine</code> instead of <code>node:20</code>)</li>
<li><strong>Multi-stage builds</strong> — compile in one stage, serve in another</li>
<li><strong>Never hardcode secrets</strong> — use environment variables</li>
<li><strong>Healthchecks</strong> — make sure the container is actually running</li>
<li><strong>Volumes for persistent data</strong> — Postgres and n8n need to survive restarts</li>
</ol>
`,
    },
  },
];

export function getPostContent(post: BlogPost, language: string): BlogContent {
  return language.startsWith('en') ? post.en : post.es;
}

export function formatPostDate(date: string, language: string) {
  return new Intl.DateTimeFormat(language.startsWith('en') ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
