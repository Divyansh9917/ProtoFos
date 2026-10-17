import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProtofosTowerProps {
  progress: number;
}

export const ProtofosTower: React.FC<ProtofosTowerProps> = ({ progress }) => {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const holoRingRef = useRef<THREE.Mesh>(null);
  const centralScreenRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const p = progress;

    // 1. Sliding Entrance Doors (Open when progress is between 0.68 and 0.88)
    if (leftDoorRef.current && rightDoorRef.current) {
      const doorOpenAmount = p >= 0.68 && p <= 0.88
        ? Math.min(Math.max((p - 0.68) / 0.06, 0), 1) * 8.5
        : p > 0.88 ? 8.5 : 0;

      leftDoorRef.current.position.x = THREE.MathUtils.lerp(leftDoorRef.current.position.x, -5.5 - doorOpenAmount, 0.1);
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(rightDoorRef.current.position.x, 5.5 + doorOpenAmount, 0.1);
    }

    // 2. Holographic Ring Animation in Atrium
    if (holoRingRef.current) {
      holoRingRef.current.rotation.z = time * 0.4;
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      holoRingRef.current.scale.set(pulse, pulse, 1);
    }

    // 3. Central Holographic Screen Expansion at Handoff (0.84 to 1.0)
    if (centralScreenRef.current) {
      const screenExpansion = p >= 0.84
        ? 1 + ((p - 0.84) / 0.16) * 1.5
        : 1;
      centralScreenRef.current.scale.set(screenExpansion, screenExpansion, 1);
    }
  });

  return (
    <group position={[0, 0, -170]}>
      
      {/* ======================================================== */}
      {/* EXTERIOR: MONOLITHIC PROTOFOS TOWER                     */}
      {/* ======================================================== */}
      <mesh position={[0, 45, 0]} castShadow receiveShadow>
        <boxGeometry args={[46, 150, 46]} />
        <meshStandardMaterial
          color="#040916"
          roughness={0.2}
          metalness={0.9}
          emissive="#001428"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Tapered Crown Apex */}
      <mesh position={[0, 130, 0]}>
        <coneGeometry args={[26, 32, 4]} />
        <meshStandardMaterial color="#030713" metalness={0.9} />
      </mesh>

      {/* Large Circular ProtoFos Emblem near the Top (Panel 05) */}
      <group position={[0, 95, 23.3]}>
        <mesh>
          <ringGeometry args={[9, 10.5, 32]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <circleGeometry args={[4.2, 3]} />
          <meshBasicMaterial color="#ff2bd6" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Tall Vertical Neon Signage (Cyan & Violet) */}
      {[-16, -6, 6, 16].map((xOff, i) => (
        <mesh key={i} position={[xOff, 40, 23.2]}>
          <planeGeometry args={[1.6, 130]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00e5ff' : '#7c3aed'}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* ======================================================== */}
      {/* ENTRANCE PORTAL & DOORS (Scene 06)                      */}
      {/* In-World Text: "GREATER MINDS BUILD BRIGHTER WORLDS"    */}
      {/* ======================================================== */}
      <group position={[0, -9.8, 23.1]}>
        {/* Entrance Portal Arch Frame */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[24, 1.2, 2]} />
          <meshStandardMaterial color="#0a1835" metalness={0.9} />
        </mesh>
        <mesh position={[-12, 0, 0]}>
          <boxGeometry args={[1.5, 10, 2]} />
          <meshStandardMaterial color="#0a1835" metalness={0.9} />
        </mesh>
        <mesh position={[12, 0, 0]}>
          <boxGeometry args={[1.5, 10, 2]} />
          <meshStandardMaterial color="#0a1835" metalness={0.9} />
        </mesh>

        {/* Sliding Left Glass Door */}
        <mesh ref={leftDoorRef} position={[-5.5, 0, 0.2]}>
          <planeGeometry args={[11, 9.5]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            roughness={0.1}
            transmission={0.8}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Sliding Right Glass Door */}
        <mesh ref={rightDoorRef} position={[5.5, 0, 0.2]}>
          <planeGeometry args={[11, 9.5]} />
          <meshPhysicalMaterial
            color="#00e5ff"
            roughness={0.1}
            transmission={0.8}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* INTERIOR ATRIUM HALL (Scene 07)                         */}
      {/* Passing inside the building (Z from 20 to -30)          */}
      {/* ======================================================== */}
      <group position={[0, -9.8, 0]}>
        
        {/* Interior Walls & Ceiling */}
        <mesh position={[0, 8, -12]}>
          <boxGeometry args={[36, 18, 38]} />
          <meshStandardMaterial
            color="#030816"
            roughness={0.2}
            metalness={0.8}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Reflective Polished Floor */}
        <mesh position={[0, -0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[34, 36]} />
          <meshStandardMaterial
            color="#040b1e"
            roughness={0.08}
            metalness={0.95}
          />
        </mesh>

        {/* Glowing Holographic Ring above the Center */}
        <mesh ref={holoRingRef} position={[0, 11, -12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[8.5, 0.2, 16, 48]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        {/* Interior Cyan & Violet Accent Strip Lights */}
        {[-14, 14].map((x, i) => (
          <mesh key={i} position={[x, 5, -12]}>
            <boxGeometry args={[0.3, 10, 32]} />
            <meshBasicMaterial color={i === 0 ? '#00e5ff' : '#7c3aed'} />
          </mesh>
        ))}

        {/* Central Holographic Screen (Scene 07 -> Handoff) */}
        {/* Screen Text: "WELCOME TO PROTOFOS · IDEAS IN MOTION" */}
        <group ref={centralScreenRef} position={[0, 4, -22]}>
          <mesh>
            <planeGeometry args={[20, 10]} />
            <meshBasicMaterial
              color="#00e5ff"
              transparent
              opacity={0.88}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Glowing Holo Frame */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(20.4, 10.4)]} />
            <lineBasicMaterial color="#ffffff" linewidth={2} />
          </lineSegments>
        </group>

        {/* Crowd Silhouettes in Atrium */}
        {[-8, -5, -2, 3, 6, 9].map((cx, i) => (
          <mesh key={i} position={[cx, 1.2, -8 - (i % 3) * 4]}>
            <capsuleGeometry args={[0.3, 1.1, 4, 8]} />
            <meshBasicMaterial color="#02040a" />
          </mesh>
        ))}

      </group>

    </group>
  );
};
