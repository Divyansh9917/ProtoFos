import React from 'react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { cyberAudio } from '../../utils/audioSystem';

interface FinalCTASectionProps {
  onOpenRegister: () => void;
  onExploreEvents: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenRegister,
  onExploreEvents,
}) => {
  return (
    <section id="final-cta" className="relative z-20 min-h-[90vh] flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="w-full p-8 sm:p-16 rounded-sm border border-cyber-magenta/50 bg-[#070514]/90 backdrop-blur-2xl clip-cyber-corner shadow-[0_0_90px_rgba(255,43,214,0.3)] relative overflow-hidden">
        
        {/* Pink Dusk Atmospheric Ambient Glow (Storyboard Scene 12 requirement) */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyber-magenta/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyber-violet/25 blur-3xl pointer-events-none" />

        {/* Scene 12 Storyboard Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-cyber-magenta/50 bg-cyber-magenta/10">
          <span className="w-2 h-2 rounded-full bg-cyber-magenta animate-ping" />
          <span className="text-xs font-mono text-cyber-magenta tracking-[0.25em] uppercase">
            12 THE NEXT CHAPTER // IT STARTS WITH YOU
          </span>
        </div>

        {/* Storyboard Headline */}
        <h2 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight mb-4">
          SAME DREAMS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta via-pink-300 to-cyber-cyan drop-shadow-[0_0_35px_rgba(255,43,214,0.6)]">
            BIGGER TOMORROW.
          </span>
        </h2>

        {/* Brand & Date */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-300 font-mono text-sm tracking-[0.2em] mb-8">
          <span className="text-white font-bold">PROTOFOS 2026</span>
          <span className="hidden sm:inline text-cyber-magenta">•</span>
          <span className="text-pink-300 flex items-center gap-1.5">
            <Calendar size={15} /> 31 OCT — 1 NOV 2026
          </span>
        </div>

        <p className="max-w-xl mx-auto font-sans text-sm sm:text-base text-slate-300 mb-10 leading-relaxed">
          The future is not observed. It is engineered in the rain, under high constraints, with solder and silicon, neural models and bold founders.
        </p>

        {/* Action Buttons: "BE A PART OF IT →" (Storyboard Scene 12 requirement) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              cyberAudio.playCyberBeep();
              onOpenRegister();
            }}
            className="w-full sm:w-auto px-10 py-4 font-orbitron font-black text-sm tracking-[0.25em] text-black bg-gradient-to-r from-cyber-magenta to-pink-400 clip-cyber-btn hover:opacity-95 transition-all shadow-[0_0_35px_rgba(255,43,214,0.7)] hover:shadow-[0_0_50px_rgba(255,43,214,1)] flex items-center justify-center gap-3"
          >
            <span>BE A PART OF IT</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              cyberAudio.playCyberBeep();
              onExploreEvents();
            }}
            className="w-full sm:w-auto px-8 py-4 font-mono text-xs tracking-[0.2em] text-slate-300 border border-slate-700 hover:border-cyber-magenta hover:text-white transition-all rounded-sm bg-[#040816]/70 backdrop-blur-md"
          >
            EXPLORE ALL EVENTS
          </button>
        </div>

        {/* Storyboard Tagline */}
        <div className="mt-12 text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
          PROTOFOS · IDEAS TODAY · A BRIGHTER TOMORROW · 2026
        </div>

      </div>
    </section>
  );
};
