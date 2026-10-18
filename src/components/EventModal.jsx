import React from 'react';
import { X, Calendar, Trophy, Users, Shield, ArrowRight, ExternalLink, Cpu } from 'lucide-react';

export const EventModal = ({ event, onClose, onRegister }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#080D1A] border border-cyan-400/50 cyber-corner p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(0,240,255,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-ping"></span>
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
              SECTOR DOSSIER // {event.number}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero image & district header */}
        <div className="relative h-56 sm:h-64 w-full cyber-cut overflow-hidden mb-6 border border-slate-800">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="font-cyberpunk font-bold text-xs text-black tracking-widest uppercase bg-[#FCEE0A] px-2.5 py-0.5 cyber-cut-sm shadow-[0_0_10px_rgba(252,238,10,0.6)]">
                {event.district}
              </span>
              <h2 className="font-cyberpunk font-black italic text-2xl sm:text-4xl text-white tracking-wide uppercase mt-1">
                {event.name}
              </h2>
            </div>
            <div className="font-mono text-xs text-[#00F0FF] bg-[#04060B]/90 px-3 py-1.5 border border-[#00F0FF]/40 cyber-cut-sm">
              PRIZE: <span className="text-[#FCEE0A] font-bold">{event.prize}</span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-[#04060B]/80 border border-slate-800 cyber-cut-sm">
            <span className="font-mono text-[10px] text-slate-400 block mb-1 uppercase">// DATE & TIME</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-bold">{event.date}</span>
            </div>
          </div>
          <div className="p-3 bg-[#04060B]/80 border border-slate-800 cyber-cut-sm">
            <span className="font-mono text-[10px] text-slate-400 block mb-1 uppercase">// HOST GUILD</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
              <Cpu className="w-3.5 h-3.5 text-[#FCEE0A]" />
              <span className="font-bold text-[#FCEE0A]">{event.club}</span>
            </div>
          </div>
          <div className="p-3 bg-[#04060B]/80 border border-slate-800 cyber-cut-sm">
            <span className="font-mono text-[10px] text-slate-400 block mb-1 uppercase">// CREW CAPACITY</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
              <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-bold">{event.teamSize}</span>
            </div>
          </div>
        </div>

        {/* Overview paragraph */}
        <div className="mb-6">
          <h4 className="font-mono text-xs text-[#00F0FF] tracking-wider uppercase mb-2 font-bold">
            // DISTRICT MISSION PROTOCOL
          </h4>
          <p className="text-slate-300 font-cyber text-base sm:text-lg leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Technical specifications */}
        {event.specifications && (
          <div className="mb-8">
            <h4 className="font-mono text-xs text-[#FCEE0A] tracking-wider uppercase mb-3 font-bold">
              // TECHNICAL SPECIFICATIONS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {event.specifications.map((spec, i) => (
                <div key={i} className="p-2.5 bg-[#04060B] border border-slate-800 text-xs font-mono cyber-cut-sm">
                  <div className="text-[10px] text-slate-400 uppercase">// {spec.label}</div>
                  <div className="text-[#00F0FF] font-cyberpunk font-bold text-sm">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {event.tags.map((t, i) => (
            <span key={i} className="px-2.5 py-1 text-xs font-mono bg-[#04060B] border border-slate-800 text-slate-300 cyber-cut-sm">
              #{t}
            </span>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <span className="font-mono text-xs text-slate-400">
            SLOTS REMAINING: <span className="text-[#FCEE0A] font-bold">LIMITED POSITIONS</span>
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs tracking-wider cyber-cut-sm uppercase"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(event);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 cyber-cut bg-[#FCEE0A] hover:bg-white text-black font-cyberpunk font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:shadow-neon-yellow transition-all uppercase"
            >
              <span>REGISTER CREW</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
