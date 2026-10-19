import React, { useState } from 'react';
import { ArrowUp, Terminal, Shield, Globe, Cpu, Wifi, Radio, ExternalLink, Activity, Zap } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { code: '01', name: 'HOME', href: '#hero', desc: 'Main Skyline & Overview' },
    { code: '02', name: 'CITY', href: '#descent', desc: 'Spider-Man Freefall' },
    { code: '03', name: 'EVENTS', href: '#events', desc: 'Infinite Arena Tunnel' },
    { code: '04', name: 'COMPETITIONS', href: '#competitions', desc: 'Honeycomb 8 Arenas' },
    { code: '05', name: 'SCHEDULE', href: '#competitions', desc: 'Milestones & Dates' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://instagram.com', freq: 'FREQ://94.2', icon: 'IG' },
    { name: 'LINKEDIN', href: 'https://linkedin.com', freq: 'NET://LNK', icon: 'IN' },
    { name: 'GITHUB', href: 'https://github.com', freq: 'SRC://GIT', icon: 'GH' },
    { name: 'DISCORD', href: 'https://discord.com', freq: 'VOX://DSC', icon: 'DC' },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#03060c] text-slate-300 overflow-hidden select-none"
      aria-label="Protofos Central System Terminal"
    >
      {/* =====================================================================
          1. CINEMATIC CITY SKYLINE BACKGROUND + SPIDER-VERSE WEB ATMOSPHERE
          ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Real Cyberpunk Night City Skyline Image */}
        <img
          src="/images/cyberpunk_final_skyline.jpg"
          alt="Night City Skyline"
          className="w-full h-full object-cover object-bottom filter blur-[6px] opacity-30 brightness-[0.75] contrast-125 scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Deep Atmospheric Gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(25, 227, 245, 0.12) 0%, rgba(3, 6, 12, 0.85) 60%, #03060c 100%)'
          }}
        />

        {/* Ambient Neon Color Spots */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#19e3f5]/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[500px] h-80 bg-[#f6e81e]/8 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#ff003c]/10 rounded-full filter blur-[110px] pointer-events-none" />

        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 cyber-grid-bg opacity-25" />

        {/* Scanlines CRT Texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.8) 50%)',
            backgroundSize: '100% 4px'
          }}
        />

        {/* Spider-Man Geometric Web Graphic Overlay (Top-Right Corner) */}
        <svg
          className="absolute -top-12 -right-12 w-96 h-96 opacity-20 pointer-events-none text-[#19e3f5]"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M400,0 L0,400" strokeDasharray="4 4" />
          <path d="M400,0 L100,400" />
          <path d="M400,0 L200,400" />
          <path d="M400,0 L300,400" strokeDasharray="3 3" />
          <path d="M400,0 L0,300" />
          <path d="M400,0 L0,200" />
          <path d="M400,0 L0,100" strokeDasharray="4 4" />
          <circle cx="400" cy="0" r="80" stroke="#f6e81e" strokeWidth="0.8" />
          <circle cx="400" cy="0" r="160" stroke="#19e3f5" strokeWidth="0.8" strokeDasharray="6 4" />
          <circle cx="400" cy="0" r="240" stroke="#ff003c" strokeWidth="0.7" />
          <circle cx="400" cy="0" r="320" stroke="#19e3f5" strokeWidth="0.8" strokeDasharray="8 6" />
        </svg>
      </div>

      {/* =====================================================================
          2. TOP TRANSITION LASER RIBBON + HUD CENTRAL BADGE
          ===================================================================== */}
      <div className="relative z-20 w-full">
        {/* Soft atmospheric gradient top fade */}
        <div className="absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[#03060c] pointer-events-none" />

        {/* Glowing Neon Laser Line */}
        <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-[#19e3f5] via-45% to-[#f6e81e] to-85% shadow-[0_0_15px_rgba(25,227,245,0.7)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff003c]/60 to-transparent blur-[2px]" />
        </div>

        {/* Central Chamfered HUD Ribbon Badge */}
        <div className="relative -mt-3.5 flex justify-center items-center pointer-events-none px-4">
          <div
            className="px-5 py-1.5 bg-[#070d18]/95 border border-[#19e3f5]/50 shadow-[0_0_20px_rgba(25,227,245,0.35)] flex items-center gap-2.5 sm:gap-3 text-[9.5px] sm:text-[10.5px] font-spacemono tracking-[0.24em] text-[#19e3f5] uppercase backdrop-blur-md"
            style={{
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#19e3f5] animate-ping" />
            <span className="text-[#f6e81e] font-bold">TERMINAL://07</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-200">NODE: PROTOFOS-26</span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#19e3f5] hidden sm:inline flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#f6e81e]" /> SIGNAL: 99.8% STABLE
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. MAIN CONTENT: 3 HIGH-TECH CYBERPUNK HUD CARDS
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-12 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">

          {/* CARD 1: CENTRAL COMMAND & FESTIVAL IDENTITY (5 Cols) */}
          <div
            className="lg:col-span-5 bg-[#070d18]/85 border border-[#19e3f5]/30 p-6 sm:p-7 backdrop-blur-md relative overflow-hidden group shadow-[0_8px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}
          >
            {/* Top decorative corner hazard badge */}
            <div className="absolute top-0 right-0 w-24 h-5 cyber-hazard-cyan opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Header Ticker */}
              <div className="flex items-center justify-between text-[10px] font-spacemono text-[#19e3f5] tracking-widest uppercase border-b border-white/10 pb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-[#f6e81e]" />
                  SYS_NODE // 01: COMMAND
                </span>
                <span className="text-[#f6e81e] bg-[#f6e81e]/10 px-2 py-0.5 rounded border border-[#f6e81e]/30">
                  EST. 2026
                </span>
              </div>

              {/* Logo & Festival Name */}
              <div className="flex items-center gap-3.5 pt-1">
                <div
                  className="p-2 bg-[#04070e] border border-[#f6e81e] shadow-[0_0_18px_rgba(246,232,30,0.4)] flex-shrink-0"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                  }}
                >
                  <img
                    src="/protofos-logo.png"
                    alt="Protofos Official Logo"
                    className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(246,232,30,0.8)]"
                  />
                </div>
                <div>
                  <h3 className="font-cyberpunk font-bold italic text-3xl sm:text-4xl text-white tracking-widest leading-none">
                    PROTOFOS <span className="text-[#f6e81e] drop-shadow-[0_0_14px_rgba(246,232,30,0.7)]">2026</span>
                  </h3>
                  <span className="block font-spacemono text-[9.5px] text-[#19e3f5] tracking-[0.25em] uppercase mt-1">
                    IIIT BHAGALPUR TECHNICAL BOARD
                  </span>
                </div>
              </div>

              {/* Motto Banner */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f6e81e]/10 border-l-2 border-[#f6e81e] text-[#f6e81e] font-cyberpunk font-bold text-xs tracking-[0.18em] uppercase">
                <span className="w-1.5 h-1.5 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e]" />
                <span>IDEAS TODAY // A BRIGHTER TOMORROW</span>
              </div>

              {/* Mission Statement */}
              <p className="text-slate-300 font-sans text-xs sm:text-[13.5px] leading-relaxed pt-1">
                The flagship technical festival uniting student engineers, hackers, and creators across
                robotics, deep software, autonomous avionics, algorithmic markets, and offensive security.
                Engineered with heart and electricity.
              </p>
            </div>

            {/* Bottom Telemetry Strip */}
            {/* <div className="mt-6 pt-3.5 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-[9.5px] font-spacemono text-slate-400">
              <span className="flex items-center gap-1.5 text-[#19e3f5] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19e3f5] animate-ping" />
                GRID: ONLINE
              </span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300">LATENCY: 12ms</span>
              <span className="text-white/20">•</span>
              <span className="text-[#f6e81e] font-bold">CIPHER: 512-BIT</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">SECTOR: NIGHT CITY</span>
            </div> */}
          </div>

          {/* CARD 2: DIRECTORY // NAVIGATION (3 Cols) */}
          <div
            className="lg:col-span-3 bg-[#070d18]/85 border border-[#f6e81e]/30 p-6 backdrop-blur-md relative overflow-hidden group shadow-[0_8px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
          >
            {/* Top decorative hazard stripes */}
            <div className="absolute top-0 right-0 w-20 h-4 cyber-hazard opacity-35 group-hover:opacity-70 transition-opacity pointer-events-none" />

            <div>
              {/* Header Ticker */}
              <div className="flex items-center justify-between text-[10px] font-spacemono text-[#f6e81e] tracking-widest uppercase border-b border-white/10 pb-2 mb-4">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e]" />
                  01 // DIRECTORY
                </span>
                <span className="text-slate-400 text-[9px]">NAV_MATRIX</span>
              </div>

              {/* Navigation Links with Chamfered Pill Hover */}
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group/link flex items-center justify-between p-2 rounded bg-black/30 hover:bg-[#19e3f5]/15 border border-white/5 hover:border-[#19e3f5]/50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-spacemono text-[10px] font-bold text-[#f6e81e] group-hover/link:text-[#19e3f5] transition-colors">
                          [{item.code}]
                        </span>
                        <div>
                          <span className="font-cyberpunk font-bold text-xs text-slate-200 group-hover/link:text-white tracking-wider block">
                            {item.name}
                          </span>
                          <span className="font-mono text-[9px] text-slate-500 group-hover/link:text-[#19e3f5]/80 block">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover/link:text-[#19e3f5] group-hover/link:translate-x-1 transition-all text-xs">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Badge */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-spacemono text-slate-500">
              <span>WAYPOINTS: 05 ACTIVE</span>
              <span className="text-[#19e3f5]">HEX: 08 ARENAS</span>
            </div>
          </div>

          {/* CARD 3: TRANSMISSIONS & TOP CTA (4 Cols) */}
          <div
            className="lg:col-span-4 bg-[#070d18]/85 border border-[#19e3f5]/30 p-6 backdrop-blur-md relative overflow-hidden group shadow-[0_8px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            style={{
              clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)'
            }}
          >
            {/* Top decorative cyan hazard corner */}
            <div className="absolute top-0 left-0 w-20 h-4 cyber-hazard-cyan opacity-35 group-hover:opacity-70 transition-opacity pointer-events-none" />

            <div>
              {/* Header Ticker */}
              <div className="flex items-center justify-between text-[10px] font-spacemono text-[#19e3f5] tracking-widest uppercase border-b border-white/10 pb-2 mb-4">
                <span className="flex items-center gap-1.5 font-bold">
                  <Radio className="w-3.5 h-3.5 text-[#19e3f5] animate-pulse" />
                  02 // TRANSMISSIONS
                </span>
                <span className="text-[#19e3f5] text-[9px]">ENCRYPTED</span>
              </div>

              {/* Social Channels 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-black/40 hover:bg-[#f6e81e]/15 border border-white/5 hover:border-[#f6e81e]/60 transition-all duration-200 group/soc flex flex-col justify-between rounded"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-spacemono text-[9px] font-bold px-1.5 py-0.5 bg-white/5 group-hover/soc:bg-[#f6e81e] text-[#19e3f5] group-hover/soc:text-[#04070b] transition-colors rounded">
                        {s.icon}
                      </span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover/soc:text-[#f6e81e] transition-colors" />
                    </div>
                    <div className="mt-2">
                      <span className="font-cyberpunk font-bold text-[11px] text-slate-200 group-hover/soc:text-[#f6e81e] tracking-wider block">
                        {s.name}
                      </span>
                      <span className="font-spacemono text-[8.5px] text-slate-500 block">
                        {s.freq}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* RETURN TO SKYLINE [TOP] CTA BUTTON */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0d1627] via-[#101b33] to-[#0d1627] hover:from-[#f6e81e] hover:via-[#ffe600] hover:to-[#f6e81e] text-[#f6e81e] hover:text-[#04070b] border-2 border-[#f6e81e] shadow-[0_0_20px_rgba(246,232,30,0.35)] hover:shadow-[0_0_35px_rgba(246,232,30,0.85)] transition-all duration-300 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-cyberpunk font-bold italic uppercase tracking-widest cursor-pointer group/btn"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
              >
                <ArrowUp className="w-4 h-4 text-[#f6e81e] group-hover/btn:text-[#04070b] group-hover/btn:-translate-y-1 transition-transform" />
                <span>RETURN TO SKYLINE [TOP]</span>
                <span className="text-[10px] font-spacemono opacity-60">▲</span>
              </button>
              {/* <div className="mt-2 text-center">
                <span className="font-spacemono text-[9px] text-slate-500 tracking-widest uppercase">
                  BHAGALPUR CENTRAL SYSTEM // SECURE TERMINAL
                </span>
              </div> */}
            </div>

          </div>

        </div>

        {/* =====================================================================
            4. BOTTOM STATUS BAR & SECURITY CLEARANCE
            ===================================================================== */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10.5px] font-spacemono text-slate-400">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="w-1.5 h-1.5 bg-[#f6e81e] rounded-full shadow-[0_0_6px_#f6e81e]" />
            <span>&copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. IIIT BHAGALPUR.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px]">
            {/* <span className="hover:text-[#f6e81e] transition-colors cursor-pointer flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#19e3f5]" /> PRIVACY PROTOCOL
            </span> */}
            <span className="text-white/20">•</span>
            <span className="hover:text-[#19e3f5] transition-colors cursor-pointer">
              TERMS OF ENGAGEMENT
            </span>
            <span className="text-white/20">•</span>
            <span className="hover:text-[#f6e81e] transition-colors cursor-pointer">
              CODE OF CONDUCT
            </span>
            <span className="text-white/20">•</span>
            {/* <span className="text-[#19e3f5] font-bold bg-[#19e3f5]/10 px-2 py-0.5 rounded border border-[#19e3f5]/30">
              AUTH: 200 OK
            </span> */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
