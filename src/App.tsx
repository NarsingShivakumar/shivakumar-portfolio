import { useEffect, useState } from 'react';
import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Bluetooth, Check, CheckCheck, CircuitBoard, Copy, Cpu, Download, Github, HeartPulse, Linkedin, Mail, MapPin, Smartphone, Wifi } from 'lucide-react';
import Header from './components/Header';
import HeroPortrait from './components/HeroPortrait';
import ProjectVisual from './components/ProjectVisual';
import EngineeringSection from './components/EngineeringSection';
import CustomCursor from './components/CustomCursor';
import SiteMotion, { CountUp, RotatingSpecialty } from './components/SiteMotion';
import Reveal from './components/Reveal';
import KushiGuide from './components/KushiGuide';
import DeviceShowcase from './components/DeviceShowcase';
import ExperienceSection from './components/ExperienceSection';
import WorkIndex from './components/WorkIndex';
import NoiseBackdrop from './components/NoiseBackdrop';
import ScrollMarquee from './components/ScrollMarquee';
import MagneticMotion from './components/MagneticMotion';
import { profile, projects, skillGroups } from './data/portfolio';
import type { Project } from './data/portfolio';

const focus = ['React Native CLI','BLE / GATT','ESP32 & IoT','NFC pairing','Native Android','Vendor SDKs','USB / UVC','Wi-Fi & local IP','WebRTC','Offline-first'];
const focusNodes = [
  { id:'ble', name:'BLE / GATT', icon:Bluetooth, desc:'Scanning, subscribing to characteristics, parsing packets and reconnecting medical peripherals.' },
  { id:'esp', name:'ESP32 & IoT', icon:Cpu, desc:'Mobile-to-ESP32 communication, device state, commands and connected monitoring.' },
  { id:'wifi', name:'Wi-Fi / IP', icon:Wifi, desc:'Phone hotspots, local IP endpoints, host/controller communication and network recovery.' },
  { id:'native', name:'Native SDKs', icon:CircuitBoard, desc:'Vendor SDKs, Java/Kotlin bridges, USB devices, Android permissions and callbacks.' },
];

function Intro() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.sessionStorage.getItem('sn-intro-seen') !== 'yes');
  const [progress, setProgress] = useState(0);
  // A brief, one-time intro; content is present in the DOM throughout.
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const timer = window.setInterval(() => { i += 5; setProgress(Math.min(100, i)); if (i >= 100) window.clearInterval(timer); }, 45);
    const dismiss = window.setTimeout(() => { window.sessionStorage.setItem('sn-intro-seen','yes'); setVisible(false); }, 1250);
    return () => { window.clearInterval(timer); window.clearTimeout(dismiss); };
  }, [visible]);
  if (!visible) return null;
  return <div className="intro-overlay" aria-hidden="true"><span>PORTFOLIO / 2026</span><div><strong>Shivakumar<span> N.</span></strong><div className="intro-line"><i style={{width:`${progress}%`}}/><span>{String(progress).padStart(3,'0')}</span></div></div><span>MOBILE × NATIVE × CONNECTED SYSTEMS</span></div>;
}

function ProjectCard({ project, index }: {project: Project;index: number}) {
  return <article id={`project-${project.theme}`} className={`showcase-card showcase-${project.theme}`} style={{ top: `${105 + index * 12}px` }} data-cursor="VIEW">
    <div className="showcase-content">
      <div className="showcase-meta"><span>{project.number} / SELECTED WORK</span><span>{project.label}</span></div>
      <div className="showcase-center"><h3>{project.name}</h3><p className="showcase-tagline">{project.tagline}</p><p className="showcase-description">{project.description}</p><ul className="showcase-bullets">{project.contributions.slice(0,3).map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul></div>
      <div className="showcase-footer"><div className="showcase-tags">{project.technologies.map(tag=><span key={tag}>{tag}</span>)}</div>{project.link ? <a className="showcase-action" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || 'Explore project'} <ArrowUpRight size={17}/></a> : <span className="showcase-private"><span className="signal-dot"/> {project.theme === 'esp32' ? 'INTEGRATION SHOWCASE' : 'PROFESSIONAL PROJECT'}</span>}</div>
    </div>
    <div className="showcase-visual"><div className="showcase-visual-label"><span>SN / {project.number}</span><span>ENGINEERING THAT CONNECTS</span></div><ProjectVisual project={project}/><div className="showcase-visual-footer"><span>{project.name.toUpperCase()}</span><ArrowUpRight size={17}/></div></div>
  </article>;
}

