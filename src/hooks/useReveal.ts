import { useEffect, useRef } from 'react';

/**
 * Adds the `visible` class when the referenced element enters the viewport.
 * The element must already carry the `reveal` (or `ink-reveal`) class.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
