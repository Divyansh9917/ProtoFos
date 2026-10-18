export const FESTIVAL_INFO = {
  name: "PROTOFOS",
  year: "2026",
  tagline: "A Futuristic Technical Festival",
  dates: "31 OCT — 01 NOV 2026",
  location: "NEO-CAMPUS METROPOLIS / SECTOR 7",
  positioning: "Ideas / People / Technology / A Brighter Tomorrow",
  badge: "SYSTEM STATUS: REIGNITED // PROTOFOS PROTOCOL",
  stats: [
    { label: "PRIZE POOL", value: "₹5,00,000+", detail: "Across all districts" },
    { label: "COLLEGES", value: "45+ INSTITUTES", detail: "Pan-national participation" },
    { label: "ENGINEERS", value: "2,500+ HACKERS", detail: "Hardware & software innovators" },
    { label: "CAMPUS CLUBS", value: "8 SPECIALIZED CLUBS", detail: "United engineering forces" }
  ]
};

export const INTRO_CONTENT = {
  sectionNumber: "01",
  label: "THE BEGINNING OF A NEW TECHNICAL ERA",
  title: "PROTOFOS 2026",
  lead: "The Technical Board proposes to conduct a 2-day flagship technical festival on 31st October – 1st November featuring multi-club collaborative challenges, cybernetic arenas, and high-impact hackathons.",
  paragraphs: [
    "Designed to be the flagship technical event of the academic year, this festival will bring together the brightest engineering minds across multiple institutions to compete, collaborate, and innovate.",
    "Breaking away from traditional, siloed competitions, ProtoFos 2026 features a comprehensive lineup of multi-disciplinary events spanning advanced software development, robotics and hardware engineering, and high-stakes entrepreneurship challenges.",
    "By leveraging deep collaboration between various campus clubs, this event will transform the campus into a dynamic hub of technological excellence, peer-to-peer learning, and startup culture."
  ],
  metadata: [
    { key: "TIMEFRAME", val: "48 CONSECUTIVE HOURS" },
    { key: "CLEARANCE", val: "OPEN INTER-COLLEGIATE" },
    { key: "COORDINATES", val: "28.6139° N, 77.2090° E" },
    { key: "CITY GRID", val: "NEO-DISTRICT ACTIVE" }
  ]
};

export const WHY_PROTOFOS_MODULES = [
  {
    id: "01",
    tag: "INTERDISCIPLINARY FUSION",
    title: "FOSTERING INTERDISCIPLINARY INNOVATION",
    subtitle: "BREAKING ISOLATION, BUILDING ECOSYSTEMS",
    description: "Modern technology does not exist in isolation. By integrating software hackathons, hardware robotics (like Drone Racing and RoboSoccer), and entrepreneurship pitches into a unified festival, we challenge students to experience the full lifecycle of product development, from writing backend code and wiring circuits to pitching a viable business model.",
    highlight: "Full product lifecycle from firmware to market capitalization."
  },
  {
    id: "02",
    tag: "INSTITUTIONAL PRESTIGE",
    title: "ELEVATING INSTITUTIONAL PROFILE & NETWORKING",
    subtitle: "FORGING REGIONAL TECHNICAL SUPREMACY",
    description: "Hosting a large-scale, inter-college event positions the campus as a regional leader in technical education. It attracts top talent from neighboring engineering institutions, establishing a competitive and collaborative network that directly benefits our student body and strengthens our broader technical ecosystem.",
    highlight: "Attracting 2,500+ elite engineers and industry liaisons."
  },
  {
    id: "03",
    tag: "PRACTICAL HARDWARE & CODE",
    title: "PRACTICAL, HIGH-STAKES ENGINEERING APPLICATION",
    subtitle: "THE PROVING GROUND BEYOND THEORY",
    description: "Standard coursework provides the theoretical foundation, but ProtoFos provides the proving ground. Our specialized events require students to navigate real-world engineering constraints that cannot be simulated in a classroom.\n\nWhether optimizing inference latency for a reinforcement learning algorithm or managing the power draw on a racing drone, students will face immediate, tangible consequences for their design trade-offs.",
    highlight: "Sub-millisecond inference and high-G aerodynamic telemetry."
  },
  {
    id: "04",
    tag: "VENTURE CREATION",
    title: "CATALYZING AN ENTREPRENEURIAL MINDSET",
    subtitle: "FROM PROTOTYPE TO FOUNDER LAUNCHPAD",
    description: "Technical brilliance requires business acumen to scale. By prominently featuring entrepreneurship events alongside deep-tech hackathons, we bridge the gap between building a functional prototype and bringing a product to market.\n\nThis encourages engineers to think like founders, equipping them with the strategic mindset needed to launch successful ventures.",
    highlight: "Direct VC pitches, seed grants, and incubation pathways."
  }
];

