import React from 'react';
import { ArrowRight, Ticket, Sparkles } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/protofosData';

export const FinalCTA = ({ onOpenTickets }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#030712] py-24 select-none">
      {/* Background Skyline Plate */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/cyberpunk_final_skyline.jpg')`,
        }}
      >
        {/* Subtle dark gradient overlay to ensure text punch */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#030712]/60" />
      </div>

      {/* Atmospheric Scanlines */}
      <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

      {/* Foreground Ambient Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Official Logo Emblem */}
        <div className="mb-4">
          <div className="p-2.5 bg-[#04060B]/90 border border-[#FCEE0A] cyber-cut shadow-[0_0_20px_rgba(252,238,10,0.5)] inline-block">
            <img
              src="/protofos-logo.png"
              alt="PROTOFOS Emblem"
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(252,238,10,0.7)]"
            />
          </div>
        </div>

        {/* Sub-label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 bg-[#0E131F]/90 border border-[#FCEE0A]/50 cyber-cut-sm">
          <span className="w-2 h-2 bg-[#FCEE0A] animate-ping"></span>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#FCEE0A] uppercase font-bold">
            THE FINAL BROADCAST // ALL CHANNELS
          </span>
        </div>

        {/* Huge Final Statement */}
        <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 uppercase leading-tight drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
          THE FUTURE IS BUILT BY THOSE <br />
          <span className="text-[#FCEE0A] text-glow-yellow">
            WHO SHOW UP.
          </span>
        </h2>

        {/* Festival Date & Name */}
        <div className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-widest text-[#00F0FF] mb-10">
          <span className="font-cyberpunk font-bold text-white uppercase text-base sm:text-lg">PROTOFOS 2026</span>
          <span className="text-slate-600">//</span>
          <span className="text-[#FCEE0A] font-bold">31 OCT — 01 NOV</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenTickets}
          className="group px-10 py-4 cyber-cut bg-[#FCEE0A] hover:bg-white text-black font-cyberpunk font-black text-sm sm:text-base tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(252,238,10,0.6)] hover:shadow-neon-yellow transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
        >
          <span>BE PART OF IT // REGISTER</span>
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform text-black" />
        </button>

        {/* Subtitle assurance */}
        <p className="font-mono text-xs text-slate-300 tracking-wider mt-6 uppercase">
          OPEN TO ALL ENGINEERING INSTITUTES &bull; LIMITED HACKATHON SLOTS &bull; DEEP-TECH PROVING GROUND
        </p>
      </div>

      {/* Decorative Technical Borders */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
    </section>
  );
};
