import React, { useState } from 'react';
import { TIMELINE_DATA } from '../data/protofosData';
import { Clock, MapPin, Radio, Calendar, CheckCircle, ChevronRight } from 'lucide-react';

export const Timeline = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay = TIMELINE_DATA[activeDayIndex];

  return (
    <section id="timeline" className="relative w-full py-28 bg-[#030712] overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-cyberpunk font-bold text-xs text-[#00F0FF] tracking-[0.3em] uppercase mb-2">
              <span className="w-2 h-2 bg-[#FCEE0A]"></span>
              <span>48-HOUR OPERATIONAL SCHEDULE</span>
            </div>
            <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl text-white tracking-tight uppercase">
              THE PROTOFOS <span className="text-[#FCEE0A] text-glow-yellow">PROTOCOL</span>
            </h2>
          </div>

          {/* Day Selector Buttons */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            {TIMELINE_DATA.map((day, idx) => (
              <button
                key={day.day}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-5 py-2.5 cyber-cut-sm font-cyberpunk font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeDayIndex === idx
                    ? 'bg-[#FCEE0A] text-black shadow-neon-yellow'
                    : 'bg-[#0E131F] border border-slate-800 text-slate-300 hover:text-white hover:border-[#00F0FF]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{day.day} // {day.date.split(' ')[0]} {day.date.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Theme Banner */}
        <div className="mb-10 p-4 bg-[#0E131F]/90 border border-slate-800 cyber-cut flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          <div>
            <span className="text-[10px] text-[#FCEE0A] tracking-widest uppercase block font-bold">// TIMELINE DIRECTIVE</span>
            <span className="text-sm font-cyberpunk font-bold text-white tracking-wider">{currentDay.theme}</span>
          </div>
          <div className="text-xs text-[#00F0FF] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00F0FF] animate-ping"></span>
            <span className="font-bold">DATE: {currentDay.date}</span>
          </div>
        </div>

        {/* Futuristic System Rail Interface */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {currentDay.schedule.map((slot, index) => {
            const isYellow = index % 2 === 1;
            return (
              <div key={index} className="relative group">
                {/* Rail Node Indicator */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 bg-[#04060B] border-2 transition-all duration-300 group-hover:scale-125 ${
                  isYellow ? 'border-[#FCEE0A] group-hover:bg-[#FCEE0A]' : 'border-[#00F0FF] group-hover:bg-[#00F0FF]'
                }`}></div>

                {/* Schedule Card */}
                <div className={`p-6 bg-[#0E131F]/90 border cyber-cut transition-all duration-300 ${
                  isYellow
                    ? 'border-slate-800 hover:border-[#FCEE0A] hover:shadow-neon-yellow'
                    : 'border-slate-800 hover:border-[#00F0FF] hover:shadow-neon-blue'
                }`}>
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isYellow ? 'text-[#FCEE0A]' : 'text-[#00F0FF]'}`} />
                      <span className="text-white font-bold tracking-wider">{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{slot.location}</span>
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider cyber-cut-sm font-cyberpunk font-bold ${
                        isYellow ? 'bg-[#FCEE0A] text-black' : 'bg-[#00F0FF] text-black'
                      }`}>
                        {slot.district}
                      </span>
                    </div>
                  </div>

                  {/* Slot Title */}
                  <h3 className="font-cyberpunk font-black italic text-lg sm:text-xl text-white tracking-wide uppercase mb-2 group-hover:text-[#FCEE0A] transition-colors">
                    {slot.title}
                  </h3>

                  {/* Slot Description */}
                  <p className="text-slate-300 font-cyber text-base leading-relaxed">
                    {slot.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
