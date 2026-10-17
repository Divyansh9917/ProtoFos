import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ProtofosTowerMesh = () => {
  const towerRef = useRef();
  const portalGlowRef = useRef();

  useFrame((state) => {
    if (portalGlowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      portalGlowRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group ref={towerRef} position={[0, 30, -170]}>
      {/* Main Colossal Monolith Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[48, 140, 48]} />
        <meshStandardMaterial
          color="#040915"
          roughness={0.2}
          metalness={0.9}
          emissive="#001224"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Tapered Top Apex */}
      <mesh position={[0, 85, 0]}>
        <coneGeometry args={[28, 30, 4]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Massive Glowing Neon Triangle Emblem (ProtoFos Delta Icon) */}
      <group position={[0, 48, 24.5]}>
        {/* Outer glowing triangle lines */}
        <mesh>
          <ringGeometry args={[10, 11.5, 3]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
        </mesh>
        {/* Inner core glyph */}
        <mesh ref={portalGlowRef}>
          <circleGeometry args={[4.5, 3]} />
          <meshBasicMaterial
            color="#ff2bd6"
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Vertical Glowing Matrix Conduits (Cyan & Violet) */}
      {[-18, -6, 6, 18].map((xOffset, i) => (
        <mesh key={i} position={[xOffset, 0, 24.2]}>
          <planeGeometry args={[1.5, 120]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00e5ff' : '#7c3aed'}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* Ground Level Grand Entrance Portal (Panel 06) */}
      <group position={[0, -50, 24.3]}>
        <mesh>
          <planeGeometry args={[20, 22]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
        </mesh>
        {/* Portal Tunnel Depth Effect */}
        <mesh position={[0, 0, -8]}>
          <boxGeometry args={[18, 20, 18]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
};
