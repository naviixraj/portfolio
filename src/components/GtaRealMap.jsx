import React from 'react';

// Exact GTA Vice City Vector Map
export function GtaRealMap({ locationKey = 'menu' }) {
  const mapData = {
    menu: {
      mapX: -30,
      mapY: -20,
      zoom: 1.1,
      player: { x: 38, y: 72 },
      route: "M 38 72 L 48 62 L 60 55 L 75 42",
      destination: { x: 75, y: 42 },
      zone: 'OCEAN BEACH',
    },
    about: {
      mapX: -45,
      mapY: -35,
      zoom: 1.25,
      player: { x: 55, y: 68 },
      route: "M 55 68 L 52 58 L 46 45 L 35 38",
      destination: { x: 35, y: 38 },
      zone: 'OCEAN DRIVE',
    },
    skills: {
      mapX: -15,
      mapY: -55,
      zoom: 1.3,
      player: { x: 28, y: 82 },
      route: "M 28 82 L 35 70 L 42 58 L 52 46",
      destination: { x: 52, y: 46 },
      zone: 'PORT KELBRAY',
    },
    projects: {
      mapX: -40,
      mapY: -15,
      zoom: 1.2,
      player: { x: 65, y: 55 },
      route: "M 65 55 L 58 45 L 48 35 L 38 25",
      destination: { x: 38, y: 25 },
      zone: 'VICE BEACH',
    },
    experience: {
      mapX: -60,
      mapY: -65,
      zoom: 1.35,
      player: { x: 72, y: 85 },
      route: "M 72 85 L 65 72 L 55 60 L 40 45",
      destination: { x: 40, y: 45 },
      zone: 'DOWNTOWN',
    },
    achievements: {
      mapX: -25,
      mapY: -65,
      zoom: 1.4,
      player: { x: 45, y: 88 },
      route: "M 45 88 L 48 76 L 55 65 L 68 50",
      destination: { x: 68, y: 50 },
      zone: 'NEON STRIP',
    },
    academy: {
      mapX: -55,
      mapY: -25,
      zoom: 1.2,
      player: { x: 62, y: 78 },
      route: "M 62 78 L 52 68 L 45 52 L 32 40",
      destination: { x: 32, y: 40 },
      zone: 'KELBRAY HEIGHTS',
    },
    contact: {
      mapX: -35,
      mapY: -45,
      zoom: 1.25,
      player: { x: 42, y: 80 },
      route: "M 42 80 L 46 68 L 58 54 L 72 38",
      destination: { x: 72, y: 38 },
      zone: 'STARFISH ISLAND',
    },
    exit: {
      mapX: -70,
      mapY: -15,
      zoom: 1.15,
      player: { x: 82, y: 65 },
      route: "M 82 65 L 70 55 L 55 45 L 30 35",
      destination: { x: 30, y: 35 },
      zone: 'CAUSEWAY',
    }
  };

  const current = mapData[locationKey] || mapData.menu;

  return (
    <div className="relative w-full h-full bg-[#0a1420] overflow-hidden select-none">
      {/* Dynamic Animated Map Geometry Container */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${current.mapX}px, ${current.mapY}px) scale(${current.zoom})`,
          transformOrigin: 'center center'
        }}
      >
        <svg 
          className="w-[200px] h-[160px] -mt-5 -ml-5" 
          viewBox="0 0 200 200" 
          fill="none"
        >
          {/* Deep Ocean Water Background */}
          <rect width="200" height="200" fill="#0b1a2b" />

          {/* Ocean Grid Lines */}
          <defs>
            <pattern id="radarGrid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#14314c" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#radarGrid)" />

          {/* East Mainland / Vice Beach */}
          <path
            d="M 120 10 Q 155 35 150 70 T 160 120 T 140 170 T 115 195 L 90 195 Q 105 140 100 95 Q 98 50 110 20 Z"
            fill="#1e3448"
            stroke="#2b5070"
            strokeWidth="1.5"
          />

          {/* West Downtown Island */}
          <path
            d="M 30 20 Q 75 15 80 55 T 75 110 T 65 165 T 25 180 L 15 170 Q 25 120 20 70 Q 18 35 30 20 Z"
            fill="#1c3042"
            stroke="#2b5070"
            strokeWidth="1.5"
          />

          {/* Starfish Island */}
          <path
            d="M 85 85 Q 100 80 105 95 T 95 115 T 80 105 Z"
            fill="#233e56"
            stroke="#3a6b94"
            strokeWidth="1.2"
          />

          {/* Causeways */}
          <path d="M 75 60 L 105 55" stroke="#486581" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 80 100 L 90 98" stroke="#486581" strokeWidth="2" strokeLinecap="round" />
          <path d="M 100 100 L 110 98" stroke="#486581" strokeWidth="2" strokeLinecap="round" />
          <path d="M 70 140 L 115 135" stroke="#486581" strokeWidth="2.5" strokeLinecap="round" />

          {/* Street Roads */}
          <path
            d="M 130 25 L 125 180 M 140 40 L 135 160 M 120 40 L 145 40 M 118 70 L 152 70 M 115 105 L 148 105 M 110 145 L 138 145"
            stroke="#334e68"
            strokeWidth="1.2"
          />
          <path
            d="M 40 35 L 35 165 M 55 25 L 50 160 M 25 60 L 68 60 M 22 95 L 75 95 M 25 130 L 65 130"
            stroke="#334e68"
            strokeWidth="1.2"
          />

          {/* Major Highways */}
          <path d="M 132 15 Q 128 90 126 185" stroke="#d97706" strokeWidth="1.8" fill="none" />
          <path d="M 45 20 Q 52 90 48 175" stroke="#d97706" strokeWidth="1.8" fill="none" />

          {/* Active GPS Route */}
          <path
            d={current.route}
            fill="none"
            stroke="#ec4899"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="5 2.5"
            className="animate-pulse"
          />

          {/* Destination Waypoint Marker */}
          <circle cx={current.destination.x} cy={current.destination.y} r="5" fill="#ec4899" className="animate-ping" opacity="0.8" />
          <circle cx={current.destination.x} cy={current.destination.y} r="3" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />

          {/* Player Position Blip */}
          <circle cx={current.player.x} cy={current.player.y} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Radar Overlay Scan Effect */}
      <div 
        className="absolute inset-0 origin-center bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(56,189,248,0.22)_360deg)] rounded-full animate-spin pointer-events-none"
        style={{ animationDuration: '4s' }}
      />

      {/* Cardinal North Compass Badge */}
      <div className="absolute top-1.5 left-1.5 z-20 pointer-events-none">
        <span className="text-[9px] font-mono text-cyan-400 font-black bg-black/70 px-1 py-0.2 rounded border border-cyan-500/40">
          N
        </span>
      </div>

      {/* Territory Zone Tag Badge */}
      <div className="absolute bottom-1 left-1.5 right-1.5 flex justify-between items-center text-[8px] font-mono text-white/90 z-20 pointer-events-none">
        <span className="truncate text-pink-400 font-bold">{current.zone}</span>
        <span className="text-cyan-400 font-bold ml-1">GPS</span>
      </div>

      {/* Bottom Health & Armor Bars */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex z-20 pointer-events-none">
        <div className="w-1/2 bg-[#22c55e] border-r border-black"></div>
        <div className="w-1/2 bg-[#3b82f6]"></div>
      </div>
    </div>
  );
}
