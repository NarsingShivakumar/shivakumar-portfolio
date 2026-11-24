import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, EyeOff, MapPin, RotateCcw, X } from 'lucide-react';

/** Original character art and independent guided-tour implementation. */
const stops = [
  { id: 'top', label: 'Welcome', heading: 'Hi, I’m Chalky!', text: 'Your little guide to Shivakumar’s world of mobile engineering. I know every corner of this site.' },
  { id: 'device-showcase', label: 'Mobile apps', heading: 'More than screen design', text: 'Explore a tappable phone gallery of healthcare, fintech, security and IoT applications.' },
  { id: 'work', label: 'Selected projects', heading: 'Built for real environments', text: 'From REACH’s connected diagnostics to secure payments and mobile IoT controllers, there’s serious engineering behind these screens.' },
  { id: 'engineering', label: 'Under the hood', heading: 'The interesting bits', text: 'Bluetooth GATT, native SDK bridges, WebRTC, local IP links and offline sync: try a technical workflow here.' },
  { id: 'iot', label: 'Device ecosystem', heading: 'Let devices talk', text: 'BLE, ESP32, USB, NFC, local hotspots and LAN/IP connections all have a place in Shivakumar’s toolbox.' },
  { id: 'experience', label: 'Experience', heading: 'What he has shipped', text: 'Production React Native work spanning mobile, native Android, hardware integrations, healthcare and fintech.' },
  { id: 'skills', label: 'Skills', heading: 'Pick a technology', text: 'See the practical stack: Java, Kotlin, React Native, WebRTC, SQLite, WatermelonDB and third-party device SDKs.' },
  { id: 'contact', label: 'Get in touch', heading: 'Let’s build something', text: 'Have a hardware-connected mobile app in mind? Send an email or open GitHub or LinkedIn from the Contact section.' },
] as const;

function ChennaiTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="chalky-time"><Clock3 size={13}/> India time: {new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(now)}</span>;
}

function ChalkyArt() {
  return <svg className="chalky-art" width="94" height="94" viewBox="0 0 120 120" fill="none" role="img" aria-label="Chalky, a friendly green robot mascot">
    <ellipse cx="61" cy="111" rx="34" ry="6" fill="#19382F" opacity=".15" className="chalky-shadow"/>
    <path d="M59 31V19" stroke="#175C40" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="59" cy="13" r="7" fill="#FFCE5A" stroke="#1F6B4A" strokeWidth="3" className="chalky-antenna"/>
    <path d="M26 51L13 43Q9 41 11 36Q13 32 18 34L33 39" fill="#49BE83" stroke="#1D6C4A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M94 51L107 43Q111 41 109 36Q107 32 102 34L87 39" fill="#49BE83" stroke="#1D6C4A" strokeWidth="3" strokeLinecap="round"/>
    <rect x="20" y="29" width="80" height="78" rx="34" fill="#1F6B4A" stroke="#174C35" strokeWidth="3"/>
    <path d="M31 53Q36 35 61 33Q81 35 91 54Q74 47 60 49Q43 49 31 53Z" fill="#58D99A" opacity=".5"/>
    <rect x="28" y="42" width="64" height="48" rx="23" fill="#59D698"/>
    <ellipse cx="45" cy="61" rx="10" ry="12" fill="white"/>
    <ellipse cx="75" cy="61" rx="10" ry="12" fill="white"/>
    <circle cx="47" cy="63" r="5.4" fill="#10271B" className="chalky-eye"/>
    <circle cx="77" cy="63" r="5.4" fill="#10271B" className="chalky-eye"/>
    <circle cx="49" cy="61" r="2" fill="white"/><circle cx="79" cy="61" r="2" fill="white"/>
    <path d="M52 77Q60 84 68 77" stroke="#17523A" strokeWidth="3.6" strokeLinecap="round"/>
    <circle cx="34" cy="76" r="4" fill="#FFA0B1" opacity=".75"/><circle cx="86" cy="76" r="4" fill="#FFA0B1" opacity=".75"/>
    <path d="M38 103V110M82 103V110" stroke="#174C35" strokeWidth="9" strokeLinecap="round"/>
    <path d="M32 84L22 91M88 84L98 91" stroke="#174C35" strokeWidth="7" strokeLinecap="round"/>
    <path d="M94 97Q112 85 104 67" stroke="#1F6B4A" strokeWidth="6" strokeLinecap="round" className="chalky-tail"/>
  </svg>;
}

