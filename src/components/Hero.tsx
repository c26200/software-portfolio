import { useTranslation } from 'react-i18next';
import KineticCanvas from './KineticCanvas';
import Marquee from './Marquee';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="top">
      <KineticCanvas />

      <div className="hero-inner">
        <div>
          <h1>
            <span className="hero-name">
              Carlos{' '}
              <br />
              <em>Gordillo</em>
            </span>{' '}
            <span className="hero-role">{t('kinetic.h1Role')}</span>
          </h1>
          <p className="kicker hero-location">
            <i aria-hidden="true" />
            {t('kinetic.location')}
          </p>
        </div>

        <div className="hero-copy">
          <p>
            <b>{t('kinetic.heroLead')}</b> {t('kinetic.heroCopy')}
          </p>
          <div className="hero-links">
            <a className="btn solid" href="#proyectos">
              {t('kinetic.ctaProjects')}
            </a>
            <a className="btn" href="#contacto">
              {t('kinetic.ctaContact')} ↗
            </a>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
