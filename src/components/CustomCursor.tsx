import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let targetX = -100, targetY = -100, x = -100, y = -100, raf = 0;
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      const interactive = (event.target as Element).closest?.('a, button, [data-cursor]');
      ring.current?.classList.add('visible');
      ring.current?.classList.toggle('active', !!interactive);
      const wording = interactive?.getAttribute('data-cursor') || '';
      if (label.current) label.current.textContent = wording;
    };
    const leave = () => ring.current?.classList.remove('visible');
    const enter = () => ring.current?.classList.add('visible');
    const frame = () => {
      x += (targetX - x) * 0.19;
      y += (targetY - y) * 0.19;
      if (ring.current) ring.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
    };
  }, []);

  return <div className="cursor-system" aria-hidden="true"><div ref={ring} className="cursor-ring"><span ref={label} /></div><div ref={dot} className="cursor-dot"/></div>;
}
