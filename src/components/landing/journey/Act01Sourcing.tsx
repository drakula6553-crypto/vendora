'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

export function Act01Sourcing() {
  const materialRails = [
    { name: 'TMT Steel Rebars', grade: 'Fe-550D / 500D', metric: '42,800 MT Dispatched', status: 'MILL-SYNCED' },
    { name: 'Ready-Mix Concrete', grade: 'M-25 to M-50 High-Slump', metric: '1,420 Transit Batches', status: 'BATCHING-LIVE' },
    { name: 'Bulk OPC Cement', grade: 'Grade-53 / PPC Bulkers', metric: '98.4% Silo Fill Level', status: 'SILO-OPTIMAL' },
    { name: 'Crushed Aggregates', grade: 'Zone-II M-Sand & 20mm', metric: '8,400 MT In Stock', status: 'QUARRY-DIRECT' },
  ];

  return (
    <section id="act-01" className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Cyber Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070F1E]/90 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
              ACT 01 // INDUSTRIAL SUPPLY RAIL OS
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Hero Cinematic Title */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Raw Materials to Builders.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
              Automated in Real-Time.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Directly orchestrate primary TMT steel mills, ready-mix concrete batching plants, and cement bulkers to major project sites. Eliminate paper challan leaks with cryptographic 3-way reconciliation.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono uppercase tracking-wider font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 shadow-[0_0_35px_rgba(245,158,11,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Workspace Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#act-02"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold text-cyan-300 bg-[#070F1E]/80 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-cyan-500/10 backdrop-blur-xl transition-all"
          >
            <span>Scroll Story Journey</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* 4 Cyber Material Rails Bento Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {materialRails.map((rail, idx) => (
            <div
              key={rail.name}
              className="p-5 rounded-2xl bg-[#050B14]/85 border border-slate-800/80 hover:border-cyan-500/30 backdrop-blur-xl transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,229,255,0.08)]"
            >
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                <span className="text-slate-500">RAIL 0{idx + 1}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {rail.status}
                </span>
              </div>
              <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {rail.name}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {rail.grade}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">THROUGHPUT</span>
                <span className="font-bold text-amber-300">{rail.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
