import React from 'react';
import { INTRO_CONTENT, FESTIVAL_INFO } from '../data/protofosData';
import { Terminal, Shield, ArrowUpRight, Cpu, Layers } from 'lucide-react';

export const Intro = () => {
  return (
    <section id="intro" className="relative w-full py-28 bg-[#030712] overflow-hidden">
      {/* Decorative cyber grid and thin neon lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Editorial Index Bar in Cyberpunk 2077 HUD Style */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 mb-12 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="border-l-2 border-[#00F0FF] pl-3 bg-[#0A0E17]/60 py-2">
            <span className="text-[#00F0FF] font-bold block mb-0.5 tracking-wider">// PROTOCOL</span>
            <span className="text-white font-cyberpunk font-bold uppercase">FLAGSHIP TECH METROPOLIS</span>
          </div>
          <div className="border-l-2 border-[#FCEE0A] pl-3 bg-[#0A0E17]/60 py-2">
            <span className="text-[#FCEE0A] font-bold block mb-0.5 tracking-wider">// DATES</span>
            <span className="text-white font-cyberpunk font-bold uppercase">{FESTIVAL_INFO.dates}</span>
          </div>
          <div className="border-l-2 border-[#00F0FF] pl-3 bg-[#0A0E17]/60 py-2">
            <span className="text-[#00F0FF] font-bold block mb-0.5 tracking-wider">// LOCATION</span>
            <span className="text-white font-cyberpunk font-bold uppercase">IIIT BHAGALPUR APEX</span>
          </div>
          <div className="border-l-2 border-[#FF003C] pl-3 bg-[#0A0E17]/60 py-2">
            <span className="text-[#FF003C] font-bold block mb-0.5 tracking-wider">// ACCESS_KEY</span>
            <span className="text-white font-cyberpunk font-bold uppercase">INTER-COLLEGIATE PASS</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Massive Cyberpunk Number 01 & Official Logo Badge */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="relative">
              {/* Giant 01 typography in Orbitron */}
              <div className="font-orbitron font-black text-8xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#FCEE0A]/40 via-slate-800/30 to-transparent select-none leading-none">
                {INTRO_CONTENT.sectionNumber}
              </div>
              <div className="absolute top-6 left-2 font-cyberpunk font-black text-xs tracking-[0.3em] text-[#FCEE0A] uppercase bg-[#04060B] px-2 py-0.5 border border-[#FCEE0A]/40 cyber-cut-sm">
                // 01 THE BEGINNING
              </div>
            </div>

            {/* Official Logo Display Card */}
            <div className="mt-8 space-y-6">
              <div className="p-5 border-l-4 border-[#FCEE0A] bg-[#0E131F]/90 backdrop-blur-md cyber-cut relative">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src="/protofos-logo.png"
                    alt="Protofos Official Logo"
                    className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(252,238,10,0.6)]"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#FCEE0A] tracking-widest block uppercase font-bold">
                      OFFICIAL EMBLEM // 2026
                    </span>
                    <span className="font-cyberpunk font-black italic text-lg text-white">
                      PROTOFOS
                    </span>
                  </div>
                </div>
                <p className="font-cyber text-base text-slate-200 tracking-wider font-semibold">
                  {FESTIVAL_INFO.positioning}
                </p>
              </div>

              {/* Key metadata grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                {INTRO_CONTENT.metadata.map((item, idx) => (
                  <div key={idx} className="p-3 border border-slate-800 bg-[#0A0E17]/80 cyber-cut-sm">
                    <span className="text-slate-500 block text-[9px] uppercase">{item.key}</span>
                    <span className="text-[#00F0FF] font-cyberpunk font-bold text-xs">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Headings & Detailed Architecture Brief */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
            <div>
              {/* Category Subheading */}
              <div className="inline-flex items-center gap-2 font-cyberpunk font-bold text-xs text-[#00F0FF] tracking-[0.3em] uppercase mb-3">
                <span className="w-2 h-2 bg-[#FCEE0A]"></span>
                <span>{INTRO_CONTENT.label}</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
                PROTOFOS <span className="text-[#FCEE0A] text-glow-yellow">2026</span>
              </h2>

              {/* Lead Paragraph */}
              <p className="font-cyber text-xl sm:text-2xl text-slate-200 font-bold leading-relaxed mt-4 mb-8 border-b border-slate-800 pb-8">
                {INTRO_CONTENT.lead}
              </p>

              {/* Detailed Paragraphs */}
              <div className="space-y-6 text-slate-300 font-cyber text-lg sm:text-xl leading-relaxed">
                {INTRO_CONTENT.paragraphs.map((p, index) => (
                  <p key={index} className="relative pl-5 border-l-2 border-slate-800 hover:border-[#FCEE0A] transition-colors">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Technical Festival Metrics */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {FESTIVAL_INFO.stats.map((stat, i) => (
                <div key={i} className="group p-3 bg-[#0A0E17]/60 cyber-cut-sm border border-slate-800 hover:border-[#FCEE0A] transition-all">
                  <div className="font-cyberpunk font-black italic text-2xl sm:text-3xl text-white group-hover:text-[#FCEE0A] transition-colors">
                    {stat.value}
                  </div>
                  <div className="font-cyberpunk font-bold text-[11px] text-[#00F0FF] tracking-wider uppercase mt-0.5">
                    {stat.label}
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
