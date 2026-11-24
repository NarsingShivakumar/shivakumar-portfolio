// Edit this file to update personal info, experience, skills and project descriptions.
export const profile = {
name: 'Shivakumar Narsing',
firstName: 'Shivakumar',
role: 'React Native & Connected Systems Engineer',
location: 'Hyderabad, India',
email: 'narsingshivakumar10@gmail.com',
linkedin: 'https://www.linkedin.com/in/narshingshivakumar/',
github: 'https://github.com/NarsingShivakumar',
resume: '/Shivakumar_Narsing_Resume.pdf',
introduction:
'I build more than interfaces. I build the connections behind them: React Native, native Android, BLE/GATT, NFC, IoT and ESP32 integrations, USB, third-party SDKs, local device networking and reliable offline-first systems.',
};

export type Project = {
number: string;
label: string;
name: string;
tagline: string;
description: string;
contributions: string[];
technologies: string[];
theme: 'reach' | 'jeevika' | 'metrics' | 'auth' | 'esp32';
category: 'Healthcare' | 'Fintech' | 'Security' | 'IoT';
// / Optional path, e.g. '/projects/reach.webp'; overrides mockup /
image?: string;
/* Optional path, e.g. '/projects/reach-demo.mp4'; overrides image and mockup */
video?: string;
link?: string;
linkLabel?: string;
};

export const projects: Project[] = [
{
number: '01',
label: 'Healthcare · IoT · Telemedicine',
name: 'REACH',
tagline: 'Care that reaches beyond the clinic.',
description:
'A connected healthcare platform bringing doctors, patients, and diagnostic devices together. My work focused on hardware integrations, real-time consultations, and reliable mobile workflows.',
contributions: [
'Integrated 10+ healthcare devices using BLE/GATT, Bluetooth Classic, USB, third-party vendor SDKs, and Java/Kotlin native bridges.',
'Built NFC-assisted pairing, BLE notifications and sensor packet parsing for ECG, stethoscope, SpO₂, BP, glucose and other diagnostics.',
'Built local device-to-device communication for controller/host workflows using Wi-Fi hotspots, LAN IP connections and connection-state handling.',
'Developed WebRTC consultations, camera/microphone switching, Socket.IO signaling and offline-first vitals/report workflows.',
],
technologies: ['React Native CLI', 'BLE / GATT', 'NFC / USB', 'Hotspot / IP Networking', 'Vendor SDKs', 'WebRTC', 'Android Native', 'WatermelonDB'],
theme: 'reach',
category: 'Healthcare',
link: 'https://www.reachaimedtech.com/',
linkLabel: 'Explore REACH platform',
},
{
number: '02',
label: 'Fintech · Security · Location',
name: 'Jeevika Nidhi',
tagline: 'Financial workflows, designed for trust.',
description:
'A mobile financial-services experience supporting loan management, repayments, and identity verification with carefully designed security and location-aware workflows.',
contributions: [
'Developed loan application, approval, payment gateway, EMI, and KYC workflows.',
'Applied Android Keystore, encryption, and tokenization for sensitive application data.',
'Implemented GPS geofencing and location verification for field operations.',
],
technologies: ['React Native', 'Android Keystore', 'Payments', 'OCR / KYC', 'Geofencing'],
theme: 'jeevika',
category: 'Fintech',
},
{
number: '03',
label: 'Healthcare · Health records',
name: 'REACH AI Health Metrics',
tagline: 'A clearer picture of employee health.',
description:
'A companion mobile experience that makes important medical data easy to view and understand for employees with appropriate access.',
contributions: [
'Built role-based flows for viewing health records and diagnostic results.',
'Created structured vitals displays, report screens, and in-app PDF viewing.',
'Connected secure APIs with reusable mobile UI components.',
],
technologies: ['React Native', 'Redux Toolkit', 'REST APIs', 'PDF Viewer'],
theme: 'metrics',
category: 'Healthcare',
},
{
number: '04',
label: 'Enterprise · Authentication',
name: 'Mobile Authenticator',
tagline: 'Security that stays out of the way.',
description:
'A mobile authenticator focused on simple, secure access for enterprise users without adding unnecessary complexity.',
contributions: [
'Developed biometric sign-in and device identity verification flows.',
'Implemented time-based one-time passwords and secure token storage.',
'Designed clear, accessible authentication states for mobile.',
],
technologies: ['React Native', 'Biometrics', 'TOTP', 'Secure Storage'],
theme: 'auth',
category: 'Security',
},
{
number: '05',
label: 'Embedded IoT · ESP32 · Connected apps',
name: 'ESP32 & IoT Connected Apps',
tagline: 'Small devices. Real connections.',
description:
'Mobile-side IoT integration work connecting ESP32-class hardware and device controllers over BLE and local Wi-Fi. Designed around exchanging data, reflecting device state and keeping connectivity understandable.',
contributions: [
'Worked on IoT app connectivity for ESP32 and similar connected devices through mobile-to-device links.',
'Built device state and command workflows around Bluetooth and hotspot / local-IP networking.',
'Focused on connection lifecycle, sensor or device data handling, and responsive monitoring interfaces.',
],
technologies: ['ESP32', 'IoT Apps', 'BLE / GATT', 'Wi-Fi', 'Local IP', 'Device-to-device'],
theme: 'esp32',
category: 'IoT',
},
];

