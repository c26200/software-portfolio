import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

interface ExperienceItem {
  year: string;
  org: string;
  role: string;
  desc: string;
}

export default function Experience() {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experiencia">
      <div className="sec-top">
        <span>02 — {t('nav.experience')}</span>
        <h2>
          {t('kinetic.experienceTitleA')} <em>{t('kinetic.experienceTitleEm')}</em>
        </h2>
      </div>

      <Reveal className="exp">
        {items.map((item) => (
          <article className="exp-row" key={item.org + item.year}>
            <span className="yr">{item.year}</span>
            <h3>
              {item.org}
              <small>{item.role}</small>
            </h3>
            <p>{item.desc}</p>
            <span className="mark" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
