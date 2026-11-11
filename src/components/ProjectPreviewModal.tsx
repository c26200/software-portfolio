import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import type { ShowcaseProject } from '../content/projects';

interface ProjectPreviewModalProps {
  project: ShowcaseProject;
  onClose: () => void;
}

interface ProjectCopy {
  title: string;
  category: string;
  description: string;
}

export default function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = t(`projects.folder.${project.slug}`, { returnObjects: true }) as ProjectCopy;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="preview-modal" onClick={onClose}>
      <div
        ref={panelRef}
        className="preview-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="preview-close" onClick={onClose} aria-label={t('projects.close')}>
          ✕
        </button>
        <div className="preview-media">
          <img src={project.image} alt={copy.title} />
        </div>
        <div className="preview-meta">
          <div>
            <p className="preview-cat">{copy.category}</p>
            <h3 className="preview-title" id="preview-title">
              {copy.title}
            </h3>
            <p className="preview-desc">{copy.description}</p>
            <ul className="preview-stack" aria-label={t('projects.stack')}>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
          <a className="preview-code" href={project.href} target="_blank" rel="noopener noreferrer">
            {t('projects.viewCode')} ↗
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