export default function ChalkyGuide() {
  const [index, setIndex] = useState(-1);
  const [hidden, setHidden] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{pointerId: number; x: number; y: number; ox: number; oy: number; moved: boolean} | null>(null);
  const ignoreClickRef = useRef(false);
  const showTour = index >= 0;
  const active = showTour ? stops[index] : null;
  const prefersReducedMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const go = useCallback((next: number) => {
    if (next >= stops.length) { setIndex(-1); setOffset({ x: 0, y: 0 }); return; }
    const target = Math.max(0, next);
    setIndex(target);
    setHidden(false);
    setOffset({ x: 0, y: 0 });
    document.getElementById(stops[target].id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!showTour) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIndex(-1); setOffset({ x: 0, y: 0 }); }
      if ((event.target as Element)?.closest('input,textarea,select,[contenteditable]')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, go, showTour]);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.hypot(dx, dy) > 7) drag.moved = true;
    if (!drag.moved) return;
    setOffset({ x: Math.max(-window.innerWidth + 106, Math.min(0, drag.ox + dx)), y: Math.max(-window.innerHeight + 116, Math.min(35, drag.oy + dy)) });
  };
  const onPointerUp = () => {
    if (dragRef.current?.moved) {
      ignoreClickRef.current = true;
      window.setTimeout(() => { ignoreClickRef.current = false; }, 0);
    }
    dragRef.current = null;
  };

  if (hidden) return <button className="chalky-restore" onClick={() => setHidden(false)} type="button" aria-label="Show Chalky tour guide"><RotateCcw size={15}/> Meet Chalky</button>;

  return <aside className={`chalky-widget ${showTour ? 'chalky-touring' : ''} ${prefersReducedMotion ? 'chalky-still' : ''}`} style={{ '--chalky-x': `${offset.x}px`, '--chalky-y': `${offset.y}px` } as CSSProperties} aria-label="Chalky interactive guide">
    {showTour && active && <div className="chalky-bubble" role="region" aria-label={`Tour stop ${index + 1}: ${active.label}`}>
      <div className="chalky-bubble-top"><span><MapPin size={13}/> {String(index + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')} · {active.label}</span><button type="button" aria-label="Close tour" onClick={() => setIndex(-1)}><X size={16}/></button></div>
      <div className="chalky-bubble-meter"><i style={{ width: `${(index + 1) / stops.length * 100}%` }}/></div>
      <h3>{active.heading}</h3><p>{active.text}</p>
      {index === 0 && <ChennaiTime/>}
      {index === stops.length - 1 && <a className="chalky-email" href="mailto:narsingshivakumar10@gmail.com">narsingshivakumar10@gmail.com</a>}
      <div className="chalky-bubble-controls">
        <button type="button" disabled={index === 0} onClick={() => go(index - 1)}><ArrowLeft size={15}/> Back</button>
        <button type="button" className="chalky-next" onClick={() => go(index + 1)}>{index === stops.length - 1 ? <>Finish <Check size={16}/></> : <>Next stop <ArrowRight size={16}/></>}</button>
      </div>
      <span className="chalky-shortcut">Tip: use ← → arrow keys, Esc to exit</span>
    </div>}
    {!showTour && <div className="chalky-greeting" aria-hidden="true">Need a tour? <span>↗</span></div>}
    <div key={index} className="chalky-person">
      <button type="button" className="chalky-body" aria-label={showTour ? `Chalky: ${active?.label}. Next stop` : 'Chalky guide. Start guided tour'} title="Meet Chalky — click for a guided tour, drag to move" onClick={() => { if (ignoreClickRef.current) return; if (!showTour) go(0); else go(index + 1); }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <ChalkyArt/>
      </button>
      <button type="button" className="chalky-hide" aria-label="Hide Chalky" title="Hide Chalky" onClick={() => { setHidden(true); setIndex(-1); }}><EyeOff size={15}/></button>
    </div>
  </aside>;
}
