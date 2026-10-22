import React, { useState, useRef } from 'react';
import { EventItem } from '../../types';
import { Trophy, Users, MapPin, Clock, ArrowUpRight, Zap } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  index: number;
  align?: 'left' | 'right';
  isActive?: boolean;
  onInspect?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  align = 'left',
  isActive = false,
  onInspect,
}) => {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt interaction on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 10), y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Alternating secondary subtle neon accents (magenta / cyan)
  const isAltAccent = index % 2 === 1;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full max-w-[460px] pointer-events-auto transition-all duration-500 will-change-transform ${
        isActive ? 'opacity-100 scale-100' : 'opacity-90 scale-[0.98]'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${
          isHovered ? '-6px' : '0'
        })`,
      }}
      aria-label={`Event ${event.number}: ${event.title}`}
    >
      {/* Outer Subtle Neon Glow (Yellow primary with subtle Magenta / Cyan secondary highlights) */}
      <div
        className={`absolute -inset-[1px] bg-gradient-to-r ${
          isAltAccent
            ? 'from-[#F8DF24]/40 via-[#FF27D8]/20 to-[#00CFFF]/25'
            : 'from-[#F8DF24]/40 via-[#00CFFF]/20 to-[#FF27D8]/25'
        } clip-cyber-card opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]`}
      />

      {/* Main Glassmorphic Dark Translucent Navy Card Container */}
      <div className="relative bg-[#07152F]/88 backdrop-blur-xl border border-[#F8DF24]/30 group-hover:border-[#F8DF24]/90 clip-cyber-card p-5 sm:p-6 text-[#F5F7FF] shadow-[0_20px_50px_rgba(10,11,22,0.9)] transition-colors duration-300">
        
        {/* Top Header: Badge, Category, Event Index */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#F8DF24] px-2 py-0.5 bg-[#F8DF24]/10 border border-[#F8DF24]/40 clip-cyber-tag">
              EVT // {event.number}
            </span>
            <span className="text-[10px] tracking-wider font-semibold text-[#00CFFF] uppercase">
              {event.badge}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#F8DF24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8DF24] animate-ping" />
            <span className="font-mono text-[10px] tracking-widest text-[#F8DF24]">LIVE TRACK</span>
          </div>
        </div>

        {/* Event Media Preview */}
        <div className="relative w-full h-44 mb-4 rounded overflow-hidden bg-[#0A0B16] border border-white/5">
          {!imgError ? (
            <img
              src={event.image}
              alt={event.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-105"
              loading="lazy"
            />
          ) : (
            // Procedural Cyberpunk CSS/SVG Placeholder Fallback
            <div className="w-full h-full relative bg-gradient-to-br from-[#07152F] via-[#0A0B16] to-[#07152F] flex flex-col items-center justify-center p-4">
              <div className="absolute inset-0 cyber-grid-overlay opacity-30" />
              <div className="relative z-10 w-12 h-12 rounded-full border border-[#F8DF24]/40 flex items-center justify-center text-[#F8DF24] mb-2 shadow-[0_0_15px_rgba(248,223,36,0.3)]">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <span className="relative z-10 font-mono text-[11px] text-[#F8DF24] tracking-widest">
                [ {event.number} // PROTOCOL READY ]
              </span>
            </div>
          )}

          {/* Prize Pool Tag Floating Overlay */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[#0A0B16]/90 backdrop-blur-md px-2.5 py-1 border border-[#F8DF24]/50 clip-cyber-tag shadow-lg">
            <Trophy className="w-3.5 h-3.5 text-[#F8DF24]" />
            <span className="font-mono text-xs font-bold text-[#F8DF24] tracking-wide">
              {event.prize}
            </span>
          </div>

          {/* Category Tag with subtle Cyan / Magenta accent */}
          <div className="absolute bottom-2 left-2 bg-[#07152F]/90 px-2 py-0.5 text-[10px] font-mono tracking-widest text-[#F5F7FF] border border-white/10 uppercase">
            <span className={isAltAccent ? 'text-[#FF27D8]' : 'text-[#00CFFF]'}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-['Orbitron',sans-serif] text-xl font-bold tracking-wide text-[#F5F7FF] group-hover:text-[#F8DF24] transition-colors duration-200 mb-1">
          {event.title}
        </h3>
        <p className="font-mono text-xs text-[#F8DF24]/90 mb-3 tracking-wide">
          {event.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-[#F5F7FF]/80 line-clamp-2 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Metadata Grid: Team, Venue, Time */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#F5F7FF]/70 font-mono border-t border-b border-white/10 py-3 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-[#F8DF24] shrink-0" />
            <span className="truncate">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#F8DF24] shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-[#F5F7FF]/70">
            <Clock className="w-3.5 h-3.5 text-[#F8DF24] shrink-0" />
            <span className="truncate">{event.time}</span>
          </div>
        </div>

        {/* Tracks / Focus Tags with subtle Magenta/Cyan highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tracks.slice(0, 3).map((track, i) => (
            <span
              key={i}
              className={`text-[10px] font-mono px-2 py-0.5 bg-white/5 text-[#F5F7FF] border rounded-sm ${
                i % 2 === 0 ? 'border-[#00CFFF]/25 text-[#00CFFF]' : 'border-[#FF27D8]/25 text-[#FF27D8]'
              }`}
            >
              #{track}
            </span>
          ))}
        </div>

        {/* Interactive Action Button (Neon Yellow primary) */}
        <button
          onClick={() => onInspect?.(event)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F8DF24]/10 hover:bg-[#F8DF24] text-[#F8DF24] hover:text-[#0A0B16] border border-[#F8DF24]/40 font-mono text-xs font-bold tracking-wider clip-cyber-btn transition-all duration-200 shadow-[0_0_15px_rgba(248,223,36,0.12)] hover:shadow-[0_0_20px_rgba(248,223,36,0.45)]"
        >
          <span>INSPECT PROTOCOL</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

      </div>
    </article>
  );
};
