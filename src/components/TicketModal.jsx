import React, { useState } from 'react';
import { X, Ticket, Check, QrCode, Download, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/protofosData';

export const TicketModal = ({ isOpen, onClose, preselectedEvent }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [passType, setPassType] = useState('ALL-ACCESS');
  const [generated, setGenerated] = useState(false);
  const [passId, setPassId] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const randomId = 'PF-2026-' + Math.floor(1000 + Math.random() * 9000);
    setPassId(randomId);
    setGenerated(true);
  };

  const passTiers = [
    {
      id: 'COMPETITOR',
      title: 'HACKER / COMPETITOR',
      price: 'FREE // SHORTLIST REQUIRED',
      badge: 'PRIORITY QUEUE',
      desc: 'Full access to hackathons, bot cages, drone tracks & edge compute.'
    },
    {
      id: 'ALL-ACCESS',
      title: 'VIP ALL-ACCESS PASS',
      price: '₹299 // 2 DAYS',
      badge: 'UNRESTRICTED',
      desc: 'All districts, keynote summits, workshop entry, official cyber swag.'
    },
    {
      id: 'SPECTATOR',
      title: 'SPECTATOR VISITOR PASS',
      price: 'FREE',
      badge: 'STANDARD',
      desc: 'Public viewing arenas for robot battles, drone races, and startup pitches.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div
        className="relative w-full max-w-2xl bg-[#060B18] border border-cyan-400/50 cyber-corner p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-[0_0_60px_rgba(0,240,255,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-yellow-400" />
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
              TICKET PASS TERMINAL // PROTOCOL 2026
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generated ? (
          /* Input Form */
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <h3 className="font-cyberpunk font-black italic text-2xl text-white tracking-wide uppercase mb-1">
                SECURE YOUR ACCESS PASS
              </h3>
              <p className="font-mono text-xs text-slate-400 uppercase">
                // REGISTER YOUR IDENTIFIER TO ENTER THE PROTOFOS 2026 METROPOLIS.
              </p>
            </div>

            {/* Pass Selection */}
            <div className="space-y-3">
              <label className="font-cyberpunk font-bold text-xs text-[#FCEE0A] uppercase tracking-wider block">
                SELECT PASS TIER:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {passTiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setPassType(tier.id)}
                    className={`p-3.5 border cyber-cut-sm cursor-pointer transition-all duration-300 ${
                      passType === tier.id
                        ? 'border-[#FCEE0A] bg-[#FCEE0A]/10 shadow-[0_0_15px_rgba(252,238,10,0.3)]'
                        : 'border-slate-800 bg-[#04060B]/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="font-bold text-[#00F0FF]">{tier.badge}</span>
                      {passType === tier.id && <Check className="w-3.5 h-3.5 text-[#FCEE0A]" />}
                    </div>
                    <div className="font-cyberpunk font-bold text-xs text-white uppercase mb-1">
                      {tier.title}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#FCEE0A]">
                      {tier.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="font-cyberpunk font-bold text-xs text-slate-300 uppercase tracking-wider block mb-1.5">
                FULL NAME // OPERATIVE CALLSIGN:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Vance / Cipher"
                className="w-full px-4 py-2.5 bg-[#04060B] border border-slate-700 focus:border-[#FCEE0A] text-white font-mono text-sm outline-none transition-colors cyber-cut-sm"
              />
            </div>

            {/* College Input */}
            <div>
              <label className="font-cyberpunk font-bold text-xs text-slate-300 uppercase tracking-wider block mb-1.5">
                INSTITUTION // GUILD:
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Indian Institute of Information Technology"
                className="w-full px-4 py-2.5 bg-[#04060B] border border-slate-700 focus:border-[#00F0FF] text-white font-mono text-sm outline-none transition-colors cyber-cut-sm"
              />
            </div>

            {preselectedEvent && (
              <div className="p-3 bg-[#FCEE0A]/10 border border-[#FCEE0A]/50 text-xs font-mono text-[#FCEE0A] flex items-center gap-2 cyber-cut-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Selected Event District: <strong>{preselectedEvent.name}</strong></span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 cyber-cut bg-[#FCEE0A] hover:bg-white text-black font-cyberpunk font-black text-xs tracking-widest uppercase hover:shadow-neon-yellow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>SYNTHESIZE HOLOGRAPHIC PASS</span>
            </button>
          </form>
        ) : (
          /* Generated Holographic Cyber Pass with Group 1 Logo */
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <span className="font-mono text-[10px] text-[#00F0FF] tracking-widest uppercase block mb-1 font-bold">
                // PASS CONFIRMED & ISSUED // SECTOR 07
              </span>
              <h3 className="font-cyberpunk font-black italic text-2xl text-white uppercase tracking-wider">
                PROTOFOS 2026 OFFICIAL PASS
              </h3>
            </div>

            {/* The Futuristic Ticket Card with Group 1 Logo */}
            <div className="relative p-6 bg-gradient-to-br from-[#04060B] via-[#0E131F] to-[#04060B] border-2 border-[#FCEE0A] cyber-cut shadow-[0_0_40px_rgba(252,238,10,0.35)] overflow-hidden">
              {/* Corner Watermarks */}
              <div className="absolute top-2 right-3 font-mono text-[9px] text-[#00F0FF] font-bold">
                CLEARANCE // SECTOR 07
              </div>

              {/* Shimmer line */}
              <div className="absolute -top-10 -bottom-10 left-1/4 w-12 bg-white/5 rotate-12 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-3 flex-1 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src="/protofos-logo.png"
                      alt="Logo"
                      className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(252,238,10,0.8)]"
                    />
                    <span className="px-2 py-0.5 bg-[#FCEE0A] text-black font-cyberpunk font-black text-xs tracking-wider uppercase cyber-cut-sm">
                      {passType}
                    </span>
                    <span className="font-mono text-xs text-[#FCEE0A] font-bold">
                      {passId}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-slate-400 uppercase block font-bold">// ATTENDEE</span>
                    <span className="font-cyberpunk font-black italic text-2xl text-white tracking-wide uppercase">
                      {name}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-slate-400 uppercase block font-bold">// INSTITUTION</span>
                    <span className="font-cyber font-bold text-base text-[#00F0FF]">
                      {college}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                    <span>DATE: 31 OCT — 01 NOV 2026</span>
                    <span>&bull;</span>
                    <span className="text-[#FCEE0A]">DOORS OPEN: 08:30 AM</span>
                  </div>
                </div>

                {/* QR Code Module */}
                <div className="p-3 bg-white cyber-cut-sm flex flex-col items-center justify-center shrink-0">
                  <QrCode className="w-24 h-24 text-black" />
                  <span className="font-mono text-[8px] text-black font-bold tracking-widest mt-1">
                    PF26-VALID
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert(`Pass ${passId} saved! Screenshot or present this QR code at the Sector 07 entry gates.`);
                  onClose();
                }}
                className="flex-1 py-3 cyber-cut bg-[#FCEE0A] hover:bg-white text-black font-cyberpunk font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-black" />
                <span>SAVE PASS TO DEVICE</span>
              </button>
              <button
                onClick={() => setGenerated(false)}
                className="px-5 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs cyber-cut-sm uppercase"
              >
                EDIT DETAILS
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
