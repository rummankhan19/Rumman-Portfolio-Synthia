'use client'

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Database, Building2, GraduationCap, FlaskConical, Trophy, Radio,
  Terminal, Download, Github, Linkedin, Mail, Calendar, ArrowLeft,
  Wifi, Radar, Zap, Shield, Activity, ChevronRight, X, Play,
  Brain, LineChart, Flame, Globe2, Wallet, BookOpenCheck, Volume2, VolumeX,
} from 'lucide-react'

/* =============================================================================
   RUMMAN.OS  //  Neural Operating System v2.045.11
   A cinematic cyberpunk portfolio experience
============================================================================= */

// ---------------------- DATA ----------------------
const DISTRICTS = [
  {
    id: '01',
    key: 'identity',
    hotkey: 'I',
    name: 'Identity Core',
    subtitle: 'Central Neural Nexus',
    icon: Cpu,
    color: 'cyan',
    coord: 'GRID: 0451.02',
    tag: 'CORE',
    x: 50, y: 45,
  },
  {
    id: '02',
    key: 'education',
    hotkey: 'E',
    name: 'Education Nexus',
    subtitle: 'Academy Sector',
    icon: GraduationCap,
    color: 'purple',
    coord: 'GRID: 1289.14',
    tag: 'ACADEMIC',
    x: 22, y: 62,
  },
  {
    id: '03',
    key: 'corporate',
    hotkey: 'C',
    name: 'Corporate Sector',
    subtitle: 'Skyscraper Row',
    icon: Building2,
    color: 'cyan',
    coord: 'GRID: 4471.08',
    tag: 'INDUSTRY',
    x: 72, y: 38,
  },
  {
    id: '04',
    key: 'data',
    hotkey: 'D',
    name: 'The Data Center',
    subtitle: 'Neural Substrate',
    icon: Database,
    color: 'blue',
    coord: 'GRID: 2210.99',
    tag: 'SYSTEMS',
    x: 80, y: 66,
  },
  {
    id: '05',
    key: 'research',
    hotkey: 'R',
    name: 'Research Lab',
    subtitle: 'Deep Learning Facility',
    icon: FlaskConical,
    color: 'purple',
    coord: 'GRID: 3390.55',
    tag: 'LABS',
    x: 28, y: 38,
  },
  {
    id: '06',
    key: 'achievements',
    hotkey: 'A',
    name: 'Achievement Tower',
    subtitle: 'Legacy Archive',
    icon: Trophy,
    color: 'orange',
    coord: 'GRID: 5001.77',
    tag: 'AWARDS',
    x: 88, y: 15,
  },
  {
    id: '07',
    key: 'contact',
    hotkey: 'M',
    name: 'Mission Control',
    subtitle: 'Uplink Terminal',
    icon: Radio,
    color: 'cyan',
    coord: 'GRID: 9999.00',
    tag: 'CONTACT',
    x: 50, y: 70,
  },
]

const SKILLS = [
  { name: 'Python', level: 92, cat: 'Language' },
  { name: 'SQL / PostgreSQL', level: 90, cat: 'Data' },
  { name: 'JavaScript', level: 82, cat: 'Language' },
  { name: 'Django', level: 85, cat: 'Backend' },
  { name: 'BERT / NLP', level: 88, cat: 'AI' },
  { name: 'TF-IDF + Logistic Regression', level: 90, cat: 'AI' },
  { name: 'Boosting / Trees', level: 84, cat: 'AI' },
  { name: 'Tableau', level: 86, cat: 'BI' },
  { name: 'Power Automate', level: 89, cat: 'Automation' },
  { name: 'Copilot Studio', level: 84, cat: 'Automation' },
  { name: 'Azure AI Foundry', level: 82, cat: 'Cloud AI' },
  { name: 'RPA Tools', level: 85, cat: 'Automation' },
  { name: 'REST APIs', level: 87, cat: 'Backend' },
  { name: 'HTML / CSS / Bootstrap', level: 88, cat: 'Frontend' },
  { name: 'Figma', level: 78, cat: 'Design' },
  { name: 'Penetration Testing (Hashcat)', level: 72, cat: 'Security' },
]

