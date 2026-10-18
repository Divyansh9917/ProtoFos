import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Cpu,
  Phone,
  Users,
  LogIn,
  MessageCircle,
  MessageSquare
} from 'lucide-react';

export const Navbar = ({ onOpenTickets, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('Home');

  const navCenterTabs = [
    { name: 'ACCOMMODATION', target: '#intro', badge: null },
    { name: 'WORKSHOPS', target: '#events', badge: 'EARLY BIRD' },
    { name: 'COMPETITIONS', target: '#competitions', badge: null },
    { name: 'IGNITE', target: '#timeline', badge: null },
  ];

  const leftDockItems = [
    { name: 'Home', target: '#hero', icon: <Home className="w-[18px] h-[18px]" /> },
    { name: 'Events', target: '#events', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { name: 'Clubs', target: '#clubs', icon: <Cpu className="w-[18px] h-[18px]" /> },
    { name: 'Contact Us', target: '#footer', icon: <Phone className="w-[18px] h-[18px]" /> },
    { name: 'About Us', target: '#intro', icon: <Users className="w-[18px] h-[18px]" /> },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      )
    },
    {
      name: 'Chat 1',
      href: '#chat',
      icon: <MessageCircle className="w-3.5 h-3.5" />
    },
    {
      name: 'Chat 2',
      href: '#chat2',
      icon: <MessageSquare className="w-3.5 h-3.5" />
    }
  ];

  // IntersectionObserver to highlight active left dock tab dynamically
  useEffect(() => {
    const sections = [
      { id: 'hero', name: 'Home' },
      { id: 'descent', name: 'Home' },
      { id: 'events', name: 'Events' },
      { id: 'competitions', name: 'Events' },
      { id: 'clubs', name: 'Clubs' },
      { id: 'intro', name: 'About Us' },
      { id: 'footer', name: 'Contact Us' },
    ];

    const observers = [];
    sections.forEach(({ id, name }) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(name);
            }
          },
          { threshold: 0.25 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. TOP NAVBAR HEADER with subtle dark gradient and backdrop blur */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between select-none bg-gradient-to-b from-[#04070b]/92 via-[#04070b]/60 to-transparent backdrop-blur-[2px]">

        {/* Top-Left: Logo + Wordmark + Cyan IIIT BHAGALPUR */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="flex items-center gap-3 group transition-transform hover:scale-105"
        >
          {/* Framed Cyber Logo Badge */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
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

        {/* Top-Center: Angled-Corner Pill Navbar */}
        <div className="hidden md:flex items-center relative">
          <div className="relative flex items-center">

            {/* SVG Angled-Corner Pill Frame */}
            <div className="relative px-8 lg:px-9 py-2.5 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 540 44"
              >
                <polygon
                  points="16,2 524,2 538,14 538,30 524,42 16,42 2,30 2,14"
                  fill="rgba(6, 11, 19, 0.90)"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Nav Items */}
              <div className="relative z-10 flex items-center gap-7 lg:gap-8 text-[11px] font-spacemono font-bold tracking-[0.18em] uppercase">
                {navCenterTabs.map((item) => (
                  <div key={item.name} className="relative group flex flex-col items-center">

                    {/* Yellow EARLY BIRD Badge above WORKSHOPS */}
                    {item.badge && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                        <span className="bg-[#f6e81e] text-[#04070b] text-[8px] font-bold font-spacemono px-1.5 py-0.5 tracking-wider uppercase shadow-[0_0_8px_#f6e81e] whitespace-nowrap block">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    <a
                      href={item.target}
                      onClick={(e) => handleClick(e, item.target)}
                      className="text-slate-200 hover:text-[#f6e81e] transition-colors py-1 block relative group-hover:drop-shadow-[0_0_8px_rgba(246,232,30,0.8)]"
                    >
                      <span>{item.name}</span>
                    </a>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Top-Right: SIGN IN Button with Icon */}
        <div className="flex items-center">
          <button
            onClick={() => onOpenTickets && onOpenTickets(null)}
            className="flex items-center gap-2 px-4 py-2 bg-[#060a12]/85 hover:bg-[#101726] border border-white/20 hover:border-[#19e3f5] text-[11px] font-spacemono font-bold tracking-wider text-slate-200 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md group hover:drop-shadow-[0_0_10px_rgba(25,227,245,0.6)] cursor-pointer"
            style={{
              clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)'
            }}
          >
            <LogIn className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#19e3f5] transition-colors" />
            <span className="uppercase">SIGN IN</span>
          </button>
        </div>

      </header>

      {/* 2. LEFT VERTICAL GLASS DOCK */}
      <aside className="fixed left-5 sm:left-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center select-none">
        <div className="bg-[#060b14]/85 backdrop-blur-xl border border-white/10 rounded-[28px] py-5 px-2.5 flex flex-col items-center gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] w-[68px]">
          {leftDockItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.target}
                onClick={(e) => handleClick(e, item.target)}
                className="flex flex-col items-center group transition-transform hover:scale-105 w-full cursor-pointer"
                title={item.name}
              >
                <div className={`transition-all ${isActive
                    ? 'text-[#19e3f5] filter drop-shadow-[0_0_10px_rgba(25,227,245,0.9)] scale-110'
                    : 'text-slate-400 group-hover:text-white'
                  }`}>
                  {item.icon}
                </div>
                <span className={`text-[8.5px] font-spacemono tracking-wider mt-1 text-center whitespace-nowrap transition-colors ${isActive
                    ? 'text-[#19e3f5] font-bold filter drop-shadow-[0_0_6px_rgba(25,227,245,0.8)]'
                    : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* 3. RIGHT VERTICAL SOCIAL DOCK */}
      <aside className="fixed right-5 sm:right-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center select-none">
        <div className="bg-[#060b14]/85 backdrop-blur-xl border border-white/10 rounded-[28px] py-4 px-2 flex flex-col items-center gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.9)] w-[48px]">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.name}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-[#19e3f5] hover:bg-white/10 transition-all hover:drop-shadow-[0_0_8px_rgba(25,227,245,0.8)]"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </aside>

      {/* 4. BOTTOM-RIGHT FLOATING ACTION BUTTON */}
      <div className="fixed bottom-7 right-7 z-50">
        <button
          onClick={() => onOpenTickets && onOpenTickets(null)}
          title="Quick Pass"
          className="w-11 h-11 rounded-full bg-[#e11d48] hover:bg-[#f43f5e] text-white flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.85)] hover:scale-110 transition-all cursor-pointer"
        >
          <span className="font-serif font-black italic text-lg leading-none">T</span>
        </button>
      </div>
    </>
  );
};
