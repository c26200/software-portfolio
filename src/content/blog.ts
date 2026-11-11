export interface BlogContent {
  title: string;
  excerpt: string;
  html: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  updated?: string;
  es: BlogContent;
  en: BlogContent;
}

export const posts: BlogPost[] = [
  {
    slug: 'series-temporales-producto',
    date: '2026-05-01',
    updated: '2026-11-11',
    es: {
      title: 'De las series temporales al producto',
      excerpt:
        'Cómo llevo un ensemble LSTM + Transformer desde el cuaderno hasta un dashboard en tiempo real.',
      html: `<h2>El problema</h2>
<p>Una serie temporal financiera no perdona la ingenuidad: ruido, regímenes que cambian y una relación señal/ruido muy baja. Antes de elegir un modelo conviene responder tres preguntas: qué se quiere predecir, con qué horizonte y con qué coste de error. Un modelo que acierta la dirección pero llega tarde no sirve; uno que minimiza el error medio pero no distingue un cambio de régimen tampoco.</p>
<p>En TradeScope AI el objetivo era producir un pronóstico útil para una decisión, no ganar un benchmark. Eso cambió el diseño: la métrica principal no sería solo MAE o RMSE, sino la estabilidad del pronóstico en ventanas consecutivas.</p>
<h2>Los datos antes que el modelo</h2>
<p>La mayor parte del trabajo ocurre antes de entrenar. Construyo las series con una frecuencia fija, reviso huecos y valores atípicos, y separo las variables exógenas que pueden explicar el comportamiento sin filtrar información del futuro.</p>
<p>La normalización se ajusta solo con el tramo de entrenamiento y se reutiliza en validación y test. Es un detalle fácil de olvidar y una de las formas más comunes de contaminar un experimento. También dejo un baseline ingenuo —persistencia del último valor— para saber si el modelo aporta algo o solo está memorizando.</p>
<h2>El ensemble</h2>
<p>Trabajo con dos arquitecturas complementarias. La LSTM captura dependencias locales y de corto plazo; el Transformer modela relaciones de largo alcance entre eventos distantes. Combinar ambas reduce el sesgo de una sola familia de modelos y estabiliza las predicciones.</p>
<p>El entrenamiento se hace en <a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">PyTorch</a>, con ventanas deslizantes, una semilla fija y una separación temporal estricta entre train y test. No mezclo filas ni barajo el dataset: en series temporales eso equivale a hacer trampa.</p>
<p>La combinación no es un promedio ciego. Cada modelo tiene su propio peso según la ventana y el régimen, y el sistema registra la contribución de cada rama para poder explicar el resultado.</p>
<h2>Validación temporal</h2>
<p>Uso validación walk-forward: entreno con un bloque, predigo el siguiente, avanzo la ventana y repito. Así el modelo se evalúa en condiciones parecidas a las de producción. Además de MAE y RMSE, miro la precisión direccional y el comportamiento en los cambios de régimen.</p>
<p>Un experimento que mejora el error medio pero empeora en las ventanas volátiles no es un buen experimento. Esa lectura evita elegir un modelo que solo funciona en el promedio.</p>
<h2>Decisiones de diseño</h2>
<p>Separé el entrenamiento del servicio a propósito. El entrenamiento es por lotes y puede tardar; el servicio debe responder en milisegundos. Esa separación permite reentrenar sin tumbar el dashboard y desplegar el backend sin tocar el modelo.</p>
<p>También elegí WebSocket en lugar de polling porque el dashboard necesita varias actualizaciones por minuto y el coste de abrir conexiones nuevas era mayor. Para un pronóstico diario, una API REST sería suficiente; la decisión depende del producto, no de la moda.</p>
<h2>Del notebook al servicio</h2>
<p>Un modelo que solo vive en Jupyter no es un producto. El backend está construido con <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a> y expone las predicciones por WebSocket; el dashboard se actualiza sin recargar y muestra el histórico junto al pronóstico.</p>
<p>El modelo se carga una vez al arrancar, se mantiene en memoria y se sirve con un contrato de entrada y salida explícito. Si el modelo falla, el servicio devuelve el último pronóstico válido y registra el error en lugar de romper la interfaz.</p>
<h2>Infraestructura y operación</h2>
<p>Todo corre en contenedores Docker sobre un VPS Linux propio. El despliegue incluye variables de entorno para los secretos, volúmenes para los datos y un túnel de <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener noreferrer">Cloudflare</a> para exponer el servicio sin abrir puertos.</p>
<p>La operación es parte del producto: logs con contexto, healthchecks, reinicio automático y una alerta cuando el flujo de datos se detiene. Sin eso, el dashboard parece funcionar hasta que alguien mira una gráfica con datos de hace tres días.</p>
<h2>Lo que aprendí</h2>
<ul>
<li>La validación temporal importa más que la arquitectura.</li>
<li>Un modelo sin interfaz no se usa: la última milla es parte del producto.</li>
<li>Docker y un túnel seguro convierten un experimento en algo que se puede enseñar.</li>
<li>Un baseline bien elegido ahorra semanas de trabajo.</li>
</ul>
<p>El código y la arquitectura están en <a href="https://github.com/c26200/trading-predictor" target="_blank" rel="noopener noreferrer">TradeScope AI</a>. Si estás montando algo parecido, el orden que me funcionó fue: datos, validación, baseline, modelo y solo después interfaz.</p>
<p>Si quieres discutir el enfoque, escríbeme desde la <a href="/#contacto">página de contacto</a> o lee cómo llevo la infraestructura a producción en <a href="/blog/docker-fundamentals">Docker para Desarrolladores</a>.</p>
`,
    },
    en: {
      title: 'From Time Series to Product',
      excerpt:
        'How I take an LSTM + Transformer ensemble from the notebook to a real-time dashboard.',
      html: `<h2>The problem</h2>
<p>A financial time series does not forgive naivety: noise, shifting regimes and a very low signal-to-noise ratio. Before choosing a model, answer three questions: what to predict, over which horizon and at what cost of error. A model that gets the direction right but arrives late is useless; one that minimizes mean error but cannot tell a regime change is just as bad.</p>
<p>In TradeScope AI the goal was a forecast that supports a decision, not a benchmark win. That changed the design: the main metric would not be MAE or RMSE alone, but how stable the forecast stays across consecutive windows.</p>
<h2>Data before the model</h2>
<p>Most of the work happens before training. I build the series at a fixed frequency, review gaps and outliers, and separate the exogenous variables that can explain behavior without leaking future information.</p>
<p>Normalization is fitted only on the training slice and reused for validation and test. It is easy to forget and one of the most common ways to contaminate an experiment. I also keep a naive baseline — last-value persistence — to know whether the model adds anything or is only memorizing.</p>
<h2>The ensemble</h2>
<p>I work with two complementary architectures. The LSTM captures local, short-term dependencies; the Transformer models long-range relationships between distant events. Combining both reduces the bias of a single model family and stabilizes predictions.</p>
<p>Training runs in <a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">PyTorch</a> with sliding windows, a fixed seed and a strict temporal split between train and test. I do not shuffle rows or mix the dataset: in time series that is cheating.</p>
<p>The combination is not a blind average. Each model gets its own weight depending on the window and the regime, and the system records each branch's contribution so the result can be explained.</p>
<h2>Temporal validation</h2>
<p>I use walk-forward validation: train on one block, predict the next, advance the window and repeat. That evaluates the model under conditions close to production. Besides MAE and RMSE, I look at directional accuracy and behavior during regime changes.</p>
<p>An experiment that improves mean error but gets worse in volatile windows is not a good experiment. That reading prevents choosing a model that only works on average.</p>
<h2>Design decisions</h2>
<p>I separated training from serving on purpose. Training is batch work and can take time; serving must answer in milliseconds. That split lets me retrain without taking down the dashboard and deploy the backend without touching the model.</p>
<p>I also chose WebSocket over polling because the dashboard needs several updates per minute and opening new connections was more expensive. For a daily forecast, a REST API would be enough; the decision depends on the product, not the trend.</p>
<h2>From notebook to service</h2>
<p>A model that only lives in Jupyter is not a product. The backend is built with <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a> and exposes predictions over WebSocket; the dashboard updates without reloading and shows the history next to the forecast.</p>
<p>The model loads once at startup, stays in memory and is served through an explicit input/output contract. If the model fails, the service returns the last valid forecast and logs the error instead of breaking the interface.</p>
<h2>Infrastructure and operations</h2>
<p>Everything runs in Docker containers on a self-managed Linux VPS. Deployment includes environment variables for secrets, volumes for data and a <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener noreferrer">Cloudflare</a> tunnel to expose the service without opening ports.</p>
<p>Operations are part of the product: contextual logs, healthchecks, automatic restarts and an alert when the data stream stops. Without that, the dashboard looks fine until someone notices a chart with data from three days ago.</p>
<h2>What I learned</h2>
<ul>
<li>Temporal validation matters more than architecture.</li>
<li>A model without an interface does not get used: the last mile is part of the product.</li>
<li>Docker and a secure tunnel turn an experiment into something you can show.</li>
<li>A well-chosen baseline saves weeks of work.</li>
</ul>
<p>The code and architecture are in <a href="https://github.com/c26200/trading-predictor" target="_blank" rel="noopener noreferrer">TradeScope AI</a>. If you are building something similar, the order that worked for me was: data, validation, baseline, model and only then interface.</p>
<p>If you want to discuss the approach, write to me from the <a href="/en#contacto">contact page</a> or read how I take the infrastructure to production in <a href="/en/blog/docker-fundamentals">Docker for Developers</a>.</p>
`,
    },
  },
  {
    slug: 'docker-fundamentals',
    date: '2026-04-15',
    updated: '2026-11-11',
    es: {
      title: 'Docker para Desarrolladores — Lo Esencial',
      excerpt: 'Una guía práctica de los comandos y conceptos de Docker que uso a diario.',
      html: `<h2>Por qué Docker</h2>
<p>Docker resuelve el clásico problema del &quot;en mi máquina funciona&quot;. Cada servicio corre en su propio contenedor aislado con sus dependencias exactas. No elimina los bugs, pero elimina una clase entera de diferencias entre entornos.</p>
<p>En mis proyectos lo uso para empaquetar la API, la base de datos, n8n y el dashboard con la misma configuración en local y en el VPS.</p>
<h2>Imagen y contenedor</h2>
<p>Una imagen es el paquete inmutable: sistema base, dependencias y código. Un contenedor es una instancia en ejecución. Si la imagen es la receta, el contenedor es el plato. Esa distinción explica por qué reconstruir una imagen cambia el contenedor y por qué los datos escritos dentro de un contenedor desaparecen al recrearlo.</p>
<h2>Comandos esenciales</h2>
<pre><code class="language-bash"># Construir una imagen
docker build -t mi-app .

# Ejecutar un contenedor
docker run -d -p 3000:3000 --name app mi-app

# Ver logs
docker logs -f app

# Ejecutar shell dentro del contenedor
docker exec -it app sh

# Listar contenedores e imágenes
docker ps
docker images

# Detener y eliminar un contenedor
docker stop app
docker rm app
</code></pre>
<h2>Un Dockerfile mínimo</h2>
<p>Para una API Node.js, un multi-stage build separa la compilación de la ejecución y deja una imagen final más pequeña:</p>
<pre><code class="language-dockerfile">FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
</code></pre>
<h2>Docker Compose</h2>
<p>Para proyectos con múltiples servicios, Docker Compose es indispensable:</p>
<pre><code class="language-yaml">services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
  api:
    build: ./api
    ports:
      - &quot;3000:3000&quot;
    depends_on:
      - db

volumes:
  pgdata:
</code></pre>
<p>Con un solo <code>docker compose up -d</code> despliego toda mi infraestructura: PostgreSQL, Redis, n8n, API NestJS y dashboard React. Un <code>docker compose down</code> detiene los servicios, pero el volumen <code>pgdata</code> conserva los datos.</p>
<h2>Datos y secretos</h2>
<p>Los datos persistentes van en volúmenes; los secretos, en variables de entorno o en un gestor de secretos. Nunca en la imagen ni en el repositorio. Un archivo <code>.env</code> sirve para desarrollo, pero debe estar en <code>.gitignore</code>.</p>
<p>Si el contenedor de PostgreSQL no tiene volumen, un <code>docker compose down</code> puede borrar la base de datos. Es el error más caro y el más fácil de evitar.</p>
<h2>Buenas prácticas</h2>
<ol>
<li><strong>Usa imágenes Alpine</strong> — son mucho más pequeñas (ej: <code>node:20-alpine</code> en vez de <code>node:20</code>)</li>
<li><strong>Multi-stage builds</strong> — compila en una etapa, sirve en otra</li>
<li><strong>Nunca hardcodees secretos</strong> — usa variables de entorno</li>
<li><strong>Healthchecks</strong> — asegura que el contenedor esté realmente funcionando</li>
<li><strong>Volúmenes para datos persistentes</strong> — Postgres y n8n necesitan sobrevivir reinicios</li>
<li><strong>Etiqueta versiones</strong> — <code>postgres:15-alpine</code>, no <code>latest</code></li>
<li><strong>Un proceso por contenedor</strong> — no mezcles la API y la base de datos en la misma imagen</li>
<li><strong>Usuario no root</strong> — crea un usuario en el Dockerfile</li>
<li><strong>.dockerignore</strong> — evita copiar <code>node_modules</code>, <code>.git</code> y archivos locales</li>
</ol>
<h2>Operación y diagnóstico</h2>
<p>En producción reviso logs, uso healthchecks y configuro una política de reinicio. Compose permite declarar <code>restart: unless-stopped</code> y un <code>healthcheck</code> que consulta un endpoint de la API. Si el contenedor falla, se reinicia; si no responde, el orquestador lo marca como unhealthy.</p>
<p>Para diagnosticar, <code>docker stats</code> muestra CPU y memoria, y <code>docker system df</code> revela cuánto espacio ocupan imágenes y volúmenes. <code>docker system prune</code> limpia lo que ya no se usa, pero conviene revisar antes de ejecutarlo.</p>
<h2>Cuándo no usar Docker</h2>
<p>Para un script de una sola ejecución o una función serverless pequeña, un contenedor puede ser más infraestructura de la necesaria. Docker brilla cuando hay varios servicios, dependencias del sistema o una diferencia real entre local y producción.</p>
<h2>Para seguir</h2>
<p>La referencia oficial está en la documentación de <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> y <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a>. El caso de Convenios, con PostgreSQL, n8n y una API NestJS en contenedores, está en <a href="https://github.com/c26200/convenios-dashboard" target="_blank" rel="noopener noreferrer">este caso de estudio</a>.</p>
<p>Si estás montando una infraestructura parecida y quieres una segunda opinión, <a href="/#contacto">hablemos</a>. También puedes leer cómo llevo un modelo de IA de la libreta al servicio en <a href="/blog/series-temporales-producto">De las series temporales al producto</a>.</p>
`,
    },
    en: {
      title: 'Docker for Developers — The Essentials',
      excerpt: 'A practical guide to the Docker commands and concepts I use every day.',
      html: `<h2>Why Docker</h2>
<p>Docker solves the classic &quot;it works on my machine&quot; problem. Each service runs in its own isolated container with its exact dependencies. It does not remove bugs, but it removes an entire class of differences between environments.</p>
<p>In my projects I use it to package the API, the database, n8n and the dashboard with the same configuration locally and on the VPS.</p>
<h2>Image and container</h2>
<p>An image is the immutable package: base system, dependencies and code. A container is a running instance. If the image is the recipe, the container is the dish. That distinction explains why rebuilding an image changes the container and why data written inside a container disappears when it is recreated.</p>
<h2>Essential commands</h2>
<pre><code class="language-bash"># Build an image
docker build -t my-app .

# Run a container
docker run -d -p 3000:3000 --name app my-app

# Follow logs
docker logs -f app

# Open a shell inside the container
docker exec -it app sh

# List containers and images
docker ps
docker images

# Stop and remove a container
docker stop app
docker rm app
</code></pre>
<h2>A minimal Dockerfile</h2>
<p>For a Node.js API, a multi-stage build separates compilation from runtime and leaves a smaller final image:</p>
<pre><code class="language-dockerfile">FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
</code></pre>
<h2>Docker Compose</h2>
<p>For projects with multiple services, Docker Compose is essential:</p>
<pre><code class="language-yaml">services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
  api:
    build: ./api
    ports:
      - &quot;3000:3000&quot;
    depends_on:
      - db

volumes:
  pgdata:
</code></pre>
<p>With a single <code>docker compose up -d</code> I deploy my whole stack: PostgreSQL, Redis, n8n, a NestJS API and a React dashboard. A <code>docker compose down</code> stops the services, but the <code>pgdata</code> volume keeps the data.</p>
<h2>Data and secrets</h2>
<p>Persistent data belongs in volumes; secrets belong in environment variables or a secret manager. Never in the image or the repository. A <code>.env</code> file is fine for development, but it must be in <code>.gitignore</code>.</p>
<p>If the PostgreSQL container has no volume, a <code>docker compose down</code> can wipe the database. It is the most expensive mistake and the easiest one to avoid.</p>
<h2>Best practices</h2>
<ol>
<li><strong>Use Alpine images</strong> — they are much smaller (e.g. <code>node:20-alpine</code> instead of <code>node:20</code>)</li>
<li><strong>Multi-stage builds</strong> — compile in one stage, serve in another</li>
<li><strong>Never hardcode secrets</strong> — use environment variables</li>
<li><strong>Healthchecks</strong> — make sure the container is actually running</li>
<li><strong>Volumes for persistent data</strong> — Postgres and n8n need to survive restarts</li>
<li><strong>Pin versions</strong> — <code>postgres:15-alpine</code>, not <code>latest</code></li>
<li><strong>One process per container</strong> — do not mix the API and the database in the same image</li>
<li><strong>Non-root user</strong> — create a user in the Dockerfile</li>
<li><strong>.dockerignore</strong> — keep <code>node_modules</code>, <code>.git</code> and local files out of the build</li>
</ol>
<h2>Operations and troubleshooting</h2>
<p>In production I watch logs, use healthchecks and set a restart policy. Compose lets me declare <code>restart: unless-stopped</code> and a <code>healthcheck</code> that hits an API endpoint. If the container crashes, it restarts; if it stops responding, it is marked unhealthy.</p>
<p>To diagnose, <code>docker stats</code> shows CPU and memory, and <code>docker system df</code> reveals how much space images and volumes use. <code>docker system prune</code> cleans up unused resources, but review before running it.</p>
<h2>When not to use Docker</h2>
<p>For a one-off script or a small serverless function, a container can be more infrastructure than you need. Docker shines when there are several services, system dependencies or a real difference between local and production.</p>
<h2>Further reading</h2>
<p>The official reference is the <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> and <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a> documentation. The Convenios case study, with PostgreSQL, n8n and a NestJS API in containers, is <a href="https://github.com/c26200/convenios-dashboard" target="_blank" rel="noopener noreferrer">here</a>.</p>
<p>If you are building similar infrastructure and want a second opinion, <a href="/en#contacto">let's talk</a>. You can also read how I take an AI model from the notebook to a service in <a href="/en/blog/series-temporales-producto">From Time Series to Product</a>.</p>
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
