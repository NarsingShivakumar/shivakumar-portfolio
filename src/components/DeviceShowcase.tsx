import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, Bluetooth, ChevronLeft, ChevronRight, Cpu, Fingerprint, HeartPulse, Pause, Play, Radio, ShieldCheck, Smartphone, Wifi } from 'lucide-react';
import Reveal from './Reveal';

const apps = [
  { id: 'reach', number: '01', title: 'REACH', subtitle: 'Connected care & diagnostics', accent: '#1f6b4a', tags: ['BLE / USB', 'WebRTC', 'Native SDKs'] },
  { id: 'jeevika', number: '02', title: 'Jeevika Nidhi', subtitle: 'Secure loan services', accent: '#d8a33c', tags: ['Payments', 'Keystore', 'Geofencing'] },
  { id: 'metrics', number: '03', title: 'REACH AI Health', subtitle: 'Employee health records', accent: '#56a7bf', tags: ['Reports', 'Vitals', 'Offline sync'] },
  { id: 'auth', number: '04', title: 'Authenticator', subtitle: 'Enterprise secure access', accent: '#8b78bf', tags: ['Biometrics', 'TOTP', 'Secure storage'] },
  { id: 'iot', number: '05', title: 'ESP32 IoT', subtitle: 'Mobile device controller', accent: '#388b6c', tags: ['ESP32', 'BLE', 'Hotspot / IP'] },
] as const;

