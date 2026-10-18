import React, { useEffect, useRef, useState } from 'react';
import competitionsData from '../data/competitions.json';

export const EventsTunnel = ({ onSelectCompetition }) => {
  const eventsWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const topHudRef = useRef(null);
  const bottomHudRef = useRef(null);

  const { competitions } = competitionsData;

  // Infinite Zoom Tunnel Scrub Engine
  useEffect(() => {
    const wrapper = eventsWrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = 9;
    const LOOPS = 3;
    const R = Math.pow(3, 1 / N);

    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Load 9 tunnel frames
    const images = Array.from({ length: N }, (_, i) => {
      const img = new Image();
      img.src = `/tunnel-frames/f_${String(i + 1).padStart(4, '0')}.webp`;
      return img;
    });

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawTunnel = (p) => {
      const W = canvas.width;
      const H = canvas.height;

      if (isReduced) {
        const staticImg = images[0];
        if (staticImg && staticImg.complete) {
          ctx.clearRect(0, 0, W, H);
          const k = Math.max(W / (staticImg.naturalWidth || staticImg.width), H / (staticImg.naturalHeight || staticImg.height));
          const w = (staticImg.naturalWidth || staticImg.width) * k;
          const h = (staticImg.naturalHeight || staticImg.height) * k;
          ctx.drawImage(staticImg, (W - w) / 2, (H - h) / 2, w, h);
        }
        return;
      }

      const f = p * LOOPS * N;
      const i = Math.floor(f);
      const t = f - i;
      const imgA = images[i % N];
      const imgB = images[(i + 1) % N];

      if (!imgA || !imgB || !imgA.complete || !imgB.complete) return;

      ctx.clearRect(0, 0, W, H);

      const drawLayer = (im, scale, alpha) => {
        const iw = im.naturalWidth || im.width;
        const ih = im.naturalHeight || im.height;
        if (!iw || !ih) return;
        const k = Math.max(W / iw, H / ih) * scale;
        const w = iw * k;
        const h = ih * k;
        ctx.globalAlpha = alpha;
        ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
      };

      drawLayer(imgA, 1 + (R - 1) * t, 1);
      drawLayer(imgB, (1 + (R - 1) * t) / R, t);
      ctx.globalAlpha = 1;

      // Seamless dissolution into pitch black #04070b as scroll reaches the transition to Competitions
      if (p > 0.85) {
        const exitFade = Math.min(1, (p - 0.85) / 0.12);
        ctx.fillStyle = `rgba(4, 7, 11, ${exitFade.toFixed(3)})`;
        ctx.fillRect(0, 0, W, H);
      }
    };

    let cur = 0;
    let animId;

    const tick = () => {
      if (!isReduced) {
        const rect = wrapper.getBoundingClientRect();
        const totalDist = wrapper.offsetHeight - window.innerHeight;
        const target = totalDist > 0 ? Math.min(1, Math.max(0, -rect.top / totalDist)) : 0;

        cur += (target - cur) * 0.12;
        drawTunnel(cur);

        // Map cards so card 6 is centered around cur = 0.86, and smoothly recedes towards 1.0
        const maxPos = competitions.length - 1 + 0.65;
        const pos = cur * maxPos;
        const baseX = Math.min(250, window.innerWidth * 0.22);
        let activeIdx = 0;

        cardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const d = idx - pos;
          const side = idx % 2 === 1 ? 1 : -1;
          const opacity = d < 0 ? Math.max(0, 1 + d * 1.6) : Math.max(0, 1 - d * 0.2);
          const blur = Math.max(0, d) * 0.9;

          cardEl.style.transform = `translate3d(calc(-50% + ${side * baseX}px), -46%, ${-d * 420}px)`;
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
          cardEl.style.zIndex = 100 - Math.round(d * 10);
          cardEl.style.pointerEvents = Math.abs(d) < 0.6 && opacity > 0.3 ? 'auto' : 'none';

          const isActive = Math.abs(d) < 0.5;
          if (isActive) {
            activeIdx = idx;
            cardEl.classList.add('on');
          } else {
            cardEl.classList.remove('on');
          }
        });

        // Smoothly fade HUD elements out during exit transition to Competitions
        const hudFade = cur > 0.86 ? Math.max(0, 1 - (cur - 0.86) / 0.10) : 1;
        if (topHudRef.current) topHudRef.current.style.opacity = (hudFade * 0.95).toFixed(3);
        if (bottomHudRef.current) bottomHudRef.current.style.opacity = (hudFade * 0.95).toFixed(3);

        setActiveEventIndex(Math.min(competitions.length - 1, activeIdx));
      }

      animId = requestAnimationFrame(tick);
    };

    if (!isReduced) {
      animId = requestAnimationFrame(tick);
    } else {
      drawTunnel(0);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [competitions]);

  return (
    <section 
      id="events" 
      ref={eventsWrapperRef}
      className="relative w-full h-[700vh] bg-[#04070b] select-none"
      aria-label="Events Infinite Zoom Arena"
    >
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden">
        {/* Zoom Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />

        {/* Subtle Ambient Vignette (Keeps background bright & vibrant, no heavy dimming) */}
        <div 
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 65%, rgba(4, 7, 11, 0.40) 100%)'
          }}
          aria-hidden="true" 
        />

        {/* Top HUD: Eyebrow + H2 (Below navbar, crisp & readable) */}
        <div 
          ref={topHudRef}
          className="absolute top-[calc(76px+env(safe-area-inset-top,0px))] sm:top-[calc(88px+env(safe-area-inset-top,0px))] left-0 right-0 text-center z-20 pointer-events-none px-4 transition-opacity duration-150"
          style={{ opacity: 0.95 }}
        >
          <div className="inline-flex items-center text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.24em] uppercase text-[#FFE600] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] mb-2">
            <span className="mr-2 text-[#FFE600]">▍</span>
            <span>03 · EVENTS & WORKSHOPS</span>
          </div>
          <h2 
            className="font-cyberpunk font-bold italic text-white uppercase text-[clamp(2.3rem,6vw,4.6rem)] leading-[0.95] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.9)]"
          >
            ENTER THE <b className="text-[#FFE600] drop-shadow-[0_0_12px_rgba(255,230,0,0.4)]">ARENA</b>
          </h2>
        </div>

        {/* 3D Floating Cards Container */}
        <div 
          id="cards" 
          className="absolute inset-0 [perspective:900px] [transform-style:preserve-3d] z-[4]"
        >
          {competitions.map((ev, i) => (
            <div
              key={ev.slug}
              ref={(el) => (cardsRef.current[i] = el)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${ev.name}`}
              onClick={() => onSelectCompetition && onSelectCompetition(ev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onSelectCompetition) onSelectCompetition(ev);
                }
              }}
              className="absolute left-1/2 top-1/2 w-[min(290px,72vw)] h-[min(430px,60vh)] flex flex-col justify-between gap-3 p-[18px] bg-[#080b12ee] border-2 border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_15px_rgba(0,240,255,0.15)] cursor-pointer will-change-transform transition-[border-color,box-shadow] duration-250 focus:outline-none focus:border-[#00F0FF] group"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))'
              }}
            >
              {/* Top Row: EVT // 0N + ARENA */}
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold tracking-[0.18em] text-[#00F0FF]">
                <span>EVT // 0{i + 1}</span>
                <span className="text-[#FFE600]">{ev.category}</span>
              </div>

              {/* Swappable Art Panel with authentic hex image */}
              <div className="flex-1 min-h-[140px] relative overflow-hidden border border-white/10 bg-[#05060A]">
                <img 
                  src={`/competitions-assets/${ev.hexImage}`}
                  alt={ev.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  width={300}
                  height={346}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title & Presenter */}
              <div>
                <h3 className="font-cyberpunk font-bold italic text-[1.35rem] leading-[1.15] text-white uppercase mb-1">
                  {ev.name}
                </h3>
                <p className="font-mono text-xs text-[#19e3f5] tracking-wider uppercase">
                  {ev.presentedBy} PRESENTS
                </p>
              </div>

              {/* Footer Row */}
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold tracking-[0.16em] text-[#8A93A6] border-t border-white/10 pt-2">
                <span>WHEN: 31 OCT - 01 NOV</span>
                <span className="text-[#FFE600] font-bold">EXPLORE &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress HUD */}
        <div 
          ref={bottomHudRef}
          className="absolute bottom-[calc(24px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none select-none transition-opacity duration-150"
          style={{ opacity: 0.95 }}
        >
          <b className="block font-cyberpunk font-bold italic text-2xl sm:text-3xl leading-none text-[#FFE600] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mb-1">
            0{activeEventIndex + 1} / 0{competitions.length}
          </b>
          <span className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase text-slate-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            {competitions[activeEventIndex]?.name}
          </span>
        </div>
      </div>
    </section>
  );
};

export default EventsTunnel;
