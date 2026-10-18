import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Descent } from './components/Descent';
import { Street } from './components/Street';
import { Intro } from './components/Intro';
import { WhyProtofos } from './components/WhyProtofos';
import { ArenaEvents } from './components/ArenaEvents';
import { Clubs } from './components/Clubs';
import { Timeline } from './components/Timeline';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { TicketModal } from './components/TicketModal';

export function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState(null);
  const lenisRef = useRef(null);

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

  const handleSelectEventFromStreet = (eventId) => {
    const target = document.getElementById(`event-${eventId}`);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

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

      {/* 4. Section A: Events Infinite Zoom Arena (#events) & Section B: Competitions Honeycomb (#competitions) */}
      <ArenaEvents />

      {/* 5. The Cyberpunk Avenue (Street level with interactive district terminals) */}
      <Street 
        onSelectEvent={handleSelectEventFromStreet} 
      />

      {/* 6. Editorial Section 01: The Beginning */}
      <Intro />

      {/* 7. Section 02: Why Protofos? (4 Core Modules) */}
      <WhyProtofos />

      {/* 8. Section 04: Clubs / The Builders (Access Terminals) */}
      <Clubs />

      {/* 9. Section 05: The Protofos Protocol (Timeline) */}
      <Timeline />

      {/* 10. Section 06: Final Skyline CTA */}
      <FinalCTA 
        onOpenTickets={() => handleOpenTickets(null)} 
      />

      {/* 11. Section 07: Footer */}
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
