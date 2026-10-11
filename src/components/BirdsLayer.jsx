import React from 'react';

// Flying birds with flapping wing animation across the sky
export function BirdsLayer() {
  const birds = [
    { id: 1, top: '12%', duration: '22s', delay: '0s', scale: 0.65, flapDuration: '0.45s' },
    { id: 2, top: '18%', duration: '26s', delay: '3.5s', scale: 0.45, flapDuration: '0.38s' },
    { id: 3, top: '9%',  duration: '19s', delay: '7s', scale: 0.8, flapDuration: '0.5s' },
    { id: 4, top: '24%', duration: '28s', delay: '11s', scale: 0.4, flapDuration: '0.35s' },
    { id: 5, top: '15%', duration: '24s', delay: '14s', scale: 0.55, flapDuration: '0.42s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes flyAcross {
          0% {
            transform: translateX(-10vw) translateY(0px);
          }
          25% {
            transform: translateX(25vw) translateY(-15px);
          }
          50% {
            transform: translateX(55vw) translateY(10px);
          }
          75% {
            transform: translateX(80vw) translateY(-8px);
          }
          100% {
            transform: translateX(115vw) translateY(5px);
          }
        }

        @keyframes wingFlapLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-38deg);
          }
        }

        @keyframes wingFlapRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(38deg);
          }
        }
      `}</style>

      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute"
          style={{
            top: bird.top,
            left: 0,
            animation: `flyAcross ${bird.duration} linear infinite`,
            animationDelay: bird.delay,
            transform: `scale(${bird.scale})`,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
          }}
        >
          {/* Bird SVG with independently animated wings */}
          <div className="relative w-8 h-4 flex items-center justify-center opacity-90">
            {/* Left wing */}
            <svg
              className="w-4 h-3 -mr-0.5 origin-bottom-right"
              viewBox="0 0 20 12"
              fill="currentColor"
              style={{
                color: '#1a1824',
                animation: `wingFlapLeft ${bird.flapDuration} ease-in-out infinite`
              }}
            >
              <path d="M20,12 C14,8 7,2 0,0 C6,4 14,8 20,12 Z" />
            </svg>

            {/* Right wing */}
            <svg
              className="w-4 h-3 -ml-0.5 origin-bottom-left"
              viewBox="0 0 20 12"
              fill="currentColor"
              style={{
                color: '#1a1824',
                animation: `wingFlapRight ${bird.flapDuration} ease-in-out infinite`
              }}
            >
              <path d="M0,12 C6,8 13,2 20,0 C14,4 6,8 0,12 Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

// Distant aircraft / police chopper with blinking beacon light
export function AircraftBeacon() {
  return (
    <div 
      className="absolute top-[16%] pointer-events-none z-10"
      style={{
        animation: 'flyAcross 42s linear infinite',
        animationDelay: '8s'
      }}
    >
      <div className="relative flex items-center">
        {/* Tiny distant aircraft silhouette */}
        <div className="w-4 h-1 bg-black/70 rounded-full"></div>
        {/* Blinking red beacon */}
        <div 
          className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-1 left-1.5 animate-ping"
          style={{ animationDuration: '1.2s' }}
        ></div>
        <div className="w-1 h-1 bg-red-400 rounded-full absolute -top-0.5 left-2"></div>
      </div>
    </div>
  );
}
