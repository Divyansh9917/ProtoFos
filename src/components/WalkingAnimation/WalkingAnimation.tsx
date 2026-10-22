import React, { useEffect, useState, useRef } from 'react';
import { WalkPose } from '../../types';

interface WalkingAnimationProps {
  progress: number; // 0.0 to 1.0
  velocity?: number;
  reducedMotion?: boolean;
}

export const WalkingAnimation: React.FC<WalkingAnimationProps> = ({
  progress,
  velocity = 0,
  reducedMotion = false,
}) => {
  const [currentPose, setCurrentPose] = useState<WalkPose>('A');
  const [stridePhase, setStridePhase] = useState<number>(0);
  const lastProgressRef = useRef(progress);
  const stepDistanceRef = useRef(0);

  // Scroll-driven stride calculation:
  // As the user scrolls, step distance accumulates to progress the walk cycle:
  // Cycle: A (contact) -> B (right step) -> A (passing) -> C (left step) -> A
  useEffect(() => {
    if (reducedMotion) {
      setCurrentPose('B');
      return;
    }

    const delta = Math.abs(progress - lastProgressRef.current);
    lastProgressRef.current = progress;

    if (delta > 0.0001) {
      // Accumulate stride distance
      stepDistanceRef.current += delta * 60; // 60 strides across full page scroll
      const cyclePos = stepDistanceRef.current % 4;
      const phase = Math.floor(cyclePos);
      setStridePhase(cyclePos);

      if (phase === 0) {
        setCurrentPose('A');
      } else if (phase === 1) {
        setCurrentPose('B');
      } else if (phase === 2) {
        setCurrentPose('A');
      } else {
        setCurrentPose('C');
      }
    }
  }, [progress, reducedMotion]);

  // Subtle ambient idle breathing/step bobbing if standing still
  const [idleBob, setIdleBob] = useState(0);
  useEffect(() => {
    if (reducedMotion) return;
    let frameId: number;
    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      // 1.5 Hz subtle breathing oscillation (1.5px amplitude)
      setIdleBob(Math.sin(elapsed * 3) * 1.5);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  // Determine active asset path
  const poseAsset = `/assets/spiderman-pose-${currentPose.toLowerCase()}.png`;

  // Stride bounce: natural bobbing as foot strikes ground
  const walkBob = reducedMotion ? 0 : Math.sin(stridePhase * Math.PI) * 4.5;
  const totalYBob = walkBob + idleBob;
  // Subtle hip sway: tilts slightly with each stride
  const hipSway = reducedMotion ? 0 : Math.sin(stridePhase * Math.PI * 0.5) * 1.5;

  return (
    <div
      className="relative w-full h-full flex items-end justify-center will-change-transform"
      style={{
        transform: `translateY(${-totalYBob}px) rotate(${hipSway}deg)`,
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Spider-Man Character Image */}
      <img
        src={poseAsset}
        alt={`Spider-Man walking away (Pose ${currentPose})`}
        className="w-auto h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] pointer-events-none select-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
