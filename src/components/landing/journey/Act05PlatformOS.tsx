'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Package,
  CreditCard,
  FileCheck2,
  TrendingUp,
  UserCheck,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

type RoleView = 'builder' | 'supplier' | 'transporter';

export function Act05PlatformOS() {
  const [activeRole, setActiveRole] = useState<RoleView>('builder');

  const roleConfigs = {
    builder: {
      title: 'Builder & EPC Contractor Terminal',
      badge: 'ROLE: GENERAL CONTRACTOR',
      kpis: [
        { label: 'Active Projects', val: '14 Active Sites', sub: 'Mumbai & Bangalore' },
        { label: 'Today Inbound', val: '48 Loads', sub: '1,420 MT Rebars & RMC' },
        { label: '3-Way Match Rate', val: '99.8%', sub: 'Zero phantom challans' },
        { label: 'RA Bill Credit', val: '₹14.2 Cr', sub: 'Net-30 payment buffer' },
      ],
      recentAction: 'Approved Tata Steel PO-2026-8802 line-items after weighbridge validation.',
      tableRows: [
        { col1: 'Lodha Crown Tower B', col2: 'TMT 16mm Rebars', col3: '28.56 MT', col4: 'GATE-PASSED', color: 'emerald' },
        { col1: 'Godrej Woods Phase 2', col2: 'RMC Concrete M-30', col3: '42.00 Cum', col4: 'POURING-LIVE', color: 'cyan' },
        { col1: 'Prestige Tech Cloud', col2: 'OPC-53 Bulk Cement', col3: '34.20 MT', col4: 'SILO-STOCKED', color: 'blue' },
      ],
    },
    supplier: {
      title: 'Raw Material Supplier Terminal',
      badge: 'ROLE: PRIMARY MILL / QUARRY',
      kpis: [
        { label: 'Monthly Dispatched', val: '₹28.4 Cr', sub: '+18.2% MoM growth' },
        { label: 'Verified Challans', val: '1,842 GRNs', sub: 'Zero disputed weights' },
        { label: 'RTGS Cleared (30d)', val: '₹22.1 Cr', sub: 'Direct bank release' },
        { label: 'Outstanding Receivables', val: '₹6.3 Cr', sub: 'Within credit terms' },
      ],
      recentAction: 'Received RTGS settlement confirmation UTR #RBI2026941829 from Godrej Properties.',
      tableRows: [
        { col1: 'PO-88402 (Shapoorji)', col2: 'TMT Rebar 25mm', col3: '₹48,20,000', col4: 'RTGS-SETTLED', color: 'emerald' },
        { col1: 'PO-88403 (L&T Infra)', col2: 'Crushed Basalt 20mm', col3: '₹14,50,000', col4: 'PROCESSING', color: 'amber' },
        { col1: 'PO-88404 (Prestige)', col2: 'Bulk Cement OPC-53', col3: '₹32,10,000', col4: 'RTGS-SETTLED', color: 'emerald' },
      ],
    },
    transporter: {
      title: 'Fleet & Dumper Logistics Terminal',
      badge: 'ROLE: HAULAGE & LOGISTICS',
      kpis: [
        { label: 'Vehicles on Road', val: '64 Mixers & Tippers', sub: 'GPS live telemetry' },
        { label: 'Avg Gate Turnaround', val: '8.4 Minutes', sub: '-65% faster vs paper' },
        { label: 'Challan Matched', val: '100.0%', sub: 'Zero weight dispute' },
        { label: 'Haulage Disbursed', val: '₹48.2 Lakh', sub: 'Direct driver payouts' },
      ],
      recentAction: 'Gate exit auto-recorded for MH-04-GC-4821 with tare sensor validation.',
      tableRows: [
        { col1: 'MH-04-GC-4821 (12W)', col2: 'Tata Mill -> Lodha Site', col3: 'Tare: 14.12 MT', col4: 'GATE-OUT', color: 'emerald' },
        { col1: 'MH-12-TX-9932 (Mixer)', col2: 'ACC Plant -> Godrej Pour', col3: 'Tare: 13.80 MT', col4: 'ON-ROUTE', color: 'cyan' },
        { col1: 'GJ-06-BB-1120 (Bulker)', col2: 'UltraTech -> Prestige Silo', col3: 'Tare: 14.50 MT', col4: 'DISCHARGING', color: 'blue' },
      ],
    },
  };

  const current = roleConfigs[activeRole];

  return (
    <section id="act-05" className="relative min-h-screen py-28 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-wider mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            ACT 05 // MULTI-PARTY PLATFORM SIMULATOR
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            One Operating System.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-400">
              Tailored for Every Stakeholder.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Switch views below to experience how Vendora adapts its interface in real time for Builders, Material Suppliers, and Fleet Transporters.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#050B14]/90 border border-slate-800 w-fit">
          <button
            onClick={() => setActiveRole('builder')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeRole === 'builder'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            01 // BUILDER & EPC VIEW
          </button>
          <button
            onClick={() => setActiveRole('supplier')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeRole === 'supplier'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            02 // MATERIAL SUPPLIER VIEW
          </button>
          <button
            onClick={() => setActiveRole('transporter')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeRole === 'transporter'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            03 // FLEET TRANSPORTER VIEW
          </button>
        </div>

        {/* Simulated Terminal Interface Card */}
        <div className="rounded-2xl bg-[#050B14]/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3 mb-6">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                {current.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {current.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
          </div>

          {/* 4 KPIs Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {current.kpis.map((kpi) => (
              <div key={kpi.label} className="p-4 rounded-xl bg-[#070F1E] border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-500 uppercase">{kpi.label}</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">{kpi.val}</div>
                <div className="text-[11px] text-slate-400 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Interactive Simulated Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="pb-3 font-semibold uppercase">Entity / Project</th>
                  <th className="pb-3 font-semibold uppercase">Material Commodity</th>
                  <th className="pb-3 font-semibold uppercase">Volume / Valuation</th>
                  <th className="pb-3 font-semibold uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {current.tableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 font-bold text-white">{row.col1}</td>
                    <td className="py-3.5 text-slate-300">{row.col2}</td>
                    <td className="py-3.5 text-slate-200 font-semibold">{row.col3}</td>
                    <td className="py-3.5 text-right">
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-emerald-400">
                        {row.col4}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