const CORPORATES = [
  {
    name: 'Kotak Mahindra Tower',
    role: 'Automation Intern',
    period: 'Jul 2026 — Aug 2026',
    color: '#00d1ff',
    accent: 'from-cyan-400 to-blue-500',
    story: 'Deployed inside one of India\u2019s largest financial institutions to accelerate digital transformation. Architected end-to-end business process automations using Power Automate, Copilot Studio, Azure AI Foundry and RPA tools. Translated messy operational workflows into crisp BRDs, SOPs and process maps, and shipped AI-driven POCs that leadership could actually deploy.',
    kpis: [
      { label: 'Automation POCs', value: 'Multiple' },
      { label: 'Docs Produced', value: 'BRD · SOP · Maps' },
      { label: 'Stakeholders', value: 'Biz · RTA · Vendor' },
    ],
    stack: ['Power Automate', 'Copilot Studio', 'Azure AI Foundry', 'RPA', 'Dashboards'],
  },
  {
    name: 'FireAI Tower',
    role: 'AI Business Analyst Intern',
    period: 'Feb 2026 — Jun 2026',
    color: '#ff5a1f',
    accent: 'from-orange-500 to-red-500',
    story: 'Turned raw business requirements into decision-grade intelligence. Built KPI dashboards and analyzed datasets across SQL (PostgreSQL), Tally Prime, Excel and Google Sheets \u2014 tightening reporting cycles and lifting the signal-to-noise ratio for stakeholders. AI was the tool, business impact was the target.',
    kpis: [
      { label: 'Reporting Speed', value: '↑ Higher' },
      { label: 'Data Sources', value: '4 Systems' },
      { label: 'Focus', value: 'KPI · Insight' },
    ],
    stack: ['SQL', 'PostgreSQL', 'Tally Prime', 'Excel', 'Google Sheets', 'BI Dashboards'],
  },
  {
    name: 'Bluestock Tower',
    role: 'Software Development Engineer',
    period: 'Nov 2024 — Dec 2024',
    color: '#b537f2',
    accent: 'from-fuchsia-500 to-purple-600',
    story: 'Shipped a production-grade IPO web application at fintech-startup velocity. Django backend, REST APIs, PostgreSQL data layer, responsive frontend, and downloadable RHP/DRHP prospectus PDFs \u2014 delivered as a single coherent product that improved data retrieval efficiency by 20%.',
    kpis: [
      { label: 'Data Retrieval', value: '+20%' },
      { label: 'Stack Layers', value: 'Full-Stack' },
      { label: 'Docs Enabled', value: 'RHP · DRHP' },
    ],
    stack: ['Django', 'REST APIs', 'PostgreSQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
  },
  {
    name: 'Reliance Smart Money Tower',
    role: 'Software Tester Intern',
    period: 'Aug 2022 — Nov 2022',
    color: '#00f0ff',
    accent: 'from-cyan-300 to-teal-500',
    story: 'Cut teeth on production reliability. Ran deep software testing cycles, isolated critical bugs, and partnered with developers to harden the platform \u2014 an early lesson in the discipline of shipping stable, user-trusted products.',
    kpis: [
      { label: 'Bugs Isolated', value: 'Critical' },
      { label: 'Dev Cycles', value: 'Iterative' },
      { label: 'Domain', value: 'FinTech' },
    ],
    stack: ['Manual QA', 'Test Cases', 'Bug Triage', 'Collaboration'],
  },
]

const RESEARCH = [
  {
    icon: Brain,
    title: 'Emotion Detection from Movie Reviews',
    tag: 'NLP // BERT // Aug \u2013 Nov 2025',
    color: 'from-fuchsia-500 to-cyan-400',
    story: 'Built an end-to-end NLP emotion detection pipeline on movie reviews. Benchmarked classical vs. deep learning: TF-IDF + Logistic Regression achieved 88% accuracy, while a fine-tuned BERT model pushed it to 92%. Delivered as a research-grade classifier with a clean evaluation harness.',
    demo: 'INPUT > "the ending shattered me in the best way"  \u2192  EMOTION > joy · nostalgia  (BERT 0.92)',
  },
  {
    icon: Flame,
    title: 'Wildfire Prediction Model',
    tag: 'GEOSPATIAL // ML // Jul \u2013 Nov 2024',
    color: 'from-orange-500 to-red-600',
    story: 'Fused historical fire records with satellite data and climate factors into an ML pipeline using Boosting and Tree ensembles. Shipped a map-based dashboard with automated alerts for high-risk zones \u2014 built for public-safety early warning.',
    demo: 'REGION > sector 07  \u2192  RISK CLASS > HIGH  \u2192  DASHBOARD > map + auto-alert',
  },
  {
    icon: Wallet,
    title: 'Vaultwise \u2014 Budget Management Platform',
    tag: 'FINTECH // FULL-STACK // Jul \u2013 Nov 2024',
    color: 'from-cyan-400 to-blue-600',
    story: 'A financial planning tool with real-time spending analysis, investment simulation and embedded educational resources. Recognised with a 3rd place win at a Design Thinking Competition \u2014 shipped user-first, business-aware, and technically clean.',
    demo: 'MODULE > cashflow  ·  simulator  ·  learn   //   AWARD > \ud83e\udd49 3rd @ Design Thinking Comp.',
  },
  {
    icon: BookOpenCheck,
    title: 'RegradED \u2014 Personalized Learning',
    tag: 'EDTECH // PRODUCT // Jan \u2013 May 2024',
    color: 'from-purple-500 to-fuchsia-500',
    story: 'Founded and led a personalized-learning venture from scratch. Owned platform development, market research, GTM strategy and brand visibility. Turned an idea into a live, positioned product \u2014 the founder-mode reps that make every future product better.',
    demo: 'ROLE > product · strategy · brand   //   OUTCOME > platform shipped + positioning secured',
  },
]

const ACHIEVEMENTS = [
  { title: 'Goldman Sachs · Governance Analyst', sub: 'Simulation Program via Forage \u2014 governance & risk decision framework', tag: 'FINANCE' },
  { title: 'AI/ML Bootcamp', sub: 'IIM Bangalore \u2014 intensive fellowship in applied machine learning', tag: 'AI' },
  { title: 'Web Development Bootcamp', sub: 'IIT Bombay \u2014 full-stack development certification', tag: 'DEV' },
  { title: 'Head of Operations', sub: 'Startup Investor Conclave \u2014 led cross-functional ops team end-to-end', tag: 'LEADERSHIP' },
  { title: '3rd Place \u2014 Design Thinking Competition', sub: 'Awarded for Vaultwise: financial planning + investment simulation platform', tag: 'HACK' },
  { title: 'Pagmark Foundation', sub: 'Community work in wildlife conservation \u2014 tech + storytelling for impact', tag: 'IMPACT' },
]

const EDUCATION = [
  {
    year: 'Aug 2022 — May 2026',
    school: 'Mukesh Patel School of Technology Management & Engineering',
    degree: 'B.Tech, Computer Science & Business Studies',
    focus: 'Mumbai, India • GPA 2.95 / 4.0',
    note: 'A hybrid degree engineered for the intersection of code and commerce \u2014 building the exact multi-lingual skillset that AI product roles now demand.',
  },
  {
    year: 'May 2021 — May 2022',
    school: 'Modern Senior Secondary School',
    degree: '12th Grade (Higher Secondary)',
    focus: 'Kota, India',
    note: 'Foundation in mathematics and computing that seeded everything after.',
  },
  {
    year: 'Jun 2019 — Jun 2020',
    school: 'Modern Senior Secondary School',
    degree: '10th Grade (Secondary)',
    focus: 'Kota, India',
    note: 'First formal contact with computer science \u2014 the point where the trajectory locked in.',
  },
]

const IDENTITY = {
  name: 'RUMMAN KHAN',
  callsign: 'OPERATOR // RK-01 · MUMBAI, INDIA',
  status: 'ONLINE',
  titles: [
    'AI Business Analyst',
    'Automation Engineer',
    'Machine Learning Developer',
    'Product Thinker',
    'AI Enthusiast',
    'Business + Technology Problem Solver',
  ],
  bio: 'Product-focused technologist working at the intersection of AI/ML, data analytics and full-stack engineering. I turn ambiguous user and business needs into deployable systems \u2014 KPI dashboards that decision-makers actually watch, ML pipelines that ship past the demo, and web products that scale. Built inside Kotak Mahindra Bank, FireAI, Bluestock Fintech and Reliance Smart Money \u2014 always with a practical, user-first approach.',
}

// ---------------------- MOBILE CITY VIEW ----------------------
function MobileCityView({ onEnter }) {
  return (
    <motion.div
      key="mobile-city"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <CityBackdrop />
      </div>

      {/* Foreground scrollable content */}
      <div className="relative z-20 pt-20 pb-32 px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-mono text-[9px] tracking-[0.3em] text-cyan-400/80 mb-1"
          >
            [ NEO-CITY // SECTOR 0451 ]
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
            className="font-display font-black text-4xl xs:text-5xl neon-text glitch"
            data-text="SYNTHIA"
          >
            SYNTHIA
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="h-[1px] mt-2 mx-auto w-28"
            style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, #b537f2, transparent)' }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
            className="font-body italic text-fuchsia-200/90 text-sm mt-2 tracking-wide px-3"
          >
            A Fake Paradise Run By Artificial Minds.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="font-mono text-[9px] text-cyan-300/70 mt-2 tracking-[0.25em] uppercase"
          >
            &mdash; Built by Rumman Khan &mdash;
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="glass-dark px-3 py-2 clip-notch-sm mx-auto w-fit mb-5"
        >
          <span className="font-mono text-[9px] text-cyan-300/80 tracking-wider">TAP A DISTRICT TO ENTER</span>
        </motion.div>

        {/* District cards */}
        <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
          {DISTRICTS.map((d, i) => {
            const Icon = d.icon
            const colorMap = {
              cyan: { text: 'text-cyan-200', ring: 'border-cyan-400/70', bg: 'from-cyan-500/15 to-cyan-500/5', glow: 'rgba(0,240,255,0.35)' },
              purple: { text: 'text-fuchsia-200', ring: 'border-fuchsia-400/70', bg: 'from-fuchsia-500/15 to-fuchsia-500/5', glow: 'rgba(181,55,242,0.35)' },
              blue: { text: 'text-blue-200', ring: 'border-blue-400/70', bg: 'from-blue-500/15 to-blue-500/5', glow: 'rgba(0,128,255,0.35)' },
              orange: { text: 'text-orange-200', ring: 'border-orange-400/70', bg: 'from-orange-500/15 to-orange-500/5', glow: 'rgba(255,138,26,0.35)' },
            }
            const c = colorMap[d.color] || colorMap.cyan
            return (
              <motion.button
                key={d.id}
                onClick={() => onEnter(d)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.07 }}
                className={`glass-dark clip-notch p-3 flex items-center gap-3 text-left border ${c.ring} active:scale-[0.98] transition relative overflow-hidden`}
                style={{ boxShadow: `0 0 20px ${c.glow}` }}
              >
                {/* Bg accent */}
                <div className={`absolute inset-0 bg-gradient-to-r ${c.bg} opacity-60 pointer-events-none`} />
                <div className="absolute top-0 left-0 h-full w-1"
                  style={{ background: `linear-gradient(180deg, ${c.glow}, transparent)` }} />

                {/* Icon */}
                <div className={`relative w-12 h-12 clip-hex flex items-center justify-center flex-shrink-0 border-2 ${c.ring}`}
                  style={{ boxShadow: `0 0 12px ${c.glow}, inset 0 0 12px ${c.glow}` }}
                >
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 relative">
                  <div className={`font-mono text-[9px] ${c.text} opacity-70`}>{d.tag} // {d.id}</div>
                  <div className={`font-display font-bold text-base ${c.text} truncate`}>{d.name}</div>
                  <div className="font-body text-[11px] text-cyan-100/60 truncate">{d.subtitle}</div>
                </div>

                {/* Hotkey badge (decorative on mobile) */}
                <div className={`hidden xs:flex font-display font-black text-[11px] w-6 h-6 items-center justify-center ${c.text} border ${c.ring} bg-black/60 clip-notch-sm flex-shrink-0`}>
                  {d.hotkey}
                </div>

                <ChevronRight className={`w-4 h-4 ${c.text} flex-shrink-0 opacity-70`} />
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------- HOOKS ----------------------
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    window.addEventListener('orientationchange', check)
    return () => {
      window.removeEventListener('resize', check)
      window.removeEventListener('orientationchange', check)
    }
  }, [breakpoint])
  return isMobile
}

// ---------------------- SUB-COMPONENTS ----------------------

function RainLayer({ count = 60 }) {
  const drops = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    dur: 0.6 + Math.random() * 1.2,
    op: 0.3 + Math.random() * 0.5,
    h: 40 + Math.random() * 80,
  })), [count])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[6]">
      {drops.map((d, i) => (
        <div key={i} className="rain-drop" style={{
          left: `${d.left}%`,
          animationDelay: `${d.delay}s`,
          animationDuration: `${d.dur}s`,
          opacity: d.op,
          height: `${d.h}px`,
        }} />
      ))}
    </div>
  )
}