export const EVENTS_DATA = [
  {
    id: "hackathon",
    number: "DISTRICT // 01",
    name: "PROTO-HACK 2026",
    district: "HACKATHON DISTRICT",
    category: "SOFTWARE & AI",
    date: "31 OCT 10:00 — 01 NOV 22:00",
    prize: "₹1,50,000",
    teamSize: "2 - 4 Members",
    club: "TURING AI & CODING SOCIETY",
    image: "/images/district_hackathon.jpg",
    description: "A 36-hour non-stop algorithmic crucible. Build production-ready deep-tech solutions spanning autonomous agents, decentralized networks, neural interfaces, and high-frequency edge compute.",
    tags: ["Generative AI", "Distributed Systems", "Web3", "Cybersecurity"],
    specifications: [
      { label: "Format", value: "36-Hour Offline Hackathon" },
      { label: "Hardware Provided", value: "NVIDIA Edge Compute Nodes" },
      { label: "Mentorship", value: "FAANG & Deep-Tech Engineers" }
    ]
  },
  {
    id: "robotics",
    number: "DISTRICT // 02",
    name: "MECHACLASH & BOT ARENA",
    district: "ROBOTICS DISTRICT",
    category: "HARDWARE & MECHATRONICS",
    date: "31 OCT 14:00 — 01 NOV 17:00",
    prize: "₹1,00,000",
    teamSize: "3 - 5 Members",
    club: "MECHADYN ROBOTICS SOCIETY",
    image: "/images/district_robotics.jpg",
    description: "High-voltage combat robotics and autonomous terrain conquest. Witness 15kg & 30kg metal warriors battle in a bulletproof reinforced polycarbonate cage with pneumatic flippers and spinning drum weapons.",
    tags: ["Combat Robotics", "Computer Vision", "Embedded Systems", "Actuators"],
    specifications: [
      { label: "Arena", value: "10x10m Bulletproof Enclosure" },
      { label: "Weight Categories", value: "15kg Featherweight & 30kg Middleweight" },
      { label: "Safety Protocols", value: "Fail-safe RF Interlocks Required" }
    ]
  },
  {
    id: "drone-racing",
    number: "DISTRICT // 03",
    name: "AEROSTORM: NIGHT FPV RACING",
    district: "DRONE DISTRICT",
    category: "AVIONICS & AERONAUTICS",
    date: "31 OCT 18:30 — 22:30",
    prize: "₹90,000",
    teamSize: "Solo / Pilot + Spotter",
    club: "AEROAURA AVIONICS CLUB",
    image: "/images/district_drone_racing.jpg",
    description: "Ultra-fast micro & 5-inch FPV quadcopters screaming through a 3D neon obstacle corridor at 140km/h. Illuminated laser gates, vertical drop spirals, and high-G turns under night skies.",
    tags: ["FPV Telemetry", "Aerodynamics", "RF Signal Processing", "High-G Flight"],
    specifications: [
      { label: "Track Length", value: "650m Multi-Level Skyline Circuit" },
      { label: "Video Protocol", value: "HDZero / Walksnail / Analog 5.8GHz" },
      { label: "Timing System", value: "ImmersionRC LapRF Transponders" }
    ]
  },
  {
    id: "startup-pitch",
    number: "DISTRICT // 04",
    name: "APEX VENTURE PITCH",
    district: "STARTUP DISTRICT",
    category: "ENTREPRENEURSHIP",
    date: "01 NOV 11:00 — 16:00",
    prize: "₹1,00,000 + SEED EQUITY",
    teamSize: "1 - 4 Founders",
    club: "E-CELL VENTURE GUILD",
    image: "/images/district_startup.jpg",
    description: "Pitch your disruptive hardware, SaaS, climate-tech or robotics venture directly to active angel syndicates, venture capitalists, and veteran founders. Real funding commitments on the floor.",
    tags: ["Product Pitch", "Unit Economics", "Term Sheets", "Market GTM"],
    specifications: [
      { label: "Pitch Format", value: "5-Min Pitch + 7-Min Investor Grilling" },
      { label: "Jury", value: "Tier-1 VCs & Unicorn CTOs" },
      { label: "Perks", value: "$50K Cloud Credits for Finalists" }
    ]
  },
  {
    id: "robo-soccer",
    number: "DISTRICT // 05",
    name: "CYBERSTRIKE: ROBO SOCCER",
    district: "MECHA SPORTS DISTRICT",
    category: "AUTONOMOUS & RC",
    date: "01 NOV 13:00 — 18:00",
    prize: "₹60,000",
    teamSize: "2 - 3 Pilots",
    club: "AUTOMATION & DRIVES CELL",
    image: "/images/district_robotics.jpg",
    description: "Fast-paced mechatronic soccer tournament. Custom-fabricated high-traction bots equipped with kicker solenoids and dribbler rollers competing in sudden-death 5-minute tactical matches.",
    tags: ["Chassis Dynamics", "Wireless RF", "PID Control", "Pneumatics"],
    specifications: [
      { label: "Pitch Surface", value: "High-Grip Synthetic Turf" },
      { label: "Ball Tracking", value: "Standard Orange High-Contrast Ball" },
      { label: "Control", value: "Bluetooth / 2.4GHz Direct Link" }
    ]
  },
  {
    id: "tech-talks",
    number: "DISTRICT // 06",
    name: "NEXUS KEYNOTE SUMMIT",
    district: "INNOVATION DISTRICT",
    category: "FRONTIER TECH CONFERENCES",
    date: "31 OCT & 01 NOV (PARALLEL)",
    prize: "CERTIFICATION & ACCESS",
    teamSize: "Individual Pass",
    club: "TECHNICAL BOARD LIAISON",
    image: "/images/district_startup.jpg",
    description: "Unfiltered discussions with scientists and engineering directors pushing the boundaries of humanoid robotics, quantum silicon, neural decoding, and sovereign AI infrastructure.",
    tags: ["Humanoid Robots", "Silicon Photonic", "Sovereign AI", "Space Systems"],
    specifications: [
      { label: "Auditorium", value: "Sector-7 Holographic Amphitheatre" },
      { label: "Q&A Session", value: "Direct Interactive Microphone Rounds" },
      { label: "Clearance", value: "All Pass Holders Welcome" }
    ]
  }
];

