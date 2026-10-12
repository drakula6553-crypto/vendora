'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import {
  TrendingUp,
  Package,
  CreditCard,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, organization, role } = useAuth();
  const [approvals, setApprovals] = useState([
    { id: 'APP-101', counterparty: 'Tata Steel Ltd (TMT Division)', amount: '₹54,80,000.00', type: 'RTGS Immediate', requester: 'Marcus Vance', date: 'Today, 11:20 AM', status: 'PENDING' },
    { id: 'APP-102', counterparty: 'UltraTech Cement Bulk Works', amount: '₹32,40,000.00', type: 'NEFT Direct', requester: 'Elena Rostova', date: 'Today, 09:14 AM', status: 'PENDING' },
  ]);

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter((a) => a.id !== id));
  };

  const isReadOnly = role === 'read_only';
  const canApprove = role === 'owner' || role === 'admin' || role === 'finance';

  return (
    <PortalLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-electric/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Autonomous Operations Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.fullName || 'Sarah'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-textMuted mt-1">
              Organization: <span className="text-white font-medium">{organization?.name}</span> • Active Role:{' '}
              <span className="text-electric font-semibold capitalize">{role.replace('_', ' ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isReadOnly && (
              <>
                <Link
                  href="/payments"
                  className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Initiate Payout</span>
                </Link>
                <Link
                  href="/purchase-orders"
                  className="px-4 py-2.5 rounded-xl glass-panel hover:bg-white/5 border border-electric/25 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <span>Create PO</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 4 Executive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl glass-panel border-electric/25 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-textMuted">Available Liquidity</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹1,24,83,200.00</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% MoM net surplus</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-electric/25">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-textMuted">Inbound Receivables</span>
              <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹48,91,500.00</div>
            <div className="mt-2 text-xs text-slate-textMuted">18 builder RA bills maturing</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-electric/25">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-textMuted">Outbound Payables</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹21,48,000.00</div>
            <div className="mt-2 text-xs text-amber-400">Due across next 14 calendar days</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel-gold border-gold/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-gold">Stockyard Valuation</span>
              <Package className="w-4 h-4 text-gold" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹3,84,09,000.00</div>
            <div className="mt-2 text-xs text-slate-textMuted">TMT, Cement & Aggregate Yards</div>
          </div>
        </div>

        {/* Dual Panel Layout: Pending Payout Approvals & Live Telemetry Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals (RBAC Restricted) */}
          <div className="lg:col-span-2 rounded-2xl glass-panel p-6 border-electric/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-electric/15">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-electric" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Dual-Authorization Payout Queue
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-textMuted">
                {approvals.length} pending
              </span>
            </div>

            {approvals.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-textMuted">
                All scheduled vendor payouts are fully authorized and dispatched.
              </div>
            ) : (
              <div className="space-y-3">
                {approvals.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#050B18]/70 border border-electric/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{item.counterparty}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-textMuted">
                        Requested by {item.requester} â€¢ {item.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-base font-extrabold text-white font-mono">{item.amount}</span>
                      {canApprove ? (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
                        >
                          Approve Wire
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 italic">
                          Approval requires Finance / Owner role
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Module Navigation Cards */}
          <div className="rounded-2xl glass-panel p-6 border-electric/20 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4">
                Operations Telemetry
              </h3>

              <div className="space-y-3">
                <Link
                  href="/inventory"
                  className="p-3 rounded-xl bg-[#050B18]/60 border border-electric/15 hover:border-electric/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-electric" />
                    <span className="text-xs font-medium text-slate-textSecondary group-hover:text-white">
                      Inventory Reorder Thresholds
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-textMuted group-hover:text-white" />
                </Link>

                <Link
                  href="/payment-scheduler"
                  className="p-3 rounded-xl bg-[#050B18]/60 border border-electric/15 hover:border-electric/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-xs font-medium text-slate-textSecondary group-hover:text-white">
                      Upcoming Payout Calendar
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-textMuted group-hover:text-white" />
                </Link>

                <Link
                  href="/cash-flow"
                  className="p-3 rounded-xl bg-[#050B18]/60 border border-electric/15 hover:border-electric/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-textSecondary group-hover:text-white">
                      Working Capital Runway
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-textMuted group-hover:text-white" />
                </Link>

                <Link
                  href="/documents"
                  className="p-3 rounded-xl bg-[#050B18]/60 border border-electric/15 hover:border-electric/40 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-textSecondary group-hover:text-white">
                      Compliance & Tax Vault
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-textMuted group-hover:text-white" />
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-electric/15 text-[11px] font-mono text-slate-textMuted flex items-center justify-between">
              <span>LEDGER SYNC: REAL-TIME</span>
              <span className="text-emerald-400">STATUS: HEALTHY</span>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
