import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Descent } from './components/Descent';
import { EventsTunnel } from './components/EventsTunnel';
import { Competitions } from './components/Competitions';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { TicketModal } from './components/TicketModal';

export function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState(null);
  const [competitionSlug, setCompetitionSlug] = useState(() => {
    if (typeof window === 'undefined') return null;
    const match = window.location.pathname.match(/^\/competitions\/([a-z0-9-]+)/i);
    return match ? match[1] : null;
  });
  const lenisRef = useRef(null);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
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

  const handleNavigate = (targetSelector) => {
    if (competitionSlug) {
      setCompetitionSlug(null);
      window.history.pushState(null, '', '/competitions');
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetSelector, { offset: 0, duration: 1.2 });
        } else {
          const el = document.querySelector(targetSelector);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
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

  // If viewing a single competition landing page (/competitions/:slug)
  if (competitionSlug) {
    return (
      <div className="relative min-h-screen bg-[#04070b] text-slate-100 selection:bg-[#19e3f5] selection:text-black">
        <Navbar
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

      {/* 6. Section 05: The Protofos Protocol (Timeline) */}
      <Timeline />

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
