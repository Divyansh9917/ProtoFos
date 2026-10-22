import React, { useMemo } from 'react';
import { WalkingAnimation } from '../WalkingAnimation/WalkingAnimation';

interface SpiderManCharacterProps {
  progress: number; // 0.0 to 1.0
  velocity?: number;
  reducedMotion?: boolean;
}

export const SpiderManCharacter: React.FC<SpiderManCharacterProps> = ({
  progress,
  velocity = 0,
  reducedMotion = false,
}) => {
  // Perspective Kinematics for Neon Future City Avenue:
  // The central vanishing point under the skyway bridge is situated at ~32% from the bottom.
  // At progress = 0.0: Spider-Man starts in foreground (bottom 4.5%, scale 0.95).
  // At progress = 1.0: Spider-Man walks down the center dashed lane to the horizon (bottom 31.5%, scale 0.24).
  const { bottomPercent, scale, opacity, blur } = useMemo(() => {
    const t = Math.min(Math.max(progress, 0), 1);
    
    // Smooth depth easing curve
    const depthCurve = Math.pow(t, 1.12);
    
    const bottom = 4.5 + depthCurve * 27.0; // 4.5% to 31.5%
    const currentScale = 0.95 - depthCurve * 0.71; // 0.95 down to 0.24
    
    // Distance atmospheric haze near the horizon
    const currentBlur = depthCurve * 0.6;
    // Fades gracefully into the horizon glow at the very end
    const currentOpacity = t > 0.94 ? 1 - (t - 0.94) * 5.0 : 1;

    return {
      bottomPercent: bottom,
      scale: Math.max(currentScale, 0.22),
      opacity: Math.max(currentOpacity, 0.4),
      blur: currentBlur,
    };
  }, [progress]);

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center will-change-transform origin-bottom"
      style={{
        bottom: `${bottomPercent}%`,
        transform: `translateX(-50%) scale(${scale})`,
        opacity: opacity,
        filter: blur > 0.1 ? `blur(${blur}px)` : 'none',
        transition: 'bottom 0.12s ease-out, transform 0.12s ease-out, opacity 0.2s ease-out',
        width: '320px',
        height: '460px',
      }}
    >
      {/* 1. Subtle Ambient Rim Light Aura (Neon Yellow with soft magenta tone) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full filter blur-xl opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(248, 223, 36, 0.4) 0%, rgba(255, 39, 216, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* 2. Spider-Man Character Walking Away (Foreground) */}
      <div className="relative w-full h-full flex items-end justify-center">
        <WalkingAnimation
          progress={progress}
          velocity={velocity}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* 3. Wet Asphalt Ground Reflection (Mirrored upside-down, matching the wet street) */}
      <div
        className="absolute top-[98%] left-1/2 -translate-x-1/2 w-full h-[60%] pointer-events-none overflow-hidden origin-top select-none opacity-25"
        style={{
          transform: 'translateX(-50%) scaleY(-0.6)',
          filter: 'blur(3px) brightness(0.85)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)',
        }}
      >
        <WalkingAnimation
          progress={progress}
          velocity={velocity}
          reducedMotion={true}
        />
      </div>

      {/* 4. Wet Puddle Contact Glow with Yellow & Magenta Ambient Highlights */}
      <div className="absolute top-[96%] left-1/2 -translate-x-1/2 w-48 h-10 pointer-events-none flex items-center justify-center">
        {/* Contact Shadow */}
        <div className="absolute w-36 h-6 bg-black/85 rounded-full blur-[4px]" />

        {/* Neon Yellow & Magenta Wet Road Reflection Glaze */}
        <div
          className="absolute w-44 h-10 rounded-full blur-[10px] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(248, 223, 36, 0.6) 0%, rgba(255, 39, 216, 0.25) 50%, transparent 70%)',
          }}
        />

        {/* Expanding Puddle Ripple Rings */}
        {!reducedMotion && (
          <>
            <div className="absolute w-28 h-6 border border-[#F8DF24]/40 rounded-full animate-puddle-ripple pointer-events-none" />
            <div
              className="absolute w-28 h-6 border border-[#FF27D8]/25 rounded-full animate-puddle-ripple pointer-events-none"
              style={{ animationDelay: '0.9s' }}
            />
          </>
        )}
      </div>
    </div>
  );
};
