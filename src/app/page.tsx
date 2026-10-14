'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CyberNavbar } from '@/components/landing/CyberNavbar';
import { WaypointNavigator } from '@/components/landing/WaypointNavigator';
import { Act01Sourcing } from '@/components/landing/journey/Act01Sourcing';
import { Act02Telemetry } from '@/components/landing/journey/Act02Telemetry';
import { Act03Stockyards } from '@/components/landing/journey/Act03Stockyards';
import { Act04Reconciliation } from '@/components/landing/journey/Act04Reconciliation';
import { Act05PlatformOS } from '@/components/landing/journey/Act05PlatformOS';
import { Act06Terminal } from '@/components/landing/journey/Act06Terminal';

// High-performance dynamic import for the 3D WebGL background engine
const ScrollJourney3D = dynamic(
  () => import('@/components/3d/ScrollJourney3D'),
  { ssr: false }
);

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-foreground selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      {/* Persistent Full-Screen Scroll-Driven 3D WebGL Engine */}
      <ScrollJourney3D />

      {/* Floating Cyber HUD Command Navigation */}
      <CyberNavbar />

      {/* Vertical Interactive Waypoint Journey Tracker */}
      <WaypointNavigator />

      {/* Ambient Lighting Accents */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* The 6 Cinematic Journey Acts */}
      <main className="relative z-10">
        {/* Act 01: Raw Material Sourcing & Nexus */}
        <Act01Sourcing />

        {/* Act 02: Fleet & Weighbridge Telemetry */}
        <Act02Telemetry />

        {/* Act 03: Multi-Site Stockyard Inventory Matrix */}
        <Act03Stockyards />

        {/* Act 04: Automated 3-Way Match & Reconciliation Shield */}
        <Act04Reconciliation />

        {/* Act 05: Multi-Stakeholder Operating System Simulator */}
        <Act05PlatformOS />

        {/* Act 06: Deployment Gateway & Terminal Pricing */}
        <Act06Terminal />
      </main>
    </div>
  );
}
