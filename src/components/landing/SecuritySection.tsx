'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  KeyRound, 
  FileCheck, 
  History, 
  FileKey
} from 'lucide-react';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Protected Vendor Accounts',
      description: 'Hardened authentication with secure password hashing, brute-force throttling, and token-based session management powered by Supabase Auth.',
      badge: 'AUTH ARCHITECTURE',
    },
    {
      icon: Users,
      title: 'Organization-Level Access Control',
      description: 'Strict multi-tenant Row Level Security (RLS) guarantees complete data isolation between corporate entities and partner accounts.',
      badge: 'DATA ISOLATION',
    },
    {
      icon: KeyRound,
      title: 'Secure Payment-Provider Authorization',
      description: 'OAuth 2.0 authorization flows and encrypted credentials safeguard payment rail connectivity with zero plaintext storage.',
      badge: 'RAIL INTEGRATION',
    },
    {
      icon: FileCheck,
      title: 'Verified Payment Status Updates',
      description: 'Cryptographically signed webhook payloads verify every transaction settlement event before mutating vendor ledger balances.',
      badge: 'VERIFIED SETTLEMENT',
    },
    {
      icon: History,
      title: 'Auditable Transaction History',
      description: 'Every PO creation, payment release, and inventory adjustment creates an immutable, timestamped audit log entry.',
      badge: 'GOVERNANCE AUDIT',
    },
    {
      icon: FileKey,
      title: 'Controlled Access to Documents',
      description: 'Time-limited signed URLs and role-based permissions strictly govern invoices, POs, and sensitive vendor tax records.',
      badge: 'DOCUMENT VAULT',
    },
  ];

  return (
    <section id="security" className="py-24 relative overflow-hidden bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero-Trust Architectural Baseline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Financial Clarity{' '}
            <span className="text-slate-textMuted font-light">Without Compromising Security.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            Every transaction, balance, and supplier interaction is guarded by strictly verified architectural
            controls designed to eliminate unauthorized data leakage.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel p-6 border border-electric/20 hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-[#0A192F] border border-electric/15 text-slate-textMuted">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-textSecondary leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsible Engineering Disclosure Box */}
        <div className="mt-12 p-5 rounded-xl bg-[#0A192F]/60 border border-electric/15 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-textMuted leading-relaxed">
            <strong className="text-white">Strict Transparency Commitment:</strong> VENDORA relies exclusively on
            verified technical security protocols implemented directly into our stack. We do not advertise unverified
            third-party certifications or speculative regulatory affiliations.
          </p>
        </div>
      </div>
    </section>
  );
}
