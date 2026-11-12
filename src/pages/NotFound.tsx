import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function NotFound() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = pathLanguage(pathname);

  return (
    <section className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-text">{t('notFound.text')}</p>
      <Link to={localizePath('/', language)} className="not-found-link">
        {t('notFound.back')}
      </Link>
    </section>
  );
}
