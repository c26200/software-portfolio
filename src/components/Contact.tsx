import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contacto" className="contact">
      <div className="sec-top">
        <span>05 — {t('nav.contact')}</span>
      </div>
      <h2>
        {t('kinetic.contactTitleA')}
        <br />
        <em>{t('kinetic.contactTitleEm')}</em>
      </h2>
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
