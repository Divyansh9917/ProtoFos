import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Play, Code, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { cyberAudio } from '../../utils/audioSystem';

export const HackathonSection = ({ onOpenRegister }) => {
  // Live simulated cyberpunk compiler / build logs
  const [logs, setLogs] = useState([
    '[INIT] Connecting to ProtoFos Cluster...',
    '[INFO] Allocating GPU nodes (H100 x 64)',
    '[OK] ROS2 micro-controller telemetry stream established',
    '[BUILD] Compiling multi-agent consensus algorithms...',
    '[READY] 36-Hour Hackathon Grid Armed & Operational.',
  ]);

  useEffect(() => {
    const candidateLogs = [
      '[CUDA] Kernel launch: Neural edge inference 0.42ms',
      '[FPGA] Bitstream flashed: Low-latency motor control',
      '[AUTH] 1,280/1,500 Hackathon slots reserved across 40 universities',
      '[SYS] Real-time scoreboard pipeline verified: 100% throughput',
      '[NET] Web3 oracle contract deployed on testnet node',
      '[ALERT] Mentorship queue: 24 active industry architects online',
    ];

    const interval = setInterval(() => {
      const nextLog = candidateLogs[Math.floor(Math.random() * candidateLogs.length)];
      setLogs((prev) => [...prev.slice(-5), nextLog]);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hackathon" className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="p-8 sm:p-12 rounded-sm border border-cyber-cyan/50 bg-[#030814]/90 backdrop-blur-xl clip-cyber-corner shadow-[0_0_50px_rgba(0,229,255,0.15)]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-cyber-cyan/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan tracking-[0.25em] mb-2">
              <span className="w-2 h-2 rounded-full bg-cyber-magenta animate-pulse" />
              <span>10 // CODE TODAY. A BRIGHTER TOMORROW.</span>
            </div>
            <h2 className="font-orbitron font-black text-4xl sm:text-6xl text-white tracking-wide">
              BUILD · SOLVE · INNOVATE · TOGETHER
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-orbitron font-black text-3xl sm:text-5xl text-cyber-cyan text-glow-cyan">
            36 HOURS
          </div>
        </div>

        {/* Content Columns: Features + Interactive Cyber Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left: Pillars & Checklist from Storyboard Panel 10 */}
          <div>
            <p className="font-mono text-sm text-slate-300 mb-8 leading-relaxed">
              ProtoFos 36H Hackathon is not a weekend hobby hack. It is a high-intensity battleground
              where cross-domain teams engineer real hardware, autonomous intelligence, and scalable software
              under uncompromising production constraints.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { title: 'REAL PROBLEMS', desc: 'Direct problem statements curated with industry partner engineering teams.' },
                { title: 'CROSS-DOMAIN TEAMS', desc: 'Hardware hackers, AI researchers, frontend crafters, and product strategists unite.' },
                { title: 'EXPERT MENTORSHIP', desc: 'Round-the-clock 1-on-1 architecture reviews with tier-1 staff engineers and founders.' },
                { title: 'EXCITING PRIZES', desc: '$10,000 cash pool + seed incubation offers from top venture capital syndicates.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded border border-slate-800/80 bg-[#050c1e]/60">
                  <CheckCircle2 size={18} className="text-cyber-cyan mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-orbitron font-bold text-sm text-white tracking-wider">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  cyberAudio.playCyberBeep();
                  onOpenRegister('36H PROTO-HACK');
                }}
                className="px-8 py-3 font-orbitron font-bold text-xs tracking-[0.2em] bg-cyber-cyan text-black clip-cyber-btn hover:bg-white transition-all shadow-[0_0_25px_rgba(0,229,255,0.6)]"
              >
                EXPLORE HACKATHON &rarr;
              </button>

              <span className="font-mono text-xs text-slate-400">
                OCT 31, 09:00 AM // VENUE: MAIN ARENA
              </span>
            </div>
          </div>

          {/* Right: Interactive Cyber Terminal Output */}
          <div className="p-6 rounded border border-slate-700/80 bg-[#02050e] font-mono text-xs shadow-2xl relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-slate-400 text-[11px] ml-2">protofos-hack-kernel // v2.6.0</span>
              </div>
              <span className="text-[10px] text-cyber-cyan animate-pulse">GRID_LIVE</span>
            </div>

            {/* Terminal Log Stream */}
            <div className="space-y-2.5 h-64 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-cyber-cyan">&gt;</span>
                  <span className={log.includes('[ALERT]') ? 'text-cyber-magenta font-semibold' : ''}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-cyber-cyan animate-pulse">
                <span>&gt;</span>
                <span className="inline-block w-2.5 h-4 bg-cyber-cyan" />
              </div>
            </div>

            {/* Terminal Footer Telemetry */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
              <span>LATENCY: 12MS</span>
              <span>MEMORY: 16.4 / 64 GB</span>
              <span className="text-emerald-400">SECURITY: PASS</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
