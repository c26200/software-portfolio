# Auditoría del portafolio — mejoras propuestas

Base: sitio publicado (`codelegaldev.site`, build 2026-05-06) y reconstrucción local idéntica.
Ordenado por impacto real sobre lo que un portafolio debe conseguir: **que un reclutador o cliente
entienda el perfil en 30 segundos, confíe, y te contacte**.

---

## 1. Contenido y conversión (mayor impacto)

### 1.1 Los proyectos son la sección más débil — y la más importante

> **Actualizado:** implementado en esta iteración. La sección 05 ahora es una carpeta con las
> capturas reales de `cinetrack`, `dashboard-glass-ui`, `kanban-task-manager` y
> `saas-landing-page`, con modal de preview y enlace al repo. Los tres proyectos sin interfaz
> visual se muestran como índice. Queda pendiente añadir demos desplegadas (hoy solo hay repo).

En la sección 05 las tres tarjetas son **rectángulos vacíos con un patrón de rayas**. No hay
imagen, descripción, stack, métricas ni enlace (solo el primer proyecto enlaza a GitHub).
Además, tienes **6 repositorios públicos** y el portafolio solo muestra 3, uno enlazado:

- `trading-predictor` (ya enlazado)
- `convenios-dashboard` — el proyecto de mayor valor profesional, hoy **sin enlace**
- `cinetrack` — React 19 + Vite
- `kanban-task-manager` — dnd-kit
- `dashboard-glass-ui` — Recharts, glassmorphism
- `saas-landing-page` — Framer Motion

**Propuesta:** una tarjeta por proyecto con captura real o mockup, 1–2 líneas de problema →
solución, 2–3 métricas (ej. “+50.000 registros procesados”, “1.er puesto”), stack en tags y
enlaces “Demo” / “Código”. Los proyectos con demo visual (cinetrack, dashboard, kanban) deberían
destacar sobre los que solo tienen repo.

### 1.2 Falta un CV descargable
Es el primer botón que busca un reclutador. Tienes `CV_Carlos_Gordillo_Frontend_UI_Engineer.tex`
y PDFs listos. Añadir “Descargar CV (PDF)” en el hero y en contacto, actualizado en cada idioma.

### 1.3 Las métricas están enterradas en párrafos
“más de 50.000 registros”, “1.er puesto”, “6 proyectos desplegados”, “10.º semestre” están dentro
de bloques de texto justificado. **Propuesta:** una franja de 3–4 cifras bajo el hero
(p. ej. `50k+ registros ETL · 6 proyectos · 1.er puesto DL · 3 años`). Se escanea en 5 segundos.

### 1.4 El blog está fijado en español
Las tarjetas y los artículos están escritos en español y no cambian con el selector ES/EN
(título, extracto, cuerpo y fecha). Además la fecha se muestra como `2026-05-01` en crudo.
**Propuesta:** posts en `content/blog/{es,en}` con slug común, fechas formateadas por idioma
(`1 de mayo de 2026` / `May 1, 2026`), resaltado de sintaxis para los bloques `bash` y `yaml`
(hoy hay `<code class="language-bash">` sin ningún resaltador) y botón de copiar.

### 1.5 No hay pruebas sociales
Ni testimonios, ni recomendación de docente/empresa, ni logos de instituciones (SENA,
Universidad de Pamplona, Cloudflare/Docker no aplican como logos). Un bloque de 1–2 citas
cortas sube la confianza más que cualquier animación.

---

## 2. SEO y cómo se comparte el sitio

Verificado en producción:

- **El contenido no existe para un crawler sin JS.** Es un SPA que pinta todo en el cliente; el
  HTML solo trae `<div id="root">`. Google lo renderiza, pero LinkedIn/WhatsApp/X no.
