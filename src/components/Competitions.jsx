import React, { useState, useEffect, useRef, useMemo } from 'react';
import competitionsData from '../data/competitions.json';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Instagram, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  FileText,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const Competitions = ({ onNavigate, onOpenTickets, initialSlug = null, onSelectCompetition }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredHex, setHoveredHex] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [enteredHero, setEnteredHero] = useState(false);

  // Parallax offsets & Hero Scroll-Shrink Refs
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const heroVisualRef = useRef(null);
  const heroHudLeftRef = useRef(null);
  const heroHudRightRef = useRef(null);
  const heroHudBottomRef = useRef(null);
  const rafRef = useRef(null);
  const savedScrollY = useRef(0);

  const { competitions, categories } = competitionsData;

  // Sync initialSlug prop if provided
  useEffect(() => {
    if (initialSlug !== undefined && initialSlug !== selectedSlug) {
      setSelectedSlug(initialSlug);
    }
  }, [initialSlug]);

  // SPA Route parsing from window.location
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/competitions\/([a-z0-9-]+)/i);
      if (match) {
        setSelectedSlug(match[1]);
        if (onSelectCompetition) onSelectCompetition(match[1]);
      } else {
        setSelectedSlug(null);
        if (onSelectCompetition) onSelectCompetition(null);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [onSelectCompetition]);

  // Entrance animation observer for hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnteredHero(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selectedSlug]);

  // Mouse Parallax & Scroll-driven Hero Scale with rAF
  useEffect(() => {
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (selectedSlug) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentProgress = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
    };

    const loop = () => {
      // 1. Mouse Parallax
      if (!isReduced) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        setParallax({ x: currentX, y: currentY });
      }

      // 2. Scroll-driven scale down of Hero Visual
      const heroEl = heroRef.current;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const totalDist = heroEl.offsetHeight - window.innerHeight;
        const targetProgress = totalDist > 0 ? Math.min(1, Math.max(0, -rect.top / totalDist)) : 0;
        
        currentProgress += (targetProgress - currentProgress) * 0.14;
        const p = currentProgress;

        if (heroVisualRef.current) {
          const maxReduction = window.innerWidth < 640 ? 0.22 : 0.30;
          const scale = 1 - p * maxReduction; // 1.0 down to ~0.70
          const radius = p * 28;
          const borderAlpha = (p * 0.3).toFixed(2);
          const shadowSpread = (p * 50).toFixed(0);
          const shadowAlpha = (p * 0.9).toFixed(2);
          
          heroVisualRef.current.style.transform = `scale(${scale.toFixed(4)})`;
          heroVisualRef.current.style.borderRadius = `${radius.toFixed(1)}px`;
          heroVisualRef.current.style.boxShadow = p > 0.01 
            ? `0 25px ${shadowSpread}px rgba(0,0,0,${shadowAlpha}), 0 0 35px rgba(25, 227, 245, ${(p * 0.3).toFixed(2)})` 
            : 'none';
          heroVisualRef.current.style.borderColor = `rgba(255, 255, 255, ${borderAlpha})`;
        }

        // HUD Elements smooth exit fade and subtle shift
        const hudAlpha = Math.max(0, 1 - p * 2.2).toFixed(3);
        const promptAlpha = Math.max(0, 1 - p * 3.0).toFixed(3);

        if (heroHudLeftRef.current) {
          heroHudLeftRef.current.style.opacity = hudAlpha;
          heroHudLeftRef.current.style.transform = `translate3d(${-p * 50}px, 0, 0)`;
        }
        if (heroHudRightRef.current) {
          heroHudRightRef.current.style.opacity = hudAlpha;
          heroHudRightRef.current.style.transform = `translate3d(${p * 50}px, 0, 0)`;
        }
        if (heroHudBottomRef.current) {
          heroHudBottomRef.current.style.opacity = promptAlpha;
          heroHudBottomRef.current.style.transform = `translate3d(-50%, ${p * 30}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [selectedSlug]);

  // Always scroll to top immediately whenever a competition detail page is active
  useEffect(() => {
    if (selectedSlug) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const r1 = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const t = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);

      return () => {
        cancelAnimationFrame(r1);
        clearTimeout(t);
      };
    }
  }, [selectedSlug]);

  // Navigate to Competition detail
  const handleOpenDetail = (comp) => {
    savedScrollY.current = window.scrollY;

    window.history.pushState(null, '', `/competitions/${comp.slug}`);
    setSelectedSlug(comp.slug);
    if (onSelectCompetition) onSelectCompetition(comp.slug);
    setActiveTab('OVERVIEW');

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  // Back to All Arenas
  const handleBackToGrid = () => {
    window.history.pushState(null, '', '/competitions');
    setSelectedSlug(null);
    if (onSelectCompetition) onSelectCompetition(null);
    setTimeout(() => {
      const gridEl = document.getElementById('competitions-grid') || document.getElementById('competitions');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth' });
      } else if (savedScrollY.current > 0) {
        window.scrollTo({ top: savedScrollY.current, behavior: 'smooth' });
      }
    }, 60);
  };

  // Current active competition object
  const currentCompetition = useMemo(() => {
    if (!selectedSlug) return null;
    return competitions.find((c) => c.slug === selectedSlug) || null;
  }, [selectedSlug, competitions]);

  // Other competitions list
  const otherCompetitions = useMemo(() => {
    if (!currentCompetition) return [];
    return competitions.filter((c) => c.slug !== currentCompetition.slug);
  }, [currentCompetition, competitions]);

  // =========================================================================
  // VIEW 1: COMPETITION DETAIL LANDING PAGE (Mockup 2)
  // =========================================================================
  if (currentCompetition) {
    const comp = currentCompetition;
    const accent = comp.accent || '#19e3f5';

    return (
      <div className={`relative min-h-screen bg-[#04070b] text-slate-100 select-none pb-28 pt-20 transition-opacity duration-250 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* TOP FULL-WIDTH BANNER (1920x557) with Bottom Fade */}
        <div className="relative w-full h-[42vw] max-h-[560px] min-h-[300px] overflow-hidden bg-gradient-to-br from-[#0c1424] via-[#04060b] to-[#140826] select-none flex items-center justify-center">
          <img 
            src={`/competitions-assets/${comp.bannerImage}`}
            alt={comp.name}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover object-center"
            width={1920}
            height={557}
            loading="eager"
            decoding="async"
          />

          {/* Vignette & Bottom Fade into #04070b */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070b] via-[#04070b]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04070b]/70 via-transparent to-transparent pointer-events-none" />

          {/* Top Corner Badges (Matching Mockup 2) */}
          <div className="absolute top-6 left-6 sm:left-12 z-20 flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 backdrop-blur-md p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              <img src="/protofos-logo.png" alt="IIIT Bhagalpur" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="absolute top-6 right-6 sm:right-12 z-20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-[#f6e81e]/40 bg-black/60 backdrop-blur-md p-2 shadow-[0_0_15px_rgba(246,232,30,0.25)] flex items-center justify-center">
              <span className="font-cynatar font-black italic text-[#f6e81e] text-lg">P</span>
            </div>
          </div>

          {/* Bottom Instagram Handles Row (Over Banner) */}
          {comp.instagram && comp.instagram.length > 0 && (
            <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-8 sm:gap-16 px-4">
              {comp.instagram.map((handle) => (
                <a
                  key={handle}
                  href={`https://instagram.com/${handle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-[#19e3f5] text-xs sm:text-sm font-mono tracking-wider transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10 hover:border-[#19e3f5]/50"
                >
                  <Instagram className="w-4 h-4 text-[#19e3f5]" />
                  <span>{handle}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* MAIN BODY CONTAINER */}
        <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 mt-6 z-20">
          
          {/* Breadcrumb & Back Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-6">
            <button
              onClick={handleBackToGrid}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0e131f] border border-white/20 hover:border-[#19e3f5] text-slate-200 hover:text-white transition-all text-xs font-bold tracking-widest uppercase cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              style={{
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#19e3f5]" />
              <span>ALL ARENAS</span>
            </button>

            <div className="flex items-center gap-2 text-[#8898a6] tracking-widest uppercase text-[11px]">
              <span className="hover:text-slate-300 cursor-pointer" onClick={handleBackToGrid}>COMPETITIONS</span>
              <span>/</span>
              <span className="text-slate-300">{comp.category}</span>
              <span>/</span>
              <span className="text-[#f6e81e] font-bold">{comp.name}</span>
            </div>
          </div>

          {/* TWO-COLUMN GRID (Content Left, Sticky Registration Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
            
            {/* LEFT COLUMN: Title, Chips, Tabs, Description, Format & Other Arenas */}
            <div className="flex flex-col">
              
              {/* BADA TITLE */}
              <h1 
                className="font-cyberpunk font-bold italic text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wider mb-2 leading-none"
                style={{
                  color: accent,
                  textShadow: '-5px 0px 0px #ff2bd6, 5px 0px 0px #19e3f5, 0 0 25px rgba(246, 232, 30, 0.4)'
                }}
              >
                {comp.name}
              </h1>

              {/* Subtitle: PRESENTED BY // ... */}
              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono font-bold tracking-[0.22em] text-[#19e3f5] uppercase mb-4 filter drop-shadow-[0_0_8px_rgba(25,227,245,0.7)]">
                <span>{comp.presentedBy} PRESENTS</span>
                <span>//</span>
                <span>{comp.formerName ? comp.formerName : comp.category}</span>
              </div>

              {/* Tagline */}
              {comp.tagline && (
                <p className="font-mono text-xs sm:text-sm text-[#f6e81e] italic mb-6 filter drop-shadow-[0_0_8px_rgba(246,232,30,0.4)]">
                  "{comp.tagline}"
                </p>
              )}

              {/* CHIPS ROW */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                <span className="px-3 py-1 bg-[#f6e81e]/10 border border-[#f6e81e] text-[#f6e81e] text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(246,232,30,0.25)]">
                  {comp.category}
                </span>
                <span className="px-3 py-1 bg-[#0e131f] border border-white/20 text-slate-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                  {comp.mode ? comp.mode.toUpperCase() : 'ON-CAMPUS'}
                </span>
                <span className="px-3 py-1 bg-[#0e131f] border border-white/20 text-slate-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                  TEAM SIZE [ {comp.teamSize || 'TBA'} ]
                </span>
                <span className="px-3 py-1 bg-[#0e131f] border border-white/20 text-slate-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                  31 OCT – 01 NOV
                </span>
              </div>

              {/* TABS ROW */}
              <div className="flex items-center gap-8 border-b border-white/10 pb-3 mb-8 overflow-x-auto text-xs font-mono font-bold tracking-[0.2em] uppercase">
                {['OVERVIEW', 'RULES', 'TIMELINE', 'PRIZES', 'CONTACT'].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap ${
                        isActive 
                          ? 'text-[#f6e81e] drop-shadow-[0_0_8px_rgba(246,232,30,0.6)]' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{tab}</span>
                      {isActive && (
                        <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#f6e81e] shadow-[0_0_8px_#f6e81e]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT: OVERVIEW */}
              {activeTab === 'OVERVIEW' && (
                <div className="flex flex-col gap-8">
                  {/* ABOUT THE ARENA BLOCK */}
                  <div>
                    <h2 className="font-cyberpunk font-bold italic text-2xl text-white uppercase tracking-wider mb-4">
                      ABOUT THE ARENA
                    </h2>
                    
                    {comp.about ? (
                      <div className="text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-line">
                        {comp.about}
                      </div>
                    ) : (
                      <div className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed flex flex-col gap-3 max-w-3xl">
                        <p className="text-slate-400">
                          [ 2–3 line event description from {comp.presentedBy} goes here. Keep it punchy: what the contest is, who can join, what they will build or solve. ]
                        </p>
                        <p className="text-slate-400">
                          [ Second paragraph: format, tools allowed, what makes it unique. ]
                        </p>
                      </div>
                    )}

                    {comp.highlights && comp.highlights.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/10">
                        <h3 className="font-cyberpunk font-bold text-sm text-[#19e3f5] uppercase tracking-wider mb-3">
                          ARENA HIGHLIGHTS
                        </h3>
                        <ul className="flex flex-col gap-2 text-xs font-mono text-slate-300">
                          {comp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-[#f6e81e] font-bold">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 3 INFO CARDS: FORMAT, ROUNDS, ELIGIBILITY */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div 
                      className="p-4 bg-[#0a0e17]/90 border border-white/10 flex flex-col gap-2 relative overflow-hidden"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                      }}
                    >
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        FORMAT
                      </div>
                      <div className="text-sm font-cyberpunk font-bold text-[#f6e81e] uppercase">
                        [ {comp.format || 'TBA'} ]
                      </div>
                    </div>

                    <div 
                      className="p-4 bg-[#0a0e17]/90 border border-white/10 flex flex-col gap-2 relative overflow-hidden"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                      }}
                    >
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        ROUNDS
                      </div>
                      <div className="text-sm font-cyberpunk font-bold text-[#f6e81e] uppercase">
                        [ {comp.rounds || 'TBA'} ]
                      </div>
                    </div>

                    <div 
                      className="p-4 bg-[#0a0e17]/90 border border-white/10 flex flex-col gap-2 relative overflow-hidden"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                      }}
                    >
                      <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        ELIGIBILITY
                      </div>
                      <div className="text-sm font-cyberpunk font-bold text-[#f6e81e] uppercase">
                        [ {comp.eligibility || 'TBA'} ]
                      </div>
                    </div>
                  </div>

                  {/* Organiser Attribution */}
                  <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase pt-2 border-t border-white/5">
                    ORGANISED BY <b className="text-white">{comp.presentedBy}</b>
                    {comp.instagram && comp.instagram.length > 0 && (
                      <span className="text-[#19e3f5] ml-2">
                        • {comp.instagram.join(' • ')}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: RULES */}
              {activeTab === 'RULES' && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-cyberpunk font-bold italic text-2xl text-white uppercase tracking-wider mb-2">
                    OFFICIAL RULEBOOK & GUIDELINES
                  </h2>
                  {comp.rules && comp.rules.length > 0 ? (
                    <ul className="flex flex-col gap-2.5">
                      {comp.rules.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-mono text-slate-300">
                          <span className="text-[#f6e81e] font-bold">0{i + 1}.</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 font-mono text-xs sm:text-sm">
                      [ Official rulebook criteria and judging metrics will be published soon. Download rulebook PDF once released. ]
                    </p>
                  )}

                  {/* Judging Criteria (Ideastrom) */}
                  {comp.judgingCriteria && comp.judgingCriteria.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-white/10">
                      <h3 className="font-cyberpunk font-bold italic text-xl text-[#19e3f5] uppercase tracking-wider mb-4">
                        JUDGING CRITERIA
                      </h3>
                      <div className="flex flex-col gap-3">
                        {comp.judgingCriteria.map((crit, idx) => (
                          <div key={idx} className="p-3 bg-[#0a0e17] border border-white/10 flex flex-col gap-1.5">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-slate-200 font-semibold">{crit.criterion}</span>
                              <span className="text-[#f6e81e] font-bold">{crit.weight}</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                              <div 
                                className="h-full bg-gradient-to-r from-[#19e3f5] to-[#f6e81e]"
                                style={{ width: crit.weight }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Judges Panel */}
                  {comp.judges && (
                    <div className="mt-4 p-4 bg-[#0a0e17] border border-white/10 text-xs font-mono">
                      <span className="text-[#19e3f5] font-bold block mb-1">EVALUATION PANEL:</span>
                      <span className="text-slate-300">{comp.judges}</span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: TIMELINE */}
              {activeTab === 'TIMELINE' && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-cyberpunk font-bold italic text-2xl text-white uppercase tracking-wider mb-2">
                    SCHEDULE & MILESTONES
                  </h2>
                  <div className="flex flex-col gap-3 font-mono text-xs sm:text-sm text-slate-300">
                    {comp.timeline && comp.timeline.length > 0 ? (
                      comp.timeline.map((item, idx) => (
                        <div key={idx} className="p-3 bg-[#0a0e17] border border-white/10 flex justify-between items-center">
                          <div>
                            <span className="text-[#19e3f5] font-bold block">{item.phase}</span>
                            {item.desc && <span className="text-slate-400 text-xs">{item.desc}</span>}
                          </div>
                          <span className="text-[#f6e81e] font-bold">{item.date}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="p-3 bg-[#0a0e17] border border-white/10 flex justify-between items-center">
                          <span className="text-[#19e3f5] font-bold">REGISTRATION OPENS</span>
                          <span className="text-slate-400">OCT 2026</span>
                        </div>
                        <div className="p-3 bg-[#0a0e17] border border-white/10 flex justify-between items-center">
                          <span className="text-[#19e3f5] font-bold">PHASE 1 QUALIFIERS</span>
                          <span className="text-slate-400">31 OCT 2026</span>
                        </div>
                        <div className="p-3 bg-[#0a0e17] border border-white/10 flex justify-between items-center">
                          <span className="text-[#f6e81e] font-bold">GRAND FINALE ARENA</span>
                          <span className="text-slate-400">01 NOV 2026</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: PRIZES */}
              {activeTab === 'PRIZES' && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-cyberpunk font-bold italic text-2xl text-white uppercase tracking-wider mb-2">
                    PRIZE POOL & CERTIFICATION
                  </h2>
                  <div className="p-5 bg-[#0a0e17] border border-[#f6e81e]/30 flex flex-col gap-3">
                    <span className="text-xs font-mono tracking-widest text-[#19e3f5] uppercase">ESTIMATED PRIZE POOL</span>
                    <span className="text-3xl font-cyberpunk font-bold text-[#f6e81e]">[ {comp.prizePool || 'TBA'} ]</span>
                    
                    {comp.prizeDetails && comp.prizeDetails.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/10">
                        <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">PRIZE BREAKDOWN:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {comp.prizeDetails.map((pd, idx) => (
                            <div key={idx} className="p-2.5 bg-[#060b14] border border-white/10 flex justify-between items-center">
                              <span className="text-xs font-mono text-[#19e3f5]">{pd.position}</span>
                              <span className="text-sm font-cyberpunk font-bold text-[#f6e81e]">{pd.prize}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <span className="text-xs font-mono text-slate-400">Winners receive certificates of merit, official Protofos trophies, and direct recognition.</span>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: CONTACT */}
              {activeTab === 'CONTACT' && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-cyberpunk font-bold italic text-2xl text-white uppercase tracking-wider mb-2">
                    LEAD COORDINATORS
                  </h2>
                  <div className="p-4 bg-[#0a0e17] border border-white/10 flex flex-col gap-2 font-mono text-xs sm:text-sm">
                    <span className="text-[#19e3f5] font-bold">PRESENTER: {comp.presentedByFull || comp.presentedBy}</span>
                    {comp.incharge && (
                      <span className="text-[#f6e81e] font-semibold">INCHARGE: {comp.incharge}</span>
                    )}
                    {comp.contact && comp.contact.name && (
                      <span className="text-slate-200">COORDINATOR: {comp.contact.name} ({comp.contact.role})</span>
                    )}
                    <span className="text-slate-300">Venue: {comp.venue}</span>
                    <span className="text-slate-400">For inquiries, DM us on Instagram or connect with the student coordination desk.</span>
                  </div>
                </div>
              )}

              {/* OTHER ARENAS (Bottom 5 Mini Hexes) */}
              <div className="mt-16 pt-10 border-t border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-cyberpunk font-bold italic text-2xl sm:text-3xl text-white uppercase tracking-wider">
                    OTHER ARENAS
                  </h3>
                  <button
                    onClick={handleBackToGrid}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#19e3f5] hover:text-[#f6e81e] transition-colors cursor-pointer uppercase"
                  >
                    <span>VIEW ALL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Horizontal row of other mini hexes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {otherCompetitions.map((other) => (
                    <div
                      key={other.slug}
                      onClick={() => handleOpenDetail(other)}
                      className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                    >
                      {/* Hex Container */}
                      <div 
                        className="relative w-[135px] h-[156px] sm:w-[150px] sm:h-[173px] lg:w-[130px] lg:h-[150px] p-[2.5px] transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #19e3f5, #6a5cff 50%, #f6e81e)',
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                      >
                        <div 
                          className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0c1322] via-[#04060b] to-[#120a1f]"
                          style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                          }}
                        >
                          <img 
                            src={`/competitions-assets/${other.hexImage}`}
                            alt={other.name}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            width={300}
                            height={346}
                            loading="eager"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          
                          {/* Name Overlay */}
                          <div className="absolute inset-x-2 bottom-3 text-center">
                            <span className="block font-cyberpunk font-bold text-[10px] sm:text-[11.5px] uppercase text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              {other.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY REGISTRATION CARD (Mockup 2) */}
            <div className="sticky top-28 bg-[#070b14]/95 border border-white/15 p-6 flex flex-col gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl rounded-sm">
              
              {/* Header with Glowing OPEN badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-[#f6e81e]">
                  REGISTRATION
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#19e3f5] tracking-wider uppercase bg-[#19e3f5]/10 px-2 py-0.5 rounded border border-[#19e3f5]/30 shadow-[0_0_8px_rgba(25,227,245,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19e3f5] animate-pulse" />
                  <span>OPEN</span>
                </span>
              </div>

              {/* Key-Value Details */}
              <div className="flex flex-col gap-3.5 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="tracking-wider">DATE</span>
                  <span className="text-white font-bold tracking-widest">{comp.date ? '31 OCT – 01 NOV 2026' : '31 OCT – 01 NOV 2026'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="tracking-wider">VENUE</span>
                  <span className="text-white font-bold tracking-widest">{comp.venue || 'IIIT BHAGALPUR'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="tracking-wider">TEAM SIZE</span>
                  <span className="text-[#f6e81e] font-bold tracking-widest">[ {comp.teamSize || 'TBA'} ]</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="tracking-wider">PRIZE POOL</span>
                  <span className="text-[#f6e81e] font-bold tracking-widest">[ {comp.prizePool || 'TBA'} ]</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="tracking-wider">DEADLINE</span>
                  <span className="text-[#f6e81e] font-bold tracking-widest">[ {comp.deadline || 'TBA'} ]</span>
                </div>
                {comp.fee && (
                  <div className="flex justify-between items-start text-slate-400 pt-2 border-t border-white/5">
                    <span className="tracking-wider">FEE</span>
                    <span className="text-[#19e3f5] font-bold tracking-wider text-right max-w-[200px] text-[11px] leading-tight">[ {comp.fee} ]</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                {comp.registerUrl ? (
                  <a
                    href={comp.registerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-[#f6e81e] hover:bg-[#fff23b] text-[#04070b] font-cyberpunk font-bold italic text-center tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(246,232,30,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>REGISTER NOW</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 bg-[#f6e81e]/80 text-[#04070b] font-cyberpunk font-bold italic text-center tracking-widest uppercase opacity-90 cursor-not-allowed shadow-[0_0_15px_rgba(246,232,30,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>REGISTER NOW</span>
                    <span className="text-[11px] font-mono">[ COMING SOON ]</span>
                  </button>
                )}

                {comp.rulebookUrl ? (
                  <a
                    href={comp.rulebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-transparent hover:bg-white/5 border border-[#19e3f5]/50 hover:border-[#19e3f5] text-[#19e3f5] font-mono font-bold text-xs text-center tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>RULEBOOK (PDF)</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-transparent border border-white/20 text-slate-400 font-mono font-bold text-xs text-center tracking-widest uppercase opacity-60 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>RULEBOOK (PDF)</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: /competitions LISTING PAGE WITH HERO + HONEYCOMB GRID (Mockup 1)
  // =========================================================================
  return (
    <div 
      id="competitions"
      className={`relative w-full bg-[#04070b] text-slate-100 select-none transition-opacity duration-250 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      
      {/* =====================================================================
          1) HERO WITH SCROLL-DRIVEN SCALE-DOWN & SPIDER-MAN DEPTH
          ===================================================================== */}
      <section 
        ref={heroRef}
        className="relative w-full h-[180vh] min-h-[1200px]"
      >
        <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex items-center justify-center bg-[#04070b]">
          
          {/* SCROLL-SCALED HERO VISUAL CARD */}
          <div 
            ref={heroVisualRef}
            className="relative w-full h-full overflow-hidden border border-transparent will-change-transform origin-center transition-[border-radius,box-shadow,border-color] duration-75"
          >
            {/* SHARED 2400x1920 OBJECT-COVER CONTAINER FOR BACKGROUND, TITLE & CUTOUT */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  width: 'max(100vw, calc(100vh * 1.25))',
                  height: 'max(100vh, calc(100vw * 0.8))',
                }}
              >
                {/* Layer 1: spidey-bg (darkened cyberpunk night grade, brightness: 0.28, saturate: 1.05) with 3px parallax */}
                <div 
                  className="absolute inset-0 z-[1] will-change-transform"
                  style={{
                    transform: `translate3d(${parallax.x * 3}px, ${parallax.y * 3}px, 0) scale(1.02)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <img 
                    src="/competitions-assets/spidey/spidey-bg.webp" 
                    alt="Neo-Tokyo Cyberpunk Metropolis"
                    className="w-full h-full object-fill filter brightness-[0.28] contrast-[1.18] saturate-[1.05]"
                    width={2400}
                    height={1920}
                    loading="eager"
                    decoding="async"
                  />
                  {/* Dark atmospheric overlays */}
                  <div className="absolute inset-0 bg-[#04070b]/60 pointer-events-none" />
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 45%, rgba(4, 7, 11, 0.15) 0%, rgba(4, 7, 11, 0.85) 85%)'
                    }}
                  />
                </div>

                {/* Layer 2: Atmospheric Cyan & Magenta Radial Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none z-[4]"
                  style={{
                    background: 'radial-gradient(circle at 50% 32%, rgba(255, 43, 214, 0.28) 0%, rgba(25, 227, 245, 0.18) 38%, transparent 72%)'
                  }}
                  aria-hidden="true"
                />

                {/* Layer 2.5: Top Seamless Background Gradient Dissolve from Events (#04070b) */}
                <div 
                  className="absolute inset-x-0 top-0 h-80 sm:h-[420px] bg-gradient-to-b from-[#04070b] via-[#04070b]/95 via-35% to-transparent pointer-events-none z-[6]" 
                  aria-hidden="true" 
                />

                {/* Layer 3: BADA "COMPETITIONS" TITLE (Chakra Petch 700 italic, text-shadow magenta/cyan) with -14px parallax */}
                <div 
                  className="absolute left-1/2 top-[16.5%] sm:top-[17.5%] -translate-x-1/2 z-[8] w-full text-center pointer-events-none will-change-transform px-4"
                  style={{
                    transform: `translate3d(calc(-50% + ${-parallax.x * 14}px), ${-parallax.y * 14}px, 0)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <h1 
                    className={`font-cyberpunk font-bold italic text-white uppercase tracking-tight leading-none ${
                      enteredHero ? 'animate-none' : 'opacity-90'
                    }`}
                    style={{
                      fontSize: 'clamp(64px, 12.5vw, 214px)',
                      textShadow: '-6px 0px 1px #ff2bd6, 6px 0px 1px #19e3f5, 0 0 35px rgba(255, 43, 214, 0.5)'
                    }}
                  >
                    COMPETITIONS
                  </h1>
                </div>

                {/* Layer 4: Thin White Web Line dropping from top (y=0) to hood top (y=413px / 21.5%) */}
                <div 
                  className="absolute w-[2px] z-[11] bg-gradient-to-b from-white via-white/95 to-white/70 shadow-[0_0_10px_#ffffff,0_0_18px_#19e3f5] transition-all duration-700 ease-out"
                  style={{
                    left: '45.83%',
                    top: 0,
                    height: enteredHero ? '21.6%' : '0%',
                    transformOrigin: 'top center'
                  }}
                />

                {/* Layer 5: Spider-Man Cutout exactly matching BG coordinates: x=520/2400 (21.67%), y=400/1920 (20.83%) with 8px parallax */}
                <div 
                  className="absolute z-[12] transition-all duration-700 ease-out will-change-transform"
                  style={{
                    left: '21.6667%',
                    top: '20.8333%',
                    width: '48.3333%',
                    height: '64.5833%',
                    transform: enteredHero 
                      ? `translate3d(${parallax.x * 8}px, ${parallax.y * 8}px, 0)` 
                      : `translate3d(${parallax.x * 8}px, -35vh, 0)`,
                    opacity: enteredHero ? 1 : 0.2
                  }}
                >
                  <img 
                    src="/competitions-assets/spidey/spidey-cutout.webp" 
                    alt="Spider-Man Hero"
                    className="w-full h-full object-fill pointer-events-none filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
                    width={1160}
                    height={1240}
                    loading="eager"
                    decoding="async"
                  />
                </div>

              </div>
            </div>

            {/* Scanlines Overlay inside the scaled card */}
            <div 
              className="absolute inset-0 pointer-events-none z-[16]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0, 0, 0, 0.35) 2px 4px)'
              }}
              aria-hidden="true"
            />
          </div>

          {/* Slim Top Navbar Feather Blend (#04070b) */}
          <div 
            className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-[#04070b] via-[#04070b]/60 to-transparent pointer-events-none z-[18]" 
            aria-hidden="true" 
          />

          {/* BOTTOM Seamless Gradient Dissolve into Competitions Grid (#04070b) */}
          <div 
            className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#04070b] via-[#04070b]/90 to-transparent pointer-events-none z-[18]" 
            aria-hidden="true" 
          />

          {/* LEFT HUD: // SELECT YOUR ARENA + Tagline */}
          <div 
            ref={heroHudLeftRef}
            className="absolute left-6 sm:left-12 lg:left-16 bottom-24 sm:bottom-28 z-[22] max-w-[360px] pointer-events-none select-none will-change-transform"
          >
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono font-bold tracking-[0.24em] text-[#19e3f5] uppercase mb-2 filter drop-shadow-[0_0_8px_rgba(25,227,245,0.7)]">
              <span>// SELECT YOUR ARENA</span>
            </div>
            <p className="font-cyberpunk font-bold text-xl sm:text-2xl text-white leading-tight">
              {competitions.length} arenas. {categories.filter(c => c.slug !== 'all').length} categories.
            </p>
            <p className="font-cyberpunk font-bold italic text-xl sm:text-2xl text-[#f6e81e] leading-tight filter drop-shadow-[0_0_12px_rgba(246,232,30,0.6)]">
              One city that never sleeps.
            </p>
          </div>

          {/* RIGHT HUD: 3 METRIC BOXES (ARENAS ONLINE, FEST DATES, PRIZE POOL) */}
          <div 
            ref={heroHudRightRef}
            className="absolute right-6 sm:right-12 lg:right-16 bottom-20 sm:bottom-24 z-[22] flex flex-col gap-3 w-[250px] sm:w-[280px] select-none pointer-events-auto will-change-transform"
          >
            {/* Box 1 */}
            <div 
              className="p-3.5 bg-[#060b14]/85 backdrop-blur-md border border-white/10 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:border-[#f6e81e]/40 transition-colors"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
              }}
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#8898a6] uppercase">
                ARENAS ONLINE
              </span>
              <span className="font-cyberpunk font-bold text-3xl text-[#f6e81e] filter drop-shadow-[0_0_10px_rgba(246,232,30,0.6)] leading-none mt-1">
                {String(competitions.length).padStart(2, '0')}
              </span>
            </div>

            {/* Box 2 */}
            <div 
              className="p-3.5 bg-[#060b14]/85 backdrop-blur-md border border-white/10 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:border-[#19e3f5]/40 transition-colors"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
              }}
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#8898a6] uppercase">
                FEST DATES
              </span>
              <span className="font-mono font-bold text-xs sm:text-[13px] tracking-widest text-[#19e3f5] filter drop-shadow-[0_0_8px_rgba(25,227,245,0.7)] mt-1">
                31 OCT &ndash; 01 NOV 2026
              </span>
            </div>

            {/* Box 3 */}
            <div 
              className="p-3.5 bg-[#060b14]/85 backdrop-blur-md border border-white/10 flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.85)] hover:border-[#f6e81e]/40 transition-colors"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
              }}
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#8898a6] uppercase">
                PRIZE POOL
              </span>
              <span className="font-cyberpunk font-bold text-lg text-[#f6e81e] filter drop-shadow-[0_0_8px_rgba(246,232,30,0.5)] mt-0.5">
                [ TBA ]
              </span>
            </div>
          </div>

          {/* BOTTOM SCROLL PROMPT */}
          <div 
            ref={heroHudBottomRef}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[24] pointer-events-auto flex flex-col items-center select-none text-center will-change-transform"
          >
            <a
              href="#competitions-grid"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('competitions-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center gap-1.5 text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#8898a6] hover:text-[#19e3f5] transition-colors cursor-pointer"
            >
              <span>SCROLL TO ENTER ARENAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#19e3f5] group-hover:animate-ping shadow-[0_0_8px_#19e3f5]" />
            </a>
          </div>

        </div>
      </section>

      {/* =====================================================================
          2) "ALL COMPETITIONS" SECTION (Categories Sidebar + Honeycomb 3-2-1)
          ===================================================================== */}
      <section 
        id="competitions-grid"
        className="relative w-full overflow-hidden z-20 select-none py-24 sm:py-32"
      >
        {/* Background Layer: spidey-bg with dark black shade & blur */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <img 
            src="/competitions-assets/spidey/spidey-bg.webp" 
            alt="Neo-Tokyo Cyberpunk Grid Backdrop"
            className="w-full h-full object-cover object-center filter blur-[16px] brightness-[0.72] contrast-[1.12] saturate-[1.3] scale-105"
            loading="eager"
            decoding="async"
          />
          {/* Black shade dark tint overlay */}
          <div className="absolute inset-0 bg-[#04070b]/55 pointer-events-none" />
          {/* Subtle Cyberpunk Neon Glow & Radial Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(4, 7, 11, 0.15) 0%, rgba(4, 7, 11, 0.65) 100%)'
            }}
          />
          {/* Top and Bottom Seamless Gradient Dissolves into #04070b */}
          <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#04070b] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#04070b] to-transparent pointer-events-none" />
        </div>

        {/* Content Container (max-w-[1400px]) */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 sm:px-10 z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-4 border-b border-white/10">
          <h2 className="font-cyberpunk font-bold italic text-3xl sm:text-5xl text-white uppercase tracking-wider">
            ALL COMPETITIONS
          </h2>
          <span className="px-3.5 py-1.5 bg-[#f6e81e]/10 border border-[#f6e81e]/40 text-[#f6e81e] font-mono font-bold text-xs tracking-widest uppercase shadow-[0_0_12px_rgba(246,232,30,0.2)] rounded-sm">
            {String(competitions.length).padStart(2, '0')} ARENAS
          </span>
        </div>

        {/* Main Grid Layout: Categories Left + Hexagon Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
          
          {/* LEFT SIDEBAR: 04 · CATEGORIES */}
          <aside className="flex flex-col gap-3">
            <div className="text-xs font-mono font-bold tracking-[0.24em] text-[#f6e81e] uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f6e81e] shadow-[0_0_8px_#f6e81e]" />
              <span>04 · CATEGORIES</span>
            </div>

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0" role="tablist">
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat.slug;
                const count = cat.slug === 'all' 
                  ? competitions.length 
                  : competitions.filter((c) => c.categorySlug === cat.slug).length;

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex items-center justify-between px-4 py-3 font-mono font-bold text-xs tracking-[0.18em] uppercase transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'text-[#f6e81e] border-l-4 border-l-[#f6e81e] border-t-white/10 border-r-white/10 border-b-white/10 bg-[#f6e81e]/10 shadow-[0_0_15px_rgba(246,232,30,0.18)]'
                        : 'text-slate-300 border-l-4 border-l-transparent border-t-white/10 border-r-white/10 border-b-white/10 bg-[#060b14]/80 hover:text-[#f6e81e] hover:border-l-[#f6e81e] hover:bg-[#f6e81e]/5'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                    }}
                  >
                    <span>0{idx} {cat.name}</span>
                    <span className="text-[11px] text-[#8898a6] ml-2">({count})</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* CENTER / RIGHT: HONEYCOMB 3-2-1 HEXAGON GRID */}
          <div className="flex flex-col items-center w-full">
            
            {/* DESKTOP HONEYCOMB GRID (>= 768px) */}
            <div className="hidden md:flex flex-col items-center">
              
              {/* ROW 1: 3 Hexagons (Synapse Arena, Syntax Sprint, Bull Run) */}
              <div className="flex items-center justify-center gap-4">
                {competitions.slice(0, 3).map((comp) => {
                  const matches = activeCategory === 'all' || comp.categorySlug === activeCategory;
                  return (
                    <HexTile 
                      key={comp.slug} 
                      comp={comp} 
                      matches={matches}
                      onSelect={() => handleOpenDetail(comp)} 
                    />
                  );
                })}
              </div>

              {/* ROW 2: 2 Hexagons (Aerorush, Bot Battleground) - Offset with vertical nesting */}
              <div className="flex items-center justify-center gap-4 -mt-[74px]">
                {competitions.slice(3, 5).map((comp) => {
                  const matches = activeCategory === 'all' || comp.categorySlug === activeCategory;
                  return (
                    <HexTile 
                      key={comp.slug} 
                      comp={comp} 
                      matches={matches}
                      onSelect={() => handleOpenDetail(comp)} 
                    />
                  );
                })}
              </div>

              {/* ROW 3: 3 Hexagons (Securathon 2026, Robo Relay, IDEASTROM) */}
              <div className="flex items-center justify-center gap-4 -mt-[74px]">
                {competitions.slice(5, 8).map((comp) => {
                  const matches = activeCategory === 'all' || comp.categorySlug === activeCategory;
                  return (
                    <HexTile 
                      key={comp.slug} 
                      comp={comp} 
                      matches={matches}
                      onSelect={() => handleOpenDetail(comp)} 
                    />
                  );
                })}
              </div>

            </div>

            {/* MOBILE VIEW (< 768px): Vertical list of wide cards (16:6 aspect ratio) */}
            <div className="flex md:hidden flex-col gap-4 w-full">
              {competitions.map((comp) => {
                const matches = activeCategory === 'all' || comp.categorySlug === activeCategory;
                if (!matches && activeCategory !== 'all') return null;

                return (
                  <div
                    key={comp.slug}
                    onClick={() => handleOpenDetail(comp)}
                    className="relative w-full aspect-[16/6] min-h-[120px] rounded overflow-hidden border border-white/20 bg-[#060b14] cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                  >
                    <img 
                      src={`/competitions-assets/${comp.bannerImage}`}
                      alt={comp.name}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width={1920}
                      height={557}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#f6e81e] tracking-widest uppercase">
                          0{comp.order} // {comp.category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#19e3f5] group-hover:translate-x-1 transition-transform" />
                      </div>

                      <div>
                        <h3 className="font-cyberpunk font-bold text-lg text-white uppercase leading-tight">
                          {comp.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[#19e3f5] tracking-wider uppercase">
                          EXPLORE ARENA &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Caption */}
            <p className="mt-14 text-center font-mono text-[11px] sm:text-xs text-[#8898a6] tracking-[0.25em] uppercase">
              HOVER A HEX TO PREVIEW // CLICK TO ENTER THE ARENA
            </p>

          </div>

        </div>

        </div>

      </section>

    </div>
  );
};

// ===========================================================================
// SUBCOMPONENT: POINTY-TOP HEXAGON TILE (300px x 346px)
// ===========================================================================
const HexTile = ({ comp, matches, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer select-none transition-all duration-300 will-change-transform ${
        matches ? 'opacity-100 filter-none' : 'opacity-15 filter grayscale pointer-events-none'
      }`}
      style={{
        width: '300px',
        height: '346px',
        transform: isHovered && matches ? 'scale(1.03)' : 'scale(1)',
        zIndex: isHovered && matches ? 30 : 10
      }}
    >
      {/* Outer Hexagon with 3px Gradient Border */}
      <div 
        className="w-full h-full relative p-[3px] transition-all duration-300"
        style={{
          background: isHovered && matches
            ? 'linear-gradient(135deg, #f6e81e, #ff2bd6 50%, #19e3f5)'
            : 'linear-gradient(135deg, #19e3f5, #6a5cff 50%, #f6e81e)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          filter: isHovered && matches 
            ? 'drop-shadow(0 0 20px rgba(246, 232, 30, 0.75)) drop-shadow(0 0 8px rgba(25, 227, 245, 0.8))' 
            : 'drop-shadow(0 8px 25px rgba(0,0,0,0.85))'
        }}
      >
        {/* Inner Hexagon Container */}
        <div 
          className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0c1322] via-[#04060b] to-[#120a1f]"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        >
          {/* Hex Background Image with Zoom on Hover */}
          <img 
            src={`/competitions-assets/${comp.hexImage}`}
            alt={comp.name}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
            style={{
              transform: isHovered && matches ? 'scale(1.08)' : 'scale(1)'
            }}
            width={300}
            height={346}
            loading="lazy"
            decoding="async"
          />

          {/* Dark Gradient Overlay for legible text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

          {/* Top Index Number */}
          <div className="absolute top-8 inset-x-0 text-center pointer-events-none">
            <span className="font-mono font-bold text-xs tracking-widest text-[#19e3f5] filter drop-shadow-[0_0_6px_rgba(25,227,245,0.7)]">
              0{comp.order}
            </span>
          </div>

          {/* Center-Bottom: Name & Category Label / Hover Pill */}
          <div className="absolute inset-x-4 bottom-10 flex flex-col items-center text-center pointer-events-none">
            <h3 className="font-cyberpunk font-bold text-[17px] uppercase tracking-wider text-white leading-tight mb-1 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              {comp.name}
            </h3>

            {/* Dynamic Label: Category in normal state -> "EXPLORE ARENA ->" Yellow Pill on hover */}
            <div className="transition-all duration-200 mt-0.5">
              {isHovered && matches ? (
                <span className="inline-block bg-[#f6e81e] text-[#04070b] font-mono font-bold text-[9px] px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-[0_0_12px_#f6e81e] animate-pulse">
                  EXPLORE ARENA &rarr;
                </span>
              ) : (
                <span className="font-mono font-bold text-[9.5px] text-[#f6e81e] tracking-widest uppercase filter drop-shadow-[0_0_6px_rgba(246,232,30,0.6)]">
                  {comp.category}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Competitions;
