/** Continuous, seamless name marquee. CSS handles all motion. */
const MARQUEE_TEXT = 'SHIVAKUMAR NARSING — MOBILE & CONNECTED SYSTEMS ENGINEER — ';

export default function ScrollMarquee() {
  return (
    <div className="hero-big-marquee" aria-hidden="true">
      <div className="hero-big-marquee-track">
        <span className="hero-big-marquee-copy">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
        <span className="hero-big-marquee-copy">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}
