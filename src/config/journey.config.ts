export interface ScenePhase {
  id: string;
  name: string;
  start: number; // 0.0 - 1.0
  end: number;   // 0.0 - 1.0
  subtitle?: string;
  tagline?: string;
  billboardText?: string;
  heroState: 'CROUCH' | 'STAND' | 'JUMP' | 'FALL' | 'SWING' | 'LAND' | 'RUN' | 'WALK' | 'IDLE';
}

export interface CameraWaypoint {
  progress: number;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  heroPos: [number, number, number];
  heroRot: [number, number, number];
  fov?: number;
}

export const JOURNEY_CONFIG = {
  // Master timeline scenes
  scenes: [
    {
      id: 'scene-01',
      name: '01 THE BEGINNING',
      start: 0.0,
      end: 0.08,
      subtitle: '31 OCT – 1 NOV 2026',
      tagline: 'IDEAS / PEOPLE / TECHNOLOGY / A BRIGHTER TOMORROW',
      billboardText: 'A BOLDER BRIGHTER TOMORROW',
      heroState: 'CROUCH',
    },
    {
      id: 'scene-02',
      name: '02 THE DESCENT',
      start: 0.08,
      end: 0.20,
      subtitle: 'Into a city of possibilities',
      tagline: 'FEEL THE GRAVITY OF WHAT COMES NEXT',
      billboardText: 'ENTER THE GRID',
      heroState: 'STAND', // transitions STAND -> JUMP -> FALL
    },
    {
      id: 'scene-03',
      name: '03 THROUGH THE CITY',
      start: 0.20,
      end: 0.40,
      subtitle: 'Higher ideas, closer people',
      tagline: 'WEAVING THROUGH THE MEGAPOLIS CANYONS',
      billboardText: 'MORE THAN A TECH FEST',
      heroState: 'SWING',
    },
    {
      id: 'scene-04',
      name: '04 THE DISTRICT',
      start: 0.40,
      end: 0.55,
      subtitle: 'Where ideas come to life',
      tagline: 'HACKATHON • ROBOTICS • DRONE RACING • STARTUP PITCH',
      billboardText: 'SAME DREAMS, BIGGER BUILDERS',
      heroState: 'RUN',
    },
    {
      id: 'scene-05',
      name: '05 THE ARRIVAL',
      start: 0.55,
      end: 0.68,
      subtitle: 'A higher ground for brighter minds',
      tagline: 'THE MONOLITHIC SANCTUARY OF INNOVATION',
      billboardText: 'PROTOFOS TOWER // SECTOR ZERO',
      heroState: 'STAND',
    },
    {
      id: 'scene-06',
      name: '06 BEYOND THE DOORS',
      start: 0.68,
      end: 0.78,
      subtitle: 'Ideas move different here',
      tagline: 'GREATER MINDS BUILD BRIGHTER WORLDS',
      billboardText: 'GREATER MINDS BUILD BRIGHTER WORLDS',
      heroState: 'WALK',
    },
    {
      id: 'scene-07',
      name: '07 INTO THE EXPERIENCE',
      start: 0.78,
      end: 0.88,
      subtitle: 'Same universe. A bigger you.',
      tagline: 'WELCOME TO PROTOFOS · IDEAS IN MOTION',
      billboardText: 'WELCOME TO PROTOFOS',
      heroState: 'IDLE',
    },
    {
      id: 'scene-handoff',
      name: 'HANDOFF',
      start: 0.88,
      end: 1.0,
      subtitle: 'TRANSITION TO SITE',
      tagline: 'THE INTERFACE TAKES OVER',
      heroState: 'IDLE',
    },
  ] as ScenePhase[],

  // Web swing anchors on buildings (Scene 03)
  swingAnchors: [
    { anchor: [-22, 38, -10], releaseAt: 0.28 },
    { anchor: [24, 42, -45], releaseAt: 0.38 },
  ],

  // Camera Waypoints along Catmull-Rom track
  waypoints: [
    // 01: Rooftop view
    {
      progress: 0.0,
      camPos: [-1.8, 14.2, 27.5],
      lookAt: [0, 8.5, -35.0],
      heroPos: [-7.2, 11.8, 19.5],
      heroRot: [0.15, 0.45, 0],
      fov: 58,
    },
    {
      progress: 0.08,
      camPos: [-2.2, 13.8, 25.0],
      lookAt: [0, 7.8, -35.0],
      heroPos: [-7.2, 12.0, 19.5],
      heroRot: [0.0, 0.5, 0],
      fov: 58,
    },
    // 02: The Descent
    {
      progress: 0.14,
      camPos: [-1.5, 9.5, 14.0],
      lookAt: [0, 2.0, -40.0],
      heroPos: [-6.0, 7.0, 10.0],
      heroRot: [-0.3, 0.3, 0],
      fov: 62,
    },
    {
      progress: 0.20,
      camPos: [0.0, 5.0, 2.0],
      lookAt: [0, -2.0, -45.0],
      heroPos: [-3.5, 2.5, -5.0],
      heroRot: [-0.2, 0.1, 0.1],
      fov: 64,
    },
    // 03: Through the City (Web Swing)
    {
      progress: 0.28,
      camPos: [5.5, 2.0, -18.0],
      lookAt: [-1.0, -3.0, -60.0],
      heroPos: [-1.0, -1.0, -28.0],
      heroRot: [0.3, -0.4, -0.3],
      fov: 66,
    },
    {
      progress: 0.38,
      camPos: [-4.0, -2.0, -45.0],
      lookAt: [0.0, -5.0, -85.0],
      heroPos: [2.0, -4.5, -55.0],
      heroRot: [-0.2, 0.4, 0.2],
      fov: 65,
    },
    // 04: The District (Street level run/walk)
    {
      progress: 0.46,
      camPos: [-1.0, -8.5, -75.0],
      lookAt: [0.0, -8.0, -115.0],
      heroPos: [0.0, -9.8, -85.0],
      heroRot: [0, 0, 0],
      fov: 60,
    },
    {
      progress: 0.54,
      camPos: [0.5, -8.0, -100.0],
      lookAt: [0.0, -5.0, -145.0],
      heroPos: [0.0, -9.8, -112.0],
      heroRot: [0, 0, 0],
      fov: 60,
    },
    // 05: The Arrival (Tower Reveal Pull-Back & Push)
    {
      progress: 0.62,
      camPos: [0.0, -3.0, -125.0],
      lookAt: [0.0, 15.0, -170.0],
      heroPos: [0.0, -9.8, -132.0],
      heroRot: [0, 0, 0],
      fov: 68,
    },
    // 06: Beyond The Doors (Entrance)
    {
      progress: 0.72,
      camPos: [0.0, -9.0, -148.0],
      lookAt: [0.0, -8.8, -175.0],
      heroPos: [0.0, -9.8, -153.0],
      heroRot: [0, 0, 0],
      fov: 60,
    },
    // 07: Into The Experience (Passing Doors into Atrium)
    {
      progress: 0.82,
      camPos: [0.0, -8.8, -165.0],
      lookAt: [0.0, -8.0, -195.0],
      heroPos: [0.0, -9.8, -170.0],
      heroRot: [0, 0, 0],
      fov: 55,
    },
    // Handoff to Website UI
    {
      progress: 1.0,
      camPos: [0.0, -8.0, -178.0],
      lookAt: [0.0, -8.0, -200.0],
      heroPos: [0.0, -9.8, -182.0],
      heroRot: [0, 0, 0],
      fov: 50,
    },
  ] as CameraWaypoint[],
};
