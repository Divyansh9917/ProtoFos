import React, { useState } from 'react';
import { TIMELINE_DATA } from '../data/protofosData';
import { Clock, MapPin, Calendar, Sparkles, ChevronRight, Activity } from 'lucide-react';

export const Timeline = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay = TIMELINE_DATA[activeDayIndex];

  return (
    <section 
      id="timeline" 
      className="relative w-full py-28 overflow-hidden select-none"
      aria-label="48-Hour Operational Schedule Timeline"
    >
      {/* 1. Cinematic Blurred City Background (Matches Competitions & Events theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/competitions-assets/spidey/spidey-bg.webp" 
          alt="Cyberpunk Metropolis Background"
          className="w-full h-full object-cover scale-110 filter blur-[20px] opacity-35 brightness-75 contrast-125 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        {/* Dark Cyber Shade Overlay */}
        <div className="absolute inset-0 bg-[#03060d]/75" />
        
        {/* Ambient Radial Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(0, 240, 255, 0.08) 0%, rgba(3, 6, 13, 0.75) 100%)'
          }}
        />

        {/* Top Seamless Fade from Competitions Section (#04070b) */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#04070b] via-[#04070b]/80 to-transparent pointer-events-none" />

        {/* Bottom Seamless Fade into Footer (#020408) */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#020408] via-[#020408]/80 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono font-bold text-xs text-[#00F0FF] tracking-[0.28em] uppercase mb-2">
              <span className="w-2 h-2 bg-[#f6e81e] shadow-[0_0_8px_#f6e81e]"></span>
              <span>05 · 48-HOUR OPERATIONAL SCHEDULE</span>
            </div>
            <h2 className="font-cyberpunk font-bold italic text-4xl sm:text-6xl text-white tracking-tight uppercase">
              THE PROTOFOS <span className="text-[#f6e81e] drop-shadow-[0_0_18px_rgba(246,232,30,0.55)]">PROTOCOL</span>
            </h2>
          </div>

          {/* Futuristic Day Selector Tabs */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            {TIMELINE_DATA.map((day, idx) => {
              const isActive = activeDayIndex === idx;
              return (
                <button
                  key={day.day}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-5 py-2.5 font-cyberpunk font-bold italic text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-[#f6e81e] text-[#04070b] border-[#f6e81e] shadow-[0_0_20px_rgba(246,232,30,0.65)]'
                      : 'bg-[#060b14]/85 backdrop-blur-md border-white/10 text-slate-300 hover:text-[#f6e81e] hover:border-[#f6e81e]/60 hover:bg-[#f6e81e]/5'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{day.day} // {day.date.split(' ')[0]} {day.date.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Day Theme Directive Banner (Futuristic Cyber HUD Box) */}
        <div 
          className="mb-12 p-5 bg-[#060c18]/90 backdrop-blur-md border-l-4 border-l-[#f6e81e] border-y border-r border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)'
          }}
        >
          <div>
            <span className="text-[10px] text-[#f6e81e] tracking-[0.24em] uppercase block font-bold mb-1">
              // TIMELINE DIRECTIVE // ACTIVE PHASE
            </span>
            <span className="text-base sm:text-lg font-cyberpunk font-bold italic text-white tracking-wider uppercase">
              {currentDay.theme}
            </span>
          </div>
          <div className="text-xs text-[#00F0FF] flex items-center gap-2 font-mono font-bold tracking-widest bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1.5 rounded-sm">
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-ping"></span>
            <span>DATE: {currentDay.date}</span>
          </div>
        </div>

        {/* Futuristic System Rail Interface */}
        <div className="relative border-l-2 border-[#00F0FF]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-9">
          {currentDay.schedule.map((slot, index) => {
            const isYellow = index % 2 === 1;
            const accentColor = isYellow ? '#f6e81e' : '#00F0FF';
            
            return (
              <div key={index} className="relative group">
                
                {/* Rail Node Indicator (Futuristic Glowing Diamond) */}
                <div 
                  className={`absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 bg-[#03060d] border-2 rotate-45 transition-all duration-300 group-hover:scale-125 ${
                    isYellow 
                      ? 'border-[#f6e81e] group-hover:bg-[#f6e81e] shadow-[0_0_10px_rgba(246,232,30,0.5)]' 
                      : 'border-[#00F0FF] group-hover:bg-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  }`}
                />

                {/* Futuristic Event-Style Schedule Card */}
                <div 
                  className={`relative p-6 sm:p-7 bg-[#060c18]/90 backdrop-blur-md border border-white/15 transition-all duration-300 hover:-translate-y-1 ${
                    isYellow
                      ? 'hover:border-[#f6e81e] hover:shadow-[0_15px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(246,232,30,0.3)]'
                      : 'hover:border-[#00F0FF] hover:shadow-[0_15px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.3)]'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))'
                  }}
                >
                  {/* Top Row: Telemetry Bar (Time + Location + District Tag) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10 font-mono text-xs">
                    
                    {/* Time Badge with Glowing Capsule */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[10px] text-[#00F0FF] tracking-[0.2em] uppercase">
                        SLOT // 0{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#04070b]/90 border border-[#f6e81e]/40 shadow-[0_0_10px_rgba(246,232,30,0.15)] rounded-sm">
                        <Clock className="w-3.5 h-3.5 text-[#f6e81e]" />
                        <span className="text-[#f6e81e] font-mono font-bold tracking-wider">{slot.time}</span>
                      </div>
                    </div>

                    {/* Location & District Badge */}
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 flex items-center gap-1.5 font-mono text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>{slot.location}</span>
                      </span>
                      <span 
                        className={`px-2.5 py-0.5 text-[9.5px] uppercase tracking-widest font-cyberpunk font-bold rounded-sm border ${
                          isYellow 
                            ? 'bg-[#f6e81e]/15 border-[#f6e81e]/60 text-[#f6e81e] shadow-[0_0_10px_rgba(246,232,30,0.2)]' 
                            : 'bg-[#00F0FF]/15 border-[#00F0FF]/60 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                        }`}
                      >
                        {slot.district}
                      </span>
                    </div>

                  </div>

                  {/* Slot Title in Cyberpunk 2077 Font */}
                  <h3 className="font-cyberpunk font-bold italic text-xl sm:text-2xl text-white tracking-wide uppercase mb-2.5 group-hover:text-[#f6e81e] transition-colors leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {slot.title}
                  </h3>

                  {/* Slot Description */}
                  <p className="text-slate-300 font-sans text-sm sm:text-[15px] leading-relaxed mb-4">
                    {slot.description}
                  </p>

                  {/* Bottom Telemetry Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] text-[#8898a6] tracking-[0.2em] uppercase">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse" />
                      STATUS: OPERATIONAL // TELEMETRY ACTIVE
                    </span>
                    <span className="text-[#f6e81e] font-bold">
                      CLEARANCE // LVL-4 &rarr;
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Timeline;
