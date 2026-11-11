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
          <p className="kicker">
            <i aria-hidden="true" />
            {t('kinetic.kicker')}
          </p>
          <h1>
            <span className="hero-name">
              Carlos
              <br />
              <em>Gordillo</em>
            </span>
            <span className="hero-h1-role">{t('kinetic.h1Role')}</span>
          </h1>
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
