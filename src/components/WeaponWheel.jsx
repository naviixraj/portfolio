import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Database, Cpu, Layout, Server, Sparkles } from 'lucide-react';

export function WeaponWheel({ isOpen, onClose, onSelectWeapon }) {
  if (!isOpen) return null;

  const weapons = [
    { id: 1, name: 'REACT.JS', type: 'FRONTEND UI', icon: Layout, desc: 'Next.js, Tailwind, Component Architecture', stat: '95%' },
    { id: 2, name: 'NODE.JS', type: 'BACKEND CORE', icon: Server, desc: 'Express, REST APIs, Microservices', stat: '90%' },
    { id: 3, name: 'PYTHON', type: 'AI & LOGIC', icon: Code, desc: 'FastAPI, Scripting, Automation', stat: '88%' },
    { id: 4, name: 'MACHINE LEARNING', type: 'INTELLIGENCE', icon: Cpu, desc: 'Scikit-Learn, Pandas, Feature Engineering', stat: '82%' },
    { id: 5, name: 'POSTGRES / MONGO', type: 'DATA VAULT', icon: Database, desc: 'SQL Complex Queries, Mongoose, Aggregations', stat: '85%' },
    { id: 6, name: 'TAILWIND CSS', type: 'AESTHETICS', icon: Sparkles, desc: 'Framer Motion, 3D Canvas, Responsive Systems', stat: '94%' },
    { id: 7, name: 'DOCKER & GIT', type: 'DEVOPS / VIRTUAL', icon: Server, desc: 'Version Control, CI/CD, Containers', stat: '84%' },
    { id: 8, name: 'PANDAS / NUMPY', type: 'DATA SCIENCE', icon: Database, desc: 'EDA, Data Cleaning, Numerical Processing', stat: '86%' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md select-none"
        onClick={onClose}
      >
        <div className="relative w-full max-w-4xl p-6 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-center w-full mb-8 border-b border-pink-500/30 pb-3">
            <div>
              <div className="text-xs font-mono text-pink-500 tracking-widest uppercase">TACTICAL LOADOUT</div>
              <h2 className="text-3xl font-black text-white tracking-wider">SELECT WEAPON OF CHOICE</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* 8-Slot Radial / Grid Arsenal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {weapons.map((w) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.id}
                  whileHover={{ scale: 1.05, borderColor: '#ec4899', y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelectWeapon && onSelectWeapon(w);
                    onClose();
                  }}
                  className="bg-black/60 border-2 border-white/10 p-5 rounded-xl cursor-pointer hover:bg-pink-950/20 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-pink-400 uppercase tracking-wider">
                      SLOT {w.id}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                      {w.stat}
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg w-fit text-cyan-400 group-hover:text-pink-400 group-hover:bg-pink-500/10 mb-3 transition-colors">
                    <Icon size={28} />
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-wider mb-1">
                      {w.type}
                    </div>
                    <div className="text-lg font-black text-white tracking-wide group-hover:text-pink-100 mb-1">
                      {w.name}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center text-xs font-mono text-gray-400 flex items-center gap-3">
            <span className="bg-white/10 px-2 py-1 rounded text-white">[ESC] OR CLICK OUTSIDE TO RETURN</span>
            <span>•</span>
            <span className="text-cyan-400">CLICK ANY WEAPON TO EQUIP</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
