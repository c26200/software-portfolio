import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored =
      typeof window !== 'undefined' ? window.localStorage.getItem('kinetic-theme') : null;
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kinetic-theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
  };
}
