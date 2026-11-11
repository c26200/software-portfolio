import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showcaseProjects, type ShowcaseProject } from '../content/projects';
import Reveal from './Reveal';
import ProjectPreviewModal from './ProjectPreviewModal';

interface ProjectCopy {
  title: string;
  category: string;
}

const SPEED = 45; // px per second

export default function Projects() {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<ShowcaseProject | null>(null);
  const draggedRef = useRef(false);

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
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      down = true;
      moved = false;
      draggedRef.current = false;
      startX = event.clientX;
      startLeft = rail.scrollLeft;
      pointerId = event.pointerId;
    };

    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const dx = event.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 5) return;
        moved = true;
        draggedRef.current = true;
        rail.classList.add('drag');
      }
      event.preventDefault();
      rail.scrollLeft = startLeft - dx;
    };

    const onEnd = () => {
      if (pointerId >= 0) {
        try {
          if (rail.hasPointerCapture(pointerId)) rail.releasePointerCapture(pointerId);
        } catch {
          /* la captura puede no existir si el evento fue sintético */
        }
      }
      down = false;
      moved = false;
      pointerId = -1;
      rail.classList.remove('drag');
    };

    rail.addEventListener('pointerdown', onDown);
    // Escuchar en window permite arrastrar fuera del carril sin perder el gesto
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd);
    window.addEventListener('pointercancel', onEnd);

    return () => {
      rail.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onEnd);
      window.removeEventListener('pointercancel', onEnd);
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

    const isPaused = () => hovering || focused || dragging || !visible || document.hidden;

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
                // Un arrastre no debe abrir la ficha
                if (draggedRef.current) {
                  event.preventDefault();
                  draggedRef.current = false;
                  return;
                }
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
        <span className="rail-hint">01 — {String(showcaseProjects.length).padStart(2, '0')}</span>
      </div>


      {preview && <ProjectPreviewModal project={preview} onClose={() => setPreview(null)} />}
    </section>
  );
}
