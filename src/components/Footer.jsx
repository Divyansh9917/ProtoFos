import React from 'react';
import { ArrowUp, Instagram, Linkedin, Phone, ExternalLink } from 'lucide-react';

export const Footer = ({ onNavigate }) => {

  const scrollToTop = () => {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isScheduleActive = typeof window !== 'undefined' && window.location.pathname.startsWith('/schedule');
  const isAboutActive = typeof window !== 'undefined' && window.location.pathname.startsWith('/about');

  const directoryLinks = [
    { name: 'HOME', href: '#hero', active: !isScheduleActive && !isAboutActive },
    { name: 'EVENTS', href: '#events', active: false },
    { name: 'COMPETITIONS', href: '#competitions', active: false },
    { name: 'SCHEDULE', href: '#schedule', active: isScheduleActive },
    { name: 'ABOUT', href: '/about', active: isAboutActive },
  ];

  const contactPersons = [
    {
      name: 'Saurabh Ranjan',
      phone: '+91 80836 74302',
      tel: '+918083674302',
      role: 'Student Coordinator',
    },
    {
      name: 'Yash Wardhan Rai',
      phone: '+91 93104 79073',
      tel: '+919310479073',
      role: 'Student Coordinator',
    },
  ];

  const socialLinks = [
    {
      name: 'INSTAGRAM',
      handle: '@protofos_iiitbh',
      href: 'https://www.instagram.com/protofos_iiitbh/',
      icon: <Instagram className="w-5 h-5 text-[#19e3f5]" />,
    },
    {
      name: 'LINKEDIN',
      handle: 'IIIT Bhagalpur',
      href: 'https://in.linkedin.com/company/technical-iiitbh',
      icon: <Linkedin className="w-5 h-5 text-[#19e3f5]" />,
    },
  ];

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    } else {
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (href.startsWith('/')) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#04070b] text-slate-300 overflow-hidden select-none"
      aria-label="Protofos Central System Terminal"
    >
      {/* Soft gradient fade from previous section to avoid hard cut */}
      <div className="absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-transparent to-[#04070b] pointer-events-none z-20" />

      {/* =====================================================================
          BACKGROUND: 2-LAYER INLINE SVG SKYLINE + FLICKERING WINDOW LIGHTS
          ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* City Skyline Silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64 sm:h-80 md:h-96 object-cover"
          viewBox="0 0 1440 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Layer 1: Distant City Skyscrapers */}
          <g opacity="0.08" fill="#19e3f5">
            <rect x="0" y="160" width="45" height="200" />
            <rect x="55" y="110" width="60" height="250" />
            <polygon points="85,60 83,110 87,110" />
            <rect x="125" y="180" width="50" height="180" />
            <rect x="185" y="130" width="75" height="230" />
            <rect x="270" y="80" width="65" height="280" />
            <polygon points="302,30 300,80 305,80" />
            <rect x="345" y="150" width="55" height="210" />
            <rect x="410" y="120" width="80" height="240" />
            <rect x="500" y="170" width="60" height="190" />
            <rect x="570" y="70" width="70" height="290" />
            <polygon points="605,20 603,70 607,70" />
            <rect x="650" y="140" width="50" height="220" />
            <rect x="710" y="100" width="85" height="260" />
            <rect x="805" y="160" width="65" height="200" />
            <rect x="880" y="90" width="75" height="270" />
            <polygon points="917,40 915,90 920,90" />
            <rect x="965" y="130" width="60" height="230" />
            <rect x="1035" y="170" width="55" height="190" />
            <rect x="1100" y="110" width="70" height="250" />
            <rect x="1180" y="80" width="80" height="280" />
            <polygon points="1220,35 1218,80 1222,80" />
            <rect x="1270" y="150" width="60" height="210" />
            <rect x="1340" y="120" width="100" height="240" />
          </g>

          {/* Layer 2: Foreground Heavy Highrises */}
          <g opacity="0.07" fill="#0e1828" stroke="#19e3f5" strokeWidth="0.5">
            <rect x="20" y="190" width="70" height="170" />
            <rect x="100" y="140" width="55" height="220" />
            <rect x="165" y="210" width="65" height="150" />
            <rect x="240" y="160" width="80" height="200" />
            <rect x="330" y="200" width="50" height="160" />
            <rect x="390" y="150" width="90" height="210" />
            <rect x="490" y="190" width="60" height="170" />
            <rect x="560" y="130" width="65" height="230" />
            <rect x="635" y="180" width="55" height="180" />
            <rect x="700" y="150" width="75" height="210" />
            <rect x="785" y="210" width="65" height="150" />
            <rect x="860" y="140" width="80" height="220" />
            <rect x="950" y="190" width="65" height="170" />
            <rect x="1025" y="160" width="55" height="200" />
            <rect x="1090" y="180" width="80" height="180" />
            <rect x="1180" y="140" width="70" height="220" />
            <rect x="1260" y="190" width="65" height="170" />
            <rect x="1335" y="160" width="90" height="200" />
          </g>

          {/* Random Window Lights */}
          <g>
            <circle cx="115" cy="155" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="260" cy="180" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="585" cy="95" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="730" cy="120" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="1120" cy="135" r="1.5" fill="#f6e81e" className="flicker-dot-a" />
            <circle cx="195" cy="150" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="450" cy="165" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="750" cy="170" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
            <circle cx="1060" cy="180" r="1.5" fill="#19e3f5" className="flicker-dot-b" />
          </g>
        </svg>

        {/* Scanline CRT overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.8) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Ambient bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, transparent 35%, #04070b 95%)',
          }}
        />
      </div>

      {/* =====================================================================
          MAIN UNIFIED FOOTER CONTAINER
          ===================================================================== */}
      {/* =====================================================================
          MAIN UNIFIED FOOTER CONTAINER
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-14 relative z-10">
        <div className="relative w-full bg-[#050c18]/95 backdrop-blur-md border border-[#19e3f5] shadow-[0_0_20px_rgba(25,227,245,0.12)] p-6 sm:p-8 lg:p-9">
          {/* Cyber Corner Brackets */}
          <div className="absolute -top-[2px] -left-[2px] w-3.5 h-3.5 border-t-2 border-l-2 border-[#19e3f5] pointer-events-none" />
          <div className="absolute -top-[2px] -right-[2px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#19e3f5] pointer-events-none" />
          <div className="absolute -bottom-[2px] -left-[2px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#19e3f5] pointer-events-none" />
          <div className="absolute -bottom-[2px] -right-[2px] w-3.5 h-3.5 border-b-2 border-r-2 border-[#19e3f5] pointer-events-none" />

          {/* ===================================================================
              4 BALANCED SECTIONS: Branding, Directory, Enquiries, Transmissions
              =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

            {/* Column 1: ProtoFos Branding (4 cols on lg) */}
            <div className="lg:col-span-4 relative flex flex-col justify-between">
              <div className="relative z-10 space-y-3.5">
                {/* Logo + Heading */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-1.5 bg-[#04070b] border border-[#f6e81e] shadow-[0_0_12px_rgba(246,232,30,0.35)] flex-shrink-0 rounded-[2px]">
                    <img
                      src="/protofos-logo.png"
                      alt="Protofos Official Logo"
                      className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(246,232,30,0.7)]"
                    />
                  </div>

                  <div>
                    <h3 className="footer-glitch-title inline-block font-cyberpunk font-bold italic text-xl sm:text-2xl text-white tracking-widest leading-none">
                      PROTOFOS <span className="text-[#f6e81e] drop-shadow-[0_0_10px_rgba(246,232,30,0.6)]">2026</span>
                    </h3>
                    <span className="block font-spacemono text-[9.5px] sm:text-[10px] text-[#19e3f5] tracking-[0.2em] uppercase mt-1">
                      IIIT BHAGALPUR TECHNICAL BOARD
                    </span>
                  </div>
                </div>

                <p className="font-body text-xs text-slate-300 leading-relaxed max-w-sm">
                  The flagship interdisciplinary annual technical festival of Indian Institute of Information Technology Bhagalpur.
                </p>

                <div className="inline-flex items-center gap-2 font-spacemono text-[10px] text-[#8793a2] pt-1">
                  <span>30 OCT - 01 NOV 2026 // ON-CAMPUS</span>
                </div>
              </div>
            </div>

            {/* Column 2: Directory (2 cols on lg) */}
            <div className="lg:col-span-2 border-l border-[#19e3f5]/20 pl-6 lg:pl-7">
              <div className="flex items-center text-xs font-spacemono text-[#19e3f5] tracking-widest uppercase pb-2 border-b border-[#19e3f5]/25 mb-3.5">
                <span className="font-bold">DIRECTORY</span>
              </div>

              <ul className="space-y-1.5">
                {directoryLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`group flex items-center py-1 font-spacemono uppercase text-xs tracking-wider transition-colors duration-150 cursor-pointer ${item.active ? 'text-[#f6e81e] font-semibold' : 'text-[#8793a2] hover:text-[#f6e81e]'
                        }`}
                    >
                      <span
                        className={`inline-block mr-2 text-xs transition-all duration-150 transform ${item.active
                          ? 'text-[#f6e81e] translate-x-0 opacity-100'
                          : 'text-[#19e3f5] group-hover:text-[#f6e81e] -translate-x-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                      >
                        ▸
                      </span>
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Enquiries (3 cols on lg) */}
            <div className="lg:col-span-3 border-l border-[#19e3f5]/20 pl-6 lg:pl-7">
              <div className="flex items-center text-xs font-spacemono text-[#19e3f5] tracking-widest uppercase pb-2 border-b border-[#19e3f5]/25 mb-3.5">
                <span className="font-bold">ENQUIRIES & CONTACT</span>
              </div>

              <p className="font-spacemono text-[11px] text-slate-400 mb-4 leading-relaxed">
                For registrations, event assistance, or further enquiry:
              </p>

              <div className="space-y-3">
                {contactPersons.map((contact) => (
                  <div key={contact.name} className="transition-colors">
                    <div className="text-xs font-spacemono font-semibold text-white">
                      {contact.name}
                    </div>
                    <div className="text-[10px] font-spacemono text-[#8793a2] mb-1">
                      {contact.role}
                    </div>
                    <a
                      href={`tel:${contact.tel}`}
                      className="inline-flex items-center gap-1.5 text-xs font-spacemono text-[#19e3f5] hover:underline transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#19e3f5]" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Transmissions / Social Links (3 cols on lg) */}
            <div className="lg:col-span-3 border-l border-[#19e3f5]/20 pl-6 lg:pl-7">
              <div className="flex items-center text-xs font-spacemono text-[#19e3f5] tracking-widest uppercase pb-2 border-b border-[#19e3f5]/25 mb-3.5">
                <span className="font-bold">SOCIALS</span>
              </div>

              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Official ${s.name}`}
                    className="flex items-center gap-3 p-2.5 border border-[#19e3f5]/40 hover:border-[#19e3f5] bg-transparent hover:bg-[#19e3f5]/5 transition-all group cursor-pointer"
                  >
                    <div className="w-9 h-9 border border-[#19e3f5]/50 group-hover:border-[#19e3f5] flex items-center justify-center text-[#19e3f5] transition-colors flex-shrink-0">
                      {s.icon}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-spacemono font-bold uppercase text-white group-hover:text-[#19e3f5] transition-colors flex items-center gap-1.5">
                        <span>{s.name}</span>
                        <ExternalLink className="w-3 h-3 text-white/80 group-hover:text-[#19e3f5] transition-colors" />
                      </div>
                      <div className="text-[11px] font-spacemono text-[#8793a2] truncate mt-0.5">
                        {s.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ===================================================================
              RETURN TO SKYLINE BUTTON: Centered
              =================================================================== */}
          <div className="mt-8 sm:mt-10 mb-6 flex justify-center">
            <button
              type="button"
              onClick={scrollToTop}
              className="py-2 px-6 sm:px-7 bg-transparent hover:bg-[#f6e81e]/10 text-[#f6e81e] border border-[#f6e81e] shadow-[0_0_10px_rgba(246,232,30,0.15)] hover:shadow-[0_0_20px_rgba(246,232,30,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-xs font-spacemono font-bold tracking-widest uppercase cursor-pointer group"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span>RETURN TO SKYLINE</span>
            </button>
          </div>

          {/* ===================================================================
              BOTTOM SECTION: IIIT Bhagalpur Branding + Divider + Copyright
              =================================================================== */}
          <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Circular Glowing IIIT Bhagalpur Logo + 3-line Text */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#19e3f5] p-1 bg-[#04070b] shadow-[0_0_15px_rgba(25,227,245,0.5)] flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/iiit-bhagalpur-logo.png"
                  alt="IIIT Bhagalpur Official Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="text-left font-spacemono leading-tight">
                <div className="text-xs sm:text-[13px] font-bold text-[#19e3f5] tracking-wider uppercase">
                  IIIT BHAGALPUR
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#19e3f5]/90 tracking-wide mt-0.5">
                  Indian Institute of Information
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#19e3f5]/90 tracking-wide">
                  Technology Bhagalpur
                </div>
              </div>
            </div>

            {/* Center: Thin horizontal divider line */}
            <div className="hidden lg:block flex-1 h-[1px] bg-white/10 mx-6" />

            {/* Right: Copyright */}
            <div className="font-spacemono text-[10px] sm:text-[11px] text-[#8793a2] tracking-wider text-center md:text-right">
              &copy; 2026 PROTOFOS. ALL RIGHTS RESERVED. IIIT BHAGALPUR.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