function Particles({ count = 40 }) {
  const parts = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    top: 40 + Math.random() * 60,
    dx: (Math.random() - 0.5) * 120 + 'px',
    dy: -(60 + Math.random() * 160) + 'px',
    delay: Math.random() * 6,
    dur: 4 + Math.random() * 6,
    color: Math.random() > 0.6 ? '#b537f2' : '#00f0ff',
    size: 1 + Math.random() * 3,
  })), [count])
  return (
    <div className="absolute inset-0 pointer-events-none z-[7]">
      {parts.map((p, i) => (
        <span key={i} className="particle" style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          '--dx': p.dx,
          '--dy': p.dy,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          background: p.color,
          boxShadow: `0 0 8px ${p.color}, 0 0 14px ${p.color}`,
          width: `${p.size}px`,
          height: `${p.size}px`,
        }} />
      ))}
    </div>
  )
}

function FlyingVehicle({ top = '30%', delay = 0, dur = 18, color = '#00f0ff' }) {
  return (
    <div className="flying-vehicle" style={{ top, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}>
      <div className="flex items-center gap-1">
        <div className="w-6 h-[3px] rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}, 0 0 14px ${color}` }} />
        <div className="w-1 h-1 rounded-full" style={{ background: '#fff', boxShadow: `0 0 6px #fff` }} />
        <div className="w-16 h-[1px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.6 }} />
      </div>
    </div>
  )
}

function CityBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden city-bg">
      {/* Distant skyline */}
      <svg viewBox="0 0 1600 500" className="absolute bottom-0 left-0 w-full h-[70%] opacity-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0d18" />
            <stop offset="100%" stopColor="#1a0f2a" />
          </linearGradient>
        </defs>
        {/* far buildings */}
        {Array.from({ length: 40 }).map((_, i) => {
          const w = 20 + (i * 37) % 40
          const h = 80 + (i * 71) % 220
          const x = i * 42
          return (
            <g key={i}>
              <rect x={x} y={500 - h} width={w} height={h} fill="url(#sky-far)" />
              {Array.from({ length: Math.floor(h / 20) }).map((_, j) => (
                <rect key={j} x={x + 4} y={500 - h + 8 + j * 18} width={w - 8} height={6}
                  fill={j % 3 === 0 ? '#00f0ff' : (j % 4 === 0 ? '#b537f2' : '#0080ff')}
                  opacity={0.15 + ((i + j) % 4) * 0.12} />
              ))}
            </g>
          )
        })}
      </svg>

      {/* Mid skyline */}
      <svg viewBox="0 0 1600 500" className="absolute bottom-0 left-0 w-full h-[55%] opacity-70" preserveAspectRatio="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const w = 45 + (i * 53) % 65
          const h = 180 + (i * 91) % 280
          const x = i * 72
          return (
            <g key={i}>
              <rect x={x} y={500 - h} width={w} height={h} fill="#05070c" stroke="#00f0ff" strokeOpacity="0.15" />
              {/* antennae */}
              {i % 3 === 0 && <rect x={x + w / 2 - 1} y={500 - h - 30} width="2" height="30" fill="#00f0ff" opacity="0.5" />}
              {i % 3 === 0 && <circle cx={x + w / 2} cy={500 - h - 30} r="2" fill="#ff2bd6">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
              </circle>}
              {/* windows */}
              {Array.from({ length: Math.floor(h / 22) }).map((_, j) => (
                Array.from({ length: Math.floor(w / 12) }).map((_, k) => {
                  const seed = (i * 13 + j * 7 + k * 17) % 100
                  return (
                    <rect key={`${j}-${k}`} x={x + 5 + k * 12} y={500 - h + 12 + j * 22} width="6" height="10"
                      fill={seed % 7 === 0 ? '#ff2bd6' : (seed % 5 === 0 ? '#b537f2' : '#00f0ff')}
                      opacity={seed % 4 === 0 ? 0.9 : 0.35} />
                  )
                })
              ))}
            </g>
          )
        })}
      </svg>

      {/* Near foreground silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent z-[3]" />

      {/* Glowing horizon line */}
      <div className="absolute bottom-[45%] left-0 right-0 h-[1px] z-[2]" style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.6), rgba(181,55,242,0.6), transparent)'
      }} />

      {/* Perspective floor grid */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[2]">
        <div className="cyber-grid-perspective w-full h-full" />
      </div>

      {/* Volumetric fog */}
      <div className="absolute inset-0 z-[4]" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,240,255,0.12), transparent 70%)',
        filter: 'blur(20px)',
      }} />
      <div className="absolute inset-0 z-[4]" style={{
        background: 'radial-gradient(ellipse at 20% 90%, rgba(181,55,242,0.18), transparent 60%)',
        filter: 'blur(30px)',
      }} />

      {/* Flying vehicles */}
      <FlyingVehicle top="18%" delay={0} dur={22} color="#00f0ff" />
      <FlyingVehicle top="28%" delay={7} dur={26} color="#ff2bd6" />
      <FlyingVehicle top="12%" delay={13} dur={30} color="#b537f2" />
      <FlyingVehicle top="35%" delay={4} dur={24} color="#0080ff" />

      {/* Digital billboards */}
      <div className="absolute top-[35%] left-[8%] z-[3] hidden md:block">
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.5, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="glass px-3 py-1 clip-notch-sm">
          <div className="font-mono text-[10px] text-cyan-300">NEO-TOKYO // 04:32</div>
        </motion.div>
      </div>
      <div className="absolute top-[22%] right-[10%] z-[3] hidden md:block">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.6, 1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="glass px-3 py-1 clip-notch-sm border border-fuchsia-400/50">
          <div className="font-mono text-[10px] text-fuchsia-300">RUMMAN.OS ● LIVE</div>
        </motion.div>
      </div>

      {/* Rain + particles */}
      <RainLayer count={80} />
      <Particles count={45} />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-[8]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[9]" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)'
      }} />
    </div>
  )
}

// ---------------------- BOOT SEQUENCE ----------------------
const BOOT_LINES = [
  { t: 'RUMMAN.OS BOOT LOADER v2.045.11', d: 250 },
  { t: '> POWER: STABLE // 220v NEURAL BUS', d: 220 },
  { t: '> INITIALIZING KERNEL...........[ OK ]', d: 260 },
  { t: '> MOUNTING /dev/neural0.........[ OK ]', d: 220 },
  { t: '> LOADING CORTEX SUBSYSTEMS.....[ OK ]', d: 240 },
  { t: '> ESTABLISHING UPLINK: hyper-net// [ HANDSHAKE ]', d: 260 },
  { t: '> SCANNING VISITOR BIOMETRICS...', d: 260 },
  { t: '> IDENTITY VERIFIED: GUEST // CLEARANCE-3', d: 240 },
  { t: '> DECRYPTING PORTFOLIO CORE.....[ OK ]', d: 240 },
  { t: '> CONNECTING TO NEURAL NETWORK..[ OK ]', d: 240 },
  { t: '', d: 100 },
  { t: '>> ACCESS GRANTED', d: 400, hi: true },
  { t: '>> WELCOME, OPERATOR.', d: 500, hi: true },
]

