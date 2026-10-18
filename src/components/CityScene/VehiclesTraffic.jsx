import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const VehiclesTraffic = () => {
  const vehiclesRef = useRef();

  // Create 18 flying vehicles traversing at different altitudes and speeds
  const vehicles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 60,
      y: 10 + Math.random() * 45,
      z: -120 + i * 14,
      speed: 0.35 + Math.random() * 0.45,
      direction: Math.random() > 0.5 ? 1 : -1,
      length: 3 + Math.random() * 3,
      color: i % 2 === 0 ? '#00e5ff' : '#ff2bd6',
    }));
  }, []);

  useFrame((state, delta) => {
    if (!vehiclesRef.current) return;
    const children = vehiclesRef.current.children;

    vehicles.forEach((v, i) => {
      const child = children[i];
      if (!child) return;

      // Move vehicle along its trajectory
      child.position.z += v.speed * v.direction * (delta * 60);

      // Wrap around
      if (v.direction > 0 && child.position.z > 80) {
        child.position.z = -140;
      } else if (v.direction < 0 && child.position.z < -140) {
        child.position.z = 80;
      }

      // Gentle floating bob
      child.position.y = v.y + Math.sin(state.clock.elapsedTime * 2 + i) * 0.4;
    });
  });

  return (
    <group ref={vehiclesRef}>
      {vehicles.map((v) => (
        <group key={v.id} position={[v.x, v.y, v.z]}>
          {/* Vehicle Body */}
          <mesh>
            <boxGeometry args={[1.2, 0.4, v.length]} />
            <meshStandardMaterial color="#020610" roughness={0.3} metalness={0.9} />
          </mesh>

          {/* Front Cyan Headlight Beam */}
          <mesh position={[0, -0.05, v.direction > 0 ? v.length / 2 : -v.length / 2]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>

          {/* Rear Magenta Tail Streamer */}
          <mesh position={[0, 0, v.direction > 0 ? -v.length / 2 - 1.2 : v.length / 2 + 1.2]}>
            <boxGeometry args={[0.8, 0.15, 2.5]} />
            <meshBasicMaterial
              color="#ff2bd6"
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
