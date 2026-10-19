import React, { useState } from 'react';
import { ArrowUp, Terminal, Shield, Globe, Cpu, Wifi, Radio } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'HOME', href: '#hero', code: '01' },
    { name: 'CITY', href: '#descent', code: '02' },
    { name: 'EVENTS', href: '#events', code: '03' },
    { name: 'COMPETITIONS', href: '#competitions', code: '04' },
    { name: 'SCHEDULE', href: '#competitions', code: '05' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://instagram.com', freq: 'FREQ://94.2' },
    { name: 'LINKEDIN', href: 'https://linkedin.com', freq: 'NET://LNK' },
    { name: 'GITHUB', href: 'https://github.com', freq: 'SRC://GIT' },
    { name: 'DISCORD', href: 'https://discord.com', freq: 'VOX://DSC' },
  ];

  return (
    <footer 
      id="footer"
      className="relative w-full bg-[#03060c] text-slate-300 overflow-hidden select-none"
      aria-label="Protofos Central System Terminal"
    >
      {/* =====================================================================
          1. CINEMATIC TOP TRANSITION RIBBON (CITY SKYLINE -> TERMINAL)
          ===================================================================== */}
      <div className="relative w-full z-20">
        {/* Deep atmospheric fade from the section above */}
        <div className="absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-[#03060c] pointer-events-none" />

        {/* Thin Glowing Transition Line with Yellow & Cyan Accents */}
        <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 via-50% to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FCEE0A]/40 to-transparent blur-[1px]" />
        </div>

        {/* Central HUD Transition Badge */}
        <div className="relative -mt-3.5 flex justify-center items-center pointer-events-none">
          <div 
            className="px-4 sm:px-6 py-1 bg-[#050913] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase backdrop-blur-md"
            style={{
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-slate-400">SYS_TERM://07</span>
            <span className="text-white/20">|</span>
            <span className="text-[#FCEE0A] font-bold">NODE: PROTOFOS-26</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">SIGNAL: STABLE</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. CINEMATIC BACKGROUND: NIGHT SKYLINE, SCANLINES, HUD GRID & SPIDER-MAN WEB
          ===================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Layer A: Faint blurred background city plate */}
        <img 
          src="/competitions-assets/spidey/spidey-bg.webp" 
          alt="Night City Skyline"
          className="w-full h-full object-cover scale-105 filter blur-[14px] opacity-15 brightness-50 contrast-125 will-change-transform"
          loading="lazy"
          decoding="async"
        />

        {/* Layer B: Cyberpunk Night Skyline Silhouette with illuminated windows */}
        <svg 
          className="absolute inset-x-0 bottom-0 w-full h-[280px] sm:h-[340px] opacity-25"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Skyline Silhouettes */}
          <path d="M0,320 L0,180 L45,180 L45,120 L90,120 L90,210 L140,210 L140,90 L185,90 L185,60 L210,60 L210,140 L260,140 L260,190 L320,190 L320,105 L370,105 L370,80 L385,80 L385,35 L395,35 L395,80 L410,80 L410,160 L470,160 L470,110 L520,110 L520,220 L580,220 L580,70 L630,70 L630,130 L680,130 L680,45 L690,45 L690,15 L695,15 L695,45 L705,45 L705,95 L760,95 L760,180 L810,180 L810,130 L860,130 L860,65 L910,65 L910,150 L970,150 L970,90 L1010,90 L1010,50 L1020,50 L1020,20 L1025,20 L1025,50 L1035,50 L1035,115 L1090,115 L1090,190 L1150,190 L1150,75 L1200,75 L1200,140 L1260,140 L1260,85 L1310,85 L1310,170 L1370,170 L1370,100 L1440,100 L1440,320 Z" fill="#020408" />
          
          {/* Tiny illuminated building windows (Cyan, Yellow, Magenta) */}
          <g fill="#00F0FF" opacity="0.6">
            <rect x="150" y="105" width="2" height="3" />
            <rect x="165" y="125" width="2" height="3" />
            <rect x="175" y="145" width="2" height="3" />
            <rect x="330" y="120" width="2" height="3" />
            <rect x="345" y="135" width="2" height="3" />
            <rect x="590" y="85" width="2" height="3" />
            <rect x="610" y="115" width="2" height="3" />
            <rect x="870" y="80" width="2" height="3" />
            <rect x="890" y="110" width="2" height="3" />
            <rect x="1165" y="90" width="2" height="3" />
            <rect x="1185" y="120" width="2" height="3" />
          </g>
          <g fill="#FCEE0A" opacity="0.5">
            <rect x="60" y="135" width="2" height="3" />
            <rect x="75" y="165" width="2" height="3" />
            <rect x="275" y="155" width="2" height="3" />
            <rect x="485" y="125" width="2" height="3" />
            <rect x="500" y="145" width="2" height="3" />
            <rect x="720" y="110" width="2" height="3" />
            <rect x="740" y="140" width="2" height="3" />
            <rect x="985" y="105" width="2" height="3" />
            <rect x="1275" y="100" width="2" height="3" />
            <rect x="1295" y="130" width="2" height="3" />
          </g>
          <g fill="#FF2BD6" opacity="0.4">
            <rect x="390" y="20" width="3" height="3" />
            <rect x="692" y="10" width="3" height="3" />
            <rect x="1022" y="15" width="3" height="3" />
          </g>
        </svg>

        {/* Layer C: Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-[0.08]" />

        {/* Layer D: Faint Horizontal Scanlines (CRT Terminal Feel) */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0px, rgba(0, 0, 0, 0.45) 1px, transparent 1px, transparent 3px)'
          }}
        />

        {/* Layer E: Atmospheric Radial Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(25, 227, 245, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 100%, rgba(255, 43, 214, 0.04) 0%, transparent 50%), linear-gradient(180deg, #03060c 0%, rgba(3, 6, 12, 0.85) 40%, #03060c 100%)'
          }}
        />

        {/* Layer F: Subtle Spider-Man Geometric Web Lines in Upper-Right Corner */}
        <svg 
          className="absolute -top-12 -right-12 w-[340px] h-[340px] opacity-[0.16] text-[#00F0FF] pointer-events-none"
          viewBox="0 0 200 200" 
          fill="none" 
          stroke="currentColor"
        >
          {/* Radial Web Trajectory Lines */}
          <line x1="200" y1="0" x2="0" y2="180" strokeWidth="0.75" />
          <line x1="200" y1="0" x2="40" y2="200" strokeWidth="0.75" />
          <line x1="200" y1="0" x2="90" y2="200" strokeWidth="0.75" />
          <line x1="200" y1="0" x2="0" y2="120" strokeWidth="0.75" />
          <line x1="200" y1="0" x2="0" y2="60" strokeWidth="0.75" />
          <line x1="200" y1="0" x2="140" y2="200" strokeWidth="0.75" />

          {/* Web Concentric Polygons */}
          <polygon points="180,10 170,25 155,20 160,5" strokeWidth="0.5" strokeDasharray="2,2" />
          <polygon points="160,20 145,50 115,40 125,10" strokeWidth="0.5" stroke="#FCEE0A" strokeOpacity="0.8" />
          <polygon points="135,35 110,80 70,65 85,18" strokeWidth="0.5" />
          <polygon points="105,50 75,115 25,90 45,25" strokeWidth="0.5" strokeDasharray="3,3" />
          <polygon points="70,70 35,155 -15,120 0,35" strokeWidth="0.5" stroke="#FF2BD6" strokeOpacity="0.6" />
        </svg>

        {/* Layer G: Thin Glowing Web Trajectory Filament Dropping Across Top Center */}
        <div 
          className="absolute top-0 right-1/4 w-[1px] h-36 bg-gradient-to-b from-[#00F0FF]/60 via-[#FCEE0A]/30 to-transparent pointer-events-none shadow-[0_0_8px_#00F0FF]"
        />
      </div>

      {/* =====================================================================
          3. MAIN TERMINAL CONTENT CONTAINER
          ===================================================================== */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12 z-10">
        
        {/* TOP SYSTEM HEADER ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-12 border-b border-white/10 text-[10px] font-mono tracking-[0.2em] text-[#8898a6] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
            <span className="text-[#00F0FF] font-bold">TERMINAL // METROPOLIS_SHUTDOWN</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">STATUS: TERMINATING TRANSMISSION</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-500">
            <span>SECTOR: 07 // NIGHT CITY</span>
            <span>&bull;</span>
            <span>LAT 25.26°N // LON 87.01°E</span>
            <span>&bull;</span>
            <span className="text-[#FCEE0A]">BGP_ROOT_NODE</span>
          </div>
        </div>

        {/* =====================================================================
            4. FOUR-COLUMN MAIN CONTROL GRID
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* -----------------------------------------------------------------
              COLUMN 1 & 2 (lg:col-span-6): SYSTEM IDENTITY MODULE
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* System Card with Chamfered Corners */}
            <div 
              className="relative p-6 sm:p-7 bg-[#050a14]/85 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
            >
              {/* Corner Accent Brackets */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-[#00F0FF]/50 select-none">┌</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-[#00F0FF]/50 select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#00F0FF]/50 select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#00F0FF]/50 select-none">┘</div>

              {/* Logo + Header Identity */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="p-2 bg-[#020408] border border-[#FCEE0A] shadow-[0_0_16px_rgba(252,238,10,0.4)] flex-shrink-0"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                  }}
                >
                  <img
                    src="/protofos-logo.png"
                    alt="Protofos Logo"
                    className="h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(246,232,30,0.7)]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cyberpunk font-bold italic text-2xl sm:text-3xl text-white tracking-widest leading-none">
                      PROTOFOS <span className="text-[#FCEE0A] drop-shadow-[0_0_12px_rgba(252,238,10,0.6)]">2026</span>
                    </span>
                  </div>

                  <span className="block font-mono text-[9px] sm:text-[10px] text-[#00F0FF] tracking-[0.26em] uppercase mt-1">
                    IIIT BHAGALPUR TECHNICAL BOARD
                  </span>
                </div>
              </div>

              {/* Technical Node Identifier Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 bg-black/60 border border-[#00F0FF]/30 text-[9.5px] font-mono tracking-[0.2em] text-[#00F0FF] uppercase">
                <span className="w-1.5 h-1.5 bg-[#00F0FF]" />
                <span>PROTOFOS // TECHNICAL NETWORK</span>
                <span className="text-white/20">•</span>
                <span className="text-[#FCEE0A]">NODE: IIIT-BGP-2026</span>
              </div>

              {/* Tagline */}
              <div className="text-[#FCEE0A] font-cyberpunk font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="text-[#00F0FF]">▍</span>
                <span>IDEAS TODAY // A BRIGHTER TOMORROW</span>
              </div>

              {/* Festival Mission Statement */}
              <p className="text-slate-300 font-sans text-xs sm:text-[13.5px] leading-relaxed max-w-xl mb-5">
                The flagship technical festival uniting engineering talent across hardware, deep software, 
                avionics, quantitative finance, and cybersecurity. Powered by campus clubs.
              </p>

              {/* Cyber Terminal Telemetry Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span>[●] GRID: ONLINE</span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                  <span className="text-[#FCEE0A]">[↯]</span>
                  <span>LATENCY: 12ms</span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300">
                  <span className="text-[#FF2BD6]">[◆]</span>
                  <span>CIPHER: 256-BIT</span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 text-[#FCEE0A]">
                  <span>[◈]</span>
                  <span>SECTOR: NIGHT CITY</span>
                </div>
              </div>

            </div>

          </div>

          {/* -----------------------------------------------------------------
              COLUMN 3 (lg:col-span-3): 01 // DIRECTORY MODULE
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col">
            <div 
              className="relative p-5 sm:p-6 bg-[#050a14]/85 border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md h-full flex flex-col"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
              }}
            >
              {/* Module Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FCEE0A] shadow-[0_0_6px_#FCEE0A]" />
                  <h4 className="text-[#FCEE0A] font-cyberpunk font-bold text-xs tracking-[0.24em] uppercase">
                    01 // DIRECTORY
                  </h4>
                </div>
                <span className="text-[9px] font-mono text-slate-500 tracking-widest">SYS_NAV</span>
              </div>

              {/* Navigation Links */}
              <ul className="space-y-1.5 flex-1">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center justify-between px-3 py-2 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#00F0FF]/15 hover:to-transparent border border-transparent hover:border-l-2 hover:border-l-[#00F0FF] transition-all duration-200 font-mono text-xs tracking-[0.18em] uppercase"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] text-slate-500 group-hover:text-[#00F0FF] transition-colors">
                          //{item.code}
                        </span>
                        <span className="font-cyberpunk font-medium tracking-wider group-hover:text-[#00F0FF] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-white/20 group-hover:text-[#FCEE0A] group-hover:translate-x-1.5 transition-all duration-200">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Module Footer Micro-Detail */}
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-500 tracking-wider">
                <span>INDEX_COUNT: 05</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              COLUMN 4 (lg:col-span-3): 02 // TRANSMISSIONS & RETURN COMMAND
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col">
            <div 
              className="relative p-5 sm:p-6 bg-[#050a14]/85 border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md h-full flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
              }}
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                    <h4 className="text-[#00F0FF] font-cyberpunk font-bold text-xs tracking-[0.24em] uppercase">
                      02 // TRANSMISSIONS
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 tracking-widest">RF_LINK</span>
                </div>

                {/* Social Channel Links */}
                <ul className="space-y-1.5 mb-6">
                  {socialLinks.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between px-3 py-2 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#FCEE0A]/15 hover:to-transparent border border-transparent hover:border-l-2 hover:border-l-[#FCEE0A] transition-all duration-200 font-mono text-xs tracking-[0.16em]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-slate-500 group-hover:bg-[#FCEE0A] transition-colors" />
                          <span className="font-semibold">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-slate-500 group-hover:text-slate-300 transition-colors hidden sm:inline">
                            {s.freq}
                          </span>
                          <span className="text-[#FCEE0A] group-hover:translate-x-1.5 transition-transform duration-200">
                            &rarr;
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -------------------------------------------------------------
                  FUTURISTIC "RETURN TO SKYLINE" SYSTEM COMMAND BUTTON
                  ------------------------------------------------------------- */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={scrollToTop}
                  className="group relative w-full px-4 py-3 bg-[#080d19] hover:bg-[#FCEE0A] text-slate-200 hover:text-[#04070b] border border-[#FCEE0A]/60 hover:border-[#FCEE0A] transition-all duration-300 flex items-center justify-between font-cyberpunk font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(252,238,10,0.15)] hover:shadow-[0_0_30px_rgba(252,238,10,0.5)] cursor-pointer"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                  }}
                  title="Execute return to skyline top"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-3.5 h-3.5 text-[#FCEE0A] group-hover:text-[#04070b] group-hover:-translate-y-1 transition-all duration-200" />
                    <span>RETURN TO SKYLINE</span>
                  </div>

                  <span className="font-mono text-[9px] text-[#00F0FF] group-hover:text-[#04070b] tracking-widest">
                    [TOP]
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* =====================================================================
            5. BOTTOM SYSTEM CONTROL BAR & LEGAL TELEMETRY
            ===================================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-[11px] font-mono text-slate-400">
          
          {/* Copyright & Technical Metropolis Attribution */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="text-[#00F0FF] font-bold">SYS://ROOT</span>
            <span>&bull;</span>
            <span>&copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. TECHNICAL BOARD METROPOLIS.</span>
          </div>

          {/* Legal Protocol Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10.5px]">
            <a 
              href="#footer"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#FCEE0A] hover:underline underline-offset-4 decoration-[#FCEE0A]/50 transition-colors cursor-pointer"
            >
              PRIVACY PROTOCOL
            </a>
            <span className="text-white/20">&bull;</span>
            <a 
              href="#footer"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#00F0FF] hover:underline underline-offset-4 decoration-[#00F0FF]/50 transition-colors cursor-pointer"
            >
              TERMS OF ENGAGEMENT
            </a>
            <span className="text-white/20">&bull;</span>
            <a 
              href="#footer"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#FCEE0A] hover:underline underline-offset-4 decoration-[#FCEE0A]/50 transition-colors cursor-pointer"
            >
              CODE OF CONDUCT
            </a>
          </div>

        </div>

        {/* Bottom Micro Terminal Status Stamp */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          <span>END_OF_TRANSMISSION // HOST: IIIT_BHAGALPUR</span>
          <span className="text-slate-600 hidden sm:inline">CIPHER_STAMP: 0x9F4C2E • SECURE SHUTDOWN PROTOCOL ACTIVE</span>
          <span className="text-[#00F0FF]">TRANSMISSION COMPLETE</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
