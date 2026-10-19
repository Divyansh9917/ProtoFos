import React from 'react';
import { ArrowUp, Terminal, Shield, Globe } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'CITY', href: '#descent' },
    { name: 'EVENTS', href: '#events' },
    { name: 'COMPETITIONS', href: '#competitions' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
    { name: 'LINKEDIN', href: 'https://linkedin.com' },
    { name: 'GITHUB', href: 'https://github.com' },
    { name: 'DISCORD', href: 'https://discord.com' },
  ];

  return (
    <footer 
      id="footer"
      className="relative w-full bg-[#020408] border-t border-[#00F0FF]/30 shadow-[0_-2px_25px_rgba(0,240,255,0.12)] pt-20 pb-12 overflow-hidden text-slate-400 select-none"
    >
      {/* 1. Cinematic Blurred City Background (Matches entire theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/competitions-assets/spidey/spidey-bg.webp" 
          alt="Cyberpunk City Background"
          className="w-full h-full object-cover scale-110 filter blur-[20px] opacity-25 brightness-75 contrast-125 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        {/* Dark Shade Overlay */}
        <div className="absolute inset-0 bg-[#020408]/85" />
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Mission Statement with Official Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div 
                className="p-1.5 bg-[#04060b]/90 border border-[#f6e81e]/60 shadow-[0_0_15px_rgba(246,232,30,0.35)]"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                }}
              >
                <img
                  src="/protofos-logo.png"
                  alt="Protofos Logo"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(246,232,30,0.6)]"
                />
              </div>
              <div>
                <span className="font-cyberpunk font-bold italic text-2xl sm:text-3xl text-white tracking-widest leading-none block">
                  PROTOFOS <span className="text-[#f6e81e] drop-shadow-[0_0_10px_rgba(246,232,30,0.5)]">2026</span>
                </span>
                <span className="block font-mono text-[9.5px] text-[#00F0FF] tracking-[0.26em] uppercase mt-1">
                  IIIT BHAGALPUR TECHNICAL BOARD
                </span>
              </div>
            </div>

            <div className="text-[#f6e81e] font-cyberpunk font-bold text-xs sm:text-sm tracking-widest uppercase pt-1">
              IDEAS TODAY // A BRIGHTER TOMORROW
            </div>

            <p className="text-slate-300 font-sans text-sm sm:text-[15px] leading-relaxed max-w-md">
              The flagship technical festival uniting engineering talent across hardware, deep software, 
              avionics, quantitative finance, and cybersecurity. Powered by campus clubs.
            </p>

            {/* Live Telemetry Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-3 text-[10px] font-mono font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-[#00F0FF]">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping"></span>
                GRID: ONLINE
              </span>
              <span>&bull;</span>
              <span>LATENCY: 12ms</span>
              <span>&bull;</span>
              <span className="text-[#f6e81e]">CIPHER: 256-BIT // NIGHT CITY</span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div>
            <h4 className="text-[#f6e81e] font-cyberpunk font-bold text-xs tracking-[0.24em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#f6e81e] shadow-[0_0_6px_#f6e81e]" />
              <span>01 // DIRECTORY</span>
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-cyberpunk font-medium text-slate-300 hover:text-[#00F0FF] hover:translate-x-1 transition-all duration-200 tracking-wider uppercase text-xs flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <span className="text-white/20 group-hover:text-[#00F0FF] transition-colors">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Transmissions & Return Button */}
          <div>
            <h4 className="text-[#00F0FF] font-cyberpunk font-bold text-xs tracking-[0.24em] uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
              <span>02 // TRANSMISSIONS</span>
            </h4>
            <ul className="space-y-2.5 mb-7">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#f6e81e] transition-colors tracking-wider flex items-center justify-between font-mono text-xs group"
                  >
                    <span>{s.name}</span>
                    <span className="text-[#f6e81e] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#060c18] hover:bg-[#f6e81e] hover:text-[#04070b] border border-[#f6e81e]/60 hover:border-[#f6e81e] text-slate-200 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-cyberpunk font-bold italic uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(246,232,30,0.2)]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
              }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO SKYLINE</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal & Security Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            &copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. TECHNICAL BOARD METROPOLIS.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-[#f6e81e] transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
            <span>&bull;</span>
            <span className="hover:text-[#00F0FF] transition-colors cursor-pointer">TERMS OF ENGAGEMENT</span>
            <span>&bull;</span>
            <span className="hover:text-[#f6e81e] transition-colors cursor-pointer">CODE OF CONDUCT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
