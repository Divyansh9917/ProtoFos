import React from 'react';
import { Calendar, Users, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

export const EventCard = ({ event, index, onOpenModal }) => {
  const isBlue = index % 2 === 0;

  return (
    <div
      id={`event-${event.id}`}
      className={`group relative cyber-cut bg-[#0E131F]/90 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isBlue
          ? 'border-slate-800 hover:border-[#00F0FF] hover:shadow-neon-blue'
          : 'border-slate-800 hover:border-[#FCEE0A] hover:shadow-neon-yellow'
      }`}
    >
      {/* Visual Header / District Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
        />

        {/* Cyber overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-[#0E131F]/40 to-transparent" />
        
        {/* District Number & Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-slate-200 bg-[#04060B]/90 px-2.5 py-1 cyber-cut-sm border border-slate-700 font-bold">
            {event.number}
          </span>
          <span className="font-cyberpunk text-xs font-black tracking-widest text-black bg-[#FCEE0A] px-2.5 py-1 cyber-cut-sm shadow-[0_0_12px_rgba(252,238,10,0.6)]">
            {event.prize}
          </span>
        </div>

        {/* District category tag at bottom of visual */}
        <div className="absolute bottom-2 left-3">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00F0FF] font-bold">
            // {event.district}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title */}
          <h3 className="font-cyberpunk font-black italic text-xl sm:text-2xl text-white tracking-wide uppercase mb-2 group-hover:text-[#FCEE0A] transition-colors">
            {event.name}
          </h3>

          {/* Description */}
          <p className="text-slate-300 font-cyber text-base leading-relaxed line-clamp-3 mb-4">
            {event.description}
          </p>
        </div>

        <div>
          {/* Metadata chips */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mb-5">
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">// CREW SIZE</span>
              <span className="text-slate-200 font-bold">{event.teamSize}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px] uppercase">// HOST CLUB</span>
              <span className="text-[#FCEE0A] truncate block font-bold">{event.club}</span>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onOpenModal(event)}
            className={`w-full py-2.5 px-4 cyber-cut-sm font-cyberpunk text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-between border ${
              isBlue
                ? 'bg-[#00F0FF]/10 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-black border-[#00F0FF]/40 hover:border-[#00F0FF]'
                : 'bg-[#FCEE0A]/10 hover:bg-[#FCEE0A] text-[#FCEE0A] hover:text-black border-[#FCEE0A]/40 hover:border-[#FCEE0A]'
            }`}
          >
            <span>ACCESS DISTRICT INTEL</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Subtle Scanline Texture on Card */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
    </div>
  );
};
