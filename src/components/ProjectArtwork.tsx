import { Activity, ArrowUpRight, Bluetooth, Check, CircleDollarSign, Fingerprint, HeartPulse, LockKeyhole, Radio, ShieldCheck, Smartphone, Stethoscope, TrendingUp, Video } from 'lucide-react';
import type { Project } from '../data/portfolio';

type Theme = Project['theme'];

type Props = { theme: Theme; featured?: boolean };

function PulseWave({ short = false }: { short?: boolean }) {
  return (
    <svg className="pulse-wave" viewBox="0 0 420 100" preserveAspectRatio="none" role="img" aria-label="Stylized ECG heart rate waveform">
      <defs><linearGradient id="pulseGradient" x1="0" x2="1"><stop stopColor="#56cabd"/><stop offset="1" stopColor="#2d7e78"/></linearGradient></defs>
      <path d="M0 54 H58 L70 47 L78 59 L93 54 L108 54 L122 80 L141 8 L161 92 L178 54 H231 L242 48 L250 57 L262 54 L290 54 L307 79 L327 11 L343 91 L362 54 H420" fill="none" stroke="url(#pulseGradient)" strokeWidth={short ? 4 : 3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReachArtwork({ featured }: { featured?: boolean }) {
  return (
    <div className={`artwork art-reach ${featured ? 'artwork-featured' : ''}`} aria-label="Illustration of REACH healthcare vitals and teleconsultation application">
      <div className="reach-ambient reach-ambient-one" />
      <div className="reach-ambient reach-ambient-two" />
      <div className="art-float reach-device"><Bluetooth size={14} /> Connected devices <b>10+</b></div>
      <div className="reach-monitor">
        <div className="mock-header">
          <div className="mock-brand"><HeartPulse size={17} /> reach<span>AI</span></div>
          <div className="mock-connection"><span /> Patient connected</div>
        </div>
        <div className="reach-monitor-main">
          <div className="reach-column">
            <div className="mock-overline">PATIENT MONITORING</div>
            <div className="mock-patient">Live health overview <span>•••</span></div>
            <div className="vital-grid">
              <div className="vital-card"><span><HeartPulse size={15} /> Heart rate</span><strong>74 <small>bpm</small></strong><em>Normal</em></div>
              <div className="vital-card"><span><Activity size={15} /> SpO₂</span><strong>98 <small>%</small></strong><em>Normal</em></div>
              <div className="vital-card"><span><Stethoscope size={15} /> Blood pressure</span><strong>120<small>/80</small></strong><em>Normal</em></div>
            </div>
            <div className="ecg-box"><div><b>Live ECG</b><span><i /> Monitoring</span></div><PulseWave /></div>
          </div>
          <div className="reach-consult">
            <div className="doctor-art"><div className="doctor-hair" /><div className="doctor-face" /><div className="doctor-coat" /><div className="doctor-shirt" /><div className="doctor-steth" /></div>
            <div className="consult-name"><strong>Doctor connected</strong><span>Live video consultation</span></div>
            <div className="consult-controls"><span><Video size={15} /></span><span><Activity size={15} /></span><span className="hang-up">✕</span></div>
          </div>
        </div>
      </div>
      <div className="art-float reach-live"><Radio size={14} /> <span className="live-dot" /> LIVE CONSULTATION</div>
    </div>
  );
}

function JeevikaArtwork() {
  return (
    <div className="artwork art-jeevika" aria-label="Illustration of secure Jeevika Nidhi banking and EMI payment app">
      <div className="jeevika-orb orb-one"/><div className="jeevika-orb orb-two" />
      <div className="finance-phone">
        <div className="phone-island" />
        <div className="finance-heading"><span className="finance-symbol">j<span>.</span></span><span><small>GOOD MORNING</small><b>Welcome back</b></span><span className="finance-avatar">S</span></div>
        <div className="balance-card"><small>YOUR LOAN OVERVIEW</small><strong>₹ 2,80,560</strong><span>Current outstanding balance</span><div className="balance-chart"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
        <div className="finance-section-title">Upcoming payment <span>View all →</span></div>
        <div className="payment-mini"><div className="payment-icon"><CircleDollarSign size={19}/></div><div><b>Monthly installment</b><small>Due on the 5th</small></div><strong>₹ 8,250</strong></div>
        <div className="finance-cta">Make a payment <ArrowUpRight size={15}/></div>
        <div className="finance-bottom"><span>⌂<small>Home</small></span><span>▥<small>Loans</small></span><span>◎<small>Account</small></span></div>
      </div>
      <div className="finance-trust"><ShieldCheck size={18}/><div><b>Protected access</b><span>Encrypted • Verified</span></div><Check size={16}/></div>
    </div>
  );
}

function MetricsArtwork() {
  return (
    <div className="artwork art-metrics" aria-label="Illustration of employee healthcare measurements and health reports">
      <div className="metrics-orbit" />
      <div className="metrics-browser">
        <div className="metrics-topbar"><span className="metrics-logo"><HeartPulse size={17}/> reach<span>AI</span></span><span>YOUR HEALTH SPACE</span><span className="metrics-user">SN</span></div>
        <div className="metrics-body">
          <div className="metrics-kicker">YOUR HEALTH AT A GLANCE</div>
          <h4>Health dashboard <span>↗</span></h4>
          <div className="metrics-summary"><div><small>Health score</small><strong>86<span>/100</span></strong><em>↑ Looking good</em></div><div className="donut-chart"><div>86<span>score</span></div></div></div>
          <div className="metrics-row"><div><HeartPulse size={18}/><span>Heart rate</span><strong>74 <small>bpm</small></strong></div><div><Activity size={18}/><span>SpO₂</span><strong>98 <small>%</small></strong></div></div>
          <div className="metrics-report"><span><span className="report-icon">▤</span><span><b>Annual health report</b><small>PDF available</small></span></span><ArrowUpRight size={17}/></div>
        </div>
      </div>
      <div className="metrics-float"><TrendingUp size={15}/> Your reports, all in one place</div>
    </div>
  );
}

function AuthArtwork() {
  return (
    <div className="artwork art-auth" aria-label="Illustration of mobile authenticator with one-time passcode and fingerprint login">
      <div className="auth-circle ring-1" /><div className="auth-circle ring-2" /><div className="auth-circle ring-3" />
      <div className="auth-phone"><div className="phone-island"/><div className="auth-logo"><LockKeyhole size={27}/></div><div className="auth-welcome">Secure sign in<span>Verify your identity</span></div><div className="auth-code">4 8 2 6 0 1</div><div className="auth-progress"><span/></div><div className="auth-expire">One-time code · refreshes automatically</div><div className="auth-fingerprint"><Fingerprint size={34}/><span>Use fingerprint instead</span></div><div className="auth-bottom-mark">SHIELDED ACCESS</div></div>
      <div className="auth-float"><ShieldCheck size={18}/><span><b>Identity verified</b><small>End-to-end protected</small></span></div>
    </div>
  );
}

export default function ProjectArtwork({ theme, featured = false }: Props) {
  switch (theme) {
    case 'reach': return <ReachArtwork featured={featured} />;
    case 'jeevika': return <JeevikaArtwork />;
    case 'metrics': return <MetricsArtwork />;
    case 'auth': return <AuthArtwork />;
  }
}

export function HeroArtwork() {
  return (
    <div className="hero-stage" aria-label="Artwork showing a real-time connected-health app">
      <div className="hero-grid" />
      <div className="stage-topline"><span>DESIGNED TO CONNECT</span><span>01 / 04</span></div>
      <div className="stage-circle stage-circle-one"/><div className="stage-circle stage-circle-two" />
      <div className="hero-app-window">
        <div className="hero-app-top"><div className="app-dots"><i/><i/><i/></div><span>REACH AI / PATIENT MONITOR</span><span><Radio size={12}/> LIVE</span></div>
        <div className="hero-app-interior"><span className="hero-app-label">TODAY'S VITALS <span>● connected</span></span><div className="hero-app-numbers"><strong>74<span>BPM</span></strong><strong>98<span>SPO₂</span></strong></div><div className="hero-app-chart"><PulseWave short /></div></div>
      </div>
      <div className="hero-call-card"><div className="hero-call-icon"><Video size={20}/></div><div><strong>Consultation live</strong><span>Doctor & patient connected</span></div><span className="hero-call-indicator"/></div>
      <div className="hero-foreground-letter">S<span>N.</span></div>
      <div className="stage-bottomline"><span>HARDWARE × SOFTWARE × HUMAN EXPERIENCE</span><span><Smartphone size={16}/> RN</span></div>
    </div>
  );
}