export const CLUBS_DATA = [
  {
    id: "turing",
    code: "SEC-01",
    name: "TURING AI & CODING SOCIETY",
    domain: "ALGORITHMS & MACHINE INTELLIGENCE",
    lead: "Software Architecture & LLM Alignment",
    projects: "Proto-Hack, Neural Latency Benchmarks, OS Kernels",
    status: "ACTIVE",
    badge: "LVL-4 CLEARANCE",
    color: "#00F0FF"
  },
  {
    id: "mechadyn",
    code: "SEC-02",
    name: "MECHADYN ROBOTICS SOCIETY",
    domain: "MECHATRONICS, MOTORS & ACTUATION",
    lead: "Combat Robotics & Autonomous Navigation",
    projects: "30kg Battlebots, Quadruped Rig, RoboSoccer",
    status: "ACTIVE",
    badge: "LVL-4 CLEARANCE",
    color: "#FFE600"
  },
  {
    id: "aeroaura",
    code: "SEC-03",
    name: "AEROAURA AVIONICS LAB",
    domain: "AEROSPACE & HIGH-SPEED FPV FLIGHT",
    lead: "Drone Aerodynamics & Autonomous Swarms",
    projects: "Night FPV Racing, Telemetry Array, VTOL Drone",
    status: "ACTIVE",
    badge: "LVL-3 CLEARANCE",
    color: "#00F0FF"
  },
  {
    id: "ecell",
    code: "SEC-04",
    name: "E-CELL VENTURE GUILD",
    domain: "STARTUP INCUBATION & TECH VENTURES",
    lead: "Commercialization & Capital Advisory",
    projects: "Apex Pitch, Founder Fellowship, VC Mixer",
    status: "ACTIVE",
    badge: "LVL-3 CLEARANCE",
    color: "#FFE600"
  },
  {
    id: "cybersec",
    code: "SEC-05",
    name: "CYBERSEC SYNDICATE",
    domain: "OFFENSIVE SECURITY & CRYPTOGRAPHY",
    lead: "Zero-Day Exploitation & Secure Enclaves",
    projects: "CTF Cyber-Gauntlet, Reverse Engineering Arena",
    status: "ACTIVE",
    badge: "LVL-4 CLEARANCE",
    color: "#00F0FF"
  },
  {
    id: "creativetech",
    code: "SEC-06",
    name: "KINETIC & MOTION LABS",
    domain: "CREATIVE COMPUTING & LIGHT ARCHITECTURE",
    lead: "Holographic Projection & Interactive FX",
    projects: "Cyberpunk Stage Scenography, Laser Installations",
    status: "ACTIVE",
    badge: "LVL-2 CLEARANCE",
    color: "#FFE600"
  }
];

