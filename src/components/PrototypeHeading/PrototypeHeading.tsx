import React from 'react';
import { Terminal, RotateCcw, Sparkles } from 'lucide-react';

interface PrototypeHeadingProps {
  progress: number; // 0.0 to 1.0
  onReplay?: () => void;
  onExplore?: () => void;
}

export const PrototypeHeading: React.FC<PrototypeHeadingProps> = ({
  progress,
  onReplay,
  onExplore,
}) => {
  // Revealed as user reaches the end of the street (0.84 to 1.0)
  const isVisible = progress >= 0.84;
  const clampedProgress = Math.min(Math.max((progress - 0.84) / 0.14, 0), 1);

  return (
    <section
      id="prototypes-destination"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 text-center select-none pointer-events-auto transition-opacity duration-700"
      style={{
        opacity: isVisible ? clampedProgress : 0,
        transform: `translateY(${(1 - clampedProgress) * 35}px)`,
      }}
      aria-label="Prototypes Destination"
    >
      {/* 1. Background Neon Radial Portal Bloom (Yellow core with soft Magenta / Cyan rim) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[920px] h-[520px] pointer-events-none rounded-full blur-[90px] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(248, 223, 36, 0.65) 0%, rgba(255, 39, 216, 0.25) 45%, rgba(0, 207, 255, 0.15) 70%, transparent 85%)',
        }}
      />

      {/* 2. Top Sci-Fi Milestone Marker */}
      <div className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-[#07152F]/90 border border-[#F8DF24]/40 clip-cyber-tag shadow-[0_0_20px_rgba(248,223,36,0.25)]">
        <Sparkles className="w-4 h-4 text-[#F8DF24] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#F8DF24] uppercase">
          DESTINATION REACHED // VANISHING POINT
        </span>
      </div>

      {/* 3. The Monumental "PROTOTYPES" Heading Container (High-contrast glass backdrop for guaranteed readability) */}
      <div className="relative mb-6 max-w-5xl mx-auto px-6 py-4 bg-[#0A0B16]/80 backdrop-blur-md rounded-2xl border border-[#F8DF24]/20 shadow-[0_20px_60px_rgba(10,11,22,0.95)]">
        <h1
          className="font-['Orbitron',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#F5F7FF] via-[#F8DF24] to-[#F8DF24]/90 text-glow-yellow-lg select-none"
        >
          PROTOTYPES
        </h1>

        {/* Cyberpunk Glitch Ghost Underlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-['Orbitron',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider text-[#FF27D8]/15 select-none pointer-events-none blur-[6px] translate-x-1 translate-y-1"
        >
          PROTOTYPES
        </div>
      </div>

      {/* 4. Subtitle & Manifesto */}
      <p className="max-w-2xl font-mono text-sm sm:text-base text-[#F5F7FF]/90 leading-relaxed mb-4 tracking-wide">
        Where ideas in the dark break into tangible matter. 9 tracks, 36 hours of relentless engineering, and the brightest builders in the universe.
      </p>

      <div className="flex items-center justify-center gap-3 font-mono text-xs text-[#F8DF24] tracking-widest mb-10">
        <span>[ 31 OCT — 01 NOV 2026 ]</span>
        <span className="text-[#00CFFF]">•</span>
        <span className="text-[#FF27D8]">[ SYSTEM ONLINE ]</span>
      </div>

      {/* 5. Interactive CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          onClick={onExplore}
          className="w-full sm:w-auto flex-1 py-4 px-8 bg-[#F8DF24] hover:bg-[#F8DF24]/90 text-[#0A0B16] font-mono text-xs font-black tracking-[0.2em] clip-cyber-btn transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(248,223,36,0.5)] hover:shadow-[0_0_40px_rgba(248,223,36,0.8)]"
        >
          <Terminal className="w-4 h-4 text-[#0A0B16]" />
          <span>ENTER THE SYSTEM</span>
        </button>

        <button
          onClick={onReplay}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 bg-[#07152F]/90 hover:bg-[#07152F] text-[#F8DF24] border border-[#F8DF24]/40 font-mono text-xs font-bold tracking-wider clip-cyber-btn transition-colors shadow-lg"
          title="Scroll back to street entrance"
        >
          <RotateCcw className="w-4 h-4 text-[#F8DF24]" />
          <span>REPLAY JOURNEY</span>
        </button>
      </div>

      {/* 6. Footer Telemetry Note */}
      <div className="mt-16 font-mono text-[10px] text-slate-400 tracking-widest">
        <span>PROTOFOS PROTOCOL v4.2 // SPIDER-MAN KINEMATICS ENGINE // ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
};
