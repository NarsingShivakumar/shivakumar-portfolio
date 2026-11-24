# Shivakumar Narsing — Interactive Developer Portfolio

An original React 18 + TypeScript + Vite portfolio with a clean, reference-inspired editorial layout and extensive motion and interactions. It is customized for Shivakumar's work in React Native, native Android, medical IoT, BLE, NFC, ESP32, USB, vendor SDKs, WebRTC, local IP networking and offline-first applications.

## Quick start

Prerequisites: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Visit the **Local** URL shown in your terminal. The dev server binds to `0.0.0.0`, so devices on the same Wi-Fi can open the **Network** URL, provided the firewall/router allows it.

```bash
npm run typecheck
npm run build
npm run preview
```

Vite builds the static site into `dist/`; deploy it on Vercel by choosing Vite, building with `npm run build` and publishing `dist/`. For Netlify or GitHub Pages, use the same build output (configure a base path for project subpaths as needed).

## Folder structure

```text
shivakumar-portfolio/
├── public/
│   ├── portrait.webp                # Your uploaded portrait
│   ├── Shivakumar_Narsing_Resume.pdf
│   ├── projects/ASSETS.md           # Instructions for real screenshots/videos
│   ├── favicon.svg
│   ├── og-cover.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── KushiGuide.tsx          # Original Kushi-style pet & 8-stop tour
│   │   ├── CustomCursor.tsx         # Responsive ring/dot cursor
│   │   ├── DeviceShowcase.tsx       # Interactive phone screens and categories
│   │   ├── EngineeringSection.tsx  # Technical workflows, selectable
│   │   ├── ExperienceSection.tsx   # Editorial career and education rows
│   │   ├── Header.tsx              # Floating navbar, menu, theme, scroll behavior
│   │   ├── HeroPortrait.tsx        # Full-photo, timer-driven professional slideshow
│   │   ├── MagneticMotion.tsx      # Hover magnet effects
│   │   ├── NoiseBackdrop.tsx       # Animated particle/noise canvas
│   │   ├── ProjectVisual.tsx       # Custom project mockups, screenshot fallback
│   │   ├── Reveal.tsx              # IntersectionObserver fade-ins
│   │   ├── ScrollMarquee.tsx       # Scroll-reactive hero headline
│   │   ├── SiteMotion.tsx          # Page progress, back-to-top, count-up
│   │   └── WorkIndex.tsx           # Interactive project directory
│   ├── data/portfolio.ts           # ALL editable project, profile and skill data
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.*.json
```

## Features

- Clean, restrained editorial design; white/soft-gray surfaces and deep-green accent; Inter typography.
- Session-based intro counter + curtain; respects `prefers-reduced-motion`.
- Desktop custom cursor and magnetic hover affordances; no custom cursor on touch screens.
- Canvas dot field, **automatic full-photo portrait slideshow (no code overlay or mouse movement)**, scroll-velocity marquee and rotating specialty.
- Floating pill navigation with active section highlighting, scroll hide/show and theme switcher.
- **Kushi (walking guide)**: An independently drawn SVG character that **roams automatically around the visible screen** with walking feet, directional turns, and short rest stops. Hovering pauses movement; dragging works with a mouse, finger, or pen. Release Kushi to resume roaming after 1.6 seconds. Click/tap Kushi to start the existing eight-stop guided tour (Back/Next, arrow keys, Esc, hide/restore). During the tour roaming pauses and the speech bubble stays within viewport bounds. Kushi adapts to mobile screen sizes and respects the system reduced-motion setting.
- Interactive CSS phone gallery and project picker with pause/resume and arrow buttons. **These are illustrative mockups**, not actual screenshots from private apps.
- Stacked responsive project cards with technical contributions and technologies; hover-responsive project index; real screenshots can override sample art.
- Engineering workflows for BLE, ESP32/IoT, native SDKs, local hotspot/IP, real-time media, offline-first sync and security.
- Experience, education, technology stack, copy email, mailto link, and résumé download.
- Responsive breakpoints; WCAG-oriented focus behavior; accessible button labels; motion-reduction support.

## Editing your information

**`src/data/portfolio.ts`** owns profile name, email, role, location, GitHub, LinkedIn, résumé, projects, descriptions, technology tags, capabilities, and engineering steps. The visible contact email is `narsingshivakumar10@gmail.com`.

**Actual screenshots / videos**: Put e.g. `reach.webp` or `jeevika.mp4` in `public/projects/`, then add to the corresponding project:

```ts
image: '/projects/reach.webp',
// or
video: '/projects/reach-demo.mp4',
```

**Kushi's movement**: In `src/components/KushiGuide.tsx`, adjust `WALK_SPEED` (currently 60 pixels/second), `REST_MIN_MS`, `REST_MAX_MS`, and `DRAG_RESUME_MS` (1600 ms). Waypoints are chosen in `chooseWaypoint()`, clamped to viewport bounds. The walking feet and bob animation are in `src/styles.css` under `kushi-walk-bob` / `kushi-step`. On a system configured for **Reduce motion**, autonomous roaming stops (dragging and tour still work).

**Kushi's dialogue**: Update the `stops` array in the same component; the section IDs must match `src/App.tsx`. Adjust the `KushiArt` SVG for a different mascot. No unsupported metrics or external status API calls are made.

**Real mobile screenshots**: The conceptual phone gallery is in `src/components/DeviceShowcase.tsx`. Replace the `Screen` component with real app captures only when you have permission and screenshots available.

**Styles and motion**: `src/styles.css`, `src/components/SiteMotion.tsx`, `src/components/ScrollMarquee.tsx`, and `src/components/MagneticMotion.tsx`. The portrait presentation rotates automatically every 5.2 seconds between Mobile Engineering, Connected Devices, and Real-Time Systems. It has manual selectors, pause/resume, visibility-aware playback and reduced-motion support. Edit its messages or interval in `src/components/HeroPortrait.tsx`.

## Contact links

- Email: `narsingshivakumar10@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/narshingshivakumar/`
- GitHub: `https://github.com/NarsingShivakumar`

## About the reference

This project borrows **design patterns**, not the original site's source code or artwork, from the public Gowtham portfolio (`https://github.com/Gowtham8940/GowthamPortfolio`) and its design notes. The original repo did not show a root LICENSE file at the time of development. This implementation uses original React components, an original Kushi robot drawing and project-specific mockups.

## Verification

Source code was parsed with TypeScript's transpiler and the CSS with PostCSS in the authoring environment. A complete `npm run build` could not run there because npm package downloads were unavailable (`EAI_AGAIN`); install dependencies in your development environment and run typecheck/build before deploying.


## Continuous name marquee

`src/components/ScrollMarquee.tsx` now renders two identical text strips.
`src/styles.css` uses `name-marquee-loop` for a seamless 25-second leftward animation,
without cursor or scroll-driven JavaScript. To change speed, edit `25s`.
If the device requests **reduced motion**, the site's accessibility styles intentionally disable animations.
