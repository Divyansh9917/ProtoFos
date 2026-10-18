export interface AssetConfig {
  path: string;
  scale: [number, number, number];
  rotation: [number, number, number];
  positionOffset: [number, number, number];
  clipMapping?: Record<string, string>;
  isPlaceholder: boolean;
}

export interface AssetManifest {
  superhero: AssetConfig;
  tower: AssetConfig;
  buildings: Record<string, AssetConfig>;
  vehicles: Record<string, AssetConfig>;
}

export const ASSET_MANIFEST: AssetManifest = {
  superhero: {
    // Drop your custom spider-hero rigged GLB here: public/models/superhero/spider_hero.glb
    path: '/models/superhero/hero.glb',
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    positionOffset: [0, 0, 0],
    clipMapping: {
      IDLE: 'idle',
      CROUCH: 'crouch',
      STAND: 'stand',
      JUMP: 'jump',
      FALL: 'fall',
      SWING: 'swing',
      LAND: 'land',
      RUN: 'run',
      WALK: 'walk',
    },
    // When true, uses the procedural rigged cinematic humanoid matching the storyboard
    isPlaceholder: true,
  },
  tower: {
    path: '/models/tower/protofos_tower.glb',
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    positionOffset: [0, 0, -170],
    isPlaceholder: true,
  },
  buildings: {
    skyscraperA: {
      path: '/models/buildings/skyscraper_a.glb',
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      positionOffset: [0, 0, 0],
      isPlaceholder: true,
    },
  },
  vehicles: {
    spinnerA: {
      path: '/models/vehicles/spinner_a.glb',
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      positionOffset: [0, 0, 0],
      isPlaceholder: true,
    },
  },
};
