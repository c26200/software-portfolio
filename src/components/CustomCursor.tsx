import { useEffect, useRef } from 'react';

/**
 * Cursor de la dirección cinética: bloque lima + marco técnico.
 * Solo se activa con puntero fino y sin prefers-reduced-motion.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const frame = frameRef.current;
    if (!root || !dot || !frame) return;

    document.documentElement.classList.add('has-cursor');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let frameX = targetX;
    let frameY = targetY;
    let active = false;
    let external = false;
    let pressed = false;
    let visible = false;
    let raf = 0;

    const render = () => {
      dotX += (targetX - dotX) * 0.3;
      dotY += (targetY - dotY) * 0.3;
      frameX += (targetX - frameX) * 0.16;
      frameY += (targetY - frameY) * 0.16;

      const dotScale = active ? 0.55 : 1;
      const frameScale = active ? (pressed ? 0.85 : 1) : pressed ? 0.5 : 0.55;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      frame.style.transform = `translate3d(${frameX}px, ${frameY}px, 0) translate(-50%, -50%) scale(${frameScale})`;

      raf = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        dotX = frameX = targetX;
        dotY = frameY = targetY;
        root.classList.add('ready');
      }
    };

    const onPointerOver = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest(
        'a, button, [role="button"], .card, input, textarea, select',
      );
      const inNav = Boolean(element?.closest('.bar nav'));
      active = Boolean(element) && !inNav;
      external = Boolean(
        element &&
          !inNav &&
          (element.classList.contains('card') ||
            element.getAttribute('target') === '_blank'),
      );

      frame.classList.toggle('active', active);
      frame.classList.toggle('ext', external);
      dot.style.opacity = external ? '0' : '1';
    };

    const onPointerDown = () => {
      pressed = true;
      frame.classList.add('pressed');
    };

    const onPointerUp = () => {
      pressed = false;
      frame.classList.remove('pressed');
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove('ready');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <span ref={dotRef} className="cursor-core" />
      <span ref={frameRef} className="cursor-frame">
        <span className="cursor-arrow">↗</span>
      </span>
    </div>
  );
}
