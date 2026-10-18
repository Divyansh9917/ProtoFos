import React, { useRef, useState, useEffect } from 'react';

export const Hero = ({ onScrollDown }) => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(10.0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches);
      if (videoRef.current) {
        if (e.matches) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => { });
        }
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    const video = videoRef.current;
    const heroEl = heroRef.current;

    // Performance optimization: Pause video when hero section scrolls out of view, resume when back
    let heroObserver;
    if (heroEl && video) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (!mediaQuery.matches) {
            if (entry.isIntersecting) {
              video.play().catch(() => { });
            } else {
              video.pause();
            }
          }
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(heroEl);
    }

    if (video) {
      if (mediaQuery.matches) {
        video.pause();
      } else {
        video.play().catch(() => { });
      }

      const handleTimeUpdate = () => {
        if (video) {
          setVideoTime(video.currentTime);
        }
      };

      const handleLoadedMetadata = () => {
        if (video && video.duration && !isNaN(video.duration)) {
          setVideoDuration(video.duration);
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (heroObserver) heroObserver.disconnect();
        mediaQuery.removeEventListener('change', handleMotionChange);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }

    return () => {
      if (heroObserver) heroObserver.disconnect();
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const progressPercent = videoDuration > 0 ? (videoTime / videoDuration) * 100 : 0;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden select-none bg-[#04070b] flex flex-col justify-between"
    >
      {/* 1. Fullscreen Background Video (Scaled to crop bottom-right AI watermark while keeping cyborg centered) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover object-center scale-[1.09] origin-center"
        >
          <source src="/main-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Cyberpunk Overlays:
          - Left transparent (so cyborg woman's face & golden warmth pop through)
          - Right ~85% dark navy (for crisp readability of the hero text)
          - Radial scrim behind the hero text
          - Scanlines + Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(4, 7, 11, 0.0) 0%, rgba(4, 7, 11, 0.06) 30%, rgba(4, 7, 11, 0.58) 58%, rgba(4, 7, 11, 0.88) 84%, rgba(4, 7, 11, 0.94) 100%)'
        }}
      />

      {/* Radial scrim focused behind right-shifted hero text block */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 66% 50%, rgba(4, 7, 11, 0.65) 0%, rgba(4, 7, 11, 0.22) 60%, transparent 100%)'
        }}
      />

      {/* Very subtle Scanline CRT overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.6) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Bottom transition gradient into ink (#04070b) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[4]"
        style={{
          background: 'linear-gradient(to top, #04070b 0%, rgba(4, 7, 11, 0.75) 50%, transparent 100%)'
        }}
      />

      {/* Subtle vignette border */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          boxShadow: 'inset 0 0 100px rgba(4, 7, 11, 0.75)'
        }}
      />

      {/* 3. HUD TELEMETRY BOXES */}
      <div className="relative z-20 w-full px-8 sm:px-14 pt-24 sm:pt-28 flex justify-between items-start pointer-events-none">

        {/* Left HUD Box: SUBJECT STATUS / CYBORG-07 // ONLINE */}
        <div
          className="pointer-events-auto bg-[#0e1614]/85 backdrop-blur-md border border-[#19e3f5]/25 px-5 py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)'
          }}
        >
          <div className="font-spacemono text-[9.5px] uppercase tracking-[0.22em] text-[#6b7c7b] mb-1">
            SUBJECT STATUS
          </div>
          <div className="font-spacemono text-xs sm:text-[13.5px] font-bold tracking-[0.16em] text-[#19e3f5] flex items-center gap-1.5 filter drop-shadow-[0_0_8px_rgba(25,227,245,0.7)]">
            <span>CYBORG-07</span>
            <span className="text-[#19e3f5]/60">//</span>
            <span>ONLINE</span>
          </div>
        </div>

        {/* Right HUD Box: CORE TEMP / 821 °C */}
        <div className="pointer-events-auto bg-[#060a12]/85 backdrop-blur-md border border-white/10 px-5 py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.7)] text-right min-w-[125px]">
          <div className="font-spacemono text-[9.5px] uppercase tracking-[0.22em] text-[#718096] mb-0.5">
            CORE TEMP
          </div>
          <div className="font-spacemono text-xl font-bold tracking-wider text-[#f6e81e] filter drop-shadow-[0_0_10px_rgba(246,232,30,0.85)]">
            821 <span className="text-base font-normal">°C</span>
          </div>
        </div>

      </div>

      {/* 4. HERO CENTER CONTENT (Right-Shifted to keep Cyborg profile visible) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 mt-1 lg:mt-0 lg:translate-x-[11vw]">

        {/* "IIIT BHAGALPUR'S" */}
        <h2
          className="font-cinzel italic font-semibold text-xl sm:text-2xl md:text-[26px] text-[#f3ebd3] tracking-[0.22em] mb-1 sm:mb-2 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          IIIT BHAGALPUR&apos;S
        </h2>

        {/* BADA PROTOFOS WORDMARK (From Image File with yellow neon glow) */}
        <div className="relative my-0.5 sm:my-1 flex items-center justify-center max-w-[92vw] lg:max-w-[1040px]">
          <img
            src="/images/protofos-wordmark.png"
            alt="PROTOFOS"
            className="w-full h-auto object-contain pointer-events-none filter drop-shadow-[0_0_30px_rgba(246,232,30,0.7)] drop-shadow-[0_0_10px_rgba(246,232,30,0.85)]"
          />
        </div>

        {/* "31st OCT – 01st NOV ✦ 2026 EDITION" */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-3 mb-2 sm:mb-2.5">
          <span className="font-spacemono font-bold text-sm sm:text-[16px] text-[#19e3f5] tracking-widest filter drop-shadow-[0_0_10px_rgba(25,227,245,0.8)]">
            31<sup className="text-[10px]">st</sup> OCT &ndash; 01<sup className="text-[10px]">st</sup> NOV
          </span>
          <span className="text-[#19e3f5] text-xs sm:text-sm filter drop-shadow-[0_0_8px_#19e3f5]">
            ✦
          </span>
          <span className="font-cinzel font-bold text-base sm:text-[19px] text-[#e6d84a] tracking-[0.22em] filter drop-shadow-[0_0_12px_rgba(230,216,74,0.6)]">
            2026 EDITION
          </span>
        </div>

        {/* "EASTERN INDIA'S LARGEST SCIENCE & TECHNOLOGY FESTIVAL" */}
        <p className="font-cinzel uppercase text-xs sm:text-sm md:text-[14.5px] font-medium tracking-[0.28em] text-[#e2e8f0] text-center max-w-2xl px-2 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          EASTERN INDIA&apos;S LARGEST SCIENCE & TECHNOLOGY FESTIVAL
        </p>

        {/* "~ A BRIGHTER TOMORROW // THE BEGINNING OF A NEW TECHNICAL ERA ~" */}
        <p className="font-cinzel italic text-[11px] sm:text-xs md:text-[12px] text-[#b8a87c] tracking-[0.2em] text-center mt-1 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          ~ A BRIGHTER TOMORROW // THE BEGINNING OF A NEW TECHNICAL ERA ~
        </p>

      </div>

      {/* 5. BOTTOM BAR & TIMELINE */}
      <div className="relative z-20 pb-5 sm:pb-6 flex flex-col items-center select-none">

        {/* Timeline Labels Row */}
        <div className="w-[88vw] max-w-[560px] flex items-center justify-between text-[9px] sm:text-[10px] font-spacemono mb-1 px-1">
          <span className="text-[#8898a6] tracking-wider">
            LOOP START (0.0s)
          </span>
          <span className="text-[#19e3f5] font-bold tracking-[0.2em] filter drop-shadow-[0_0_8px_rgba(25,227,245,0.7)]">
            LIVE BACKGROUND LOOP
          </span>
          <span className="text-[#8898a6] tracking-wider">
            LOOP END (10.0s)
          </span>
        </div>

        {/* Thin Timeline Line with Active Progress Indicator */}
        <div className="w-[88vw] max-w-[560px] h-[1.5px] bg-slate-700/60 relative overflow-hidden rounded-full mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-[#f6e81e] to-[#19e3f5] transition-all duration-100 ease-linear shadow-[0_0_8px_#f6e81e]"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        {/* SCROLL Indicator with click-to-scroll */}
        <button
          onClick={onScrollDown}
          className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
        >
          <span className="font-spacemono text-[9.5px] font-bold uppercase tracking-[0.35em] text-slate-300 group-hover:text-[#19e3f5] transition-colors">
            SCROLL
          </span>
          <div className="w-[1.5px] h-4 bg-[#19e3f5] mt-1 shadow-[0_0_8px_#19e3f5] animate-pulse group-hover:h-5 transition-all" />
        </button>

      </div>

    </section>
  );
};
