import React, { useState } from 'react';
import { Cpu, Terminal, Bot, TrendingUp, Sparkles, Globe, Layers, ArrowUpRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audioSystem';

export const AboutSection = ({ onOpenRegister }) => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'software',
      icon: Terminal,
      title: 'SOFTWARE',
      tagline: 'Distributed Systems & Intelligence',
      desc: 'Scalable cloud micro-services, real-time algorithms, autonomous AI agents, and secure cryptographic primitives built to handle megacity load.',
      color: '#00E5FF',
      metrics: '32 Open Repos'
    },
    {
      id: 'hardware',
      icon: Cpu,
      title: 'HARDWARE',
      tagline: 'Silicon & Embedded Edge',
      desc: 'FPGA acceleration, custom multi-layer PCB design, micro-controller firmware, and low-latency sensor telemetry pipelines.',
      color: '#FF2BD6',
      metrics: '400+ Development Boards'
    },
    {
      id: 'robotics',
      icon: Bot,
      title: 'ROBOTICS',
      tagline: 'Autonomous Mechatronics',
      desc: 'ROS2 multi-agent navigation, heavy combat combatants, inverted pendulums, computer vision SLAM, and sub-second actuator feedback.',
      color: '#168CFF',
      metrics: '20+ Combat Mechs'
    },
    {
      id: 'entrepreneurship',
      icon: TrendingUp,
      title: 'ENTREPRENEURSHIP',
      tagline: 'Venture & Incubation Scale',
      desc: 'Translating deep engineering prototypes into resilient commercial tech companies with access to tier-1 seed funds and founder mentorship.',
      color: '#7C3AED',
      metrics: '$2.4M Venture Raised'
    }
  ];

  return (
    <section id="about" className="relative z-20 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-cyber-cyan/20 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan tracking-[0.25em] mb-3">
            <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-ping" />
            <span>08 // A PLATFORM FOR THE NEXT GENERATION</span>
          </div>
          <h2 className="font-orbitron font-black text-4xl sm:text-6xl text-white tracking-tight">
            A FESTIVAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-magenta">
              BEYOND BOUNDARIES.
            </span>
          </h2>
        </div>

        <p className="mt-6 md:mt-0 max-w-md font-mono text-sm text-slate-300 leading-relaxed border-l-2 border-cyber-cyan pl-4">
          A platform for the next generation. ProtoFos brings together the brightest engineering minds across institutions
          to compete, collaborate and innovate across software, hardware, robotics and entrepreneurship.
        </p>
      </div>

      {/* Interactive Core: 4 Interconnected Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const isSelected = activePillar === index;

          return (
            <div
              key={pillar.id}
              onClick={() => {
                cyberAudio.playCyberBeep();
                setActivePillar(index);
              }}
              className={`cursor-pointer p-6 rounded-sm border transition-all duration-300 clip-cyber-card relative group ${
                isSelected
                  ? 'bg-[#050e20]/90 border-cyber-cyan shadow-[0_0_30px_rgba(0,229,255,0.25)] translate-y-[-4px]'
                  : 'bg-[#030711]/70 border-slate-800/80 hover:border-slate-600 hover:bg-[#040a16]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded border"
                  style={{
                    borderColor: pillar.color,
                    backgroundColor: `${pillar.color}15`,
                    color: pillar.color,
                  }}
                >
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500">
                  PILLAR 0{index + 1}
                </span>
              </div>

              <h3 className="font-orbitron font-bold text-xl text-white tracking-wider mb-1">
                {pillar.title}
              </h3>
              <p
                className="text-xs font-mono font-medium tracking-wide mb-3"
                style={{ color: pillar.color }}
              >
                {pillar.tagline}
              </p>
              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                {pillar.desc}
              </p>

              <div className="border-t border-slate-800/60 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{pillar.metrics}</span>
                <span className="text-cyber-cyan group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Stats Bar */}
      <div className="p-8 border border-cyber-cyan/30 bg-[#040816]/80 backdrop-blur-md clip-cyber-corner grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <div className="font-orbitron font-black text-3xl sm:text-4xl text-cyber-cyan mb-1">
            5,000+
          </div>
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            STUDENT INNOVATORS
          </div>
        </div>

        <div>
          <div className="font-orbitron font-black text-3xl sm:text-4xl text-cyber-magenta mb-1">
            36 HRS
          </div>
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            NON-STOP ENGINEERING
          </div>
        </div>

        <div>
          <div className="font-orbitron font-black text-3xl sm:text-4xl text-cyber-blue mb-1">
            $30,000+
          </div>
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            PRIZE & INCUBATION POOL
          </div>
        </div>

        <div>
          <div className="font-orbitron font-black text-3xl sm:text-4xl text-purple-400 mb-1">
            40+
          </div>
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            PARTNER UNIVERSITIES
          </div>
        </div>
      </div>
    </section>
  );
};
