'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types/auth';
import { 
  Settings, 
  Building2, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  Users, 
  CheckCircle2, 
  Save,
  Key
} from 'lucide-react';

export default function SettingsPage() {
  const { user, organization, role, switchRole } = useAuth();

  const [businessName, setBusinessName] = useState(organization?.name || 'Vendora Infra & Materials Supply Pvt Ltd');
  const [businessType, setBusinessType] = useState(organization?.businessType || 'Bulk Raw Materials Supply to Builders & Infrastructure Developers');
  const [taxId, setTaxId] = useState(organization?.taxId || '27AABCV8910F1Z2');
  const [savedNotice, setSavedNotice] = useState(false);

  const teamMembers = [
    { name: 'Sarah Chen', email: 'sarah.chen@nexusdynamics.io', role: 'owner', status: 'Active' },
    { name: 'Marcus Vance', email: 'marcus.vance@nexusdynamics.io', role: 'finance', status: 'Active' },
    { name: 'Elena Rostova', email: 'elena.rostova@nexusdynamics.io', role: 'inventory_manager', status: 'Active' },
    { name: 'Devon Hayes', email: 'devon.hayes@nexusdynamics.io', role: 'read_only', status: 'Invited' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Organization & Security Settings
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Entity profile, role-based access governance, and payment rail credentials
            </p>
          </div>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Organization profile successfully updated.</span>
          </div>
        )}

        {/* Section 1: Business Profile */}
        <div className="p-6 rounded-2xl glass-panel border border-electric/20 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-electric/15">
            <Building2 className="w-5 h-5 text-electric" />
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Legal Entity Profile
            </h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                  Business Legal Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                  Tax Registration Identifier
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                Business Classification
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold flex items-center gap-2 shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save Entity Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Team Members & RBAC Permissions */}
        <div className="p-6 rounded-2xl glass-panel border border-electric/20 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-electric/15">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-gold" />
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Team Members & RBAC Permissions
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-textMuted">
              Current Session: <strong className="text-white capitalize">{role.replace('_', ' ')}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono">
                  <th className="py-2.5">NAME</th>
                  <th className="py-2.5">EMAIL</th>
                  <th className="py-2.5">ASSIGNED ROLE</th>
                  <th className="py-2.5">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {teamMembers.map((m, i) => (
                  <tr key={i} className="hover:bg-electric/5">
                    <td className="py-3 font-semibold text-white">{m.name}</td>
                    <td className="py-3 font-mono text-slate-textMuted">{m.email}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-electric/15 text-electric border border-electric/30 uppercase">
                        {m.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-[10px] font-mono text-emerald-400">{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Payment Rail Gateways */}
        <div className="p-6 rounded-2xl glass-panel border border-electric/20 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-electric/15">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Connected Settlement Rails
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { name: 'RBI RTGS & NEFT Direct Corporate Gateway (INR)', status: 'Active & Verified', fee: '₹0.00 / RBI Native' },
              { name: 'NPCI IMPS & UPI Corporate Bulk AutoPay (INR)', status: 'Active & Pre-Funded', fee: '₹0.00 / Instant 24x7' },
              { name: 'Host-to-Host Corporate Core Banking (HDFC / ICICI / SBI)', status: 'Active & Enclave Protected', fee: 'Direct Treasury Sync' },
            ].map((rail, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#050B18]/70 border border-electric/15 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{rail.name}</span>
                  <span className="text-[11px] text-slate-textMuted font-mono">{rail.fee}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {rail.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
