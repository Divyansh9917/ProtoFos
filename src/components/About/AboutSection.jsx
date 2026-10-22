import React from 'react';
import {
  Quote,
  Terminal,
  Cpu,
  Bot,
  Shield,
  Layers,
  Sparkles,
  Compass,
  Radio,
  Binary
} from 'lucide-react';

// ============================================================================
// PROPOSED DRAFT STATEMENTS & EDITABLE PLACEHOLDERS
// Note: All quotations below represent proposed draft copy pending final
// personal approval from respective faculty and student leads.
// Designations for Dhiraj Sir and Om Prakash Singh Sir are editable placeholders.
// ============================================================================

const DIRECTOR_PROFILE = {
  id: 'FAC_01',
  note: 'DIRECTOR',
  name: 'Prof.\u00A0Madhusudan Singh',
  designation: 'Director',
  initials: 'MS',
  photo: '/about-section-photos/madhusudan_singh.jpg',
  objectPosition: 'center 62%',
  isDesignationPending: false,
  quote:
    "The future of our nation will be shaped by the ideas we nurture and the innovations we bring to life today. I hope ProtoFos 2026 inspires our students to think beyond the ordinary, embrace emerging technologies like AI, and use their knowledge to address real-world challenges. As India moves towards a future driven by technology and innovation, our young minds have an important role to play in building a stronger, more self-reliant nation. May this fest encourage them not just to dream of a better future, but to take the first steps towards creating one for our country and for society.",
};

const FACULTY_MEMBERS = [
  {
    id: 'FAC_02',
    note: 'LEADERSHIP',
    name: 'Dr.\u00A0Dheeraj Kumar Sinha',
    designation: 'Associate Dean, Student Welfare',
    initials: 'DS',
    photo: null,
    objectPosition: 'center',
    isDesignationPending: false,
    quote:
      "A technical fest is more than what we learn in a classroom. It's about trying new things, learning from challenges, and discovering what we can achieve when we work together. I hope ProtoFos 2026 gives every participant the chance to explore their interests, learn something new, and take home experiences and memories that stay with them long after the fest is over.",
  },
  {
    id: 'FAC_03',
    note: 'FACULTY INCHARGE',
    name: 'Dr.\u00A0Om\u00A0Prakash Singh',
    designation: 'Faculty Incharge, Technical Board',
    initials: 'OPS',
    photo: '/about-section-photos/om-prakash-singh.jpeg',
    objectPosition: 'center 12%',
    isDesignationPending: false,
    quote:
      "Some of the best ideas come from simply being curious and having the courage to try something new. I hope ProtoFos 2026 gives our students the confidence to experiment, learn from their mistakes, and support each other along the way. After all, every challenge is a chance to learn something new, and every experience brings us one step closer to becoming better at what we do.",
  },
];

const STUDENT_LEADS = [
  {
    id: 'STU_01',
    note: 'TECHNICAL BOARD',
    name: 'Yug Sharma',
    role: 'General Secretary, Technical Board',
    initials: 'YS',
    photo: '/about-section-photos/yug-sharma.jpeg',
    objectPosition: 'center 15%',
    quote:
      "ProtoFos is a chance for students to step out of their comfort zones, put their skills to the test, and learn from one another. Beyond the competitions, it's about exploring new ideas, tackling challenges, and discovering how much we can achieve when we put our knowledge into practice. I hope everyone makes the most of this opportunity, works together, and embraces every experience with an open mind. May ProtoFos leave you with fresh ideas, valuable experiences, meaningful connections, and the motivation to keep learning, creating, and building something of your own.",
  },{
    id: 'STU_02',
    note: 'FEST LEAD',
    name: 'Divyansh Mishra',
    role: 'Fest Head',
    initials: 'DM',
    photo: '/about-section-photos/divyansh-mishra.jpeg',
    objectPosition: 'center 16%',
    quote:
      "Every great fest comes to life through the ideas, efforts, and enthusiasm of the people behind it. ProtoFos 2026 brings us together to celebrate technology, creativity, and the spirit of building something meaningful as a team. I hope everyone dives into the experience, takes on new challenges, and enjoys every moment along the way. Let’s work together to make this edition of ProtoFos truly memorable!",
  },
];

