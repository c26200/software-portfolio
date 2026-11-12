import { useState, type CSSProperties } from 'react';
import { useTranslation } from '../i18n';
import { showcaseProjects, type ShowcaseProject } from '../content/projects';
import ProjectPreviewModal from './ProjectPreviewModal';

export default function ProjectFolder() {
  const { t } = useTranslation();
  const [active, setActive] = useState<ShowcaseProject | null>(null);

  return (
    <div className="project-folder">
      <div className="folder-board">
        <div className="folder-stage">
          <div className="folder-back" aria-hidden="true">
            <span className="folder-tab">{t('projects.folderLabel')}</span>
          </div>

          <div className="folder-cards">
            {showcaseProjects.map((project, index) => {
              const title = (t(`projects.folder.${project.slug}.title`) as string) ?? project.slug;
              const style = {
                '--index': index,
                zIndex: index + 1,
              } as CSSProperties;

              return (
                <button
                  key={project.slug}
                  className="folder-card"
                  style={style}
                  onClick={() => setActive(project)}
                  aria-label={`${t('projects.open')}: ${title}`}
                  aria-haspopup="dialog"
                >
                  <img src={project.image} alt="" loading="lazy" />
                </button>
              );
            })}
          </div>

          <div className="folder-front" aria-hidden="true" />
        </div>

        <p className="folder-caption">
          <span className="hint-hover">{t('projects.hintHover')}</span>
          <span className="hint-touch">{t('projects.hintTouch')}</span>
        </p>
      </div>

      {active && <ProjectPreviewModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}
