import { useEffect } from 'react';

export default function MagneticMotion() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const matches = '.button-pill, .nav-contact, .hero-inline-link, .showcase-action, .contact-buttons a, .experience-download';
    const elements = Array.from(document.querySelectorAll<HTMLElement>(matches));
    const unbind = elements.map(element => {
      const move = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate3d(${Math.max(-10, Math.min(10, dx * .16))}px,${Math.max(-8, Math.min(8, dy * .16))}px,0)`;
      };
      const leave = () => { element.style.transform = ''; };
      element.addEventListener('mousemove', move);
      element.addEventListener('mouseleave', leave);
      return () => { element.removeEventListener('mousemove', move); element.removeEventListener('mouseleave', leave); element.style.transform = ''; };
    });
    return () => unbind.forEach(unsubscribe => unsubscribe());
  }, []);
  return null;
}
