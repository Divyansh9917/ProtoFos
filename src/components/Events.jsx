import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/protofosData';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { Layers, Compass, Radio } from 'lucide-react';

export const Events = ({ onRegisterCrew }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = [
    'ALL',
    'SOFTWARE & AI',
    'HARDWARE & MECHATRONICS',
    'AVIONICS & AERONAUTICS',
    'ENTREPRENEURSHIP',
    'AUTONOMOUS & RC'
  ];

  const filteredEvents = selectedCategory === 'ALL'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.category === selectedCategory);

  return (
    <section id="events" className="relative w-full py-28 bg-[#030712] overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-cyberpunk font-bold text-xs text-[#00F0FF] tracking-[0.3em] uppercase mb-2">
              <span className="w-2 h-2 bg-[#FCEE0A] animate-ping"></span>
              <span>METROPOLITAN SECTOR DIVISIONS</span>
            </div>
            <h2 className="font-cyberpunk font-black italic text-4xl sm:text-6xl text-white tracking-tight uppercase">
              CITY <span className="text-[#FCEE0A] text-glow-yellow">DISTRICTS</span>
            </h2>
            <p className="font-mono text-xs text-slate-400 tracking-wider mt-2 uppercase">
              // EVERY EVENT IS A HIGH-STAKES DISTRICT INSIDE THE PROTOFOS 2026 METROPOLIS.
            </p>
          </div>

          <div className="mt-6 md:mt-0 font-mono text-xs text-slate-400 flex items-center gap-3">
            <span className="bg-[#FCEE0A] text-black font-cyberpunk font-black text-xs px-2.5 py-1 cyber-cut-sm uppercase">TOTAL SECTORS: 06</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#00F0FF] font-bold">STATUS: OPEN FOR CHALLENGERS</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 cyber-cut-sm font-cyberpunk font-bold text-xs tracking-wider whitespace-nowrap transition-all duration-300 uppercase ${
                selectedCategory === cat
                  ? 'bg-[#FCEE0A] text-black shadow-neon-yellow'
                  : 'bg-[#0E131F]/90 border border-slate-800 text-slate-300 hover:text-white hover:border-[#00F0FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onOpenModal={(ev) => setActiveModalEvent(ev)}
            />
          ))}
        </div>

        {/* Event Detail Modal */}
        {activeModalEvent && (
          <EventModal
            event={activeModalEvent}
            onClose={() => setActiveModalEvent(null)}
            onRegister={(ev) => {
              if (onRegisterCrew) {
                onRegisterCrew(ev);
              }
            }}
          />
        )}

      </div>
    </section>
  );
};
