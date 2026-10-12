'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';
import { ArrowRight, Lock, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export function FooterAndCTA() {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-midnight">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-electric/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl glass-panel-elevated p-10 sm:p-16 border border-electric/30 text-center relative overflow-hidden">
            {/* Fine decorative grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-mono uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Activate Your Vendor Infrastructure
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                Bring Your Entire Business{' '}
                <span className="bg-gradient-to-r from-electric via-white to-gold bg-clip-text text-transparent">
                  Into Focus.
                </span>
              </h2>

              <p className="text-base sm:text-xl text-slate-textSecondary max-w-xl mx-auto mb-10 leading-relaxed">
                Less manual work. Better payment visibility. One connected workspace.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 shadow-[0_0_30px_rgba(79,140,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Create Your Account</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-slate-textSecondary hover:text-white glass-panel border border-electric/25 hover:border-electric/50 transition-all hover:bg-white/5"
                >
                  <span>Sign In to VENDORA</span>
                  <Lock className="w-4 h-4 text-slate-textMuted" />
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-slate-textMuted">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Supabase Auth • Multi-Tenant RLS Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-[#030711] border-t border-electric/15 pt-16 pb-12 text-slate-textMuted text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <Logo size="md" showTagline />
              <p className="text-slate-textSecondary max-w-sm leading-relaxed text-sm">
                Next-generation raw material supply & financial orchestration platform for builders. Connect real estate developers, steel rolling mills, cement plants, and multi-rail settlements into a unified operating terminal.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Systems Operational
                </span>
                <span>•</span>
                <span>v2.4.0-stable</span>
              </div>
            </div>

            {/* Column 2: Platform Modules */}
            <div>
              <h4 className="text-white font-mono uppercase font-bold tracking-wider mb-4 text-xs">
                Platform
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/inventory" className="hover:text-white transition-colors">Smart Inventory</Link></li>
                <li><Link href="/payments" className="hover:text-white transition-colors">Payments & Rails</Link></li>
                <li><Link href="/companies" className="hover:text-white transition-colors">Supplier Directory</Link></li>
                <li><Link href="/payment-scheduler" className="hover:text-white transition-colors">Payment Scheduler</Link></li>
                <li><Link href="/invoices" className="hover:text-white transition-colors">Invoices & POs</Link></li>
                <li><Link href="/cash-flow" className="hover:text-white transition-colors">Cash Flow Analytics</Link></li>
              </ul>
            </div>

            {/* Column 3: Portals & Account */}
            <div>
              <h4 className="text-white font-mono uppercase font-bold tracking-wider mb-4 text-xs">
                Access
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/login" className="hover:text-white transition-colors">Vendor Login</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">New Registration</Link></li>
                <li><Link href="/forgot-password" className="hover:text-white transition-colors">Password Recovery</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Live Dashboard</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security Architecture</a></li>
              </ul>
            </div>

            {/* Column 4: Governance & Legal */}
            <div>
              <h4 className="text-white font-mono uppercase font-bold tracking-wider mb-4 text-xs">
                Governance
              </h4>
              <ul className="space-y-2.5">
                <li><span className="text-slate-400">Terms of Service</span></li>
                <li><span className="text-slate-400">Privacy Policy</span></li>
                <li><span className="text-slate-400">Security Architecture</span></li>
                <li><span className="text-slate-400">Row Level Security Whitepaper</span></li>
                <li><span className="text-slate-400">Audit Compliance Logs</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
            <div>
              Â© {new Date().getFullYear()} VENDORA TECHNOLOGIES. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Secured by Supabase Auth</span>
              <span>â€¢</span>
              <span>PostgreSQL Multi-Tenant RLS</span>
              <span>â€¢</span>
              <span>React Three Fiber 3D</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
