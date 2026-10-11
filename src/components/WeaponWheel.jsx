import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function WeaponWheel({ isOpen, onClose, onSelectWeapon }) {
  if (!isOpen) return null;

  const [hoveredId, setHoveredId] = useState(null);

  // Exact 8 tools matching the Claude Code / Sanjai Builds loadout photo:
  // ASTRO, GSAP, LENIS, CANVAS, VEO, BLENDER, PYTHON, FIGMA
  // with coordinates spread far enough so they NEVER bunch together or overlap the center!
  const slots = [
    { 
      id: 1, 
      name: 'ASTRO', 
      cat: 'Framework', 
      desc: 'High-performance islands architecture & web performance',
      left: '50%',
      top: '12%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 2, 
      name: 'GSAP', 
      cat: 'Motion', 
      desc: 'Advanced timeline animations, ScrollTrigger & physics',
      left: '68%',
      top: '26%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 3, 
      name: 'LENIS', 
      cat: 'Scroll', 
      desc: 'Smooth inertial momentum scrolling engine',
      left: '74%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 4, 
      name: 'CANVAS', 
      cat: 'Scrubbing', 
      desc: 'HTML5 60FPS canvas image sequence scrubbing & particles',
      left: '66%',
      top: '74%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 5, 
      name: 'VEO', 
      cat: 'Cinematics', 
      desc: 'AI cinematic motion generation & looping environment video',
      left: '50%',
      top: '88%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 6, 
      name: 'BLENDER', 
      cat: '3D', 
      desc: '3D spatial modeling, asset baking & lighting',
      left: '34%',
      top: '74%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 7, 
      name: 'PYTHON', 
      cat: 'AI / ML', 
      desc: 'Machine learning pipelines, FastAPI & data analysis',
      left: '26%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    { 
      id: 8, 
      name: 'FIGMA', 
      cat: 'Design', 
      desc: 'UI/UX interface prototyping, design systems & layouts',
      left: '32%',
      top: '26%',
      transform: 'translate(-50%, -50%)',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs select-none"
        onClick={onClose}
      >
        {/* Close Button top-right */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-7 text-gray-400 hover:text-white bg-black/50 border border-white/20 p-1.5 rounded-full transition-colors z-50 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* The Exact Radial Loadout Wheel Stage */}
        <div 
          className="relative w-[520px] h-[400px] md:w-[620px] md:h-[460px] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle concentric rings */}
          <div className="absolute w-52 h-52 md:w-60 md:h-60 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border border-dashed border-cyan-500/15 pointer-events-none" />

          {/* Center Hub: "Loadout TECH STACK" */}
          <div className="text-center z-10 pointer-events-none select-none">
            <h3 
              className="text-4xl md:text-5xl font-black text-white italic tracking-wide uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Impact', sans-serif" }}
            >
              Loadout
            </h3>
            <div className="text-[10px] font-mono text-[#ff9900] tracking-widest uppercase font-bold mt-0.5">
              TECH STACK
            </div>
          </div>

          {/* 8 Radial Slots positioned distinctly with no overlap */}
          {slots.map((slot) => {
            const isHovered = hoveredId === slot.id;
            return (
              <div
                key={slot.id}
                onMouseEnter={() => setHoveredId(slot.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  if (onSelectWeapon) {
                    onSelectWeapon(slot);
                  }
                }}
                className={`absolute w-24 md:w-28 py-1.5 px-2 rounded-xs cursor-pointer transition-all duration-150 text-center shadow-lg backdrop-blur-md ${
                  isHovered
                    ? 'bg-[#ff1493] text-white scale-110 z-30 shadow-[0_0_16px_rgba(255,20,147,0.8)] border border-white'
                    : 'bg-black/85 text-gray-200 border border-white/20 hover:border-pink-500 z-20'
                }`}
                style={{
                  left: slot.left,
                  top: slot.top,
                  transform: slot.transform,
                }}
              >
                <div 
                  className="font-black text-xs md:text-sm tracking-wider uppercase leading-none"
                  style={{ fontFamily: "'Impact', sans-serif" }}
                >
                  {slot.name}
                </div>
                <div className={`text-[8px] font-mono tracking-tight mt-0.5 uppercase ${
                  isHovered ? 'text-white/90' : 'text-gray-400'
                }`}>
                  {slot.cat}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom helper text matching template */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none font-mono text-[10px] text-gray-400 tracking-wider">
          CLICK ANY WEAPON SLOT TO EQUIP • [ESC] RETURN TO GAME
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
