'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv, downloadFile } from '@/lib/download-utils';
import { 
  Building2, 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  MoreVertical,
  X,
  CheckCircle2,
  Download,
  HardHat
} from 'lucide-react';

interface CompanyItem {
  id: string;
  name: string;
  type: 'Builder / Developer' | 'Material Supplier' | 'Fleet Logistics';
  projectSite?: string;
  email: string;
  phone: string;
  paymentTerms: string;
  openBalance: string;
  kycStatus: 'Verified' | 'Pending';
  taxId: string;
}

export default function CompaniesPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [companies, setCompanies] = useState<CompanyItem[]>([
    { 
      id: 'BLD-01', 
      name: 'Lodha Developers (Macrotech Ltd)', 
      type: 'Builder / Developer', 
      projectSite: 'Lodha Crown & World One Site, Worli',
      email: 'procurement@macrotech.in', 
      phone: '+91 22 6773 7000', 
      paymentTerms: 'RA Bill Net-30', 
      openBalance: '₹84,50,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AAACL1234F1Z9' 
    },
    { 
      id: 'BLD-02', 
      name: 'Godrej Properties & Infrastructure', 
      type: 'Builder / Developer', 
      projectSite: 'Godrej Horizon & Woods, Wadala',
      email: 'site.billing@godrejproperties.com', 
      phone: '+91 22 6169 8500', 
      paymentTerms: 'RA Bill Net-45', 
      openBalance: '₹1,18,20,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AAACG5678P2Z3' 
    },
    { 
      id: 'BLD-03', 
      name: 'L&T Construction (B&F IC Division)', 
      type: 'Builder / Developer', 
      projectSite: 'Coastal Road Package 2 Infrastructure',
      email: 'commercial.bf@lntecc.com', 
      phone: '+91 22 6752 5656', 
      paymentTerms: 'Milestone Net-45', 
      openBalance: '₹2,45,00,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AAACL9012E3Z7' 
    },
    { 
      id: 'SUP-01', 
      name: 'Tata Steel Ltd (TMT Rebar Division)', 
      type: 'Material Supplier', 
      projectSite: 'Kalinganagar & Tarapur Rolling Mills',
      email: 'corporate.sales@tatasteel.com', 
      phone: '+91 22 6665 8282', 
      paymentTerms: 'Advance / Net-15 LC', 
      openBalance: '₹54,80,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AAACT3456T4Z1' 
    },
    { 
      id: 'SUP-02', 
      name: 'UltraTech Cement Ltd (Aditya Birla)', 
      type: 'Material Supplier', 
      projectSite: 'Awarpur & Ratnagiri Bulk Terminal',
      email: 'bulkcement@ultratech.adityabirla.com', 
      phone: '+91 22 6691 7800', 
      paymentTerms: 'Net-15 Direct RTGS', 
      openBalance: '₹32,40,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AAACU7890B5Z8' 
    },
    { 
      id: 'LOG-01', 
      name: 'Navkar Transit & Dumper Logistics Fleet', 
      type: 'Fleet Logistics', 
      projectSite: 'Panvel Quarry - Navi Mumbai Corridor',
      email: 'dispatch@navkartranslog.in', 
      phone: '+91 22 2748 9100', 
      paymentTerms: 'Weekly Net-7 Fuel Rail', 
      openBalance: '₹8,90,000.00', 
      kycStatus: 'Verified', 
      taxId: '27AABCN4421K6Z4' 
    },
  ]);

  const [newCompany, setNewCompany] = useState({
    name: '',
    type: 'Builder / Developer' as 'Builder / Developer' | 'Material Supplier' | 'Fleet Logistics',
    projectSite: '',
    email: '',
    phone: '',
    paymentTerms: 'RA Bill Net-30',
    taxId: '',
  });

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name) return;

    const created: CompanyItem = {
      id: `ENT-0${companies.length + 1}`,
      name: newCompany.name,
      type: newCompany.type,
      projectSite: newCompany.projectSite || 'Primary Construction Site Hub',
      email: newCompany.email || 'billing@example.in',
      phone: newCompany.phone || '+91 22 0000 0000',
      paymentTerms: newCompany.paymentTerms,
      openBalance: '₹0.00',
      kycStatus: 'Verified',
      taxId: newCompany.taxId || '27AAACP0000A1Z0',
    };

    setCompanies([created, ...companies]);
    setIsModalOpen(false);
    setNewCompany({ name: '', type: 'Builder / Developer', projectSite: '', email: '', phone: '', paymentTerms: 'RA Bill Net-30', taxId: '' });
    showNotification(`Registered verified enterprise: ${created.name}`);
  };

  // Export Directory to CSV
  const handleExportDirectoryCsv = () => {
    const headers = ['Entity ID', 'Builder / Supplier Name', 'Relationship Type', 'Active Project / Site', 'Official Email', 'Helpline', 'Payment Terms', 'Open Balance (INR)', 'GSTIN Tax ID'];
    const rows = filtered.map((c) => [
      c.id,
      c.name,
      c.type,
      c.projectSite || 'N/A',
      c.email,
      c.phone,
      c.paymentTerms,
      c.openBalance,
      c.taxId,
    ]);

    downloadCsv(`Vendora_Builders_and_Suppliers_Directory_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showNotification('Downloaded Builder & Material Suppliers Directory (CSV).');
  };

  // Download Individual Company Profile
  const handleDownloadProfile = (comp: CompanyItem) => {
    const profile = `
================================================================================
           VENDORA BUILDER & RAW MATERIAL ENTERPRISE DOSSIER
================================================================================
Entity Code        : ${comp.id}
Corporate Name     : ${comp.name}
Business Role      : ${comp.type}
Designated Site    : ${comp.projectSite || 'Corporate Office'}
GSTIN Identifier   : ${comp.taxId}
Verification State : ${comp.kycStatus.toUpperCase()} (E-Way Bill & GST Compliant)
Settlement Terms   : ${comp.paymentTerms}
Current Book Balance: ${comp.openBalance}
Procurement Email  : ${comp.email}
Site Contact Phone : ${comp.phone}
Registry Authority : Ministry of Corporate Affairs / Maharashtra RERA / GSTN
Export Timestamp   : ${new Date().toLocaleString('en-IN')}
================================================================================
`.trim();

    downloadFile(`${comp.id}_${comp.name.replace(/[^a-zA-Z0-9]/g, '_')}_Dossier.txt`, profile, 'text/plain');
    showNotification(`Downloaded corporate dossier for ${comp.name}`);
  };

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.taxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.projectSite && c.projectSite.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const canEdit = role !== 'read_only';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Builder & Material Supplier Directory</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                B2B Developers
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Verified real estate developers, steel rolling mills, cement plants, and dumper fleet carriers
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportDirectoryCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Download directory as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export Directory (CSV)</span>
            </button>

            {canEdit && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Builder / Supplier</span>
              </button>
            )}
          </div>
        </div>

        {notice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search builders, project sites (e.g. Lodha, Godrej, L&T), or GSTIN numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
            />
          </div>
        </div>

        {/* Companies Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">BUILDER / SUPPLIER ENTITY</th>
                  <th className="py-3.5 px-4">ENTITY ROLE</th>
                  <th className="py-3.5 px-4">CONSTRUCTION PROJECT / SITE</th>
                  <th className="py-3.5 px-4">CREDIT TERMS</th>
                  <th className="py-3.5 px-4">OUTSTANDING BALANCE (₹)</th>
                  <th className="py-3.5 px-4">KYC & GST</th>
                  <th className="py-3.5 px-4">GSTIN ID</th>
                  <th className="py-3.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filtered.map((comp) => (
                  <tr key={comp.id} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        {comp.type === 'Builder / Developer' ? (
                          <Building2 className="w-4 h-4 text-electric" />
                        ) : (
                          <HardHat className="w-4 h-4 text-gold" />
                        )}
                        <span>{comp.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{comp.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        comp.type === 'Builder / Developer'
                          ? 'bg-electric/10 text-electric border-electric/30'
                          : comp.type === 'Material Supplier'
                          ? 'bg-gold/10 text-gold border-gold/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {comp.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      {comp.projectSite || 'Corporate Office'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-white">{comp.paymentTerms}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">{comp.openBalance}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{comp.kycStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-textSecondary">{comp.taxId}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownloadProfile(comp)}
                        className="px-2.5 py-1 rounded bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-[11px] font-medium flex items-center gap-1.5 ml-auto transition-colors"
                        title="Download Dossier"
                      >
                        <Download className="w-3 h-3 text-electric" />
                        <span>Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-electric/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <h3 className="text-lg font-bold text-white">Register Construction Partner</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCompany} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Builder / Company Registered Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    placeholder="e.g. Oberoi Realty Limited"
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Relationship Role
                    </label>
                    <select
                      value={newCompany.type}
                      onChange={(e) => setNewCompany({ ...newCompany, type: e.target.value as any })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="Builder / Developer">Builder / Developer (Customer)</option>
                      <option value="Material Supplier">Material Supplier (Primary Mill)</option>
                      <option value="Fleet Logistics">Fleet Logistics (Dumper Carrier)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      GSTIN Identifier
                    </label>
                    <input
                      type="text"
                      value={newCompany.taxId}
                      onChange={(e) => setNewCompany({ ...newCompany, taxId: e.target.value })}
                      placeholder="27AAAC00000A1Z5"
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Active Construction Site / Plant Location
                  </label>
                  <input
                    type="text"
                    value={newCompany.projectSite}
                    onChange={(e) => setNewCompany({ ...newCompany, projectSite: e.target.value })}
                    placeholder="e.g. Oberoi Sky City Tower D Site, Borivali"
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Procurement Email
                    </label>
                    <input
                      type="email"
                      value={newCompany.email}
                      onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                      placeholder="billing@oberoi.in"
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Site Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={newCompany.phone}
                      onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                      placeholder="+91 22 2849 1020"
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Settlement / Billing Terms
                  </label>
                  <select
                    value={newCompany.paymentTerms}
                    onChange={(e) => setNewCompany({ ...newCompany, paymentTerms: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Advance / Net-0">Advance / Immediate RTGS</option>
                    <option value="RA Bill Net-15">RA Bill Net-15 Days</option>
                    <option value="RA Bill Net-30">RA Bill Net-30 Days Standard</option>
                    <option value="RA Bill Net-45">RA Bill Net-45 Days Extended</option>
                    <option value="Milestone Net-60">Milestone Pour Net-60</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-textMuted hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow"
                  >
                    Register Enterprise
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