- **No hay `og:image`.** Cualquier enlace compartido sale sin imagen.
- **No hay `canonical`, `hreflang` ni JSON-LD** (`Person`, `BlogPosting`).
- **`sitemap.xml` está roto:** devuelve `Content-Type: text/html` (el fallback del SPA), no un XML.
- **`<title>` y `<html lang>` no cambian al pasar a EN.** `site.title` existe en los diccionarios
  pero no se usa. Verificado: no hay `documentElement.lang` en el bundle.
- Las rutas del blog no tienen metadatos propios (título, descripción, imagen).

**Propuesta (en orden de coste/beneficio):**
1. `og:image` estática (1200×630) + `canonical` + `hreflang` + JSON-LD. Coste bajo.
2. Actualizar `title`/`description`/`lang` por idioma y por ruta con un hook.
3. Sitemap real generado en build (`vite-plugin-sitemap` o script propio).
4. Si buscas resultado serio: **prerender** (Astro, o `vite-plugin-prerender` para las 4 rutas).
   Con 4 páginas es casi gratis y resuelve crawlers, primer pintado y LCP a la vez.

---

## 3. Rendimiento

- **Cuatro familias tipográficas** desde Google Fonts (Crimson Pro, Lora, Source Serif 4,
  IBM Plex Mono), con ejes variables completos 200–900 e itálicas. Es la petición más costosa de
  la página y bloquea el render.
  **Propuesta:** quedarse con dos (una serif de titulares + IBM Plex Mono), autoalojarlas en
  `woff2` con subset latin, `preload` de la que use el H1 y `font-display: swap`.
- **La foto del hero pesa 303 KB (951×1600)** y se muestra a 260 px de ancho (≈9× sobredimensionada).
  Generar AVIF/WebP responsivos (`srcset`), ~40–60 KB, y `fetchpriority="high"`.
- **JS: 338 KB (108 KB gzip)**. Correcto, pero i18next + react-router suponen buena parte;
  con dos idiomas estáticos se puede sustituir i18next por un contexto propio de ~2 KB.
- **FOUC en modo oscuro:** el atributo `data-theme` se aplica en `useEffect`, así que quien tiene
  tema oscuro ve un destello blanco en cada carga. Se arregla con un script inline en `<head>`.
- No hay `loading="lazy"` en imágenes (hoy solo hay una, pero importará con las capturas de
  proyectos), ni precarga de rutas.

---

## 4. Accesibilidad (varios incumplimientos WCAG AA)

- **`prefers-reduced-motion` no se respeta** en ninguna animación (reveal, clip-path del nombre,
  cursor, hover). Verificado: 0 apariciones en el CSS.
- **El cursor nativo está desactivado** (`cursor: none` global) y se reemplaza por un punto con JS.
  Para usuarios de baja visión o que usan el cursor como referencia es peor que el original.
  **Propuesta:** mantenerlo como mejora opcional (solo puntero fino, y respetando reduced-motion),
  nunca como sustituto del cursor.
- **Tipografía por debajo del mínimo legible:** navegación 0.6 rem (9.6 px), edición 0.58 rem
  (9.3 px), tags 0.66 rem, descripción de experiencia 0.78 rem; en móvil hay textos de **0.5 rem
  (8 px)** y metadatos de 0.46 rem. Subir a 12–14 px mínimo.
- **Menú móvil:** el botón no expone `aria-expanded`, no hay cierre con `Escape`, ni trampa de
  foco, ni `role="dialog"`. El enlace “Blog” dentro del menú hace navegación completa.
- **Textos fijos en español:** página 404 (“Post no encontrado”, “La página que buscas…”),
  `aria-label="Menú"` y `aria-label="Ver repositorio de …"` aunque el sitio esté en inglés.
- **`<html lang>` nunca pasa a `en`.**
- No hay enlace “saltar al contenido”, ni estilos `:focus-visible` propios (el foco por teclado
  depende del navegador y sobre fondos con doble línea se pierde).
- Zonas táctiles pequeñas: botón de tema 30×30 px, botones ES/EN ≈22 px de alto (mínimo
  recomendado 44×44). En móvil de 400 px se reducen aún más.
