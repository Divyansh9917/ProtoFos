import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Trophy,
  Clock,
  Info,
  Phone,
  Menu,
  X,
  Instagram,
  Linkedin
} from 'lucide-react';

export const Navbar = ({ onOpenTickets, onNavigate, currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/schedule')) return 'Schedule';
      if (window.location.pathname.startsWith('/about')) return 'About';
    }
    return 'Home';
  });

  const navItems = [
    { name: 'Home', target: '#hero', icon: <Home className="w-3.5 h-3.5" /> },
    { name: 'Events', target: '#events', icon: <Calendar className="w-3.5 h-3.5" /> },
    { name: 'Competitions', target: '#competitions', icon: <Trophy className="w-3.5 h-3.5" /> },
    { name: 'Schedule', target: '#schedule', icon: <Clock className="w-3.5 h-3.5" /> },
    { name: 'About', target: '/about', icon: <Info className="w-3.5 h-3.5" /> },
    { name: 'Contact Us', target: '#footer', icon: <Phone className="w-3.5 h-3.5" /> },
  ];

  // Official Social Media Links
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/protofos_iiitbh/',
      icon: <Instagram className="w-4 h-4" />,
    },
    {
      name: 'LinkedIn',
      href: 'https://in.linkedin.com/company/technical-iiitbh',
      icon: <Linkedin className="w-4 h-4" />,
    },
  ];

  // Dynamic scroll spy & path detection to highlight active navigation tab
  useEffect(() => {
    if (currentPath === '/schedule' || (typeof window !== 'undefined' && window.location.pathname.startsWith('/schedule'))) {
      setActiveSection('Schedule');
      return;
    }

    if (currentPath === '/about' || (typeof window !== 'undefined' && window.location.pathname.startsWith('/about'))) {
      setActiveSection('About');
      return;
    }

    const sectionElements = [
      { id: 'hero', name: 'Home' },
      { id: 'descent', name: 'Home' },
      { id: 'events', name: 'Events' },
      { id: 'competitions', name: 'Competitions' },
      { id: 'schedule', name: 'Schedule' },
      { id: 'about', name: 'About' },
      { id: 'footer', name: 'Contact Us' },
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight * 0.35;
          const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

          if (isAtBottom) {
            setActiveSection('Contact Us');
            ticking = false;
            return;
          }

          for (let i = sectionElements.length - 1; i >= 0; i--) {
            const { id, name } = sectionElements[i];
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const top = rect.top + window.scrollY;
              if (scrollPosition >= top) {
                setActiveSection(name);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPath]);

  const handleClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === '#schedule' || target === '/schedule') {
      setActiveSection('Schedule');
    } else if (target === '/about' || target === '#about') {
      setActiveSection('About');
    }

    if (onNavigate) {
      onNavigate(target);
    } else {
      if (target.startsWith('#')) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = target;
      }
    }
  };

  return (
    <>
      {/* =====================================================================
          1. TOP NAVBAR HEADER: Fixed bar with integrated top navigation
          ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-10 py-3 sm:py-4 flex items-center justify-between select-none bg-gradient-to-b from-[#04070b]/95 via-[#04070b]/80 to-transparent backdrop-blur-md">

        {/* Top-Left: Logo + Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-3 group transition-transform hover:scale-105 cursor-pointer z-10"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
            <img
              src="/images/protofos-nav-icon.png"
              alt="Protofos Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(246,232,30,0.7)]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-cynatar font-black italic text-lg sm:text-xl text-[#f6e81e] tracking-wider leading-none filter drop-shadow-[0_0_10px_rgba(246,232,30,0.85)] group-hover:brightness-125 transition-all">
              PROTOFOS
            </span>
            <span className="font-spacemono font-bold text-[8.5px] sm:text-[9.5px] text-[#19e3f5] tracking-[0.24em] uppercase mt-1 filter drop-shadow-[0_0_8px_rgba(25,227,245,0.85)]">
              IIIT BHAGALPUR
            </span>
          </div>
        </a>

        {/* Top-Center: Relocated Navigation Dock (Desktop & Tablet) */}
        <nav
          className="hidden md:flex items-center"
          aria-label="Primary Navigation"
        >


          <div className="bg-[#060b14]/90 backdrop-blur-xl border border-white/10 rounded-full px-2.5 py-1.5 flex items-center gap-1 lg:gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;

              return (
                <a
                  key={item.name}
                  href={item.target}
                  onClick={(e) => handleClick(e, item.target)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-spacemono tracking-wider uppercase transition-all duration-200 cursor-pointer border ${isActive
                      ? 'text-[#f6e81e] bg-[#f6e81e]/10 border-[#f6e81e]/40 shadow-[0_0_12px_rgba(246,232,30,0.25)]'
                      : 'text-slate-300 border-transparent hover:text-[#f6e81e] hover:bg-[#f6e81e]/10 hover:border-[#f6e81e]/40 hover:shadow-[0_0_12px_rgba(246,232,30,0.25)]'
                    }`}
                  title={item.name}
                >
                  <span
                    className={`transition-colors ${isActive
                        ? 'text-[#f6e81e]'
                        : 'text-slate-400 group-hover:text-[#f6e81e]'
                      }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>



        </nav>

        {/* Top-Right: Mobile Toggle & Spacer */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden w-9 h-9 flex items-center justify-center bg-[#060b14]/90 border border-white/10 hover:border-[#19e3f5]/50 text-slate-200 hover:text-[#19e3f5] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Spacer for desktop layout balance */}
          <div className="w-[120px] hidden lg:block pointer-events-none" />
        </div>

      </header>

      {/* =====================================================================
          MOBILE NAVIGATION DRAWER
          ===================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#04070b]/95 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200 select-none">
          <nav className="flex flex-col gap-2 pt-4">
            <span className="text-[10px] font-spacemono text-[#19e3f5] tracking-widest uppercase mb-2">
              // TERMINAL NAVIGATION
            </span>
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <a
                  key={item.name}
                  href={item.target}
                  onClick={(e) => handleClick(e, item.target)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-spacemono text-sm tracking-wider uppercase transition-all ${isActive
                    ? 'bg-[#19e3f5]/15 text-[#19e3f5] border border-[#19e3f5]/40 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                  <span className={isActive ? 'text-[#19e3f5]' : 'text-[#f6e81e]'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Socials Footer */}
          <div className="pt-6 border-t border-white/10">
            <span className="text-[10px] font-spacemono text-slate-400 tracking-wider uppercase block mb-3">
              Official Social Channels
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-[#060b14] border border-[#19e3f5]/30 text-xs font-spacemono text-slate-200 hover:text-[#f6e81e] rounded"
                >
                  {s.icon}
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. RIGHT VERTICAL SOCIAL DOCK: Official Social Media Links
          ===================================================================== */}
      <aside
        className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center select-none"
        aria-label="Official Social Links"
      >
        <div className="bg-[#060b14]/90 backdrop-blur-xl border border-white/10 hover:border-[#19e3f5]/30 rounded-[28px] py-4 px-2 flex flex-col items-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] w-[46px] transition-colors">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Official ${s.name} Profile`}
              aria-label={`Visit ProtoFos on ${s.name}`}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-[#19e3f5] hover:bg-white/10 transition-all hover:drop-shadow-[0_0_8px_rgba(25,227,245,0.85)] cursor-pointer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
