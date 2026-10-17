import React, { useState } from 'react';
import { ScrollProvider, useScrollProgress } from './context/ScrollContext';
import { CyberpunkCityCanvas } from './components/CityScene/CyberpunkCityCanvas';
import { FrameUI } from './components/FrameUI/FrameUI';
import { CinematicHero } from './components/CinematicHero/CinematicHero';
import { AboutSection } from './components/About/AboutSection';
import { EventsSection } from './components/Events/EventsSection';
import { HackathonSection } from './components/Hackathon/HackathonSection';
import { ClubNetworkSection } from './components/Clubs/ClubNetworkSection';
import { SponsorsSection } from './components/Sponsors/SponsorsSection';
import { FinalCTASection } from './components/FinalCTA/FinalCTASection';
import { Footer } from './components/Footer/Footer';
import { RegistrationModal } from './components/RegistrationModal';

function MainExperience() {
  const { scrollProgress, scrollToSection } = useScrollProgress();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('');

  const handleOpenRegister = (track = '') => {
    setSelectedTrack(track);
    setIsRegisterOpen(true);
  };

  const handleSkipIntro = () => {
    scrollToSection('about');
  };

  // Scroll Progress (0.0 to 1.0)
  const p = scrollProgress;

  // The 3D Canvas is active during scenes 01 to 07 (0.0 to 0.98)
  const is3DActive = p < 0.98;

  // Handoff to Website UI: Begins fading in gracefully as camera reaches atrium (0.75+) and fully active at 0.88+
  const uiOpacity = p >= 0.75
    ? Math.min(Math.max((p - 0.75) / 0.13, 0), 1)
    : 0;

  return (
    <div className="relative min-h-[700vh] bg-[#030711] text-slate-100 select-none">
      {/* 3D WebGL Megacity Scene & Cinematic Intro Layer */}
      <CyberpunkCityCanvas progress={p} active={is3DActive} />

      {/* Frame UI: Top Nav, GET TICKETS, Vertical Text, Footer Strip */}
      <FrameUI
        progress={p}
        onSkipIntro={handleSkipIntro}
        onOpenRegister={() => handleOpenRegister()}
        onNavigate={(sec) => scrollToSection(sec)}
      />

      {/* Cinematic Scrollytelling HUD Overlays (Scenes 01 to 07) */}
      <CinematicHero
        progress={p}
        onExplore={() => scrollToSection('about')}
        onWatchTrailer={() => handleOpenRegister('ALL-ACCESS PASS')}
      />

      {/* Atrium Entrance Hologram / Transition Fog Buffer */}
      <div
        className="fixed inset-0 pointer-events-none z-15 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,229,255,0.08) 0%, rgba(3,7,17,0.85) 75%)',
          opacity: p >= 0.78 ? 0.9 : 0,
        }}
      />

      {/* Existing Website Sections (Scenes 08 to 12) */}
      {/* Positioned at the lower scroll region for seamless physical handoff */}
      <main className="relative z-20 pt-[520vh]">
        <div
          style={{
            opacity: uiOpacity,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          {/* Section 08: About ProtoFos */}
          <AboutSection onOpenRegister={handleOpenRegister} />

          {/* Section 09: Events Directory */}
          <EventsSection onOpenRegister={handleOpenRegister} />

          {/* Section 10: 36H Hackathon Flagship */}
          <HackathonSection onOpenRegister={handleOpenRegister} />

          {/* Section 11: Speakers & Club Community Ecosystem */}
          <ClubNetworkSection />

          {/* Section 11b: Sponsors */}
          <SponsorsSection />

          {/* Section 12: Final CTA (The Next Chapter / Rooftop at Dusk) */}
          <FinalCTASection
            onOpenRegister={() => handleOpenRegister()}
            onExploreEvents={() => scrollToSection('events')}
          />

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Registration Modal Dialog */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialTrack={selectedTrack}
      />
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <MainExperience />
    </ScrollProvider>
  );
}
