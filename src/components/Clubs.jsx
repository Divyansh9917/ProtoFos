import React from 'react';
import { CLUBS_DATA } from '../data/protofosData';
import { Terminal, Shield, Cpu, Code2, Rocket, Radio, Layers, ChevronRight } from 'lucide-react';

export const Clubs = () => {
  return (
    <section id="clubs" className="relative w-full py-28 bg-[#030712] overflow-hidden">
      {/* Decorative cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-cyberpunk font-bold text-xs text-[#FCEE0A] tracking-[0.3em] uppercase mb-2">
              <span className="w-2 h-2 bg-[#FCEE0A] animate-ping"></span>
              <span>CLUBS THAT POWER PROTOFOS</span>
            </div>
            <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl text-white tracking-tight uppercase">
              THE <span className="text-[#FCEE0A] text-glow-yellow">BUILDERS</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md mt-4 md:mt-0 tracking-wider uppercase">
            // SPECIALIZED CAMPUS GUILDS UNITING SOFTWARE, HARDWARE, AVIONICS, AND ENTREPRENEURSHIP.
          </p>
        </div>

        {/* Access Terminals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLUBS_DATA.map((club, idx) => {
            const isYellow = idx % 2 === 1;
            return (
              <div
                key={club.id}
                className={`relative p-6 cyber-cut bg-[#0E131F]/90 border transition-all duration-300 group flex flex-col justify-between ${
                  isYellow
                    ? 'border-slate-800 hover:border-[#FCEE0A] hover:shadow-neon-yellow'
                    : 'border-slate-800 hover:border-[#00F0FF] hover:shadow-neon-blue'
                }`}
              >
                {/* Terminal Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <Terminal className={`w-3.5 h-3.5 ${isYellow ? 'text-[#FCEE0A]' : 'text-[#00F0FF]'}`} />
                      <span className="text-slate-400">TERMINAL // {club.code}</span>
                    </div>
                    <span className={`px-2 py-0.5 cyber-cut-sm font-cyberpunk font-bold text-[10px] uppercase ${
                      isYellow ? 'bg-[#FCEE0A] text-black font-black' : 'bg-[#00F0FF] text-black font-black'
                    }`}>
                      {club.badge}
                    </span>
                  </div>

                  {/* Club Name */}
                  <h3 className="font-cyberpunk font-black italic text-xl text-white uppercase tracking-wider mb-1 group-hover:text-[#FCEE0A] transition-colors">
                    {club.name}
                  </h3>

                  {/* Domain */}
                  <div className={`font-mono text-xs font-bold tracking-wider uppercase mb-4 ${
                    isYellow ? 'text-[#FCEE0A]' : 'text-[#00F0FF]'
                  }`}>
                    // {club.domain}
                  </div>

                  {/* Technical Specialization */}
                  <div className="space-y-2 mb-6 text-xs font-mono">
                    <div className="p-2.5 bg-[#04060B]/80 border border-slate-800 cyber-cut-sm">
                      <span className="text-slate-500 block text-[9px] uppercase">// LEAD DISCIPLINE</span>
                      <span className="text-slate-200 font-cyberpunk font-bold text-xs">{club.lead}</span>
                    </div>

                    <div className="p-2.5 bg-[#04060B]/80 border border-slate-800 cyber-cut-sm">
                      <span className="text-slate-500 block text-[9px] uppercase">// DEPLOYED PROJECTS</span>
                      <span className="text-slate-300 font-cyber font-medium text-sm">{club.projects}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Terminal Status */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] animate-ping"></span>
                    <span className="text-[#00F0FF] font-bold">STATUS: ONLINE</span>
                  </div>
                  <span className="text-[#FCEE0A] font-cyberpunk font-bold group-hover:underline transition-colors flex items-center gap-1 uppercase">
                    TERMINAL AUTH &rarr;
                  </span>
                </div>

                {/* Scanline overlay on terminal */}
                <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
