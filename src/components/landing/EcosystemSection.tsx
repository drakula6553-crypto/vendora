'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  Building2, 
  CreditCard, 
  CalendarClock, 
  FileText, 
  BarChart3, 
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Check
} from 'lucide-react';

interface EcosystemCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  metric: string;
  metricLabel: string;
  features: string[];
  tag: string;
}

function TiltFeatureCard({
  icon: Icon,
  title,
  subtitle,
  description,
  href,
  metric,
  metricLabel,
  features,
  tag,
}: EcosystemCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative rounded-2xl glass-panel p-8 border border-electric/20 hover:border-electric/50 hover:shadow-[0_20px_50px_rgba(79,140,255,0.2)] flex flex-col justify-between group overflow-hidden"
    >
      {/* Background glow spot */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-electric/10 rounded-full blur-3xl group-hover:scale-130 transition-transform duration-500 pointer-events-none" />

      <div>
        {/* Header with Icon and Tag */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 p-4 rounded-xl bg-electric/10 text-electric border border-electric/25 group-hover:border-electric/60 group-hover:bg-electric/20 transition-all">
            <Icon className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded bg-[#081020] border border-electric/20 text-slate-textMuted group-hover:text-electric transition-colors">
            {tag}
          </span>
        </div>

        {/* Title and descriptions */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-electric transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono text-gold mb-4">{subtitle}</p>
        <p className="text-sm text-slate-textSecondary leading-relaxed mb-6">
          {description}
        </p>

        {/* Live Metric Badge */}
        <div className="p-4 rounded-xl bg-[#040912]/80 border border-electric/15 mb-6">
          <div className="text-[11px] font-mono uppercase text-slate-textMuted tracking-wider mb-1">
            {metricLabel}
          </div>
          <div className="text-xl font-bold text-white font-mono flex items-center justify-between">
            <span>{metric}</span>
            <span className="text-xs text-emerald-400 font-sans font-medium flex items-center">
              Active <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Bullet features */}
        <ul className="space-y-3 mb-6">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-xs text-slate-textMuted">
              <Check className="w-4 h-4 text-electric flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-electric/15 flex items-center justify-between">
        <Link
          href={href}
          className="text-xs font-semibold text-white group-hover:text-electric flex items-center gap-1.5 transition-colors"
        >
          <span>Open Module in Portal</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <span className="text-[10px] font-mono text-slate-600 group-hover:text-slate-400">
          RBAC PROTECTED
        </span>
      </div>
    </div>
  );
}

export function EcosystemSection() {
  const modules: EcosystemCardProps[] = [
    {
      icon: Package,
      title: 'Stockyard & Material Inventory',
      subtitle: 'TMT, RMC, Cement & Aggregates',
      description: 'Unified raw material catalog across yards and batch plants with automatic reorder triggers and weighbridge telemetry.',
      href: '/inventory',
      metric: '42,800 MT Materials Active',
      metricLabel: 'Stockyard Threshold Tracking',
      tag: 'MODULE 01',
      features: [
        'Multi-yard allocation for steel, cement & aggregates',
        'Automatic reorder alerts on minimum metric tonnes',
        'Direct PO linkage upon quarry & mill stock dips',
      ],
    },
    {
      icon: Building2,
      title: 'Builder & Supplier Registry',
      subtitle: 'Developers, Mills & Fleet Carriers',
      description: 'Manage verified real estate developer site profiles, primary steel/cement mills, and dumper fleet contracts in one vault.',
      href: '/companies',
      metric: '142 Active Builder Sites',
      metricLabel: 'Construction Partner Directory',
      tag: 'MODULE 02',
      features: [
        'GSTIN, E-Way bill & RERA documentation vaults',
        'Custom RA Bill Net-15/30/45 payment terms',
        'On-time site delivery conformance ratings',
      ],
    },
    {
      icon: CreditCard,
      title: 'Payments Made & Received',
      subtitle: 'Multi-Rail Builder Liquidity Engine',
      description: 'Track incoming builder RA bill collections and outgoing primary steel/cement mill wire releases via RTGS, NEFT & IMPS.',
      href: '/payments',
      metric: 'â‚¹4.82 Cr Cleared 30d',
      metricLabel: 'Net Transaction Volume',
      tag: 'MODULE 03',
      features: [
        'Split payment disbursements for dumper haulers',
        'RBI RTGS transaction UTR confirmation hooks',
        'Automated NEFT/IMPS clearing with bank validation',
        'Escrow management for milestone-based payments',
      ],
    },
    {
      icon: CalendarClock,
      title: 'Payment Scheduler & Cash Flow',
      subtitle: '30-Day Outflow Timeline & Predictive Analytics',
      description: 'Forecast cash inflows/outflows, schedule automated payouts, and model liquidity scenarios for builder milestone payments.',
      href: '/payment-scheduler',
      metric: '92% On-Time Payments',
      metricLabel: 'Payment Schedule Adherence',
      tag: 'MODULE 04',
      features: [
        'Automated payment scheduling based on invoice due dates',
        'Scenario modeling for cash runway extension',
        'Builder milestone tracking with conditional payouts',
        'Bank holiday and weekend adjustment algorithms',
      ],
    },
    {
      icon: FileText,
      title: 'Invoices & Purchase Orders',
      subtitle: 'Two/Three-Way Matching & Reconciliation',
      description: 'Match POs, GRNs, and invoices with automated discrepancy detection and resolution workflows.',
      href: '/invoices',
      metric: '98% Match Accuracy',
      metricLabel: 'Reconciliation Success Rate',
      tag: 'MODULE 05',
      features: [
        'Three-way match (PO + GRN + Invoice) automation',
        'Real-time discrepancy flagging for quantities/pricing',
        'Automated GRN generation from weighbridge data',
        'Partial payment tracking with balance due calculations',
      ],
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      subtitle: 'Real-Time Dashboards & Predictive Insights',
      description: 'Monitor key performance indicators, track working capital, and forecast cash flow with AI-powered models.',
      href: '/analytics',
      metric: '15+ Live Dashboards',
      metricLabel: 'Active Monitoring Views',
      tag: 'MODULE 06',
      features: [
        'Working capital optimization recommendations',
        'Predictive cash flow modeling with confidence intervals',
        'Builder performance scoring & risk assessment',
        'Custom report builder with scheduled exports',
      ],
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-midnight">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-electric/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The VENDORA Ecosystem
          </h2>
          <p className="text-sm text-slate-textMuted mt-4 max-w-xl mx-auto">
            Six interconnected modules working in harmony to manage your entire raw material supply chain &#8211; from quarry to builder payment.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {modules.map((module) => (
            <TiltFeatureCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </section>
  );
}
