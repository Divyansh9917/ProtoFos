import React, { useState } from 'react';
import { Trophy, Users, Clock, MapPin, ChevronRight, X, Cpu, Code, Radio, Bot, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { EVENTS } from '../../data/eventsData';
import { cyberAudio } from '../../utils/audioSystem';

const ICON_MAP = {
  Code,
  Cpu,
  Radio,
  Bot,
  TrendingUp,
  Sparkles,
  Layers,
};

export const EventsSection = ({ onOpenRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = ['ALL', 'FLAGSHIP', 'HARDWARE', 'AEROSPACE', 'ROBOTICS', 'ENTREPRENEURSHIP', 'HANDS-ON'];

  const filteredEvents = selectedCategory === 'ALL'
    ? EVENTS
    : EVENTS.filter(e => e.category === selectedCategory);

  return (
    <section id="events" className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header matching Storyboard Panel 09 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyber-cyan/20 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan tracking-[0.25em] mb-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <span>09 // MULTIPLE TRACKS, ONE BIGGER TOMORROW</span>
          </div>
          <h2 className="font-orbitron font-black text-4xl sm:text-6xl text-white tracking-wide">
            EVENTS DIRECTORY
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                cyberAudio.playCyberBeep();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all clip-cyber-tag border ${
                selectedCategory === cat
                  ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold'
                  : 'border-slate-800 bg-[#040814] text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid: 6+ Modular Cyber Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const IconComponent = ICON_MAP[evt.icon] || Code;

          return (
            <div
              key={evt.id}
              className="p-6 rounded-sm border border-slate-800/80 bg-[#040816]/85 backdrop-blur-md clip-cyber-card hover:border-cyber-cyan transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-1 text-[10px] font-mono tracking-widest font-bold rounded-sm border"
                    style={{
                      borderColor: evt.color,
                      color: evt.color,
                      backgroundColor: `${evt.color}15`,
                    }}
                  >
                    {evt.badge}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold">
                    <Trophy size={14} />
                    <span>{evt.prize}</span>
                  </div>
                </div>

                {/* Event Title */}
                <h3 className="font-orbitron font-extrabold text-2xl text-white group-hover:text-cyber-cyan transition-colors mb-1">
                  {evt.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {evt.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  {evt.description}
                </p>

                {/* Event Tracks */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {evt.tracks.map((tr, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metadata + Action */}
              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Users size={13} />
                  <span>{evt.teamSize}</span>
                </div>

                <button
                  onClick={() => {
                    cyberAudio.playCyberBeep();
                    setActiveModalEvent(evt);
                  }}
                  className="px-3 py-1.5 text-xs font-mono tracking-wider font-semibold text-cyber-cyan border border-cyber-cyan/40 hover:bg-cyber-cyan hover:text-black transition-all flex items-center gap-1 rounded-sm"
                >
                  <span>SPECS</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl p-8 border border-cyber-cyan bg-[#04091a] clip-cyber-card shadow-[0_0_50px_rgba(0,229,255,0.35)]">
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <span
              className="px-3 py-1 text-xs font-mono font-bold border rounded-sm inline-block mb-3"
              style={{
                borderColor: activeModalEvent.color,
                color: activeModalEvent.color,
              }}
            >
              {activeModalEvent.badge} // SPECIFICATION
            </span>

            <h3 className="font-orbitron font-extrabold text-3xl text-white mb-2">
              {activeModalEvent.title}
            </h3>

            <p className="text-sm font-mono text-cyber-cyan mb-6">
              {activeModalEvent.tagline}
            </p>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {activeModalEvent.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300 border-t border-b border-slate-800 py-4 mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-amber-400" />
                <span>Prize: {activeModalEvent.prize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-cyber-cyan" />
                <span>Team: {activeModalEvent.teamSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyber-magenta" />
                <span>Schedule: {activeModalEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                <span>Venue: {activeModalEvent.venue}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  setActiveModalEvent(null);
                  onOpenRegister(activeModalEvent.title);
                }}
                className="px-6 py-2.5 text-xs font-orbitron font-bold tracking-widest bg-cyber-cyan text-black clip-cyber-btn hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.5)]"
              >
                REGISTER TEAM NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
