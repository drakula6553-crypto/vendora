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

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

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
      className="relative rounded-2xl glass-panel p-7 border border-electric/20 hover:border-electric/50 hover:shadow-[0_15px_40px_rgba(79,140,255,0.18)] flex flex-col justify-between group overflow-hidden"
    >
      {/* Background glow spot */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-electric/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div>
        {/* Header with Icon and Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 p-3 rounded-xl bg-electric/10 text-electric border border-electric/25 group-hover:border-electric/60 group-hover:bg-electric/20 transition-all">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-[#0A192F] border border-electric/20 text-slate-textMuted group-hover:text-electric transition-colors">
            {tag}
          </span>
        </div>

        {/* Title and descriptions */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-electric transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono text-gold mb-3">{subtitle}</p>
        <p className="text-sm text-slate-textSecondary leading-relaxed mb-6">
          {description}
        </p>

        {/* Live Metric Badge */}
        <div className="p-3 rounded-xl bg-[#050B18]/70 border border-electric/15 mb-6">
          <div className="text-[11px] font-mono uppercase text-slate-textMuted tracking-wider mb-0.5">
            {metricLabel}
          </div>
          <div className="text-lg font-bold text-white font-mono flex items-center justify-between">
            <span>{metric}</span>
            <span className="text-xs text-emerald-400 font-sans font-medium flex items-center">
              Active <TrendingUp className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        {/* Bullet features */}
        <ul className="space-y-2 mb-6">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-textMuted">
              <Check className="w-3.5 h-3.5 text-electric flex-shrink-0" />
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
      metric: '₹4.82 Cr Cleared 30d',
      metricLabel: 'Net Transaction Volume',
      tag: 'MODULE 03',
      features: [
        'Split payment disbursements for dumper haulers',
        'RBI RTGS transaction UTR confirmation hooks',
        'Real-time builder site reconciliation status',
      ],
    },
    {
      icon: CalendarClock,
      title: 'Payment Scheduling',
      subtitle: 'Predictive Cash Flow Dispatch',
      description: 'Schedule payouts to rolling mills and quarries based on builder milestone collections to protect working capital float.',
      href: '/payment-scheduler',
      metric: '₹1.50 Cr Scheduled Obligations',
      metricLabel: 'Scheduled Payables Matrix',
      tag: 'MODULE 04',
      features: [
        'Interactive timeline for steel mill LC and wire maturities',
        'Batch auto-approval rules for vetted dumper fleets',
        'Early-settlement cash discount capture on bulk cement',
      ],
    },
    {
      icon: FileText,
      title: 'Invoices & Weighbridge Matching',
      subtitle: '2-Way Automated Slip Reconciliation',
      description: 'Generate legally binding purchase orders, ingest builder RA bills, and automatically match weighbridge delivery challans.',
      href: '/invoices',
      metric: '100% Matching Accuracy',
      metricLabel: 'Discrepancy Defense',
      tag: 'MODULE 05',
      features: [
        'Automated PO-to-Weighbridge challan matching',
        'Printable tax invoice & payment voucher exports',
        'Digital signature & site engineer approval trails',
      ],
    },
    {
      icon: BarChart3,
      title: 'Cash Flow & Working Capital',
      subtitle: 'Executive Financial Terminal',
      description: 'Real-time runway indicators, burn rates, working capital indices, and automated executive financial reporting in INR (₹).',
      href: '/cash-flow',
      metric: '24.2 Months Runway',
      metricLabel: 'Liquidity Health Index',
      tag: 'MODULE 06',
      features: [
        'Forward scenario projections for Net-30 vs Net-45 RA bills',
        'Receivable vs Payable curve graphs for builder projects',
        'One-click CFO bank statement & general ledger exports',
      ],
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#070E1E]">
      {/* Background Grid & Light */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-electric/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric/10 border border-electric/30 text-electric text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Unified Architectural Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Every Business Workflow.{' '}
            <span className="bg-gradient-to-r from-electric to-gold bg-clip-text text-transparent">
              Connected.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-textSecondary leading-relaxed">
            Eliminate silos between inventory, banking rails, and partner relationships.
            VENDORA weaves your daily operations into a synchronized intelligent system.
          </p>
        </div>

        {/* 6 Feature Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {modules.map((mod, idx) => (
            <TiltFeatureCard key={idx} {...mod} />
          ))}
        </div>
      </div>
    </section>
  );
}
