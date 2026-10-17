import React, { useMemo } from 'react';
import * as THREE from 'three';

export const SkylineBackdrop = () => {
  const skylineTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Cyberpunk storm night sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    skyGrad.addColorStop(0, '#02050f');
    skyGrad.addColorStop(0.5, '#07152d');
    skyGrad.addColorStop(0.8, '#120d2b');
    skyGrad.addColorStop(1, '#030711');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Distant city silhouette with illuminated glowing windows
    let x = 0;
    while (x < 2048) {
      const w = 15 + Math.random() * 35;
      const h = 180 + Math.random() * 450;
      const y = 1024 - h;

      // Dark building tower
      ctx.fillStyle = '#030713';
      ctx.fillRect(x, y, w, h);

      // Window lights
      const winCols = ['#00e5ff', '#ff2bd6', '#168cff', '#7c3aed', '#ffe600', '#ffffff'];
      for (let wy = y + 20; wy < 1000; wy += 14) {
        if (Math.random() > 0.4) {
          ctx.fillStyle = winCols[Math.floor(Math.random() * winCols.length)];
          ctx.globalAlpha = 0.4 + Math.random() * 0.5;
          ctx.fillRect(x + 3, wy, w - 6, 4);
        }
      }
      ctx.globalAlpha = 1.0;

      // Antenna beacon at peak
      if (h > 350) {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w / 2, y - 40);
        ctx.stroke();

        ctx.fillStyle = Math.random() > 0.5 ? '#ff2b56' : '#00e5ff';
        ctx.beginPath();
        ctx.arc(x + w / 2, y - 42, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      x += w + 2;
    }

    // Atmospheric neon ground fog glow
    const fogGrad = ctx.createLinearGradient(0, 800, 0, 1024);
    fogGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
    fogGrad.addColorStop(0.7, 'rgba(124, 58, 237, 0.25)');
    fogGrad.addColorStop(1, 'rgba(0, 229, 255, 0.35)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, 800, 2048, 224);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    return tex;
  }, []);

  return (
    <mesh position={[0, 40, -180]}>
      <cylinderGeometry args={[260, 260, 200, 48, 1, true]} />
      <meshBasicMaterial
        map={skylineTexture}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};
