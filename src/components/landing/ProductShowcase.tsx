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
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-electric to-gold text-white shadow-[0_0_25px_rgba(79,140,255,0.4)] border border-transparent'
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
        <div className="rounded-3xl glass-panel-elevated border border-electric/30 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-electric/20">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">
                VENDORA Command Center
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-textMuted">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="ml-1">System Status: Operational</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span>Uptime: 99.9%</span>
              <span>Latency: 12ms</span>
              <span className="text-gold">Last Sync: 2m ago</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-medium text-slate-textMuted">Active Modules</p>
                    <p className="text-2xl font-bold text-white">6/6</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl glass-panel p-4 border border-electric/15">
                    <div className="text-xs font-mono text-slate-textMuted">Inventory Value</div>
                    <div className="text-2xl font-bold text-white">₹3.84 Cr</div>
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="ml-1 text-xs text-emerald-400">+12.4% MoM</span>
                    </div>
                  </div>
                  <div className="rounded-xl glass-panel p-4 border border-electric/15">
                    <div className="text-xs font-mono text-slate-textMuted">Pending POs</div>
                    <div className="text-2xl font-bold text-white">142</div>
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400/20 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                      </span>
                      <span className="ml-1 text-xs text-amber-400">Requiring Review</span>
                    </div>
                  </div>
                  <div className="rounded-xl glass-panel p-4 border border-electric/15">
                    <div className="text-xs font-mono text-slate-textMuted">Cash Flow</div>
                    <div className="text-2xl font-bold text-white">₹1.24 Cr</div>
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="ml-1 text-xs text-emerald-400">+8.2% MoM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="rounded-xl glass-panel p-6 border border-electric/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Smart Inventory Alerts</h4>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700/20 text-slate-textSecondary hover:bg-white/5">
                      View Details
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">TMT Steel Rebar</p>
                        <p className="text-base font-semibold text-white">Critical Low: MSAND-ZONE-2</p>
                      </div>
                      <div className="text-xs font-mono text-emerald-400">45 MT &#8211; Reorder Now</div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">Ready-Mix Concrete</p>
                        <p className="text-base font-semibold text-white">Optimal: RMC-M30-PUMP</p>
                      </div>
                      <div className="text-xs font-mono text-slate-textSecondary">650 m³ &#8211; 150m³ Min</div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">Cement Bags</p>
                        <p className="text-base font-semibold text-white">Reorder Triggered: CEM-ULTRA-53</p>
                      </div>
                      <div className="text-xs font-mono text-amber-400">1,850 bags &#8211; 2,000 Min</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="rounded-xl glass-panel p-6 border border-electric/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Recent Settlements</h4>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700/20 text-slate-textSecondary hover:bg-white/5">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">Tata Steel Ltd</p>
                        <p className="text-base font-semibold text-white">₹54,80,000.00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </span>
                        <span className="ml-1 text-xs text-emerald-400">RTGS &#8211; Settled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">UltraTech Cement</p>
                        <p className="text-base font-semibold text-white">₹32,40,000.00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400/20 flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                        </span>
                        <span className="ml-1 text-xs text-amber-400">NEFT &#8211; Processing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#081020]/50 border border-electric/15">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-textMuted">Lodha Developers</p>
                        <p className="text-base font-semibold text-white">₹84,50,000.00</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </span>
                        <span className="ml-1 text-xs text-emerald-400">IMPS &#8211; Settled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'companies' && (
              <div className="space-y-6">
                <div className="rounded-xl glass-panel p-6 border border-electric/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Supplier Network Health</h4>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700/20 text-slate-textSecondary hover:bg-white/5">
                      Explore Directory
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Active Suppliers</div>
                      <div className="text-2xl font-bold text-white">142</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">+8 this month</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Avg. Payment Terms</div>
                      <div className="text-base font-semibold text-white">Net-28</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">-2 days vs last quarter</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">On-Time Delivery Rate</div>
                      <div className="text-base font-semibold text-white">94%</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">+3% YoY</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Quality Disputes</div>
                      <div className="text-base font-semibold text-white">0.8%</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">-0.3% YoY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="rounded-xl glass-panel p-6 border border-electric/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Key Performance Indicators</h4>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700/20 text-slate-textSecondary hover:bg-white/5">
                      View Full Report
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Days Sales Outstanding</div>
                      <div className="text-base font-semibold text-white">42 days</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">-5 days vs target</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Inventory Turnover</div>
                      <div className="text-base font-semibold text-white">8.4x</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">+1.2x QoQ</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Working Capital Ratio</div>
                      <div className="text-base font-semibold text-white">1.8</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">+0.3 QoQ</span>
                      </div>
                    </div>
                    <div className="rounded-xl glass-panel p-4 border border-electric/15">
                      <div className="text-sm font-medium text-slate-textMuted">Cash Conversion Cycle</div>
                      <div className="text-base font-semibold text-white">58 days</div>
                      <div className="flex items-center mt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="ml-1 text-xs text-emerald-400">-7 days vs last quarter</span>
                      </div>
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