export const capabilities = [
{
number: '01',
title: 'Native modules & vendor SDKs',
detail: 'Integrating vendor medical-device SDKs into React Native using custom Java/Kotlin modules, native bridging, permissions, and real-time callbacks.',
},
{
number: '02',
title: 'BLE, NFC & device networking',
detail: 'BLE/GATT, Bluetooth Classic, NFC pairing, USB/UVC, plus hotspot and local IP-based device-to-device communication between connected hardware.',
},
{
number: '03',
title: 'Real-time systems & offline sync',
detail: 'WebRTC and Socket.IO signaling, local host/controller communication, network recovery, offline queues, WatermelonDB sync and background notifications.',
},
{
number: '04',
title: 'Secure by design',
detail: 'Biometrics, token storage, Android Keystore, encrypted data, and location-aware app workflows.',
},
];

export const skillGroups = [
{ title: 'React Native & Android', items: ['React Native CLI', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'Custom Native Modules', 'Native Bridges / Modules'] },
{ title: 'IoT, embedded & third-party SDKs', items: ['Healthcare IoT', 'ESP32 / IoT Apps', 'Embedded Device Connectivity', 'Device-to-Device Communication', 'Wi-Fi Hotspot Connections', 'IP-based Local Networking', 'LAN Host / Controller', 'Vendor SDK Integration', 'NFC-assisted Pairing', 'BLE Scanning / GATT', 'Bluetooth Classic', 'USB / UVC', 'Packet Parsing', 'Connection Recovery', 'ECG / Stethoscope / Spirometry'] },
{ title: 'Architecture & real time', items: ['Redux Toolkit', 'RTK Query', 'WatermelonDB', 'SQLite', 'Offline-first Sync', 'WebRTC', 'Socket.IO Signaling', 'FCM', 'Camera / Mic Switching'] },
{ title: 'Security & release', items: ['Android Keystore', 'Encryption / Tokenization', 'Biometrics', 'OCR / KYC', 'GPS / Geofencing', 'Native Debugging', 'Google Play / App Store', 'Git / GitHub'] },
];

export const career = [
{
role: 'Associate Mobile Application Developer',
company: 'Leadwinner Corp Pvt Ltd',
period: 'Dec 2024 — Present',
description: 'Building React Native applications for healthcare IoT and fintech, including BLE/NFC/USB integrations, ESP32 and connected-device apps, vendor SDKs, hotspot/IP networking, native Android modules, offline sync and secure production releases.',
},
];

// Engineering narratives are deliberately framed as technical experience,
// not claims of sole ownership of a company product or unverified metrics.
export type EngineeringFlow = {
id: string;
shortTitle: string;
category: string;
overline: string;
title: string;
description: string;
steps: string[];
details: string[];
tech: string[];
};

