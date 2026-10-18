import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { JOURNEY_CONFIG } from '../../config/journey.config';

interface CameraControllerProps {
  progress: number;
  active: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({ progress, active }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());

  // Build CatmullRom splines from waypoints
  const { posSpline, lookSpline, fovSpline } = useMemo(() => {
    const waypoints = JOURNEY_CONFIG.waypoints;
    const posPoints = waypoints.map(w => new THREE.Vector3(...w.camPos));
    const lookPoints = waypoints.map(w => new THREE.Vector3(...w.lookAt));

    const pSpline = new THREE.CatmullRomCurve3(posPoints, false, 'catmullrom', 0.2);
    const lSpline = new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.2);

    return { posSpline: pSpline, lookSpline: lSpline, fovSpline: waypoints };
  }, []);

  useFrame((state, delta) => {
    if (!active) return;

    // Clamp progress between 0 and 1
    const p = Math.min(Math.max(progress, 0), 1);

    // Sample position & target from smooth CatmullRom spline
    const targetPos = posSpline.getPointAt(p);
    const targetLookAt = lookSpline.getPointAt(p);

    // Add subtle cinematic handheld breathing drift
    const time = state.clock.elapsedTime;
    const breathX = Math.sin(time * 0.8) * 0.08 * (1 - p * 0.5);
    const breathY = Math.cos(time * 1.1) * 0.06 * (1 - p * 0.5);
    targetPos.x += breathX;
    targetPos.y += breathY;

    // Dynamic FOV interpolation based on scene
    let targetFov = 58;
    if (p < 0.08) targetFov = 58;
    else if (p < 0.20) targetFov = 62;
    else if (p < 0.40) targetFov = 66; // Wide swing shot
    else if (p < 0.55) targetFov = 60; // Street level
    else if (p < 0.68) targetFov = 68; // Tower reveal wide angle
    else if (p < 0.78) targetFov = 60; // Entering doors
    else targetFov = 54;              // Atrium

    // Smooth lerp camera position, target, and FOV
    const lerpSpeed = 0.08;
    camera.position.lerp(targetPos, lerpSpeed);
    currentLookAt.current.lerp(targetLookAt, lerpSpeed);
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
