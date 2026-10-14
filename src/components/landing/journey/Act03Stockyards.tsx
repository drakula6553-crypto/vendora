'use client';

import React, { useState } from 'react';
import {
  Package,
  Layers,
  ArrowRightLeft,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Boxes,
  CheckCircle,
} from 'lucide-react';

interface YardItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  maxCapacity: number;
  unit: string;
  minThreshold: number;
  dailyBurn: number;
  daysRemaining: number;
  status: 'OPTIMAL' | 'REORDER_TRIGGERED' | 'CRITICAL_LOW';
}

const YARD_INVENTORY: YardItem[] = [
  {
    id: 'SKU-TMT-16',
    name: 'Primary Steel Rebars (16mm Fe-550D)',
    category: 'Structural Steel',
    currentStock: 840,
    maxCapacity: 1200,
    unit: 'MT',
    minThreshold: 300,
    dailyBurn: 45,
    daysRemaining: 18,
    status: 'OPTIMAL',
  },
  {
    id: 'SKU-CEM-OPC53',
    name: 'UltraTech OPC Grade-53 Bulk Cement',
    category: 'Cement Silo Bank',
    currentStock: 195,
    maxCapacity: 400,
    unit: 'MT',
    minThreshold: 120,
    dailyBurn: 32,
    daysRemaining: 6,
    status: 'REORDER_TRIGGERED',
  },
  {
    id: 'SKU-AGG-20MM',
    name: 'Crushed Basalt Blue Metal (20mm)',
    category: 'Coarse Aggregate',
    currentStock: 2400,
    maxCapacity: 3000,
    unit: 'MT',
    minThreshold: 600,
    dailyBurn: 110,
    daysRemaining: 21,
    status: 'OPTIMAL',
  },
  {
    id: 'SKU-SAND-Z2',
    name: 'Manufactured Concrete Sand (Zone II)',
    category: 'Fine Aggregate',
    currentStock: 110,
    maxCapacity: 1500,
    unit: 'MT',
    minThreshold: 250,
    dailyBurn: 80,
    daysRemaining: 1,
    status: 'CRITICAL_LOW',
  },
];

export function Act03Stockyards() {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL'>('ALL');

  const displayed = filter === 'CRITICAL'
    ? YARD_INVENTORY.filter(i => i.status !== 'OPTIMAL')
    : YARD_INVENTORY;

  return (
    <section id="act-03" className="relative min-h-screen py-28 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Boxes className="w-3.5 h-3.5" />
              ACT 03 // MULTI-SITE STOCKYARD MATRIX
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Zero Stockouts.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                Predictive Material Buffers.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal">
              Track live yard stock level gauges, daily project pour consumption rates, and trigger auto-PO releases when cement silos or rebar yards breach minimum safety thresholds.
            </p>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#050B14]/90 border border-slate-800 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'ALL'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Stockyards ({YARD_INVENTORY.length})
            </button>
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'CRITICAL'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Action Required (2)
            </button>
          </div>
        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayed.map((item) => {
            const fillPercent = Math.round((item.currentStock / item.maxCapacity) * 100);
            const isAlert = item.status === 'CRITICAL_LOW';
            const isReorder = item.status === 'REORDER_TRIGGERED';

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-[#050B14]/90 border backdrop-blur-2xl transition-all duration-300 hover:scale-[1.01] ${
                  isAlert
                    ? 'border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.12)]'
                    : isReorder
                    ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.12)]'
                    : 'border-slate-800/80 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {item.id} • {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {item.name}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border ${
                      isAlert
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse'
                        : isReorder
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Stock Level Progress Gauge */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400">YARD FILL LEVEL</span>
                    <span className="text-white font-bold font-mono">
                      {item.currentStock} / {item.maxCapacity} {item.unit} ({fillPercent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isAlert
                          ? 'bg-rose-500'
                          : isReorder
                          ? 'bg-amber-400'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                      }`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>

                {/* Burn Rate & Reorder Telemetry */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#070F1E] border border-slate-800/80 text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-slate-500">DAILY BURN</div>
                    <div className="text-white font-bold mt-0.5">
                      {item.dailyBurn} {item.unit}/day
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">RUNWAY</div>
                    <div className={`font-bold mt-0.5 ${item.daysRemaining < 3 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {item.daysRemaining} Days Left
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">AUTO-TRIGGER</div>
                    <div className="text-cyan-400 font-bold mt-0.5">
                      &lt; {item.minThreshold} {item.unit}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
