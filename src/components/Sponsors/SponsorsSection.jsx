import React from 'react';
import { SPONSORS } from '../../data/clubsData';

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-cyber-cyan tracking-[0.25em] block mb-2">
          // INDUSTRIAL ALLIANCES //
        </span>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-widest">
          POWERED BY INNOVATION
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {SPONSORS.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded border border-slate-800/80 bg-[#040816]/60 backdrop-blur-sm text-center hover:border-cyber-cyan/50 hover:bg-[#050e24]/80 transition-all duration-300 group"
          >
            <div className="font-orbitron font-bold text-sm tracking-widest text-slate-300 group-hover:text-white transition-colors mb-1">
              {s.name}
            </div>
            <div className="text-[9px] font-mono tracking-widest text-cyber-cyan/70">
              {s.tier}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
