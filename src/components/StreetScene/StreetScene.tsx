import React, { useMemo } from 'react';

interface StreetSceneProps {
  progress: number; // 0.0 to 1.0
  reducedMotion?: boolean;
  children?: React.ReactNode;
}

export const StreetScene: React.FC<StreetSceneProps> = ({
  progress,
  reducedMotion = false,
  children,
}) => {
  // Smooth cinematic push as user journeys down the avenue
  // Keeps the perspective natural and preserves the vanishing point
  const streetTransform = useMemo(() => {
    if (reducedMotion) {
      return 'scale(1.02)';
    }
    const scale = 1.0 + progress * 0.18; // Subtle 18% zoom for forward momentum
    const translateY = progress * 2.5; // percent
    return `scale(${scale}) translateY(${translateY}%)`;
  }, [progress, reducedMotion]);

  // Horizon bloom intensity as destination nears
  const horizonGlowOpacity = Math.min(Math.max((progress - 0.7) / 0.3, 0), 1);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#0A0B16] select-none pointer-events-none z-0">
      {/* 1. Master Environment: High-res Cinematic Avenue */}
      <div
        className="absolute inset-0 w-full h-full origin-center will-change-transform transition-transform duration-150 ease-out"
        style={{
          transform: streetTransform,
        }}
      >
        <img
          src="/assets/neon-future-city-avenue.png"
          alt="Futuristic Cyberpunk City Avenue"
          className="w-full h-full object-cover object-[center_68%]"
          loading="eager"
          decoding="async"
        />

        {/* Subtle Wet Road Reflection Accent (Enhances wet asphalt specular highlights) */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(248, 223, 36, 0.08) 0%, rgba(255, 39, 216, 0.04) 40%, rgba(0, 207, 255, 0.03) 70%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* 2. Atmospheric Depth & Cinematic Vignette (Preserves image clarity while ensuring card readability) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 55%, transparent 35%, rgba(7, 21, 47, 0.45) 75%, rgba(10, 11, 22, 0.85) 100%)',
        }}
      />

      {/* 3. Horizon Vanishing Point Flare (Gentle ambient glow aligned with road horizon) */}
      <div
        className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] pointer-events-none transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(248, 223, 36, 0.25) 0%, rgba(255, 39, 216, 0.12) 40%, transparent 75%)',
          opacity: 0.35 + horizonGlowOpacity * 0.65,
          filter: 'blur(28px)',
        }}
      />

      {/* 4. Subtle Scanline Texture for Sci-Fi Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20 scanlines-overlay" />

      {/* 5. Optional Children / Overlays */}
      {children}
    </div>
  );
};
