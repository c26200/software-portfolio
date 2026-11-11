import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizePath, pathLanguage } from '../i18n-paths';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const language = pathLanguage(pathname);
  const homePath = localizePath('/', language);
  const isHome = normalized === '/' || normalized === '/en';
  const href = (id: string) => (isHome ? `#${id}` : `${homePath}#${id}`);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <nav
      id="mobile-nav"
      className={`mobile-nav ${open ? 'open' : ''}`}
      aria-hidden={!open}
    >
      <a href={href('perfil')} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.profile')}
      </a>
      <a href={href('experiencia')} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.experience')}
      </a>
      <a href={href('pipeline')} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.pipeline')}
      </a>
      <a href={href('proyectos')} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.projects')}
      </a>
      <a href={href('contacto')} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.contact')}
      </a>
      <Link to={localizePath('/blog', language)} onClick={onClose} tabIndex={open ? 0 : -1}>
        {t('nav.blog')}
      </Link>
    </nav>
  );
}
