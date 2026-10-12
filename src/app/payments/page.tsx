'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv, downloadPrintableReceipt, downloadFile } from '@/lib/download-utils';
import { 
  CreditCard, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles
} from 'lucide-react';

interface PaymentItem {
  id: string;
  txHash: string;
  counterparty: string;
  rail: string;
  amount: string;
  numericAmount: number;
  direction: 'Outbound Payout' | 'Inbound Settlement';
  status: 'Settled' | 'In Escrow' | 'Processing';
  timestamp: string;
  bankRef: string;
}

export default function PaymentsPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [railFilter, setRailFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [payments, setPayments] = useState<PaymentItem[]>([
    { 
      id: 'PAY-891', 
      txHash: '0x8f2a...1e4b', 
      bankRef: 'UTR-HDFC-984210948',
      counterparty: 'Tata Steel Ltd (TMT Division)', 
      rail: 'RTGS Immediate', 
      amount: '₹54,80,000.00', 
      numericAmount: 5480000,
      direction: 'Outbound Payout', 
      status: 'Settled', 
      timestamp: 'Today, 11:20 AM' 
    },
    { 
      id: 'PAY-892', 
      txHash: '0x4c9d...9a21', 
      bankRef: 'UTR-ICIC-883910284',
      counterparty: 'Lodha Developers (Macrotech Ltd)', 
      rail: 'RTGS Immediate', 
      amount: '₹84,50,000.00', 
      numericAmount: 8450000,
      direction: 'Inbound Settlement', 
      status: 'Settled', 
      timestamp: 'Today, 09:14 AM' 
    },
    { 
      id: 'PAY-893', 
      txHash: '0x1b7e...6f82', 
      bankRef: 'UTR-SBIN-771928401',
      counterparty: 'L&T Construction (Coastal Road)', 
      rail: 'IMPS 24x7 Settlement', 
      amount: '₹68,40,000.00', 
      numericAmount: 6840000,
      direction: 'Inbound Settlement', 
      status: 'Settled', 
      timestamp: 'Yesterday, 04:30 PM' 
    },
    { 
      id: 'PAY-894', 
      txHash: '0x9d3f...0c18', 
      bankRef: 'NACH-CMS-948102918',
      counterparty: 'UltraTech Cement Ltd', 
      rail: 'NEFT Direct Clearing', 
      amount: '₹32,40,000.00', 
      numericAmount: 3240000,
      direction: 'Outbound Payout', 
      status: 'In Escrow', 
      timestamp: 'Yesterday, 02:15 PM' 
    },
    { 
      id: 'PAY-895', 
      txHash: '0x3a1b...8e90', 
      bankRef: 'UPI-CORP-391820491',
      counterparty: 'Navkar Transit & Dumper Fleet', 
      rail: 'UPI Corporate Bulk Rails', 
      amount: '₹8,90,000.00', 
      numericAmount: 890000,
      direction: 'Outbound Payout', 
      status: 'Processing', 
      timestamp: 'Oct 11, 10:00 AM' 
    },
  ]);

  const [newPayout, setNewPayout] = useState({
    counterparty: 'Tata Steel Ltd (TMT Division)',
    rail: 'RTGS Immediate',
    amount: '4500000',
    memo: 'TMT 550D 80MT Delivery Order #490',
  });

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleInitiatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(newPayout.amount) || 0;
    const created: PaymentItem = {
      id: `PAY-${Date.now()}`,
      txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
      bankRef: `UTR-CMS-${Math.floor(100000000 + Math.random() * 900000000)}`,
      counterparty: newPayout.counterparty,
      rail: newPayout.rail,
      amount: `₹${numeric.toLocaleString('en-IN')}.00`,
      numericAmount: numeric,
      direction: 'Outbound Payout',
      status: 'Settled',
      timestamp: 'Just now',
    };

    setPayments([created, ...payments]);
    setIsModalOpen(false);
    showNotification(`Payout of ₹${numeric.toLocaleString('en-IN')}.00 authorized via ${newPayout.rail}!`);
  };

  // Export Payout Batch to CSV
  const handleExportBatchCsv = () => {
    const headers = ['Transaction ID', 'Bank UTR / Ref', 'Counterparty', 'Settlement Rail', 'Flow Direction', 'Amount (INR)', 'Status', 'Timestamp'];
    const rows = filtered.map((p) => [
      p.id,
      p.bankRef,
      p.counterparty,
      p.rail,
      p.direction,
      p.amount,
      p.status,
      p.timestamp,
    ]);

    downloadCsv(`Vendora_Payout_Batch_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showNotification('Downloaded Payout Batch CSV file to your browser.');
  };

  // Download Receipt / Voucher for individual transaction
  const handleDownloadReceipt = (item: PaymentItem) => {
    downloadPrintableReceipt({
      invoiceNumber: item.id,
      counterparty: item.counterparty,
      email: 'finance@vendora.internal',
      amount: item.amount,
      paidDate: item.timestamp,
      type: item.direction,
      paymentMode: item.rail,
      referenceNo: item.bankRef,
    });
    showNotification(`Generated printable payment advice for ${item.id}`);
  };

  // Download raw bank debit memo
  const handleDownloadDebitMemo = (item: PaymentItem) => {
    const memoContent = `
================================================================================
                    VENDORA PAYMENT SETTLEMENT ADVICE
                 OFFICIAL BANK RAIL DEBIT / CREDIT MEMO
================================================================================
Transaction ID       : ${item.id}
Electronic UTR / Ref : ${item.bankRef}
Cryptographic Hash   : ${item.txHash}
Settlement Rail      : ${item.rail}
Counterparty Entity  : ${item.counterparty}
Direction of Flow    : ${item.direction}
Settlement Value     : ${item.amount}
Settlement Status    : ${item.status.toUpperCase()}
Execution Timestamp  : ${item.timestamp}
Clearing House       : Reserve Bank of India (RBI) / NPCI Gateway
Digital Signature    : SHA256-RSA Verified [0x9b7e4f1a2c3d4e5f]
================================================================================
    This document serves as proof of irrevocable fund transfer clearance.
================================================================================
`.trim();

    downloadFile(`${item.id}_Bank_Settlement_Advice.txt`, memoContent, 'text/plain');
    showNotification(`Downloaded raw bank advice text file for ${item.id}`);
  };

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bankRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRail = railFilter === 'All' || p.rail.toLowerCase().includes(railFilter.toLowerCase());
    return matchesSearch && matchesRail;
  });

  const canExecutePayout = role === 'owner' || role === 'admin' || role === 'finance';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Payments & Multi-Rail Liquidity</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                INR (₹) Base
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Multi-rail Indian banking settlements (RTGS / NEFT / IMPS / UPI) and cryptographic ledger audit
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportBatchCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Download payout transaction records as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export Batch (CSV)</span>
            </button>

            {canExecutePayout ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Initiate New Payout</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-slate-500 italic bg-[#0A192F] px-3 py-1.5 rounded-lg border border-slate-800">
                Payout authority limited to Finance & Owners
              </span>
            )}
          </div>
        </div>

        {notice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Filter and search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by counterparty, UTR reference, or hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={railFilter}
              onChange={(e) => setRailFilter(e.target.value)}
              className="bg-[#0A192F] border border-electric/20 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-electric"
            >
              <option value="All">All Settlement Rails</option>
              <option value="RTGS">RTGS Immediate</option>
              <option value="NEFT">NEFT Direct</option>
              <option value="IMPS">IMPS 24x7</option>
              <option value="eNACH">eNACH Mandate</option>
              <option value="UPI">UPI Corporate</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">TX REF / UTR</th>
                  <th className="py-3.5 px-4">COUNTERPARTY</th>
                  <th className="py-3.5 px-4">SETTLEMENT RAIL</th>
                  <th className="py-3.5 px-4">FLOW</th>
                  <th className="py-3.5 px-4">AMOUNT (₹)</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4">TIMESTAMP</th>
                  <th className="py-3.5 px-4 text-right">DOWNLOAD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-textMuted">
                      <div className="font-semibold text-slate-300">{item.bankRef}</div>
                      <div className="text-[10px] text-slate-500">{item.txHash}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">{item.counterparty}</td>
                    <td className="py-3.5 px-4 text-slate-textSecondary font-mono">{item.rail}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 w-fit ${
                          item.direction === 'Inbound Settlement'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-electric/10 text-electric'
                        }`}
                      >
                        {item.direction === 'Inbound Settlement' ? (
                          <ArrowDownLeft className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3 text-electric" />
                        )}
                        {item.direction}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">{item.amount}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          item.status === 'Settled'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : item.status === 'In Escrow'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-textMuted">{item.timestamp}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDownloadReceipt(item)}
                          className="px-2 py-1 rounded bg-electric/15 hover:bg-electric/25 border border-electric/30 text-electric text-[11px] font-medium flex items-center gap-1 transition-colors"
                          title="Print / PDF Payment Advice"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Receipt</span>
                        </button>
                        <button
                          onClick={() => handleDownloadDebitMemo(item)}
                          className="p-1 rounded bg-[#0A192F] hover:bg-electric/20 border border-electric/20 text-slate-300 hover:text-white transition-colors"
                          title="Download Raw Text Bank Advice"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
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
                  <span>Initiate Vendor Payout</span>
                  <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">INR</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleInitiatePayout} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Beneficiary Counterparty
                  </label>
                  <select
                    value={newPayout.counterparty}
                    onChange={(e) => setNewPayout({ ...newPayout, counterparty: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Tata Steel Ltd (TMT Division)">Tata Steel Ltd (TMT Division)</option>
                    <option value="UltraTech Cement Ltd">UltraTech Cement Ltd</option>
                    <option value="Navkar Transit & Dumper Fleet">Navkar Transit & Dumper Fleet</option>
                    <option value="JSW Steel Structural Section Mill">JSW Steel Structural Section Mill</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Settlement Rail
                    </label>
                    <select
                      value={newPayout.rail}
                      onChange={(e) => setNewPayout({ ...newPayout, rail: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="RTGS Immediate">RTGS Immediate (RBI Rail)</option>
                      <option value="NEFT Direct Clearing">NEFT Direct Clearing</option>
                      <option value="IMPS 24x7 Settlement">IMPS 24x7 Instant</option>
                      <option value="NPCI eNACH Corporate Mandate">NPCI eNACH Mandate</option>
                      <option value="UPI Corporate Bulk Rails">UPI Corporate Rails</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Amount (₹ INR)
                    </label>
                    <input
                      type="number"
                      required
                      value={newPayout.amount}
                      onChange={(e) => setNewPayout({ ...newPayout, amount: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Payment Reference / Narration
                  </label>
                  <input
                    type="text"
                    value={newPayout.memo}
                    onChange={(e) => setNewPayout({ ...newPayout, memo: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
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
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 text-white text-xs font-semibold shadow"
                  >
                    Authorize Payout (₹)
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
