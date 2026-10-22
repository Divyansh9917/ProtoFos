import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Descent } from './components/Descent';
import { EventsTunnel } from './components/EventsTunnel';
import { Competitions } from './components/Competitions';
import { Footer } from './components/Footer';
import { AboutSection } from './components/About/AboutSection';
import { TicketModal } from './components/TicketModal';

export function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState(null);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname;
  });
  const [competitionSlug, setCompetitionSlug] = useState(() => {
    if (typeof window === 'undefined') return null;
    const match = window.location.pathname.match(/^\/competitions\/([a-z0-9-]+)/i);
    return match ? match[1] : null;
  });
  const lenisRef = useRef(null);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      const match = window.location.pathname.match(/^\/competitions\/([a-z0-9-]+)/i);
      setCompetitionSlug(match ? match[1] : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Initialize Lenis smooth scrolling with lerp ~0.1
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Always scroll to top immediately and reset Lenis whenever opening or switching competition detail pages or about page
  useEffect(() => {
    if (competitionSlug || currentPath === '/about' || currentPath === '/about/') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const r1 = requestAnimationFrame(() => {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const t = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);

      return () => {
        cancelAnimationFrame(r1);
        clearTimeout(t);
      };
    }
  }, [competitionSlug, currentPath]);

  const handleNavigate = (targetSelector) => {
    if (targetSelector === '/about' || targetSelector === '#about') {
      if (currentPath === '/about' || currentPath === '/about/') {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        return;
      }

      const el = document.querySelector('#about');
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo('#about', { offset: -40, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      setCompetitionSlug(null);
      setCurrentPath('/about');
      window.history.pushState(null, '', '/about');
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      return;
    }

    if (currentPath === '/about' || currentPath === '/about/' || competitionSlug) {
      setCurrentPath('/');
      setCompetitionSlug(null);
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        if (targetSelector.startsWith('#')) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetSelector, { offset: 0, duration: 1.2 });
          } else {
            const el = document.querySelector(targetSelector);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 60);
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetSelector, { offset: 0, duration: 1.2 });
    } else {
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenTickets = (event = null) => {
    setPreselectedEvent(event);
    setTicketModalOpen(true);
  };

  // If viewing the About page (/about)
  if (currentPath === '/about' || currentPath === '/about/') {
    return (
      <div className="relative min-h-screen bg-[#04070b] text-slate-100 selection:bg-[#19e3f5] selection:text-black flex flex-col justify-between">
        <Navbar
          currentPath={currentPath}
          onOpenTickets={() => handleOpenTickets(null)}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 pt-24 sm:pt-28 md:pt-32">
          <AboutSection />
        </main>
        <Footer />
        <TicketModal
          isOpen={ticketModalOpen}
          onClose={() => setTicketModalOpen(false)}
          preselectedEvent={preselectedEvent}
        />
      </div>
    );
  }

  // If viewing a single competition landing page (/competitions/:slug)
  if (competitionSlug) {
    return (
      <div className="relative min-h-screen bg-[#04070b] text-slate-100 selection:bg-[#19e3f5] selection:text-black">
        <Navbar
          currentPath={currentPath}
          onOpenTickets={() => handleOpenTickets(null)}
          onNavigate={handleNavigate}
        />
        <Competitions
          initialSlug={competitionSlug}
          onSelectCompetition={(slug) => setCompetitionSlug(slug)}
          onOpenTickets={handleOpenTickets}
          onNavigate={handleNavigate}
        />
        <Footer />
        <TicketModal
          isOpen={ticketModalOpen}
          onClose={() => setTicketModalOpen(false)}
          preselectedEvent={preselectedEvent}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#04070b] text-slate-100 selection:bg-[#19e3f5] selection:text-black">
      {/* 1. Global Navigation Bar & Floating Docks */}
      <Navbar
        currentPath={currentPath}
        onOpenTickets={() => handleOpenTickets(null)}
        onNavigate={handleNavigate}
      />

      {/* 2. Hero Section with main-hero.mp4 loop and pixel-perfect HUD */}
      <Hero
        onScrollDown={() => handleNavigate('#descent')}
      />

      {/* 3. Spider-Man Cinematic Descent (Scroll-driven 240-frame sequence) */}
      <Descent />

      {/* 4. Section A: Events Infinite Zoom Arena (#events) */}
      <EventsTunnel
        onSelectCompetition={(comp) => {
          window.history.pushState(null, '', `/competitions/${comp.slug}`);
          setCompetitionSlug(comp.slug);
          window.scrollTo(0, 0);
        }}
      />

      {/* 5. Section B: Competitions Spider-Man Hero + Honeycomb Grid (#competitions) */}
      <Competitions
        initialSlug={null}
        onSelectCompetition={(slug) => setCompetitionSlug(slug)}
        onOpenTickets={handleOpenTickets}
        onNavigate={handleNavigate}
      />

      {/* 6. Section 06: About ProtoFos (#about) */}
      <section id="about" className="relative z-20 py-20 sm:py-28 border-t border-white/5 scroll-mt-12">
        <AboutSection />
      </section>

      {/* 7. Section 07: Footer */}
      <Footer />

      {/* 12. Interactive Cyber Ticket Pass Generator */}
      <TicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        preselectedEvent={preselectedEvent}
      />
    </div>
  );
}

export default App;
