import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { showcaseProjects, projectImageSrcSet, type ShowcaseProject } from '../content/projects';
import Reveal from './Reveal';
import ProjectPreviewModal from './ProjectPreviewModal';

interface ProjectCopy {
  title: string;
  category: string;
}

const SPEED = 45; // px per second
const INITIAL_ORDER = showcaseProjects.map((_, index) => index);

export default function Projects() {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<ShowcaseProject | null>(null);
  const [order, setOrder] = useState<number[]>(INITIAL_ORDER);
  const orderRef = useRef<number[]>(INITIAL_ORDER);
  const positionRef = useRef(0);
  const stepRef = useRef(0);
  const draggedRef = useRef(false);
  const previewOpenRef = useRef(false);

  useEffect(() => {
    previewOpenRef.current = preview !== null;
  }, [preview]);

  // Bucle infinito reciclando las mismas tarjetas: al salir una por la izquierda
  // se reordena al final de la pista, así nunca hay copias duplicadas.
  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const apply = () => {
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
    };

    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      const step = first && second ? second.offsetLeft - first.offsetLeft : 0;
      if (step > 0) stepRef.current = step;
    };

    const rotateOrder = (direction: 1 | -1) => {
      const current = orderRef.current;
      const next =
        direction === 1
          ? [...current.slice(1), current[0]]
          : [current[current.length - 1], ...current.slice(0, -1)];
      orderRef.current = next;
      setOrder(next);
    };

    const normalize = () => {
      const step = stepRef.current;
      if (step <= 0) return;
      while (positionRef.current >= step) {
        positionRef.current -= step;
        rotateOrder(1);
      }
      while (positionRef.current < 0) {
        positionRef.current += step;
        rotateOrder(-1);
      }
      apply();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let hovering = false;
    let focused = false;
    let down = false;
    let moved = false;
    let visible = false;
    let startX = 0;
    let lastX = 0;
    let resumeAt = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      down = true;
      moved = false;
      draggedRef.current = false;
      startX = event.clientX;
      lastX = event.clientX;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!down) return;
      if (!moved) {
        if (Math.abs(event.clientX - startX) < 5) return;
        moved = true;
        draggedRef.current = true;
        rail.classList.add('drag');
      }
      // Mover de forma incremental conserva el ajuste del reciclado
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      if (event.cancelable) event.preventDefault();
      positionRef.current -= dx;
      normalize();
    };

    const onPointerUp = () => {
      if (!down) return;
      down = false;
      moved = false;
      // Deja la pista quieta un momento tras el gesto para poder tocar una tarjeta
      resumeAt = performance.now() + 2200;
      rail.classList.remove('drag');
    };

    // Trackpads y ruedas horizontales siguen moviendo la pista
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      positionRef.current += event.deltaX;
      normalize();
    };

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    observer.observe(rail);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;

      if (
        !reduced &&
        visible &&
        !hovering &&
        !focused &&
        !down &&
        !document.hidden &&
        !previewOpenRef.current &&
        now >= resumeAt
      ) {
        positionRef.current += (SPEED * delta) / 1000;
        normalize();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    rail.addEventListener('pointerdown', onPointerDown);
    // Escuchar en window permite arrastrar fuera del carril sin perder el gesto
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    rail.addEventListener('wheel', onWheel, { passive: false });
    rail.addEventListener('pointerenter', onEnter);
    rail.addEventListener('pointerleave', onLeave);
    rail.addEventListener('focusin', onFocusIn);
    rail.addEventListener('focusout', onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      rail.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      rail.removeEventListener('wheel', onWheel);
      rail.removeEventListener('pointerenter', onEnter);
      rail.removeEventListener('pointerleave', onLeave);
      rail.removeEventListener('focusin', onFocusIn);
      rail.removeEventListener('focusout', onFocusOut);
    };
  }, []);

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
        <div className="rail-track" ref={trackRef}>
          {order.map((projectIndex) => {
            const project = showcaseProjects[projectIndex];
            const copy = t(`projects.folder.${project.slug}`, { returnObjects: true }) as ProjectCopy;
            return (
              <a
                className="card"
                key={project.slug}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
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
                  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
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
                    srcSet={projectImageSrcSet(project.image)}
                    sizes="(max-width: 720px) 72vw, 520px"
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
      </div>

      <div className="rail-foot">
        <div className="rail-line" />
        <span className="rail-hint">01 — {String(showcaseProjects.length).padStart(2, '0')}</span>
      </div>


      {preview && <ProjectPreviewModal project={preview} onClose={() => setPreview(null)} />}
    </section>
  );
}