function BootSequence({ onFinish }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [phase, setPhase] = useState('boot') // boot -> title -> zoom
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    let cancelled = false
    let idx = 0
    const run = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return
        await new Promise(r => setTimeout(r, BOOT_LINES[i].d))
        if (cancelled) return
        setVisibleLines(prev => [...prev, BOOT_LINES[i]])
      }
      await new Promise(r => setTimeout(r, 500))
      if (!cancelled) setPhase('title')
      await new Promise(r => setTimeout(r, 3200))
      if (!cancelled) setPhase('zoom')
      await new Promise(r => setTimeout(r, 1600))
      if (!cancelled) onFinish()
    }
    run()
    return () => { cancelled = true }
  }, [onFinish])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onFinish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onFinish])

  return (
    <motion.div
      key="boot"
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* subtle background grid */}
      <div className="absolute inset-0 cyber-grid-sm opacity-30" />
      <div className="absolute inset-0 scanlines" />

      {/* skip hint */}
      <div className="absolute top-6 right-6 font-mono text-xs text-cyan-400/70 z-50">
        [ press SPACE to skip ]
      </div>

      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <motion.div
            key="term"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 w-full max-w-3xl px-6 sm:px-10"
          >
            <div className="glass-dark clip-notch p-6 sm:p-8 corner-brackets">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-400/20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#f00]" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#ff0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#0ff]" />
                <div className="ml-3 font-mono text-xs text-cyan-300/80">rumman.os //terminal</div>
              </div>
              <div className="font-mono text-[13px] sm:text-sm leading-relaxed min-h-[280px]">
                {visibleLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={l.hi ? 'text-fuchsia-300 neon-text-purple text-base sm:text-lg mt-2' : 'text-cyan-200'}
                  >
                    {l.t}
                  </motion.div>
                ))}
                <div className="term-cursor text-cyan-300" />
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs sm:text-sm text-cyan-400/80 mb-4"
            >
              [ NEURAL OPERATING SYSTEM ]
            </motion.div>
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl glitch neon-text"
              data-text="RUMMAN.OS">
              RUMMAN.OS
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-[2px] mt-4 mx-auto max-w-md"
              style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, #b537f2, transparent)' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="font-body mt-5 text-cyan-100/80 text-lg sm:text-xl tracking-widest uppercase"
            >
              Welcome, Operator
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="font-mono mt-8 text-xs text-fuchsia-300/70"
            >
              // engaging camera drop into city grid //
            </motion.div>
          </motion.div>
        )}

        {phase === 'zoom' && (
          <motion.div
            key="zoom"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            <div className="font-display font-black text-8xl neon-text">RUMMAN.OS</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ---------------------- MISSILE STRIKE OVERLAY ----------------------
function MissileStrike({ target, onImpact, onComplete }) {
  // Missile launches from bottom-right off-screen and arcs to target (x%, y%)
  const startX = 100 // vw
  const startY = 105 // vh
  const endX = target.x
  const endY = target.y

  // control point (arc apex) roughly midway, higher on screen
  const midX = (startX + endX) / 2 + 8
  const midY = Math.min(startY, endY) - 40

  // Compute rotation heuristic based on segment direction (start->end)
  const dx = endX - startX
  const dy = endY - startY
  const angleFinal = Math.atan2(dy, dx) * 180 / Math.PI

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {/* MISSILE */}
      <motion.div
        initial={{ left: `${startX}vw`, top: `${startY}vh`, opacity: 0 }}
        animate={{
          left: [`${startX}vw`, `${midX}vw`, `${endX}%`],
          top: [`${startY}vh`, `${midY}vh`, `${endY}%`],
          opacity: [0, 1, 1],
          rotate: [angleFinal - 30, angleFinal - 10, angleFinal],
        }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.6, 1], times: [0, 0.4, 1] }}
        onAnimationComplete={onImpact}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform, left, top' }}
      >
        {/* trail */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <div className="h-[2px] w-32 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,138,26,0.7), rgba(255,43,214,0.9))' }} />
          <div className="h-[6px] w-16 -ml-8 rounded-full blur-md"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,138,26,0.8), rgba(255,43,214,0.7))' }} />
        </div>
        {/* body */}
        <div className="relative flex items-center">
          <div className="w-8 h-1.5 rounded-sm"
            style={{ background: 'linear-gradient(90deg, #ff2bd6, #00f0ff)', boxShadow: '0 0 12px #00f0ff, 0 0 24px #ff2bd6' }} />
          <div className="w-2 h-2 -ml-1 rounded-full"
            style={{ background: '#fff', boxShadow: '0 0 12px #fff, 0 0 24px #00f0ff' }} />
        </div>
      </motion.div>

      {/* IMPACT / EXPLOSION at target */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${endX}%`, top: `${endY}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 1.6, times: [0, 0.55, 0.6, 0.85, 1] }}
        onAnimationComplete={onComplete}
      >
        {/* Shockwave rings */}
        {[0, 0.08, 0.16].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: [0, 6], opacity: [0.9, 0] }}
            transition={{ duration: 0.9, delay: 0.55 + delay, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2"
            style={{ borderColor: i === 0 ? '#ffb84a' : (i === 1 ? '#ff2bd6' : '#00f0ff'), boxShadow: '0 0 30px currentColor' }}
          />
        ))}
        {/* Core blast */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 3.5, 0] }}
          transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fff 0%, #ffb84a 20%, #ff2bd6 45%, transparent 75%)',
            filter: 'blur(2px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Sparks */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2
          const dist = 120 + (i % 3) * 40
          return (
            <motion.div
              key={`s${i}`}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: [1, 1, 0],
                scale: [1, 0.3],
              }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full"
              style={{ background: i % 2 === 0 ? '#00f0ff' : '#ff8a1a', boxShadow: '0 0 8px currentColor' }}
            />
          )
        })}
        {/* Screen flash */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.35, delay: 0.55 }}
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4), transparent 60%)' }}
        />
      </motion.div>
    </div>
  )
}

// ---------------------- MISSILE STRIKE OVERLAY ---------------------- (end)

