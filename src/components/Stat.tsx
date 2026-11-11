import { useEffect, useRef, useState } from 'react';

interface StatProps {
  end: number;
  suffix?: string;
  pad?: number;
  label: string;
}

export default function Stat({ end, suffix = '', pad = 0, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(pad ? '0'.repeat(pad) : '0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          let next = String(Math.round(end * eased));
          if (pad) next = next.padStart(pad, '0');
          setValue(next + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, pad, suffix]);

  return (
    <div className="stat" ref={ref}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}
