import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CameraController } from '../CameraController/CameraController';
import { CharacterController } from '../CharacterController/CharacterController';
import { ProtofosTower } from '../ProtofosTower/ProtofosTower';
import { BuildingInstancedMesh } from './BuildingInstancedMesh';
import { RainEffect } from './RainEffect';
import { VehiclesTraffic } from './VehiclesTraffic';
import { HologramBillboards } from './HologramBillboards';
import { SkylineBackdrop } from './SkylineBackdrop';
import { ElevatedSkyway } from './ElevatedSkyway';

interface CyberpunkCityCanvasProps {
  progress: number;
  active: boolean;
}

// Foreground Rooftop Structure where user & Hero start
function ForegroundRooftop() {
  return (
    <group position={[-6, 9.5, 20]}>
      {/* Wet metallic roof platform */}
      <mesh receiveShadow>
        <boxGeometry args={[14, 2, 14]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Rooftop AC unit / industrial vents */}
      <mesh position={[3, 1.8, -2]}>
        <boxGeometry args={[3, 1.6, 2.5]} />
        <meshStandardMaterial color="#081020" metalness={0.8} />
      </mesh>
      {/* Rooftop radio antenna with blinking red beacon */}
      <mesh position={[-4, 3.5, -3]}>
        <cylinderGeometry args={[0.06, 0.1, 5]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>
      <mesh position={[-4, 6.1, -3]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#ff2b56" />
      </mesh>
      {/* Wet puddle reflective layer */}
      <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#001830"
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export const CyberpunkCityCanvas: React.FC<CyberpunkCityCanvasProps> = ({ progress, active }) => {
  // Fade out canvas opacity during handoff (0.88 to 0.98)
  const canvasOpacity = progress >= 0.88
    ? Math.max(0, 1 - (progress - 0.88) / 0.10)
    : 1;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: canvasOpacity }}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{ position: [-1.8, 14.2, 27.5], fov: 58, near: 0.1, far: 500 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color('#030711'));
          scene.fog = new THREE.FogExp2('#030711', 0.012);
        }}
      >
        {/* Dedicated Spline Camera Controller */}
        <CameraController progress={progress} active={active} />

        {/* Ambient Dark City Glow */}
        <ambientLight color="#051024" intensity={0.85} />

        {/* Cyan Directional Key Light from Sky */}
        <directionalLight
          position={[-30, 60, 40]}
          color="#00e5ff"
          intensity={1.8}
          castShadow
        />

        {/* Magenta Street / Canyon Up-Bounce Light */}
        <directionalLight
          position={[40, -10, -40]}
          color="#ff2bd6"
          intensity={1.5}
        />

        {/* Violet Horizon Accent */}
        <pointLight position={[0, 40, -120]} color="#7c3aed" intensity={3} distance={180} />

        {/* 3D World Geometry */}
        <SkylineBackdrop />
        <BuildingInstancedMesh />
        <ElevatedSkyway />
        <VehiclesTraffic />
        <HologramBillboards />
        
        {/* ProtoFos Tower with Opening Glass Doors & Atrium */}
        <ProtofosTower progress={progress} />

        {/* Animated Rigged Hero Character */}
        <CharacterController progress={progress} />

        {/* Foreground Rooftop */}
        <ForegroundRooftop />

        {/* Rain Particles */}
        <RainEffect count={3600} />

        {/* Postprocessing Bloom Pass */}
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
