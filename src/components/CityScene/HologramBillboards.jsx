import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BILLBOARD_CONFIGS = [
  { text: 'HACKATHON', sub: '36H SPRINT', pos: [-22, 28, -25], rot: [0, 0.4, 0], color: '#00e5ff', size: [14, 8] },
  { text: 'ROBOTICS', sub: 'COMBAT & MECH', pos: [24, 32, -45], rot: [0, -0.4, 0], color: '#ff2bd6', size: [16, 9] },
  { text: 'DRONE RACING', sub: 'FPV ARENA', pos: [-26, 42, -70], rot: [0, 0.3, 0], color: '#00e5ff', size: [15, 8] },
  { text: 'STARTUP PITCH', sub: 'VENTURE GENESIS', pos: [22, 22, -90], rot: [0, -0.3, 0], color: '#7c3aed', size: [16, 9] },
  { text: 'BUILD • BREAK • INNOVATE', sub: 'PROTOFOS 2026', pos: [0, 52, -120], rot: [0, 0, 0], color: '#00e5ff', size: [28, 10] },
  { text: 'MORE THAN A TECH FEST', sub: 'ENTER THE GRID', pos: [-20, 36, -5], rot: [0, 0.5, 0], color: '#ff2bd6', size: [12, 16] },
];

// Helper to generate dynamic canvas textures with futuristic typography and scanlines
function createBillboardTexture(title, subtitle, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#030814';
  ctx.fillRect(0, 0, 512, 256);

  // Border glow
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 12;
  ctx.strokeRect(10, 10, 492, 236);

  // Inner border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 472, 216);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = colorHex;
  ctx.shadowBlur = 20;
  ctx.fillText(title, 256, 115);

  // Subtitle
  ctx.fillStyle = colorHex;
  ctx.font = 'bold 22px monospace';
  ctx.shadowBlur = 10;
  ctx.fillText(`// ${subtitle} //`, 256, 175);

  // Scanline overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  for (let y = 0; y < 256; y += 6) {
    ctx.fillRect(0, y, 512, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const HologramBillboards = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      // Subtle float and flicker
      child.position.y += Math.sin(t * 1.5 + i) * 0.008;
    });
  });

  return (
    <group ref={groupRef}>
      {BILLBOARD_CONFIGS.map((cfg, i) => {
        const texture = createBillboardTexture(cfg.text, cfg.sub, cfg.color);
        return (
          <group key={i} position={cfg.pos} rotation={cfg.rot}>
            {/* Billboard Plane */}
            <mesh>
              <planeGeometry args={[cfg.size[0], cfg.size[1]]} />
              <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.92}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Glowing Holo Frame */}
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(cfg.size[0] + 0.4, cfg.size[1] + 0.4)]} />
              <lineBasicMaterial color={cfg.color} linewidth={2} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
};
