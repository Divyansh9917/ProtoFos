import React, { useEffect, useRef, useState, useMemo } from 'react';

// Single Central Event Config Array
export const ARENA_EVENTS = [
  {
    id: 1,
    code: 'RL',
    name: 'SYNAPSE ARENA',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Train a fighter. Win the arena.',
    clubs: 'VECTOR (Game Dev) × AIC (AI Club)',
    incharge: 'Md. Maaz Ali Haider',
    format: 'Multi-week remote RL training, then a live 10-hour on-ground tournament on shared infrastructure.',
    teamSize: '1–3',
    duration: '10 hrs (Finals)',
    footfall: '~150',
    fee: 'Rs. 100 per person',
    desc: 'Participants train their own reinforcement learning (PPO) fighter for a 2D combat arena under identical rules (same environment, algorithm and compute budget); reward function and model architecture are the only controls.',
    rules: [
      'Fixed env-step budget for all participants.',
      'Judged on tournament result, reward design creativity and trade-off clarity (model capacity vs inference latency).'
    ],
    prizes: ['₹9,000', '₹6,000', '₹4,000']
  },
  {
    id: 2,
    code: 'CF',
    name: 'PYC CODING CONTEST',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Codeforces, offline, knockouts.',
    clubs: 'PyC',
    incharge: 'Harsh Sankhla',
    format: 'Round 1 online 5–7 days (resume shortlist outside; CP contest inside); Round 2 offline at IIIT Bhagalpur, ~5 hrs (top 100 inside + top 50 outside); top 4 knockouts.',
    teamSize: 'Individual only',
    duration: '5 hrs (Offline Round)',
    footfall: '150',
    fee: 'Rs. 100 per person',
    desc: 'Intense competitive programming arena on Codeforces featuring multi-day qualifier stages followed by a high-stakes offline knockout tournament at IIIT Bhagalpur.',
    rules: [
      'Platform: Codeforces.',
      'Round 1: 5–7 days online qualifiers.',
      'Round 2: Top 100 college + top 50 outside qualify for offline finals; top 4 play knockouts.'
    ],
    prizes: ['₹6,000', '₹5,000', '₹4,000']
  },
  {
    id: 3,
    code: 'Q',
    name: 'QUANTA’26 CAMPUS MARKET',
    category: 'Markets',
    catIndex: '03',
    tagline: 'Trade the length of the campus.',
    clubs: 'Krypsis (Quant Club)',
    incharge: 'Sarthak Chhabra',
    format: 'Equal virtual capital, trade positions on the exact longest length of the campus in meters; settle after true length is revealed.',
    teamSize: 'Individual',
    duration: 'Live Festival Session',
    footfall: '~100',
    fee: 'Rs. 100 per person',
    desc: 'Quantitative trading and market-making simulation: trade positions on the exact longest length of the campus in meters. Highest final portfolio wealth wins.',
    rules: [
      'Record all trades in the official ledger.',
      'No collusion or multiple registrations.',
      'Virtual money has no real cash value.',
      'Organizers’ settlement is final.'
    ],
    prizes: ['₹3,000', '₹2,000', '₹1,000']
  },
  {
    id: 4,
    code: 'FPV',
    name: 'DRONE RACING',
    category: 'Robotics',
    catIndex: '02',
    tagline: 'Power draw meets pilot reflex.',
    clubs: 'Robotics and Electronics Club (REC)',
    incharge: 'Keshav Kishore Deo',
    format: 'High-speed pilot laps through a physical obstacle and safety-barriered arena.',
    teamSize: '1–2',
    duration: '3–4 hrs',
    footfall: '~50',
    fee: 'Rs. 100 per person',
    desc: 'FPV drone pilots navigate custom high-voltage quadcopters through an illuminated obstacle course pushing aerodynamics and reaction speeds to the absolute limit.',
    rules: [
      'Safety-barriered track compliance mandatory.',
      'Timed trials with published obstacle penalty metrics.',
      'Technical panel inspection before race clearance.'
    ],
    prizes: ['₹10,000', '₹6,000', '₹4,000']
  },
  {
    id: 5,
    code: 'BOT',
    name: 'ROBOSOCCER + ROBORACE',
    category: 'Robotics',
    catIndex: '02',
    tagline: 'Kick. Race. Outwit.',
    clubs: 'Robotics and Electronics Club (REC)',
    incharge: 'Keshav Kishore Deo',
    format: 'Dual mechanical challenge: high-torque obstacle racing followed by head-to-head robot soccer tournament.',
    teamSize: '2–4',
    duration: '3–4 hrs',
    footfall: '~50',
    fee: 'Rs. 100 per person',
    desc: 'Custom-built ground robots clash in two grueling phases: navigating high-friction raceways and competing in an aggressive, tactical robotic soccer arena.',
    rules: [
      'Chassis dimensions and battery voltage limits enforced.',
      'Safety barrier compliance and technical volunteer check.',
      'Round-robin stages leading to single elimination finals.'
    ],
    prizes: ['₹8,000', '₹6,000', '₹4,000']
  },
  {
    id: 6,
    code: 'SEC',
    name: 'SECURATHON',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Build it secure by design.',
    clubs: 'DevC × Hackelite',
    incharge: 'Nishant Mishra',
    format: '24-hour on-campus cryptography and cybersecurity hackathon (+2–4 hrs buffer).',
    teamSize: '2–4',
    duration: '24 hrs (+buffer)',
    footfall: '~150',
    fee: 'Rs. 100 per person',
    desc: 'An intense 24-hour offensive and defensive security hackathon. Build secure architectures, exploit vulnerability vectors, and implement zero-trust protocols.',
    rules: [
      'Use suitable modern cryptographic algorithms.',
      'Adhere to OWASP Top 10 secure coding guidelines.',
      'Judged on cryptographic soundness, execution speed, and overall security posture.'
    ],
    prizes: ['₹10,000', '₹8,000', '₹4,000']
  }
];

