import React, { useState } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import { cyberAudio } from '../../utils/audioSystem';

interface FrameUIProps {
  progress: number;
  onSkipIntro: () => void;
  onOpenRegister: () => void;
  onNavigate: (section: string) => void;
}

export const FrameUI: React.FC<FrameUIProps> = ({
  progress,
  onSkipIntro,
  onOpenRegister,
  onNavigate,
}) => {
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const isNowPlaying = cyberAudio.toggle();
    setAudioActive(isNowPlaying);
  };

  const isIntro = progress < 0.88;

  return (
    <>
      {/* Top Cyber Navigation Bar (Matches Storyboard Frame UI) */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto">
        {/* Left: Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <span className="font-orbitron font-black text-xl tracking-[0.2em] text-white group-hover:text-cyber-cyan transition-colors">
            PROTOFOS
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/40">
            2026
          </span>
        </div>

        {/* Center: Storyboard Nav Links (HOME / EVENTS / CLUBS / ABOUT) */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: 'HOME' },
            { id: 'events', label: 'EVENTS' },
            { id: 'hackathon', label: 'HACKATHON' },
            { id: 'clubs', label: 'CLUBS' },
            { id: 'about', label: 'ABOUT' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="font-mono text-xs tracking-[0.2em] text-slate-300 hover:text-cyber-cyan transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Audio Toggle + Outlined "GET TICKETS" Button (Storyboard requirement) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSound}
            title={audioActive ? 'Mute Cyber Audio' : 'Play Cyber Ambient Rain & Drone'}
            className={`p-2 rounded border transition-all text-xs font-mono flex items-center gap-1.5 ${
              audioActive
                ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'border-slate-800 bg-[#040814]/80 text-slate-400 hover:text-white'
            }`}
          >
            {audioActive ? <Volume2 size={15} className="animate-pulse" /> : <VolumeX size={15} />}
            <span className="hidden sm:inline text-[10px]">{audioActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="px-5 py-2 font-orbitron font-bold text-xs tracking-[0.2em] text-cyber-cyan border border-cyber-cyan/70 hover:bg-cyber-cyan hover:text-black transition-all clip-cyber-btn shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)]"
          >
            GET TICKETS
          </button>
        </div>
      </header>

      {/* Right Edge: Vertical Storyboard Text "TECH · PEOPLE · IDEAS · IMPACT" */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden lg:block">
        <div className="writing-mode-vertical text-[10px] font-mono tracking-[0.35em] text-slate-500 uppercase flex items-center gap-3">
          <span className="w-8 h-[1px] bg-cyber-cyan/50 rotate-90" />
          <span>TECH · PEOPLE · IDEAS · IMPACT</span>
          <span className="w-8 h-[1px] bg-cyber-magenta/50 rotate-90" />
        </div>
      </div>

      {/* Bottom Footer Strip (Storyboard requirement: "PROTOFOS … IDEAS TODAY · A BRIGHTER TOMORROW … 2026") */}
      {isIntro && (
        <div className="fixed bottom-0 left-0 w-full z-30 px-6 sm:px-12 py-3 bg-[#02050e]/80 backdrop-blur-sm border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">PROTOFOS 2026</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-cyber-cyan tracking-wider">
              IDEAS TODAY · A BRIGHTER TOMORROW
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSkipIntro}
              className="text-cyber-cyan/90 hover:text-cyber-cyan flex items-center gap-1.5 font-bold tracking-widest cursor-pointer px-2 py-1 rounded border border-cyber-cyan/30 bg-cyber-cyan/10 hover:bg-cyber-cyan/20 transition-all"
            >
              <FastForward size={12} />
              <span>SKIP INTRO</span>
            </button>

            <span className="text-slate-400">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      )}
    </>
  );
};
