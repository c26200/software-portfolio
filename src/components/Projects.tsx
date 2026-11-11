import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showcaseProjects, type ShowcaseProject } from '../content/projects';
import Reveal from './Reveal';
import ProjectPreviewModal from './ProjectPreviewModal';

interface ProjectCopy {
  title: string;
  category: string;
}

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
        {showcaseProjects.map((project) => {
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
