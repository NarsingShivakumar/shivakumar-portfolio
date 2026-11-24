import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, EyeOff, MapPin, RotateCcw, X } from 'lucide-react';

/** An original little walking guide for the portfolio. */
const stops = [
  { id: 'top', label: 'Welcome', heading: 'Hi, I’m Kushi!', text: 'I’m Kushi, your walking guide to Shivakumar’s world of mobile and connected systems. Click me to explore, or drag me anywhere!' },
  { id: 'device-showcase', label: 'Mobile apps', heading: 'More than screen design', text: 'Explore a tappable phone gallery of healthcare, fintech, security and IoT applications.' },
  { id: 'work', label: 'Selected projects', heading: 'Built for real environments', text: 'From REACH’s connected diagnostics to secure payments and mobile IoT controllers, there’s serious engineering behind these screens.' },
  { id: 'engineering', label: 'Under the hood', heading: 'The interesting bits', text: 'Bluetooth GATT, native SDK bridges, WebRTC, local IP links and offline sync: try a technical workflow here.' },
  { id: 'iot', label: 'Device ecosystem', heading: 'Let devices talk', text: 'BLE, ESP32, USB, NFC, local hotspots and LAN/IP connections all have a place in Shivakumar’s toolbox.' },
  { id: 'experience', label: 'Experience', heading: 'What he has shipped', text: 'Production React Native work spanning mobile, native Android, hardware integrations, healthcare and fintech.' },
  { id: 'skills', label: 'Skills', heading: 'Pick a technology', text: 'See the practical stack: Java, Kotlin, React Native, WebRTC, SQLite, WatermelonDB and third-party device SDKs.' },
  { id: 'contact', label: 'Get in touch', heading: 'Let’s build something', text: 'Have a hardware-connected mobile app in mind? Send an email or open GitHub or LinkedIn from the Contact section.' },
] as const;

const PADDING = 14;
const WALK_SPEED = 60; // pixels per second; increase for faster roaming
const REST_MIN_MS = 900;
const REST_MAX_MS = 2300;
const DRAG_RESUME_MS = 1600;

type Point = { x: number; y: number };
type Drag = { pointerId: number; startX: number; startY: number; x: number; y: number; moved: boolean };

function bounds() {
  const mobile = window.innerWidth <= 580;
  return {
    minX: PADDING,
    minY: PADDING,
    maxX: Math.max(PADDING, window.innerWidth - (mobile ? 84 : 104) - PADDING),
    maxY: Math.max(PADDING, window.innerHeight - (mobile ? 92 : 113) - PADDING),
  };
}

function clampPosition(point: Point): Point {
  const box = bounds();
  return { x: Math.max(box.minX, Math.min(box.maxX, point.x)), y: Math.max(box.minY, Math.min(box.maxY, point.y)) };
}

function startPosition(): Point {
  if (typeof window === 'undefined') return { x: 20, y: 20 };
  const box = bounds();
  return { x: box.maxX, y: box.maxY };
}

function chooseWaypoint(from: Point): Point {
  const box = bounds();
  const width = box.maxX - box.minX;
  const height = box.maxY - box.minY;
  for (let i = 0; i < 12; i += 1) {
    const distant = Math.random() < 0.26;
    const candidate = clampPosition(distant
      ? { x: box.minX + Math.random() * width, y: box.minY + Math.random() * height }
      : { x: from.x + (Math.random() - 0.5) * 560, y: from.y + (Math.random() - 0.5) * 390 });
    if (Math.hypot(candidate.x - from.x, candidate.y - from.y) > Math.min(100, Math.max(width, height) * 0.2)) return candidate;
  }
  return { x: box.minX + Math.random() * width, y: box.minY + Math.random() * height };
}

function IndiaTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="kushi-time"><Clock3 size={13}/> India time: {new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(now)}</span>;
}

