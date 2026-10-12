'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Layers, 
  AlertTriangle, 
  FolderSync, 
  Clock, 
  TrendingDown, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function ProblemSection() {
  const [viewMode, setViewMode] = useState<'fragmented' | 'unified'>('fragmented');

  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Stockyards in Spreadsheets',
      description: 'Steel tonnage, cement bags, and quarry aggregates tracked on manual weighbridge slips that lead to site shortages.',
      badStat: '4.2 hrs/day lost to manual stockyard reconciliations',
      unifiedResult: 'Real-time multi-stockyard sync with automated mill reorder triggers',
    },
    {
      icon: Layers,
      title: 'Scattered Builder Payment Rails',
      description: 'Builder RA bills, retention money deductions, and steel mill RTGS wires tracked across disconnected bank portals.',
      badStat: '32% weighbridge-to-bill reconciliation error rate',
      unifiedResult: 'Consolidated multi-rail payout ledger with verified UTR status hooks',
    },
    {
      icon: Clock,
      title: 'Delayed Builder Milestone Due Dates',
      description: 'Site engineer approvals and Net-30 RA bills forgotten in email chains, stalling critical material dispatch to site.',
      badStat: 'Average 18 days delayed on developer milestone collections',
      unifiedResult: 'Automated builder milestone scheduler with proactive cash alerts',
    },
    {
      icon: FolderSync,
      title: 'Developer & Mill Details Scattered',
      description: 'Site engineer contacts, GST E-Way bills, mill test certificates, and weighbridge slips fragmented in site cabins.',
      badStat: '6+ isolated tools per builder project relationship',
      unifiedResult: 'Centralized verified builder directory with encrypted document vault',
    },
    {
      icon: TrendingDown,
      title: 'Unclear Cash-Flow Position',
      description: 'Supplying bulk raw materials on credit without knowing exact collection runway against upcoming mill payouts.',
      badStat: 'Zero forward visibility into high-volume cash burn',
      unifiedResult: '90-day predictive runway modeling and instant working capital index',
    },
  ];

  return (
    <section id="platform" className="py-24 relative overflow-hidden bg-midnight">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Fragmented Vendor Dilemma
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Too Many Tools.{' '}
            <span className="text-slate-textMuted font-light">Too Little Visibility.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            Modern commerce moves in milliseconds, but most growing vendors are still running critical operations
            on duct-taped spreadsheets, disconnected banking portals, and lost email invoices.
          </p>

          {/* Interactive State Toggle */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-[#0A192F] border border-electric/20 shadow-inner">
            <button
              onClick={() => setViewMode('fragmented')}
              className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                viewMode === 'fragmented'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow'
                  : 'text-slate-textMuted hover:text-white'
              }`}
            >
              Fragmented Chaos (Before)
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === 'unified'
                  ? 'bg-electric text-white shadow-[0_0_15px_rgba(79,140,255,0.4)]'
                  : 'text-slate-textMuted hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Unified VENDORA OS (After)
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, index) => {
            const Icon = item.icon;
            const isUnified = viewMode === 'unified';

            return (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-500 relative overflow-hidden ${
                  isUnified
                    ? 'glass-panel border-electric/30 hover:border-electric/60 hover:shadow-[0_10px_30px_rgba(79,140,255,0.15)]'
                    : 'bg-[#0A192F]/50 border border-slate-800/80 hover:border-rose-500/30'
                }`}
              >
                {/* Top status indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isUnified
                        ? 'bg-electric/15 text-electric border border-electric/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      isUnified
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isUnified ? 'SYNCHRONIZED' : 'HIGH FRICTION'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-textSecondary mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Dynamic Bottom Metric / Resolution */}
                <div
                  className={`pt-4 border-t transition-all ${
                    isUnified ? 'border-electric/15' : 'border-slate-800'
                  }`}
                >
                  {isUnified ? (
                    <div className="flex items-start gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item.unifiedResult}</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-xs text-rose-400/90 font-mono">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{item.badStat}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* 6th Card: Unified Conclusion Callout */}
          <div className="p-6 rounded-2xl glass-panel-gold border-gold/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                The Vendora Standard
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zero Fragmented Spreadsheets</h3>
              <p className="text-sm text-slate-textSecondary leading-relaxed">
                Connect your suppliers, products, and banking rails into a single immutable ledger.
                Eliminate blind spots forever.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-gold">Ready for automated operations?</span>
              <a href="#showcase" className="p-2 rounded-lg bg-gold/15 text-gold hover:bg-gold/25 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
