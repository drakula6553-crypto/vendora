'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ArrowRight,
  Lock,
  Cpu,
  BadgeCheck,
} from 'lucide-react';

export function Act04Reconciliation() {
  const [simulateTamper, setSimulateTamper] = useState(false);

  return (
    <section id="act-04" className="relative min-h-screen py-28 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <FileCheck2 className="w-3.5 h-3.5" />
            ACT 04 // 3-WAY FINANCIAL RECONCILIATION ENGINE
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Cryptographic 3-Way Match.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Zero Payment Leaks.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            No builder ever pays for phantom materials. Vendora cross-validates the initial Purchase Order against the physical Weighbridge Gate Sensor Net Weight and the Vendor GST Invoice before money is released.
          </p>
        </div>

        {/* Interactive Verification Matrix */}
        <div className="rounded-2xl bg-[#050B14]/90 border border-emerald-500/30 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Ambient emerald backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Interactive Toggle Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TRANSACTION BATCH: TXN-2026-MATCH-0994</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">TEST ENGINE DEFENSE:</span>
              <button
                onClick={() => setSimulateTamper(!simulateTamper)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                  simulateTamper
                    ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-[#070F1E] text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {simulateTamper ? '🚨 SIMULATING INVOICE TAMPERING' : '✓ NORMAL 100% MATCH'}
              </button>
            </div>
          </div>

          {/* The 3 Pillars of the Match */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            {/* Pillar 1: Purchase Order */}
            <div className="p-5 rounded-xl bg-[#070F1E] border border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-slate-400 uppercase">PILLAR 01 // PO</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                  LOCKED
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-2">PO-2026-8802</div>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Ordered Qty:</span>
                  <span className="text-white font-bold">28.50 MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span className="text-white font-bold">₹54,200/MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Spec Grade:</span>
                  <span className="text-cyan-400 font-bold">Fe-550D TMT</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Weighbridge Gate Sensor GRN */}
            <div className="p-5 rounded-xl bg-[#070F1E] border border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-slate-400 uppercase">PILLAR 02 // SENSOR GRN</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  WEIGHED
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-2">GRN-GATE-4401</div>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Delivered Qty:</span>
                  <span className="text-white font-bold">28.56 MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Tolerance Delta:</span>
                  <span className="text-emerald-400 font-bold">+0.21% (PASS)</span>
                </div>
                <div className="flex justify-between">
                  <span>Weighbridge:</span>
                  <span className="text-cyan-400 font-bold">WB-NORTH-01</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Vendor Tax Invoice */}
            <div className={`p-5 rounded-xl bg-[#070F1E] border transition-all ${
              simulateTamper ? 'border-rose-500/60 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-slate-400 uppercase">PILLAR 03 // INVOICE</span>
                <span className={`px-2 py-0.5 rounded font-bold border ${
                  simulateTamper
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {simulateTamper ? 'DISCREPANCY' : 'MATCHED'}
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-2">GST-INV-99214</div>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Billed Qty:</span>
                  <span className={`font-bold ${simulateTamper ? 'text-rose-400 underline' : 'text-white'}`}>
                    {simulateTamper ? '34.00 MT (+5.4 MT Fake)' : '28.56 MT'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Billed Rate:</span>
                  <span className="text-white font-bold">₹54,200/MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Amount:</span>
                  <span className="text-white font-bold">18% GST Valid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engine Audit Verdict Box */}
          <div className={`mt-8 p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            simulateTamper
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          }`}>
            <div className="flex items-center gap-3">
              {simulateTamper ? (
                <AlertOctagon className="w-8 h-8 text-rose-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              )}
              <div>
                <div className="font-mono text-sm font-bold">
                  {simulateTamper ? 'SECURITY ALERT: FRAUDULENT OVERBILLING HALTED' : 'RECONCILIATION PASSED: 100% 3-WAY SENSOR VERIFIED'}
                </div>
                <div className="text-xs text-slate-300 font-mono mt-0.5">
                  {simulateTamper
                    ? 'Invoice billed 34.00 MT but weighbridge load cells only recorded 28.56 MT. Bank release automatically blocked.'
                    : 'Exact match between PO terms, weighbridge net weight, and vendor tax invoice. RTGS wire cleared for release.'}
                </div>
              </div>
            </div>

            <div className="font-mono text-right shrink-0">
              <span className={`px-4 py-2 rounded-lg text-xs font-bold inline-block border ${
                simulateTamper
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-emerald-500 text-black border-emerald-400'
              }`}>
                {simulateTamper ? 'PAYMENT LOCKED' : 'DISBURSEMENT AUTHORIZED'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
