import { useEffect, useRef } from 'react';

export default function NoiseBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0, height = 0, frame = 0, raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const draw = () => {
      frame++;
      context.clearRect(0, 0, width, height);
      const dark = document.documentElement.dataset.theme === 'dark';
      const step = Math.max(33, Math.min(51, width / 28));
      for (let y = 22; y < height + 10; y += step) {
        for (let x = 20; x < width + 10; x += step) {
          const distance = Math.hypot(pointer.x - x, pointer.y - y);
          const hover = Math.max(0, 1 - distance / 190);
          const wave = motion ? (Math.sin(frame * .023 + x * .007 + y * .004) * .15) : 0;
          const alpha = Math.min(.38, .10 + hover * .24 + wave * .07);
          const radius = .8 + hover * 2.6;
          context.fillStyle = dark ? `rgba(140,204,159,${alpha})` : `rgba(32,104,75,${alpha})`;
          context.beginPath();
          context.arc(x, y + wave * 6, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      if (motion) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onPointer); };
  }, []);
  return <canvas className="hero-noise-canvas" ref={ref} aria-hidden="true"/>;
}
