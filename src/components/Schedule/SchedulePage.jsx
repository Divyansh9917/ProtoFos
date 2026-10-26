import React, { useState, useMemo } from 'react';
import {
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Cpu,
  TrendingUp,
  Award
} from 'lucide-react';
import { FEST_DAYS, SCHEDULE_EVENTS } from '../../data/scheduleData';

export const SchedulePage = ({ onNavigate, isSection = false }) => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Sectors' },
    { id: 'software-ai', label: 'Software & AI' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'markets', label: 'Markets' },
    { id: 'ceremony', label: 'Ceremonies' },
  ];

  const filteredEvents = useMemo(() => {
    return SCHEDULE_EVENTS.filter((evt) => {
      const matchDay = selectedDay === 'all' || evt.dayId === selectedDay;
      const matchCategory = selectedCategory === 'all' || evt.categorySlug === selectedCategory;
      return matchDay && matchCategory;
    });
  }, [selectedDay, selectedCategory]);

  const getCategoryIcon = (categorySlug) => {
    switch (categorySlug) {
      case 'software-ai':
        return <Cpu className="w-3.5 h-3.5 text-[#19e3f5]" />;
      case 'robotics':
        return <Layers className="w-3.5 h-3.5 text-[#f6e81e]" />;
      case 'markets':
        return <TrendingUp className="w-3.5 h-3.5 text-[#a855f7]" />;
      case 'ceremony':
        return <Award className="w-3.5 h-3.5 text-[#f6e81e]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#19e3f5]" />;
    }
  };

  const handleEventClick = (e, competitionSlug) => {
    if (!competitionSlug) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/competitions/${competitionSlug}`);
    } else {
      window.history.pushState(null, '', `/competitions/${competitionSlug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className={`relative w-full text-slate-100 overflow-hidden ${isSection ? 'py-4' : 'min-h-screen bg-[#04070b] pb-24 pt-12'}`}>
      {/* Background Cyber Grid & Glow Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #19e3f5 1px, transparent 1px), linear-gradient(to bottom, #19e3f5 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#19e3f5]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-[#f6e81e]/5 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ===================================================================
            HEADER SECTION
            =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* HUD Status Chip */}
          {/* <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#060c18]/90 border border-[#19e3f5]/30 mb-5 shadow-[0_0_15px_rgba(25,227,245,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-spacemono text-[10px] sm:text-xs text-[#19e3f5] tracking-[0.2em] uppercase font-semibold">
              OFFICIAL PROTOCOL // 2026 TIMELINE
            </span>
          </div> */}

          <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase mb-4 drop-shadow-[0_0_25px_rgba(246,232,30,0.35)]">
            EVENT <span className="text-[#f6e81e] drop-shadow-[0_0_15px_rgba(246,232,30,0.6)]">SCHEDULE</span>
          </h1>

          {/* <p className="font-spacemono text-xs sm:text-sm text-slate-300 tracking-wider max-w-2xl mx-auto leading-relaxed">
            CHRONOLOGICAL MISSION LOG FOR PROTOFOS 2026. PARTICIPATE IN HIGH-OCTANE COMPETITIONS, WORKSHOPS, AND ROBOTICS CLASHES ACROSS 3 ACTION-PACKED DAYS.
          </p> */}

          {/* Quick Date Pills */}

        </div>

        {/* ===================================================================
            INTERACTIVE CONTROLS: DAY TABS & CATEGORY FILTER
            =================================================================== */}
        <div className="mb-10 space-y-5">
          {/* Day Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {FEST_DAYS.map((d) => {
              const isActive = selectedDay === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDay(d.id)}
                  className={`relative px-4 sm:px-6 py-2.5 font-spacemono text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-[#f6e81e] text-[#04070b] font-bold shadow-[0_0_20px_rgba(246,232,30,0.5)]'
                    : 'bg-[#060c18]/80 text-slate-300 hover:text-white border border-white/10 hover:border-[#19e3f5]/50'
                    }`}
                  style={{
                    clipPath:
                      'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 opacity-80" />
                    <span>{d.label}</span>
                    {d.dateStr && (
                      <span className={`text-[10px] hidden md:inline opacity-75 ${isActive ? 'text-[#04070b]' : 'text-[#19e3f5]'}`}>
                        ({d.dateStr})
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sector Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="font-spacemono text-[11px] text-slate-400 mr-2 flex items-center gap-1.5 hidden sm:inline-flex">
              <Filter className="w-3 h-3 text-[#19e3f5]" /> Filter by Sector:
            </span>
            {categories.map((c) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1 rounded text-[11px] font-spacemono tracking-wider uppercase transition-all duration-150 cursor-pointer ${isSelected
                    ? 'bg-[#19e3f5]/20 text-[#19e3f5] border border-[#19e3f5] shadow-[0_0_10px_rgba(25,227,245,0.3)] font-semibold'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/20'
                    }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            EVENTS TIMELINE LIST
            =================================================================== */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-[#060c18]/60 border border-white/10 p-8 rounded-lg max-w-xl mx-auto">
            <ShieldAlert className="w-10 h-10 text-[#f6e81e] mx-auto mb-3 opacity-80" />
            <h3 className="font-orbitron text-lg font-bold text-white mb-2 uppercase tracking-wider">
              No Events Found
            </h3>
            <p className="font-spacemono text-xs text-slate-400 mb-4">
              No events scheduled under the selected filter combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDay('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#19e3f5]/15 text-[#19e3f5] border border-[#19e3f5]/50 text-xs font-spacemono tracking-wider uppercase hover:bg-[#19e3f5]/25"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline Spine Line on Desktop */}
            <div className="hidden sm:block absolute left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#19e3f5]/60 via-[#f6e81e]/40 to-[#19e3f5]/20 pointer-events-none" />

            <div className="space-y-6 sm:space-y-8">
              {filteredEvents.map((evt, idx) => {
                const hasCompetition = Boolean(evt.competitionSlug);
                const eventAccent = evt.accent || '#19e3f5';
                const isHovered = hoveredCardId === evt.id;

                return (
                  <div
                    key={evt.id}
                    className="relative group transition-all duration-300"
                    onMouseEnter={() => setHoveredCardId(evt.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                  >
                    {/* Glowing Node Dot on Timeline */}
                    <div
                      className="hidden sm:flex absolute left-8 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-[#04070b] border-2 items-center justify-center z-10 transition-all duration-300"
                      style={{
                        borderColor: isHovered ? eventAccent : `${eventAccent}80`,
                        boxShadow: isHovered ? `0 0 14px ${eventAccent}` : `0 0 6px ${eventAccent}50`,
                        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: eventAccent }}
                      />
                    </div>

                    {/* Event Card Container */}
                    <div
                      className="sm:ml-16 bg-[#060c18]/90 backdrop-blur-md border transition-all duration-300 p-5 sm:p-7 relative overflow-hidden"
                      style={{
                        borderColor: isHovered ? eventAccent : `${eventAccent}45`,
                        borderLeftWidth: '3.5px',
                        borderLeftColor: eventAccent,
                        boxShadow: isHovered
                          ? `0 0 25px ${eventAccent}30, 0 12px 35px rgba(0,0,0,0.7)`
                          : '0 10px 30px rgba(0,0,0,0.6)',
                        clipPath:
                          'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                      }}
                    >
                      {/* Top Glowing Hairline */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300"
                        style={{
                          opacity: isHovered ? 1 : 0.45,
                          background: `linear-gradient(to right, transparent, ${eventAccent}, transparent)`,
                        }}
                      />

                      {/* Header Row: Badges & Timing */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Day Badge */}
                          <span
                            className="px-2.5 py-0.5 text-[10px] font-spacemono font-bold tracking-widest uppercase transition-colors"
                            style={{ color: eventAccent }}
                          >
                            {evt.dateStr}
                          </span>
                        </div>

                        {/* Timing Chip */}
                        <div
                          className="inline-flex items-center gap-1.5 font-spacemono text-xs sm:text-sm font-bold px-3 py-1 rounded-md border transition-all duration-300"
                          style={{
                            color: eventAccent,
                            borderColor: isHovered ? `${eventAccent}90` : `${eventAccent}40`,
                            backgroundColor: isHovered ? `${eventAccent}15` : 'transparent',
                          }}
                        >
                          <Clock className="w-3.5 h-3.5" style={{ color: eventAccent }} />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      {/* Event Title */}
                      <h2
                        className="font-orbitron font-bold text-xl sm:text-2xl tracking-wide transition-colors duration-200 mb-2"
                        style={{ color: isHovered ? eventAccent : '#ffffff' }}
                      >
                        {evt.name}
                      </h2>

                      {/* Description with matching Orbitron typography */}
                      <p className="font-orbitron font-normal text-xs sm:text-[13px] text-slate-300/90 tracking-wide leading-relaxed mb-4 max-w-2xl">
                        {evt.description}
                      </p>

                      {/* Card Footer: Venue and Action Link */}
                      {/* <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-spacemono">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-[#19e3f5] flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs">{evt.venue}</span>
                        </div>

                        {hasCompetition ? (
                          <a
                            href={`/competitions/${evt.competitionSlug}`}
                            onClick={(e) => handleEventClick(e, evt.competitionSlug)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#19e3f5]/10 hover:bg-[#19e3f5] text-[#19e3f5] hover:text-[#04070b] border border-[#19e3f5]/40 hover:border-[#19e3f5] font-spacemono text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer group/link shadow-[0_0_10px_rgba(25,227,245,0.15)]"
                          >
                            <span>EVENT BRIEF & RULES</span>
                            <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-spacemono uppercase tracking-wider">
                            OFFICIAL ASSEMBLY
                          </span>
                        )}
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            NOTE & ASSISTANCE FOOTNOTE
            =================================================================== */}
        {/* <div className="mt-16 text-center max-w-2xl mx-auto p-5 bg-[#060c18]/80 border border-white/10 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#19e3f5]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#19e3f5]" />
          <p className="font-spacemono text-[11px] text-slate-400 leading-relaxed">
            <span className="text-[#f6e81e] font-bold">NOTE:</span> Timings and venues are subject to minor scheduling optimizations by the organizing board. Registered participants are advised to report to the respective venues 15 minutes prior to start time.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SchedulePage;
