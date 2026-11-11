import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function Footer() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);

  return (
    <footer className="footer">
      <span>{t('site.footer')}</span>
      <nav className="footer-links">
        <Link to={localizePath('/sobre', language)}>{t('site.about')}</Link>
        <Link to={localizePath('/blog', language)}>{t('nav.blog')}</Link>
      </nav>
    </footer>
  );
}
