import React, { useState } from 'react';
import { Network, Users, Code, Cpu, Bot, TrendingUp, Shield, Radio } from 'lucide-react';
import { CLUBS, SPEAKERS } from '../../data/clubsData';
import { cyberAudio } from '../../utils/audioSystem';

export const ClubNetworkSection = () => {
  const [selectedClub, setSelectedClub] = useState(CLUBS[0]);

  return (
    <section id="clubs" className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ======================================================== */}
      {/* PART 1: MEET THE VISIONARIES (Speakers from Panel 11)   */}
      {/* ======================================================== */}
      <div className="mb-24">
        <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan tracking-[0.25em] mb-2">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
          <span>11 // IDEAS MEET INCREDIBLE MINDS</span>
        </div>
        <h2 className="font-orbitron font-black text-4xl sm:text-6xl text-white tracking-wide mb-12">
          MEET THE COMMUNITY & VISIONARIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPEAKERS.map((spk) => (
            <div
              key={spk.id}
              className="p-6 rounded-sm border border-slate-800 bg-[#040816]/90 backdrop-blur-md clip-cyber-card hover:border-cyber-magenta transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,43,214,0.25)] flex flex-col justify-between group"
            >
              <div>
                {/* Speaker Avatar / Visual Matrix */}
                <div className="relative w-full h-56 mb-6 overflow-hidden rounded border border-slate-800 group-hover:border-cyber-magenta transition-colors">
                  <img
                    src={spk.image}
                    alt={spk.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040816] via-transparent to-transparent" />
                  <span
                    className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono font-bold rounded border bg-black/60 backdrop-blur-md"
                    style={{ borderColor: spk.color, color: spk.color }}
                  >
                    {spk.badge}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-2xl text-white group-hover:text-cyber-magenta transition-colors">
                  {spk.name}
                </h3>
                <p className="font-mono text-xs text-cyber-cyan mt-0.5 mb-2">
                  {spk.role} // {spk.org}
                </p>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Topic: "{spk.topic}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>OCT 31 & NOV 01</span>
                <span className="text-cyber-magenta font-semibold">MAIN AUDITORIUM</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* PART 2: CAMPUS CLUB ECOSYSTEM (Panel 11 lower)          */}
      {/* ======================================================== */}
      <div className="p-8 sm:p-12 border border-cyber-cyan/40 bg-[#030713]/90 backdrop-blur-xl clip-cyber-corner">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyber-cyan/20 pb-6">
          <div>
            <span className="text-xs font-mono text-cyber-cyan tracking-[0.25em] block mb-1">
              // INTERDISCIPLINARY CAMPUS SYNERGY //
            </span>
            <h3 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-wider">
              ONE CAMPUS. ONE ECOSYSTEM.
            </h3>
          </div>
          <p className="font-mono text-xs text-slate-400 max-w-sm mt-4 md:mt-0">
            ProtoFos is co-engineered by 6 specialized campus guilds, uniting 500+ builders across robotics, AI, distributed systems, avionics, and venture finance.
          </p>
        </div>

        {/* Club Interactive Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {CLUBS.map((club) => {
            const isSelected = selectedClub.id === club.id;
            return (
              <button
                key={club.id}
                onClick={() => {
                  cyberAudio.playCyberBeep();
                  setSelectedClub(club);
                }}
                className={`p-4 rounded border text-center transition-all ${
                  isSelected
                    ? 'border-cyber-cyan bg-cyber-cyan/20 text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                    : 'border-slate-800 bg-[#050b1a] text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                <div className="font-orbitron font-black text-xl mb-1" style={{ color: club.color }}>
                  {club.code}
                </div>
                <div className="text-[10px] font-mono tracking-wider truncate">
                  {club.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Club Details Card */}
        <div className="p-6 rounded border border-slate-700 bg-[#050e22]/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-orbitron font-bold text-2xl text-white">
                {selectedClub.name}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyber-cyan">
                {selectedClub.category}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-300 max-w-2xl mb-3 leading-relaxed">
              {selectedClub.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedClub.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-slate-700 text-slate-400">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8">
            <div className="text-xs font-mono text-slate-400">ACTIVE BUILDERS</div>
            <div className="font-orbitron font-bold text-xl text-cyber-cyan mb-2">
              {selectedClub.leads}
            </div>
            <div className="text-xs font-mono text-slate-400">PORTFOLIO</div>
            <div className="font-mono text-xs text-slate-200">
              {selectedClub.projects}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