const CORE_DOMAINS = [
  {
    label: 'SOFTWARE',
    sublabel: 'Distributed Systems & Web3',
    icon: Terminal,
    accent: '#19e3f5',
  },
  {
    label: 'INTELLIGENCE',
    sublabel: 'Autonomous Agents & ML',
    icon: Bot,
    accent: '#f6e81e',
  },
  {
    label: 'ROBOTICS',
    sublabel: 'Mechatronics & Embedded',
    icon: Cpu,
    accent: '#19e3f5',
  },
  {
    label: 'CYBERSECURITY',
    sublabel: 'Protocol Defense & Logic',
    icon: Shield,
    accent: '#f6e81e',
  },
];

export const AboutSection = () => {
  return (
    <div className="relative w-full overflow-hidden text-slate-100">
      {/* Background Ambience: Subtle Cyber Grid & Restrained Glows */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #19e3f5 1px, transparent 1px), linear-gradient(to bottom, #19e3f5 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#19e3f5]/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 -right-32 w-96 h-96 bg-[#f6e81e]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col gap-20 sm:gap-28 pb-16">

        {/* ====================================================================
            A. SECTION HEADER
            ==================================================================== */}
        <section aria-labelledby="about-main-heading" className="pt-4 sm:pt-6">
          <div className="flex flex-col items-start max-w-4xl">
            {/* Technical Identifier */}


            {/* Main Heading */}
            <h1
              id="about-main-heading"
              className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] uppercase"
            >
              ABOUT{' '}
              <span className="text-[#19e3f5] font-spacemono font-light drop-shadow-[0_0_12px_rgba(25,227,245,0.8)]">
                //
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f6e81e] to-[#FFF56D] drop-shadow-[0_0_25px_rgba(246,232,30,0.4)]">
                PROTOFOS 2026
              </span>
            </h1>

            {/* Supporting Tagline */}
            <p className="font-cinzel italic font-semibold text-lg sm:text-2xl text-[#e6d84a] tracking-wide mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Engineering Ideas. Building Tomorrow.
            </p>

            {/* Supporting Description */}
            <div className="mt-6 border-l-2 border-[#19e3f5] pl-4 sm:pl-6 py-1 bg-gradient-to-r from-[#0b1526]/60 to-transparent">
              <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                ProtoFos 2026 is a celebration of technology, creativity, and the people who love building things.
                Bringing together students from different fields, the fest features competitions and activities spanning
                software development, artificial intelligence, robotics, cybersecurity, and more.
                It's a place to put your skills to the test, learn something new, meet people who share your interests,
                and turn ideas into reality. Whether you're competing, collaborating, or exploring something for the first time,
                ProtoFos is all about experimenting, building, and discovering what's possible.

              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            B. ABOUT THE FEST (THE VISION)
            ==================================================================== */}
        <section aria-labelledby="fest-vision-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Text Panel */}
            <div
              className="lg:col-span-7 bg-[#060d1b]/85 backdrop-blur-md border border-[#19e3f5]/25 p-6 sm:p-8 lg:p-10 relative flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Corner Accent Decorator */}
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#19e3f5]" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#f6e81e]" />

              <div>

                <h2
                  id="fest-vision-heading"
                  className="font-orbitron font-bold text-2xl sm:text-3xl text-white tracking-wide uppercase mb-6 flex flex-wrap items-center gap-2.5"
                >
                  <span>THE VISION</span>
                  <span className="text-[#19e3f5] font-spacemono text-xl">//</span>
                  <span className="text-[#f6e81e] drop-shadow-[0_0_12px_rgba(246,232,30,0.6)]">
                    BEYOND THE ORDINARY
                  </span>
                </h2>

                <div className="space-y-4 text-slate-300 font-body text-sm sm:text-[15px] leading-relaxed">
                  <p>
                    Every great invention starts with a question: <b>What if?</b></p>
                  <p> ProtoFos`26 is where that question turns into action. Bringing
                    together tech enthusiasts, problem-solvers, and aspiring innovators,
                    the fest dives into the worlds of software, artificial intelligence,
                    robotics, cybersecurity, and engineering. It`s a place to experiment
                    with ideas, take on challenges, compete with the best, and build
                    things that go beyond the drawing board.</p>
                  <p>
                    Whether you're showcasing a project, solving a problem, or exploring
                    something completely new, ProtoFos is about pushing your limits and
                    learning by doing. Come with an idea, leave with a new
                    perspective—and maybe something you never thought you could build.

                  </p>
                </div>
              </div>

              {/* Technical Bottom HUD Meta */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-spacemono text-slate-400">
                <div className="flex items-center gap-2">

                  <span>EDITION // 2026</span>
                </div>

              </div>
            </div>

            {/* Right: Technical Domain Matrix HUD Graphic */}
            <div
              className="lg:col-span-5 bg-[#050a16]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 relative flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-[10px] font-spacemono tracking-[0.2em] text-slate-400 uppercase">
                  SPECTRUM // FOCUS_AREAS
                </span>

              </div>

              {/* 4 Technical Cards Matching the Vision Disciplines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                {CORE_DOMAINS.map((domain, idx) => {
                  const Icon = domain.icon;
                  return (
                    <div
                      key={domain.label}
                      className="p-3.5 bg-[#091122]/70 border border-white/5 hover:border-[#19e3f5]/40 transition-colors flex items-center gap-3.5"
                    >
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center shrink-0 border"
                        style={{
                          borderColor: `${domain.accent}40`,
                          backgroundColor: `${domain.accent}12`,
                          color: domain.accent,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-orbitron text-xs sm:text-[13px] font-bold text-white tracking-wider truncate">
                            {domain.label}
                          </span>
                          <span className="font-spacemono text-[9px] text-slate-500">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="font-spacemono text-[10.5px] text-slate-400 truncate">
                          {domain.sublabel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cyber Graphic Reticle */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-spacemono text-slate-500">
                <span>COLLABORATION // INNOVATION</span>
                <span className="text-[#19e3f5]"></span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C. FACULTY VOICES
            ==================================================================== */}
        <section aria-labelledby="faculty-voices-heading">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">

            <h2
              id="faculty-voices-heading"
              className="font-orbitron font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase flex flex-wrap items-center gap-2.5"
            >
              <span>FACULTY VOICES</span>
              <span className="text-[#19e3f5] font-spacemono text-xl sm:text-2xl">//</span>
              <span className="text-[#19e3f5] drop-shadow-[0_0_12px_rgba(25,227,245,0.6)]">
                GUIDANCE &amp; VISION
              </span>
            </h2>
            <p className="mt-2 font-body text-slate-400 text-sm sm:text-base">
              Words of encouragement from the people who guide our journey.
            </p>
          </div>

          {/* 1. Director — Dedicated Profile Layout */}
          <div className="mb-8 sm:mb-10">
            <article
              className="bg-[#060c18]/95 backdrop-blur-md border border-[#19e3f5]/35 hover:border-[#19e3f5]/80 hover:shadow-[0_12px_45px_rgba(25,227,245,0.22)] transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))',
              }}
            >
              {/* Top ambient glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#19e3f5]/0 via-[#19e3f5]/60 to-[#19e3f5]/0 pointer-events-none" />

              <div>
                {/* Top Metabar */}


                {/* Header: Portrait Frame + Name + Designation + Quote */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10 mb-6">
                  {/* Dedicated Proportional Portrait Frame */}
                  <div
                    className="w-[145px] h-[175px] sm:w-[170px] sm:h-[205px] lg:w-[190px] lg:h-[230px] shrink-0 relative overflow-hidden bg-[#091322] border-2 border-[#19e3f5]/50 shadow-[0_0_24px_rgba(25,227,245,0.25)] flex items-center justify-center group-hover:border-[#19e3f5] transition-colors"
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
                    }}
                  >
                    <img
                      src={DIRECTOR_PROFILE.photo}
                      alt={`Portrait of ${DIRECTOR_PROFILE.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: DIRECTOR_PROFILE.objectPosition }}
                      loading="lazy"
                    />
                    {/* Cyber corner brackets */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#19e3f5] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#19e3f5] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#19e3f5]/50 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#19e3f5]/50 pointer-events-none" />
                  </div>

                  {/* Director Info & Quote */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">


                    <h3
                      className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide group-hover:text-[#19e3f5] transition-colors leading-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      {DIRECTOR_PROFILE.name}
                    </h3>

                    <p className="font-spacemono text-sm sm:text-base text-[#19e3f5] font-bold tracking-wider uppercase mt-1.5">
                      {DIRECTOR_PROFILE.designation}, IIIT Bhagalpur
                    </p>

                    {/* Prominent Quote Body */}
                    <div className="relative mt-5 pt-4 border-t border-white/10">
                      <Quote
                        className="w-6 h-6 text-[#19e3f5]/40 mb-2 rotate-180"
                        aria-hidden="true"
                      />
                      <blockquote
                        className="font-body text-slate-200 text-sm sm:text-base lg:text-[17px] leading-relaxed italic"
                        style={{ textWrap: 'pretty' }}
                      >
                        &ldquo;{DIRECTOR_PROFILE.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[10.5px] sm:text-[11px] font-spacemono text-slate-400">
                <span>IIIT_BHAGALPUR // DIRECTORATE</span>


              </div>
            </article>
          </div>

          {/* 2. Other Faculty Members — Student Card Layout Reference (2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {FACULTY_MEMBERS.map((faculty) => (
              <article
                key={faculty.id}
                className="bg-[#060c18]/90 backdrop-blur-md border border-[#19e3f5]/25 hover:border-[#19e3f5]/75 hover:shadow-[0_8px_32px_rgba(25,227,245,0.18)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group relative"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
                }}
              >
                {/* Top Metabar */}
                <div>


                  {/* Header: Portrait Frame + Name + Designation */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5">
                    <div
                      className="w-[124px] h-[148px] shrink-0 relative overflow-hidden bg-[#091322] border border-[#19e3f5]/50 shadow-[0_0_16px_rgba(25,227,245,0.2)] flex items-center justify-center group-hover:border-[#19e3f5] transition-colors"
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                      }}
                    >
                      {faculty.photo ? (
                        <img
                          src={faculty.photo}
                          alt={`Portrait of ${faculty.name}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: faculty.objectPosition }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1830] to-[#060c18] text-[#19e3f5] p-2 text-center">
                          <span className="font-orbitron font-bold text-2xl tracking-wider">
                            {faculty.initials}
                          </span>
                          <span className="font-spacemono text-[9px] text-[#19e3f5]/70 uppercase tracking-widest mt-1">
                            {faculty.initials} // LEAD
                          </span>
                        </div>
                      )}
                      {/* Corner brackets */}
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#19e3f5] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#19e3f5] pointer-events-none" />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">

                      <h3
                        className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#19e3f5] transition-colors leading-snug"
                        style={{ textWrap: 'balance' }}
                      >
                        {faculty.name}
                      </h3>
                      <p
                        className={`font-spacemono text-xs sm:text-sm mt-1.5 font-semibold tracking-wide ${faculty.isDesignationPending
                          ? 'text-amber-300/80 italic'
                          : 'text-[#19e3f5]'
                          }`}
                      >
                        {faculty.designation}
                      </p>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative pt-2">
                    <Quote
                      className="w-5 h-5 text-[#19e3f5]/40 mb-2 rotate-180"
                      aria-hidden="true"
                    />
                    <blockquote
                      className="font-body text-slate-200 text-sm sm:text-[15px] leading-relaxed italic"
                      style={{ textWrap: 'pretty' }}
                    >
                      &ldquo;{faculty.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10.5px] font-spacemono text-slate-400">
                  <span>IIIT_BHAGALPUR</span>

                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            D. STUDENT VOICES
            ==================================================================== */}
        <section aria-labelledby="student-voices-heading">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">

            <h2
              id="student-voices-heading"
              className="font-orbitron font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase flex flex-wrap items-center gap-2.5"
            >
              <span>STUDENT VOICES</span>
              <span className="text-[#f6e81e] font-spacemono text-xl sm:text-2xl">//</span>
              <span className="text-[#f6e81e] drop-shadow-[0_0_12px_rgba(246,232,30,0.6)]">
                THE PEOPLE BEHIND THE SIGNAL
              </span>
            </h2>
            <p className="mt-2 font-body text-slate-400 text-sm sm:text-base">
              Driven by teamwork. Powered by ideas. Built by students.
            </p>
          </div>

          {/* 2-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {STUDENT_LEADS.map((student) => (
              <article
                key={student.id}
                className="bg-[#070d18]/90 backdrop-blur-md border border-[#f6e81e]/30 hover:border-[#f6e81e]/80 hover:shadow-[0_8px_32px_rgba(246,232,30,0.18)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group relative"
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)',
                }}
              >
                {/* Top Metabar */}
                <div>


                  {/* Header: Portrait Frame + Name + Role */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5">
                    <div
                      className="w-[124px] h-[148px] shrink-0 relative overflow-hidden bg-[#141206] border border-[#f6e81e]/50 shadow-[0_0_16px_rgba(246,232,30,0.22)] flex items-center justify-center group-hover:border-[#f6e81e] transition-colors"
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                      }}
                    >
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt={`Portrait of ${student.name}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: student.objectPosition }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1908] to-[#070d18] text-[#f6e81e] p-2 text-center">
                          <span className="font-orbitron font-bold text-2xl tracking-wider">
                            {student.initials}
                          </span>
                          <span className="font-spacemono text-[9px] text-[#f6e81e]/70 uppercase tracking-widest mt-1">
                            {student.initials} // CORE
                          </span>
                        </div>
                      )}
                      {/* Corner brackets */}
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#f6e81e] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#f6e81e] pointer-events-none" />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">

                      <h3
                        className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#f6e81e] transition-colors leading-snug"
                        style={{ textWrap: 'balance' }}
                      >
                        {student.name}
                      </h3>
                      <p className="font-spacemono text-xs sm:text-sm text-[#19e3f5] font-semibold tracking-wide mt-1.5">
                        {student.role}
                      </p>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="relative pt-2">
                    <Quote
                      className="w-5 h-5 text-[#f6e81e]/40 mb-2 rotate-180"
                      aria-hidden="true"
                    />
                    <blockquote
                      className="font-body text-slate-200 text-sm sm:text-[15px] leading-relaxed italic"
                      style={{ textWrap: 'pretty' }}
                    >
                      &ldquo;{student.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10.5px] font-spacemono text-slate-400">
                  <span>ORGANIZING_BODY</span>

                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            E. CLOSING ELEMENT
            ==================================================================== */}
        <section aria-labelledby="closing-heading">
          <div
            className="relative p-8 sm:p-12 lg:p-14 text-center bg-[#060c18]/90 backdrop-blur-md border border-[#19e3f5]/25 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            }}
          >
            {/* Ambient Line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#f6e81e] to-transparent opacity-60" />

            {/* Small Terminal-Style Label */}
            <div className="inline-flex items-center gap-2 font-spacemono text-[11px] sm:text-xs tracking-[0.28em] text-[#19e3f5] uppercase mb-4">

            </div>

            {/* Heading */}
            <h2
              id="closing-heading"
              className="font-orbitron font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase mb-3 drop-shadow-[0_0_20px_rgba(246,232,30,0.4)]"
            >
              THE FUTURE IS BUILT BY US.
            </h2>

            {/* Supporting Text */}
            <p className="font-body text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              One community. Countless possibilities. A future waiting to be
              built.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutSection;
