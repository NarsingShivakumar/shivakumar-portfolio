import { ArrowUpRight, Download } from 'lucide-react';
import Reveal from './Reveal';
import { profile } from '../data/portfolio';

const details = [
  'Developing production React Native applications for healthcare, medical IoT and financial workflows.',
  'Building Java/Kotlin native Android modules and third-party SDK integrations for BLE, NFC, USB and specialized hardware.',
  'Implementing WebRTC consultation, Socket.IO events, offline-first sync, Android security and device-to-device networking.',
];

export default function ExperienceSection() {
  return <section id="experience" className="experience-section experience-editorial section-pad"><div className="container">
    <Reveal><div className="section-header"><div><span className="section-eyebrow">05 / EXPERIENCE</span><h2>Hands-on work.<br/><em>Real-world systems.</em></h2></div><p>Focused on the technology that powers mobile products: from the native Android layer to connected devices, real-time media, security and reliable release engineering.</p></div></Reveal>
    <div className="editorial-experience-list">
      <Reveal><article className="editorial-experience-item"><div className="editorial-experience-meta"><span>2024 — PRESENT</span><span>FULL-TIME · HYDERABAD</span></div><div className="editorial-experience-body"><span className="experience-kind">PROFESSIONAL EXPERIENCE</span><h3>Associate Mobile Application Developer</h3><p className="experience-company">Leadwinner Corp Pvt Ltd</p><p>Building React Native mobile applications across healthcare IoT and financial services, connecting mobile software to real-world hardware and native Android capabilities.</p><ul>{details.map(item => <li key={item}>{item}</li>)}</ul><div className="editorial-experience-tags"><span>React Native</span><span>Java / Kotlin</span><span>BLE / NFC / USB</span><span>WebRTC</span><span>WatermelonDB</span></div></div></article></Reveal>
      <Reveal><article className="editorial-experience-item"><div className="editorial-experience-meta"><span>EDUCATION</span><span>TELANGANA, INDIA</span></div><div className="editorial-experience-body"><span className="experience-kind">ACADEMIC FOUNDATION</span><h3>Master of Science, Computer Science</h3><p className="experience-company">Kakatiya University</p><p>Formal training in software development, computer science principles and technical problem-solving, applied to real-world mobile systems.</p></div></article></Reveal>
    </div><Reveal><a className="experience-download" href={profile.resume} download>Download résumé <Download size={16}/><ArrowUpRight size={16}/></a></Reveal>
  </div></section>;
}
