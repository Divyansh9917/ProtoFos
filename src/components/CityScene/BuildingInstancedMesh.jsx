import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const BuildingInstancedMesh = () => {
  const meshRef = useRef();
  const beaconRef = useRef();

  // Generate 85 procedural skyscrapers
  const count = 85;
  const { matrices, colors, beaconData } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const tempMatrices = [];
    const tempColors = new Float32Array(count * 3);
    const beacons = [];

    // Seeded random positions for city canyon layout
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const neonPalette = [
      new THREE.Color('#00E5FF'), // Cyan
      new THREE.Color('#168CFF'), // Electric Blue
      new THREE.Color('#7C3AED'), // Violet
      new THREE.Color('#FF2BD6'), // Magenta
      new THREE.Color('#0a192f'), // Deep navy dark
    ];

    for (let i = 0; i < count; i++) {
      // Create a corridor/canyon along Z axis: leave Z corridor open between -15 and +15 on X
      let x = (random() - 0.5) * 160;
      if (Math.abs(x) < 18) {
        x += (x >= 0 ? 18 : -18);
      }

      const z = (random() - 0.5) * 220 - 40;
      const height = 30 + random() * 90;
      const width = 8 + random() * 14;
      const depth = 8 + random() * 14;
      const y = height / 2 - 20;

      dummy.position.set(x, y, z);
      dummy.scale.set(width, height, depth);
      dummy.rotation.y = random() * 0.1;
      dummy.updateMatrix();

      tempMatrices.push(dummy.matrix.clone());

      // Color variation for window bands
      const col = neonPalette[Math.floor(random() * neonPalette.length)];
      tempColors[i * 3 + 0] = col.r;
      tempColors[i * 3 + 1] = col.g;
      tempColors[i * 3 + 2] = col.b;

      // Rooftop beacon on tallest buildings
      if (height > 55) {
        beacons.push({
          pos: [x, height - 20 + 2, z],
          speed: 1.5 + random() * 3,
          color: random() > 0.4 ? '#ff2b56' : '#00e5ff',
        });
      }
    }

    return { matrices: tempMatrices, colors: tempColors, beaconData: beacons };
  }, []);

  // Update instance matrices once mounted
  React.useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.setMatrixAt(i, matrices[i]);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  // Subtle beacon pulsation
  useFrame((state) => {
    if (beaconRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      beaconRef.current.scale.set(s, s, s);
    }
  });

  // Procedural glowing window grid texture
  const windowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#050c18';
    ctx.fillRect(0, 0, 128, 256);

    const cols = ['#00e5ff', '#ff2bd6', '#168cff', '#ffe600'];
    for (let y = 8; y < 250; y += 12) {
      for (let x = 6; x < 122; x += 14) {
        if (Math.random() > 0.45) {
          ctx.fillStyle = cols[Math.floor(Math.random() * cols.length)];
          ctx.fillRect(x, y, 8, 5);
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 6);
    return tex;
  }, []);

  return (
    <group>
      {/* Instanced Buildings */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#060e1f"
          roughness={0.25}
          metalness={0.8}
          emissive="#001833"
          emissiveIntensity={0.6}
          emissiveMap={windowTexture}
        />
      </instancedMesh>

      {/* Rooftop Beacons */}
      <group ref={beaconRef}>
        {beaconData.slice(0, 30).map((b, i) => (
          <mesh key={i} position={b.pos}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshBasicMaterial color={b.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
