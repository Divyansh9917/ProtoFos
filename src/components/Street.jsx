import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, Zap, Cpu, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Street = ({ onSelectEvent }) => {
  const containerRef = useRef(null);
  const streetBgRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeSign, setActiveSign] = useState(null);

  // Rain and atmospheric steam particle simulation on the street
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Rain drops
    const drops = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 8 + 12,
      opacity: Math.random() * 0.4 + 0.1
    }));

    // Steam vents
    const steamParticles = Array.from({ length: 30 }, () => ({
      x: canvas.width * 0.2 + (Math.random() - 0.5) * 80,
      y: canvas.height * 0.85 + Math.random() * 40,
      radius: Math.random() * 25 + 10,
      alpha: Math.random() * 0.15 + 0.05,
      vy: Math.random() * 0.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.5
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render rain
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1;
      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.5;
        if (d.y > canvas.height) {
          d.y = -20;
          d.x = Math.random() * canvas.width;
        }
      });

      // Render rising steam from grates
      steamParticles.forEach((p) => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(0, 240, 255, ${p.alpha})`);
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.vy;
        p.x += p.vx;
        p.radius += 0.15;
        p.alpha -= 0.0008;

        if (p.alpha <= 0 || p.y < canvas.height * 0.5) {
          p.x = canvas.width * 0.2 + (Math.random() - 0.5) * 80;
          p.y = canvas.height * 0.85;
          p.radius = Math.random() * 20 + 8;
          p.alpha = Math.random() * 0.15 + 0.05;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax camera forward movement along the street
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(streetBgRef.current, {
        scale: 1.18,
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const streetSigns = [
    {
      id: "hackathon",
      title: "HACKATHON",
      sub: "DISTRICT 01 // 36H SPRINT",
      color: "border-cyan-400 text-cyan-300 shadow-neon-blue",
      dot: "bg-cyan-400",
      top: "28%",
      left: "12%",
      district: "HACKATHON DISTRICT"
    },
    {
      id: "robotics",
      title: "ROBOTICS",
      sub: "DISTRICT 02 // COMBAT BOTS",
      color: "border-yellow-400 text-yellow-300 shadow-neon-yellow",
      dot: "bg-yellow-400",
      top: "22%",
      right: "14%",
      district: "ROBOTICS DISTRICT"
    },
    {
      id: "drone-racing",
      title: "DRONE RACING",
      sub: "DISTRICT 03 // FPV 140 KM/H",
      color: "border-cyan-400 text-cyan-300 shadow-neon-blue",
      dot: "bg-cyan-400",
      top: "48%",
      left: "8%",
      district: "DRONE DISTRICT"
    },
    {
      id: "startup-pitch",
      title: "STARTUP PITCH",
      sub: "DISTRICT 04 // VC SEED ARENA",
      color: "border-yellow-400 text-yellow-300 shadow-neon-yellow",
      dot: "bg-yellow-400",
      top: "45%",
      right: "10%",
      district: "STARTUP DISTRICT"
    },
    {
      id: "robo-soccer",
      title: "ROBO SOCCER",
      sub: "DISTRICT 05 // MECHA ARENA",
      color: "border-cyan-400 text-cyan-300 shadow-neon-blue",
      dot: "bg-cyan-400",
      top: "65%",
      left: "18%",
      district: "MECHA SPORTS"
    },
    {
      id: "tech-talks",
      title: "TECH TALKS",
      sub: "DISTRICT 06 // PIONEER SUMMIT",
      color: "border-yellow-400 text-yellow-300 shadow-neon-yellow",
      dot: "bg-yellow-400",
      top: "64%",
      right: "18%",
      district: "INNOVATION DISTRICT"
    }
  ];

  return (
    <section
      ref={containerRef}
      id="street"
      className="relative w-full min-h-[110vh] overflow-hidden bg-[#030712] flex flex-col justify-between py-16"
    >
      {/* Background Street Plate with camera depth */}
      <div
        ref={streetBgRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center transition-transform"
        style={{
          backgroundImage: `url('/images/cyberpunk_street_level.jpg')`,
        }}
      >
        {/* Dark contrast gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-transparent to-[#030712]/80" />
      </div>

      {/* Atmospheric rain & rising vent steam canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Header HUD / Street Entry Badge */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#04060B]/90 border border-[#FCEE0A]/40 text-[#FCEE0A] font-mono text-[11px] tracking-widest uppercase mb-2 cyber-cut-sm">
            <span className="w-2 h-2 bg-[#FCEE0A] animate-ping"></span>
            <span>LOCATION: GROUND LEVEL // PROTOFOS BOULEVARD</span>
          </div>
          <h2 className="font-cyberpunk font-black italic text-3xl sm:text-5xl text-white tracking-wider uppercase">
            THE CYBERPUNK <span className="text-[#FCEE0A] text-glow-yellow">AVENUE</span>
          </h2>
          <p className="font-mono text-slate-300 text-xs sm:text-sm tracking-widest mt-1 uppercase">
            // EXPLORE PHYSICAL EVENT DISTRICTS EMBEDDED IN THE METROPOLIS INFRASTRUCTURE
          </p>
        </div>

        <div className="bg-[#0E131F]/90 border border-slate-700 p-3 cyber-cut font-mono text-xs text-slate-400 hidden md:block">
          <p className="text-[#00F0FF] font-cyberpunk font-bold">// INTERACTIVE STREET RADAR</p>
          <p className="text-[11px] text-[#FCEE0A]">HOVER OVER DISTRICT SIGNS TO ENGAGE</p>
        </div>
      </div>

      {/* Holographic Signs floating physically along the street in perspective */}
      <div className="relative z-20 w-full max-w-7xl mx-auto h-[620px] px-4 my-8">
        {streetSigns.map((sign) => (
          <div
            key={sign.id}
            style={{
              position: 'absolute',
              top: sign.top,
              left: sign.left,
              right: sign.right,
            }}
            onMouseEnter={() => setActiveSign(sign.id)}
            onMouseLeave={() => setActiveSign(null)}
            className="group cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            {/* Holographic Street Sign Unit in Cyberpunk Chamfer */}
            <a
              href={`#event-${sign.id}`}
              onClick={(e) => {
                if (onSelectEvent) {
                  onSelectEvent(sign.id);
                }
              }}
              className={`block px-5 py-3 bg-[#04060B]/90 backdrop-blur-md border ${sign.color} cyber-cut transition-all duration-300`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-slate-300 mb-1">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className={`w-1.5 h-1.5 ${sign.dot} animate-pulse`}></span>
                  <span>{sign.district}</span>
                </span>
                <span className="text-[#FCEE0A] group-hover:translate-x-1 transition-transform font-bold">
                  &rarr;
                </span>
              </div>
              <h3 className="font-cyberpunk font-black italic text-lg sm:text-xl tracking-wider text-white group-hover:text-[#FCEE0A] transition-colors uppercase">
                {sign.title}
              </h3>
              <p className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
                {sign.sub}
              </p>
            </a>
            {/* Holographic projector beam under sign */}
            <div className="w-14 h-6 mx-auto bg-gradient-to-b from-[#00F0FF]/30 to-transparent blur-sm pointer-events-none"></div>
          </div>
        ))}

        {/* Central Street Hologram with Group 1 Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-8 border-2 border-[#00F0FF]/20 rounded-full w-72 h-72 sm:w-96 sm:h-96 flex flex-col items-center justify-center text-center animate-spin-slow bg-gradient-to-b from-[#00F0FF]/5 via-transparent to-[#FCEE0A]/5">
            <img
              src="/protofos-logo.png"
              alt="Protofos Central Hologram"
              className="h-20 sm:h-28 w-auto object-contain opacity-75 filter drop-shadow-[0_0_15px_rgba(252,238,10,0.7)]"
            />
            <span className="font-cyberpunk font-bold text-xs tracking-[0.4em] text-[#00F0FF] uppercase mt-2">
              PROTOFOS // NIGHT CITY
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center font-mono text-xs text-slate-400 flex items-center justify-center gap-2">
        <span className="text-cyan-400">&bull;</span>
        <span>CONTINUE SCROLLING TO ENTER THE EDITORIAL & EVENT BRIEFINGS</span>
        <span className="text-yellow-400">&bull;</span>
      </div>
    </section>
  );
};
