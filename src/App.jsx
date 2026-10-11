import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneViewport } from './components/SceneViewport';
import { GameHUD, MinimapRadar } from './components/GameHUD';
import { WeaponWheel } from './components/WeaponWheel';
import { 
  Plus, ExternalLink, ChevronRight, Check, ArrowRight,
  Mail, MapPin
} from 'lucide-react';

export default function App() {
  const [activeScene, setActiveScene] = useState('menu');
  const [cash, setCash] = useState(1250000);
  const [stars, setStars] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [visited, setVisited] = useState({ menu: true });
  const [skillCategory, setSkillCategory] = useState('ALL');

  const objectives = {
    menu: 'BUILD NEXT LEVEL DIGITAL EXPERIENCES',
    about: 'LEARN WHO YOU ARE DEALING WITH',
    skills: 'REVIEW UNLOCKED ABILITIES',
    projects: 'INSPECT SHIPPED MISSIONS',
    experience: 'TRACE THE FULL CAREER PATH',
    achievements: 'COLLECT EVERY UNLOCKED TROPHY',
    academy: 'RECRUIT THE NEXT GENERATION',
    contact: 'OPEN A SECURE LINE OF CONTACT',
    exit: 'RIDE OFF INTO THE SUNRISE'
  };

  const locations = {
    menu: 'VICE BEACH',
    about: 'OCEAN DRIVE',
    skills: 'PORT KELBRAY',
    projects: 'VICE BEACH',
    experience: 'DOWNTOWN LEONIDA',
    achievements: 'NEON STRIP',
    academy: 'KELBRAY HEIGHTS',
    contact: 'OCEAN DRIVE',
    exit: 'GRASSRIVERS CAUSEWAY'
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isWheelOpen) {
          setIsWheelOpen(false);
        } else {
          switchScene('menu');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWheelOpen]);

  const switchScene = (sceneKey) => {
    if (sceneKey === 'weapon_wheel') {
      setIsWheelOpen(true);
      return;
    }
    setActiveScene(sceneKey);
    if (!visited[sceneKey]) {
      setVisited((prev) => ({ ...prev, [sceneKey]: true }));
      setCash((prev) => prev + 225000);
      setStars((prev) => Math.min(5, prev + 1));
    }
  };

  const menuItems = [
    { key: 'menu', label: 'START GAME' },
    { key: 'about', label: 'ABOUT ME' },
    { key: 'skills', label: 'SKILLS' },
    { key: 'weapon_wheel', label: 'LOADOUT (WEAPON WHEEL)' },
    { key: 'projects', label: 'PROJECTS' },
    { key: 'experience', label: 'EXPERIENCE' },
    { key: 'achievements', label: 'ACHIEVEMENTS' },
    { key: 'academy', label: 'ACADEMY' },
    { key: 'contact', label: 'CONTACT' },
    { key: 'exit', label: 'EXIT GAME' },
  ];

  const allSkills = [
    { name: 'HTML / CSS', cat: 'FRONTEND', pct: 95 },
    { name: 'JAVASCRIPT', cat: 'FRONTEND', pct: 90 },
    { name: 'REACT / NEXT.JS', cat: 'FRONTEND', pct: 88 },
    { name: 'TAILWIND / GSAP', cat: 'FRONTEND', pct: 92 },
    { name: 'NODE.JS / EXPRESS', cat: 'BACKEND', pct: 88 },
    { name: 'PYTHON', cat: 'BACKEND', pct: 86 },
    { name: 'REST APIS / WEBSOCKETS', cat: 'BACKEND', pct: 85 },
    { name: 'SQL / POSTGRESQL', cat: 'DATABASE', pct: 84 },
    { name: 'MONGODB', cat: 'DATABASE', pct: 86 },
    { name: 'MACHINE LEARNING', cat: 'AI / DS', pct: 82 },
    { name: 'AI / AUTOMATION', cat: 'AI / DS', pct: 85 },
    { name: 'PANDAS / NUMPY', cat: 'AI / DS', pct: 88 },
    { name: 'GIT / GITHUB', cat: 'DEVOPS', pct: 90 },
    { name: 'DOCKER', cat: 'DEVOPS', pct: 80 },
  ];

  const filteredSkills = skillCategory === 'ALL' 
    ? allSkills 
    : allSkills.filter(s => s.cat === skillCategory);

  return (
    <SceneViewport activeScene={activeScene}>
      {/* GTA In-Game HUD */}
      <GameHUD 
        cash={cash} 
        stars={stars} 
        isMuted={isMuted} 
        onToggleMute={() => setIsMuted(!isMuted)} 
      />

      {/* GTA Minimap Radar */}
      <MinimapRadar 
        objective={objectives[activeScene]} 
        location={locations[activeScene]} 
      />

      {/* Signature Quote (Bottom Right) */}
      <div className="absolute bottom-8 right-10 text-right pointer-events-none select-none z-30 hidden md:block">
        <p className="text-gray-300 text-xs italic tracking-wider font-light drop-shadow">
          "Code is my weapon, Creativity is my world."
        </p>
        <span className="text-pink-400 font-mono text-xs font-bold">— Navi Raj</span>
      </div>

      {/* Territory Location Watermark banner (Center Bottom like the screenshot) */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-20">
        <div className="text-white/80 font-black tracking-widest text-lg uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: "'Impact', sans-serif" }}>
          {locations[activeScene]}
        </div>
      </div>

      {/* UI Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 z-30 pointer-events-none">
        
        {/* ========================================================= */}
        {/* SCREEN 1: MAIN MENU (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'menu' && (
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md pointer-events-auto"
          >
            {/* Exact Brand Title */}
            <div className="mb-6">
              <h1 
                className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                style={{ fontFamily: "'Impact', sans-serif" }}
              >
                NAVI RAJ <br />
                BUILDS
              </h1>
              <div 
                className="text-3xl text-[#ff2a85] font-serif italic -mt-2.5 drop-shadow-[0_0_12px_rgba(255,42,133,0.7)]"
                style={{ fontFamily: "'Brush Script MT', cursive" }}
              >
                Portfolio
              </div>
            </div>

            {/* Exact Menu Items List with hot-pink hover */}
            <div className="space-y-1 font-bold text-lg md:text-xl uppercase tracking-wider">
              {menuItems.map((item) => {
                const isSelected = item.key === 'menu';
                return (
                  <button
                    key={item.key}
                    onClick={() => switchScene(item.key)}
                    className="w-full text-left py-1 px-3 rounded flex items-center justify-between text-gray-300 hover:text-white hover:bg-[#ff1493] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      {visited[item.key] && (
                        <span className="text-[#22c55e] text-sm">✓</span>
                      )}
                      <span className="group-hover:translate-x-1.5 transition-transform">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: ABOUT ME (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'about' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg pointer-events-auto"
          >
            {/* Header: ABOUT Me */}
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ABOUT
                <span className="text-[#ff9900] text-4xl font-serif italic -rotate-3" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Me
                </span>
              </h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 drop-shadow">
              Hey, I'm Navi Raj. A full-stack developer, designer and AI creator who builds digital experiences that aren't just functional — they're memorable.
            </p>

            {/* Stat Cards with green plus icon */}
            <div className="space-y-2 mb-6">
              <div className="bg-black/60 border border-white/10 rounded px-4 py-2.5 flex items-center gap-3 backdrop-blur-md">
                <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">AGE / DEGREE</div>
                  <div className="text-xs font-semibold text-white">20 — 2nd year B.Tech AI & DS (2025–2029)</div>
                </div>
              </div>

              <div className="bg-black/60 border border-white/10 rounded px-4 py-2.5 flex items-center gap-3 backdrop-blur-md">
                <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">LOCATION</div>
                  <div className="text-xs font-semibold text-white">Tamil Nadu, India</div>
                </div>
              </div>

              <div className="bg-black/60 border border-white/10 rounded px-4 py-2.5 flex items-center gap-3 backdrop-blur-md">
                <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">STATUS</div>
                  <div className="text-xs font-semibold text-white">Building my dreams</div>
                </div>
              </div>
            </div>

            {/* VIEW JOURNEY Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => switchScene('experience')}
                className="px-6 py-2.5 bg-[#ff6600] hover:bg-[#ff7711] text-white font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                VIEW JOURNEY <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => switchScene('menu')}
                className="px-4 py-2.5 bg-black/50 hover:bg-black/70 text-gray-300 hover:text-white rounded text-xs font-mono border border-white/20 transition-colors cursor-pointer"
              >
                [ESC] BACK TO MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: SKILLS UNLOCKED (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'skills' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl pointer-events-auto"
          >
            {/* Header: SKILLS Unlocked */}
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                SKILLS
                <span className="text-cyan-400 text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Unlocked
                </span>
              </h2>

              <button 
                onClick={() => setIsWheelOpen(true)}
                className="text-[11px] font-mono text-pink-400 hover:text-pink-300 underline uppercase"
              >
                [OPEN WEAPON WHEEL]
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 mb-4 text-[10px] font-mono font-bold">
              {['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'AI / DS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategory(cat)}
                  className={`px-2.5 py-1 rounded-xs transition-colors ${
                    skillCategory === cat 
                      ? 'bg-[#ff1493] text-white' 
                      : 'bg-black/50 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exact Horizontal Stat Progress Bars */}
            <div className="space-y-2.5 bg-black/60 backdrop-blur-md p-5 rounded-lg border border-white/10 max-h-[46vh] overflow-y-auto custom-scroll">
              {filteredSkills.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <div className="w-40 text-xs font-bold text-gray-200 tracking-wider font-mono uppercase truncate">
                    {s.name}
                  </div>
                  <div className="flex-1 h-3 bg-black/70 rounded-xs overflow-hidden border border-white/15">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#ff9900] via-[#ff6600] to-[#00f0ff] rounded-xs"
                    />
                  </div>
                  <div className="w-10 text-right text-xs font-mono text-cyan-400 font-bold">
                    {s.pct}%
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-xs font-mono text-emerald-400 font-bold">
                MISSION PASSED • Respect +
              </div>
              <button 
                onClick={() => switchScene('menu')}
                className="text-xs font-mono text-gray-400 hover:text-white"
              >
                [ESC] BACK TO MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4: EXPERIENCE (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'experience' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg pointer-events-auto"
          >
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                EXPERIENCE
                <span className="text-[#a855f7] text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Journey
                </span>
              </h2>
            </div>

            {/* Timeline matching template */}
            <div className="space-y-5 bg-black/60 backdrop-blur-md p-6 rounded-lg border border-white/10">
              <div className="relative pl-4 border-l-2 border-cyan-400">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                <div className="text-[11px] font-mono text-cyan-400 font-bold">2025 — PRESENT</div>
                <div className="text-base font-bold text-white">Full Stack & AI Engineer</div>
                <p className="text-xs text-gray-400 mt-1">Building high-performance web applications, API microservices, and AI integrations.</p>
              </div>

              <div className="relative pl-4 border-l-2 border-pink-500">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-pink-500"></div>
                <div className="text-[11px] font-mono text-pink-400 font-bold">2024 — 2025</div>
                <div className="text-base font-bold text-white">Frontend & UI Systems Developer</div>
                <p className="text-xs text-gray-400 mt-1">Crafting modern, responsive component systems using React, Tailwind CSS, and 3D Canvas.</p>
              </div>

              <div className="relative pl-4 border-l-2 border-emerald-400">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-400"></div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold">2023 — 2024</div>
                <div className="text-base font-bold text-white">Learning & Exploring</div>
                <p className="text-xs text-gray-400 mt-1">Full-stack foundations, algorithms, Python programming, and building in public.</p>
              </div>
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="mt-4 text-xs font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 5: ACHIEVEMENTS (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'achievements' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg pointer-events-auto"
          >
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ACHIEVEMENTS
                <span className="text-[#ff1493] text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Unlocked
                </span>
              </h2>
            </div>

            {/* Achievement Cards matching template */}
            <div className="space-y-2.5 mb-5">
              {[
                { title: 'FIRST PRODUCTION BUILD', desc: 'Shipped full-stack web applications with zero downtime' },
                { title: 'FULL-STACK MASTERY', desc: 'Architected end-to-end client, server, and database systems' },
                { title: 'AI MODEL PIPELINES', desc: 'Integrated machine learning inference into interactive interfaces' },
                { title: '1000+ HOURS OF DEV', desc: 'Demonstrated consistency across algorithmic problems & code' },
              ].map((a, i) => (
                <div key={i} className="bg-black/60 border border-white/10 rounded px-4 py-2.5 flex items-center justify-between backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-pink-500/20 border border-pink-500 flex items-center justify-center text-pink-400 text-xs font-bold">
                      +
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-wider uppercase">{a.title}</div>
                      <div className="text-[11px] text-gray-400">{a.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => switchScene('academy')}
                className="px-6 py-2.5 bg-[#ff1493] hover:bg-[#ff2a85] text-white font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                VIEW CREDENTIALS <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => switchScene('menu')}
                className="text-xs font-mono text-gray-400 hover:text-white"
              >
                [ESC] BACK TO MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 6: ACADEMY (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'academy' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg pointer-events-auto"
          >
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ACADEMY
                <span className="text-[#ff9900] text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  AI & DS
                </span>
              </h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 drop-shadow">
              Pursuing B.Tech in Artificial Intelligence & Data Science (Batch 2025 – 2029). Mastering deep learning algorithms, statistical data analysis, and scalable web architectures.
            </p>

            {/* Stat Cards matching template: 120+ STUDENTS, 25+ COURSES, 50+ VIDEOS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-black/60 border border-white/10 p-3 rounded text-center backdrop-blur-md">
                <div className="text-2xl font-black text-pink-400" style={{ fontFamily: "'Impact', sans-serif" }}>2nd</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">YEAR STATUS</div>
              </div>
              <div className="bg-black/60 border border-white/10 p-3 rounded text-center backdrop-blur-md">
                <div className="text-2xl font-black text-cyan-400" style={{ fontFamily: "'Impact', sans-serif" }}>2029</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">BATCH</div>
              </div>
              <div className="bg-black/60 border border-white/10 p-3 rounded text-center backdrop-blur-md">
                <div className="text-2xl font-black text-amber-400" style={{ fontFamily: "'Impact', sans-serif" }}>AI & DS</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">SPECIALIZATION</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => switchScene('projects')}
                className="px-6 py-2.5 bg-[#ff6600] hover:bg-[#ff7711] text-white font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                VIEW PROJECTS <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => switchScene('menu')}
                className="text-xs font-mono text-gray-400 hover:text-white"
              >
                [ESC] BACK TO MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 7: CONTACT (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'contact' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md pointer-events-auto"
          >
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                CONTACT
                <span className="text-cyan-400 text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Let's Connect
                </span>
              </h2>
            </div>

            {/* Contact details matching template */}
            <div className="space-y-2 mb-6 bg-black/60 backdrop-blur-md p-5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400" />
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">EMAIL</div>
                  <div className="text-xs font-bold text-white">contact@naviraj.dev</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <MapPin size={16} className="text-pink-400" />
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">LOCATION</div>
                  <div className="text-xs font-bold text-white">Tamil Nadu, India</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"/></svg>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">LINKEDIN</div>
                  <div className="text-xs font-bold text-white">/in/navi-raj</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                <div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase">GITHUB</div>
                  <div className="text-xs font-bold text-white">github.com/naviixraj</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="mailto:contact@naviraj.dev"
                className="px-6 py-2.5 bg-[#0088ff] hover:bg-[#0077ee] text-white font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                SEND MESSAGE <ChevronRight size={14} />
              </a>
              <button 
                onClick={() => switchScene('menu')}
                className="text-xs font-mono text-gray-400 hover:text-white"
              >
                [ESC] BACK TO MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 8: PROJECTS */}
        {/* ========================================================= */}
        {activeScene === 'projects' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl pointer-events-auto"
          >
            <div className="mb-4">
              <h2 className="text-6xl font-black text-white uppercase tracking-tight flex items-baseline gap-2 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                PROJECTS
                <span className="text-[#ff2a85] text-4xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Shipped
                </span>
              </h2>
            </div>

            <div className="space-y-3 bg-black/60 backdrop-blur-md p-5 rounded-lg border border-white/10 max-h-[48vh] overflow-y-auto custom-scroll">
              {[
                { title: 'AI Predictive Intelligence Platform', desc: 'Full-stack machine learning analysis engine built with React, FastAPI & PyTorch.', stack: 'React • Python • PyTorch' },
                { title: 'GTA VI Interactive Web Experience', desc: 'Viral gaming-inspired interactive portfolio featuring 3D parallax, game HUD & audio.', stack: 'React • Tailwind • 3D Canvas' },
                { title: 'Smart Financial Ledger System', desc: 'Real-time bookkeeping platform with automated reconciliation & analytics.', stack: 'Next.js • PostgreSQL • Node.js' },
              ].map((p, idx) => (
                <div key={idx} className="border-b border-white/10 pb-3 last:border-b-0">
                  <div className="text-[10px] font-mono text-pink-400">MISSION #{idx + 1}</div>
                  <div className="text-base font-bold text-white">{p.title}</div>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">{p.stack}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="mt-4 text-xs font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 9: EXIT GAME / MISSION COMPLETE (EXACT TEMPLATE) */}
        {/* ========================================================= */}
        {activeScene === 'exit' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg pointer-events-auto"
          >
            <div className="text-[11px] font-mono text-gray-400 tracking-widest uppercase mb-1">
              THANK YOU FOR VISITING
            </div>
            <h2 className="text-6xl font-black text-white uppercase tracking-tight leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
              MISSION COMPLETE
            </h2>
            <div className="text-3xl text-[#ff2a85] font-serif italic mb-6" style={{ fontFamily: "'Brush Script MT', cursive" }}>
              See you soon!
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="px-6 py-2.5 bg-black/60 border border-white/20 hover:bg-black/80 text-white font-bold rounded text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              &lt; BACK TO HOME
            </button>
          </motion.div>
        )}

      </div>

      {/* GTA Interactive Weapon Wheel */}
      <WeaponWheel 
        isOpen={isWheelOpen} 
        onClose={() => setIsWheelOpen(false)}
        onSelectWeapon={(w) => {
          setActiveScene('skills');
          setSkillCategory(w.type.includes('FRONTEND') ? 'FRONTEND' : w.type.includes('BACKEND') ? 'BACKEND' : w.type.includes('DATA') ? 'DATABASE' : 'ALL');
        }}
      />
    </SceneViewport>
  );
}
