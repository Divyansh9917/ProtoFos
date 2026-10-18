import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext({
  scrollProgress: 0,
  sceneIndex: 0,
  activeSection: 'home',
  scrollToSection: () => {},
});

export const SCENES = [
  { id: 'rooftop', title: 'ROOFTOP VIEW', range: [0, 0.12] },
  { id: 'descent', title: 'CITY DESCENT', range: [0.12, 0.25] },
  { id: 'spiderman', title: 'SPIDER-MAN SWING', range: [0.25, 0.38] },
  { id: 'tech-district', title: 'TECH DISTRICT', range: [0.38, 0.50] },
  { id: 'protofos-tower', title: 'PROTOFOS TOWER', range: [0.50, 0.62] },
  { id: 'enter-building', title: 'ENTER THE BUILDING', range: [0.62, 0.72] },
  { id: 'transition-ui', title: 'CYBER INTERFACE', range: [0.72, 0.78] },
  { id: 'about', title: 'ABOUT PROTOFOS', range: [0.78, 0.85] },
  { id: 'events', title: 'EVENTS', range: [0.85, 0.92] },
  { id: 'hackathon', title: 'HACKATHON', range: [0.92, 0.96] },
  { id: 'clubs', title: 'TECH NETWORK', range: [0.96, 0.98] },
  { id: 'final-cta', title: 'BUILD THE NEXT', range: [0.98, 1.0] },
];

export const ScrollProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
          setScrollProgress(progress);

          // Find current scene index
          const foundIndex = SCENES.findIndex(
            (scene) => progress >= scene.range[0] && progress <= scene.range[1]
          );
          if (foundIndex !== -1) {
            setSceneIndex(foundIndex);
          }

          // Active section mapped for navbar
          if (progress < 0.72) setActiveSection('home');
          else if (progress < 0.85) setActiveSection('about');
          else if (progress < 0.92) setActiveSection('events');
          else if (progress < 0.96) setActiveSection('hackathon');
          else if (progress < 0.98) setActiveSection('clubs');
          else setActiveSection('final-cta');

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    let targetRatio = 0;

    switch (sectionId) {
      case 'home': targetRatio = 0.0; break;
      case 'about': targetRatio = 0.78; break;
      case 'events': targetRatio = 0.85; break;
      case 'hackathon': targetRatio = 0.92; break;
      case 'clubs': targetRatio = 0.96; break;
      case 'sponsors': targetRatio = 0.97; break;
      case 'final-cta': targetRatio = 0.99; break;
      default: targetRatio = 0;
    }

    window.scrollTo({
      top: targetRatio * totalHeight,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollProgress, sceneIndex, activeSection, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollProgress = () => useContext(ScrollContext);
