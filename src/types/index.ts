export interface EventItem {
  id: string;
  number: string; // "01" through "09"
  title: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  prize: string;
  teamSize: string;
  venue: string;
  time: string;
  color: string;
  glow: string;
  image: string; // e.g. "/assets/events/event-01.webp"
  tracks: string[];
  icon: string;
  intelBrief?: string;
}

export type WalkPose = 'A' | 'B' | 'C';

export interface JourneyScrollState {
  progress: number; // 0.0 to 1.0
  activeCardIndex: number; // 0 to 8, or -1 if none
  isAtEnd: boolean;
  velocity: number;
  reducedMotion: boolean;
}
