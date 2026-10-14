'use client';

import React, { useState, useEffect } from 'react';

interface Waypoint {
  id: string;
  actNumber: string;
  label: string;
  subtext: string;
}

const WAYPOINTS: Waypoint[] = [
  { id: 'act-01', actNumber: '01', label: 'SOURCING', subtext: 'Raw Material Core' },
  { id: 'act-02', actNumber: '02', label: 'TELEMETRY', subtext: 'Weighbridge & Fleet' },
  { id: 'act-03', actNumber: '03', label: 'STOCKYARDS', subtext: 'Inventory Silos' },
  { id: 'act-04', actNumber: '04', label: 'RECONCILIATION', subtext: '3-Way Match & RA' },
  { id: 'act-05', actNumber: '05', label: 'SIMULATOR', subtext: 'Platform Matrix' },
  { id: 'act-06', actNumber: '06', label: 'GATEWAY', subtext: 'Deployment & SLA' },
];

export function WaypointNavigator() {
  const [activeAct, setActiveAct] = useState<string>('act-01');
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollPercent(Math.round(progress));

      // Determine active section based on scroll position
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = WAYPOINTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(WAYPOINTS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveAct(WAYPOINTS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none">
      {/* Top Telemetry Header */}
      <div className="glass-panel px-3 py-1.5 rounded-lg border border-electric/25 backdrop-blur-xl text-[10px] font-mono text-slate-textMuted flex items-center gap-2 shadow-2xl">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-white font-bold">{scrollPercent}%</span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400">WAYPOINTS</span>
      </div>

      {/* Vertical Waypoint Track */}
      <div className="relative flex flex-col gap-2 py-2">
        {/* Glowing background line */}
        <div className="absolute right-3.5 top-2 bottom-2 w-0.5 bg-slate-800/80 -z-10" />
        <div
          className="absolute right-3.5 top-2 w-0.5 bg-gradient-to-b from-cyan-400 via-electric-500 to-amber-500 transition-all duration-300 -z-10"
          style={{ height: `${scrollPercent}%` }}
        />

        {WAYPOINTS.map((wp) => {
          const isActive = activeAct === wp.id;
          return (
            <button
              key={wp.id}
              onClick={() => scrollToSection(wp.id)}
              className="group flex items-center justify-end gap-3 text-right transition-all duration-300 py-1"
            >
              {/* Tooltip on hover / active */}
              <div
                className={`transition-all duration-300 px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap border ${
                  isActive
                    ? 'opacity-100 translate-x-0 bg-[#070F1E]/95 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 bg-[#050B14]/90 border-slate-700/50 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 justify-end">
                  <span>{wp.label}</span>
                </div>
                <div className="text-[9px] text-slate-500">{wp.subtext}</div>
              </div>

              {/* Waypoint Pip */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500 text-black border-cyan-300 scale-110 shadow-[0_0_15px_rgba(0,229,255,0.6)]'
                    : 'bg-[#050B14] text-slate-500 border-slate-800 group-hover:border-slate-600 group-hover:text-slate-300'
                }`}
              >
                {wp.actNumber}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
