import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneViewport } from './components/SceneViewport';
import { GameHUD, MinimapRadar } from './components/GameHUD';
import { WeaponWheel } from './components/WeaponWheel';
import { 
  Plus, ChevronRight, Check, ArrowRight,
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

  // Exact countdown ticker simulation like the screenshot: "LEONIDA DROPS IN"
  const [countdown, setCountdown] = useState('108 . 15 . 33 . 27');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const s = String(59 - now.getSeconds()).padStart(2, '0');
      const m = String(59 - now.getMinutes()).padStart(2, '0');
      const h = String(23 - now.getHours()).padStart(2, '0');
      setCountdown(`108 . ${h} . ${m} . ${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    contact: 'WATERFRONT LOUNGE',
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

  // Exact 8 clean menu items matching template screenshot
  const menuItems = [
    { key: 'menu', label: 'START GAME' },
    { key: 'about', label: 'ABOUT ME' },
    { key: 'skills', label: 'SKILLS' },
    { key: 'weapon_wheel', label: 'LOADOUT' },
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
      {/* Top Center: Exact GTA VI "LEONIDA DROPS IN" Countdown Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-40">
        <div className="bg-black/70 border border-white/20 rounded-full px-2 py-0.2 text-[9px] font-mono text-gray-300 font-bold mb-0.5 shadow-md">
          104.9
        </div>
        <div className="text-[9px] font-mono text-pink-500 font-bold tracking-widest uppercase">
          LEONIDA DROPS IN
        </div>
        <div className="text-white font-mono text-xs font-black tracking-wider text-shadow">
          {countdown}
        </div>
      </div>

      {/* Top-Right: Game HUD (Cash, Time, Stars, Weapon Box) */}
      <GameHUD 
        cash={cash} 
        stars={stars} 
        isMuted={isMuted} 
        onToggleMute={() => setIsMuted(!isMuted)} 
      />

      {/* Signature Quote (Bottom Right) */}
      <div className="absolute bottom-5 right-7 text-right pointer-events-none select-none z-30 hidden md:block">
        <p className="text-gray-300 text-[11px] italic tracking-wider font-light drop-shadow">
          "Code is my weapon, Creativity is my world."
        </p>
        <span className="text-pink-400 font-mono text-[11px] font-bold">— Navi Raj</span>
      </div>

      {/* Territory Location Watermark banner (Over the car) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-20">
        <div className="text-white/80 font-black tracking-widest text-base md:text-lg uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]" style={{ fontFamily: "'Impact', sans-serif" }}>
          {locations[activeScene]}
        </div>
      </div>

      {/* ========================================================= */}
      {/* LEFT COLUMN: EXACT SIZED TITLE + COMPACT MENU */}
      {/* ========================================================= */}
      <div className="absolute top-5 left-7 md:top-7 md:left-10 z-30 pointer-events-auto max-w-[280px] md:max-w-xs select-none">
        {/* Exact Brand Title matching template proportions */}
        <div className="mb-3">
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: "'Impact', sans-serif" }}
          >
            NAVI RAJ <br />
            BUILDS
          </h1>
          <div 
            className="text-xl md:text-2xl text-[#ff2a85] font-serif italic -mt-1 drop-shadow-[0_0_10px_rgba(255,42,133,0.7)]"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Portfolio
          </div>
        </div>

        {/* ========================================================= */}
        {/* COMPACT MENU LIST (Sits completely clear of Minimap) */}
        {/* ========================================================= */}
        {activeScene === 'menu' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-0.5 font-bold text-sm md:text-base uppercase tracking-wider mb-4"
          >
            {menuItems.map((item) => {
              const isSelected = item.key === 'menu';
              return (
                <button
                  key={item.key}
                  onClick={() => switchScene(item.key)}
                  className={`w-full text-left py-0.5 px-2 rounded-xs flex items-center justify-between transition-colors group cursor-pointer ${
                    isSelected 
                      ? 'bg-[#ff1493] text-white shadow-[0_0_12px_rgba(255,20,147,0.5)]' 
                      : 'text-gray-300 hover:text-white hover:bg-[#ff1493]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {visited[item.key] && (
                      <span className="text-[#22c55e] text-xs">✓</span>
                    )}
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: ABOUT ME */}
        {/* ========================================================= */}
        {activeScene === 'about' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ABOUT
                <span className="text-[#ff9900] text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Me
                </span>
              </h2>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed mb-3 drop-shadow">
              Hey, I'm Navi Raj. A full-stack developer, designer and AI creator who builds digital experiences that aren't just functional — they're memorable.
            </p>

            <div className="space-y-1 mb-3">
              <div className="bg-black/60 border border-white/10 rounded px-2.5 py-1 flex items-center gap-2 backdrop-blur-md">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={10} />
                </div>
                <div>
                  <div className="text-[8px] font-mono text-cyan-400 font-bold uppercase">AGE / DEGREE</div>
                  <div className="text-[11px] font-semibold text-white">20 — 2nd year B.Tech AI & DS (2025–2029)</div>
                </div>
              </div>

              <div className="bg-black/60 border border-white/10 rounded px-2.5 py-1 flex items-center gap-2 backdrop-blur-md">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={10} />
                </div>
                <div>
                  <div className="text-[8px] font-mono text-cyan-400 font-bold uppercase">LOCATION</div>
                  <div className="text-[11px] font-semibold text-white">Tamil Nadu, India</div>
                </div>
              </div>

              <div className="bg-black/60 border border-white/10 rounded px-2.5 py-1 flex items-center gap-2 backdrop-blur-md">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Plus size={10} />
                </div>
                <div>
                  <div className="text-[8px] font-mono text-cyan-400 font-bold uppercase">STATUS</div>
                  <div className="text-[11px] font-semibold text-white">Building my dreams</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => switchScene('experience')}
                className="px-3 py-1.5 bg-[#ff6600] hover:bg-[#ff7711] text-white font-bold rounded text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-lg transition-colors cursor-pointer"
              >
                VIEW JOURNEY <ChevronRight size={12} />
              </button>
              <button 
                onClick={() => switchScene('menu')}
                className="px-2.5 py-1.5 bg-black/60 text-gray-300 hover:text-white rounded text-[11px] font-mono border border-white/20 transition-colors cursor-pointer"
              >
                [ESC] MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: SKILLS UNLOCKED */}
        {/* ========================================================= */}
        {activeScene === 'skills' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="flex justify-between items-end mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                SKILLS
                <span className="text-cyan-400 text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Unlocked
                </span>
              </h2>

              <button 
                onClick={() => setIsWheelOpen(true)}
                className="text-[9px] font-mono text-pink-400 hover:text-pink-300 underline uppercase"
              >
                [LOADOUT]
              </button>
            </div>

            <div className="flex gap-1 mb-2 text-[8px] font-mono font-bold">
              {['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'AI / DS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategory(cat)}
                  className={`px-1.5 py-0.5 rounded-xs transition-colors ${
                    skillCategory === cat 
                      ? 'bg-[#ff1493] text-white' 
                      : 'bg-black/60 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 bg-black/60 backdrop-blur-md p-2.5 rounded border border-white/10 max-h-[30vh] overflow-y-auto custom-scroll">
              {filteredSkills.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-24 text-[10px] font-bold text-gray-200 tracking-wider font-mono uppercase truncate">
                    {s.name}
                  </div>
                  <div className="flex-1 h-2 bg-black/70 rounded-xs overflow-hidden border border-white/15">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#ff9900] via-[#ff6600] to-[#00f0ff] rounded-xs"
                    />
                  </div>
                  <div className="w-6 text-right text-[10px] font-mono text-cyan-400 font-bold">
                    {s.pct}%
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="mt-2 text-[10px] font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4: EXPERIENCE */}
        {/* ========================================================= */}
        {activeScene === 'experience' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                EXPERIENCE
                <span className="text-[#a855f7] text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Journey
                </span>
              </h2>
            </div>

            <div className="space-y-2 bg-black/60 backdrop-blur-md p-3 rounded border border-white/10">
              <div className="relative pl-2.5 border-l-2 border-cyan-400">
                <div className="text-[9px] font-mono text-cyan-400 font-bold">2025 — PRESENT</div>
                <div className="text-xs font-bold text-white">Full Stack & AI Engineer</div>
                <p className="text-[10px] text-gray-400 mt-0.5">Scalable web apps, microservices & machine learning models.</p>
              </div>

              <div className="relative pl-2.5 border-l-2 border-pink-500">
                <div className="text-[9px] font-mono text-pink-400 font-bold">2024 — 2025</div>
                <div className="text-xs font-bold text-white">Frontend & UI Systems Developer</div>
                <p className="text-[10px] text-gray-400 mt-0.5">High-fidelity interfaces using React, Tailwind & Canvas.</p>
              </div>
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="mt-2 text-[10px] font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 5: ACHIEVEMENTS */}
        {/* ========================================================= */}
        {activeScene === 'achievements' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ACHIEVEMENTS
                <span className="text-[#ff1493] text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Unlocked
                </span>
              </h2>
            </div>

            <div className="space-y-1.5 mb-2">
              {[
                { title: 'FIRST PRODUCTION BUILD', desc: 'Shipped full-stack applications with zero downtime' },
                { title: 'FULL-STACK MASTERY', desc: 'Architected end-to-end client, server & databases' },
                { title: 'AI MODEL PIPELINES', desc: 'Integrated machine learning inference into interactive interfaces' },
              ].map((a, i) => (
                <div key={i} className="bg-black/60 border border-white/10 rounded px-2.5 py-1 flex items-center gap-2 backdrop-blur-md">
                  <div className="w-3.5 h-3.5 rounded bg-pink-500/20 border border-pink-500 flex items-center justify-center text-pink-400 text-[10px] font-bold">
                    +
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white tracking-wider uppercase">{a.title}</div>
                    <div className="text-[9px] text-gray-400">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="text-[10px] font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 6: ACADEMY */}
        {/* ========================================================= */}
        {activeScene === 'academy' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                ACADEMY
                <span className="text-[#ff9900] text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  AI & DS
                </span>
              </h2>
            </div>

            <p className="text-gray-300 text-xs leading-relaxed mb-3 drop-shadow">
              Pursuing B.Tech in Artificial Intelligence & Data Science (Batch 2025 – 2029).
            </p>

            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <div className="bg-black/60 border border-white/10 p-2 rounded text-center backdrop-blur-md">
                <div className="text-lg font-black text-pink-400" style={{ fontFamily: "'Impact', sans-serif" }}>2nd</div>
                <div className="text-[8px] font-mono text-gray-400 uppercase">YEAR STATUS</div>
              </div>
              <div className="bg-black/60 border border-white/10 p-2 rounded text-center backdrop-blur-md">
                <div className="text-lg font-black text-cyan-400" style={{ fontFamily: "'Impact', sans-serif" }}>2029</div>
                <div className="text-[8px] font-mono text-gray-400 uppercase">BATCH</div>
              </div>
              <div className="bg-black/60 border border-white/10 p-2 rounded text-center backdrop-blur-md">
                <div className="text-lg font-black text-amber-400" style={{ fontFamily: "'Impact', sans-serif" }}>AI & DS</div>
                <div className="text-[8px] font-mono text-gray-400 uppercase">SPECIALIZATION</div>
              </div>
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="text-[10px] font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 7: CONTACT */}
        {/* ========================================================= */}
        {activeScene === 'contact' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                CONTACT
                <span className="text-cyan-400 text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Let's Connect
                </span>
              </h2>
            </div>

            <div className="space-y-1.5 mb-3 bg-black/60 backdrop-blur-md p-3 rounded border border-white/10">
              {/* Clickable Email */}
              <a 
                href="mailto:naveenraj7756@gmail.com" 
                className="flex items-center gap-2.5 p-1 rounded hover:bg-white/5 transition-colors group"
              >
                <Mail size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase">EMAIL</div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">naveenraj7756@gmail.com</div>
                </div>
              </a>

              {/* Clickable GitHub with direct link to their account */}
              <a 
                href="https://github.com/naviixraj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-1 rounded hover:bg-white/5 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                </svg>
                <div>
                  <div className="text-[9px] font-mono text-pink-400 font-bold uppercase">GITHUB ID</div>
                  <div className="text-xs font-bold text-white group-hover:text-pink-300 flex items-center gap-1">
                    github.com/naviixraj
                    <span className="text-[10px] text-gray-400 font-mono">↗</span>
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-2.5 p-1">
                <MapPin size={13} className="text-emerald-400" />
                <div>
                  <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase">LOCATION</div>
                  <div className="text-xs font-bold text-white">Tamil Nadu, India</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="mailto:naveenraj7756@gmail.com"
                className="px-3 py-1.5 bg-[#0088ff] hover:bg-[#0077ee] text-white font-bold rounded text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                SEND EMAIL <ChevronRight size={12} />
              </a>
              <button 
                onClick={() => switchScene('menu')}
                className="text-[10px] font-mono text-gray-400 hover:text-white"
              >
                [ESC] MENU
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 8: PROJECTS */}
        {/* ========================================================= */}
        {activeScene === 'projects' && (
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <div className="mb-1.5">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
                PROJECTS
                <span className="text-[#ff2a85] text-2xl font-serif italic" style={{ fontFamily: "'Brush Script MT', cursive" }}>
                  Shipped
                </span>
              </h2>
            </div>

            <div className="space-y-1.5 bg-black/60 backdrop-blur-md p-2.5 rounded border border-white/10 max-h-[30vh] overflow-y-auto custom-scroll">
              {[
                { title: 'AI Predictive Intelligence Platform', desc: 'React, Python, FastAPI & Machine Learning.' },
                { title: 'GTA VI Interactive Web Experience', desc: 'Real GTA Map Radar, 3D Parallax & Audio.' },
                { title: 'Smart Financial Ledger System', desc: 'Next.js, PostgreSQL & Prisma engine.' },
              ].map((p, idx) => (
                <div key={idx} className="border-b border-white/10 pb-1.5 last:border-b-0">
                  <div className="text-[8px] font-mono text-pink-400">MISSION #{idx + 1}</div>
                  <div className="text-[11px] font-bold text-white">{p.title}</div>
                  <p className="text-[9px] text-gray-400">{p.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="mt-2 text-[10px] font-mono text-gray-400 hover:text-white"
            >
              [ESC] BACK TO MENU
            </button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 9: EXIT GAME */}
        {/* ========================================================= */}
        {activeScene === 'exit' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
          >
            <div className="text-[9px] font-mono text-gray-400 tracking-widest uppercase mb-0.5">
              THANK YOU FOR VISITING
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none" style={{ fontFamily: "'Impact', sans-serif" }}>
              MISSION COMPLETE
            </h2>
            <div className="text-xl text-[#ff2a85] font-serif italic mb-3" style={{ fontFamily: "'Brush Script MT', cursive" }}>
              See you soon!
            </div>

            <button 
              onClick={() => switchScene('menu')}
              className="px-4 py-1.5 bg-black/60 border border-white/20 hover:bg-black/80 text-white font-bold rounded text-[10px] uppercase tracking-wider cursor-pointer"
            >
              &lt; BACK TO HOME
            </button>
          </motion.div>
        )}

      </div>

      {/* ========================================================= */}
      {/* BOTTOM-LEFT: COMPACT MINIMAP RADAR (Never touches the menu!) */}
      {/* ========================================================= */}
      <div className="absolute bottom-5 left-7 md:bottom-7 md:left-10 z-30 pointer-events-none">
        <MinimapRadar 
          activeScene={activeScene}
          objective={objectives[activeScene]} 
          location={locations[activeScene]} 
        />
      </div>

      {/* GTA Interactive Tactical Weapon Wheel */}
      <WeaponWheel 
        isOpen={isWheelOpen} 
        onClose={() => setIsWheelOpen(false)}
        onSelectWeapon={(w) => {
          setIsWheelOpen(false);
          switchScene('skills');
          const cat = ((w?.cat || w?.name || '') + '').toUpperCase();
          if (cat.includes('FRAMEWORK') || cat.includes('MOTION') || cat.includes('SCROLL') || cat.includes('SCRUBBING') || cat.includes('DESIGN') || cat.includes('ASTRO') || cat.includes('GSAP') || cat.includes('LENIS') || cat.includes('CANVAS') || cat.includes('FIGMA')) {
            setSkillCategory('FRONTEND');
          } else if (cat.includes('BACKEND') || cat.includes('NODE')) {
            setSkillCategory('BACKEND');
          } else if (cat.includes('DATABASE') || cat.includes('SQL') || cat.includes('POSTGRES') || cat.includes('MONGO')) {
            setSkillCategory('DATABASE');
          } else if (cat.includes('AI') || cat.includes('ML') || cat.includes('PYTHON') || cat.includes('CINEMATICS') || cat.includes('3D') || cat.includes('BLENDER') || cat.includes('VEO')) {
            setSkillCategory('AI / DS');
          } else {
            setSkillCategory('ALL');
          }
        }}
      />
    </SceneViewport>
  );
}
