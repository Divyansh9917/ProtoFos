import React, { useState, useEffect } from 'react';
import { ArrowUp, Instagram, Linkedin, Github, MessageSquare, Terminal } from 'lucide-react';

export const Footer = () => {
  const [latency, setLatency] = useState(12);

  // Live latency change every 2-3s between 9-24ms
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (24 - 9 + 1)) + 9);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const directoryLinks = [
    { name: 'HOME', href: '#hero', active: true },
    { name: 'DESCENT', href: '#descent', active: false },
    { name: 'EVENTS', href: '#events', active: false },
    { name: 'COMPETITIONS', href: '#competitions', active: false },
    { name: 'SCHEDULE', href: '#schedule', active: false },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: 'Discord',
      href: 'https://discord.com',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#04070b] text-slate-300 overflow-hidden select-none"
      aria-label="Protofos Central System Terminal"
    >
      {/* =====================================================================
          1. TOP EDGE: 2PX NEON LINE (CYAN -> YELLOW -> MAGENTA) + SCANNING GLITCH
          ===================================================================== */}
      {/* Soft gradient fade from previous section to avoid hard cut */}
      <div className="absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-[#04070b] pointer-events-none z-20" />

      {/* 1px Ultra-Thin Neon Laser Line */}
      <div className="relative z-30 w-full h-[1px] bg-gradient-to-r from-[#19e3f5] via-[#f6e81e] to-[#ff2bd6] shadow-[0_0_6px_rgba(25,227,245,0.4)] overflow-hidden">
        {/* Scanning glitch segment (every ~6s) */}
        <div className="footer-glitch-scan absolute top-0 h-full w-24 bg-white shadow-[0_0_8px_#ffffff,0_0_4px_#19e3f5]" />
      </div>

      {/* =====================================================================
          2. BACKGROUND: 2-LAYER INLINE SVG SKYLINE + FLICKERING WINDOW LIGHTS
             + SCANLINES OVERLAY + BOTTOM VIGNETTE (<15KB)
          ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* City Skyline Silhouette (Inline SVG with 2 layers, 6-8% opacity, positioned at bottom) */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64 sm:h-80 md:h-96 object-cover"
          viewBox="0 0 1440 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Distant City Skyscrapers (8% opacity, cyan tint) */}
          <g opacity="0.08" fill="#19e3f5">
            <rect x="0" y="160" width="45" height="200" />
            <rect x="55" y="110" width="60" height="250" />
            <polygon points="85,60 83,110 87,110" />
            <rect x="125" y="180" width="50" height="180" />
            <rect x="185" y="130" width="75" height="230" />
            <rect x="270" y="80" width="65" height="280" />
            <polygon points="302,30 300,80 305,80" />
            <rect x="345" y="150" width="55" height="210" />
            <rect x="410" y="120" width="80" height="240" />
            <rect x="500" y="170" width="60" height="190" />
            <rect x="570" y="70" width="70" height="290" />
            <polygon points="605,20 603,70 607,70" />
            <rect x="650" y="140" width="50" height="220" />
            <rect x="710" y="100" width="85" height="260" />
            <rect x="805" y="160" width="65" height="200" />
            <rect x="880" y="90" width="75" height="270" />
            <polygon points="917,40 915,90 920,90" />
            <rect x="965" y="130" width="60" height="230" />
            <rect x="1035" y="170" width="55" height="190" />
            <rect x="1100" y="110" width="70" height="250" />
            <rect x="1180" y="80" width="80" height="280" />
            <polygon points="1220,35 1218,80 1222,80" />
            <rect x="1270" y="150" width="60" height="210" />
            <rect x="1340" y="120" width="100" height="240" />
          </g>

          {/* Layer 2: Foreground Heavy Highrises (7% opacity, darker tone with sharp spires) */}
          <g opacity="0.07" fill="#0e1828" stroke="#19e3f5" strokeWidth="0.5">
            <rect x="20" y="190" width="70" height="170" />
            <rect x="100" y="140" width="55" height="220" />
            <rect x="165" y="210" width="65" height="150" />
            <rect x="240" y="160" width="80" height="200" />
            <rect x="330" y="200" width="50" height="160" />
            <rect x="390" y="150" width="90" height="210" />
            <rect x="490" y="190" width="60" height="170" />
            <rect x="560" y="130" width="65" height="230" />
            <rect x="635" y="180" width="55" height="180" />
            <rect x="700" y="150" width="75" height="210" />
            <rect x="785" y="210" width="65" height="150" />
            <rect x="860" y="140" width="80" height="220" />
            <rect x="950" y="190" width="65" height="170" />
            <rect x="1025" y="160" width="55" height="200" />
            <rect x="1090" y="180" width="80" height="180" />
            <rect x="1180" y="140" width="70" height="220" />
            <rect x="1260" y="190" width="65" height="170" />
            <rect x="1335" y="160" width="90" height="200" />
          </g>

          {/* Random Window Lights (Yellow & Cyan Dots with slow CSS opacity flicker) */}
          <g>
            {/* Yellow Windows (Flicker Pattern A) */}
            <circle cx="115" cy="155" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="125" cy="175" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="260" cy="180" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="290" cy="110" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="430" cy="140" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="585" cy="95" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="730" cy="120" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="895" cy="115" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="1120" cy="135" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="1205" cy="105" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="1360" cy="145" r="1.5" fill="#f6e81e" className="flicker-dot-a" />

            {/* Cyan Windows (Flicker Pattern B) */}
            <circle cx="75" cy="130" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="195" cy="150" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="310" cy="190" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="450" cy="165" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="615" cy="150" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="750" cy="170" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="835" cy="185" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="930" cy="160" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="1060" cy="180" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="1235" cy="160" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="1380" cy="180" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
          </g>
        </svg>

        {/* Scanline CRT overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.8) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Ambient bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, transparent 35%, #04070b 95%)',
          }}
        />
      </div>

      {/* =====================================================================
          MAIN CONTAINER: RESPONSIVE (<900px columns stack, brand upar, links 2-col)
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-10 relative z-10">

        {/* Main Grid: below 900px stacks cleanly */}
        <div className="flex flex-col min-[900px]:grid min-[900px]:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-10">

          {/* =================================================================
              3 & 4 & 5. BRAND BLOCK (col-span-5)
              ================================================================= */}
          <div className="w-full min-[900px]:col-span-5 relative overflow-hidden bg-[#070d18]/60 border border-[#19e3f5]/25 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-between">
            {/* Peeche bahut bada ghost outline text "PROTOFOS" (1px stroke, opacity .06), aadha neeche se cut */}
            <div
              aria-hidden="true"
              className="absolute -bottom-7 -left-3 text-[85px] sm:text-[115px] font-cyberpunk font-black italic tracking-tighter select-none pointer-events-none leading-none z-0"
              style={{
                WebkitTextStroke: '1px #19e3f5',
                color: 'transparent',
                opacity: 0.06,
              }}
            >
              PROTOFOS
            </div>

            <div className="space-y-4 relative z-10">
              {/* Logo + Title */}
              <div className="flex items-center gap-3.5">
                <div
                  className="p-1.5 bg-[#04070b] border border-[#f6e81e] shadow-[0_0_12px_rgba(246,232,30,0.35)] flex-shrink-0"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
                  }}
                >
                  <img
                    src="/protofos-logo.png"
                    alt="Protofos Official Logo"
                    className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(246,232,30,0.7)]"
                  />
                </div>
                <div>
                  <h3 className="footer-glitch-title inline-block cursor-pointer font-cyberpunk font-bold italic text-2xl sm:text-3xl text-white tracking-widest leading-none">
                    PROTOFOS <span className="text-[#f6e81e] drop-shadow-[0_0_12px_rgba(246,232,30,0.6)]">2026</span>
                  </h3>
                  <span className="block font-spacemono text-[10px] sm:text-[11px] text-[#19e3f5] tracking-[0.2em] uppercase mt-1">
                    IIIT BHAGALPUR TECHNICAL BOARD
                  </span>
                </div>
              </div>

              {/* Tagline "IDEAS TODAY // A BRIGHTER TOMORROW" in yellow */}
              <div className="pt-1">
                <p className="font-cyberpunk font-bold text-xs sm:text-sm tracking-wider text-[#f6e81e] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e]" />
                  IDEAS TODAY // A BRIGHTER TOMORROW
                </p>
              </div>

              {/* Paragraph #aab4c0, line-height 1.7 */}
              <p className="text-[#aab4c0] text-xs sm:text-[13.5px] leading-[1.7]">
                The premier annual technical fest pushing boundaries in robotics, algorithmic engineering,
                cybersecurity, and space avionics. Built by student innovators to illuminate the future.
              </p>
            </div>

            {/* 5. Status Strip in Clip-Corner HUD Box */}
            <div className="mt-6 pt-3 relative z-10">
              <div
                className="px-3.5 py-2 bg-[#04070b]/90 border border-[#19e3f5]/35 flex flex-wrap items-center gap-2 text-[10px] font-spacemono text-[#8793a2]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                <div className="flex items-center gap-1.5 text-[#19e3f5] font-bold">
                  {/* Cyan blinking dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19e3f5] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#19e3f5]" />
                  </span>
                  <span>GRID: ONLINE</span>
                </div>
                <span className="text-[#19e3f5]">•</span>
                <span className="text-slate-200">
                  LATENCY: <span className="text-[#f6e81e] font-bold">{latency}ms</span>
                </span>
                <span className="text-[#19e3f5]">•</span>
                <span className="text-[#19e3f5]">CIPHER: 256-BIT</span>
                <span className="text-[#8793a2]">// NIGHT CITY</span>
              </div>
            </div>
          </div>

          {/* =================================================================
              6 & 7. RIGHT COLUMNS: 01 // DIRECTORY & 02 // TRANSMISSIONS (col-span-7)
              ================================================================= */}
          <div className="w-full min-[900px]:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* COLUMN 01 // DIRECTORY */}
            <div className="bg-[#070d18]/60 border border-[#18222e] p-6 backdrop-blur-sm flex flex-col justify-between">
              <div>
                {/* Heading with square marker */}
                <div className="flex items-center text-xs font-spacemono text-[#19e3f5] tracking-widest uppercase pb-3 border-b border-[#18222e] mb-4">
                  <span className="w-2 h-2 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e] inline-block mr-2" />
                  <span className="font-bold">01 // DIRECTORY</span>
                </div>

                {/* Links: Space Mono uppercase, hover yellow, left slide-in "▸" arrow 150ms */}
                <ul className="space-y-2">
                  {directoryLinks.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`group flex items-center py-1 font-spacemono uppercase text-xs tracking-wider transition-colors duration-150 ${item.active ? 'text-[#f6e81e]' : 'text-[#8793a2] hover:text-[#f6e81e]'
                          }`}
                      >
                        {/* Slide-in arrow: cyan to yellow on hover, 150ms */}
                        <span
                          className={`inline-block mr-2 text-xs transition-all duration-150 transform ${item.active
                              ? 'text-[#f6e81e] translate-x-0 opacity-100'
                              : 'text-[#19e3f5] group-hover:text-[#f6e81e] -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                            }`}
                        >
                          ▸
                        </span>
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-[#18222e] flex items-center justify-between text-[9px] font-spacemono text-[#8793a2]">
                <span>INDEX // ACTIVE</span>
                <span className="text-[#19e3f5]">SEC_ID: 0x26</span>
              </div>
            </div>

            {/* COLUMN 02 // TRANSMISSIONS & RETURN TO SKYLINE */}
            <div className="bg-[#070d18]/60 border border-[#18222e] p-6 backdrop-blur-sm flex flex-col justify-between">
              <div>
                {/* Heading with square marker */}
                <div className="flex items-center text-xs font-spacemono text-[#19e3f5] tracking-widest uppercase pb-3 border-b border-[#18222e] mb-4">
                  <span className="w-2 h-2 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e] inline-block mr-2" />
                  <span className="font-bold">02 // TRANSMISSIONS</span>
                </div>

                {/* Socials: Lucide icons, 36px clip-corner buttons, hover glow */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="w-9 h-9 bg-[#04070b] border border-[#19e3f5]/30 hover:border-[#f6e81e] text-[#19e3f5] hover:text-[#f6e81e] flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_15px_rgba(246,232,30,0.5)] group"
                      style={{
                        clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                      }}
                    >
                      <span className="transition-transform duration-150 group-hover:scale-110">
                        {s.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 7. RETURN TO SKYLINE Button */}
              <div>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full py-3 px-4 bg-transparent hover:bg-[#f6e81e] text-[#f6e81e] hover:text-[#04070b] border-2 border-[#f6e81e] shadow-[0_0_12px_rgba(246,232,30,0.25)] hover:shadow-[0_0_24px_rgba(246,232,30,0.8)] transition-all duration-200 flex items-center justify-center gap-2 text-xs font-cyberpunk font-bold italic uppercase tracking-widest cursor-pointer group/btn"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  }}
                >
                  <ArrowUp className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>RETURN TO SKYLINE</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* =====================================================================
            8. BOTTOM BAR: COPYRIGHT + LEGAL LINKS + CORNER BRACKETS
            ===================================================================== */}
        <div className="pt-6 border-t border-[#18222e] flex flex-col md:flex-row items-center justify-between gap-4 text-[10.5px] font-spacemono text-[#8793a2]">

          {/* Left bracket & copyright */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="text-[#19e3f5] font-bold">[</span>
            <span>&copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. IIIT BHAGALPUR.</span>
            <span className="text-[#19e3f5] font-bold">]</span>
          </div>

          {/* Legal links with cyan bullet separators & yellow hover */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-[#19e3f5] font-bold">[</span>
            <a href="#hero" className="hover:text-[#f6e81e] transition-colors">
              PRIVACY POLICY
            </a>
            <span className="text-[#19e3f5]">•</span>
            <a href="#hero" className="hover:text-[#f6e81e] transition-colors">
              TERMS OF SERVICE
            </a>
            <span className="text-[#19e3f5]">•</span>
            <a href="#hero" className="hover:text-[#f6e81e] transition-colors">
              CODE OF CONDUCT
            </a>
            <span className="text-[#19e3f5] font-bold">]</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
