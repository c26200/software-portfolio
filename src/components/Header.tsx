import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { localizePath, pathLanguage } from '../i18n-paths';

export default function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const language = pathLanguage(pathname);
  const homePath = localizePath('/', language);
  const isHome = normalized === '/' || normalized === '/en';
  const href = (id: string) => (isHome ? `#${id}` : `${homePath}#${id}`);

  return (
    <>
      <header className={`bar ${scrolled ? 'scrolled' : ''}`}>
        <Link to={homePath} className="brand" aria-label="Carlos Gordillo">
          C.G.
        </Link>

        <nav>
          <a href={href('perfil')}>{t('nav.profile')}</a>
          <a href={href('experiencia')}>{t('nav.experience')}</a>
          <a href={href('pipeline')}>{t('nav.pipeline')}</a>
          <a href={href('proyectos')}>{t('nav.projects')}</a>
          <a href={href('contacto')}>{t('nav.contact')}</a>
          <Link to={localizePath('/blog', language)}>{t('nav.blog')}</Link>
        </nav>

        <div className="bar-right">
          <LanguageSwitch />
          <ThemeToggle />
          <a className="say" href={href('contacto')}>
            {t('kinetic.say')}
          </a>
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t('kinetic.menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
