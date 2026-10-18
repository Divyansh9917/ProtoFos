import React, { useEffect, useRef, useState } from 'react';
import { ScrollDescent } from '../utils/scrub';

export const Descent = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const barRef = useRef(null);
  const altRef = useRef(null);
  const loadRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const chapters = [
    { text: 'THE CITY NEVER SLEEPS', start: 0.03, end: 0.23 },
    { text: 'WATCHING FROM ABOVE', start: 0.28, end: 0.48 },
    { text: 'SWING INTO THE NIGHT', start: 0.53, end: 0.73 },
    { text: 'TOUCHDOWN', start: 0.78, end: 0.97 },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const bar = barRef.current;
    const alt = altRef.current;
    const ld = loadRef.current;
    if (!section || !canvas) return;

    // Visibility observer to only display loader bar when user reaches #descent
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(section);

    const sd = new ScrollDescent({
      section,
      canvas,
      frameCount: 240,
      path: (i) => `/frames/f_${String(i + 1).padStart(4, '0')}.webp`,
      damping: 9, // Tunable: 6-12 (default 9)
      maxDpr: 2,
      onProgress: (p) => {
        if (bar) {
          bar.style.transform = `scaleX(${p})`;
        }
        if (alt) {
          const currentAlt = Math.round(840 - (840 - 12) * p);
          alt.textContent = `${currentAlt} M`;
        }

        // Detect active chapter
        const currentCh = chapters.find((ch) => p >= ch.start && p <= ch.end);
        setActiveChapter(currentCh ? currentCh.text : null);
      },
      onLoad: (ratio) => {
        setLoadProgress(ratio);
        if (ld) {
          ld.style.width = `${ratio * 100}%`;
        }
      },
    });

    return () => {
      visibilityObserver.disconnect();
      sd.destroy();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="descent" 
      aria-label="Cinematic city descent"
      className="relative w-full h-[400vh] lg:h-[600vh] bg-[#04070b] select-none"
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-[#04070b]">
        
        {/* Soft handoff 22vh top gradient (Hero -> Frames) */}
        <div 
          className="absolute top-0 left-0 right-0 h-[22vh] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #04070b 0%, rgba(4, 7, 11, 0.7) 40%, transparent 100%)'
          }}
        />

        {/* Soft handoff 22vh bottom gradient (Frames -> Avenue) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[22vh] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #04070b 0%, rgba(4, 7, 11, 0.7) 40%, transparent 100%)'
          }}
        />

        {/* Smooth Canvas Scrubber */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block" 
          aria-label="Cinematic Spider-Man city descent"
        />

        {/* Top Progress Bar */}
        <div 
          ref={barRef} 
          className="absolute left-0 top-0 h-[3px] w-full bg-[#f6e81e] origin-left z-30 shadow-[0_0_12px_#f6e81e]" 
          style={{ transform: 'scaleX(0)' }} 
        />

        {/* Altitude Counter HUD (Right-Top) */}
        <div className="absolute right-6 sm:right-12 top-24 sm:top-28 z-20 text-right font-spacemono select-none pointer-events-none">
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.24em] text-[#19e3f5] filter drop-shadow-[0_0_8px_rgba(25,227,245,0.75)] uppercase mb-0.5">
            ALTITUDE SENSOR
          </div>
          <b 
            ref={altRef} 
            className="block text-3xl sm:text-4xl lg:text-5xl font-cinzel font-black tracking-wider text-[#f6e81e] filter drop-shadow-[0_0_14px_rgba(246,232,30,0.85)] leading-tight"
          >
            840 M
          </b>
        </div>

        {/* Story Chapter Titles (Bottom-Center) */}
        <div className="absolute left-1/2 bottom-[14vh] -translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none select-none">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.text;
            return (
              <h3
                key={ch.text}
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-full font-cinzel sm:font-cyberpunk font-black italic text-2xl sm:text-4xl lg:text-5xl text-white tracking-[0.2em] uppercase transition-all duration-500 ease-out filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] ${
                  isActive 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}
              >
                {ch.text}
              </h3>
            );
          })}
        </div>

      </div>

      {/* Frame Loading Bar (Only visible when user enters #descent and frames are loading) */}
      <div 
        ref={loadRef} 
        className="fixed left-0 bottom-0 h-[2.5px] bg-[#19e3f5] z-50 transition-opacity duration-300 pointer-events-none shadow-[0_0_10px_#19e3f5]" 
        style={{ 
          width: `${loadProgress * 100}%`,
          opacity: isSectionVisible && loadProgress < 1 ? 1 : 0 
        }} 
      />
    </section>
  );
};