function IoTSection() {
  const [active,setActive] = useState(1);
  const current = focusNodes[active];
  const Icon = current.icon;
  return <section id="iot" className="iot-section section-pad"><div className="container"><Reveal><div className="section-header"><div><span className="section-eyebrow">05 / DEVICE ECOSYSTEM</span><h2>A connected<br/>world of devices.</h2></div><p>ESP32-powered IoT apps, medical sensors, hotspot connections, Bluetooth peripherals and native SDKs. Select a connection to explore what happens behind the screen.</p></div></Reveal><div className="iot-grid"><Reveal><div className="iot-diagram" aria-label="Interactive connected devices diagram"><div className="diagram-grid"/><div className="diagram-circle c1"/><div className="diagram-circle c2"/><div className="diagram-center"><Smartphone size={31}/><strong>React Native</strong><small>Mobile controller</small></div>{focusNodes.map((node,index)=>{const NodeIcon = node.icon;return <button key={node.id} onClick={()=>setActive(index)} type="button" className={`diagram-node diagram-node-${index} ${active===index?'is-active':''}`} aria-pressed={active===index}><NodeIcon size={23}/><b>{node.name}</b></button>})}<span className="diagram-status"><span className="signal-dot"/> CONNECTED</span></div></Reveal><Reveal delay={140}><div className="iot-story"><span className="iot-story-label">CONNECTION / 0{active+1}</span><div className="iot-story-icon"><Icon size={30}/></div><h3>{current.name}</h3><p>{current.desc}</p><div className="iot-story-sequence"><span>Discover</span><ArrowRight size={17}/><span>Connect</span><ArrowRight size={17}/><span>Exchange</span><ArrowRight size={17}/><span>Recover</span></div><p className="iot-footnote">Protocol-specific flows are illustrative. Exact transport and hardware SDK depend on the device.</p><a href="#engineering">Explore integration workflows <ArrowUpRight size={17}/></a></div></Reveal></div></div></section>;
}

function ContactSection() {
 const [copied,setCopied] = useState(false);
 const copy = async () => { try {await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(()=>setCopied(false),1800);} catch { window.location.href=`mailto:${profile.email}`; } };
 return <section id="contact" className="contact-section"><div className="container contact-card"><Reveal><div className="contact-kicker"><span className="signal-dot"/> HAVE A PROJECT IN MIND?</div><h2>Let's make<br/>it <em>connect.</em></h2><p>BLE, NFC, ESP32, IoT devices, third-party SDKs, native Android modules, real-time networking, or ambitious React Native products—let's talk.</p><div className="contact-buttons"><a href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={20}/></a><button type="button" onClick={copy}>{copied ? <CheckCheck size={18}/> : <Copy size={18}/>} {copied ? 'Copied email' : 'Copy email'}</button></div></Reveal><div className="contact-decoration" aria-hidden="true">✳<span>GOOD IDEAS<br/>DESERVE TO SHIP.</span></div></div></section>;
}