// ---------------------- HUD ----------------------
function HUD({ current, onExit, timeStr, mapCollapsed, onToggleMap, isMobile }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="glass px-2.5 py-1.5 clip-notch-sm flex items-center gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-neon" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-cyan-200">SYNTHIA</span>
            <span className="hidden sm:inline font-mono text-[10px] text-cyan-400/70">v2.045.11</span>
          </div>
          <div className="hidden sm:flex glass px-3 py-1.5 clip-notch-sm items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-mono text-[10px] text-cyan-300/90">HYPER-NET // 12.4 Gb/s</span>
          </div>
          <div className="hidden md:flex glass px-3 py-1.5 clip-notch-sm items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-fuchsia-300" />
            <span className="font-mono text-[10px] text-fuchsia-200">CLEARANCE-3</span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:flex glass px-3 py-1.5 clip-notch-sm items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-mono text-[10px] text-cyan-200">CORE 42°C</span>
          </div>
          <div className="glass px-2.5 py-1.5 clip-notch-sm">
            <span className="font-mono text-[10px] sm:text-[11px] text-cyan-200">{timeStr}</span>
          </div>
        </div>
      </div>

      {/* Bottom-left mini map / radar (collapsible) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 pointer-events-auto">
        {mapCollapsed ? (
          <button
            onClick={onToggleMap}
            className="glass-dark w-11 h-11 sm:w-14 sm:h-14 clip-hex flex items-center justify-center hover:bg-cyan-500/10 transition relative overflow-hidden group"
            style={{ boxShadow: '0 0 16px rgba(0,240,255,0.35)' }}
            title="Open Mini-Map"
          >
            <Radar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 group-hover:rotate-45 transition-transform" />
            <div className="absolute inset-0 radar-sweep opacity-30 pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-fuchsia-400 pulse-neon" />
          </button>
        ) : (
          <div className="glass-dark p-3 clip-notch-sm relative overflow-hidden w-[170px] sm:w-[190px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-cyan-300/80">MINI-MAP</span>
              <button
                onClick={onToggleMap}
                className="text-cyan-300/80 hover:text-fuchsia-300 transition"
                title="Collapse Mini-Map"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative w-full h-[120px] sm:h-[140px] rounded-sm overflow-hidden border border-cyan-400/30 bg-black/50">
              <div className="absolute inset-0 cyber-grid-sm opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full radar-sweep opacity-40" />
              </div>
              {DISTRICTS.map(d => (
                <div key={d.id}
                  className={`absolute w-2 h-2 rounded-full ${current === d.key ? 'bg-fuchsia-400' : 'bg-cyan-400'}`}
                  style={{
                    left: `${d.x}%`, top: `${d.y}%`,
                    boxShadow: `0 0 6px ${current === d.key ? '#ff2bd6' : '#00f0ff'}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
            <div className="mt-2 font-mono text-[9px] text-cyan-400/60">
              {current ? `LOCATED: ${DISTRICTS.find(d => d.key === current)?.name}` : 'ROAMING // CITY GRID'}
            </div>
          </div>
        )}
      </div>

      {/* Bottom-right status — hidden on mobile to reduce clutter */}
      <div className="hidden sm:flex absolute bottom-4 right-4 pointer-events-auto flex-col gap-2 items-end">
        <div className="glass-dark px-3 py-2 clip-notch-sm flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-cyan-300" />
          <div className="font-mono text-[10px]">
            <div className="text-cyan-200">MISSION LOG</div>
            <div className="text-cyan-400/70">
              {current ? `> exploring ${DISTRICTS.find(d => d.key === current)?.name}` : '> select a district to enter'}
            </div>
          </div>
        </div>
        {current && (
          <button
            onClick={onExit}
            className="glass-dark px-3 py-2 clip-notch-sm flex items-center gap-2 hover:bg-fuchsia-500/10 transition-colors border-fuchsia-400/40"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-fuchsia-300" />
            <span className="font-mono text-[10px] text-fuchsia-200">EXIT DISTRICT [ESC]</span>
          </button>
        )}
      </div>

      {/* Center crosshair — desktop only, no active district */}
      {!current && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 opacity-40">
            <div className="absolute top-1/2 left-0 w-6 h-[1px] bg-cyan-400" />
            <div className="absolute top-1/2 right-0 w-6 h-[1px] bg-cyan-400" />
            <div className="absolute left-1/2 top-0 w-[1px] h-6 bg-cyan-400" />
            <div className="absolute left-1/2 bottom-0 w-[1px] h-6 bg-cyan-400" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#0ff]" />
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------- DISTRICT WAYPOINTS (on city view) ----------------------
function DistrictWaypoint({ district, onSelect, index }) {
  const Icon = district.icon
  const colorMap = {
    cyan: { ring: 'border-cyan-400', glow: '0 0 20px rgba(0,240,255,0.7), 0 0 60px rgba(0,240,255,0.35)', text: 'text-cyan-200', bg: 'bg-cyan-500/10' },
    purple: { ring: 'border-fuchsia-400', glow: '0 0 20px rgba(255,43,214,0.7), 0 0 60px rgba(181,55,242,0.35)', text: 'text-fuchsia-200', bg: 'bg-fuchsia-500/10' },
    blue: { ring: 'border-blue-400', glow: '0 0 20px rgba(0,128,255,0.7), 0 0 60px rgba(0,128,255,0.35)', text: 'text-blue-200', bg: 'bg-blue-500/10' },
    orange: { ring: 'border-orange-400', glow: '0 0 20px rgba(255,138,26,0.7), 0 0 60px rgba(255,138,26,0.35)', text: 'text-orange-200', bg: 'bg-orange-500/10' },
  }
  const c = colorMap[district.color] || colorMap.cyan

  return (
    <motion.button
      onClick={() => onSelect(district)}
      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
      style={{ left: `${district.x}%`, top: `${district.y}%` }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.08 }}
    >
      {/* pulsing ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border ${c.ring}`}
        animate={{ scale: [1, 1.8, 2.4], opacity: [0.7, 0.2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        style={{ width: 60, height: 60, top: -30, left: -30 }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full border ${c.ring}`}
        animate={{ scale: [1, 1.8, 2.4], opacity: [0.7, 0.2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
        style={{ width: 60, height: 60, top: -30, left: -30 }}
      />

      {/* main hex marker */}
      <div className={`relative w-[60px] h-[60px] flex items-center justify-center clip-hex ${c.bg} backdrop-blur-md border-2 ${c.ring}`}
        style={{ boxShadow: c.glow }}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>

      {/* label */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[68px] w-max opacity-90 group-hover:opacity-100 transition-opacity">
        <div className="glass px-2.5 py-1 clip-notch-sm text-center">
          <div className={`font-mono text-[9px] ${c.text}/80`}>{district.tag} // {district.id}</div>
          <div className={`font-display text-[11px] font-bold ${c.text} tracking-wider`}>{district.name}</div>
        </div>
        {/* KEYCAP */}
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <span className="font-mono text-[8px] text-cyan-400/60 tracking-widest">PRESS</span>
          <span className={`font-display font-black text-[11px] w-6 h-6 flex items-center justify-center ${c.text} border ${c.ring} bg-black/60 clip-notch-sm shadow-[0_0_10px_rgba(0,240,255,0.5)]`}>
            {district.hotkey}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

// ---------------------- CITY VIEW ----------------------
function CityView({ onEnter }) {
  return (
    <motion.div
      key="city"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-0 z-10"
    >
      <CityBackdrop />

      {/* Central title panel — contained, elegant */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center px-6 text-center pointer-events-none w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-mono text-[11px] tracking-[0.4em] text-cyan-400/80 mb-2"
        >
          [ N E O — C I T Y // S E C T O R  0 4 5 1 ]
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl neon-text glitch"
          data-text="SYNTHIA"
        >
          SYNTHIA
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.7 }}
          className="h-[1px] mt-3 w-40"
          style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, #b537f2, transparent)' }}
        />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="font-body italic text-fuchsia-200/90 text-base sm:text-lg mt-3 tracking-wide"
        >
          A Fake Paradise Run By Artificial Minds.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="font-mono text-[10px] text-cyan-300/70 mt-2 tracking-[0.3em] uppercase"
        >
          &mdash; Built by Rumman Khan &mdash;
        </motion.div>
      </div>

      {/* District waypoints */}
      <div className="absolute inset-0 z-20">
        {DISTRICTS.map((d, i) => (
          <DistrictWaypoint key={d.id} district={d} onSelect={onEnter} index={i} />
        ))}
      </div>

      {/* Bottom controls — compact hint bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="glass-dark px-4 py-2 clip-notch flex items-center gap-3 flex-wrap justify-center mx-auto w-fit"
        >
          <span className="font-mono text-[9px] text-cyan-300/80">CLICK WAYPOINT</span>
          <span className="w-[1px] h-3 bg-cyan-400/40" />
          <span className="font-mono text-[9px] text-fuchsia-300/80">PRESS <span className="text-fuchsia-200 font-bold">I · E · C · D · R · A · M</span> TO STRIKE</span>
          <span className="w-[1px] h-3 bg-cyan-400/40" />
          <span className="font-mono text-[9px] text-cyan-300/60">ESC EXIT</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ---------------------- DISTRICT PANEL WRAPPER ----------------------
function DistrictPanel({ district, children, onClose }) {
  const Icon = district.icon
  return (
    <motion.div
      key={district.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative min-h-full py-10 px-4 sm:px-8 max-w-7xl mx-auto"
      >
        {/* header */}
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 clip-hex flex items-center justify-center bg-cyan-500/10 border-2 border-cyan-400 neon-border">
              <Icon className="w-6 h-6 text-cyan-200" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-cyan-400/80">DISTRICT {district.id} // {district.coord}</div>
              <h2 className="font-display font-black text-2xl sm:text-4xl neon-text glitch"
                data-text={district.name}>{district.name}</h2>
              <div className="font-body text-fuchsia-200/80 text-sm mt-0.5">{district.subtitle}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="glass px-3 py-2 clip-notch-sm flex items-center gap-2 hover:bg-fuchsia-500/10 transition-colors border border-fuchsia-400/40"
          >
            <X className="w-4 h-4 text-fuchsia-200" />
            <span className="font-mono text-[10px] text-fuchsia-200">EXIT</span>
          </button>
        </div>

        {children}

        {/* footer separator */}
        <div className="mt-12 h-[1px] w-full opacity-40" style={{
          background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)'
        }} />
        <div className="mt-3 font-mono text-[10px] text-cyan-500/50 text-center">
          END OF SECTOR // RUMMAN.OS v2.045.11 // NEURAL-LINK STABLE
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------- DISTRICT CONTENT: IDENTITY CORE ----------------------
function DistrictIdentity() {
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Massive AI core */}
      <div className="lg:col-span-2 relative glass-dark clip-notch p-8 min-h-[520px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.2), transparent 60%)'
        }} />
        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[340px] h-[340px] rounded-full border border-cyan-400/40"
          style={{ boxShadow: 'inset 0 0 40px rgba(0,240,255,0.3)' }}
        />
        <motion.div
          animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[280px] h-[280px] rounded-full border border-fuchsia-400/40 border-dashed"
        />
        <motion.div
          animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[200px] h-[200px] rounded-full border-2 border-cyan-300/60"
        />
        {/* Core orb */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #b537f2, #00f0ff 55%, #05070c 90%)',
            boxShadow: '0 0 40px rgba(0,240,255,0.8), 0 0 90px rgba(181,55,242,0.6)'
          }}
        >
          <div className="absolute inset-0 rounded-full mix-blend-overlay" style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent 30%)'
          }} />
          <Cpu className="w-10 h-10 text-white relative z-10 drop-shadow-[0_0_10px_#0ff]" />
        </motion.div>

        {/* corner readouts */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-cyan-300/80">
          <div>NEURAL CORE</div>
          <div>UPTIME: 24y 08m</div>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-fuchsia-300/80 text-right">
          <div>STATUS: ACTIVE</div>
          <div className="flex items-center gap-1 justify-end">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-neon" />
            SYNCED
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-cyan-400/60 flex justify-between">
          <span>CLK: 4.6 GHz</span>
          <span>MEM: ∞</span>
          <span>THR: 128</span>
        </div>
      </div>

      {/* Identity dossier */}
      <div className="lg:col-span-3 space-y-4">
        <div className="glass-dark clip-notch p-6 corner-brackets relative overflow-hidden">
          <div className="font-mono text-[10px] text-cyan-400/80">// OPERATOR PROFILE //</div>
          <h3 className="font-display font-black text-3xl sm:text-5xl neon-text-purple mt-2 glitch" data-text={IDENTITY.name}>
            {IDENTITY.name}
          </h3>
          <div className="mt-1 font-mono text-xs text-fuchsia-300/80">{IDENTITY.callsign}</div>

          {/* Titles chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {IDENTITY.titles.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="glass px-3 py-1.5 clip-notch-sm"
              >
                <span className="font-body text-xs sm:text-sm text-cyan-100 tracking-wide">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="glass-dark clip-notch p-6 relative">
          <div className="font-mono text-[10px] text-cyan-400/80 mb-2">// TRANSMISSION LOG // DECRYPTED</div>
          <p className="font-body text-cyan-50/90 text-base sm:text-lg leading-relaxed">
            {IDENTITY.bio}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-mono text-[10px] text-cyan-400/60">voice-print: MATCH 99.7%</span>
          </div>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: 'INTERNSHIPS', v: '4' },
            { l: 'FLAGSHIP PROJECTS', v: '4' },
            { l: 'CERTIFICATIONS', v: '3' },
          ].map((x) => (
            <div key={x.l} className="glass clip-notch-sm p-3 text-center">
              <div className="font-display text-2xl font-black neon-text">{x.v}</div>
              <div className="font-mono text-[9px] text-cyan-400/70 mt-1">{x.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------- DISTRICT: EDUCATION ----------------------
function DistrictEducation() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 glass-dark clip-notch p-6 relative overflow-hidden">
        <div className="font-mono text-[10px] text-cyan-400/80">// ACADEMY CORE //</div>
        <h3 className="font-display text-2xl font-bold neon-text mt-2">Interactive Holo-Classroom</h3>
        <div className="mt-4 space-y-2 font-mono text-[11px]">
          <div className="flex justify-between text-cyan-200"><span>SUBJECTS</span><span>048</span></div>
          <div className="flex justify-between text-cyan-200"><span>CERTS</span><span>12</span></div>
          <div className="flex justify-between text-cyan-200"><span>SEMS COMPLETED</span><span>08</span></div>
          <div className="flex justify-between text-fuchsia-200"><span>RESEARCH PAPERS</span><span>02</span></div>
        </div>
        {/* holo animation */}
        <div className="mt-6 relative h-32 rounded-md border border-cyan-400/30 bg-black/40 overflow-hidden">
          <div className="absolute inset-0 cyber-grid-sm opacity-40" />
          <motion.div
            animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <GraduationCap className="w-20 h-20 text-fuchsia-300 drop-shadow-[0_0_20px_#b537f2]" />
          </motion.div>
          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-cyan-400/70">holo // classroom.render</div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="font-mono text-[10px] text-cyan-400/80">// EDUCATION TIMELINE //</div>
        {EDUCATION.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass-dark clip-notch p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-fuchsia-500" />
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <div className="font-mono text-[10px] text-fuchsia-300/80">{e.year}</div>
              <div className="font-mono text-[10px] text-cyan-400/70">NODE // {String(i + 1).padStart(2, '0')}</div>
            </div>
            <h4 className="font-display font-bold text-xl text-cyan-100">{e.school}</h4>
            <div className="font-body text-cyan-200/90 mt-1">{e.degree}</div>
            <div className="mt-2 font-mono text-[11px] text-fuchsia-200/80">{e.focus}</div>
            <div className="mt-3 font-body text-sm text-cyan-100/70">{e.note}</div>
          </motion.div>
        ))}

        {/* Future vision */}
        <div className="glass-dark clip-notch p-5 relative">
          <div className="font-mono text-[10px] text-fuchsia-400/80">// FUTURE VISION //</div>
          <p className="font-body text-cyan-50/90 mt-2">
            The next horizon: building applied AI systems that agentically orchestrate business workflows. Contributing to open research on trustworthy LLMs, and eventually shipping a product studio at the intersection of AI + finance + education.
          </p>
        </div>
      </div>
    </div>
  )
}

