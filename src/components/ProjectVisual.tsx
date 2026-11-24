import { Activity, ArrowUpRight, Bluetooth, CheckCircle2, Cpu, CreditCard, Fingerprint, HeartPulse, LockKeyhole, RadioTower, ShieldCheck, Smartphone, Stethoscope, Wifi } from 'lucide-react';
import type { Project } from '../data/portfolio';

function FrameTop({ name }: { name: string }) {
  return <div className="visual-browser-top"><div className="traffic-lights"><i/><i/><i/></div><span>{name}</span><span className="browser-lock">● live</span></div>;
}

function ReachVisual() {
  return <div className="scene scene-reach">
    <div className="scene-grid"/><div className="reach-ui-window"><FrameTop name="reach / connected care"/><div className="reach-ui-content"><div className="reach-ui-nav"><HeartPulse size={18}/> REACH<span>AI</span><small>Patient overview</small></div><div className="reach-ui-title">Live patient monitoring <span><i/> Devices connected</span></div><div className="health-metrics"><div><span><HeartPulse size={14}/> Heart rate</span><b>74<small>bpm</small></b><em>Normal</em></div><div><span><Activity size={14}/> SpO₂</span><b>98<small>%</small></b><em>Normal</em></div><div><span><Stethoscope size={14}/> Blood pressure</span><b>120/80</b><em>Normal</em></div></div><div className="ecg-window"><span>Live ECG <small>● Streaming</small></span><svg viewBox="0 0 440 75" preserveAspectRatio="none"><path d="M0 40H62L71 32L82 48L100 40H146L155 57L169 6L185 70L201 40H250L265 36L271 43H298L314 60L331 7L346 70L360 40H440" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/></svg></div></div></div>
    <div className="scene-floating scene-floating-reach"><Bluetooth size={16}/><b>Device connected</b><small>BLE / GATT</small><CheckCircle2 size={17}/></div>
    <div className="scene-corner-tag"><RadioTower size={14}/> WEBRTC TELECONSULTATION</div>
  </div>;
}
function JeevikaVisual() {
  return <div className="scene scene-jeevika"><div className="scene-ring"/><div className="phone-frame phone-finance"><div className="phone-notch"/><div className="phone-finance-top"><span>jeevika<span>.</span></span><small>◉</small></div><p>Good morning</p><h4>My finances</h4><div className="finance-balance"><span>Current outstanding</span><strong>₹2,80,560</strong><span>Loan account overview</span><div className="finance-chart">{[22,38,30,54,42,62,51,68,57,82].map((h,i) => <i key={i} style={{ height:`${h}%`}}/>)}</div></div><div className="finance-pay"><CreditCard size={18}/><span>Next EMI<small>Due this month</small></span><b>₹8,250</b></div><div className="finance-button">View payment details <ArrowUpRight size={15}/></div><div className="phone-bottom-nav">⌂ <span>◧</span> ◎</div></div><div className="finance-secure"><ShieldCheck size={21}/><div><b>Android Keystore</b><span>Secure token storage</span></div><CheckCircle2 size={16}/></div></div>;
}
function MetricsVisual() {
  return <div className="scene scene-metrics"><div className="scene-orbit"/><div className="metrics-window"><FrameTop name="health metrics / dashboard"/><div className="metrics-inner"><div className="metrics-side"><HeartPulse size={19}/><span>◻</span><span>▤</span><span>⚙</span></div><div className="metrics-data"><small>YOUR HEALTH AT A GLANCE</small><h4>Health dashboard <ArrowUpRight size={17}/></h4><div className="metrics-big-number"><div><span>Health score</span><b>86<small>/100</small></b><em>↑ Looking good</em></div><div className="ring-chart">86<span>score</span></div></div><div className="metrics-mini"><div><HeartPulse size={15}/> Heart rate <b>74</b></div><div><Activity size={15}/> SpO₂ <b>98%</b></div></div><div className="metrics-report">▤ &nbsp;Annual health report <span>Available ↗</span></div></div></div></div><div className="scene-floating scene-metrics-float"><CheckCircle2 size={19}/> REPORTS READY</div></div>;
}
function AuthVisual() {
  return <div className="scene scene-auth"><div className="scene-ring scene-auth-ring"/><div className="phone-frame auth-device"><div className="phone-notch"/><div className="auth-logo-icon"><LockKeyhole size={33}/></div><span className="auth-welcome">SECURE ACCESS</span><h4>Verify it's you.</h4><p>Enter your one-time security code</p><div className="auth-otp">4&nbsp; 8&nbsp; 2&nbsp; 6&nbsp; 0&nbsp; 1</div><div className="auth-timer"><i/> Refreshing in 00:24</div><div className="auth-touch"><Fingerprint size={32}/><span>Continue with biometrics</span></div></div><div className="auth-secure-chip"><ShieldCheck size={20}/><span>Identity verified</span></div></div>;
}
function ESP32Visual() {
  return <div className="scene scene-esp32"><div className="scene-grid"/><div className="esp32-board"><div className="esp32-pins left">{Array.from({length:11}, (_,i) => <i key={i}/>)}</div><div className="esp32-pcb"><span className="esp32-antenna">▦<br/>▦</span><div className="esp32-chip"><Cpu size={33}/><b>ESP32</b><small>Connected module</small></div><span className="esp32-label">IoT CONTROLLER / WIRELESS</span><span className="esp32-led"/></div><div className="esp32-pins right">{Array.from({length:11}, (_,i) => <i key={i}/>)}</div></div><div className="iot-waves"><i/><i/><i/><Wifi size={26}/></div><div className="iot-phone"><div className="iot-phone-head"><Smartphone size={16}/> Mobile controller</div><div className="iot-phone-status"><span className="status-dot"/> ESP32 online</div><div className="iot-phone-tile"><span>Device status</span><b>Connected</b></div><div className="iot-phone-tile"><span>Live communication</span><b>Active</b></div><div className="iot-phone-button">Send command <ArrowUpRight size={15}/></div></div><div className="scene-corner-tag"><Wifi size={16}/> BLE / WI-FI / LOCAL IP</div></div>;
}

export default function ProjectVisual({ project }: { project: Project }) {
  if (project.video) return <video src={project.video} poster={project.image} className="custom-project-media" controls playsInline preload="metadata" aria-label={`${project.name} demo`} />;
  if (project.image) return <img src={project.image} className="custom-project-media" alt={`${project.name} screenshot`} loading="lazy"/>;
  switch(project.theme) {
    case 'reach': return <ReachVisual/>;
    case 'jeevika': return <JeevikaVisual/>;
    case 'metrics': return <MetricsVisual/>;
    case 'auth': return <AuthVisual/>;
    case 'esp32': return <ESP32Visual/>;
  }
}