export default function App() {
  return <>
    <a href="#work" className="skip-link">Skip to projects</a>
    <Intro/><CustomCursor/><SiteMotion/><MagneticMotion/><Header/><KushiGuide/>
    <main id="top">
      <section className="hero-section"><NoiseBackdrop/><div className="container hero-layout">
        <div className="hero-left"><Reveal><div className="hero-small-label"><span className="signal-dot"/> REACT NATIVE · ANDROID · IOT</div><h1>I build more<br/>than <em>UI.</em></h1><p>From native device integrations to real-time communication, I engineer the parts you don't see.</p><a href="#work" className="hero-inline-link">Explore my work <ArrowUpRight size={20}/></a></Reveal></div>
        <Reveal className="hero-portrait-column" delay={120}><HeroPortrait/></Reveal>
        <div className="hero-right"><Reveal delay={170}><span className="hero-right-code">&lt;connected systems /&gt;</span><h2>Interfaces that connect to the <em>real world.</em></h2><p>BLE / GATT · ESP32 · NFC · Wi-Fi / IP · USB · Native SDKs · WebRTC.</p><div className="hero-buttons"><a href="#engineering" className="button-pill button-dark">Under the hood <ArrowUpRight size={17}/></a><a href={profile.resume} className="button-pill button-outline" download>Download CV <Download size={17}/></a></div></Reveal></div>
      </div><div className="hero-bottom"><div className="container"><div><MapPin size={16}/>{profile.location}</div><div><RotatingSpecialty/></div><a href="#work">SCROLL TO EXPLORE <ArrowDown size={17}/></a></div></div><ScrollMarquee/></section>

      <section className="ticker-band" aria-label="Skills marquee"><div className="ticker-track">{[0,1,2,3].map(i=><div key={i} className="ticker-group">{focus.map(item=><span key={item}>{item} <b>✳</b></span>)}</div>)}</div></section>

      <section className="intro-statement section-pad"><div className="container statement-layout"><Reveal><span className="section-eyebrow">02 / ABOUT THE WORK</span><h2>Good mobile apps don't stop at the <em>screen.</em></h2></Reveal><Reveal delay={120}><p>I build production React Native experiences across healthcare and fintech—and the native hardware connections behind them. That means communicating with sensors, integrating vendor libraries, working with ESP32-based IoT devices, handling offline sync, and recovering when networks drop.</p><div className="statement-stats"><div><CountUp value={2} suffix="+"/><span>Years experience</span></div><div><CountUp value={4}/><span>Production mobile apps</span></div><div><CountUp value={10} suffix="+"/><span>Medical device integrations</span></div></div></Reveal></div></section>

      <DeviceShowcase/>
      <section id="work" className="work-section section-pad"><div className="container"><Reveal><div className="section-header"><div><span className="section-eyebrow">03 / SELECTED WORK</span><h2>Built for real<br/>conditions.</h2></div><p>Healthcare devices, secure finance, authentication, IoT controllers and dependable mobile applications. Visuals below are illustrative mockups; the technical contributions describe my work.</p></div></Reveal><div className="showcase-list">{projects.map((project,index)=><ProjectCard key={project.name} project={project} index={index}/>)}</div><Reveal><div className="project-extra"><span><Activity size={24}/></span><div><small>ANOTHER BUILD / OPEN SOURCE</small><h3>Tapza Care</h3><p>React Native healthcare app project on GitHub.</p></div><a href="https://github.com/NarsingShivakumar/tapza-care-healthcare-react-native" target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={18}/></a></div></Reveal></div></section>
      <WorkIndex/>
      <EngineeringSection/>
      <IoTSection/>
      <ExperienceSection/>
      <section id="skills" className="skills-section section-pad"><div className="container"><Reveal><div className="section-header"><div><span className="section-eyebrow">07 / THE TOOLKIT</span><h2>Tools built for<br/><em>tough problems.</em></h2></div><p>Frontend polish matters. But the hard problems often live in native code, radio protocols, device APIs, data and connectivity.</p></div></Reveal><div className="stack-groups">{skillGroups.map((group,index)=><Reveal delay={index*65} key={group.title}><div className="stack-group"><div><span>0{index+1}</span><h3>{group.title}</h3></div><div className="stack-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div></div></Reveal>)}</div><Reveal><div className="stack-closing"><HeartPulse size={23}/> From Bluetooth packets to production-ready experiences.</div></Reveal></div></section>
      <ContactSection/>
    </main>
    <footer className="footer"><div className="container"><a href="#top" className="footer-monogram">SN<span>.</span></a><div><strong>Shivakumar Narsing</strong><span>Built with React, TypeScript & Inter.</span></div><nav aria-label="Social links"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19}/></a></nav><span className="copyright">© {new Date().getFullYear()}</span></div></footer>
  </>;
}
