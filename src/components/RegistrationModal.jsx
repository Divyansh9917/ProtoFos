import React, { useState } from 'react';
import { X, CheckCircle, Terminal, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../utils/audioSystem';

export const RegistrationModal = ({ isOpen, onClose, initialTrack = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    track: initialTrack || '36H PROTO-HACK',
    teamSize: '3',
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    cyberAudio.playCyberBeep();

    // Generate unique holographic ticket ID
    const ticketId = 'PF26-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setSubmittedTicket(ticketId);

    // Fire cyber neon confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E5FF', '#FF2BD6', '#168CFF', '#7C3AED'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-8 rounded-sm border border-cyber-cyan bg-[#030713] clip-cyber-card shadow-[0_0_60px_rgba(0,229,255,0.35)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {!submittedTicket ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan tracking-[0.2em] mb-2">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
              <span>ACCESS PROTOCOL // REGISTRATION GATEWAY</span>
            </div>

            <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white tracking-wide mb-2">
              REGISTER FOR PROTOFOS 2026
            </h3>
            <p className="font-mono text-xs text-slate-400 mb-6">
              Claim your pass to enter the 3D cyberpunk grid on 31 OCT — 1 NOV.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  FULL NAME / CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#050b1d] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  EMAIL ADDRESS (FOR CREDENTIALS)
                </label>
                <input
                  type="email"
                  required
                  placeholder="builder@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#050b1d] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    UNIVERSITY / ORG
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="IIIT / NIT / IIT / Other"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#050b1d] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-cyber-cyan font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    PRIMARY TRACK
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#050b1d] border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyber-cyan font-mono"
                  >
                    <option value="36H PROTO-HACK">36H Proto-Hack</option>
                    <option value="MECH WARS: OMEGA">Mech Wars: Omega</option>
                    <option value="CYBER FPV FLIGHT">Cyber FPV Flight</option>
                    <option value="ROBO SOCCER CUP">Robo Soccer Cup</option>
                    <option value="VENTURE GENESIS">Venture Genesis</option>
                    <option value="ALL-ACCESS PASS">All-Access General Pass</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3.5 font-orbitron font-bold text-xs tracking-[0.25em] bg-cyber-cyan text-black clip-cyber-btn hover:bg-white transition-all shadow-[0_0_25px_rgba(0,229,255,0.6)] flex items-center justify-center gap-2"
              >
                <span>CONFIRM REGISTRATION</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center mx-auto mb-4 text-cyber-cyan shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              <CheckCircle size={32} />
            </div>

            <h4 className="font-orbitron font-black text-2xl text-white mb-2">
              ACCESS PASS GRANTED
            </h4>
            <p className="font-mono text-xs text-slate-300 mb-6">
              Welcome to the ProtoFos 2026 grid, <span className="text-cyber-cyan font-bold">{formData.name}</span>.
            </p>

            <div className="p-4 rounded border border-dashed border-cyber-cyan/60 bg-[#050f24] font-mono text-xs text-left mb-6">
              <div className="flex justify-between text-slate-400 mb-1">
                <span>TICKET ID:</span>
                <span className="text-cyber-magenta font-bold">{submittedTicket}</span>
              </div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>TRACK:</span>
                <span className="text-white">{formData.track}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>DATE:</span>
                <span className="text-cyber-cyan">31 OCT — 1 NOV 2026</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedTicket(null);
                onClose();
              }}
              className="px-6 py-2.5 font-mono text-xs tracking-wider bg-slate-800 text-slate-200 hover:text-white rounded"
            >
              RETURN TO WORLD
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
