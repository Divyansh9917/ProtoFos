import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';

export const SpiderManMesh = () => {
  const characterRef = useRef();
  const webLineRef = useRef();
  const { scrollProgress } = useScrollProgress();

  useFrame((state) => {
    if (!characterRef.current) return;

    // SCROLL-DRIVEN CHARACTER KINEMATICS:
    // 0.0 - 0.15: Perched on rooftop edge at [-7, 12, 19]
    // 0.15 - 0.42: Leaping & swinging through the city canyon towards [0, 5, -50]
    // 0.42 - 0.68: Gliding towards ProtoFos Tower entrance at [0, -10, -145]
    // 0.68 - 0.85: Inside building atrium (stealth secondary)
    // 0.85 - 1.00: High rooftop perch for final CTA (Scene 12)

    const p = scrollProgress;
    let targetPos = new THREE.Vector3(-7, 12, 19);
    let targetRot = new THREE.Euler(0.2, 0.4, 0);
    let showWeb = false;

    if (p < 0.15) {
      // Scene 01: Rooftop Crouch
      const breath = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      targetPos.set(-7.5, 11.8 + breath, 19);
      targetRot.set(0.15, 0.45, 0);
      showWeb = false;
    } else if (p < 0.42) {
      // Scene 02 & 03: City Descent & Web Swing Arc
      const swingT = (p - 0.15) / 0.27; // 0 to 1
      const swingX = Math.sin(swingT * Math.PI) * 14 - 4;
      const swingY = 12 - swingT * 18 + Math.sin(swingT * Math.PI) * 7;
      const swingZ = 19 - swingT * 75;

      targetPos.set(swingX, swingY, swingZ);
      targetRot.set(-0.35, swingT * 0.7, Math.sin(swingT * Math.PI) * 0.5);
      showWeb = true;
    } else if (p < 0.70) {
      // Scene 04, 05, 06: Approaching & Entering Tower
      const glideT = (p - 0.42) / 0.28;
      targetPos.set(Math.sin(glideT * 4) * 2, -6 - glideT * 12, -55 - glideT * 95);
      targetRot.set(0.2, 0, 0);
      showWeb = false;
    } else {
      // Scene 12: Return to panoramic rooftop perch for Final CTA
      const ctaT = (p - 0.70) / 0.30;
      targetPos.set(5.5, 15.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1, 14);
      targetRot.set(0.1, -0.6, 0);
      showWeb = false;
    }

    // Smooth lerp
    characterRef.current.position.lerp(targetPos, 0.08);
    characterRef.current.rotation.x = THREE.MathUtils.lerp(characterRef.current.rotation.x, targetRot.x, 0.08);
    characterRef.current.rotation.y = THREE.MathUtils.lerp(characterRef.current.rotation.y, targetRot.y, 0.08);
    characterRef.current.rotation.z = THREE.MathUtils.lerp(characterRef.current.rotation.z, targetRot.z, 0.08);

    // Update Web Line geometry if swinging
    if (webLineRef.current) {
      webLineRef.current.visible = showWeb;
      if (showWeb) {
        const charP = characterRef.current.position;
        const anchor = new THREE.Vector3(-22, 38, charP.z - 15);
        const points = [charP, anchor];
        webLineRef.current.geometry.setFromPoints(points);
      }
    }
  });

  return (
    <group>
      {/* Spider-Man Cyber Hero Model */}
      <group ref={characterRef} position={[-7.5, 11.8, 19]} scale={[1.5, 1.5, 1.5]}>
        
        {/* Athletic Torso in Crouch */}
        <mesh position={[0, 0.9, 0]} rotation={[0.4, 0, 0]} castShadow>
          <capsuleGeometry args={[0.34, 0.65, 8, 12]} />
          <meshStandardMaterial
            color="#a80e2b"
            roughness={0.25}
            metalness={0.7}
            emissive="#45000e"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Cyber Suit Chest Spider Insignia */}
        <mesh position={[0, 1.05, 0.38]} rotation={[0.4, 0, 0]}>
          <planeGeometry args={[0.38, 0.38]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} />
        </mesh>

        {/* Head / Mask */}
        <mesh position={[0, 1.55, 0.28]} rotation={[0.1, 0, 0]} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial
            color="#b80f30"
            roughness={0.2}
            metalness={0.6}
            emissive="#38000a"
          />
        </mesh>

        {/* Iconic White Mask Lenses with Black Cyber Border */}
        <group position={[0, 1.6, 0.52]}>
          {/* Left Eye */}
          <mesh position={[-0.1, 0, 0]} rotation={[0, -0.22, -0.2]}>
            <planeGeometry args={[0.13, 0.08]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.1, 0, -0.01]} rotation={[0, -0.22, -0.2]}>
            <planeGeometry args={[0.15, 0.1]} />
            <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
          </mesh>

          {/* Right Eye */}
          <mesh position={[0.1, 0, 0]} rotation={[0, 0.22, 0.2]}>
            <planeGeometry args={[0.13, 0.08]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.1, 0, -0.01]} rotation={[0, 0.22, 0.2]}>
            <planeGeometry args={[0.15, 0.1]} />
            <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Left Arm / Hand Planted on Rooftop Ledge */}
        <group position={[-0.45, 0.9, 0.2]}>
          <mesh rotation={[0.5, 0, -0.5]}>
            <cylinderGeometry args={[0.09, 0.08, 0.65]} />
            <meshStandardMaterial color="#0a1832" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[-0.2, -0.4, 0.15]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#b80f30" metalness={0.6} />
          </mesh>
        </group>

        {/* Right Arm / Raised Dynamic Balance Pose */}
        <group position={[0.45, 0.9, 0.2]}>
          <mesh rotation={[0.3, 0, 0.6]}>
            <cylinderGeometry args={[0.09, 0.08, 0.65]} />
            <meshStandardMaterial color="#0a1832" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0.25, -0.35, 0.1]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#b80f30" metalness={0.6} />
          </mesh>
        </group>

        {/* Crouch Legs / Deep Flex Pose */}
        <group position={[-0.26, 0.45, -0.1]}>
          <mesh rotation={[-0.7, 0, 0.35]}>
            <cylinderGeometry args={[0.13, 0.1, 0.75]} />
            <meshStandardMaterial color="#0a1832" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
        <group position={[0.26, 0.45, -0.1]}>
          <mesh rotation={[-0.7, 0, -0.35]}>
            <cylinderGeometry args={[0.13, 0.1, 0.75]} />
            <meshStandardMaterial color="#0a1832" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Cyan Rim Light highlighting the hero contour */}
        <pointLight position={[0, 1.8, -1.2]} color="#00e5ff" intensity={2.5} distance={8} />
        {/* Magenta Under-Glow from city */}
        <pointLight position={[0, -0.5, 1]} color="#ff2bd6" intensity={1.5} distance={5} />
      </group>

      {/* Glowing Web Line (Active during swing) */}
      <line ref={webLineRef} visible={false}>
        <bufferGeometry />
        <lineBasicMaterial color="#00e5ff" linewidth={3} transparent opacity={0.9} />
      </line>
    </group>
  );
};
