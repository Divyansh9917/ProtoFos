import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StreetScene } from './components/StreetScene/StreetScene';
import { SpiderManCharacter } from './components/SpiderManCharacter/SpiderManCharacter';
import { EventTimeline } from './components/EventTimeline/EventTimeline';
import { PrototypeHeading } from './components/PrototypeHeading/PrototypeHeading';
import { MinimalHUD } from './components/MinimalHUD/MinimalHUD';
import { NINE_EVENTS } from './data/nineEvents';
import { cyberAudio } from './utils/cyberAudio';

export default function App(): JSX.Element {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(performance.now());
  const stepSoundCounter = useRef<number>(0);

  // Detect system reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Butter-smooth scroll tracking with velocity & audio modulation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          setScrollProgress(progress);

          // Calculate velocity
          const now = performance.now();
          const dt = (now - lastTime.current) / 1000;
          const dy = Math.abs(scrollY - lastScrollY.current);
          const velocity = dt > 0 ? dy / dt : 0;

          setScrollVelocity(velocity);
          lastScrollY.current = scrollY;
          lastTime.current = now;

          // Modulate audio filter with journey progress
          cyberAudio.setFilterFreq(progress);

          // Subtle procedural footstep sound triggers every few pixels of travel
          stepSoundCounter.current += dy;
          if (stepSoundCounter.current > 120) {
            cyberAudio.playFootstep();
            stepSoundCounter.current = 0;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support (Arrow keys, Spacebar, PageUp/Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollStep = window.innerHeight * 0.35;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Audio Toggle
  const handleToggleAudio = useCallback(() => {
    const active = cyberAudio.toggle();
    setIsAudioActive(active);
  }, []);

  // Motion Toggle
  const handleToggleMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

  // Navigation helpers
  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSkipToEnd = useCallback(() => {
    const el = document.getElementById('prototypes-destination');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // Compute active event card index (0 to 8)
  const activeEventIndex = Math.min(
    Math.floor((scrollProgress / 0.85) * NINE_EVENTS.length),
    NINE_EVENTS.length - 1
  );

  return (
    <div className="relative min-h-[580vh] bg-[#0A0B16] text-[#F5F7FF] font-sans selection:bg-[#F8DF24] selection:text-[#0A0B16]">
      {/* 1. StreetScene: Cyberpunk Megacity Street Canvas (Background) */}
      <StreetScene
        progress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* 2. SpiderManCharacter: Foreground walking hero layer */}
      <SpiderManCharacter
        progress={scrollProgress}
        velocity={scrollVelocity}
        reducedMotion={reducedMotion}
      />

      {/* 3. Minimal Sci-Fi Telemetry & Audio HUD (No conventional navbar) */}
      <MinimalHUD
        progress={scrollProgress}
        events={NINE_EVENTS}
        activeEventIndex={activeEventIndex}
        reducedMotion={reducedMotion}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onToggleMotion={handleToggleMotion}
        onSkipToEnd={handleSkipToEnd}
      />

      {/* 4. Event Corridor Scroll Content: Nine Sequential Event Cards */}
      <main className="relative z-10 pt-[25vh] pb-[10vh]">
        <EventTimeline
          events={NINE_EVENTS}
          progress={scrollProgress}
        />

        {/* 5. Destination Climax: "PROTOTYPES" Heading */}
        <PrototypeHeading
          progress={scrollProgress}
          onReplay={handleReplay}
          onExplore={handleReplay}
        />
      </main>
    </div>
  );
}
