# Shivakumar Narsing — Portfolio

Personal engineering portfolio highlighting production work across **React Native**, **Android Native Modules (Java/Kotlin)**, **Medical IoT (BLE, USB, NFC, ESP32)**, **Device-to-Device / Local IP Networking**, **WebRTC Teleconsultation**, and **Offline-First Mobile Architecture**.

**Live Site:** [shivakumarnarsing.vercel.app](https://shivakumarnarsing.vercel.app/)

---

## Featured Engineering Work

- **REACH (Rapid Emergency Attentive Care Hotline):** Cross-platform telemedicine and clinical kiosk platform integrating 10+ medical devices (hematology analyzers, ECG, SpO2, BP monitors, glucometers) via BLE, USB Serial, NFC, and TCP/IP sockets over Wi-Fi/Hotspot, paired with real-time WebRTC video consultations and multilingual speech workflows.
- **REACH AI Health Metrics:** Role-based mobile health analytics application for viewing diagnostic reports, clinical certificates, vital-sign trends, and structured medical records.
- **Jeevika Nidhi:** Financial services mobile application featuring loan origination workflows, payment gateway integrations, GPS-based geofencing restrictions, and geotagged KYC document verification.
- **Mobile Authenticator:** Enterprise security utility implementing biometric authentication, hardware device-ID binding, encrypted token storage, and offline TOTP generation.

---

## Portfolio Highlights

- **Interactive Engineering Workflows:** Step-by-step architectural breakdowns covering BLE/GATT streaming, ESP32/I2S firmware integration, NFC & local Hotspot/TCP-IP device discovery, WebRTC media pipelines, and SQLite/WatermelonDB offline sync.
- **Editorial UI & Accessibility:** Built with React 18, TypeScript, and Vite using a restrained light/dark surface system, keyboard-navigable project index, responsive breakpoints, and full `prefers-reduced-motion` support.
- **Guided Tour (`KushiGuide`):** Custom interactive SVG companion offering an 8-stop walkthrough across projects, engineering workflows, and experience.

---

## Tech Stack

- **Framework:** React 18, TypeScript, Vite
- **Styling & Motion:** Custom CSS variables, IntersectionObserver reveals, reduced-motion media queries
- **Deployment:** Vercel

---

## Local Development

### Prerequisites
- Node.js `20.19+` or `22.12+`
- npm

### Setup & Commands

```bash
# Install dependencies
npm install

# Start local dev server (binds to 0.0.0.0 for LAN device testing)
npm run dev

# Run TypeScript checks
npm run typecheck

# Create production build
npm run build

# Preview production bundle
npm run preview
```

---

## Project Structure

```text
shivakumar-portfolio/
├── public/
│   ├── projects/                 # Project media and demo captures
│   ├── Shivakumar_Narsing_Resume.pdf
│   ├── portrait.webp
│   ├── og-cover.png
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── DeviceShowcase.tsx    # Interactive mobile UI showcase
│   │   ├── EngineeringSection.tsx# Selectable hardware & systems workflows
│   │   ├── ExperienceSection.tsx # Career & education timeline
│   │   ├── HeroPortrait.tsx      # Timed specialty & portrait presentation
│   │   ├── KushiGuide.tsx        # Interactive SVG guide & 8-stop tour
│   │   ├── ProjectVisual.tsx     # Project cards & media renderer
│   │   └── WorkIndex.tsx         # Interactive project directory
│   ├── data/
│   │   └── portfolio.ts          # Profile, projects, skills & engineering data
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
└── index.html
```

---

## Contact

- **Portfolio:** [shivakumarnarsing.vercel.app](https://shivakumarnarsing.vercel.app/)
- **LinkedIn:** [linkedin.com/in/narshingshivakumar](https://www.linkedin.com/in/narshingshivakumar/)
- **GitHub:** [github.com/NarsingShivakumar](https://github.com/NarsingShivakumar)
- **Email:** narsingshivakumar10@gmail.com