function KushiArt() {
  return <svg className="kushi-art" width="94" height="94" viewBox="0 0 120 120" fill="none" role="img" aria-label="Kushi, a friendly green walking robot guide">
    <ellipse cx="61" cy="112" rx="34" ry="5" fill="#19382F" opacity=".15" className="kushi-shadow"/>
    <g className="kushi-antenna"><path d="M59 31V19" stroke="#175C40" strokeWidth="4" strokeLinecap="round"/><circle cx="59" cy="13" r="7" fill="#FFCE5A" stroke="#1F6B4A" strokeWidth="3"/></g>
    <path d="M26 51L13 43Q9 41 11 36Q13 32 18 34L33 39" fill="#49BE83" stroke="#1D6C4A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M94 51L107 43Q111 41 109 36Q107 32 102 34L87 39" fill="#49BE83" stroke="#1D6C4A" strokeWidth="3" strokeLinecap="round"/>
    <g className="kushi-foot kushi-foot-left"><rect x="34" y="96" width="15" height="17" rx="7" fill="#174C35"/><rect x="28" y="106" width="23" height="9" rx="4" fill="#225D43"/></g>
    <g className="kushi-foot kushi-foot-right"><rect x="72" y="96" width="15" height="17" rx="7" fill="#174C35"/><rect x="69" y="106" width="23" height="9" rx="4" fill="#225D43"/></g>
    <g className="kushi-robot-body">
      <rect x="20" y="29" width="80" height="78" rx="34" fill="#1F6B4A" stroke="#174C35" strokeWidth="3"/>
      <path d="M31 53Q36 35 61 33Q81 35 91 54Q74 47 60 49Q43 49 31 53Z" fill="#58D99A" opacity=".5"/>
      <rect x="28" y="42" width="64" height="48" rx="23" fill="#59D698"/>
      <ellipse cx="45" cy="61" rx="10" ry="12" fill="white"/><ellipse cx="75" cy="61" rx="10" ry="12" fill="white"/>
      <circle cx="47" cy="63" r="5.4" fill="#10271B" className="kushi-eye"/><circle cx="77" cy="63" r="5.4" fill="#10271B" className="kushi-eye"/>
      <circle cx="49" cy="61" r="2" fill="white"/><circle cx="79" cy="61" r="2" fill="white"/>
      <path d="M52 77Q60 84 68 77" stroke="#17523A" strokeWidth="3.6" strokeLinecap="round"/>
      <circle cx="34" cy="76" r="4" fill="#FFA0B1" opacity=".75"/><circle cx="86" cy="76" r="4" fill="#FFA0B1" opacity=".75"/>
      <path d="M32 84L22 91M88 84L98 91" stroke="#174C35" strokeWidth="7" strokeLinecap="round"/>
      <path d="M94 97Q112 85 104 67" stroke="#1F6B4A" strokeWidth="6" strokeLinecap="round" className="kushi-tail"/>
    </g>
  </svg>;
}