const COORDINATORS = {
  coordinator: 'Divyansh Mishra (Technical Board Nominee)',
  coCoordinator: 'Anushka Srivastava (Technical Board Nominee)',
  dates: '31 Oct – 01 Nov 2026',
  venue: 'IIIT Bhagalpur Campus (TBA)'
};

const CATEGORIES = [
  { id: 'ALL', label: '00 ALL', filter: () => true },
  { id: 'SOFTWARE', label: '01 SOFTWARE & AI', filter: (e) => e.category === 'Software & AI' },
  { id: 'ROBOTICS', label: '02 ROBOTICS', filter: (e) => e.category === 'Robotics' },
  { id: 'MARKETS', label: '03 MARKETS', filter: (e) => e.category === 'Markets' }
];

export const ArenaEvents = () => {
  const eventsWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);

  // Active state
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedDrawerEvent, setSelectedDrawerEvent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filtered events for Competitions
  const filteredCompetitions = useMemo(() => {
    const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory);
    return ARENA_EVENTS.filter(currentCatObj ? currentCatObj.filter : () => true);
  }, [activeCategory]);

  // Group competitions into honeycomb rows: 3, 2, 3, 2...
  const honeycombRows = useMemo(() => {
    const rows = [];
    let currRow = [];
    let targetSize = 3;

    filteredCompetitions.forEach((ev) => {
      currRow.push(ev);
      if (currRow.length === targetSize) {
        rows.push(currRow);
        currRow = [];
        targetSize = targetSize === 3 ? 2 : 3;
      }
    });
    if (currRow.length > 0) {
      rows.push(currRow);
    }
    return rows;
  }, [filteredCompetitions]);

  // Open & Close Drawer
  const openDrawer = (event) => {
    setSelectedDrawerEvent(event);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Infinite Zoom Tunnel Scrub Engine
  useEffect(() => {
    const wrapper = eventsWrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = 9;
    const LOOPS = 3;
    const R = Math.pow(3, 1 / N);

    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Load 9 tunnel frames
    const images = Array.from({ length: N }, (_, i) => {
      const img = new Image();
      img.src = `/tunnel-frames/f_${String(i + 1).padStart(4, '0')}.webp`;
      return img;
    });

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawTunnel = (p) => {
      const W = canvas.width;
      const H = canvas.height;

      if (isReduced) {
        const staticImg = images[0];
        if (staticImg && staticImg.complete) {
          ctx.clearRect(0, 0, W, H);
          const k = Math.max(W / (staticImg.naturalWidth || staticImg.width), H / (staticImg.naturalHeight || staticImg.height));
          const w = (staticImg.naturalWidth || staticImg.width) * k;
          const h = (staticImg.naturalHeight || staticImg.height) * k;
          ctx.drawImage(staticImg, (W - w) / 2, (H - h) / 2, w, h);
        }
        return;
      }

      const f = p * LOOPS * N;
      const i = Math.floor(f);
      const t = f - i;
      const imgA = images[i % N];
      const imgB = images[(i + 1) % N];

      if (!imgA || !imgB || !imgA.complete || !imgB.complete) return;

      ctx.clearRect(0, 0, W, H);

      const drawLayer = (im, scale, alpha) => {
        const iw = im.naturalWidth || im.width;
        const ih = im.naturalHeight || im.height;
        if (!iw || !ih) return;
        const k = Math.max(W / iw, H / ih) * scale;
        const w = iw * k;
        const h = ih * k;
        ctx.globalAlpha = alpha;
        ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
      };

      drawLayer(imgA, 1 + (R - 1) * t, 1);
      drawLayer(imgB, (1 + (R - 1) * t) / R, t);
      ctx.globalAlpha = 1;
    };

    let cur = 0;
    let animId;

    const tick = () => {
      if (!isReduced) {
        const rect = wrapper.getBoundingClientRect();
        const totalDist = wrapper.offsetHeight - window.innerHeight;
        const target = totalDist > 0 ? Math.min(0.999, Math.max(0, -rect.top / totalDist)) : 0;

        cur += (target - cur) * 0.12;
        drawTunnel(cur);

        const pos = cur * (ARENA_EVENTS.length - 1);
        const baseX = Math.min(250, window.innerWidth * 0.22);
        let activeIdx = 0;

        cardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const d = idx - pos;
          const side = idx % 2 === 1 ? 1 : -1;
          const opacity = d < 0 ? Math.max(0, 1 + d * 1.6) : Math.max(0, 1 - d * 0.2);
          const blur = Math.max(0, d) * 0.9;

          cardEl.style.transform = `translate3d(calc(-50% + ${side * baseX}px), -46%, ${-d * 420}px)`;
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
          cardEl.style.zIndex = 100 - Math.round(d * 10);
          cardEl.style.pointerEvents = Math.abs(d) < 0.6 ? 'auto' : 'none';

          const isActive = Math.abs(d) < 0.5;
          if (isActive) {
            activeIdx = idx;
            cardEl.classList.add('on');
          } else {
            cardEl.classList.remove('on');
          }
        });

        setActiveEventIndex(activeIdx);
      }

      animId = requestAnimationFrame(tick);
    };

    if (!isReduced) {
      animId = requestAnimationFrame(tick);
    } else {
      drawTunnel(0);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* =====================================================================
          SECTION A: EVENTS INFINITE ZOOM TUNNEL (#events)
          ===================================================================== */}
      <section 
        id="events" 
        ref={eventsWrapperRef}
        className="relative w-full h-[700vh] bg-[#05060A] select-none"
        aria-label="Events Infinite Zoom Arena"
      >
        <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden">
          {/* Zoom Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />

          {/* Vignette & Soft Gradient Fades into #05060A */}
          <div 
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: `
                radial-gradient(ellipse at 50% 52%, transparent 32%, rgba(5, 6, 10, 0.78) 100%),
                linear-gradient(to bottom, #05060A 0%, rgba(5, 6, 10, 0.6) 14%, transparent 28%, transparent 72%, rgba(5, 6, 10, 0.8) 88%, #05060A 100%)
              `
            }}
            aria-hidden="true"
          />

          {/* Top HUD: Eyebrow + H2 (Keeps 6vh clearance, never overlaps cards) */}
          <div className="absolute top-[calc(26px+env(safe-area-inset-top,0px))] left-0 right-0 text-center z-10 pointer-events-none px-4">
            <div className="inline-flex items-center text-[11px] font-mono font-semibold tracking-[0.24em] uppercase text-[#FFE600] mb-1.5">
              <span className="mr-2 text-[#FFE600]">▍</span>
              <span>03 · EVENTS</span>
            </div>
            <h2 className="font-cyberpunk font-bold italic text-white uppercase text-[clamp(2.3rem,6.4vw,4.8rem)] leading-[0.95] tracking-tight">
              ENTER THE <b className="text-[#FFE600] filter drop-shadow-[0_0_30px_rgba(255,230,0,0.55)]">ARENA</b>
            </h2>
          </div>

          {/* 3D Floating Cards Container */}
          <div 
            id="cards" 
            className="absolute inset-0 [perspective:900px] [transform-style:preserve-3d] z-[4]"
          >
            {ARENA_EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => (cardsRef.current[i] = el)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${ev.name}`}
                onClick={() => openDrawer(ev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDrawer(ev);
                  }
                }}
                className="absolute left-1/2 top-1/2 w-[min(290px,72vw)] h-[min(430px,60vh)] flex flex-col justify-between gap-3 p-[18px] bg-[#080b12ee] border-2 border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_15px_rgba(0,240,255,0.15)] cursor-pointer will-change-transform transition-[border-color,box-shadow] duration-250 focus:outline-none focus:border-[#00F0FF]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))'
                }}
              >
                {/* Top Row: EVT // 0N + ARENA */}
                <div className="flex justify-between items-center text-[10px] font-mono font-semibold tracking-[0.18em] text-[#00F0FF]">
                  <span>EVT // 0{i + 1}</span>
                  <span className="text-[#FFE600]">ARENA</span>
                </div>

                {/* Swappable Art Panel with Outlined Magenta Code */}
                <div className="flex-1 min-h-[140px] grid place-items-center border border-white/10 bg-gradient-to-br from-[#2a0a45] via-[#0d0718] to-[#05060A] relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0, 0, 0, 0.4) 2px 4px)'
                    }}
                  />
                  <span 
                    className="font-cyberpunk font-bold italic text-5xl sm:text-6xl text-transparent tracking-wider"
                    style={{
                      WebkitTextStroke: '1.5px #FF2BD6',
                      textShadow: '0 0 24px rgba(255, 43, 214, 0.7)'
                    }}
                  >
                    {ev.code}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-cyberpunk font-bold italic text-[1.35rem] leading-[1.15] text-white uppercase mb-1">
                    {ev.name}
                  </h3>
                  <p className="font-mono text-xs text-[#8A93A6] line-clamp-2 leading-[1.55]">
                    {ev.tagline}
                  </p>
                </div>

                {/* Footer Row */}
                <div className="flex justify-between items-center text-[10px] font-mono font-semibold tracking-[0.16em] text-[#8A93A6] border-t border-white/10 pt-2">
                  <span>WHEN: TBA</span>
                  <span>WHERE: TBA</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Progress HUD */}
          <div className="absolute bottom-[calc(24px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none select-none">
            <b className="block font-cyberpunk font-bold italic text-3xl leading-none text-[#FFE600] filter drop-shadow-[0_0_20px_rgba(255,230,0,0.5)] mb-1">
              0{activeEventIndex + 1} / 0{ARENA_EVENTS.length}
            </b>
            <span className="text-[11px] font-mono font-semibold tracking-[0.22em] uppercase text-[#8A93A6]">
              {ARENA_EVENTS[activeEventIndex]?.name}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B: COMPETITIONS HONEYCOMB BATTLEFIELD (#competitions)
          ===================================================================== */}
      <section 
        id="competitions"
        className="relative bg-transparent py-28 px-6 sm:px-10 max-w-[1320px] mx-auto z-10 select-none"
        aria-label="Competitions Battlefield"
      >
        {/* Transparent controllable background layer */}
        <div 
          className="comp-bg absolute inset-0 -z-10 pointer-events-none"
          style={{ background: 'var(--comp-bg, none)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060A]/60 via-[#05060A]/85 to-[#05060A]/95" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-10 md:gap-12 items-start">
          {/* Left Column: Categories Sidebar */}
          <aside className="flex flex-col gap-3" aria-label="Competition Categories">
            <div className="mb-1">
              <div className="inline-flex items-center text-[11px] font-mono font-semibold tracking-[0.24em] uppercase text-[#FFE600]">
                <span className="mr-2 text-[#FFE600]">▍</span>
                <span>04 · CATEGORIES</span>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0" role="tablist">
              {CATEGORIES.map((cat) => {
                const count = ARENA_EVENTS.filter(cat.filter).length;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center justify-between px-4 py-3 font-mono font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'text-[#FFE600] border-l-4 border-l-[#FFE600] border-t-white/10 border-r-white/10 border-b-white/10 bg-[#FFE600]/10 shadow-[0_0_15px_rgba(255,230,0,0.15)]'
                        : 'text-[#E8ECF4] border-l-4 border-l-transparent border-t-white/10 border-r-white/10 border-b-white/10 bg-[#080b12cc] hover:text-[#FFE600] hover:border-l-[#FFE600] hover:bg-[#FFE600]/5'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[11px] ml-2 ${isActive ? 'text-[#FFE600]' : 'text-[#8A93A6]'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Column: Dynamic Content Header & Honeycomb Grid */}
          <main className="w-full">
            <div className="flex justify-between items-end pb-4 mb-9 border-b border-white/10">
              <h3 className="font-cyberpunk font-bold italic text-2xl sm:text-3xl text-white uppercase">
                {activeCategory === 'ALL' 
                  ? 'ALL COMPETITIONS' 
                  : CATEGORIES.find(c => c.id === activeCategory)?.label.slice(3)}
              </h3>
              <span 
                className="font-mono font-semibold text-[11px] tracking-[0.2em] text-[#FFE600] uppercase bg-[#FFE600]/10 px-2.5 py-1 border border-[#FFE600]/30"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                }}
              >
                0{filteredCompetitions.length} ARENAS
              </span>
            </div>

            {/* Honeycomb Container */}
            <div className="flex flex-col items-center w-full">
              {honeycombRows.map((row, rIdx) => (
                <div 
                  key={rIdx} 
                  className={`flex justify-center gap-3.5 sm:gap-4 w-full ${
                    rIdx > 0 ? '-mt-[34px] sm:-mt-[42px]' : ''
                  }`}
                >
                  {row.map((ev, idx) => (
                    <div
                      key={ev.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${ev.name}`}
                      onClick={() => openDrawer(ev)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openDrawer(ev);
                        }
                      }}
                      className="group relative w-[150px] sm:w-[190px] h-[173px] sm:h-[219px] cursor-pointer transition-transform duration-250 hover:-translate-y-1.5 focus:outline-none filter hover:drop-shadow-[0_0_25px_rgba(255,230,0,0.55)]"
                    >
                      {/* Gradient Hexagon Border */}
                      <div 
                        className="w-full h-full p-[2px] flex items-center justify-center bg-gradient-to-br from-[#00F0FF] via-[#157aff] to-[#FFE600]"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      >
                        {/* Hexagon Inner Content */}
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center text-center p-3.5 sm:p-4 gap-1 sm:gap-1.5 bg-gradient-to-b from-[#0e1526] via-[#060912] to-[#04060b] relative overflow-hidden"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                          }}
                        >
                          {/* Scanlines in Hex */}
                          <div 
                            className="absolute inset-0 opacity-25 pointer-events-none"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0, 0, 0, 0.35) 2px 4px)'
                            }}
                          />

                          <span 
                            className="font-cyberpunk font-bold italic text-2xl sm:text-3xl text-transparent"
                            style={{
                              WebkitTextStroke: '1.2px #FF2BD6',
                              textShadow: '0 0 16px rgba(255, 43, 214, 0.6)'
                            }}
                          >
                            {ev.code}
                          </span>
                          <h4 className="font-cyberpunk font-bold italic text-xs sm:text-sm text-white uppercase leading-tight max-w-[125px]">
                            {ev.name}
                          </h4>
                          <span className="font-mono font-semibold text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase text-[#FFE600] mt-0.5">
                            {ev.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* =====================================================================
          SHARED DETAIL DRAWER (#dr & #ov)
          ===================================================================== */}
      {/* Blurred Overlay */}
      <div 
        className={`fixed inset-0 bg-[#04060b]/85 backdrop-blur-md z-[100] transition-opacity duration-350 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Right Drawer Panel */}
      <aside 
        id="dr"
        aria-live="polite"
        aria-label="Event Detailed Briefing"
        className={`fixed top-0 right-0 h-screen h-[100svh] w-[min(500px,100%)] z-[105] bg-[#080b11] border-l-2 border-[#FFE600] shadow-[-15px_0_50px_rgba(0,0,0,0.9)] flex flex-col transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-[102%]'
        }`}
      >
        {selectedDrawerEvent && (
          <>
            <div className="flex justify-end p-5 pb-3 border-b border-white/10">
              <button 
                type="button" 
                onClick={closeDrawer}
                className="font-mono font-semibold text-xs tracking-[0.2em] text-[#8A93A6] hover:text-[#FFE600] px-3 py-1.5 border border-white/15 hover:border-[#FFE600] hover:bg-[#FFE600]/10 transition-all cursor-pointer"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                }}
              >
                CLOSE ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-7 flex flex-col gap-4 text-slate-300">
              <div className="font-mono font-semibold text-xs tracking-[0.24em] text-[#00F0FF] uppercase">
                ▍{selectedDrawerEvent.category} // EVT 0{selectedDrawerEvent.id}
              </div>

              <h2 className="font-cyberpunk font-bold italic text-3xl sm:text-4xl leading-tight text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                {selectedDrawerEvent.name}
              </h2>

              <p className="font-mono italic text-sm text-[#FFE600] -mt-2">
                “{selectedDrawerEvent.tagline}”
              </p>

              <p className="font-mono text-sm leading-relaxed text-[#B4BCD0]">
                {selectedDrawerEvent.desc}
              </p>

              {/* Arena Parameters */}
              <div className="font-mono font-semibold text-[10.5px] tracking-[0.22em] text-[#00F0FF] uppercase pt-3.5 border-t border-white/10">
                ARENA PARAMETERS
              </div>

              <dl className="grid grid-cols-[100px_1fr] gap-2.5 text-xs font-mono">
                <dt className="text-[#8A93A6] font-semibold tracking-wider">CLUB</dt>
                <dd className="text-white">{selectedDrawerEvent.clubs}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">INCHARGE</dt>
                <dd className="text-white">{selectedDrawerEvent.incharge}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">FORMAT</dt>
                <dd className="text-white">{selectedDrawerEvent.format}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">TEAM SIZE</dt>
                <dd className="text-white">{selectedDrawerEvent.teamSize}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">DURATION</dt>
                <dd className="text-white">{selectedDrawerEvent.duration}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">FOOTFALL</dt>
                <dd className="text-white">{selectedDrawerEvent.footfall}</dd>
                <dt className="text-[#8A93A6] font-semibold tracking-wider">REG. FEE</dt>
                <dd className="text-[#FFE600] font-semibold">{selectedDrawerEvent.fee}</dd>
              </dl>

              {/* Bounties & Prizes */}
              <div className="font-mono font-semibold text-[10.5px] tracking-[0.22em] text-[#00F0FF] uppercase pt-3.5 border-t border-white/10">
                BOUNTIES & PRIZES
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div 
                  className="bg-[#FFE600]/5 border border-[#FFE600]/40 p-3 text-center"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  <span className="block text-[9px] font-mono font-semibold tracking-wider text-[#FFE600] mb-1">
                    1ST PLACE
                  </span>
                  <b className="font-cyberpunk font-bold italic text-lg sm:text-xl text-[#FFE600]">
                    {selectedDrawerEvent.prizes[0]}
                  </b>
                </div>
                <div 
                  className="bg-[#0e1422] border border-white/15 p-3 text-center"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  <span className="block text-[9px] font-mono font-semibold tracking-wider text-[#8A93A6] mb-1">
                    2ND PLACE
                  </span>
                  <b className="font-cyberpunk font-bold italic text-lg sm:text-xl text-[#FFE600]">
                    {selectedDrawerEvent.prizes[1]}
                  </b>
                </div>
                <div 
                  className="bg-[#0e1422] border border-white/15 p-3 text-center"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  <span className="block text-[9px] font-mono font-semibold tracking-wider text-[#8A93A6] mb-1">
                    3RD PLACE
                  </span>
                  <b className="font-cyberpunk font-bold italic text-lg sm:text-xl text-[#FFE600]">
                    {selectedDrawerEvent.prizes[2]}
                  </b>
                </div>
              </div>

              {/* Protocols & Directives */}
              <div className="font-mono font-semibold text-[10.5px] tracking-[0.22em] text-[#00F0FF] uppercase pt-3.5 border-t border-white/10">
                PROTOCOLS & DIRECTIVES
              </div>

              <ul className="flex flex-col gap-2 font-mono text-xs text-[#C0C8DA] leading-relaxed">
                {selectedDrawerEvent.rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="text-[#00F0FF] text-[10px] mt-0.5">◆</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              {/* Coordinators */}
              <div 
                className="bg-white/[0.03] border border-white/10 p-3 text-[11px] font-mono text-[#8A93A6] flex flex-col gap-1 mt-1"
                style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
              >
                <div><b className="text-white">COORDINATOR:</b> {COORDINATORS.coordinator}</div>
                <div><b className="text-white">CO-COORDINATOR:</b> {COORDINATORS.coCoordinator}</div>
              </div>

              {/* Register CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Registration for ${selectedDrawerEvent.name} will open shortly. Dates: 31 Oct - 01 Nov 2026.`)}
                  className="w-full py-3.5 font-cyberpunk font-bold italic text-base tracking-[0.16em] uppercase text-[#05060A] bg-[#FFE600] hover:bg-white shadow-[0_0_25px_rgba(255,230,0,0.5)] transition-all cursor-pointer"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                  }}
                >
                  REGISTER NOW — {selectedDrawerEvent.fee}
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
