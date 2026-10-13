import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BirdsLayer, AircraftBeacon } from './BirdsLayer';
import { AtmosphereCanvas } from './AtmosphereCanvas';

import { RotateCcw } from 'lucide-react';

import menuScene from '../assets/scenes/menu.jpg';
import aboutScene from '../assets/scenes/about.jpg';
import skillsScene from '../assets/scenes/skills.jpg';
import achievementsScene from '../assets/scenes/achievements.jpg';
import academyScene from '../assets/scenes/academy.jpg';
import contactScene from '../assets/scenes/contact.jpg';
import exitScene from '../assets/scenes/exit.jpg';

export function SceneViewport({ activeScene = 'menu', children }) {
  // Mobile orientation detection
  const [isPortrait, setIsPortrait] = useState(false);
  const [sideDisplay, setSideDisplay] = useState(true);

  useEffect(() => {
    const handleOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 1024;
      setIsPortrait(portrait);
    };
    handleOrientation();
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  // Mouse position values for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to emulate fluid game camera mechanics
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // 3D rotations & subtle translations
  const rotateX = useTransform(springY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6.5, 6.5]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
  };

  const isSideways = isPortrait && sideDisplay;

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      if (isSideways) {
        mouseX.set((touch.clientY / innerHeight) - 0.5);
        mouseY.set(((innerWidth - touch.clientX) / innerWidth) - 0.5);
      } else {
        mouseX.set((touch.clientX / innerWidth) - 0.5);
        mouseY.set((touch.clientY / innerHeight) - 0.5);
      }
    }
  };

  // Map active screen to scene image and atmospheric FX
  const scenes = {
    menu: {
      image: menuScene || '/assets/scenes/menu.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: true,
      location: 'VICE BEACH'
    },
    about: {
      image: aboutScene || '/assets/scenes/about.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: false,
      location: 'OCEAN DRIVE'
    },
    skills: {
      image: skillsScene || '/assets/scenes/skills.jpg',
      mode: 'steam',
      hasBirds: false,
      hasAircraft: false,
      location: 'PORT KELBRAY'
    },
    achievements: {
      image: achievementsScene || '/assets/scenes/achievements.jpg',
      mode: 'neon',
      hasBirds: false,
      hasAircraft: false,
      location: 'NEON STRIP'
    },
    academy: {
      image: academyScene || '/assets/scenes/academy.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: false,
      location: 'KELBRAY HEIGHTS'
    },
    contact: {
      image: contactScene || '/assets/scenes/contact.jpg',
      mode: 'neon',
      hasBirds: false,
      hasAircraft: false,
      location: 'WATERFRONT LOUNGE'
    },
    exit: {
      image: exitScene || '/assets/scenes/exit.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: true,
      location: 'GRASSRIVERS CAUSEWAY'
    }
  };

  const current = scenes[activeScene] || scenes.menu;

  return (
    <div 
      className={isSideways ? "fixed inset-0 w-screen h-screen overflow-hidden bg-black select-none z-0" : "relative w-screen h-screen overflow-hidden bg-black select-none"}
    >
      {/* Mobile Orientation Toggle */}
      {isPortrait && (
        <button 
          onClick={() => setSideDisplay(prev => !prev)}
          className="fixed top-2.5 left-2.5 z-50 pointer-events-auto bg-black/85 hover:bg-[#ff1493] text-cyan-300 hover:text-white border border-cyan-400/50 text-[9px] font-mono font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-colors"
          title="Toggle Horizontal Side Display"
        >
          <RotateCcw size={10} />
          <span>{sideDisplay ? 'SIDEWAYS [ON]' : 'ENABLE SIDEWAYS'}</span>
        </button>
      )}

      <div 
        className="relative overflow-hidden bg-black select-none transition-all duration-300"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ 
          perspective: 1200,
          ...(isSideways ? {
            position: 'fixed',
            top: 0,
            left: '100vw',
            width: '100dvh',
            height: '100dvw',
            transformOrigin: 'top left',
            transform: 'rotate(90deg)',
            overflow: 'hidden'
          } : {
            width: '100vw',
            height: '100vh',
          })
        }}
      >
      <style>{`
        /* Slow continuous cinematic breathing camera loop */
        @keyframes breathingCamera {
          0% {
            transform: scale(1.08) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.12) translate3d(-1%, -0.8%, 0);
          }
          100% {
            transform: scale(1.08) translate3d(0, 0, 0);
          }
        }

        .breathing-bg {
          animation: breathingCamera 16s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        /* Scanline CRT overlay */
        .scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.03),
            rgba(0, 255, 0, 0.01),
            rgba(0, 0, 255, 0.03)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}</style>

      {/* 3D Parallax Container */}
      <motion.div
        className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)]"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Living Scene Image with Breathing Animation */}
        <motion.div 
          key={activeScene}
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <img
            src={current.image}
            alt="GTA Living Scene"
            className="w-full h-full object-cover breathing-bg"
          />

          {/* Vignette & Cinematic Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
        </motion.div>

        {/* Birds flying across top sky */}
        {current.hasBirds && <BirdsLayer />}

        {/* Distant aircraft beacon */}
        {current.hasAircraft && <AircraftBeacon />}

        {/* Dynamic atmospheric canvas (particles / embers / steam / rain) */}
        <AtmosphereCanvas mode={current.mode} />
      </motion.div>

      {/* Fixed UI Layer (HUD, Menu, Content) */}
      <div className="relative z-30 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  </div>
  );
}