export default function KushiGuide() {
  const [index, setIndex] = useState(-1);
  const [hidden, setHidden] = useState(false);
  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [dragging, setDragging] = useState(false);
  const walkingRef = useRef(false);
  const facingRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const widgetRef = useRef<HTMLElement>(null);
  const positionRef = useRef<Point>(startPosition());
  const targetRef = useRef<Point>(startPosition());
  const dragRef = useRef<Drag | null>(null);
  const ignoreClickRef = useRef(false);
  const hoverRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const showTour = index >= 0;
  const active = showTour ? stops[index] : null;

  const changeWalking = useCallback((next: boolean) => {
    if (walkingRef.current === next) return;
    walkingRef.current = next;
    setWalking(next);
  }, []);

  const changeFacing = useCallback((left: boolean) => {
    if (facingRef.current === left) return;
    facingRef.current = left;
    setFacingLeft(left);
  }, []);

  const paint = useCallback(() => {
    const node = widgetRef.current;
    if (!node) return;
    const { x, y } = positionRef.current;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    node.dataset.side = x < window.innerWidth / 2 ? 'right' : 'left';
    const speech = node.querySelector<HTMLElement>('.kushi-bubble');
    if (speech) {
      const mascotWidth = window.innerWidth <= 580 ? 82 : 100;
      const bubbleWidth = Math.min(speech.offsetWidth, window.innerWidth - 28);
      const preferredLeft = x < window.innerWidth / 2 ? x : x + mascotWidth - bubbleWidth;
      const bubbleLeft = Math.max(14, Math.min(window.innerWidth - bubbleWidth - 14, preferredLeft));
      const bubbleHeight = Math.min(speech.offsetHeight, window.innerHeight - 26);
      let preferredTop = y - bubbleHeight - 12;
      if (preferredTop < 12) preferredTop = y + (window.innerWidth <= 580 ? 89 : 108);
      const bubbleTop = Math.max(12, Math.min(window.innerHeight - bubbleHeight - 12, preferredTop));
      node.style.setProperty('--kushi-bubble-left', `${bubbleLeft - x}px`);
      node.style.setProperty('--kushi-bubble-top', `${bubbleTop - y}px`);
    }
  }, []);

  const parkAtCorner = useCallback(() => {
    const box = bounds();
    positionRef.current = { x: box.maxX, y: box.maxY };
    targetRef.current = positionRef.current;
    changeWalking(false);
    paint();
  }, [paint, changeWalking]);

  const go = useCallback((next: number) => {
    if (next >= stops.length) {
      setIndex(-1);
      pauseUntilRef.current = performance.now() + DRAG_RESUME_MS;
      return;
    }
    const target = Math.max(0, next);
    setIndex(target);
    setHidden(false);
    parkAtCorner();
    document.getElementById(stops[target].id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [parkAtCorner, prefersReducedMotion]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useLayoutEffect(() => {
    if (showTour) paint();
  }, [showTour, index, paint]);

  useEffect(() => {
    if (!showTour) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIndex(-1); pauseUntilRef.current = performance.now() + DRAG_RESUME_MS; }
      if ((event.target as Element)?.closest('input,textarea,select,[contenteditable]')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, go, showTour]);

  useLayoutEffect(() => {
    if (hidden) return;
    paint();
    const onResize = () => {
      positionRef.current = clampPosition(positionRef.current);
      targetRef.current = clampPosition(targetRef.current);
      paint();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [hidden, paint]);

  // Only the mascot's transform changes per frame; React does not rerender the whole page.
  // Paused during a guided tour, dragging, hovering, hidden tabs and reduced motion.
  useEffect(() => {
    if (hidden || showTour || prefersReducedMotion) { changeWalking(false); return; }
    let frame = 0;
    let previous = 0;
    let restUntil = performance.now() + 1350;
    targetRef.current = chooseWaypoint(positionRef.current);
    const tick = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      if (document.hidden || dragRef.current || hoverRef.current || now < pauseUntilRef.current || now < restUntil) {
        changeWalking(false);
      } else {
        const current = positionRef.current;
        const target = targetRef.current;
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 3) {
          changeWalking(false);
          restUntil = now + REST_MIN_MS + Math.random() * (REST_MAX_MS - REST_MIN_MS);
          targetRef.current = chooseWaypoint(current);
        } else {
          const movement = Math.min(distance, WALK_SPEED * dt);
          positionRef.current = clampPosition({ x: current.x + (dx / distance) * movement, y: current.y + (dy / distance) * movement });
          changeWalking(true);
          if (Math.abs(dx) > 8) changeFacing(dx < 0);
          paint();
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [hidden, showTour, prefersReducedMotion, paint, changeWalking, changeFacing]);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    const { x, y } = positionRef.current;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x, y, moved: false };
    changeWalking(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 6) drag.moved = true;
    if (!drag.moved) return;
    if (Math.abs(dx) > 3) changeFacing(dx < 0);
    setDragging(true);
    positionRef.current = clampPosition({ x: drag.x + dx, y: drag.y + dy });
    paint();
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    if (dragRef.current.moved) {
      ignoreClickRef.current = true;
      window.setTimeout(() => { ignoreClickRef.current = false; }, 0);
      pauseUntilRef.current = performance.now() + DRAG_RESUME_MS;
      targetRef.current = chooseWaypoint(positionRef.current);
    }
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  if (hidden) return <button className="kushi-restore" onClick={() => { setHidden(false); pauseUntilRef.current = performance.now() + 800; }} type="button" aria-label="Show Kushi walking guide"><RotateCcw size={15}/> Meet Kushi</button>;

  return <aside ref={widgetRef} className={`kushi-widget ${showTour ? 'kushi-touring' : ''} ${walking && !dragging ? 'kushi-walking' : ''} ${dragging ? 'kushi-dragging' : ''} ${prefersReducedMotion ? 'kushi-still' : ''}`} aria-label="Kushi, interactive walking portfolio guide">
    {showTour && active && <div className="kushi-bubble" role="region" aria-label={`Tour stop ${index + 1}: ${active.label}`}>
      <div className="kushi-bubble-top"><span><MapPin size={13}/> {String(index + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')} · {active.label}</span><button type="button" aria-label="Close tour" onClick={() => { setIndex(-1); pauseUntilRef.current = performance.now() + DRAG_RESUME_MS; }}><X size={16}/></button></div>
      <div className="kushi-bubble-meter"><i style={{ width: `${(index + 1) / stops.length * 100}%` }}/></div>
      <h3>{active.heading}</h3><p>{active.text}</p>
      {index === 0 && <IndiaTime/>}
      {index === stops.length - 1 && <a className="kushi-email" href="mailto:narsingshivakumar10@gmail.com">narsingshivakumar10@gmail.com</a>}
      <div className="kushi-bubble-controls">
        <button type="button" disabled={index === 0} onClick={() => go(index - 1)}><ArrowLeft size={15}/> Back</button>
        <button type="button" className="kushi-next" onClick={() => go(index + 1)}>{index === stops.length - 1 ? <>Finish <Check size={16}/></> : <>Next stop <ArrowRight size={16}/></>}</button>
      </div>
      <span className="kushi-shortcut">Tip: drag Kushi, use ← → arrows, Esc to exit</span>
    </div>}
    {!showTour && <div className="kushi-greeting" aria-hidden="true">I’m Kushi!<span>↗</span></div>}
    <div className="kushi-person">
      <div className={`kushi-facing ${facingLeft ? 'kushi-face-left' : ''}`}>
        <button type="button" className="kushi-body" aria-label={showTour ? `Kushi: ${active?.label}. Next stop` : 'Kushi walking guide. Start guided tour'} title="Kushi — click for a tour, drag to move around" onClick={() => { if (ignoreClickRef.current) return; if (!showTour) go(0); else go(index + 1); }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerEnter={() => { hoverRef.current = true; }} onPointerLeave={() => { hoverRef.current = false; }}>
          <KushiArt/>
        </button>
      </div>
      <button type="button" className="kushi-hide" aria-label="Hide Kushi" title="Hide Kushi" onClick={() => { setHidden(true); setIndex(-1); }}><EyeOff size={15}/></button>
    </div>
  </aside>;
}
