import React from 'react';
import { ArrowUp, Terminal, Shield, Globe } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/protofosData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'CITY', href: '#city-descent' },
    { name: 'STREET', href: '#street' },
    { name: 'ABOUT', href: '#intro' },
    { name: 'EVENTS', href: '#events' },
    { name: 'CLUBS', href: '#clubs' },
    { name: 'SCHEDULE', href: '#timeline' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
    { name: 'LINKEDIN', href: 'https://linkedin.com' },
    { name: 'GITHUB', href: 'https://github.com' },
    { name: 'DISCORD', href: 'https://discord.com' },
  ];

  return (
    <footer className="relative w-full bg-[#02040A] border-t border-slate-900 pt-16 pb-12 overflow-hidden text-slate-400 font-mono text-xs">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Statement with Group 1 Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-[#04060B] border border-[#FCEE0A]/40 cyber-cut-sm">
                <img
                  src="/protofos-logo.png"
                  alt="Protofos Logo"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(252,238,10,0.6)]"
                />
              </div>
              <div>
                <span className="font-cyberpunk font-black italic text-2xl text-white tracking-widest">
                  PROTOFOS <span className="text-[#FCEE0A]">2026</span>
                </span>
                <span className="block font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase">
                  IIIT BHAGALPUR TECHNICAL BOARD
                </span>
              </div>
            </div>

            <div className="text-[#FCEE0A] font-cyberpunk font-bold text-sm tracking-wider uppercase">
              IDEAS TODAY // A BRIGHTER TOMORROW
            </div>
            <p className="text-slate-300 font-cyber text-base leading-relaxed max-w-md">
              The flagship technical festival uniting engineering talent across hardware, deep software, 
              avionics, quantitative finance, and cybersecurity. Powered by campus clubs.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-[#00F0FF]">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping"></span>
                GRID: ONLINE
              </span>
              <span>&bull;</span>
              <span>LATENCY: 12ms</span>
              <span>&bull;</span>
              <span className="text-[#FCEE0A]">CIPHER: 256-BIT // NIGHT CITY</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[#FCEE0A] font-cyberpunk font-bold text-xs tracking-widest uppercase mb-4">
              // DIRECTORY
            </h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-cyberpunk font-medium text-slate-300 hover:text-[#00F0FF] transition-colors tracking-wider uppercase text-xs"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Back to Top */}
          <div>
            <h4 className="text-[#00F0FF] font-cyberpunk font-bold text-xs tracking-widest uppercase mb-4">
              // TRANSMISSIONS
            </h4>
            <ul className="space-y-2 mb-6">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#FCEE0A] transition-colors tracking-wider flex items-center justify-between font-mono text-xs"
                  >
                    <span>{s.name}</span>
                    <span className="text-[#FCEE0A]">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 bg-[#0E131F] hover:bg-[#FCEE0A] hover:text-black border border-slate-700 hover:border-[#FCEE0A] text-slate-200 cyber-cut-sm transition-all duration-300 flex items-center gap-2 text-xs font-cyberpunk font-bold uppercase tracking-wider"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO SKYLINE</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. TECHNICAL BOARD METROPOLIS.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 cursor-pointer">PRIVACY PROTOCOL</span>
            <span>&bull;</span>
            <span className="hover:text-slate-200 cursor-pointer">TERMS OF ENGAGEMENT</span>
            <span>&bull;</span>
            <span className="hover:text-slate-200 cursor-pointer">CODE OF CONDUCT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
