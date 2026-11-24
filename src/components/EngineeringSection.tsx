import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowRight, Bluetooth, Cable, Check, Cpu, Database, Fingerprint, Network, RadioTower, Wifi } from 'lucide-react';
import { diagnosticDevices, engineeringFlows } from '../data/portfolio';
import Reveal from './Reveal';
const icons = [Cpu, Bluetooth, Cable, Network, Wifi, Database, Fingerprint];

export default function EngineeringSection() {
  const [selected, setSelected] = useState(0);
  const flow = engineeringFlows[selected];
  const Icon = icons[selected] ?? Cpu;
  const keydown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = engineeringFlows.length;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? count - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + count) % count;
    setSelected(next);
    document.getElementById(`tech-tab-${next}`)?.focus();
  };
  return <section id="engineering" className="engineering-band">
    <div className="container">
      <Reveal><div className="section-header engineering-header"><div><span className="section-eyebrow section-eyebrow-light">02 / UNDER THE HOOD</span><h2>Software meets<br/><em>the physical world.</em></h2></div><p>Beyond screens, I work on protocols, native SDKs, real hardware and the edge cases that make mobile systems dependable.</p></div></Reveal>
      <div className="engineering-panel">
        <div className="engineering-selector" role="tablist" aria-label="Explore engineering workflows">
          {engineeringFlows.map((item,index) => { const ThisIcon = icons[index] ?? Cpu; return <button type="button" role="tab" aria-selected={index === selected} aria-controls="engineering-detail" tabIndex={index === selected ? 0 : -1} onClick={()=>setSelected(index)} onKeyDown={e=>keydown(e,index)} key={item.id} id={`tech-tab-${index}`} className={`engineering-selector-item ${index === selected ? 'selected' : ''}`}><ThisIcon size={20}/><span><strong>{item.shortTitle}</strong><small>{item.category}</small></span><ArrowRight size={18}/></button>; })}
        </div>
        <div className="engineering-content" role="tabpanel" aria-labelledby={`tech-tab-${selected}`} id="engineering-detail" tabIndex={0} key={flow.id}>
          <div className="engineering-content-top"><span className="flow-breadcrumb"><span className="signal-dot"/> {flow.overline}</span><span>0{selected+1} / 0{engineeringFlows.length}</span></div>
          <div className="engineering-content-icon"><Icon size={31}/></div>
          <h3>{flow.title}</h3><p className="engineering-copy">{flow.description}</p>
          <div className="engineering-flow" aria-label="Integration sequence">{flow.steps.map((step,index)=><div className="engineering-flow-step" key={step}><span>{String(index+1).padStart(2,'0')}</span><strong>{step}</strong>{index<flow.steps.length-1 && <ArrowRight size={17}/>}</div>)}</div>
          <div className="engineering-lower"><div className="engineering-points">{flow.details.map(point=><p key={point}><Check size={16}/>{point}</p>)}</div><div className="engineering-techs"><span>TECHNOLOGIES</span><div>{flow.tech.map(item=><b key={item}>{item}</b>)}</div></div></div>
        </div>
      </div>
      <Reveal><div className="diagnostics-strip"><div><RadioTower size={23}/><span><strong>From ESP32 to ECG.</strong><small>Connected hardware I've integrated with mobile workflows.</small></span></div><div className="device-tags">{diagnosticDevices.map(device=><span key={device}>{device}</span>)}</div></div></Reveal>
    </div>
  </section>;
}
