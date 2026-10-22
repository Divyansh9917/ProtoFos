import React from 'react';
import { Terminal, Shield, ArrowUp } from 'lucide-react';
import { cyberAudio } from '../../utils/audioSystem';

export const Footer = () => {
  const scrollToTop = () => {
    cyberAudio.playCyberBeep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-slate-900 bg-[#02050d] py-12 px-4 sm:px-6 lg:px-8 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand & Mission */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-orbitron font-extrabold text-white tracking-widest text-base">
              PROTOFOS 2026
            </span>
            <span className="text-[10px] text-cyber-cyan border border-cyber-cyan/40 px-1.5 py-0.5 rounded">
              CYBERPUNK WORLD
            </span>
          </div>
          <p className="text-slate-400 text-xs tracking-wider">
            IDEAS TODAY · A BRIGHTER TOMORROW · 2026
          </p>
        </div>

        {/* Telemetry Status & Coordinates */}
        <div className="flex flex-col items-center md:items-end text-right">
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL MEGACITY SYSTEMS OPERATIONAL</span>
          </div>
          <div className="text-[10px] text-slate-600">
            OCTOBER 31 — NOVEMBER 01, 2026 // GRID 28.6139° N, 77.2090° E
          </div>
        </div>

        {/* Scroll Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 border border-slate-800 hover:border-cyber-cyan text-slate-400 hover:text-cyber-cyan transition-colors rounded flex items-center gap-2"
          title="Return to Rooftop View"
        >
          <ArrowUp size={16} />
          <span className="text-[10px] tracking-wider">TOP</span>
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-600">
        <div>
          © 2026 PROTOFOS. CO-ENGINEERED BY CAMPUS TECHNICAL CLUBS. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-slate-400 cursor-pointer">TERMINAL // PRIVACY</span>
          <span className="hover:text-slate-400 cursor-pointer">CODE OF CONDUCT</span>
          <span className="hover:text-slate-400 cursor-pointer">SECURITY DISCLOSURE</span>
        </div>
      </div>
    </footer>
  );
};
