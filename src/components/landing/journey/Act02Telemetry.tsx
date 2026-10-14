'use client';

import React, { useState } from 'react';
import {
  Scale,
  Truck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  MapPin,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

interface ChallanDemo {
  id: string;
  vehicleNo: string;
  material: string;
  supplier: string;
  destination: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  status: 'VERIFIED' | 'DISCREPANCY_DETECTED' | 'IN_TRANSIT';
  weighbridgeId: string;
  time: string;
  deviation: string;
}

const DEMO_CHALLANS: ChallanDemo[] = [
  {
    id: 'CH-2026-8941',
    vehicleNo: 'MH-04-GC-4821',
    material: 'TMT 16mm Rebars (Fe-550D)',
    supplier: 'Tata Steel Industrial Supply',
    destination: 'Tower 4 Foundation Stockyard',
    grossWeight: 42.68,
    tareWeight: 14.12,
    netWeight: 28.56,
    status: 'VERIFIED',
    weighbridgeId: 'WB-GATE-NORTH-01',
    time: '10:24 AM IST',
    deviation: '0.00% (Matched PO tolerance)',
  },
  {
    id: 'CH-2026-8942',
    vehicleNo: 'MH-12-TX-9932',
    material: 'RMC M-30 Self-Compacting',
    supplier: 'ACC Concrete ReadyMix Plant #3',
    destination: 'Podium Slab Level 3',
    grossWeight: 31.40,
    tareWeight: 13.80,
    netWeight: 17.60,
    status: 'VERIFIED',
    weighbridgeId: 'WB-GATE-SOUTH-02',
    time: '10:38 AM IST',
    deviation: '+0.15% (Within ±0.5% limit)',
  },
  {
    id: 'CH-2026-8943',
    vehicleNo: 'GJ-06-BB-1120',
    material: 'Bulk OPC Grade-53 Cement',
    supplier: 'UltraTech Bulker Terminal',
    destination: 'Silo Bank B (Capacity 150 MT)',
    grossWeight: 38.90,
    tareWeight: 14.50,
    netWeight: 24.40,
    status: 'VERIFIED',
    weighbridgeId: 'WB-GATE-NORTH-01',
    time: '10:45 AM IST',
    deviation: '-0.08% (Perfect Match)',
  },
];

export function Act02Telemetry() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeChallan = DEMO_CHALLANS[selectedIdx];

  return (
    <section id="act-02" className="relative min-h-screen py-28 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Stage Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            ACT 02 // SITE LOGISTICS & WEIGHBRIDGE TELEMETRY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Kill Paper Challan Leaks.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-electric-400">
              Sensor-Hooked Weighbridges.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            No manual ledger entries. When a 12-wheel tipper or transit mixer rolls onto site weighbridges, hardware telemetry captures gross and tare weights directly into your database.
          </p>
        </div>

        {/* Interactive Weighbridge Simulator Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Vehicle Stream Selector */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>LIVE GATE QUEUE (3 VEHICLES ACTIVE)</span>
              <span className="text-emerald-400 font-bold">DIGITAL RFID SYNCED</span>
            </div>

            {DEMO_CHALLANS.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border backdrop-blur-xl ${
                    isSelected
                      ? 'bg-[#071328]/95 border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.18)] scale-[1.01]'
                      : 'bg-[#050B14]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#070F1E]/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="font-mono text-xs font-bold text-white tracking-wider">
                        {item.vehicleNo}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                      {item.status}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-200">{item.material}</div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>NET: {item.netWeight} MT</span>
                    <span>{item.time}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Telemetry Terminal Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#050B14]/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Ambient terminal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider">CHALLAN SENSOR TELEMETRY</span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-300">{activeChallan.id}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SHA-256 SIGNED</span>
              </div>
            </div>

            {/* Weight Calibration Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-[#070F1E] border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Gross Weight</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  {activeChallan.grossWeight} <span className="text-xs text-slate-400 font-normal">MT</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Load Cell Inbound</div>
              </div>

              <div className="p-4 rounded-xl bg-[#070F1E] border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Tare Weight</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  {activeChallan.tareWeight} <span className="text-xs text-slate-400 font-normal">MT</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Empty Vehicle Out</div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Net Billable</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-1">
                  {activeChallan.netWeight} <span className="text-xs text-cyan-400 font-normal">MT</span>
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">Passed Audit</div>
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">SUPPLIER DISPATCH</span>
                <span className="text-white font-semibold">{activeChallan.supplier}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">UNLOADING LOCATION</span>
                <span className="text-white font-semibold">{activeChallan.destination}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">GATE SENSOR HOOK</span>
                <span className="text-cyan-300 font-semibold">{activeChallan.weighbridgeId}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">PO TOLERANCE CONFORMANCE</span>
                <span className="text-emerald-400 font-bold">{activeChallan.deviation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
