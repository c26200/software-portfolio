import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('kinetic-theme');
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