- El cursor personalizado solo engancha listeners a los enlaces existentes al montar; los que
  aparecen tras navegar (blog) pierden el efecto. Debe usar delegación de eventos.

---

## 5. UX y diseño editorial

- **Hero:** el nombre domina, pero la propuesta de valor (subtítulo) es pequeña, gris e itálica,
  y hay ~170 px de aire entre el subtítulo y la sección 01. La foto a 260 px queda descolgada
  respecto a la retícula. Propuesta: foto algo mayor, subtítulo a 2–3 líneas con peso propio y
  una llamada a la acción (CV / email) antes del pliegue.
- **Ritmo vertical inconsistente:** paddings 72/56 px alternan con huecos generados por el grid;
  el salto entre secciones cambia de una a otra. Unificar escala (p. ej. 96/72/48).
- **Modo oscuro:** las bandas `--newsprint` de Experiencia/Habilidades generan cortes duros;
  en oscuro conviene separar por línea, no por bloque de color.
- **Proyectos:** ver 1.1.
- **Blog:** no se muestra nada del blog en la home; con 2 artículos, una tarjeta “Últimos
  artículos” al final ayuda a que se lean.
- **Contacto:** “¿Colaboramos?” solo ofrece email. Añadir disponibilidad (inmediata/reubicación
  ya está en el aside), tiempo de respuesta y LinkedIn como CTA secundario.
- **Navegación:** falta indicador de sección activa al hacer scroll (scroll-spy) y el ítem “Blog”
  rompe el patrón de anclas. Menor.

---

## 6. Calidad de código y mantenibilidad

- **CSS monolítico de ~1.400 líneas** recuperado del build: funciona, pero mezcla componentes,
  responsive y utilidades. Refactor recomendado en `tokens.css`, `base.css`, `layout.css`,
  `sections/*.css` (o CSS Modules).
- **Datos repetidos en tres sitios:** email y teléfono aparecen en `es.json`, `en.json` y
  codificados en `Contact.tsx`; LinkedIn/GitHub en `Contact.tsx`. Centralizar en `src/site.ts`.
- **Sin red de seguridad:** no hay ESLint, Prettier, tests, CI ni `README` (este repo ya lo
  incluye). Añadir `eslint` + `prettier` + un workflow que verifique `npm run build`.
- **Sin ErrorBoundary:** un fallo de render deja la página en blanco.
- **Sin división por rutas:** todo el JS en un chunk; `React.lazy` para Blog/BlogPost es trivial.
- **`dangerouslySetInnerHTML` para posts:** aceptable con contenido propio, pero no escala a un
  CMS; migrar a MDX o markdown con sanitización.
- **Lógica duplicada:** el hook `useTheme` se instancia dentro del botón; si otro componente
  necesita el tema no se comparte. Conviene un `ThemeProvider`.

---

## 7. Hoja de ruta sugerida

| Fase | Trabajo | Por qué |
| --- | --- | --- |
| **A — Quick wins (1 sesión)** | `og:image` + canonical + JSON-LD; sitemap real; título/`lang` por idioma; script anti-FOUC; `prefers-reduced-motion`; tamaños de texto mínimos; CV descargable | Máximo retorno con cambios acotados |
| **B — Contenido** | Rehacer Proyectos con 6 repos, capturas/mockups, métricas y enlaces; franja de cifras; testimonios; blog bilingüe con fechas formateadas y resaltado | Es lo que decide si te contactan |
| **C — Rendimiento/SEO** | Autoalojar 2 fuentes subset + preload; imagen del hero en AVIF/WebP con `srcset`; prerender de las 4 rutas | LCP, compartibilidad, indexación |
| **D — Refactor** | Separar CSS, `site.ts`, ThemeProvider, ErrorBoundary, lazy routes, ESLint/Prettier/CI | Velocidad para seguir mejorando |
| **E — Diseño (opcional)** | Ajuste de jerarquía del hero, ritmo vertical, modo oscuro sin bandas, scroll-spy | Pulido final |
