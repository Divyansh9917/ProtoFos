import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RainEffect = ({ count = 3500 }) => {
  const pointsRef = useRef();

  // Create rain particle positions & velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 200; // X spread
      pos[i * 3 + 1] = Math.random() * 120 - 20;     // Y height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z depth
      vel[i] = 1.2 + Math.random() * 1.5;           // Fall speed
    }
    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < count; i++) {
      // Fall down with slight wind drift along X and Z
      array[i * 3 + 1] -= velocities[i] * (delta * 60);
      array[i * 3 + 0] += 0.08 * (delta * 60);

      // Reset when below floor
      if (array[i * 3 + 1] < -25) {
        array[i * 3 + 1] = 95;
        array[i * 3 + 0] = (Math.random() - 0.5) * 200;
        array[i * 3 + 2] = (Math.random() - 0.5) * 200;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        color="#8ae8ff"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
