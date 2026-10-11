import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { GtaRealMap } from './GtaRealMap';

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
    <div className="absolute top-5 right-7 flex flex-col items-end pointer-events-auto z-40 select-none">
      {/* Top Status: Time + Weapon Box */}
      <div className="flex items-center gap-2.5">
        <div className="text-right">
          <div className="text-white font-mono font-bold text-xs tracking-widest">{time}</div>
          <div 
            className="text-2xl md:text-3xl font-black tracking-tight text-[#22c55e] drop-shadow-[0_2px_8px_rgba(34,197,94,0.6)] leading-none"
            style={{ fontFamily: "'Impact', sans-serif" }}
          >
            ${displayCash.toLocaleString()}
          </div>
        </div>

        {/* GTA Weapon Box [S] -100 */}
        <div className="flex flex-col items-center justify-center bg-black/70 border border-white/30 rounded-xs w-9 h-10 shadow-md">
          <span className="text-white font-black text-base leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>S</span>
          <span className="text-emerald-400 font-mono text-[9px] font-bold mt-0.5">-100</span>
        </div>
      </div>

      {/* Wanted Stars & Audio Button */}
      <div className="flex items-center gap-2.5 mt-1">
        <button 
          onClick={onToggleMute}
          className="text-[9px] font-mono text-gray-400 hover:text-white flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/10"
        >
          {isMuted ? <VolumeX size={11} className="text-red-400" /> : <Volume2 size={11} className="text-green-400" />}
          <span>{isMuted ? 'MUTE' : 'AUDIO'}</span>
        </button>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-base transition-all duration-300 ${
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

// Compact Authentic GTA Minimap Radar
export function MinimapRadar({ activeScene = 'menu', objective = 'BUILD NEXT LEVEL DIGITAL EXPERIENCES', location = 'VICE BEACH' }) {
  return (
    <div className="flex items-end gap-3.5 select-none pointer-events-none">
      {/* Exact Rectangular Radar matching template */}
      <div className="relative w-28 h-20 md:w-32 md:h-22 bg-[#0a1420] border-2 border-cyan-500/50 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.95)] backdrop-blur-md">
        <GtaRealMap locationKey={activeScene} />
      </div>

      {/* Objective Text Ticker */}
      <div className="flex flex-col mb-0.5 max-w-[200px] md:max-w-xs">
        <div className="text-[9px] font-mono tracking-widest text-[#ff2a85] font-black uppercase flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-[#ff2a85] animate-pulse"></span>
          CURRENT OBJECTIVE
        </div>
        <div className="text-white font-black text-xs md:text-sm tracking-wider uppercase drop-shadow-md leading-tight mt-0.5">
          {objective}
        </div>
        <div className="text-[9px] font-mono text-gray-400 mt-0.5 flex items-center gap-1.5">
          <span className="text-[#ff2a85] font-bold">{location}</span>
          <span>•</span>
          <span>Vice City Inspired</span>
          <span>•</span>
          <span className="text-gray-300">Stay Legendary</span>
        </div>
      </div>
    </div>
  );
}
