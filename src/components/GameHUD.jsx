import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function GameHUD({ cash = 1250000, stars = 3, isMuted, onToggleMute }) {
  const [time, setTime] = useState('18:56');
  const [displayCash, setDisplayCash] = useState(cash);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let start = displayCash;
    const end = cash;
    if (start === end) return;
    const diff = end - start;
    const step = diff / 15;
    const timer = setInterval(() => {
      start += step;
      if ((diff > 0 && start >= end) || (diff < 0 && start <= end)) {
        setDisplayCash(end);
        clearInterval(timer);
      } else {
        setDisplayCash(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [cash]);

  return (
    <div className="absolute top-8 right-10 flex flex-col items-end pointer-events-auto z-40 select-none">
      {/* GTA Top Status: Clock, Weapon box with S and -100 */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-white font-mono font-bold text-sm tracking-widest">{time}</div>
          <div 
            className="text-3xl md:text-4xl font-black tracking-tight text-[#22c55e] drop-shadow-[0_2px_8px_rgba(34,197,94,0.5)] leading-tight"
            style={{ fontFamily: "'Impact', sans-serif" }}
          >
            ${displayCash.toLocaleString()}
          </div>
        </div>

        {/* Authentic GTA Weapon Box [S] -100 */}
        <div className="flex flex-col items-center justify-center bg-black/60 border border-white/30 rounded-xs w-11 h-12">
          <span className="text-white font-black text-lg leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>S</span>
          <span className="text-emerald-400 font-mono text-[10px] font-bold mt-0.5">-100</span>
        </div>
      </div>

      {/* 5 Wanted Stars & Mute Button */}
      <div className="flex items-center gap-3 mt-1.5">
        <button 
          onClick={onToggleMute}
          className="text-[10px] font-mono text-gray-400 hover:text-white flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-white/10"
        >
          {isMuted ? <VolumeX size={12} className="text-red-400" /> : <Volume2 size={12} className="text-green-400" />}
          <span>{isMuted ? 'MUTE' : 'AUDIO'}</span>
        </button>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg transition-all duration-300 ${
                star <= stars
                  ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                  : 'text-gray-700/50'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Exact GTA Minimap Radar Component
export function MinimapRadar({ objective = 'BUILD NEXT LEVEL DIGITAL EXPERIENCES', location = 'VICE BEACH' }) {
  return (
    <div className="absolute bottom-8 left-10 flex items-end gap-5 z-40 select-none pointer-events-none">
      {/* Radar Map Frame */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 bg-[#06101c]/90 border border-cyan-500/40 rounded-sm overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.9)] backdrop-blur-md">
        {/* Radar grid lines */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:10px_10px]" />
        
        {/* Animated Sweep Line */}
        <div 
          className="absolute inset-0 origin-center bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(56,189,248,0.3)_360deg)] rounded-full animate-spin"
          style={{ animationDuration: '3.5s' }}
        />

        {/* GPS Route path line */}
        <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100">
          <path
            d="M 15 85 L 35 65 L 45 70 L 75 25 L 85 30"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          {/* Waypoint Blip */}
          <circle cx="85" cy="30" r="4.5" fill="#ec4899" className="animate-ping" />
          <circle cx="85" cy="30" r="3.5" fill="#f43f5e" />
          {/* Player marker */}
          <circle cx="15" cy="85" r="4" fill="#38bdf8" />
        </svg>

        {/* Cardinal North label */}
        <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-cyan-400 font-bold">
          N
        </div>
        
        {/* Bottom Health/Armor bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="w-1/2 bg-emerald-500"></div>
          <div className="w-1/2 bg-blue-500"></div>
        </div>
      </div>

      {/* Objective Text Ticker */}
      <div className="flex flex-col mb-1 max-w-sm md:max-w-md">
        <div className="text-[10px] font-mono tracking-widest text-pink-500 font-bold uppercase mb-0.5 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-pink-500 animate-pulse"></span>
          CURRENT OBJECTIVE
        </div>
        <div className="text-white font-black text-sm md:text-base tracking-wider uppercase drop-shadow-md leading-tight">
          {objective}
        </div>
        <div className="text-[10px] font-mono text-gray-400 mt-1 flex items-center gap-2">
          <span className="text-pink-400 font-bold">{location}</span>
          <span>•</span>
          <span>Vice City Inspired</span>
          <span>•</span>
          <span className="text-gray-300">Stay Legendary</span>
        </div>
      </div>
    </div>
  );
}
