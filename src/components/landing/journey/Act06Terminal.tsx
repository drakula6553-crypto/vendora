'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Zap,
  Globe,
  Server,
  Cpu,
} from 'lucide-react';

export function Act06Terminal() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const tiers = [
    {
      name: 'Project Site Standard',
      badge: 'FOR SINGLE DEVELOPER',
      priceMonthly: '₹29,999',
      priceAnnual: '₹24,999',
      desc: 'Essential digital weighbridge sensor integration, vendor portal, and PO tracking for up to 3 project sites.',
      features: [
        'Up to 3 Active Construction Sites',
        'Weighbridge Hardware Sensor API Hook',
        'Digital Challan QR Validation',
        'Basic 3-Way Match Verification',
        'Standard Email & Phone Support',
      ],
      ctaText: 'Deploy Standard',
      href: '/signup',
      highlighted: false,
    },
    {
      name: 'Enterprise Infrastructure',
      badge: 'MOST POPULAR // INFRASTRUCTURE DEVELOPERS',
      priceMonthly: '₹89,999',
      priceAnnual: '₹74,999',
      desc: 'Full multi-site stockyard intelligence, automated 3-way reconciliation, multi-rail RTGS banking hooks, and ERP sync.',
      features: [
        'Unlimited Project Sites & Stockyards',
        'Full Sensor 3-Way Match & Fraud Blocker',
        'RBI RTGS / NEFT Automated Disbursement',
        'SAP, Oracle & Tally Accounting Sync',
        'Predictive Stockyard Burn-Rate Alerts',
        '99.95% Enterprise SLA Guarantee',
        'Dedicated Technical Account Engineer',
      ],
      ctaText: 'Launch Enterprise',
      href: '/signup',
      highlighted: true,
    },
    {
      name: 'Industrial Mill Sovereign',
      badge: 'CUSTOM RAIL FOR PRODUCERS',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      desc: 'Dedicated private VPC deployment, high-throughput weighbridge clusters, and direct mill-to-builder contract rails.',
      features: [
        'Private Cloud / Sovereign Deployment',
        'Custom Load-Cell Hardware Protocols',
        'Sub-Second Mill Dispatch Routing',
        'Custom Escrow Multi-Signatory Rules',
        '24/7 War-Room Support Team',
      ],
      ctaText: 'Contact Architecture Team',
      href: '/signup',
      highlighted: false,
    },
  ];

  return (
    <section id="act-06" className="relative min-h-screen py-28 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Terminal className="w-3.5 h-3.5" />
            ACT 06 // DEPLOYMENT GATEWAY & SPECIFICATION
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Transparent Pricing.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400">
              Immediate ROI.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Eliminating a single fraudulent 34-ton rebar challan pays for an entire year of Vendora. Choose your deployment tier below.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#050B14] border border-slate-800 mt-6 font-mono text-xs">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => {
            const price = billingCycle === 'annual' ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.name}
                className={`p-8 rounded-2xl backdrop-blur-2xl transition-all duration-300 relative flex flex-col justify-between ${
                  tier.highlighted
                    ? 'bg-[#071328]/95 border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,229,255,0.18)] scale-[1.02]'
                    : 'bg-[#050B14]/85 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    {tier.badge}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{tier.desc}</p>

                  <div className="mb-6 pb-6 border-b border-slate-800">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                      {price}
                    </span>
                    {price !== 'Custom' && (
                      <span className="text-xs text-slate-400 font-mono ml-2">/ month</span>
                    )}
                  </div>

                  <ul className="space-y-3 text-xs font-mono text-slate-300 mb-8">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.href}
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-mono uppercase font-bold tracking-wider transition-all block ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:brightness-110'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {tier.ctaText}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Final Terminal Console CTA Box */}
        <div className="rounded-3xl bg-gradient-to-r from-[#050B14] via-[#071124] to-[#050B14] border border-cyan-500/30 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Connect Your Supply Rail in Under 10 Minutes.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed font-normal">
              Join leading construction developers and material suppliers managing TMT rebars, RMC pours, and cement stockyards with zero manual paperwork.
            </p>

            <Link
              href="/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-mono uppercase font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Terminal className="w-4 h-4" />
              <span>Initialize Workspace Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                PostgreSQL RLS Protected
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                RBI RTGS Hook Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-amber-400" />
                Hardware Weighbridge API Ready
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Terminal Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} VENDORA TECHNOLOGIES • RAW MATERIALS & BUILDER SUPPLY OS</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-slate-300">Terminal Login</Link>
            <Link href="/signup" className="hover:text-slate-300">Register Organization</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
