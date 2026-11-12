# Carlos Gordillo — Portfolio

Personal portfolio for Carlos Gordillo, a full stack and AI developer. Profile, experience,
projects with real screenshots, an animated CI/CD pipeline and a bilingual blog.

**[Live site](https://carlosgordillo.com)**

![Portfolio preview](./preview.png)

## What it does

- Bilingual Spanish/English site with separate URLs (`/` and `/en`), `hreflang` alternates
  and prerendered HTML for both
- Light and dark themes, switchable from the header and persisted per visitor
- Draggable project rail with screenshots of six deployed apps, linked to their repositories
  and to a full case study for each one
- Latest articles section on the home page, with links to the full blog
- Animated CI/CD pipeline demo with eight stages, pause on scroll and reduced-motion support
- Blog with bilingual pillar guides, table of contents, FAQ schema and related posts, plus a
  translated 404 page
- Responsive layout with a full-screen mobile menu

## Stack

React 19 · TypeScript · Vite 7 · react-router-dom 7 · CSS variables

The UI is bilingual through a small in-house i18n module (`src/i18n.ts`); there is no i18n
runtime dependency. Article bodies load only on blog routes, and the app shell imports
lightweight content indexes (`blog-index.ts`, `case-studies-index.ts`) instead of full text.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # generates dist/
npm run indexes   # regenerates the content indexes after editing content
npm run preview
```

## Structure

```
public/               favicon, OG images, project screenshots, robots.txt, 404.html
scripts/              prerender.mjs — renders each route and the sitemap at build
                      build-indexes.mjs — generates the lightweight content indexes
src/
├── components/       Hero, KineticCanvas, Marquee, About, Stat, Experience,
│                     Pipeline, Projects, LatestPosts, Contact, Header,
│                     LanguageSwitch, ThemeToggle, MobileMenu, Footer, Reveal
├── pages/            Home, Blog, BlogPost, CaseStudy, Sobre, NotFound
├── locales/          es.json, en.json — all editable copy
├── content/          blog.ts, blog-extra.ts, caseStudies.ts (full text),
│                     blog-index.ts, case-studies-index.ts (generated metadata)
├── seo.ts            per-route metadata and JSON-LD
├── page-loaders.ts   one lazy chunk per route for the client
├── i18n.ts           minimal translation store and useTranslation hook
├── entry-server.tsx  SSR entry used only by the prerenderer
└── styles/           kinetic.css (visual system) and pipeline.css
```

## Deployment

`npm run build` creates the client bundle, renders the 30 Spanish and English routes to their
own `index.html`, injects the route metadata into each file and generates `sitemap.xml` with
both language versions and their alternates. The build fails if the generated content indexes
drift from the full text, so `npm run indexes` is the only manual step after editing content. Crawlers and social
previews receive the full page without running JavaScript; unknown paths return a real 404
through `public/404.html`.

On Vercel the default Vite preset works: build `npm run build`, output `dist`. No rewrites
are needed because every route is a static file.

## Languages

Spanish lives at `/`, `/blog` and `/blog/:slug`; English lives at `/en`, `/en/blog` and
`/en/blog/:slug`. Every page declares `hreflang` alternates and a canonical URL, and the
language switch uses real links, so both versions are crawlable and indexable independently.

## Notes

All content lives in `src/locales` and `src/content`; there is no API, database or
authentication behind the site. The pipeline section is an illustrative animation, not a
live CI/CD feed, and the project screenshots are local captures of the deployed apps.
