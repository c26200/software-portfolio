import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizePath, pathLanguage } from '../i18n-paths';

interface Fact {
  label: string;
  value: string;
}

interface WorkItem {
  title: string;
  text: string;
}

interface Row {
  year?: string;
  title: string;
  org: string;
  note: string;
}

export default function Sobre() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);

  const facts = t('sobre.facts', { returnObjects: true }) as Fact[];
  const bio = t('sobre.bio', { returnObjects: true }) as string[];
  const work = t('sobre.work', { returnObjects: true }) as WorkItem[];
  const education = t('sobre.education', { returnObjects: true }) as Row[];
  const awards = t('sobre.awards', { returnObjects: true }) as Row[];

  return (
    <article className="sobre">
      <header className="sobre-head">
        <p className="kicker">
          <i aria-hidden="true" />
          {t('sobre.kicker')}
        </p>
        <h1 className="sobre-title">
          {t('sobre.titleA')} <em>{t('sobre.titleEm')}</em>
        </h1>
        <p className="sobre-lead">{t('sobre.lead')}</p>
      </header>

      <div className="sobre-top">
        <figure className="sobre-photo">
          <img
            src="/img/carlos-gordillo-cut.webp"
            alt={t('sobre.photoAlt')}
            width={800}
            height={800}
            decoding="async"
          />
        </figure>

        <dl className="sobre-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sobre-body">
        <h2>{t('sobre.bioTitle')}</h2>
        <div>
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="sobre-block">
        <h2>{t('sobre.workTitle')}</h2>
        <div className="sobre-cards">
          {work.map((item) => (
            <div className="sobre-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sobre-block">
        <h2>{t('sobre.educationTitle')}</h2>
        <div className="sobre-rows">
          {education.map((row) => (
            <div className="sobre-row" key={row.title}>
              <span className="yr">{row.year}</span>
              <div>
                <h3>
                  {row.title}
                  <small>{row.org}</small>
                </h3>
                <p>{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sobre-block">
        <h2>{t('sobre.awardsTitle')}</h2>
        <div className="sobre-rows">
          {awards.map((row) => (
            <div className="sobre-row" key={row.title}>
              <span className="yr">{row.year ?? t('sobre.awardLabel')}</span>
              <div>
                <h3>
                  {row.title}
                  <small>{row.org}</small>
                </h3>
                <p>{row.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sobre-cta">
        <h2>{t('sobre.ctaTitle')}</h2>
        <div className="sobre-cta-links">
          <a className="btn solid" href={`mailto:${t('contact.email')}`}>
            {t('sobre.ctaButton')}
          </a>
          <Link className="btn" to={localizePath('/', language)}>
            {t('sobre.ctaContact')}
          </Link>
        </div>
      </div>

      <Link to={localizePath('/', language)} className="sobre-back">
        {t('sobre.backHome')}
      </Link>
    </article>
  );
}