// ---------------------- DISTRICT: CORPORATE ----------------------
function CorporateTower({ tower, i, onOpen, active }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(i)}
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.12 }}
      className="relative group text-left focus:outline-none"
    >
      <div className={`glass-dark clip-notch p-5 relative overflow-hidden transition-all border`}
        style={{
          borderColor: active ? tower.color : 'rgba(0,240,255,0.25)',
          boxShadow: active ? `0 0 30px ${tower.color}66` : undefined,
        }}
      >
        {/* Tower silhouette */}
        <div className="relative h-40 mb-4 flex items-end justify-center">
          <div className="relative w-14 h-full flex flex-col-reverse items-center">
            <div className="w-full h-full rounded-t-sm relative overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${tower.color}22, #05070c)`, border: `1px solid ${tower.color}66` }}>
              {Array.from({ length: 12 }).map((_, j) => (
                <div key={j} className="flex gap-[3px] justify-center py-[3px]">
                  {Array.from({ length: 4 }).map((_, k) => (
                    <div key={k} className="w-1 h-1"
                      style={{ background: (j + k) % 3 === 0 ? tower.color : `${tower.color}55`, opacity: (j * k + i) % 4 === 0 ? 1 : 0.4 }} />
                  ))}
                </div>
              ))}
            </div>
            <div className="w-[2px] h-6 -mt-6" style={{ background: tower.color, boxShadow: `0 0 8px ${tower.color}` }} />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full -mt-6" style={{ background: '#ff2bd6', boxShadow: '0 0 8px #ff2bd6' }} />
          </div>
          {/* hologram plate */}
          <div className="absolute bottom-0 left-0 right-0 h-2 mx-auto w-24 rounded-full"
            style={{ background: `radial-gradient(ellipse at center, ${tower.color}66, transparent)` }} />
        </div>
        <div className="font-mono text-[10px] text-cyan-400/80">{tower.period}</div>
        <h4 className="font-display font-bold text-lg mt-1" style={{ color: tower.color }}>{tower.name}</h4>
        <div className="font-body text-sm text-cyan-100/90">{tower.role}</div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] text-cyan-400/70">CLICK TO ENTER</span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  )
}

