import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Theme = 'light' | 'dark';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ThemeToggle() {
  const { t } = useTranslation();
  // Arranca en oscuro para que servidor y cliente coincidan; el tema real se
  // lee del atributo que fija el script inline, antes del primer pintado.
  const [theme, setTheme] = useState<Theme>('dark');
  const firstRun = useRef(true);

  useIsomorphicLayoutEffect(() => {
    const current =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

    if (firstRun.current) {
      firstRun.current = false;
      if (current !== theme) setTheme(current);
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('kinetic-theme', theme);
    } catch {
      /* storage may be unavailable */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f2efe7' : '#080808');
  }, [theme]);

  const next: Theme = theme === 'light' ? 'dark' : 'light';
  const label = next === 'dark' ? t('kinetic.themeToDark') : t('kinetic.themeToLight');

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
    >
      {theme === 'light' ? (
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      )}
    </button>
  );
}