export const TIMELINE_DATA = [
  {
    day: "DAY 01",
    date: "31 OCTOBER 2026",
    theme: "IGNITION & PRELIMINARY COMBAT",
    schedule: [
      {
        time: "09:00 — 10:30",
        title: "OPENING CEREMONY // PROTOCOL INITIATION",
        location: "Main Neo-Amphitheater",
        district: "INNOVATION DISTRICT",
        description: "Official inaugural address by the Technical Board, keynote by frontier AI leaders, and unveiling of the Protofos 2026 holographic trophy."
      },
      {
        time: "10:30 — 12:00",
        title: "PROTO-HACK 2026: PROBLEM STATEMENT DROP",
        location: "Cyber Arena Hall A",
        district: "HACKATHON DISTRICT",
        description: "36-hour clock begins. 85 shortlisted teams receive challenge statements spanning AI Agents, Web3 Infra, and Edge Compute."
      },
      {
        time: "12:00 — 14:00",
        title: "ROBO-SOCCER HEATS: ROUND OF 32",
        location: "Sector 7 Mecha Pitch",
        district: "ROBOTICS DISTRICT",
        description: "Rapid knockout rounds testing bot acceleration, kicker solenoids, and pilot reflexes."
      },
      {
        time: "14:30 — 17:30",
        title: "MECHACLASH COMBAT: WEAPON VERIFICATION & ROUND 1",
        location: "Reinforced Combat Cage",
        district: "ROBOTICS DISTRICT",
        description: "Featherweight & Middleweight bots collide. High-impact spinners, lifters, and pneumatic wedges."
      },
      {
        time: "18:30 — 21:30",
        title: "AEROSTORM: NIGHT FPV DRONE TIME TRIALS",
        location: "Skyline Neon Gate Circuit",
        district: "DRONE DISTRICT",
        description: "Qualifying runs through illuminated gate obstacles under stadium spotlights with real-time HUD streaming."
      },
      {
        time: "22:00 — LATE",
        title: "MIDNIGHT HACKATHON SPRINTS & SYNTHWAVE CHILLOUT",
        location: "Dev Terminals",
        district: "HACKATHON DISTRICT",
        description: "Midnight pizza drops, mentor code reviews, and live ambient electronic sets."
      }
    ]
  },
  {
    day: "DAY 02",
    date: "01 NOVEMBER 2026",
    theme: "CLIMAX, PITCHES & CONQUEST",
    schedule: [
      {
        time: "09:00 — 11:30",
        title: "PROTO-HACK JURY EVALUATION & CODE FREEZE",
        location: "Cyber Arena Hall A",
        district: "HACKATHON DISTRICT",
        description: "Final commits pushed. Top 10 teams selected for main stage demonstrations."
      },
      {
        time: "11:30 — 14:00",
        title: "APEX VENTURE PITCH: FOUNDER BATTLE",
        location: "Venture Amphitheater",
        district: "STARTUP DISTRICT",
        description: "Shortlisted hardware & software startups present to top angels and VCs for term-sheet negotiations."
      },
      {
        time: "14:30 — 16:30",
        title: "MECHACLASH GRAND FINALS & ROBO-SOCCER CHAMPIONSHIP",
        location: "Central Arena",
        district: "ROBOTICS DISTRICT",
        description: "Uncensored championship bouts. Sparks, titanium armor shreds, and trophy clashes."
      },
      {
        time: "17:00 — 18:30",
        title: "AEROSTORM: HIGH-STAKES DRONE FINALS",
        location: "Skyline Track",
        district: "DRONE DISTRICT",
        description: "Top 8 pilots in sudden-death 4-lap dogfight through laser rings."
      },
      {
        time: "19:00 — 21:00",
        title: "MEGA CLOSING CEREMONY & PRIZE CEREMONY",
        location: "Main Neo-Amphitheater",
        district: "INNOVATION DISTRICT",
        description: "Awarding of ₹5,00,000+ prize pool, felicitating campus clubs, and ceremonial light finale."
      }
    ]
  }
];
