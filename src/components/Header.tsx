import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/portfolio';

const links = [
  { label: 'Apps', href: '#device-showcase' },
  { label: 'Work', href: '#work' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'IoT', href: '#iot' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && window.localStorage.getItem('portfolio-theme') === 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    const check = () => {
      const limit = window.innerHeight * .40;
      let current = '';
      links.forEach(({ href }) => {
        const element = document.querySelector(href);
        if (element && element.getBoundingClientRect().top <= limit) current = href;
      });
      setActive(current);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (!open) setNavHidden(y > 260 && y > last + 5);
      if (y < last - 3 || y < 160) setNavHidden(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className={`floating-header ${navHidden ? 'nav-hidden' : ''} ${scrolled ? 'nav-scrolled' : ''}`} onMouseEnter={() => setNavHidden(false)}>
    <nav className="nav-pill" aria-label="Main navigation">
      <a href="#top" className="nav-profile" onClick={() => setOpen(false)}><img src="/portrait.webp" alt=""/><span>Shivakumar N.</span></a>
      <div className="nav-links">{links.map(link => <a key={link.href} className={active === link.href ? 'nav-active' : ''} href={link.href}>{link.label}</a>)}</div>
      <div className="nav-actions">
        <button type="button" className="nav-icon" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <a className="nav-contact" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
        <button type="button" className="nav-icon nav-mobile-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </nav>
    {open && <div className="mobile-menu" id="mobile-menu"><div>{links.map(link => <a key={link.href} onClick={() => setOpen(false)} href={link.href}>{link.label} <ArrowUpRight size={17}/></a>)}</div><a href={profile.resume} className="mobile-menu-resume" download onClick={() => setOpen(false)}>Download resume <Download size={16}/></a><a href="#contact" onClick={() => setOpen(false)}>Get in touch <ArrowUpRight size={17}/></a></div>}
  </header>;
}
