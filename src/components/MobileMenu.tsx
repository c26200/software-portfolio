import { useEffect, useRef } from 'react';
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
  const navRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Bloquea el scroll y retira del foco el contenido que queda detrás
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previous;
    const behind = [document.querySelector('main'), document.querySelector('footer')];
    behind.forEach((el) => {
      if (!el) return;
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => el?.removeAttribute('inert'));
    };
  }, [open]);

  // El foco entra al menú al abrirlo y vuelve al botón al cerrarlo
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    navRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      returnFocusRef.current?.focus();
    };
  }, [open]);

  // Escape cierra; Tab queda atrapado entre los enlaces del menú
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !navRef.current) return;
      const items = Array.from(navRef.current.querySelectorAll<HTMLElement>('a'));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <nav
      ref={navRef}
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
