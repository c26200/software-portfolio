import { useTranslation } from '../i18n';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contacto" className="contact">
      <div className="sec-top">
        <span>06 — {t('nav.contact')}</span>
      </div>
      <div className="contact-top">
        <h2>
          {t('kinetic.contactTitleA')}
          <br />
          <em>{t('kinetic.contactTitleEm')}</em>
        </h2>
        <figure className="contact-portrait">
          <img
            src="/img/carlos-gordillo-cut.webp"
            srcSet="/img/carlos-gordillo-cut-400.webp 400w, /img/carlos-gordillo-cut.webp 800w"
            sizes="(max-width: 760px) 200px, 320px"
            alt={t('portrait.alt')}
            width={800}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{t('portrait.captionShort')}</figcaption>
        </figure>
      </div>
      <div className="contact-row">
        <a className="mail" href={`mailto:${t('contact.email')}`}>
          {t('contact.email')}
        </a>
        <div className="socials">
          <a href="https://www.linkedin.com/in/cmgordillo26/" target="_blank" rel="noopener noreferrer">
            {t('contact.links.linkedin')} ↗
          </a>
          <a href="https://github.com/c26200" target="_blank" rel="noopener noreferrer">
            {t('contact.links.github')} ↗
          </a>
          <a href="tel:+573114900238">{t('contact.links.phone')}</a>
        </div>
      </div>
    </section>
  );
}