function Screen({ id }: { id: typeof apps[number]['id'] }) {
  return <div className={`device-screen-body device-screen-${id}`}>
    <div className="phone-statusbar"><span>9:41</span><span>●●● ▰</span></div>
    {id === 'reach' && <><div className="app-logo-line"><HeartPulse size={18}/> REACH <span>Connected care</span></div><p className="app-greeting">Good morning</p><h3>Patient overview</h3><div className="app-banner app-banner-reach"><span><Activity size={17}/> Live diagnostic session</span><b>3 devices online</b></div><div className="app-metric-grid"><div><span>Heart rate</span><b>74</b><small>bpm</small></div><div><span>SpO₂</span><b>98</b><small>%</small></div></div><div className="app-ecg"><span>ECG waveform</span><svg viewBox="0 0 300 85" preserveAspectRatio="none"><path d="M0 46H45L54 38L60 50H78L86 65L97 11L108 77L117 46H185L194 40L202 50H220L228 65L239 10L250 76L261 46H300" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div className="app-footer-pill"><Bluetooth size={15}/> BLE connected <span>View report ↗</span></div></>}
    {id === 'jeevika' && <><div className="app-logo-line">jn<span>Jeevika Nidhi</span></div><p className="app-greeting">Welcome back</p><h3>Manage your finances.</h3><div className="app-banner app-banner-finance"><span>Loan overview</span><b>Secure access</b><strong>₹ 2,80,560</strong><small>Illustrative account view</small></div><p className="app-section-head">Quick actions</p><div className="app-action-grid"><div>↗<span>Pay EMI</span></div><div>▣<span>Statements</span></div><div>⌖<span>Field check</span></div></div><div className="app-secure"><ShieldCheck size={16}/> Protected by device security</div></>}
    {id === 'metrics' && <><div className="app-logo-line"><HeartPulse size={18}/> Health Metrics</div><p className="app-greeting">My health dashboard</p><h3>Your latest records.</h3><div className="app-banner app-banner-metrics"><span>Vitals summary</span><strong>86 <small>/ 100</small></strong><b>Health overview</b></div><div className="app-metric-grid"><div><span>Blood pressure</span><b>120/80</b><small>mmHg</small></div><div><span>Temperature</span><b>36.8</b><small>°C</small></div></div><div className="app-file"><span>▤</span><div><b>Annual health report</b><small>Tap to view document</small></div><ArrowUpRight size={16}/></div></>}
    {id === 'auth' && <><div className="app-logo-line"><ShieldCheck size={19}/> Authenticator</div><div className="app-auth-shield"><Fingerprint size={50}/></div><h3>Verify it's you.</h3><p className="app-auth-copy">Secure access for your registered device.</p><div className="app-auth-code">4 8 2 6 0 1</div><div className="app-auth-bar"/><div className="app-auth-timer">Code refreshes automatically</div><div className="app-auth-action"><Fingerprint size={18}/> Continue with biometrics</div></>}
    {id === 'iot' && <><div className="app-logo-line"><Cpu size={18}/> IoT Controller <span><i/> Online</span></div><p className="app-greeting">Your connected devices</p><h3>ESP32 Controller</h3><div className="app-banner app-banner-iot"><Radio size={24}/><span>Device online</span><b>Local network connected</b></div><div className="app-metric-grid"><div><span>Transport</span><b>BLE</b><small>GATT</small></div><div><span>Connection</span><b>LAN</b><small>Local IP</small></div></div><p className="app-section-head">Device actions</p><div className="app-action-grid"><div><Wifi size={18}/><span>Connect</span></div><div><Bluetooth size={18}/><span>Pair</span></div><div><Cpu size={18}/><span>Control</span></div></div></>}
    <div className="app-tabbar"><span>⌂</span><span>▤</span><span>◉</span><span>☰</span></div>
  </div>;
}

export default function DeviceShowcase() {
  const [active, setActive] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paused = manualPaused || hovered;
  const activeApp = apps[active];
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % apps.length), 5400);
    return () => window.clearInterval(timer);
  }, [paused]);
  return <section id="device-showcase" className="device-section section-pad"><div className="container"><Reveal><div className="section-header"><div><span className="section-eyebrow">01 / MOBILE SHOWCASE</span><h2>Real engineering.<br/><em>In your hands.</em></h2></div><p>Tap a project to explore an illustrative mobile screen. These are visual concepts, not production screenshots; replace them with your own captures anytime.</p></div></Reveal>
    <div className="device-showcase-layout"><Reveal className="device-showcase-copy"><span className="device-number">0{active + 1} — 05</span><h3>Built to run where it matters.</h3><p>Healthcare in the field. Secure finance. Device integrations. Native Android, local networking and data that stays reliable when the signal does not.</p><div className="device-stat-pair"><div><strong>4</strong><span>Production mobile apps</span></div><div><strong>10+</strong><span>Medical device integrations</span></div></div><div className="device-play-control"><button type="button" onClick={() => setActive(i => (i + apps.length - 1) % apps.length)} aria-label="Previous app"><ChevronLeft size={17}/></button><button type="button" onClick={() => setManualPaused(!manualPaused)} aria-label={manualPaused ? 'Resume automatic screen cycling' : 'Pause automatic screen cycling'}>{manualPaused ? <Play size={17}/> : <Pause size={17}/>}</button><button type="button" onClick={() => setActive(i => (i + 1) % apps.length)} aria-label="Next app"><ChevronRight size={17}/></button></div></Reveal>
      <div className="device-stage"><div className="device-back-ring"/><div className="phone-device" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}><div className="phone-speaker"/><div className="phone-screen" key={active}><Screen id={activeApp.id}/></div><div className="phone-home-indicator"/></div><span className="device-stage-label"><Smartphone size={15}/> INTERACTIVE PROJECT GALLERY</span></div>
      <Reveal className="device-selection"><span className="device-selection-label">SWITCH PROJECT</span>{apps.map((app, index) => <button type="button" key={app.id} aria-pressed={active === index} onClick={() => { setActive(index); setManualPaused(true); }} className={`device-select-item ${active === index ? 'is-selected' : ''}`}><span>{app.number}</span><span><strong>{app.title}</strong><small>{app.subtitle}</small></span><ArrowUpRight size={17}/></button>)}<div className="device-chip-row">{activeApp.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>
    </div>
  </div></section>;
}
