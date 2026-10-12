'use client';

import React from 'react';
import { Network, SlidersHorizontal, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Connect your business.',
      description: 'Add builder developers, raw materials, steel mills, and opening balances. Import existing project catalogs in seconds.',
      icon: Network,
      details: [
        'One-click CSV import for builder site codes & mill catalogs',
        'Configure custom RA Bill Net-terms & retention money',
        'Set initial stockyard baselines & batch plant locations',
      ],
      color: 'from-blue-500/20 to-electric/20 border-electric/30',
      badge: 'SETUP PHASE',
    },
    {
      number: '02',
      title: 'Manage everything.',
      description: 'Track developer orders, delivery challans, stockyards, and payouts in one workspace. Every weighbridge slip syncs across the ledger.',
      icon: SlidersHorizontal,
      details: [
        'Automatic PO-to-Weighbridge challan reconciliation',
        'Live stockyard threshold decrement upon site truck dispatch',
        'Direct multi-rail RTGS / NEFT / IMPS corporate releases',
      ],
      color: 'from-electric/20 to-blue-600/20 border-electric/40',
      badge: 'EXECUTION PHASE',
    },
    {
      number: '03',
      title: 'Stay in control.',
      description: 'Monitor cash flow, upcoming mill obligations, completed builder receipts, and outstanding RA balances with zero manual work.',
      icon: Activity,
      details: [
        '90-day predictive working capital modeling for builder milestones',
        'Automated payment calendar & mill LC obligation alerts',
        'Instant audited general ledger & bank statement exports',
      ],
      color: 'from-gold/20 to-amber-500/20 border-gold/40',
      badge: 'GOVERNANCE PHASE',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#070E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric/10 border border-electric/30 text-electric text-xs font-mono uppercase tracking-wider mb-4">
            Deployment Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Precision in Three Steps.
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            From initial onboarding to autonomous multi-vendor cash flow operations in less than 15 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-electric/0 via-electric/30 to-gold/0 -translate-y-12 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 rounded-2xl glass-panel p-8 border hover:border-electric/60 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(79,140,255,0.15)] flex flex-col justify-between group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold font-mono text-transparent bg-gradient-to-br from-white via-slate-400 to-slate-600 bg-clip-text">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded bg-[#0A192F] border border-electric/20 text-slate-textMuted group-hover:text-electric transition-colors">
                      {step.badge}
                    </span>
                  </div>

                  {/* Step Icon */}
                  <div className="w-14 h-14 rounded-xl bg-electric/10 text-electric border border-electric/25 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-textSecondary leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-4 border-t border-electric/15 mb-6">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-textMuted">
                        <CheckCircle2 className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-electric group-hover:text-white transition-colors"
                >
                  <span>Start with Step {step.number}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
