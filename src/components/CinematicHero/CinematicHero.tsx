import React from 'react';
import { ChevronDown, Play, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { JOURNEY_CONFIG } from '../../config/journey.config';
import { cyberAudio } from '../../utils/audioSystem';

interface CinematicHeroProps {
  progress: number;
  onExplore: () => void;
  onWatchTrailer?: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  progress,
  onExplore,
  onWatchTrailer,
}) => {
  const p = progress;

  // Opacities for the 7 cinematic phases
  const s1Opacity = Math.max(0, 1 - (p / 0.08));
  
  const s2Opacity = p >= 0.08 && p <= 0.20
    ? Math.sin(((p - 0.08) / 0.12) * Math.PI)
    : 0;

  const s3Opacity = p >= 0.20 && p <= 0.40
    ? Math.sin(((p - 0.20) / 0.20) * Math.PI)
    : 0;

  const s4Opacity = p >= 0.40 && p <= 0.55
    ? Math.sin(((p - 0.40) / 0.15) * Math.PI)
    : 0;

  const s5Opacity = p >= 0.55 && p <= 0.68
    ? Math.sin(((p - 0.55) / 0.13) * Math.PI)
    : 0;

  const s6Opacity = p >= 0.68 && p <= 0.78
    ? Math.sin(((p - 0.68) / 0.10) * Math.PI)
    : 0;

  const s7Opacity = p >= 0.78 && p <= 0.88
    ? Math.sin(((p - 0.78) / 0.10) * Math.PI)
    : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
      
      {/* ======================================================== */}
      {/* SCENE 01: THE BEGINNING (0 - 8%)                        */}
      {/* Billboard: "A BOLDER BRIGHTER TOMORROW"                 */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-4xl mx-auto text-center transition-opacity duration-300 pointer-events-auto"
        style={{
          opacity: s1Opacity,
          transform: `translateY(${p * 200}px) scale(${1 - p * 0.5})`,
          display: s1Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        {/* Storyboard Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full border border-cyber-cyan/40 bg-[#030711]/75 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          <span className="text-[11px] font-mono text-cyber-cyan tracking-[0.25em] uppercase">
            A BOLDER BRIGHTER TOMORROW
          </span>
        </div>

        {/* Wide Geometric Display Title */}
        <h1 className="font-orbitron font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] text-white drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">
          PROTOFOS
        </h1>

        {/* White-to-Blue/Violet Gradient on "2026" (Storyboard requirement) */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyber-cyan" />
          <span className="font-orbitron font-extrabold text-3xl sm:text-5xl tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-cyan to-cyber-violet">
            2026
          </span>
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyber-magenta" />
        </div>

        {/* Date & Tagline from Storyboard Scene 01 */}
        <div className="mt-3 text-xs sm:text-sm font-mono tracking-[0.25em] text-slate-300 uppercase">
          31 OCT – 1 NOV 2026 &nbsp;|&nbsp; IDEAS / PEOPLE / TECHNOLOGY / A BRIGHTER TOMORROW
        </div>

        {/* Action Buttons: EXPLORE and WATCH TRAILER (Storyboard Scene 01) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              cyberAudio.playCyberBeep();
              onExplore();
            }}
            className="px-8 py-3.5 font-orbitron font-bold text-xs tracking-[0.25em] bg-cyber-cyan text-black clip-cyber-btn hover:bg-white transition-all shadow-[0_0_25px_rgba(0,229,255,0.6)]"
          >
            EXPLORE THE WORLD
          </button>

          <button
            onClick={() => {
              cyberAudio.playCyberBeep();
              if (onWatchTrailer) onWatchTrailer();
            }}
            className="px-6 py-3.5 font-mono text-xs tracking-[0.2em] text-slate-300 border border-slate-700 rounded hover:border-cyber-cyan hover:text-white transition-all bg-[#040816]/60 backdrop-blur-md flex items-center gap-2"
          >
            <Play size={14} className="text-cyber-cyan" />
            <span>WATCH TRAILER</span>
          </button>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2 animate-bounce">
          <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
            SCROLL TO COMMENCE JOURNEY
          </span>
          <ChevronDown size={18} className="text-cyber-cyan" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 02: THE DESCENT (8 - 20%)                         */}
      {/* "Into a city of possibilities"                          */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s2Opacity,
          display: s2Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-6 border border-cyber-cyan/40 bg-[#030711]/90 backdrop-blur-lg clip-cyber-card shadow-[0_0_40px_rgba(0,229,255,0.2)]">
          <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.3em] uppercase block mb-1">
            02 // THE DESCENT
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wider mb-2">
            INTO A CITY OF POSSIBILITIES
          </h2>
          <p className="font-mono text-xs text-slate-300 tracking-widest uppercase">
            FEEL THE GRAVITY OF WHAT COMES NEXT
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 03: THROUGH THE CITY (20 - 40%)                   */}
      {/* "Higher ideas, closer people"                           */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s3Opacity,
          display: s3Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-6 border border-cyber-magenta/40 bg-[#030711]/90 backdrop-blur-lg clip-cyber-card shadow-[0_0_40px_rgba(255,43,214,0.25)]">
          <span className="text-[10px] font-mono text-cyber-magenta tracking-[0.3em] uppercase block mb-1">
            03 // THROUGH THE CITY
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wider mb-2">
            HIGHER IDEAS, CLOSER PEOPLE
          </h2>
          <p className="font-mono text-xs text-slate-300 tracking-widest uppercase">
            WEAVING THROUGH THE MEGAPOLIS CANYONS
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 04: THE DISTRICT (40 - 55%)                       */}
      {/* "Where ideas come to life"                              */}
      {/* Banner: "SAME DREAMS, BIGGER BUILDERS"                  */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s4Opacity,
          display: s4Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-6 border border-cyber-cyan/50 bg-[#030711]/90 backdrop-blur-lg clip-cyber-card shadow-[0_0_45px_rgba(0,229,255,0.25)]">
          <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.3em] uppercase block mb-1">
            04 // THE DISTRICT
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wider mb-2">
            WHERE IDEAS COME TO LIFE
          </h2>
          <p className="font-mono text-xs text-cyber-magenta tracking-widest uppercase mb-3">
            SAME DREAMS, BIGGER BUILDERS
          </p>
          <div className="text-[11px] font-mono text-slate-300 flex justify-center gap-3">
            <span>HACKATHON</span> • <span>ROBOTICS</span> • <span>DRONE RACING</span> • <span>STARTUP PITCH</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 05: THE ARRIVAL (55 - 68%)                        */}
      {/* "A higher ground for brighter minds"                    */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s5Opacity,
          display: s5Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-8 border border-cyber-cyan/60 bg-[#030711]/95 backdrop-blur-xl clip-cyber-card shadow-[0_0_50px_rgba(0,229,255,0.3)]">
          <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.3em] uppercase block mb-1">
            05 // THE ARRIVAL
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wider mb-3">
            A HIGHER GROUND FOR BRIGHTER MINDS
          </h2>
          <p className="font-mono text-xs text-slate-300 tracking-widest uppercase">
            PROTOFOS TOWER // SECTOR ZERO
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 06: BEYOND THE DOORS (68 - 78%)                   */}
      {/* "Ideas move different here"                             */}
      {/* In-world text: "GREATER MINDS BUILD BRIGHTER WORLDS"     */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s6Opacity,
          display: s6Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-6 border border-cyber-cyan/60 bg-[#030711]/95 backdrop-blur-2xl clip-cyber-card shadow-[0_0_60px_rgba(0,229,255,0.35)]">
          <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.3em] uppercase block mb-1">
            06 // BEYOND THE DOORS
          </span>
          <h2 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-wider mb-2">
            IDEAS MOVE DIFFERENT HERE
          </h2>
          <p className="font-mono text-xs text-cyber-cyan tracking-widest uppercase">
            GREATER MINDS BUILD BRIGHTER WORLDS
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 07: INTO THE EXPERIENCE (78 - 88%)                */}
      {/* "Same universe. A bigger you."                          */}
      {/* Screen text: "WELCOME TO PROTOFOS · IDEAS IN MOTION"    */}
      {/* ======================================================== */}
      <div
        className="my-auto max-w-xl mx-auto text-center transition-opacity duration-300"
        style={{
          opacity: s7Opacity,
          display: s7Opacity > 0.01 ? 'block' : 'none',
        }}
      >
        <div className="p-8 border border-cyber-cyan/70 bg-[#030711]/95 backdrop-blur-2xl clip-cyber-card shadow-[0_0_70px_rgba(0,229,255,0.45)]">
          <span className="text-xs font-mono text-cyber-cyan animate-pulse tracking-[0.25em] block mb-2">
            07 // INTO THE EXPERIENCE
          </span>
          <h2 className="font-orbitron font-black text-3xl sm:text-5xl text-white tracking-wider mb-3">
            SAME UNIVERSE. A BIGGER YOU.
          </h2>
          <p className="font-mono text-xs text-slate-300 tracking-widest uppercase">
            WELCOME TO PROTOFOS · IDEAS IN MOTION
          </p>
        </div>
      </div>

    </div>
  );
};
