'use client';

import React, { useState } from 'react';
import { PRICING_PLANS, PRICING_NOTE } from '@/config/pricing';
import { Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#070E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-wider mb-4">
            Configurable Enterprise Tiers
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Transparent Pricing.{' '}
            <span className="text-slate-textMuted font-light">Predictable Scaling.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            Choose the capacity profile that fits your vendor transaction velocity. No hidden wire fees.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-[#0A192F] border border-electric/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-electric text-white shadow-[0_0_15px_rgba(79,140,255,0.3)]'
                  : 'text-slate-textMuted hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-electric text-white shadow-[0_0_15px_rgba(79,140,255,0.3)]'
                  : 'text-slate-textMuted hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold text-midnight font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {PRICING_PLANS.map((plan) => {
            const isAnnual = billingCycle === 'annual';
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'glass-panel-gold border-gold/50 shadow-[0_15px_50px_rgba(212,175,55,0.15)] ring-1 ring-gold/40'
                    : 'glass-panel border-electric/20 hover:border-electric/40'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-muted via-gold to-gold-light text-midnight text-[10px] font-mono font-bold tracking-widest uppercase shadow">
                    RECOMMENDED FOR SCALING VENDORS
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      [INDICATIVE TIER]
                    </span>
                  </div>
                  <p className="text-xs text-slate-textSecondary mb-6 min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-electric/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white font-mono">₹{price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-textMuted">/ month</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono block mt-1">
                      {isAnnual ? `Billed annually (₹${(price * 12).toLocaleString('en-IN')}/yr)` : 'Billed on a monthly basis'}
                    </span>
                  </div>

                  {/* Capacity Limits */}
                  <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#050B18]/60 border border-electric/10 text-xs">
                    <div className="flex justify-between text-slate-textMuted">
                      <span>Invoices:</span>
                      <span className="font-semibold text-white font-mono">{plan.limits.monthlyInvoices}</span>
                    </div>
                    <div className="flex justify-between text-slate-textMuted">
                      <span>Suppliers:</span>
                      <span className="font-semibold text-white font-mono">{plan.limits.suppliers}</span>
                    </div>
                    <div className="flex justify-between text-slate-textMuted">
                      <span>Seats:</span>
                      <span className="font-semibold text-white font-mono">{plan.limits.teamMembers}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[11px] font-mono uppercase text-slate-textMuted tracking-wider block mb-2">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-textSecondary">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isPopular ? 'text-gold' : 'text-electric'
                          }`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/signup"
                  className={`w-full py-3.5 rounded-xl text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-gradient-to-r from-gold-muted via-gold to-gold-light text-midnight hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'bg-electric text-white hover:bg-electric-600 shadow-[0_0_20px_rgba(79,140,255,0.25)]'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Configurable Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-textMuted font-mono text-center max-w-2xl mx-auto">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>{PRICING_NOTE}</span>
        </div>
      </div>
    </section>
  );
}
