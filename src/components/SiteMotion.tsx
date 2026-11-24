import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function SiteMotion() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [showBackTop, setShowBackTop] = useState(false);
  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
        if (progressRef.current) progressRef.current.style.width = `${percentage}%`;
        setShowBackTop(window.scrollY > 650);
        raf = 0;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="page-scroll-progress" ref={progressRef} aria-hidden="true" />
      <a className={`back-to-top ${showBackTop ? 'back-to-top-visible' : ''}`} href="#top" tabIndex={showBackTop ? 0 : -1} aria-label="Back to top"><ArrowUp size={19} /></a>
    </>
  );
}

export function RotatingSpecialty() {
  const roles = ['Bluetooth Low Energy / GATT', 'ESP32 & connected IoT apps', 'Medical IoT & NFC pairing', 'Hotspot & IP-based device links', 'Third-party SDK integration', 'Android native modules', 'WebRTC & offline-first systems'];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2900);
    return () => window.clearInterval(interval);
  }, []);
  return <span className="specialty-rotator" aria-live="off"><span key={index} className="specialty-rotator-text">{roles[index]}</span></span>;
}

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const elementRef = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!elementRef.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / 1150);
      const eased = 1 - (1 - t) ** 4;
      setDisplay(Math.max(0, Math.round(eased * value)));
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    setDisplay(0);
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return <strong ref={elementRef}>{display}<span>{suffix}</span></strong>;
}
