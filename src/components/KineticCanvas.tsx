import { useEffect, useRef } from 'react';

/**
 * Field of cells behind the hero. Cells light up around the pointer and
 * occasionally on their own. Respects prefers-reduced-motion.
 */
export default function KineticCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let cells: HTMLDivElement[] = [];
    let cols = 0;
    let inside = false;
    let lastX = -1;
    let lastY = -1;
    let cellW = 0;
    let cellH = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let shimmer: ReturnType<typeof setInterval> | undefined;

    const build = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const size = w < 700 ? 26 : 42;
      cols = Math.ceil(w / size);
      const rows = Math.ceil(h / size);
      cellW = w / cols;
      cellH = h / rows;
      canvas.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      canvas.replaceChildren();
      cells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if (Math.random() > 0.88) cell.classList.add('dim');
          canvas.appendChild(cell);
          cells.push(cell);
        }
      }
    };

    build();
    window.addEventListener('resize', build);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onPointerMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;

      if ((event.target as Element | null)?.closest('.bar')) {
        inside = false;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        inside = false;
        return;
      }
      inside = true;

      const cx = Math.floor((event.clientX - rect.left) / cellW);
      const cy = Math.floor((event.clientY - rect.top) / cellH);
      const radius = window.innerWidth < 700 ? 1 : 2;

      cells.forEach((cell, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const d = Math.hypot(x - cx, y - cy);
        if (d <= radius) {
          cell.classList.add(d < 1 ? 'acc' : 'lit');
          timers.push(
            setTimeout(() => cell.classList.remove('acc', 'lit'), 700 + d * 220),
          );
        }
      });
    };

    const onPointerLeave = () => {
      inside = false;
    };

    if (!reduce) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      canvas.addEventListener('pointerleave', onPointerLeave);

      // Ambient shimmer: only while the pointer is inside the hero.
      shimmer = setInterval(() => {
        const rect = canvas.getBoundingClientRect();
        const stillInside =
          lastX >= rect.left &&
          lastX <= rect.right &&
          lastY >= rect.top &&
          lastY <= rect.bottom;
        if (!inside || !stillInside) return;

        const firstSafe = cols * 2;
        if (cells.length <= firstSafe) return;
        const i = firstSafe + Math.floor(Math.random() * (cells.length - firstSafe));
        const cell = cells[i];
        if (!cell) return;
        cell.classList.add('lit');
        timers.push(setTimeout(() => cell.classList.remove('lit'), 900));
      }, 1400);
    }

    return () => {
      window.removeEventListener('resize', build);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      if (shimmer) clearInterval(shimmer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return <div className="canvas" ref={ref} aria-hidden="true" />;
}
