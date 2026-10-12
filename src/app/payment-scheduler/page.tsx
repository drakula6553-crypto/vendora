'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv, downloadFile } from '@/lib/download-utils';
import { 
  CalendarClock, 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  X,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface ScheduledObligation {
  id: string;
  vendor: string;
  dueDate: string;
  amount: string;
  numericAmount: number;
  invoiceRef: string;
  discountAvailable?: string;
  autoRelease: boolean;
  status: 'Scheduled' | 'Funded' | 'Released';
}

export default function PaymentSchedulerPage() {
  const { role } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [obligations, setObligations] = useState<ScheduledObligation[]>([
    { 
      id: 'SCH-01', 
      vendor: 'Tata Steel Ltd (TMT Division)', 
      dueDate: 'In 3 days (Oct 15)', 
      amount: '₹54,80,000.00', 
      numericAmount: 5480000,
      invoiceRef: 'INV-2024-S501', 
      discountAvailable: '2% if paid in 48h (₹1,09,600 saved)', 
      autoRelease: true, 
      status: 'Funded' 
    },
    { 
      id: 'SCH-02', 
      vendor: 'UltraTech Cement Ltd (Bulk Works)', 
      dueDate: 'In 12 days (Oct 24)', 
      amount: '₹32,40,000.00', 
      numericAmount: 3240000,
      invoiceRef: 'INV-2024-S502', 
      autoRelease: true, 
      status: 'Scheduled' 
    },
    { 
      id: 'SCH-03', 
      vendor: 'Navkar Transit & Dumper Logistics', 
      dueDate: 'In 18 days (Oct 30)', 
      amount: '₹8,90,000.00', 
      numericAmount: 890000,
      invoiceRef: 'INV-2024-L301', 
      autoRelease: false, 
      status: 'Scheduled' 
    },
    { 
      id: 'SCH-04', 
      vendor: 'JSW Steel Structural Section Mill', 
      dueDate: 'In 27 days (Nov 08)', 
      amount: '₹54,10,000.00', 
      numericAmount: 5410000,
      invoiceRef: 'INV-2024-S503', 
      autoRelease: true, 
      status: 'Scheduled' 
    },
  ]);

  const [newObligation, setNewObligation] = useState({
    vendor: 'Tata Steel Ltd (TMT Division)',
    dueDate: 'In 7 days',
    amount: '4500000',
    invoiceRef: 'INV-2024-S504',
    autoRelease: true,
  });

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(newObligation.amount) || 0;
    const created: ScheduledObligation = {
      id: `SCH-0${obligations.length + 1}`,
      vendor: newObligation.vendor,
      dueDate: newObligation.dueDate,
      amount: `₹${numeric.toLocaleString('en-IN')}.00`,
      numericAmount: numeric,
      invoiceRef: newObligation.invoiceRef,
      autoRelease: newObligation.autoRelease,
      status: 'Scheduled',
    };
    setObligations([...obligations, created]);
    setIsModalOpen(false);
    showNotification(`Added ₹${numeric.toLocaleString('en-IN')}.00 payable obligation to liquidity schedule.`);
  };

  const toggleAutoRelease = (id: string) => {
    setObligations(
      obligations.map((o) => (o.id === id ? { ...o, autoRelease: !o.autoRelease } : o))
    );
  };

  // Export Schedule to CSV
  const handleExportScheduleCsv = () => {
    const headers = ['Schedule ID', 'Payable Vendor', 'Invoice Ref', 'Maturity Schedule', 'Amount (INR)', 'Early Cash Discount', 'Auto-Release Active', 'Treasury Status'];
    const rows = obligations.map((o) => [
      o.id,
      o.vendor,
      o.invoiceRef,
      o.dueDate,
      o.amount,
      o.discountAvailable || 'Standard Terms',
      o.autoRelease ? 'Enabled' : 'Disabled',
      o.status,
    ]);

    downloadCsv(`Vendora_Payment_Schedule_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showNotification('Downloaded Payment Schedule CSV file.');
  };

  // Download Individual Schedule Voucher
  const handleDownloadScheduleVoucher = (item: ScheduledObligation) => {
    const content = `
================================================================================
                    VENDORA SCHEDULED OBLIGATION VOUCHER
================================================================================
Schedule ID         : ${item.id}
Invoice Reference   : ${item.invoiceRef}
Payable Vendor      : ${item.vendor}
Maturity Timeline   : ${item.dueDate}
Payable Amount      : ${item.amount}
Early Discount Rule : ${item.discountAvailable || 'None'}
Auto-Release Policy : ${item.autoRelease ? 'ACTIVE (Smart Contract Authorized)' : 'MANUAL APPROVAL REQUIRED'}
Treasury Status     : ${item.status.toUpperCase()}
Clearing Bank Rail  : RBI RTGS / Corporate Escrow
Generated On        : ${new Date().toLocaleString('en-IN')}
================================================================================
`.trim();

    downloadFile(`${item.id}_Obligation_Voucher.txt`, content, 'text/plain');
    showNotification(`Downloaded schedule voucher for ${item.id}`);
  };

  const canEdit = role === 'owner' || role === 'admin' || role === 'finance';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Payment Scheduler & Cash Timeline</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                INR (₹) Base
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Anticipate invoice maturities, maximize early payment discounts, and configure auto-release rules
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportScheduleCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Download 30-day payout schedule as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export Schedule (CSV)</span>
            </button>

            {canEdit && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Obligation</span>
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

        {/* 30-Day Liquidity Timeline Bar */}
        <div className="p-6 rounded-2xl glass-panel border-electric/25 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-textMuted tracking-wider">
              30-Day Outflow Horizon: ₹1,50,20,000.00 Total Scheduled
            </span>
            <span className="text-xs font-mono text-emerald-400">Escrow Pre-Funded 100%</span>
          </div>

          {/* Visual Day Segments */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { label: 'Next 7 Days', amount: '₹54,80,000.00', count: '1 payment', color: 'border-emerald-500/30 bg-emerald-500/5' },
              { label: '8 - 14 Days', amount: '₹32,40,000.00', count: '1 payment', color: 'border-electric/30 bg-electric/5' },
              { label: '15 - 21 Days', amount: '₹8,90,000.00', count: '1 payment', color: 'border-electric/20 bg-[#0A192F]/50' },
              { label: '22 - 30 Days', amount: '₹54,10,000.00', count: '1 payment', color: 'border-gold/30 bg-gold/5' },
            ].map((slot, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${slot.color}`}>
                <span className="text-[10px] font-mono uppercase text-slate-textMuted block">{slot.label}</span>
                <div className="text-lg font-bold text-white font-mono mt-1">{slot.amount}</div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{slot.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Obligations Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">PAYABLE VENDOR</th>
                  <th className="py-3.5 px-4">INVOICE REF</th>
                  <th className="py-3.5 px-4">DUE SCHEDULE</th>
                  <th className="py-3.5 px-4">AMOUNT (₹)</th>
                  <th className="py-3.5 px-4">EARLY DISCOUNT</th>
                  <th className="py-3.5 px-4">AUTO-RELEASE</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {obligations.map((item) => (
                  <tr key={item.id} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{item.vendor}</td>
                    <td className="py-3.5 px-4 font-mono text-electric">{item.invoiceRef}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-textMuted flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.dueDate}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">{item.amount}</td>
                    <td className="py-3.5 px-4">
                      {item.discountAvailable ? (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {item.discountAvailable}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">Standard Terms</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {canEdit ? (
                        <button
                          onClick={() => toggleAutoRelease(item.id)}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono transition-colors border ${
                            item.autoRelease
                              ? 'bg-electric/20 text-electric border-electric/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {item.autoRelease ? 'Enabled (Auto)' : 'Manual Release'}
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">
                          {item.autoRelease ? 'Enabled' : 'Manual'}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          item.status === 'Funded'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-electric/10 text-electric border border-electric/20'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownloadScheduleVoucher(item)}
                        className="px-2.5 py-1 rounded bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-[11px] font-medium flex items-center gap-1.5 ml-auto transition-colors"
                        title="Download obligation voucher"
                      >
                        <Download className="w-3 h-3 text-electric" />
                        <span>Voucher</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-electric/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Schedule Vendor Obligation</span>
                  <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">INR</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Payable Vendor
                  </label>
                  <input
                    type="text"
                    required
                    value={newObligation.vendor}
                    onChange={(e) => setNewObligation({ ...newObligation, vendor: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Invoice Reference
                    </label>
                    <input
                      type="text"
                      required
                      value={newObligation.invoiceRef}
                      onChange={(e) => setNewObligation({ ...newObligation, invoiceRef: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Amount (₹ INR)
                    </label>
                    <input
                      type="number"
                      required
                      value={newObligation.amount}
                      onChange={(e) => setNewObligation({ ...newObligation, amount: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Due Schedule / Horizon
                  </label>
                  <input
                    type="text"
                    required
                    value={newObligation.dueDate}
                    onChange={(e) => setNewObligation({ ...newObligation, dueDate: e.target.value })}
                    placeholder="e.g. In 14 days (Nov 02)"
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="autoRelease"
                    checked={newObligation.autoRelease}
                    onChange={(e) => setNewObligation({ ...newObligation, autoRelease: e.target.checked })}
                    className="rounded bg-[#050B18] border-electric/30 text-electric focus:ring-0"
                  />
                  <label htmlFor="autoRelease" className="text-xs text-slate-300 cursor-pointer">
                    Enable Smart Auto-Release upon invoice verification
                  </label>
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
                    Save Schedule (₹)
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