function CorporateDetail({ tower, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="glass-dark clip-notch p-6 relative overflow-hidden border"
      style={{ borderColor: tower.color }}
    >
      <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-fuchsia-500/20 transition">
        <X className="w-4 h-4 text-fuchsia-300" />
      </button>
      <div className="font-mono text-[10px]" style={{ color: tower.color }}>// BUILDING INTERIOR // AUTHENTICATED</div>
      <h3 className="font-display font-black text-3xl mt-2" style={{ color: tower.color }}>{tower.name}</h3>
      <div className="font-body text-cyan-100/90 mt-1">{tower.role} • {tower.period}</div>

      <p className="mt-5 font-body text-cyan-50/90 leading-relaxed max-w-3xl">{tower.story}</p>

      {/* KPI dashboard */}
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        {tower.kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-4 clip-notch-sm relative overflow-hidden"
          >
            <div className="font-mono text-[9px] text-cyan-400/70 uppercase tracking-widest">{kpi.label}</div>
            <div className="font-display font-black text-3xl mt-1" style={{ color: tower.color, textShadow: `0 0 12px ${tower.color}` }}>
              {kpi.value}
            </div>
            {/* animated bar */}
            <div className="mt-2 h-1 rounded-full bg-cyan-500/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: '80%' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
                className="h-full" style={{ background: `linear-gradient(90deg, ${tower.color}, #b537f2)` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stack */}
      <div className="mt-5">
        <div className="font-mono text-[10px] text-cyan-400/70 mb-2">// TECH STACK //</div>
        <div className="flex flex-wrap gap-2">
          {tower.stack.map((s) => (
            <span key={s} className="glass px-3 py-1 clip-notch-sm font-mono text-[11px] text-cyan-100">{s}</span>
          ))}
        </div>
      </div>

      {/* Animated data graph */}
      <div className="mt-6 relative h-24 rounded-md border border-cyan-400/30 bg-black/40 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-sm opacity-40" />
        <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }}
            d="M 0 80 Q 50 60 80 55 T 160 40 T 240 30 T 320 20 T 400 10"
            stroke={tower.color} strokeWidth="2" fill="none"
            style={{ filter: `drop-shadow(0 0 6px ${tower.color})` }}
          />
        </svg>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-cyan-400/70">IMPACT CURVE // TREND ↑</div>
      </div>
    </motion.div>
  )
}

