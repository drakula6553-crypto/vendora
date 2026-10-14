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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-electric/30 shadow-[0_0_20px_rgba(79,140,255,0.15)] animate-in fade-in zoom-in-95 duration-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span className="text-xs font-mono font-medium tracking-wider text-slate-textSecondary uppercase">
              VENDORA 2.0 &#8226; Raw Materials & Builder Supply OS
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

          <p className="text-lg sm:text-xl text-slate-textSecondary max-w-2xl mx-auto leading-relaxed">
            Supply TMT steel, ready-mix concrete, cement & aggregates to leading builders. Manage stockyards, weighbridge challans, builder RA bills, and multi-rail settlements &#8211; all from one powerful workspace.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-electric to-electric-600 hover:from-electric-400 hover:to-electric shadow-[0_0_30px_rgba(79,140,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
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
          <ShieldCheck className="w-4 h-4 text-electric" />
          <span>One workspace. Complete business visibility.</span>
          <span className="mx-2 text-slate-700">&#8226;</span>
          <span>Zero third-party spreadsheets required</span>
        </div>

        {/* Main 3D Motion Graphics Container */}
        <div className="relative w-full mt-2 rounded-2xl glass-panel-elevated overflow-hidden border border-electric/20">
          {/* Subtle status bar on top of the 3D canvas */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-electric/15 bg-[#081020]/60 text-xs font-mono text-slate-textMuted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white font-medium">LIVE BUSINESS TELEMETRY</span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-textMuted">R3F 3D KERNEL ACTIVE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span>NODES: 142 CONNECTED</span>
              <span>TPS: 240/SEC</span>
              <span className="text-gold">ORCHESTRATION: SYNCED</span>
            </div>
          </div>

          {/* 3D Scene */}
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
