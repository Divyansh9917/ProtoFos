import React from 'react';
import { Volume2, VolumeX, Eye, EyeOff, ChevronDown, Compass, FastForward } from 'lucide-react';
import { EventItem } from '../../types';

interface MinimalHUDProps {
  progress: number;
  events: EventItem[];
  activeEventIndex: number;
  reducedMotion: boolean;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onToggleMotion: () => void;
  onSkipToEnd: () => void;
}

export const MinimalHUD: React.FC<MinimalHUDProps> = ({
  progress,
  events,
  activeEventIndex,
  reducedMotion,
  isAudioActive,
  onToggleAudio,
  onToggleMotion,
  onSkipToEnd,
}) => {
  const currentEvent = events[activeEventIndex] || events[0];
  const percentText = Math.min(Math.round(progress * 100), 100);

  return (
    <header className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* 1. TOP STRIP */}
      <div className="flex items-start justify-between w-full">
        {/* Top Left: Sci-Fi Telemetry & Coordinates */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F8DF24] animate-pulse shadow-[0_0_8px_#F8DF24]" />
            <span className="font-['Orbitron',sans-serif] text-xs sm:text-sm font-black tracking-[0.2em] text-[#F5F7FF]">
              PROTOFOS<span className="text-[#F8DF24]">.2026</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#00CFFF] border-l border-white/10 pl-2">
              NEON MEGAPOLIS AVENUE
            </span>
          </div>

          <div className="font-mono text-[10px] sm:text-[11px] text-[#F8DF24]/90 tracking-widest flex items-center gap-2">
            <span>SECTOR // 09</span>
            <span className="text-[#00CFFF]">•</span>
            <span>AVENUE PATROL: {percentText}%</span>
            <span className="text-[#FF27D8]">•</span>
            <span className="hidden sm:inline text-slate-400">HERO: SPIDER-MAN</span>
          </div>
        </div>

        {/* Top Right: Minimal Controls (Audio, Motion, Progress) */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleMotion}
            aria-label={reducedMotion ? 'Enable Cinematic Motion' : 'Enable Reduced Motion'}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#07152F]/85 hover:bg-[#07152F] border border-[#F8DF24]/30 hover:border-[#F8DF24] text-[#F5F7FF] hover:text-[#F8DF24] font-mono text-[10px] sm:text-xs clip-cyber-tag transition-all shadow-md backdrop-blur-md"
            title={reducedMotion ? 'Switch to dynamic animations' : 'Reduce heavy animations'}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5 text-[#F8DF24]" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden md:inline">{reducedMotion ? 'MOTION: REDUCED' : 'MOTION: DYNAMIC'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            aria-label={isAudioActive ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#07152F]/85 hover:bg-[#07152F] border border-[#F8DF24]/30 hover:border-[#F8DF24] text-[#F5F7FF] hover:text-[#F8DF24] font-mono text-[10px] sm:text-xs clip-cyber-tag transition-all shadow-md backdrop-blur-md"
            title="Toggle futuristic ambient drone"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F8DF24] animate-pulse" />
                <span className="hidden md:inline text-[#F8DF24]">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline text-slate-400">AUDIO: OFF</span>
              </>
            )}
          </button>

          {/* Progress Circular Badge */}
          <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-[#F8DF24]/40 bg-[#07152F]/90 font-mono text-[10px] text-[#F8DF24] font-bold shadow-[0_0_12px_rgba(248,223,36,0.25)]">
            {percentText}%
          </div>
        </div>
      </div>

      {/* 2. BOTTOM STRIP */}
      <div className="flex items-end justify-between w-full">
        {/* Bottom Left: Active Node Telemetry */}
        <div className="hidden sm:flex flex-col gap-1 pointer-events-auto bg-[#07152F]/80 backdrop-blur-md px-3.5 py-2 border border-white/10 clip-cyber-corner">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300 tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#00CFFF]" />
            <span>CORRIDOR POSITION:</span>
            <span className="text-[#F8DF24] font-bold">
              [{currentEvent.number}/09]
            </span>
          </div>
          <div className="font-['Orbitron',sans-serif] text-xs font-bold text-[#F5F7FF] tracking-wide truncate max-w-xs">
            {currentEvent.title}
          </div>
        </div>

        {/* Bottom Center: Scroll Prompt (fades out as user scrolls) */}
        <div
          className={`mx-auto transition-opacity duration-500 flex flex-col items-center pointer-events-none ${
            progress > 0.05 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#F8DF24] text-glow-yellow mb-1.5 uppercase">
            SCROLL TO ADVANCE // SPIDER-MAN PATROL
          </span>
          <div className="flex flex-col items-center animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#F8DF24]" />
            <ChevronDown className="w-4 h-4 text-[#F8DF24] -mt-2 opacity-60" />
          </div>
        </div>

        {/* Bottom Right: Quick Jump to End / Prototypes */}
        {progress < 0.82 && (
          <button
            onClick={onSkipToEnd}
            className="pointer-events-auto flex items-center gap-2 py-2 px-3 sm:px-4 bg-[#07152F]/85 hover:bg-[#07152F] border border-[#F8DF24]/30 hover:border-[#F8DF24] text-[#F5F7FF] hover:text-[#F8DF24] font-mono text-[10px] sm:text-xs tracking-wider clip-cyber-tag transition-all shadow-lg backdrop-blur-md ml-auto"
            title="Fast forward to PROTOTYPES heading"
          >
            <span>SKIP TO PROTOTYPES</span>
            <FastForward className="w-3.5 h-3.5 text-[#F8DF24]" />
          </button>
        )}
      </div>
    </header>
  );
};