function DistrictCorporate() {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {CORPORATES.map((t, i) => (
          <CorporateTower key={t.name} tower={t} i={i} onOpen={setOpen} active={open === i} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {open !== null && <CorporateDetail key={open} tower={CORPORATES[open]} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ---------------------- DISTRICT: DATA CENTER (SKILLS) ----------------------
function DistrictData() {
  const [selected, setSelected] = useState(null)
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <div className="font-mono text-[10px] text-cyan-400/80 mb-3">// NEURAL SUBSTRATE // ACTIVE MODULES //</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {SKILLS.map((s, i) => (
            <motion.button
              key={s.name}
              onClick={() => setSelected(s)}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-dark clip-notch-sm p-4 text-left relative overflow-hidden hover:border-fuchsia-400 transition ${selected?.name === s.name ? 'border-fuchsia-400' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[9px] text-fuchsia-300/70">{s.cat}</div>
                  <div className="font-display font-bold text-lg text-cyan-100">{s.name}</div>
                </div>
                <div className="font-mono text-cyan-300 text-sm">{s.level}%</div>
              </div>
              <div className="mt-2 h-1 bg-cyan-500/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${s.level}%` }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.05 }}
                  className="h-full progress-bar-fill"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3">
        {/* Data center hologram */}
        <div className="glass-dark clip-notch p-5 relative overflow-hidden h-64">
          <div className="font-mono text-[10px] text-cyan-400/80">// SERVER STACK //</div>
          <div className="absolute inset-0 top-8 flex items-end justify-around px-6 pb-6 gap-3">
            {[70, 40, 90, 55, 80, 65].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="flex-1 rounded-t"
                style={{
                  background: `linear-gradient(180deg, #00f0ff, #b537f2)`,
                  boxShadow: '0 0 12px rgba(0,240,255,0.5)',
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-2 left-4 right-4 flex justify-between font-mono text-[8px] text-cyan-400/60">
            <span>node-01</span><span>node-02</span><span>node-03</span><span>node-04</span><span>node-05</span><span>node-06</span>
          </div>
        </div>

        {/* SQL floating */}
        <div className="glass-dark clip-notch p-5 relative overflow-hidden h-64">
          <div className="font-mono text-[10px] text-cyan-400/80">// LIVE QUERY STREAM //</div>
          <div className="relative h-full overflow-hidden mt-3">
            <div className="data-stream absolute inset-x-0">
              {[
                'SELECT model, accuracy FROM emotion_engine ORDER BY score DESC;',
                'CREATE INDEX idx_wildfire_grid ON regions USING gist(coords);',
                'UPDATE users SET tier = "high_value" WHERE ltv > 42000;',
                'WITH cohort AS (SELECT * FROM signups WHERE...);',
                'MATCH (n:Neuron)-[:CONNECTS]->(m) RETURN n, m;',
                'INSERT INTO predictions VALUES (\'ignition\', 0.87, ...);',
                'SELECT emb FROM vectors WHERE cosine(emb, :q) < 0.2;',
                'ALTER TABLE workflows ADD COLUMN llm_verified BOOL;',
              ].concat([
                'SELECT model, accuracy FROM emotion_engine ORDER BY score DESC;',
                'CREATE INDEX idx_wildfire_grid ON regions USING gist(coords);',
                'UPDATE users SET tier = "high_value" WHERE ltv > 42000;',
                'WITH cohort AS (SELECT * FROM signups WHERE...);',
              ]).map((q, i) => (
                <div key={i} className="font-mono text-[10px] text-cyan-300/80 py-1 border-b border-cyan-400/10">
                  <span className="text-fuchsia-300/70 mr-2">$</span>{q}
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#05070c] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Selected skill detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="lg:col-span-5 glass-dark clip-notch p-6 relative border border-fuchsia-400/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] text-fuchsia-400/80">// MODULE DECRYPTED //</div>
                <h4 className="font-display font-black text-2xl neon-text-purple mt-1">{selected.name}</h4>
                <div className="font-mono text-xs text-cyan-300 mt-1">{selected.cat} • proficiency {selected.level}%</div>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-fuchsia-500/20">
                <X className="w-4 h-4 text-fuchsia-300" />
              </button>
            </div>
            <p className="mt-3 font-body text-cyan-50/90 max-w-3xl">
              Deployed in production pipelines across multiple domains — from finance analytics dashboards to NLP-driven decision engines. Battle-tested through real business outcomes, not just demos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------- DISTRICT: RESEARCH LAB ----------------------
function DistrictResearch() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {RESEARCH.map((r, i) => {
        const Icon = r.icon
        return (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass-dark clip-notch p-6 relative overflow-hidden group"
          >
            {/* animated bg */}
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${r.color}`} />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 clip-hex flex items-center justify-center bg-gradient-to-br ${r.color} border-2 border-white/20`}>
                  <Icon className="w-5 h-5 text-white drop-shadow" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-cyan-300/80">{r.tag}</div>
                  <h4 className="font-display font-bold text-xl text-cyan-100">{r.title}</h4>
                </div>
              </div>
              <p className="font-body text-cyan-50/90 leading-relaxed">{r.story}</p>

              {/* Demo readout */}
              <div className="mt-4 border border-cyan-400/25 bg-black/40 clip-notch-sm p-3 font-mono text-[10px] text-cyan-300/90 relative overflow-hidden">
                <div className="flex items-center gap-2 text-fuchsia-300/70 mb-1">
                  <Play className="w-3 h-3" /> LIVE DEMO
                </div>
                <div className="whitespace-pre-wrap break-words">{r.demo}</div>
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 w-24"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.15), transparent)' }}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ---------------------- DISTRICT: ACHIEVEMENTS ----------------------
function DistrictAchievements() {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="font-mono text-[10px] text-orange-300/80">// LEGACY ARCHIVE // 07 TROPHIES DECRYPTED //</div>
      </div>

      <div className="relative">
        {/* Tower silhouette */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-orange-400 via-cyan-400 to-fuchsia-500 opacity-40" />
        <div className="space-y-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-center gap-4 ${i % 2 === 0 ? 'justify-start' : 'justify-end'} md:pr-0`}
            >
              {i % 2 !== 0 && <div className="hidden md:block flex-1" />}
              <div className="glass-dark clip-notch p-4 flex items-center gap-4 max-w-md w-full md:w-1/2 relative">
                <div className="w-14 h-14 clip-hex bg-gradient-to-br from-orange-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(255,138,26,0.5)' }}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[9px] text-orange-300/80">FLOOR {String(i + 1).padStart(2, '0')} • {a.tag}</div>
                  <h4 className="font-display font-bold text-lg text-cyan-100">{a.title}</h4>
                  <div className="font-body text-sm text-cyan-100/80">{a.sub}</div>
                </div>
              </div>
              {i % 2 === 0 && <div className="hidden md:block flex-1" />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------- DISTRICT: MISSION CONTROL (CONTACT) ----------------------
function DistrictContact() {
  const links = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rumman-khan-a8842324b', color: '#0077b5', tag: 'PROFESSIONAL', sub: 'rumman-khan-a8842324b' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/rummankhan19', color: '#b537f2', tag: 'CODE', sub: 'github.com/rummankhan19' },
    { icon: Mail, label: 'Direct Uplink', href: 'mailto:rumman1904@gmail.com?subject=Uplink%20from%20RUMMAN.OS', color: '#00f0ff', tag: 'MESSAGE', sub: 'rumman1904@gmail.com' },
    { icon: Calendar, label: 'Schedule Meeting', href: 'mailto:rumman1904@gmail.com?subject=Meeting%20Request&body=Hi%20Rumman%2C%20I%27d%20like%20to%20schedule%20a%20meeting.', color: '#ff2bd6', tag: 'BRIEFING', sub: 'Email to book a slot' },
    { icon: Radio, label: 'Direct Line', href: 'tel:+917300028608', color: '#39ff88', tag: 'VOICE-CH', sub: '+91 7300028608' },
    { icon: Download, label: 'Download Resume', href: '/resume.pdf', color: '#ff8a1a', tag: 'DOSSIER', sub: 'RUMMANCV.pdf' },
  ]

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-dark clip-notch p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,240,255,0.25), transparent 60%)'
        }} />
        <div className="relative">
          <div className="font-mono text-[10px] text-cyan-400/80">// UPLINK TERMINAL // OVERLOOKING CITY //</div>
          <h3 className="font-display font-black text-3xl neon-text mt-2 glitch" data-text="MISSION CONTROL">MISSION CONTROL</h3>
          <p className="font-body text-cyan-100/80 mt-2 max-w-lg">
            Signals are open. Whether it&apos;s a role, a research collaboration, or a wild product idea — patch through on any channel below.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {links.map((l, i) => {
              const Icon = l.icon
              const isDownload = l.href.endsWith('.pdf')
              const isExternal = l.href.startsWith('http')
              return (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  download={isDownload ? 'Rumman_Khan_Resume.pdf' : undefined}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass px-4 py-3 clip-notch flex items-center gap-3 group hover:bg-cyan-500/10 transition"
                  style={{ borderColor: `${l.color}66` }}
                >
                  <div className="w-10 h-10 clip-hex flex items-center justify-center flex-shrink-0"
                    style={{ background: `${l.color}22`, boxShadow: `0 0 12px ${l.color}55`, border: `1px solid ${l.color}` }}>
                    <Icon className="w-4 h-4" style={{ color: l.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[9px] text-cyan-400/70">{l.tag}</div>
                    <div className="font-display font-bold text-sm text-cyan-100 leading-tight">{l.label}</div>
                    {l.sub && <div className="font-mono text-[10px] text-cyan-300/60 truncate">{l.sub}</div>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Overlooking city view */}
      <div className="glass-dark clip-notch p-4 relative overflow-hidden min-h-[300px]">
        <div className="font-mono text-[10px] text-cyan-400/80 mb-2">// CITY OVERWATCH //</div>
        <div className="relative w-full h-full min-h-[240px] rounded overflow-hidden border border-cyan-400/30 bg-gradient-to-b from-[#0a0d18] to-[#1a0f2a]">
          <svg viewBox="0 0 400 200" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            {Array.from({ length: 20 }).map((_, i) => {
              const w = 12 + (i * 13) % 20
              const h = 30 + (i * 23) % 80
              return (
                <g key={i}>
                  <rect x={i * 21} y={200 - h} width={w} height={h} fill="#05070c" stroke="#00f0ff" strokeOpacity="0.3" />
                  {Array.from({ length: Math.floor(h / 6) }).map((_, j) => (
                    <rect key={j} x={i * 21 + 2} y={200 - h + 3 + j * 6} width={w - 4} height={2}
                      fill={(i + j) % 4 === 0 ? '#ff2bd6' : '#00f0ff'} opacity={0.6} />
                  ))}
                </g>
              )
            })}
          </svg>
          <motion.div
            animate={{ x: [-10, 400] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute top-6"
          >
            <div className="w-4 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#0ff]" />
          </motion.div>
          <div className="absolute inset-0 pointer-events-none scanlines" />
        </div>
        <div className="mt-2 font-mono text-[9px] text-cyan-400/60 flex justify-between">
          <span>LAT: 45.0451° N</span><span>LON: 128.0912° E</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------- MAIN APP ----------------------
function App() {
  const [phase, setPhase] = useState('boot') // boot -> city
  const [activeDistrict, setActiveDistrict] = useState(null)
  const [timeStr, setTimeStr] = useState('00:00:00')
  const [missileTarget, setMissileTarget] = useState(null)
  const [mapCollapsed, setMapCollapsed] = useState(false)
  const isMobile = useIsMobile(768)

  // Auto-collapse mini-map on mobile
  useEffect(() => { if (isMobile) setMapCollapsed(true) }, [isMobile])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setTimeStr(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const handleFinishBoot = useCallback(() => setPhase('city'), [])

  const fireMissileAt = useCallback((district) => {
    if (!district || missileTarget || activeDistrict) return
    setMissileTarget(district)
  }, [missileTarget, activeDistrict])

  const handleEnter = useCallback((d) => {
    if (isMobile) {
      // Skip missile on mobile — go straight in for a snappier tap feel
      setActiveDistrict(d.key)
    } else {
      fireMissileAt(d)
    }
  }, [fireMissileAt, isMobile])

  const handleExit = useCallback(() => setActiveDistrict(null), [])
  const handleToggleMap = useCallback(() => setMapCollapsed(v => !v), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && activeDistrict) {
        setActiveDistrict(null)
        return
      }
      if (phase !== 'city' || activeDistrict || missileTarget) return
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      const k = e.key.toUpperCase()
      const d = DISTRICTS.find(x => x.hotkey === k)
      if (d) {
        e.preventDefault()
        fireMissileAt(d)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeDistrict, phase, missileTarget, fireMissileAt])

  const districtObj = DISTRICTS.find(d => d.key === activeDistrict)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {phase === 'boot' && <BootSequence key="b" onFinish={handleFinishBoot} />}
      </AnimatePresence>

      {phase === 'city' && (
        <>
          {isMobile ? (
            <MobileCityView onEnter={handleEnter} />
          ) : (
            <CityView onEnter={handleEnter} />
          )}

          <HUD current={activeDistrict} onExit={handleExit} timeStr={timeStr}
               mapCollapsed={mapCollapsed} onToggleMap={handleToggleMap} isMobile={isMobile} />

          <AnimatePresence>
            {missileTarget && (
              <MissileStrike
                key={missileTarget.key}
                target={missileTarget}
                onImpact={() => {
                  setActiveDistrict(missileTarget.key)
                }}
                onComplete={() => setMissileTarget(null)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {districtObj && (
              <DistrictPanel district={districtObj} onClose={handleExit}>
                {activeDistrict === 'identity' && <DistrictIdentity />}
                {activeDistrict === 'education' && <DistrictEducation />}
                {activeDistrict === 'corporate' && <DistrictCorporate />}
                {activeDistrict === 'data' && <DistrictData />}
                {activeDistrict === 'research' && <DistrictResearch />}
                {activeDistrict === 'achievements' && <DistrictAchievements />}
                {activeDistrict === 'contact' && <DistrictContact />}
              </DistrictPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default App
