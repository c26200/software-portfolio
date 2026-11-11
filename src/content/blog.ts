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

export interface TocItem {
  id: string;
  text: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'series-temporales-producto',
    date: '2026-05-01',
    updated: '2026-11-11',
    es: {
      title: 'De las series temporales al producto',
      excerpt:
        'Guía completa para llevar un modelo de series temporales del notebook a un servicio observable: datos, validación, ensemble LSTM + Transformer y operación.',
      html: `<p class="blog-summary">Una serie temporal no se convierte en producto por entrenar un modelo. Se convierte cuando los datos están limpios, la validación no hace trampa, el servicio responde a tiempo y alguien puede detectar cuándo deja de funcionar. Esta guía recorre ese camino completo, con el caso de TradeScope AI.</p>
<h2>Qué es una serie temporal y por qué falla la intuición</h2>
<p>Una serie temporal es una secuencia de observaciones ordenadas en el tiempo. A diferencia de una tabla tradicional, el orden importa: cada fila depende de las anteriores y el futuro no puede usarse para explicar el pasado. Una serie financiera suele combinar tendencia, estacionalidad, ciclos, ruido y cambios de régimen, y la relación entre señal y ruido es baja.</p>
<p>La intuición falla por dos motivos. Primero, un modelo puede verse excelente en el histórico y fallar en la siguiente ventana. Segundo, el error medio oculta los momentos que más importan: los cambios bruscos. Por eso el diseño empieza por la decisión que el pronóstico debe apoyar, no por la arquitectura.</p>
<h2>Define el problema antes de elegir el modelo</h2>
<p>Antes de escribir código responde qué se predice, con qué horizonte y qué cuesta equivocarse. No es lo mismo pronosticar el precio de mañana para una alerta que estimar la demanda de la próxima semana para comprar inventario. El horizonte cambia las variables, la métrica y hasta la frecuencia de reentrenamiento.</p>
<p>Define también un baseline. La persistencia del último valor es una referencia barata y honesta: si el modelo no la supera de forma consistente, no hay producto. En TradeScope AI el objetivo era un pronóstico estable para una decisión, no ganar un benchmark aislado.</p>
<h2>Datos: la parte que decide el resultado</h2>
<p>La mayor parte del trabajo ocurre antes de entrenar. Fija una frecuencia, alinea las series, revisa huecos y valores atípicos, y documenta cómo se rellenan. Un valor imputado con el futuro es una fuga de información; uno imputado con la media histórica puede ser aceptable si esa media solo usa el pasado.</p>
<p>La normalización se ajusta únicamente con el tramo de entrenamiento y se reutiliza en validación y test. Es un detalle fácil de olvidar y una de las formas más comunes de contaminar un experimento. Lo mismo aplica a la selección de variables exógenas: si una variable no está disponible en el momento de predecir, no puede entrar al modelo.</p>
<h2>Validación temporal: cómo no engañarte</h2>
<p>Barajar las filas antes de partir el dataset es el error clásico. En una serie temporal equivale a entrenar con el futuro y evaluar con el pasado. La alternativa es la validación walk-forward: entrenar con un bloque, predecir el siguiente, avanzar la ventana y repetir. También puedes usar ventanas expansivas o separar un bloque final que nunca se toque hasta la evaluación definitiva.</p>
<p>Además de MAE y RMSE, mira la precisión direccional y la distribución del error por ventana. Un modelo con un error medio ligeramente peor pero mucho más estable suele ser mejor para una decisión real. Si el sistema genera operaciones, incluye los costes y el retraso de ejecución en la evaluación; un acierto teórico que llega tarde no es un acierto.</p>
<h2>Familias de modelos y cuándo usar cada una</h2>
<table>
<thead><tr><th>Familia</th><th>Fortalezas</th><th>Límites</th><th>Cuándo usarla</th></tr></thead>
<tbody>
<tr><td>Baseline naive</td><td>Trivial y explicable</td><td>No capta estructura</td><td>Siempre, como referencia</td></tr>
<tr><td>ARIMA / SARIMAX</td><td>Interpretable, rápido, intervalos</td><td>Relación lineal, difícil con muchas series</td><td>Series univariadas estables</td></tr>
<tr><td>Prophet</td><td>Estacionalidad y festivos, fácil de ajustar</td><td>Menos preciso con alta frecuencia</td><td>Negocio con estacionalidad clara</td></tr>
<tr><td>LSTM</td><td>Dependencias locales y secuencias largas</td><td>Coste de entrenamiento, poca transparencia</td><td>Patrones no lineales con datos suficientes</td></tr>
<tr><td>Transformer</td><td>Relaciones de largo alcance</td><td>Más datos y cómputo</td><td>Eventos distantes y series multivariadas</td></tr>
<tr><td>Ensemble</td><td>Reduce varianza y sesgo</td><td>Más infraestructura y mantenimiento</td><td>Producción con requisitos de estabilidad</td></tr>
</tbody>
</table>
<p>Empieza por lo simple y sube solo cuando la evidencia lo justifique. Un ARIMA bien validado puede ser suficiente para una serie limpia; un ensemble tiene sentido cuando varias familias capturan patrones distintos y el coste de mantenimiento está justificado.</p>
<h2>El ensemble LSTM + Transformer</h2>
<p>La LSTM captura dependencias locales y de corto plazo; el Transformer modela relaciones de largo alcance entre eventos distantes. Combinar ambas reduce el sesgo de una sola familia y estabiliza las predicciones. La combinación no es un promedio ciego: cada rama tiene un peso según la ventana y el régimen, y el sistema registra su contribución para poder explicar el resultado.</p>
<p>El entrenamiento se hace en <a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">PyTorch</a>, con ventanas deslizantes, una semilla fija y una separación temporal estricta entre train y test. No mezclo filas ni barajo el dataset. También guardo el modelo y el preprocesador como una unidad: servir una normalización distinta a la del entrenamiento es una fuente silenciosa de errores.</p>
<h2>Del notebook al servicio</h2>
<p>Un modelo que solo vive en Jupyter no es un producto. El backend está construido con <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a> y expone las predicciones por WebSocket; el dashboard se actualiza sin recargar y muestra el histórico junto al pronóstico. Elegí WebSocket porque el panel necesita varias actualizaciones por minuto y abrir conexiones nuevas era más caro. Para un pronóstico diario, una API REST sería suficiente.</p>
<p>El modelo se carga una vez al arrancar, se mantiene en memoria y se sirve con un contrato de entrada y salida explícito. Si falla, el servicio devuelve el último pronóstico válido y registra el error en lugar de romper la interfaz. Esa última milla —contrato, latencia y recuperación— es parte del producto, no un detalle de infraestructura.</p>
<h2>Infraestructura y operación</h2>
<p>Todo corre en contenedores Docker sobre un VPS Linux propio. El despliegue incluye variables de entorno para los secretos, volúmenes para los datos y un túnel de <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener noreferrer">Cloudflare</a> para exponer el servicio sin abrir puertos. La operación es parte del producto: logs con contexto, healthchecks, reinicio automático y una alerta cuando el flujo de datos se detiene.</p>
<p>Sin esa vigilancia, el dashboard parece funcionar hasta que alguien mira una gráfica con datos de hace tres días. Un panel vacío se nota; uno con datos viejos engaña.</p>
<h2>Reproducibilidad y métricas que importan</h2>
<p>Un resultado que no se puede repetir no es un resultado. Fijo la semilla, congelo las versiones de las librerías, guardo la configuración del experimento junto al modelo y registro qué dataset se usó. Así puedo comparar dos ejecuciones sin depender de la memoria. También registro MAE, RMSE y precisión direccional por ventana, y comparo la distribución, no solo el promedio.</p>
<p>El rendimiento del servicio cuenta: mido el tiempo de respuesta del endpoint y la tasa de pronósticos servidos desde caché. Si el modelo tarda más de lo que dura la ventana de decisión, la precisión es irrelevante.</p>
<h2>Monitoreo y deriva</h2>
<p>Un modelo no se degrada solo por un bug; se degrada porque el mundo cambia. Mido la distribución de las entradas, el error reciente y la tasa de predicciones fuera de rango. Cuando una de esas señales se sale de su banda durante varias ventanas, se dispara una revisión.</p>
<p>No reentreno automáticamente en cada alerta. Primero distingo entre un cambio real y un dato roto; después decido si hace falta reentrenar, recalibrar o solo corregir la ingesta. Esa distinción evita modelos que persiguen ruido.</p>
<h2>Checklist para llevar un modelo a producción</h2>
<ul>
<li>Baseline definido y superado con la misma validación.</li>
<li>Separación temporal estricta y sin barajado.</li>
<li>Preprocesador ajustado solo con train y guardado con el modelo.</li>
<li>Contrato de entrada y salida documentado.</li>
<li>Fallback cuando el modelo o los datos fallan.</li>
<li>Healthcheck y alerta de datos detenidos.</li>
<li>Logs con contexto y versión del modelo.</li>
<li>Latencia medida contra la ventana de decisión.</li>
<li>Semilla, versiones y configuración reproducibles.</li>
<li>Plan de reentrenamiento y criterio de rollback.</li>
</ul>
<h2>Errores comunes</h2>
<ul>
<li>Barajar la serie antes de partirla: filtra futuro al pasado.</li>
<li>Optimizar solo el error medio: el modelo se vuelve conservador en los cambios de régimen.</li>
<li>Medir el modelo en el notebook y no la latencia del servicio.</li>
<li>Desplegar sin alerta de datos detenidos.</li>
<li>Comparar modelos con validaciones distintas.</li>
<li>Ignorar el coste de la decisión y el retraso de ejecución.</li>
</ul>
<h2>Preguntas frecuentes</h2>
<h3>¿Necesito deep learning para una serie temporal?</h3>
<p>No. Empieza con un baseline y un modelo estadístico bien validado. El deep learning aporta cuando hay suficientes datos, relaciones no lineales y varias series relacionadas; si no, añade complejidad sin garantía de mejora.</p>
<h3>¿Cuántos datos necesito?</h3>
<p>Depende de la señal y del horizonte, no solo del número de filas. Pocos datos favorecen modelos simples; muchas series ruidosas no se arreglan con más parámetros. La validación walk-forward te dirá si el modelo generaliza.</p>
<h3>¿Cómo evito filtrar información del futuro?</h3>
<p>Separa por tiempo, nunca al azar. Ajusta la normalización y cualquier transformación solo con el pasado. Revisa que cada variable exógena esté disponible en el momento de predecir.</p>
<h3>¿Cuándo debo reentrenar?</h3>
<p>Cuando el error o la distribución de los datos cambie de forma sostenida. Combina un calendario con disparadores por drift; reentrenar cada día sin evidencia solo añade riesgo operativo.</p>
<h2>Para seguir</h2>
<p>El código y la arquitectura están en <a href="https://github.com/c26200/trading-predictor" target="_blank" rel="noopener noreferrer">TradeScope AI</a>. Si estás montando algo parecido, el orden que me funcionó fue: datos, validación, baseline, modelo y solo después interfaz. La parte de infraestructura está en <a href="/blog/docker-fundamentals">Docker para Desarrolladores</a>, y si quieres discutir el enfoque puedes escribirme desde la <a href="/#contacto">página de contacto</a>.</p>
`,
    },
    en: {
      title: 'From Time Series to Product',
      excerpt:
        'A complete guide to taking a time-series model from the notebook to an observable service: data, validation, an LSTM + Transformer ensemble and operations.',
      html: `<p class="blog-summary">A time series does not become a product just because you trained a model. It becomes one when the data is clean, the validation does not cheat, the service answers on time and someone can tell when it stops working. This guide walks the whole path, using TradeScope AI as the case study.</p>
<h2>What a time series is and why intuition fails</h2>
<p>A time series is a sequence of observations ordered in time. Unlike a traditional table, order matters: each row depends on the previous ones and the future cannot be used to explain the past. A financial series usually combines trend, seasonality, cycles, noise and regime changes, and the signal-to-noise ratio is low.</p>
<p>Intuition fails for two reasons. First, a model can look excellent on history and fail on the next window. Second, mean error hides the moments that matter most: sharp changes. That is why design starts with the decision the forecast must support, not with the architecture.</p>
<h2>Define the problem before choosing a model</h2>
<p>Before writing code, answer what is being predicted, over which horizon and what a mistake costs. Forecasting tomorrow's price for an alert is not the same as estimating next week's demand to buy inventory. The horizon changes the features, the metric and even the retraining cadence.</p>
<p>Define a baseline too. Last-value persistence is a cheap and honest reference: if the model does not beat it consistently, there is no product. In TradeScope AI the goal was a stable forecast for a decision, not a benchmark win in isolation.</p>
<h2>Data: the part that decides the result</h2>
<p>Most of the work happens before training. Fix a frequency, align the series, review gaps and outliers, and document how they are filled. A value imputed with the future is a leak; one imputed with the historical mean can be acceptable if that mean only uses the past.</p>
<p>Normalization is fitted only on the training slice and reused for validation and test. It is easy to forget and one of the most common ways to contaminate an experiment. The same applies to exogenous variables: if a variable is not available at prediction time, it cannot enter the model.</p>
<h2>Temporal validation: how not to fool yourself</h2>
<p>Shuffling rows before splitting the dataset is the classic mistake. In a time series it means training on the future and evaluating on the past. The alternative is walk-forward validation: train on one block, predict the next, advance the window and repeat. You can also use expanding windows or hold out a final block that is never touched until the definitive evaluation.</p>
<p>Besides MAE and RMSE, look at directional accuracy and the error distribution per window. A model with a slightly worse mean error but much better stability is often better for a real decision. If the system generates trades, include costs and execution delay in the evaluation; a theoretical hit that arrives late is not a hit.</p>
<h2>Model families and when to use each</h2>
<table>
<thead><tr><th>Family</th><th>Strengths</th><th>Limits</th><th>When to use it</th></tr></thead>
<tbody>
<tr><td>Naive baseline</td><td>Trivial and explainable</td><td>Captures no structure</td><td>Always, as a reference</td></tr>
<tr><td>ARIMA / SARIMAX</td><td>Interpretable, fast, intervals</td><td>Linear relationship, hard with many series</td><td>Stable univariate series</td></tr>
<tr><td>Prophet</td><td>Seasonality and holidays, easy to fit</td><td>Less precise at high frequency</td><td>Business data with clear seasonality</td></tr>
<tr><td>LSTM</td><td>Local dependencies and long sequences</td><td>Training cost, low transparency</td><td>Non-linear patterns with enough data</td></tr>
<tr><td>Transformer</td><td>Long-range relationships</td><td>More data and compute</td><td>Distant events and multivariate series</td></tr>
<tr><td>Ensemble</td><td>Reduces variance and bias</td><td>More infrastructure and maintenance</td><td>Production with stability requirements</td></tr>
</tbody>
</table>
<p>Start simple and move up only when evidence justifies it. A well-validated ARIMA can be enough for a clean series; an ensemble makes sense when several families capture different patterns and the maintenance cost is justified.</p>
<h2>The LSTM + Transformer ensemble</h2>
<p>The LSTM captures local, short-term dependencies; the Transformer models long-range relationships between distant events. Combining both reduces the bias of a single family and stabilizes predictions. The combination is not a blind average: each branch gets a weight depending on the window and the regime, and the system records its contribution so the result can be explained.</p>
<p>Training runs in <a href="https://pytorch.org/" target="_blank" rel="noopener noreferrer">PyTorch</a> with sliding windows, a fixed seed and a strict temporal split between train and test. I do not shuffle rows or mix the dataset. I also keep the model and the preprocessor together: serving a different normalization than the one used in training is a silent source of bugs.</p>
<h2>From notebook to service</h2>
<p>A model that only lives in Jupyter is not a product. The backend is built with <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a> and exposes predictions over WebSocket; the dashboard updates without reloading and shows the history next to the forecast. I chose WebSocket because the panel needs several updates per minute and opening new connections was more expensive. For a daily forecast, a REST API would be enough.</p>
<p>The model loads once at startup, stays in memory and is served through an explicit input/output contract. If it fails, the service returns the last valid forecast and logs the error instead of breaking the interface. That last mile —contract, latency and recovery— is part of the product, not an infrastructure detail.</p>
<h2>Infrastructure and operations</h2>
<p>Everything runs in Docker containers on a self-managed Linux VPS. Deployment includes environment variables for secrets, volumes for data and a <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/" target="_blank" rel="noopener noreferrer">Cloudflare</a> tunnel to expose the service without opening ports. Operations are part of the product: contextual logs, healthchecks, automatic restarts and an alert when the data stream stops.</p>
<p>Without that vigilance, the dashboard looks fine until someone notices a chart with data from three days ago. An empty panel is obvious; one with stale data is misleading.</p>
<h2>Reproducibility and metrics that matter</h2>
<p>A result you cannot repeat is not a result. I fix the seed, pin library versions, store the experiment configuration next to the model and record which dataset was used. That lets me compare two runs without relying on memory. I also record MAE, RMSE and directional accuracy per window, and compare the distribution, not just the average.</p>
<p>Service performance counts: I measure endpoint response time and the share of forecasts served from cache. If the model takes longer than the decision window, accuracy is irrelevant.</p>
<h2>Monitoring and drift</h2>
<p>A model does not degrade only because of a bug; it degrades because the world changes. I track input distribution, recent error and the rate of out-of-range predictions. When one of those signals leaves its band for several windows, it triggers a review.</p>
<p>I do not retrain automatically on every alert. First I distinguish a real change from broken data; then I decide whether to retrain, recalibrate or just fix ingestion. That distinction prevents models that chase noise.</p>
<p>Finally, I keep a simple dashboard with four signals: recent error, input drift, prediction range and service latency. If any of them is outside its band, the model is not necessarily wrong, but it deserves a look. The goal is not a perfect score but a forecast the team can trust enough to act on.</p>
<h2>Checklist for taking a model to production</h2>
<ul>
<li>Baseline defined and beaten with the same validation.</li>
<li>Strict temporal split with no shuffling.</li>
<li>Preprocessor fitted on train only and saved with the model.</li>
<li>Documented input/output contract.</li>
<li>Fallback when the model or data fails.</li>
<li>Healthcheck and stalled-data alert.</li>
<li>Contextual logs and model version.</li>
<li>Latency measured against the decision window.</li>
<li>Reproducible seed, versions and configuration.</li>
<li>Retraining plan and rollback criteria.</li>
</ul>
<h2>Common mistakes</h2>
<ul>
<li>Shuffling the series before splitting it: future leaks into the past.</li>
<li>Optimizing only mean error: the model becomes conservative during regime changes.</li>
<li>Measuring the model in the notebook but not the service latency.</li>
<li>Shipping without a stalled-data alert.</li>
<li>Comparing models with different validations.</li>
<li>Ignoring decision cost and execution delay.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>Do I need deep learning for a time series?</h3>
<p>No. Start with a baseline and a well-validated statistical model. Deep learning helps when there is enough data, non-linear relationships and several related series; otherwise it adds complexity without a guaranteed gain.</p>
<h3>How much data do I need?</h3>
<p>It depends on the signal and the horizon, not just the number of rows. Little data favors simple models; many noisy series are not fixed with more parameters. Walk-forward validation will tell you whether the model generalizes.</p>
<h3>How do I avoid leaking future information?</h3>
<p>Split by time, never at random. Fit normalization and any transformation only on the past. Check that every exogenous variable is available at prediction time.</p>
<h3>When should I retrain?</h3>
<p>When error or data distribution changes persistently. Combine a schedule with drift triggers; retraining daily without evidence only adds operational risk.</p>
<h2>Further reading</h2>
<p>The code and architecture are in <a href="https://github.com/c26200/trading-predictor" target="_blank" rel="noopener noreferrer">TradeScope AI</a>. If you are building something similar, the order that worked for me was: data, validation, baseline, model and only then interface. The infrastructure side is in <a href="/en/blog/docker-fundamentals">Docker for Developers</a>, and if you want to discuss the approach you can write to me from the <a href="/en#contacto">contact page</a>.</p>
`,
    },
  },
  {
    slug: 'docker-fundamentals',
    date: '2026-04-15',
    updated: '2026-11-11',
    es: {
      title: 'Docker para Desarrolladores — Lo Esencial',
      excerpt:
        'Guía práctica de Docker para desarrollar y desplegar: imágenes, Dockerfile, Compose, datos, redes, seguridad, CI y errores comunes.',
      html: `<p class="blog-summary">Docker no elimina los bugs, pero elimina una clase entera de diferencias entre entornos. Esta guía cubre lo que uso a diario: imágenes y contenedores, Dockerfile, Compose, datos, redes, seguridad y operación, con los errores que más cuestan.</p>
<h2>Qué es Docker y qué problema resuelve</h2>
<p>Docker empaqueta una aplicación con sus dependencias en una imagen que se ejecuta igual en local, en CI y en el servidor. Resuelve el clásico &quot;en mi máquina funciona&quot; sin obligarte a mantener una máquina virtual por servicio.</p>
<table>
<thead><tr><th>Aspecto</th><th>Contenedor</th><th>Máquina virtual</th></tr></thead>
<tbody>
<tr><td>Arranque</td><td>Segundos</td><td>Minutos</td></tr>
<tr><td>Aislamiento</td><td>Proceso</td><td>Sistema completo</td></tr>
<tr><td>Tamaño</td><td>Megabytes</td><td>Gigabytes</td></tr>
<tr><td>Kernel</td><td>Compartido con el host</td><td>Propio</td></tr>
<tr><td>Uso típico</td><td>Servicios, CI, desarrollo</td><td>Aislamiento fuerte u otro sistema operativo</td></tr>
</tbody>
</table>
<h2>Imagen, contenedor, volumen y red</h2>
<p>Una imagen es el paquete inmutable: sistema base, dependencias y código. Un contenedor es una instancia en ejecución. Si la imagen es la receta, el contenedor es el plato. Un volumen es almacenamiento que sobrevive al contenedor, y una red permite que los servicios se encuentren por nombre sin exponer puertos innecesarios.</p>
<p>Esa distinción explica por qué reconstruir una imagen cambia el contenedor y por qué los datos escritos dentro de un contenedor desaparecen al recrearlo si no están en un volumen.</p>
<h2>Primeros comandos</h2>
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
<h2>Dockerfile: capas, multi-stage y .dockerignore</h2>
<p>Un Dockerfile se construye por capas. El orden importa: copiar primero <code>package.json</code> y el lockfile permite reutilizar la capa de dependencias cuando solo cambia el código. Copiar todo antes de <code>npm ci</code> invalida la caché en cada commit.</p>
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
<p>El multi-stage separa compilación y ejecución, deja una imagen final más pequeña y evita llevar las dependencias de build a producción. Un <code>.dockerignore</code> con <code>node_modules</code>, <code>.git</code> y archivos locales acelera el build y reduce el contexto.</p>
<h2>Docker Compose: varios servicios sin dolor</h2>
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
<p>Con un solo <code>docker compose up -d</code> despliego PostgreSQL, Redis, n8n, una API NestJS y un dashboard React. Un <code>docker compose down</code> detiene los servicios, pero el volumen <code>pgdata</code> conserva los datos.</p>
<h2>Datos y secretos</h2>
<p>Los datos persistentes van en volúmenes; los secretos, en variables de entorno o en un gestor de secretos. Nunca en la imagen ni en el repositorio. Un archivo <code>.env</code> sirve para desarrollo, pero debe estar en <code>.gitignore</code>. Si el contenedor de PostgreSQL no tiene volumen, un <code>docker compose down</code> puede borrar la base de datos.</p>
<h2>Redes y reverse proxy</h2>
<p>En Compose, los servicios se encuentran por su nombre: la API se conecta a <code>db:5432</code>, no a <code>localhost</code>. Esa red interna evita exponer la base de datos al exterior; solo el servicio que necesita un puerto público lo publica. En producción, un reverse proxy o la plataforma termina TLS y reenvía al contenedor; el contenedor no debería saber si está detrás de Nginx, Caddy o un túnel.</p>
<h2>Build cache y CI/CD</h2>
<p>En CI construyo la imagen una vez, la etiqueto con el SHA del commit y la promuevo entre entornos. Así lo que se prueba es exactamente lo que se despliega. La caché de capas acelera los builds, pero solo si el orden del Dockerfile la respeta. Para dependencias pesadas, un caché de BuildKit o un registro intermedio evita reconstruir todo en cada pipeline.</p>
<h2>Seguridad básica</h2>
<p>No ejecutes contenedores como root, no publiques la base de datos y mantén las imágenes base actualizadas. Un escaneo con Trivy en CI detecta vulnerabilidades conocidas antes de que lleguen a producción. Los secretos no van en el Dockerfile: si necesitas pasarlos en build, usa BuildKit secrets en lugar de <code>ARG</code>, porque los argumentos quedan en el historial de la imagen.</p>
<h2>Operación y diagnóstico</h2>
<p>En producción reviso logs, uso healthchecks y configuro una política de reinicio. Compose permite declarar <code>restart: unless-stopped</code> y un <code>healthcheck</code> que consulta un endpoint. Si el contenedor falla, se reinicia; si no responde, se marca como unhealthy. <code>docker stats</code> muestra CPU y memoria, <code>docker system df</code> revela el espacio usado y <code>docker system prune</code> limpia lo que ya no se usa.</p>
<h2>Errores comunes y cómo diagnosticarlos</h2>
<table>
<thead><tr><th>Síntoma</th><th>Causa probable</th><th>Acción</th></tr></thead>
<tbody>
<tr><td>Puerto ocupado</td><td>Otro proceso usa el puerto</td><td>Cambia el mapeo o detén el proceso</td></tr>
<tr><td>El contenedor reinicia</td><td>Falla el proceso o el healthcheck</td><td>Revisa <code>docker logs</code> y el comando</td></tr>
<tr><td>No persisten datos</td><td>Falta un volumen</td><td>Declara el volumen en Compose</td></tr>
<tr><td>Permiso denegado</td><td>UID distinto al del host</td><td>Ajusta usuario o permisos</td></tr>
<tr><td>Imagen enorme</td><td>Dependencias de build y capas</td><td>Multi-stage, Alpine y .dockerignore</td></tr>
<tr><td>Arquitectura incorrecta</td><td>Imagen ARM en un servidor x86</td><td>Construye con <code>--platform</code></td></tr>
</tbody>
</table>
<h2>Docker en desarrollo</h2>
<p>En local uso bind mounts para montar el código dentro del contenedor y aprovechar el hot reload. Así el contenedor mantiene las dependencias y el editor sigue trabajando en el host. Para tareas puntuales, <code>docker compose run --rm</code> ejecuta un comando sin dejar contenedores colgando.</p>
<p>No reconstruyo la imagen en cada cambio de código; solo cuando cambian dependencias o el Dockerfile. Esa separación ahorra tiempo y evita builds innecesarios.</p>
<h2>Compose, Swarm o Kubernetes</h2>
<p>Compose es suficiente para un VPS con pocos servicios y un solo host. Si necesitas alta disponibilidad, escalado automático o varios nodos, el siguiente paso es un orquestador. Kubernetes resuelve eso, pero añade complejidad operativa; no lo adoptaría solo porque suena más profesional.</p>
<p>Para muchos proyectos, un VPS con Compose, healthchecks y backups bien probados es más fiable que un clúster mal administrado.</p>
<h2>Registros e imágenes</h2>
<p>Etiqueto cada imagen con el SHA del commit y la publico en un registro. El servidor hace <code>pull</code> de esa etiqueta exacta, no de <code>latest</code>. Así puedo volver a una versión anterior sin adivinar qué contenía la imagen.</p>
<h2>Límites de recursos y logs</h2>
<p>En Compose declaro límites de memoria y CPU para que un servicio no consuma el host entero. También configuro el driver de logs con rotación; sin límite, un contenedor ruidoso puede llenar el disco. Son ajustes pequeños que evitan incidentes grandes.</p>
<h2>Docker, Podman y otras alternativas</h2>
<p>Podman es una alternativa sin daemon y con soporte rootless; para la mayoría de flujos, los comandos son compatibles con Docker. Docker sigue siendo el estándar y tiene el ecosistema más amplio. La elección depende del entorno y de las políticas de seguridad, no de una preferencia personal.</p>
<p>También existen runtimes más ligeros para casos embebidos, pero no sustituyen a Docker cuando necesitas imágenes portables, Compose y un registro. Antes de cambiar de herramienta, mide qué problema concreto estás resolviendo.</p>
<h2>Despliegue sin downtime</h2>
<p>Para actualizar un servicio sin cortar la conexión, levanto el nuevo contenedor, espero su healthcheck y solo entonces retiro el anterior. Con un reverse proxy delante, el tráfico se mueve cuando el nuevo está sano. Si el healthcheck falla, el proxy sigue apuntando a la versión anterior.</p>
<p>No es magia de orquestación: es un procedimiento pequeño y comprobable. En un VPS con Compose, un script de despliegue con healthcheck cubre la mayoría de los casos.</p>
<h2>Cuándo no usar Docker</h2>
<p>Para un script de una sola ejecución o una función serverless pequeña, un contenedor puede ser más infraestructura de la necesaria. Docker brilla cuando hay varios servicios, dependencias del sistema o una diferencia real entre local y producción.</p>
<h2>Checklist de producción</h2>
<ul>
<li>Imagen con versión fija, no <code>latest</code>.</li>
<li>Usuario no root y <code>.dockerignore</code>.</li>
<li>Datos en volúmenes y secretos fuera de la imagen.</li>
<li>Healthcheck y política de reinicio.</li>
<li>Puertos publicados solo los necesarios.</li>
<li>Límites de memoria y CPU definidos.</li>
<li>Logs accesibles y rotación configurada.</li>
<li>Escaneo de vulnerabilidades en CI.</li>
<li>Backup de la base de datos probado.</li>
<li>Proceso de rollback documentado.</li>
</ul>
<h2>Preguntas frecuentes</h2>
<h3>¿Docker es una máquina virtual?</h3>
<p>No. Un contenedor comparte el kernel del host y aísla el proceso; una máquina virtual emula un sistema completo. Por eso los contenedores arrancan más rápido y pesan menos, aunque el aislamiento es distinto.</p>
<h3>¿Puedo usar Docker en producción?</h3>
<p>Sí, con healthchecks, reinicios, límites de recursos y una estrategia de despliegue. Para proyectos pequeños, una plataforma gestionada puede ser más simple que administrar el orquestador.</p>
<h3>¿Cómo persisto los datos?</h3>
<p>Con volúmenes. Los datos escritos en la capa del contenedor se pierden al recrearlo. Declara el volumen en Compose y prueba la restauración de un backup.</p>
<h3>¿Cómo reduzco el tamaño de la imagen?</h3>
<p>Usa Alpine, multi-stage builds, <code>.dockerignore</code> y solo dependencias de producción en la etapa final. Revisa el tamaño por capas antes de optimizar a ciegas.</p>
<h2>Para seguir</h2>
<p>La referencia oficial está en la documentación de <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> y <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a>. El caso de Convenios, con PostgreSQL, n8n y una API NestJS en contenedores, está en <a href="https://github.com/c26200/convenios-dashboard" target="_blank" rel="noopener noreferrer">este caso de estudio</a>. Si quieres una segunda opinión sobre tu infraestructura, <a href="/#contacto">hablemos</a>. También puedes leer cómo llevo un modelo de IA al servicio en <a href="/blog/series-temporales-producto">De las series temporales al producto</a>.</p>
`,
    },
    en: {
      title: 'Docker for Developers — The Essentials',
      excerpt:
        'A practical Docker guide for development and deployment: images, Dockerfile, Compose, data, networking, security, CI and common mistakes.',
      html: `<p class="blog-summary">Docker does not remove bugs, but it removes an entire class of differences between environments. This guide covers what I use every day: images and containers, Dockerfile, Compose, data, networking, security and operations, plus the mistakes that cost the most.</p>
<h2>What Docker is and what problem it solves</h2>
<p>Docker packages an application with its dependencies into an image that runs the same locally, in CI and on the server. It solves the classic &quot;it works on my machine&quot; problem without forcing you to maintain a virtual machine per service.</p>
<table>
<thead><tr><th>Aspect</th><th>Container</th><th>Virtual machine</th></tr></thead>
<tbody>
<tr><td>Startup</td><td>Seconds</td><td>Minutes</td></tr>
<tr><td>Isolation</td><td>Process</td><td>Full system</td></tr>
<tr><td>Size</td><td>Megabytes</td><td>Gigabytes</td></tr>
<tr><td>Kernel</td><td>Shared with the host</td><td>Its own</td></tr>
<tr><td>Typical use</td><td>Services, CI, development</td><td>Strong isolation or another OS</td></tr>
</tbody>
</table>
<h2>Image, container, volume and network</h2>
<p>An image is the immutable package: base system, dependencies and code. A container is a running instance. If the image is the recipe, the container is the dish. A volume is storage that survives the container, and a network lets services find each other by name without exposing unnecessary ports.</p>
<p>That distinction explains why rebuilding an image changes the container and why data written inside a container disappears when it is recreated unless it lives in a volume.</p>
<h2>First commands</h2>
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
<h2>Dockerfile: layers, multi-stage and .dockerignore</h2>
<p>A Dockerfile builds in layers. Order matters: copying <code>package.json</code> and the lockfile first lets Docker reuse the dependency layer when only the code changes. Copying everything before <code>npm ci</code> invalidates the cache on every commit.</p>
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
<p>Multi-stage separates build from runtime, leaves a smaller final image and keeps build dependencies out of production. A <code>.dockerignore</code> with <code>node_modules</code>, <code>.git</code> and local files speeds up the build and shrinks the context.</p>
<h2>Docker Compose: multiple services without pain</h2>
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
<p>With a single <code>docker compose up -d</code> I deploy PostgreSQL, Redis, n8n, a NestJS API and a React dashboard. A <code>docker compose down</code> stops the services, but the <code>pgdata</code> volume keeps the data.</p>
<h2>Data and secrets</h2>
<p>Persistent data belongs in volumes; secrets belong in environment variables or a secret manager. Never in the image or the repository. A <code>.env</code> file is fine for development but must be in <code>.gitignore</code>. If the PostgreSQL container has no volume, a <code>docker compose down</code> can wipe the database.</p>
<h2>Networking and reverse proxy</h2>
<p>In Compose, services find each other by name: the API connects to <code>db:5432</code>, not <code>localhost</code>. That internal network keeps the database off the public internet; only the service that needs a public port publishes one. In production, a reverse proxy or the platform terminates TLS and forwards to the container; the container should not care whether it sits behind Nginx, Caddy or a tunnel.</p>
<h2>Build cache and CI/CD</h2>
<p>In CI I build the image once, tag it with the commit SHA and promote it across environments. That way what gets tested is exactly what gets deployed. Layer cache speeds up builds only if the Dockerfile order respects it. For heavy dependencies, a BuildKit cache or an intermediate registry avoids rebuilding everything on each pipeline.</p>
<h2>Basic security</h2>
<p>Do not run containers as root, do not publish the database and keep base images updated. A Trivy scan in CI catches known vulnerabilities before they reach production. Secrets do not belong in the Dockerfile: if you must pass them at build time, use BuildKit secrets instead of <code>ARG</code>, because arguments stay in the image history.</p>
<h2>Operations and troubleshooting</h2>
<p>In production I watch logs, use healthchecks and set a restart policy. Compose lets me declare <code>restart: unless-stopped</code> and a <code>healthcheck</code> that hits an endpoint. If the container crashes, it restarts; if it stops responding, it is marked unhealthy. <code>docker stats</code> shows CPU and memory, <code>docker system df</code> reveals space usage and <code>docker system prune</code> cleans up unused resources.</p>
<h2>Common errors and how to diagnose them</h2>
<table>
<thead><tr><th>Symptom</th><th>Likely cause</th><th>Action</th></tr></thead>
<tbody>
<tr><td>Port already in use</td><td>Another process owns the port</td><td>Change the mapping or stop the process</td></tr>
<tr><td>Container restarts</td><td>The process or healthcheck fails</td><td>Check <code>docker logs</code> and the command</td></tr>
<tr><td>Data does not persist</td><td>Missing volume</td><td>Declare the volume in Compose</td></tr>
<tr><td>Permission denied</td><td>UID differs from the host</td><td>Adjust the user or permissions</td></tr>
<tr><td>Huge image</td><td>Build dependencies and layers</td><td>Multi-stage, Alpine and .dockerignore</td></tr>
<tr><td>Wrong architecture</td><td>ARM image on an x86 server</td><td>Build with <code>--platform</code></td></tr>
</tbody>
</table>
<h2>Docker in development</h2>
<p>Locally I use bind mounts to mount the code inside the container and benefit from hot reload. The container keeps the dependencies while the editor keeps working on the host. For one-off tasks, <code>docker compose run --rm</code> runs a command without leaving dangling containers.</p>
<p>I do not rebuild the image on every code change; only when dependencies or the Dockerfile change. That separation saves time and avoids unnecessary builds.</p>
<h2>Compose, Swarm or Kubernetes</h2>
<p>Compose is enough for a VPS with a few services on a single host. If you need high availability, autoscaling or multiple nodes, the next step is an orchestrator. Kubernetes solves that, but adds operational complexity; I would not adopt it just because it sounds more professional.</p>
<p>For many projects, a VPS with Compose, healthchecks and well-tested backups is more reliable than a poorly managed cluster.</p>
<h2>Registries and images</h2>
<p>I tag every image with the commit SHA and publish it to a registry. The server pulls that exact tag, not <code>latest</code>. That lets me return to a previous version without guessing what the image contained.</p>
<h2>Resource limits and logs</h2>
<p>In Compose I set memory and CPU limits so one service cannot consume the whole host. I also configure the log driver with rotation; without a limit, a noisy container can fill the disk. They are small settings that prevent large incidents.</p>
<h2>Docker, Podman and other alternatives</h2>
<p>Podman is a daemonless alternative with rootless support; for most workflows, the commands are compatible with Docker. Docker remains the standard and has the largest ecosystem. The choice depends on the environment and security policies, not on personal preference.</p>
<p>Lighter runtimes exist for embedded cases, but they do not replace Docker when you need portable images, Compose and a registry. Before switching tools, measure the specific problem you are solving.</p>
<h2>Zero-downtime deployment</h2>
<p>To update a service without dropping connections, I start the new container, wait for its healthcheck and only then remove the old one. With a reverse proxy in front, traffic moves when the new container is healthy. If the healthcheck fails, the proxy keeps pointing to the previous version.</p>
<p>It is not orchestration magic: it is a small, testable procedure. On a VPS with Compose, a deployment script with a healthcheck covers most cases.</p>
<h2>When not to use Docker</h2>
<p>For a one-off script or a small serverless function, a container can be more infrastructure than you need. Docker shines when there are several services, system dependencies or a real difference between local and production.</p>
<h2>Production checklist</h2>
<ul>
<li>Image pinned to a version, not <code>latest</code>.</li>
<li>Non-root user and <code>.dockerignore</code>.</li>
<li>Data in volumes and secrets outside the image.</li>
<li>Healthcheck and restart policy.</li>
<li>Only the necessary ports published.</li>
<li>Memory and CPU limits defined.</li>
<li>Accessible logs and rotation configured.</li>
<li>Vulnerability scan in CI.</li>
<li>Tested database backup.</li>
<li>Documented rollback process.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>Is Docker a virtual machine?</h3>
<p>No. A container shares the host kernel and isolates the process; a virtual machine emulates a full system. Containers start faster and weigh less, although the isolation model is different.</p>
<h3>Can I use Docker in production?</h3>
<p>Yes, with healthchecks, restarts, resource limits and a deployment strategy. For small projects, a managed platform can be simpler than running an orchestrator.</p>
<h3>How do I persist data?</h3>
<p>With volumes. Data written to the container layer is lost when it is recreated. Declare the volume in Compose and test restoring a backup.</p>
<h3>How do I reduce image size?</h3>
<p>Use Alpine, multi-stage builds, <code>.dockerignore</code> and production-only dependencies in the final stage. Inspect size by layer before optimizing blindly.</p>
<h2>Further reading</h2>
<p>The official reference is the <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> and <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">Docker Compose</a> documentation. The Convenios case study, with PostgreSQL, n8n and a NestJS API in containers, is <a href="https://github.com/c26200/convenios-dashboard" target="_blank" rel="noopener noreferrer">here</a>. If you want a second opinion on your infrastructure, <a href="/en#contacto">let's talk</a>. You can also read how I take an AI model to a service in <a href="/en/blog/series-temporales-producto">From Time Series to Product</a>.</p>
`,
    },
  },
];

export function getPostContent(post: BlogPost, language: string): BlogContent {
  return language.startsWith('en') ? post.en : post.es;
}

function slugifyHeading(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Adds stable ids to every H2 and returns a table of contents. */
export function buildToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const withIds = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();
    const base = slugifyHeading(text) || 'section';
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { html: withIds, toc };
}

function decodeEntities(text: string) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function toPlainText(html: string) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Extracts the visible FAQ section so JSON-LD matches the page content. */
export function extractFaq(html: string): FaqItem[] {
  const heading = html.match(
    /<h2>([^<]*(?:Preguntas frecuentes|Frequently asked questions)[^<]*)<\/h2>/,
  );
  if (!heading || heading.index === undefined) return [];

  const after = html.slice(heading.index + heading[0].length);
  const nextHeading = after.indexOf('<h2>');
  const block = nextHeading === -1 ? after : after.slice(0, nextHeading);

  return [...block.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)]
    .map((match) => ({
      question: toPlainText(match[1]),
      answer: toPlainText(match[2]),
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

export function formatPostDate(date: string, language: string) {
  return new Intl.DateTimeFormat(language.startsWith('en') ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
