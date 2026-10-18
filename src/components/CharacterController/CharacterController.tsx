import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { ASSET_MANIFEST } from '../../config/manifest';
import { JOURNEY_CONFIG } from '../../config/journey.config';

interface CharacterControllerProps {
  progress: number;
}

export const CharacterController: React.FC<CharacterControllerProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const webLineRef = useRef<THREE.Line>(null);

  // Spline for hero translation matching waypoints
  const { heroPosSpline, heroRotSpline } = useMemo(() => {
    const waypoints = JOURNEY_CONFIG.waypoints;
    const posPoints = waypoints.map(w => new THREE.Vector3(...w.heroPos));
    const rotPoints = waypoints.map(w => new THREE.Vector3(...w.heroRot));

    const pSpline = new THREE.CatmullRomCurve3(posPoints, false, 'catmullrom', 0.2);
    const rSpline = new THREE.CatmullRomCurve3(rotPoints, false, 'catmullrom', 0.2);
    return { heroPosSpline: pSpline, heroRotSpline: rSpline };
  }, []);

  // Determine current active character state based on scroll progress
  const currentState = useMemo(() => {
    const p = progress;
    if (p < 0.08) return 'CROUCH';
    if (p < 0.12) return 'STAND';
    if (p < 0.16) return 'JUMP';
    if (p < 0.20) return 'FALL';
    if (p < 0.40) return 'SWING';
    if (p < 0.44) return 'LAND';
    if (p < 0.58) return 'RUN';
    if (p < 0.78) return 'WALK';
    return 'IDLE';
  }, [progress]);

  // Procedural articulated limb references for placeholder hero
  const torsoRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const p = Math.min(Math.max(progress, 0), 1);
    const time = state.clock.elapsedTime;

    // 1. Position & Orientation from Spline
    const targetPos = heroPosSpline.getPointAt(p);
    const targetRot = heroRotSpline.getPointAt(p);

    groupRef.current.position.lerp(targetPos, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.x, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.z, 0.1);

    // 2. Animate Limbs based on Current State
    if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current && torsoRef.current) {
      switch (currentState) {
        case 'CROUCH': {
          // Deep athletic crouch on rooftop edge
          const breath = Math.sin(time * 2) * 0.05;
          torsoRef.current.position.y = 0.85 + breath;
          torsoRef.current.rotation.x = 0.45;
          leftArmRef.current.rotation.set(0.6, 0, -0.5);
          rightArmRef.current.rotation.set(0.3, 0, 0.6);
          leftLegRef.current.rotation.set(-0.75, 0, 0.35);
          rightLegRef.current.rotation.set(-0.75, 0, -0.35);
          break;
        }
        case 'STAND': {
          // Hero stands up alertly
          torsoRef.current.position.y = 1.1;
          torsoRef.current.rotation.x = 0.05;
          leftArmRef.current.rotation.set(0.1, 0, -0.15);
          rightArmRef.current.rotation.set(0.1, 0, 0.15);
          leftLegRef.current.rotation.set(-0.05, 0, 0.1);
          rightLegRef.current.rotation.set(-0.05, 0, -0.1);
          break;
        }
        case 'JUMP': {
          // Dynamic launch pose
          torsoRef.current.position.y = 1.2;
          torsoRef.current.rotation.x = -0.3;
          leftArmRef.current.rotation.set(-1.2, 0, -0.4);
          rightArmRef.current.rotation.set(-1.2, 0, 0.4);
          leftLegRef.current.rotation.set(0.6, 0, 0.2);
          rightLegRef.current.rotation.set(0.6, 0, -0.2);
          break;
        }
        case 'FALL': {
          // Diving forward down the canyon
          torsoRef.current.position.y = 1.1;
          torsoRef.current.rotation.x = -0.6;
          leftArmRef.current.rotation.set(1.5, 0, -0.6);
          rightArmRef.current.rotation.set(1.5, 0, 0.6);
          leftLegRef.current.rotation.set(0.4, 0, 0.2);
          rightLegRef.current.rotation.set(0.4, 0, -0.2);
          break;
        }
        case 'SWING': {
          // Acrobatic mid-air swing pose
          const swingPhase = Math.sin(p * 25);
          torsoRef.current.position.y = 1.0;
          torsoRef.current.rotation.x = -0.2 + swingPhase * 0.3;
          // Right arm shoots web up
          rightArmRef.current.rotation.set(-2.4, 0, 0.2);
          leftArmRef.current.rotation.set(0.8, 0, -0.7);
          leftLegRef.current.rotation.set(0.8, 0, 0.3);
          rightLegRef.current.rotation.set(-0.4, 0, -0.2);
          break;
        }
        case 'LAND': {
          // Superhero 3-point landing
          torsoRef.current.position.y = 0.75;
          torsoRef.current.rotation.x = 0.6;
          rightArmRef.current.rotation.set(0.8, 0, 0.2);
          leftArmRef.current.rotation.set(-0.4, 0, -0.8);
          leftLegRef.current.rotation.set(-0.9, 0, 0.4);
          rightLegRef.current.rotation.set(-0.9, 0, -0.4);
          break;
        }
        case 'RUN': {
          // Athletic sprint through district
          const runCycle = time * 12;
          torsoRef.current.position.y = 1.0 + Math.abs(Math.sin(runCycle)) * 0.1;
          torsoRef.current.rotation.x = 0.25;
          leftArmRef.current.rotation.set(Math.sin(runCycle) * 0.8, 0, -0.2);
          rightArmRef.current.rotation.set(-Math.sin(runCycle) * 0.8, 0, 0.2);
          leftLegRef.current.rotation.set(-Math.sin(runCycle) * 0.9, 0, 0.1);
          rightLegRef.current.rotation.set(Math.sin(runCycle) * 0.9, 0, -0.1);
          break;
        }
        case 'WALK': {
          // Confident walk into ProtoFos Tower
          const walkCycle = time * 5;
          torsoRef.current.position.y = 1.05 + Math.abs(Math.sin(walkCycle)) * 0.04;
          torsoRef.current.rotation.x = 0.05;
          leftArmRef.current.rotation.set(Math.sin(walkCycle) * 0.4, 0, -0.1);
          rightArmRef.current.rotation.set(-Math.sin(walkCycle) * 0.4, 0, 0.1);
          leftLegRef.current.rotation.set(-Math.sin(walkCycle) * 0.5, 0, 0.05);
          rightLegRef.current.rotation.set(Math.sin(walkCycle) * 0.5, 0, -0.05);
          break;
        }
        case 'IDLE':
        default: {
          const breath = Math.sin(time * 1.5) * 0.02;
          torsoRef.current.position.y = 1.08 + breath;
          torsoRef.current.rotation.set(0, 0, 0);
          leftArmRef.current.rotation.set(0.05, 0, -0.1);
          rightArmRef.current.rotation.set(0.05, 0, 0.1);
          leftLegRef.current.rotation.set(0, 0, 0.08);
          rightLegRef.current.rotation.set(0, 0, -0.08);
          break;
        }
      }
    }

    // 3. Update Web Swing Line (Active during SWING 0.20 to 0.40)
    if (webLineRef.current) {
      const isSwinging = p >= 0.20 && p <= 0.40;
      webLineRef.current.visible = isSwinging;
      if (isSwinging) {
        const charP = groupRef.current.position;
        // Anchor 1 (0.20 to 0.30) vs Anchor 2 (0.30 to 0.40)
        const anchorPos = p < 0.30
          ? new THREE.Vector3(-22, 38, charP.z - 12)
          : new THREE.Vector3(24, 42, charP.z - 14);

        // Hand position offset
        const handPos = new THREE.Vector3(charP.x + 0.3, charP.y + 1.8, charP.z);
        webLineRef.current.geometry.setFromPoints([handPos, anchorPos]);
      }
    }
  });

  return (
    <group>
      {/* 3D Rigged Humanoid Hero (Placeholder until custom GLB is dropped into manifest) */}
      <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>
        
        {/* Torso & Suit */}
        <mesh ref={torsoRef} position={[0, 0.85, 0]} castShadow>
          <capsuleGeometry args={[0.32, 0.62, 8, 12]} />
          <meshStandardMaterial
            color="#080c14"
            roughness={0.25}
            metalness={0.8}
            emissive="#001830"
            emissiveIntensity={0.3}
          />

          {/* White Spider Emblem on Chest */}
          <mesh position={[0, 0.15, 0.33]}>
            <planeGeometry args={[0.32, 0.32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>

          {/* White Spider Emblem on Back */}
          <mesh position={[0, 0.15, -0.33]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.32, 0.32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>

          {/* Glowing Cyan/Violet Edge Accent Lines */}
          <mesh position={[0, 0, 0.34]}>
            <planeGeometry args={[0.04, 0.55]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        </mesh>

        {/* Head / Mask */}
        <mesh ref={headRef} position={[0, 1.55, 0.25]} castShadow>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial
            color="#0c101c"
            roughness={0.2}
            metalness={0.7}
            emissive="#001224"
          />

          {/* Glowing White-Cyan Eye Lenses */}
          <group position={[0, 0.05, 0.24]}>
            <mesh position={[-0.09, 0, 0]} rotation={[0, -0.25, -0.2]}>
              <planeGeometry args={[0.12, 0.07]} />
              <meshBasicMaterial color="#d4f7ff" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.09, 0, 0]} rotation={[0, 0.25, 0.2]}>
              <planeGeometry args={[0.12, 0.07]} />
              <meshBasicMaterial color="#d4f7ff" side={THREE.DoubleSide} />
            </mesh>
          </group>
        </mesh>

        {/* Articulated Left Arm */}
        <group ref={leftArmRef} position={[-0.42, 1.15, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.6]} />
            <meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Cyan suit piping */}
          <mesh position={[-0.08, -0.3, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.58]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        </group>

        {/* Articulated Right Arm */}
        <group ref={rightArmRef} position={[0.42, 1.15, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.6]} />
            <meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Violet suit piping */}
          <mesh position={[0.08, -0.3, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.58]} />
            <meshBasicMaterial color="#7c3aed" />
          </mesh>
        </group>

        {/* Articulated Left Leg */}
        <group ref={leftLegRef} position={[-0.22, 0.55, 0]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.7]} />
            <meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Articulated Right Leg */}
        <group ref={rightLegRef} position={[0.22, 0.55, 0]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.11, 0.09, 0.7]} />
            <meshStandardMaterial color="#080c14" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Rim Light halo on character */}
        <pointLight position={[0, 1.8, -1.2]} color="#00e5ff" intensity={2.2} distance={6} />
        <pointLight position={[0, -0.2, 0.8]} color="#ff2bd6" intensity={1.5} distance={4} />
      </group>

      {/* Dynamic Glowing Web Line during Swing */}
      <line ref={webLineRef} visible={false}>
        <bufferGeometry />
        <lineBasicMaterial color="#e0f8ff" linewidth={2.5} transparent opacity={0.9} />
      </line>
    </group>
  );
};
