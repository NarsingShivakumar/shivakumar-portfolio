import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bluetooth, Cpu, Network, Pause, Play, RadioTower } from 'lucide-react';

const stories = [
  {
    eyebrow: 'MOBILE ENGINEERING',
    title: 'Beyond the interface.',
    description: 'Reliable apps. Real-world hardware.',
    badge: 'REACT NATIVE · NATIVE MODULES',
    Icon: Cpu,
  },
  {
    eyebrow: 'CONNECTED DEVICES',
    title: 'From sensor to screen.',
    description: 'BLE, NFC, ESP32 and medical IoT.',
    badge: 'BLE · NFC · ESP32 · IoT',
    Icon: Bluetooth,
  },
  {
    eyebrow: 'REAL-TIME SYSTEMS',
    title: 'Engineered to stay connected.',
    description: 'WebRTC, local IP and hotspot networks.',
    badge: 'WEBRTC · HOTSPOT · IP',
    Icon: Network,
  },
] as const;

const INTERVAL_MS = 5200;

export default function HeroPortrait() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const element = portraitRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive(index => (index + 1) % stories.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, inView]);

  const story = stories[active];
  const Icon = story.Icon;

  return <div className="portrait-outer" ref={portraitRef}>
    <div className="portrait-window" data-slide={active}>
      <img className="portrait-photo" src="/portrait.webp" alt="Portrait of Shivakumar Narsing" width={1100} height={1475} fetchPriority="high" />
      <div className="portrait-photo-shade" aria-hidden="true" />
      <div className="portrait-ambient-ring" aria-hidden="true"><span/><span/><span/></div>

      <div className="portrait-topline">
        <span className="portrait-nameplate"><span className="portrait-live-dot"/> SHIVAKUMAR NARSING</span>
        <span className="portrait-sequence">0{active + 1} <i/> 0{stories.length}</span>
      </div>

      <div className="portrait-story" key={active} aria-live="off">
        <div className="portrait-story-eyebrow"><Icon size={15} aria-hidden="true"/>{story.eyebrow}</div>
        <h3>{story.title}</h3>
        <p>{story.description}</p>
      </div>

      <div className="portrait-controls" aria-label="Portrait presentation controls">
        <div className="portrait-slide-dots" role="group" aria-label="Choose a portrait message">
          {stories.map((item, index) => <button
            key={item.eyebrow}
            type="button"
            className={active === index ? 'active' : ''}
            aria-label={`Show: ${item.eyebrow.toLowerCase()}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          ><span/></button>)}
        </div>
        <button type="button" className="portrait-play" aria-label={paused ? 'Resume portrait slideshow' : 'Pause portrait slideshow'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}
        </button>
      </div>
    </div>

    <div className="portrait-offset-tag" key={story.badge}><span className="status-dot"/>{story.badge}<ArrowUpRight size={14} aria-hidden="true"/></div>
    <p className="portrait-hint"><RadioTower size={13} aria-hidden="true"/> ENGINEERING THAT CONNECTS <span>•</span> BUILT FOR PRODUCTION</p>
  </div>;
}
