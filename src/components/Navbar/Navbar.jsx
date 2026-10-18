import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Shield, Sparkles } from 'lucide-react';
import { useScrollProgress } from '../../context/ScrollContext';
import { cyberAudio } from '../../utils/audioSystem';

export const Navbar = ({ onOpenRegister }) => {
  const { scrollProgress, activeSection, scrollToSection } = useScrollProgress();
  const [audioActive, setAudioActive] = useState(false);

  const toggleSound = () => {
    const isNowPlaying = cyberAudio.toggle();
    setAudioActive(isNowPlaying);
  };

  const isScrolled = scrollProgress > 0.05;

  return (
    <>
      {/* Top Cyber Telemetry Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-slate-900 z-50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-magenta transition-all duration-75"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#030711]/80 backdrop-blur-md border-b border-cyber-cyan/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              cyberAudio.playCyberBeep();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-9 h-9 rounded-sm border border-cyber-cyan/60 bg-cyber-cyan/10 flex items-center justify-center relative overflow-hidden group-hover:border-cyber-cyan transition-colors">
              <span className="font-orbitron font-extrabold text-cyber-cyan text-sm tracking-wider">
                PF
              </span>
              <div className="absolute inset-0 bg-cyber-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-lg tracking-[0.25em] text-white group-hover:text-cyber-cyan transition-colors">
                  PROTOFOS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/40">
                  2026
                </span>
              </div>
              <span className="block text-[9px] font-mono tracking-widest text-slate-400">
                MEGACITY // OCT 31 — NOV 01
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'about', label: 'ABOUT' },
              { id: 'events', label: 'EVENTS' },
              { id: 'hackathon', label: 'HACKATHON' },
              { id: 'clubs', label: 'CLUBS' },
              { id: 'sponsors', label: 'SPONSORS' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  cyberAudio.playCyberBeep();
                  scrollToSection(link.id);
                }}
                className={`text-xs font-mono tracking-[0.2em] transition-all relative py-1 hover:text-cyber-cyan ${
                  activeSection === link.id
                    ? 'text-cyber-cyan font-semibold'
                    : 'text-slate-300'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan shadow-[0_0_8px_#00e5ff]" />
                )}
              </button>
            ))}
          </div>

          {/* Actions: Audio Ambient Toggle + Register CTA */}
          <div className="flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={audioActive ? 'Mute Cyber Rain Audio' : 'Enable Cyber Rain & Atmosphere Audio'}
              className={`p-2 rounded-sm border transition-all flex items-center gap-2 text-xs font-mono ${
                audioActive
                  ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {audioActive ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
              <span className="hidden sm:inline text-[10px] tracking-wider">
                {audioActive ? 'AUDIO: ON' : 'AUDIO: OFF'}
              </span>
            </button>

            {/* Register CTA Button */}
            <button
              onClick={() => {
                cyberAudio.playCyberBeep();
                onOpenRegister();
              }}
              className="relative group px-5 py-2 text-xs font-orbitron font-bold tracking-[0.2em] text-black bg-cyber-cyan hover:bg-white transition-all clip-cyber-btn shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.8)]"
            >
              REGISTER
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
