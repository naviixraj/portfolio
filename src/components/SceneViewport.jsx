import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BirdsLayer, AircraftBeacon } from './BirdsLayer';
import { AtmosphereCanvas } from './AtmosphereCanvas';

export function SceneViewport({ activeScene = 'menu', children }) {
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

  // Map active screen to scene image and atmospheric FX
  const scenes = {
    menu: {
      image: '/src/assets/scenes/menu.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: true,
      location: 'VICE BEACH'
    },
    about: {
      image: '/src/assets/scenes/about.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: false,
      location: 'OCEAN DRIVE'
    },
    skills: {
      image: '/src/assets/scenes/skills.jpg',
      mode: 'steam',
      hasBirds: false,
      hasAircraft: false,
      location: 'PORT KELBRAY'
    },
    achievements: {
      image: '/src/assets/scenes/achievements.jpg',
      mode: 'neon',
      hasBirds: false,
      hasAircraft: false,
      location: 'NEON STRIP'
    },
    academy: {
      image: '/src/assets/scenes/academy.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: false,
      location: 'KELBRAY HEIGHTS'
    },
    contact: {
      image: '/src/assets/scenes/contact.jpg',
      mode: 'neon',
      hasBirds: false,
      hasAircraft: false,
      location: 'WATERFRONT LOUNGE'
    },
    exit: {
      image: '/src/assets/scenes/exit.jpg',
      mode: 'sunset',
      hasBirds: true,
      hasAircraft: true,
      location: 'GRASSRIVERS CAUSEWAY'
    }
  };

  const current = scenes[activeScene] || scenes.menu;

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }}
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
  );
}
