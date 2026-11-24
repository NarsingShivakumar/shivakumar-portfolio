import { useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { ArrowUpRight, Bluetooth, Cpu, Fingerprint, HeartPulse, Landmark, Smartphone } from 'lucide-react';
import { projects } from '../data/portfolio';
import Reveal from './Reveal';

const icons = [HeartPulse, Landmark, Smartphone, Fingerprint, Cpu];
const palettes = ['#e0f0e5', '#f6e8cc', '#e3f0f7', '#eee6f8', '#dbeede'];

export default function WorkIndex() {
  const [active, setActive] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };
  const project = active === null ? null : projects[active];
  const Icon = active === null ? null : icons[active];
  return <section className="work-index-section section-pad" id="work-index"><div className="container"><Reveal><div className="section-header"><div><span className="section-eyebrow">MORE / PROJECT INDEX</span><h2>Every project has<br/><em>a deeper story.</em></h2></div><p>Explore the full collection. Hover a project name to preview it, or select a row to jump to its complete engineering breakdown.</p></div></Reveal>
    <div className="work-index" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      {projects.map((item, index) => <a key={item.theme} href={`#project-${item.theme}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)} className="work-index-row"><span>{item.number}</span><strong>{item.name}</strong><small>{item.category} · {item.technologies[0]}</small><ArrowUpRight size={23}/></a>)}
      {project && Icon && <div className="work-index-preview" aria-hidden="true" style={{ '--preview-x': `${cursor.x}px`, '--preview-y': `${cursor.y}px`, '--preview-bg': palettes[active!] } as CSSProperties}><span>ENGINEERING / {project.number}</span><Icon size={54}/><b>{project.name}</b><small>{project.tagline}</small><Bluetooth size={16} className="work-preview-corner"/></div>}
    </div>
  </div></section>;
}
