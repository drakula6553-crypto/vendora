'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

// Lazy-load the heavy 3D component with SSR disabled
const HeroScene = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] lg:h-[720px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-electric border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-slate-textMuted tracking-wider uppercase">
          Initializing 3D Telemetry...
        </span>
      </div>
    </div>
  ),
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-radial-gradient">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-electric/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-electric/30 shadow-[0_0_25px_rgba(37,99,235,0.2)] animate-in fade-in zoom-in-95 duration-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span className="text-xs font-mono font-medium tracking-wider text-slate-textSecondary uppercase">
              VENDORA 2.0 • Raw Materials & Builder Supply OS
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-textMuted" />
          </div>
        </div>

        {/* Cinematic Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Your Entire Business.{' '}
            <span className="text-premium">
              One Intelligent Platform.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-textSecondary max-w-2xl mx-auto leading-relaxed font-normal">
            Supply TMT steel, ready-mix concrete, cement & aggregates to leading builders. Manage stockyards, weighbridge challans, builder RA bills, and multi-rail settlements — all from one powerful workspace.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-electric-600 via-electric-500 to-electric-600 hover:from-electric-500 hover:to-electric-400 shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-slate-textSecondary hover:text-white glass-panel border border-electric/25 hover:border-electric/50 transition-all hover:bg-white/5"
          >
            <span>Explore the Platform</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </a>
        </div>

        {/* Trust Statement */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-textMuted font-medium mb-4">
          <ShieldCheck className="w-4 h-4 text-electric-400" />
          <span>One workspace. Complete business visibility.</span>
          <span className="mx-2 text-slate-700">•</span>
          <span>Zero third-party spreadsheets required</span>
        </div>

        {/* Main 3D Motion Graphics Container */}
        <div className="relative w-full mt-2 rounded-2xl glass-panel-elevated overflow-hidden border border-electric/25 shadow-2xl">
          {/* Subtle status bar on top of the 3D canvas */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-electric/15 bg-[#070F1E]/80 backdrop-blur-md text-xs font-mono text-slate-textMuted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-medium">LIVE RAW MATERIAL TELEMETRY</span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-electric-cyan font-mono">SCROLL-RESPONSIVE 3D ENGINE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span className="text-slate-300">NODES: 142 CONNECTED</span>
              <span className="text-emerald-400">WEIGHBRIDGE: 100% MATCH</span>
              <span className="text-gold font-semibold">SUPPLY RAIL: ACTIVE</span>
            </div>
          </div>

          {/* 3D Scene */}
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