export const engineeringFlows: EngineeringFlow[] = [
{
id: 'esp32',
shortTitle: 'ESP32 & IoT',
category: 'Connected controllers',
overline: 'CONNECTED DEVICE APPLICATIONS',
title: 'An app that talks to the physical world.',
description: 'ESP32 and similar connected hardware bring device discovery, live status, commands and reconnecting into the mobile experience.',
steps: ['ESP32 / sensor', 'BLE or Wi-Fi', 'Data / commands', 'Mobile controller'],
details: [
'Connect mobile interfaces to ESP32-class IoT devices using the available wireless channel.',
'Build monitoring and control flows around device state, messages and data readings.',
'Handle network availability, disconnects and understandable connection feedback for the user.',
],
tech: ['ESP32', 'IoT apps', 'BLE / GATT', 'Wi-Fi', 'Device control', 'Local IP'],
},
{
id: 'ble',
shortTitle: 'BLE & medical IoT',
category: 'Wireless protocols',
overline: 'DEVICE COMMUNICATION',
title: 'From sensor packets to trusted measurements.',
description: 'Healthcare hardware integration means handling the entire device lifecycle, not just displaying the final reading.',
steps: ['BLE discovery', 'GATT connect', 'Notify & parse', 'Vitals / report'],
details: [
'Discover and connect devices; subscribe to characteristic notifications and parse real-time measurement payloads.',
'Handle disconnects, reconnection, permissions and device-specific behavior on Android hardware.',
'Turn streams from ECG, AI stethoscope, SpO₂, BP and other sensors into usable mobile workflows.',
],
tech: ['BLE', 'GATT', 'Bluetooth Classic', 'Java / Kotlin', 'React Native', 'Device SDKs'],
},
{
id: 'native',
shortTitle: 'Native & SDKs',
category: 'Android integrations',
overline: 'BEYOND JAVASCRIPT',
title: 'Bridge React Native to real hardware.',
description: 'I work across the JavaScript/native boundary to integrate capabilities that off-the-shelf RN components cannot provide.',
steps: ['Vendor SDK / USB', 'Kotlin / Java', 'RN native bridge', 'App feature'],
details: [
'Integrate third-party medical SDKs, device permissions, native callbacks and custom hardware interfaces.',
'Implement Android modules that surface native events and device data to React Native screens and state.',
'Work with external USB/UVC cameras, audio devices and platform-specific debugging during deployment.',
],
tech: ['Android SDK', 'Java', 'Kotlin', 'Native Modules', 'USB / UVC', 'Third-party SDKs'],
},
{
id: 'local',
shortTitle: 'Hotspot & IP links',
category: 'Device-to-device networking',
overline: 'LOCAL NETWORK COMMUNICATION',
title: 'Connect devices without a cloud dependency.',
description: 'Local connectivity lets a host device and its controller communicate directly over a shared Wi-Fi network or a phone/device hotspot, using reachable IP endpoints.',
steps: ['Join hotspot / LAN', 'Connect by IP', 'Exchange events', 'Handle reconnection'],
details: [
'Set up host-to-controller communication on the same hotspot or local Wi-Fi network using IP-address-based endpoints.',
'Coordinate device-to-device commands, test state and real-time messages between connected applications.',
'Account for Wi-Fi loss, stale connection state, host reachability and reconnecting after the local network returns.',
],
tech: ['Device-to-device', 'Wi-Fi Hotspot', 'Local IP', 'LAN', 'Host / Controller', 'Connection Lifecycle'],
},
{
id: 'realtime',
shortTitle: 'Real-time media',
category: 'Calls & signaling',
overline: 'LOW-LATENCY COMMUNICATION',
title: 'Reliable calls and real-time events.',
description: 'Teleconsultation requires careful coordination of signaling, media tracks, device routing and network changes.',
steps: ['Socket signaling', 'WebRTC peers', 'Audio / video', 'Consultation UI'],
details: [
'Build patient–doctor video consultations with camera and microphone switching.',
'Use Socket.IO for consultation events and connection state across patient and specialist flows.',
'Support multilingual transcription/translation flows, notifications and production troubleshooting.',
],
tech: ['WebRTC', 'Socket.IO', 'Media Devices', 'Audio / Video', 'Firebase FCM'],
},
{
id: 'offline',
shortTitle: 'Offline-first data',
category: 'Sync & architecture',
overline: 'RESILIENCE FIRST',
title: 'Keep health workflows moving offline.',
description: 'Connectivity can disappear during field deployments, so critical measurements should survive temporary network failures.',
steps: ['Capture vitals', 'Local database', 'Sync / reconcile', 'Backend API'],
details: [
'Persist patient vitals and reports locally using SQLite and WatermelonDB.',
'Model offline queues and synchronization workflows rather than relying on uninterrupted internet.',
'Use Redux Toolkit / RTK Query and REST APIs to manage application and server state.',
],
tech: ['WatermelonDB', 'SQLite', 'Redux Toolkit', 'RTK Query', 'REST APIs'],
},
{
id: 'security',
shortTitle: 'Secure mobile flows',
category: 'Identity & fintech',
overline: 'SENSITIVE DATA HANDLING',
title: 'Build trust into every workflow.',
description: 'In financial and healthcare apps, security and context-aware access are part of engineering—not an afterthought.',
steps: ['Identity / KYC', 'Secure storage', 'Policy checks', 'Protected workflow'],
details: [
'Apply Android Keystore, encryption, tokenization and secure storage to sensitive mobile workflows.',
'Integrate biometric authentication, device identity verification and OTP/TOTP flows.',
'Implement GPS geofencing, payment-related constraints, and capture location context where required.',
],
tech: ['Android Keystore', 'Encryption', 'Tokenization', 'Biometrics', 'OCR / KYC', 'Geofencing'],
},
];

export const diagnosticDevices = [
'6 / 12-lead ECG', 'AI stethoscope', 'Spirometry', 'Blood pressure',
'SpO₂', 'Glucometer', 'Weight scale', 'Hemoglobin', 'Creatinine',
'Lipid profile', 'USB camera / audio', 'ESP32 / IoT controllers',
];