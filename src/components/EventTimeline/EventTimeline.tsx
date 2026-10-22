import React, { useState } from 'react';
import { EventItem } from '../../types';
import { EventCard } from '../EventCard/EventCard';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface EventTimelineProps {
  events: EventItem[];
  progress: number; // 0.0 to 1.0
  onSelectEvent?: (event: EventItem) => void;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
  events,
  progress,
  onSelectEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleInspect = (event: EventItem) => {
    setSelectedEvent(event);
    onSelectEvent?.(event);
  };

  // Determine active card based on scroll progress (0.0 to 0.85 covers the 9 cards)
  const activeIndex = Math.min(
    Math.floor((progress / 0.85) * events.length),
    events.length - 1
  );

  return (
    <div className="relative w-full z-10 pointer-events-none">
      {/* Pacing along the avenue for 9 cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-48 md:space-y-64">
        {events.map((event, index) => {
          // Alternating left/right layout along the street
          const isLeft = index % 2 === 0;

          // Progressive reveal trigger threshold for this card
          const triggerProgress = 0.04 + (index / (events.length + 0.5)) * 0.74;
          const isRevealed = progress >= triggerProgress - 0.06;
          const isCurrentFocus = activeIndex === index;

          return (
            <div
              key={event.id}
              id={`event-step-${index}`}
              className={`relative flex w-full transition-all duration-700 ease-out ${
                isLeft ? 'justify-start md:pr-[45%]' : 'justify-end md:pl-[45%]'
              } ${
                isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-16 scale-95'
              }`}
            >
              {/* Neon Connector Wire to Road Corridor (Yellow with Cyan/Magenta Node) */}
              <div
                className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-24 lg:w-36 h-[2px] pointer-events-none transition-all duration-500 ${
                  isLeft
                    ? 'right-[-96px] lg:right-[-144px] bg-gradient-to-r from-[#F8DF24]/80 to-transparent'
                    : 'left-[-96px] lg:left-[-144px] bg-gradient-to-l from-[#F8DF24]/80 to-transparent'
                } ${isCurrentFocus ? 'opacity-100 shadow-[0_0_8px_#F8DF24]' : 'opacity-25'}`}
              >
                {/* Node on wire */}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
                    index % 2 === 0 ? 'bg-[#00CFFF] shadow-[0_0_10px_#00CFFF]' : 'bg-[#FF27D8] shadow-[0_0_10px_#FF27D8]'
                  } ${isLeft ? 'right-0' : 'left-0'}`}
                />
              </div>

              {/* Event Card Component */}
              <EventCard
                event={event}
                index={index}
                align={isLeft ? 'left' : 'right'}
                isActive={isCurrentFocus}
                onInspect={handleInspect}
              />
            </div>
          );
        })}
      </div>

      {/* Inspect Protocol Modal Dialog */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0B16]/85 backdrop-blur-md pointer-events-auto animate-fade-in"
        >
          <div className="relative w-full max-w-lg bg-[#07152F] border border-[#F8DF24]/60 clip-cyber-card p-6 text-[#F5F7FF] shadow-[0_0_50px_rgba(248,223,36,0.25)]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#F8DF24] p-1.5 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#F8DF24] px-2 py-0.5 bg-[#F8DF24]/10 border border-[#F8DF24]/40 clip-cyber-tag">
                EVT // {selectedEvent.number}
              </span>
              <span className="text-xs font-mono tracking-widest text-[#00CFFF]">
                {selectedEvent.category} // {selectedEvent.badge}
              </span>
            </div>

            <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold text-[#F5F7FF] mb-2">
              {selectedEvent.title}
            </h2>

            <p className="font-mono text-xs text-[#F8DF24] mb-4">
              {selectedEvent.tagline}
            </p>

            <p className="text-sm text-[#F5F7FF]/85 leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            {/* Intel Briefing Alert */}
            {selectedEvent.intelBrief && (
              <div className="flex items-start gap-3 p-3.5 bg-[#0A0B16]/60 border border-[#F8DF24]/25 rounded mb-6 text-xs text-[#F5F7FF]/90">
                <ShieldAlert className="w-4 h-4 text-[#F8DF24] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8DF24] block mb-0.5">
                    INTELLIGENCE BRIEF:
                  </span>
                  {selectedEvent.intelBrief}
                </div>
              </div>
            )}

            {/* Specs Summary Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3 bg-[#0A0B16]/70 rounded border border-white/10 mb-6">
              <div>
                <span className="text-[#00CFFF] block text-[10px] font-bold">PRIZE POOL</span>
                <span className="text-[#F8DF24] font-bold text-sm">
                  {selectedEvent.prize}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TEAM CAPACITY</span>
                <span className="text-[#F5F7FF]">{selectedEvent.teamSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VENUE LOCATION</span>
                <span className="text-[#F5F7FF]">{selectedEvent.venue}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TIMING</span>
                <span className="text-[#F5F7FF]">{selectedEvent.time}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 py-3 px-4 bg-[#F8DF24] hover:bg-[#F8DF24]/90 text-[#0A0B16] font-mono text-xs font-bold tracking-wider clip-cyber-btn transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(248,223,36,0.4)]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>CONFIRM PROTOCOL ENTRY</span>
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs clip-cyber-btn border border-white/10 transition-colors"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
