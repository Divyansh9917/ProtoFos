import React, { useMemo } from 'react';
import * as THREE from 'three';

export const ElevatedSkyway = () => {
  // Create curving elevated highway ribbon crossing between skyscrapers
  const { curvePoints, ribbonGeometry } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-80, 22, -140),
      new THREE.Vector3(-40, 16, -90),
      new THREE.Vector3(10, 12, -40),
      new THREE.Vector3(50, 18, 10),
      new THREE.Vector3(90, 26, 60),
    ]);

    const points = curve.getPoints(50);
    const geom = new THREE.TubeGeometry(curve, 64, 1.4, 8, false);
    return { curvePoints: points, ribbonGeometry: geom };
  }, []);

  return (
    <group>
      {/* Highway Deck */}
      <mesh geometry={ribbonGeometry}>
        <meshStandardMaterial
          color="#060f22"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Neon Traffic Rail Lines (Cyan & Magenta) */}
      <mesh position={[0, 0.8, 0]} geometry={ribbonGeometry} scale={[1, 0.2, 1]}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};
