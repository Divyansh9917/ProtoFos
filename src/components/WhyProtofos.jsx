import React, { useState } from 'react';
import { WHY_PROTOFOS_MODULES } from '../data/protofosData';
import { Terminal, Cpu, Network, Rocket, ShieldCheck, ChevronRight } from 'lucide-react';

export const WhyProtofos = () => {
  const [activeModule, setActiveModule] = useState(0);

  const icons = [
    <Cpu className="w-5 h-5 text-cyan-400" />,
    <Network className="w-5 h-5 text-yellow-400" />,
    <Terminal className="w-5 h-5 text-cyan-400" />,
    <Rocket className="w-5 h-5 text-yellow-400" />
  ];

  return (
    <section id="why-protofos" className="relative w-full py-28 bg-[#030712] overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-cyberpunk font-bold text-xs text-[#FCEE0A] tracking-[0.3em] uppercase mb-2">
              <span className="w-2 h-2 bg-[#FCEE0A]"></span>
              <span>WHERE ENGINEERING MEETS POSSIBILITY</span>
            </div>
            <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl text-white tracking-tight uppercase">
              WHY <span className="text-[#FCEE0A] text-glow-yellow">PROTOFOS?</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-md mt-4 md:mt-0 tracking-wider">
            // PROVING GROUND DESIGNED TO CATALYZE DEEP-TECH EXCELLENCE, 
            INTER-COLLEGE NETWORK, AND VENTURE VELOCITY.
          </p>
        </div>

        {/* 4 Major Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {WHY_PROTOFOS_MODULES.map((item, index) => {
            const isBlue = index % 2 === 0;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveModule(index)}
                className={`relative p-8 cyber-cut bg-[#0E131F]/90 border transition-all duration-300 group ${
                  isBlue
                    ? 'border-slate-800 hover:border-[#00F0FF] hover:shadow-neon-blue'
                    : 'border-slate-800 hover:border-[#FCEE0A] hover:shadow-neon-yellow'
                }`}
              >
                {/* Module Top Bar */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#04060B] border border-slate-700 cyber-cut-sm">
                      {icons[index]}
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-slate-400 uppercase">
                      MODULE {item.id} // {item.tag}
                    </span>
                  </div>
                  <span className={`font-orbitron font-black text-2xl transition-colors ${
                    isBlue ? 'text-[#00F0FF]/50 group-hover:text-[#00F0FF]' : 'text-[#FCEE0A]/50 group-hover:text-[#FCEE0A]'
                  }`}>
                    {item.id}
                  </span>
                </div>

                {/* Subtitle / Tag */}
                <div className="text-[11px] font-cyberpunk font-bold text-[#FCEE0A] tracking-widest uppercase mb-1">
                  {item.subtitle}
                </div>

                {/* Large Module Heading */}
                <h3 className="font-cyberpunk font-black italic text-xl sm:text-2xl text-white tracking-wide uppercase mb-4 group-hover:text-[#00F0FF] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 font-cyber text-lg sm:text-xl leading-relaxed mb-6 whitespace-pre-line">
                  {item.description}
                </p>

                {/* Key Takeaway / Highlight Box */}
                <div className={`p-4 bg-[#04060B]/90 border-l-4 font-mono text-xs tracking-wider cyber-cut-sm ${
                  isBlue ? 'border-[#00F0FF] text-[#00F0FF]' : 'border-[#FCEE0A] text-[#FCEE0A]'
                }`}>
                  <span className="text-slate-400 block text-[9px] uppercase mb-0.5 tracking-widest">// CORE DIRECTIVE</span>
                  <span className="font-cyberpunk font-bold text-sm text-slate-200">{item.highlight}</span>
                </div>

                {/* Subtle corner tech decoration */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className={`w-full h-full border-t-2 border-r-2 ${isBlue ? 'border-[#00F0FF]' : 'border-[#FCEE0A]'}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
