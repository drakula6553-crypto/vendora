'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  CreditCard, 
  Building2, 
  LayoutDashboard, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import Link from 'next/link';

type ShowcaseTab = 'overview' | 'inventory' | 'payments' | 'companies' | 'analytics';

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('overview');

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-midnight">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-electric/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Interactive Live Demonstration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            The Product Experience.{' '}
            <span className="text-slate-textMuted font-light">Down to the Millisecond.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            Switch between workspaces to see how VENDORA reconciles inventory, supplier contracts,
            multi-currency payouts, and cash burn into one fluid command terminal.
          </p>
        </div>

        {/* Workspace Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'companies', label: 'Companies', icon: Building2 },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ShowcaseTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-electric text-white shadow-[0_0_20px_rgba(79,140,255,0.4)] border border-electric'
                    : 'glass-panel text-slate-textMuted hover:text-white border-electric/15 hover:border-electric/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-textMuted'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Frame Window */}
        <div className="rounded-2xl glass-panel-elevated border border-electric/30 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-[#0A192F]/90 border-b border-electric/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-textMuted pl-2 hidden sm:inline">
                https://portal.vendora.io/workspace/{activeTab}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-gold/15 text-gold border border-gold/30">
                SAMPLE SIMULATION DATA
              </span>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-electric hover:underline"
              >
                <span>Launch Real Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="p-6 sm:p-8 bg-[#050B18]/95 min-h-[500px]">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Metric Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl glass-panel border-electric/20">
                    <span className="text-xs font-mono text-slate-textMuted uppercase">Available Liquidity</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹1,24,83,200.00</div>
                    <span className="text-xs text-emerald-400 font-sans mt-1 inline-flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> +14.2% vs last month
                    </span>
                  </div>

                  <div className="p-4 rounded-xl glass-panel border-electric/20">
                    <span className="text-xs font-mono text-slate-textMuted uppercase">Inbound Receivables</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹48,91,500.00</div>
                    <span className="text-xs text-slate-textMuted font-sans mt-1">18 builder RA bills maturing</span>
                  </div>

                  <div className="p-4 rounded-xl glass-panel border-electric/20">
                    <span className="text-xs font-mono text-slate-textMuted uppercase">Outbound Obligations</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹21,48,000.00</div>
                    <span className="text-xs text-amber-400 font-sans mt-1">Due across next 14 calendar days</span>
                  </div>

                  <div className="p-4 rounded-xl glass-panel border-gold/25">
                    <span className="text-xs font-mono text-gold uppercase">Stockyard Valuation</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹3,84,09,000.00</div>
                    <span className="text-xs text-emerald-400 font-sans mt-1">42,800 MT materials in active stock</span>
                  </div>
                </div>

                {/* Sub-grid: Recent Ledger & Supplier Node Map */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Ledger Table */}
                  <div className="lg:col-span-2 rounded-xl glass-panel p-5 border-electric/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Live Payout Ledger
                      </h4>
                      <span className="text-xs text-slate-textMuted font-mono">Real-time sync</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-electric/15 text-slate-textMuted font-mono">
                            <th className="pb-2">TX HASH</th>
                            <th className="pb-2">COUNTERPARTY</th>
                            <th className="pb-2">RAIL</th>
                            <th className="pb-2">AMOUNT</th>
                            <th className="pb-2">STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-electric/10">
                          {[
                            { hash: '0x8f2a...1e4b', name: 'Tata Steel Ltd (TMT Division)', rail: 'RTGS Immediate', amount: '-₹54,80,000.00', status: 'SETTLED', statusColor: 'text-emerald-400 bg-emerald-500/10' },
                            { hash: '0x4c9d...9a21', name: 'Lodha Developers (Macrotech)', rail: 'RTGS Settlement', amount: '+₹84,50,000.00', status: 'RECEIVED', statusColor: 'text-electric bg-electric/10' },
                            { hash: '0x1b7e...6f82', name: 'L&T Construction (Coastal Road)', rail: 'IMPS Direct', amount: '+₹68,40,000.00', status: 'RECEIVED', statusColor: 'text-electric bg-electric/10' },
                            { hash: '0x9d3f...0c18', name: 'UltraTech Cement Bulk Works', rail: 'NEFT Clearing', amount: '-₹32,40,000.00', status: 'SETTLED', statusColor: 'text-emerald-400 bg-emerald-500/10' },
                          ].map((tx, idx) => (
                            <tr key={idx} className="hover:bg-electric/5">
                              <td className="py-2.5 font-mono text-slate-textMuted">{tx.hash}</td>
                              <td className="py-2.5 font-semibold text-white">{tx.name}</td>
                              <td className="py-2.5 text-slate-textMuted">{tx.rail}</td>
                              <td className={`py-2.5 font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>{tx.amount}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${tx.statusColor}`}>
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Operational Health Box */}
                  <div className="rounded-xl glass-panel p-5 border-electric/20 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
                        Reconciliation Guard
                      </h4>
                      <p className="text-xs text-slate-textSecondary mb-4">
                        Autonomous checks compare PO line items against bank webhooks and warehouse receipts.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-textMuted">Two-Way PO Matching</span>
                          <span className="text-emerald-400 font-mono font-bold">100% Passed</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-full" />
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2">
                          <span className="text-slate-textMuted">Supplier KYC / Tax Compliance</span>
                          <span className="text-emerald-400 font-mono font-bold">142/142 Validated</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-electric/10 border border-electric/25 mt-4">
                      <div className="text-[11px] text-electric font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-electric" />
                        Audited by Immutable Ledger
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-electric/15">
                  <div>
                    <h3 className="text-lg font-bold text-white">Smart Inventory Catalog</h3>
                    <p className="text-xs text-slate-textMuted">Threshold monitoring across 3 primary distribution hubs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Sync: Active
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-electric/15 text-slate-textMuted font-mono">
                        <th className="py-2.5">SKU ID</th>
                        <th className="py-2.5">ITEM NAME</th>
                        <th className="py-2.5">WAREHOUSE</th>
                        <th className="py-2.5">ON HAND</th>
                        <th className="py-2.5">MIN THRESHOLD</th>
                        <th className="py-2.5">UNIT COST</th>
                        <th className="py-2.5">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-electric/10">
                      {[
                        { sku: 'TMT-TATA-550D', name: 'Tata Tiscon 550D Rebar 16mm Bundles', wh: 'Taloja Steel Yard', onHand: 420, min: 100, cost: '₹58,500.00 / MT', status: 'OPTIMAL', color: 'text-emerald-400 bg-emerald-500/10' },
                        { sku: 'CEM-ULTRA-53', name: 'UltraTech Super OPC 53 Grade Cement', wh: 'Bhiwandi Bulk Hub', onHand: 1850, min: 2000, cost: '₹395.00 / Bag', status: 'REORDER TRIGGERED', color: 'text-amber-400 bg-amber-500/10' },
                        { sku: 'RMC-M30-PUMP', name: 'Ready-Mix Concrete M30 Grade Slabs', wh: 'Chakan Batching Plant', onHand: 650, min: 150, cost: '₹4,250.00 / Cu.m', status: 'OPTIMAL', color: 'text-emerald-400 bg-emerald-500/10' },
                        { sku: 'AGG-BLUE-20MM', name: '20mm Machine Crushed Blue Metal', wh: 'Panvel Quarry Yard', onHand: 380, min: 100, cost: '₹3,600.00 / Brass', status: 'OPTIMAL', color: 'text-emerald-400 bg-emerald-500/10' },
                        { sku: 'MSAND-ZONE-2', name: 'Manufactured M-Sand Zone-II Plaster', wh: 'Panvel Quarry Yard', onHand: 45, min: 120, cost: '₹1,650.00 / MT', status: 'LOW STOCK ALERT', color: 'text-rose-400 bg-rose-500/10' },
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-electric/5">
                          <td className="py-3 font-mono font-semibold text-electric">{item.sku}</td>
                          <td className="py-3 font-semibold text-white">{item.name}</td>
                          <td className="py-3 text-slate-textMuted">{item.wh}</td>
                          <td className="py-3 font-mono text-white font-bold">{item.onHand} units</td>
                          <td className="py-3 font-mono text-slate-textMuted">{item.min} units</td>
                          <td className="py-3 font-mono text-slate-textSecondary">{item.cost}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${item.color}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-electric/15">
                  <div>
                    <h3 className="text-lg font-bold text-white">Payment Rail Orchestrator</h3>
                    <p className="text-xs text-slate-textMuted">Disbursements, customer settlements & automated batch releases</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-electric px-3 py-1 rounded bg-electric/15 border border-electric/30">
                      Auto-Release: Enabled
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 rounded-xl glass-panel border-electric/20">
                    <span className="text-xs font-mono text-slate-textMuted uppercase">Paid Out (Last 30d)</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹68,42,000.00</div>
                    <span className="text-xs text-slate-textMuted font-sans">Across 128 verified supplier batches</span>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border-electric/20">
                    <span className="text-xs font-mono text-slate-textMuted uppercase">Inbound Collected</span>
                    <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">₹94,28,500.00</div>
                    <span className="text-xs text-emerald-400 font-sans">0 chargebacks or failed webhooks</span>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border-gold/30">
                    <span className="text-xs font-mono text-gold uppercase">Scheduled Next 7 Days</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹14,23,000.00</div>
                    <span className="text-xs text-gold font-sans">Pre-funded & escrow authorized</span>
                  </div>
                </div>

                <div className="rounded-xl glass-panel p-4 border-electric/15 text-xs text-slate-textSecondary">
                  <p className="font-mono text-white mb-2 font-bold uppercase text-[11px]">
                    Supported Settlement Networks:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['RTGS Real-Time High Value', 'NEFT Batch Payouts', 'IMPS Instant 24x7', 'UPI Corporate Autopay', 'Cross-Border Wire SWIFT'].map((rail, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-[#0A192F] border border-electric/20 text-slate-textMuted">
                        {rail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-electric/15">
                  <div>
                    <h3 className="text-lg font-bold text-white">Verified Company & Supplier Registry</h3>
                    <p className="text-xs text-slate-textMuted">Contract terms, verified tax numbers, and credit arrangements</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Lodha Developers (Macrotech Ltd)', type: 'Builder / Developer', term: 'RA Bill Net-30', balance: '₹84,50,000.00', status: 'KYC Verified', rating: '99.8%' },
                    { name: 'Tata Steel Ltd (TMT Rebar Division)', type: 'Primary Steel Mill', term: 'Net-15 LC', balance: '₹54,80,000.00', status: 'KYC Verified', rating: '100%' },
                    { name: 'Godrej Properties & Infrastructure', type: 'Builder / Developer', term: 'RA Bill Net-45', balance: '₹1,18,20,000.00', status: 'Verified Developer', rating: '98.5%' },
                    { name: 'UltraTech Cement Ltd (Aditya Birla)', type: 'Primary Cement Producer', term: 'Net-15 RTGS', balance: '₹32,40,000.00', status: 'KYC Verified', rating: '99.2%' },
                  ].map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass-panel border-electric/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">{comp.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {comp.status}
                          </span>
                        </div>
                        <span className="text-xs text-slate-textMuted">{comp.type}</span>
                      </div>

                      <div className="mt-4 pt-3 border-t border-electric/10 grid grid-cols-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-textMuted font-mono block">TERMS</span>
                          <span className="font-semibold text-white">{comp.term}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-textMuted font-mono block">OPEN BALANCE</span>
                          <span className="font-semibold font-mono text-white">{comp.balance}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-textMuted font-mono block">SCORE</span>
                          <span className="font-semibold text-emerald-400">{comp.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-electric/15">
                  <div>
                    <h3 className="text-lg font-bold text-white">Cash Runway & Working Capital Telemetry</h3>
                    <p className="text-xs text-slate-textMuted">Algorithmic forecast based on historical payables velocity</p>
                  </div>
                  <span className="text-xs font-mono text-gold px-2.5 py-1 rounded bg-gold/15 border border-gold/30">
                    24.2 Months Runway
                  </span>
                </div>

                {/* Simulated Visual Graph Representation */}
                <div className="p-5 rounded-xl glass-panel border-electric/20 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-textMuted">
                    <span>90-DAY PREDICTIVE LIQUIDITY CURVE</span>
                    <span className="text-emerald-400">+18.4% PROJECTED NET SURPLUS</span>
                  </div>

                  <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-electric/20">
                    {[
                      { month: 'Jan', h1: '40%', h2: '20%' },
                      { month: 'Feb', h1: '55%', h2: '30%' },
                      { month: 'Mar', h1: '48%', h2: '25%' },
                      { month: 'Apr', h1: '65%', h2: '35%' },
                      { month: 'May', h1: '72%', h2: '40%' },
                      { month: 'Jun', h1: '80%', h2: '45%' },
                      { month: 'Jul', h1: '95%', h2: '50%' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                        <div className="w-full max-w-[28px] flex items-end justify-center gap-1 h-full">
                          <div
                            style={{ height: bar.h1 }}
                            className="w-1/2 bg-gradient-to-t from-electric-800 to-electric rounded-t transition-all group-hover:brightness-125"
                          />
                          <div
                            style={{ height: bar.h2 }}
                            className="w-1/2 bg-gradient-to-t from-gold-dark to-gold rounded-t transition-all group-hover:brightness-125"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-textMuted">{bar.month}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-6 text-xs font-mono text-slate-textMuted pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-electric" />
                      <span>Net Cash Inflow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-gold" />
                      <span>Supplier Outflows</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
