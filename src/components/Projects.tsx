import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showcaseProjects, type ShowcaseProject } from '../content/projects';
import Reveal from './Reveal';
import ProjectPreviewModal from './ProjectPreviewModal';

interface ProjectCopy {
  title: string;
  category: string;
}

interface OtherProject {
  category: string;
  title: string;
  link?: string;
}

const SPEED = 45; // px per second

export default function Projects() {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [preview, setPreview] = useState<ShowcaseProject | null>(null);
  const pausedRef = useRef(false);
  pausedRef.current = paused;
  const others = t('projects.items', { returnObjects: true }) as OtherProject[];

  // Drag to scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let pointerId = -1;

    const onDown = (event: PointerEvent) => {
      // En táctil manda el scroll nativo del navegador
      if (event.pointerType !== 'mouse') return;
      down = true;
      moved = false;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
      pointerId = event.pointerId;
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const dx = event.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 6) return;
        moved = true;
        rail.classList.add('drag');
        rail.setPointerCapture(pointerId);
      }
      rail.scrollLeft = startLeft - dx * 1.4;
    };
    const onEnd = () => {
      if (pointerId >= 0 && rail.hasPointerCapture(pointerId)) {
        rail.releasePointerCapture(pointerId);
      }
      down = false;
      moved = false;
      pointerId = -1;
      rail.classList.remove('drag');
    };

    rail.addEventListener('pointerdown', onDown);
    rail.addEventListener('pointermove', onMove);
    rail.addEventListener('pointerup', onEnd);
    rail.addEventListener('pointercancel', onEnd);

    return () => {
      rail.removeEventListener('pointerdown', onDown);
      rail.removeEventListener('pointermove', onMove);
      rail.removeEventListener('pointerup', onEnd);
      rail.removeEventListener('pointercancel', onEnd);
    };
  }, []);

  // Continuous, seamless loop. The list is duplicated so wrapping is invisible.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(rail.querySelectorAll<HTMLElement>('.card'));
    const setSize = showcaseProjects.length;
    if (cards.length < setSize * 2) return;

    const loopWidth = cards[setSize].offsetLeft - cards[0].offsetLeft;
    if (loopWidth <= 0) return;

    let visible = false;
    let hovering = false;
    let focused = false;
    let dragging = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    let last = performance.now();
    let position = rail.scrollLeft;

    const isPaused = () =>
      pausedRef.current || hovering || focused || dragging || !visible || document.hidden;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    observer.observe(rail);

    const loop = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;

      if (!isPaused()) {
        position += (SPEED * delta) / 1000;
        while (position >= loopWidth) position -= loopWidth;
        rail.scrollLeft = position;
      } else {
        position = rail.scrollLeft;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // En táctil el puntero es transitorio: pointerleave nunca llega y el relevo
    // se quedaría pausado para siempre. Solo el ratón implica hover real.
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') hovering = true;
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') hovering = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    const onPointerDown = () => {
      dragging = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const onPointerUp = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        dragging = false;
      }, 2200);
    };

    rail.addEventListener('pointerenter', onEnter);
    rail.addEventListener('pointerleave', onLeave);
    rail.addEventListener('focusin', onFocusIn);
    rail.addEventListener('focusout', onFocusOut);
    rail.addEventListener('pointerdown', onPointerDown);
    rail.addEventListener('pointerup', onPointerUp);
    rail.addEventListener('pointercancel', onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer) clearTimeout(resumeTimer);
      observer.disconnect();
      rail.removeEventListener('pointerenter', onEnter);
      rail.removeEventListener('pointerleave', onLeave);
      rail.removeEventListener('focusin', onFocusIn);
      rail.removeEventListener('focusout', onFocusOut);
      rail.removeEventListener('pointerdown', onPointerDown);
      rail.removeEventListener('pointerup', onPointerUp);
      rail.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  const railProjects = [...showcaseProjects, ...showcaseProjects];

  return (
    <section id="proyectos">
      <div className="sec-top">
        <span>04 — {t('nav.projects')}</span>
        <h2>
          {t('kinetic.projectsTitleA')} <em>{t('kinetic.projectsTitleEm')}</em>
        </h2>
      </div>

      <div className="rail-head">
        <Reveal>
          <p className="big-line" style={{ maxWidth: '20ch' }}>
            {t('kinetic.projectsLead')}
          </p>
        </Reveal>
        <span className="rail-hint hint-pointer">{t('kinetic.dragHint')} →</span>
        <span className="rail-hint hint-touch">{t('kinetic.swipeHint')} →</span>
      </div>

      <div className="rail" ref={railRef}>
        {railProjects.map((project, index) => {
          const copy = t(`projects.folder.${project.slug}`, { returnObjects: true }) as ProjectCopy;
          const clone = index >= showcaseProjects.length;
          return (
            <a
              className="card"
              key={`${project.slug}-${index}`}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={clone ? -1 : undefined}
              aria-hidden={clone || undefined}
              aria-haspopup="dialog"
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onClick={(event) => {
                // El clic abre la ficha en el sitio; el enlace queda como respaldo
                if (event.metaKey || event.ctrlKey || event.shiftKey || index >= showcaseProjects.length) return;
                event.preventDefault();
                setPreview(project);
              }}
            >
              <span className="go" aria-hidden="true">
                →
              </span>
              <div className="shot">
                <img
                  src={project.image}
                  alt=""
                  width={1440}
                  height={900}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="meta">
                <h3>{copy.title}</h3>
                <span className="cat">{copy.category}</span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="rail-foot">
        <div className="rail-line" />
        <span className="rail-hint">01 — 04</span>
        <button
          type="button"
          className="rail-toggle"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? t('kinetic.playLabel') : t('kinetic.pauseLabel')}
        </button>
      </div>

      <Reveal className="others">
        <span className="others-label">{t('kinetic.others')}</span>
        <ul>
          {others.map((project) => (
            <li key={project.title}>
              <span>
                <b>{project.title}</b> — {project.category}
              </span>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('kinetic.repoOf')} ${project.title}`}
                >
                  GitHub ↗
                </a>
              ) : (
                <span className="rail-hint">—</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>

      {preview && <ProjectPreviewModal project={preview} onClose={() => setPreview(null)} />}
    </section>
  );
}
