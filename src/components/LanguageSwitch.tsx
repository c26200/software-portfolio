import { Link, useLocation } from 'react-router-dom';
import { localizePath, pathLanguage, stripLocale } from '../i18n-paths';

export default function LanguageSwitch() {
  const { pathname } = useLocation();
  const current = pathLanguage(pathname);
  const logicalPath = stripLocale(pathname).replace(/\/+$/, '') || '/';

  return (
    <div className="lang-switch">
      <Link
        to={localizePath(logicalPath, 'es')}
        className={current === 'es' ? 'active' : ''}
        aria-current={current === 'es' ? 'page' : undefined}
      >
        ES
      </Link>
      <Link
        to={localizePath(logicalPath, 'en')}
        className={current === 'en' ? 'active' : ''}
        aria-current={current === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
