export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  html: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'series-temporales-producto',
    title: 'De las series temporales al producto',
    date: '2026-05-01',
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
  {
    slug: 'docker-fundamentals',
    title: 'Docker para Desarrolladores — Lo Esencial',
    date: '2026-04-15',
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
];
