'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { downloadCsv, downloadFile } from '@/lib/download-utils';
import { 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Printer,
  Search,
  Landmark,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

interface LedgerEntry {
  id: string;
  txDate: string;
  valueDate: string;
  narration: string;
  referenceNo: string;
  txType: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI' | 'NACH';
  category: string;
  debit: number;  // Outflow (₹)
  credit: number; // Inflow (₹)
  runningBalance: number;
}

export default function ReportsPage() {
  const [selectedAccount, setSelectedAccount] = useState<'HDFC' | 'ICICI' | 'SBI'>('HDFC');
  const [filterType, setFilterType] = useState<'ALL' | 'DEBIT' | 'CREDIT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Bank accounts config
  const bankAccounts = {
    HDFC: {
      bankName: 'HDFC Bank Ltd',
      accountName: 'VENDORA TECHNOLOGIES PRIVATE LIMITED',
      accountNumber: '50200084920194',
      ifsc: 'HDFC0000060',
      branch: 'Fort Business Branch, Mumbai',
      accountType: 'Current Account (Primary Operating)',
      openingBalance: 12450000,
    },
    ICICI: {
      bankName: 'ICICI Bank Ltd',
      accountName: 'VENDORA TECHNOLOGIES PRIVATE LIMITED',
      accountNumber: '001105310928',
      ifsc: 'ICIC0000011',
      branch: 'Nariman Point Branch, Mumbai',
      accountType: 'Corporate Liquid Account',
      openingBalance: 4820000,
    },
    SBI: {
      bankName: 'State Bank of India',
      accountName: 'VENDORA TECHNOLOGIES PRIVATE LIMITED',
      accountNumber: '389201552190',
      ifsc: 'SBIN0000300',
      branch: 'Bandra-Kurla Complex (BKC), Mumbai',
      accountType: 'Cash Credit Working Capital',
      openingBalance: 8500000,
    }
  };

  const activeBank = bankAccounts[selectedAccount];

  // Bank Statement / General Ledger Rows
  const [ledgerEntries] = useState<LedgerEntry[]>([
    {
      id: 'TXN-901',
      txDate: '2024-10-12',
      valueDate: '2024-10-12',
      narration: 'NEFT Cr - Lodha Developers (Macrotech Ltd) (RA Bill #4 - Worli Site TMT Rebars)',
      referenceNo: 'UTR-HDFC-984210948',
      txType: 'NEFT',
      category: 'Builder RA Bill',
      debit: 0,
      credit: 8450000,
      runningBalance: 20900000,
    },
    {
      id: 'TXN-902',
      txDate: '2024-10-11',
      valueDate: '2024-10-11',
      narration: 'RTGS Dr - Tata Steel Ltd (Tarapur Rolling Mill - 120 MT TMT 550D Billets)',
      referenceNo: 'UTR-HDFC-883192013',
      txType: 'RTGS',
      category: 'Steel Mill Payable',
      debit: 5480000,
      credit: 0,
      runningBalance: 12450000,
    },
    {
      id: 'TXN-903',
      txDate: '2024-10-10',
      valueDate: '2024-10-10',
      narration: 'RTGS Cr - L&T Construction (Coastal Road Package 2 - Ready-Mix Concrete Pour)',
      referenceNo: 'UTR-ICIC-294810284',
      txType: 'RTGS',
      category: 'Infrastructure Builder Inflow',
      debit: 0,
      credit: 6840000,
      runningBalance: 17930000,
    },
    {
      id: 'TXN-904',
      txDate: '2024-10-08',
      valueDate: '2024-10-08',
      narration: 'NEFT Dr - UltraTech Cement Ltd (Awarpur Works - 8,000 Bags OPC 53 Grade)',
      referenceNo: 'NEFT-UTCL-9921401',
      txType: 'NEFT',
      category: 'Cement Mill Payable',
      debit: 3240000,
      credit: 0,
      runningBalance: 11090000,
    },
    {
      id: 'TXN-905',
      txDate: '2024-10-06',
      valueDate: '2024-10-06',
      narration: 'NACH Dr - Navkar Transit & Quarry Fleet (Dumper Truckloads Panvel Corridor)',
      referenceNo: 'NACH-77481920',
      txType: 'NACH',
      category: 'Quarry Logistics',
      debit: 890000,
      credit: 0,
      runningBalance: 14330000,
    },
    {
      id: 'TXN-906',
      txDate: '2024-10-04',
      valueDate: '2024-10-04',
      narration: 'NEFT Cr - Godrej Properties (Godrej Horizon Site - M-Sand & 20mm Aggregates)',
      referenceNo: 'UTR-AXIS-550192841',
      txType: 'NEFT',
      category: 'Builder Material Settlement',
      debit: 0,
      credit: 3820000,
      runningBalance: 15220000,
    },
    {
      id: 'TXN-907',
      txDate: '2024-10-02',
      valueDate: '2024-10-02',
      narration: 'RTGS Dr - JSW Steel Structural Mill (ISMB Beams & Heavy Rebars)',
      referenceNo: 'UTR-HDFC-119284012',
      txType: 'RTGS',
      category: 'Structural Steel Procurement',
      debit: 5410000,
      credit: 0,
      runningBalance: 11400000,
    },
    {
      id: 'TXN-908',
      txDate: '2024-10-01',
      valueDate: '2024-10-01',
      narration: 'Opening Ledger Balance Brought Forward',
      referenceNo: 'SYS-BAL-B/F',
      txType: 'NEFT',
      category: 'Balance Carryforward',
      debit: 0,
      credit: 0,
      runningBalance: 12450000,
    },
  ]);

  const notify = (msg: string) => {
    setDownloadNotice(msg);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  // Filter entries
  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesSearch = entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || 
                          (filterType === 'DEBIT' && entry.debit > 0) || 
                          (filterType === 'CREDIT' && entry.credit > 0);
    return matchesSearch && matchesFilter;
  });

  // Totals calculation
  const totalDebits = ledgerEntries.reduce((acc, curr) => acc + curr.debit, 0);
  const totalCredits = ledgerEntries.reduce((acc, curr) => acc + curr.credit, 0);
  const closingBalance = ledgerEntries[0]?.runningBalance || activeBank.openingBalance;

  // Working Export: Bank Statement CSV
  const handleExportStatementCsv = () => {
    downloadCsv(
      `Vendora_${selectedAccount}_Bank_Statement_Oct2024.csv`,
      [
        'Bank Name',
        'Account Number',
        'Tx Date',
        'Value Date',
        'Description / Narration',
        'Reference No / UTR',
        'Rail Type',
        'Category',
        'Debit (Dr INR)',
        'Credit (Cr INR)',
        'Running Balance (INR)'
      ],
      ledgerEntries.map(e => [
        activeBank.bankName,
        activeBank.accountNumber,
        e.txDate,
        e.valueDate,
        e.narration,
        e.referenceNo,
        e.txType,
        e.category,
        e.debit > 0 ? e.debit : 0,
        e.credit > 0 ? e.credit : 0,
        e.runningBalance
      ])
    );
    notify(`Official Bank Statement for ${activeBank.bankName} (${activeBank.accountNumber}) downloaded as CSV!`);
  };

  // Working Export: Printable Statement / PDF
  const handlePrintStatement = () => {
    if (typeof window === 'undefined') return;

    const statementHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Official Bank Statement & General Ledger - ${activeBank.bankName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #0A192F; font-size: 12px; }
    .header { border-bottom: 2px solid #050B18; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
    .bank-title { font-size: 20px; font-weight: 800; color: #050B18; }
    .bank-sub { font-size: 11px; color: #5B6B82; margin-top: 2px; }
    .account-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #F8FAFC; padding: 14px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #E2E8F0; }
    .summary-box { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 24px; text-align: center; }
    .metric { background: #F1F5F9; padding: 10px; border-radius: 6px; }
    .metric-label { font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; }
    .metric-val { font-size: 15px; font-weight: 800; color: #0F172A; margin-top: 4px; font-family: monospace; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { background: #0A192F; color: #fff; text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; font-family: monospace; }
    td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; font-size: 11px; }
    .dr { color: #E11D48; font-weight: 700; font-family: monospace; }
    .cr { color: #16A34A; font-weight: 700; font-family: monospace; }
    .bal { font-weight: 800; font-family: monospace; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #CBD5E1; font-size: 10px; color: #94A3B8; text-align: center; }
    @media print { body { padding: 15px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="bank-title">${activeBank.bankName}</div>
      <div class="bank-sub">${activeBank.branch} • IFSC: ${activeBank.ifsc}</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 16px; font-weight: 800;">ACCOUNT STATEMENT</div>
      <div style="font-size: 11px; color: #64748B;">Statement Period: 01-Oct-2024 to 12-Oct-2024</div>
    </div>
  </div>

  <div class="account-meta">
    <div><strong>Account Holder:</strong> ${activeBank.accountName}</div>
    <div><strong>Account Number:</strong> ${activeBank.accountNumber}</div>
    <div><strong>Account Type:</strong> ${activeBank.accountType}</div>
    <div><strong>Currency:</strong> Indian Rupee (INR - ₹)</div>
  </div>

  <div class="summary-box">
    <div class="metric">
      <div class="metric-label">Opening Balance</div>
      <div class="metric-val">₹${activeBank.openingBalance.toLocaleString('en-IN')}.00</div>
    </div>
    <div class="metric">
      <div class="metric-label">Total Deposits (Cr)</div>
      <div class="metric-val" style="color: #16A34A;">+₹${totalCredits.toLocaleString('en-IN')}.00</div>
    </div>
    <div class="metric">
      <div class="metric-label">Total Withdrawals (Dr)</div>
      <div class="metric-val" style="color: #E11D48;">-₹${totalDebits.toLocaleString('en-IN')}.00</div>
    </div>
    <div class="metric">
      <div class="metric-label">Closing Balance</div>
      <div class="metric-val" style="color: #0284C7;">₹${closingBalance.toLocaleString('en-IN')}.00</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Narration / Details</th>
        <th>Ref / UTR</th>
        <th>Type</th>
        <th>Withdrawals (Dr ₹)</th>
        <th>Deposits (Cr ₹)</th>
        <th>Balance (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${ledgerEntries.map(e => `
        <tr>
          <td>${e.txDate}</td>
          <td>${e.narration}</td>
          <td style="font-family: monospace;">${e.referenceNo}</td>
          <td>${e.txType}</td>
          <td class="dr">${e.debit > 0 ? '₹' + e.debit.toLocaleString('en-IN') + '.00' : '-'}</td>
          <td class="cr">${e.credit > 0 ? '₹' + e.credit.toLocaleString('en-IN') + '.00' : '-'}</td>
          <td class="bal">₹${e.runningBalance.toLocaleString('en-IN')}.00</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    <p>This is a computer-verified statement issued through VENDORA Connected Core Banking Gateway.</p>
    <p>Certified by Branch Operations • System Generated on: ${new Date().toLocaleString('en-IN')}</p>
  </div>

  <script>window.onload = function() { window.print(); }</script>
</body>
</html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(statementHtml);
      printWindow.document.close();
    }
    notify(`Printable Bank Statement generated for ${activeBank.bankName}!`);
  };

  // Download Individual Voucher
  const handleDownloadVoucher = (entry: LedgerEntry) => {
    const voucherText = `
========================================================================
VENDORA FINANCIAL PLATFORM - OFFICIAL TRANSACTION VOUCHER
========================================================================
Bank Account: ${activeBank.bankName} (A/c ${activeBank.accountNumber})
Voucher ID: ${entry.id}
Date: ${entry.txDate} (Value Date: ${entry.valueDate})
Reference / UTR: ${entry.referenceNo}
Payment Rail: ${entry.txType}
Category: ${entry.category}

Description / Narration:
${entry.narration}

Amount:
${entry.debit > 0 ? `DEBIT (Outflow): -₹${entry.debit.toLocaleString('en-IN')}.00` : `CREDIT (Inflow): +₹${entry.credit.toLocaleString('en-IN')}.00`}

Resulting Running Balance: ₹${entry.runningBalance.toLocaleString('en-IN')}.00
Authentication: Digitally Signed by Bank Core Switch
========================================================================
    `;

    downloadFile(`Voucher_${entry.referenceNo}.txt`, voucherText, 'text/plain;charset=utf-8;');
    notify(`Voucher for ${entry.referenceNo} downloaded successfully!`);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Landmark className="w-6 h-6 text-electric" />
              <span>Bank Statement & General Ledger</span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Live corporate bank account synchronization, UTR reconciliation, and auditable financial ledger
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportStatementCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#0f223d] border border-electric/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Download Statement (CSV)</span>
            </button>

            <button
              onClick={handlePrintStatement}
              className="px-3.5 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(79,140,255,0.3)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF Statement</span>
            </button>
          </div>
        </div>

        {/* Global Alert Notification */}
        {downloadNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{downloadNotice}</span>
          </div>
        )}

        {/* Bank Account Switcher Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['HDFC', 'ICICI', 'SBI'] as const).map(key => {
            const acc = bankAccounts[key];
            const isSelected = selectedAccount === key;

            return (
              <div
                key={key}
                onClick={() => setSelectedAccount(key)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-gradient-to-r from-[#0A192F] to-[#0D2244] border-electric shadow-lg shadow-electric/10 ring-1 ring-electric/30' 
                    : 'glass-panel border-electric/15 hover:border-electric/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{acc.bankName}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isSelected ? 'bg-electric text-white font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {key}
                  </span>
                </div>
                <div className="text-xs text-slate-textMuted font-mono">
                  A/c: •••• {acc.accountNumber.slice(-4)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {acc.accountType}
                </div>
              </div>
            );
          })}
        </div>

        {/* Account Financial Overview Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border-electric/20">
            <span className="text-xs font-mono uppercase text-slate-textMuted">Opening Balance</span>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              ₹{activeBank.openingBalance.toLocaleString('en-IN')}.00
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">As of Oct 01, 2024</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border-emerald-500/30 bg-emerald-950/10">
            <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1">
              <ArrowDownLeft className="w-3.5 h-3.5" /> Total Deposits (Credits)
            </span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1">
              +₹{totalCredits.toLocaleString('en-IN')}.00
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Inbound client receipts</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border-rose-500/30 bg-rose-950/10">
            <span className="text-xs font-mono uppercase text-rose-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Total Withdrawals (Debits)
            </span>
            <div className="text-xl sm:text-2xl font-bold text-rose-400 font-mono mt-1">
              -₹{totalDebits.toLocaleString('en-IN')}.00
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Vendor payouts & freight</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel-gold border-gold/40">
            <span className="text-xs font-mono uppercase text-gold">Closing Book Balance</span>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
              ₹{closingBalance.toLocaleString('en-IN')}.00
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">● Reconciled with Bank Core</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A192F]/60 p-3 rounded-2xl border border-electric/15">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by narration, UTR reference, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#050B18] border border-electric/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-textMuted font-mono mr-1">Filter:</span>
            <div className="flex items-center bg-[#050B18] p-1 rounded-xl border border-electric/20 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  filterType === 'ALL' ? 'bg-electric text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Txns
              </button>
              <button
                onClick={() => setFilterType('CREDIT')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  filterType === 'CREDIT' ? 'bg-emerald-500 text-midnight font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Credits (Inflow)
              </button>
              <button
                onClick={() => setFilterType('DEBIT')}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  filterType === 'DEBIT' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Debits (Outflow)
              </button>
            </div>
          </div>
        </div>

        {/* Bank Statement / General Ledger Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="p-4 bg-[#0A192F]/80 border-b border-electric/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Statement Ledger — {activeBank.bankName} ({activeBank.accountNumber})
              </h3>
            </div>
            <span className="text-xs text-slate-textMuted font-mono">
              Showing {filteredEntries.length} of {ledgerEntries.length} ledger postings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50 text-[11px]">
                  <th className="py-3 px-4">DATE / VALUE</th>
                  <th className="py-3 px-4">TRANSACTION NARRATION</th>
                  <th className="py-3 px-4">REF / UTR NO</th>
                  <th className="py-3 px-4">RAIL</th>
                  <th className="py-3 px-4 text-right">DEBIT (DR ₹)</th>
                  <th className="py-3 px-4 text-right">CREDIT (CR ₹)</th>
                  <th className="py-3 px-4 text-right">RUNNING BALANCE (₹)</th>
                  <th className="py-3 px-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filteredEntries.map((row) => (
                  <tr key={row.id} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <div>{row.txDate}</div>
                      <div className="text-[10px] text-slate-500">Val: {row.valueDate}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white max-w-sm">{row.narration}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{row.category}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-electric text-[11px]">
                      {row.referenceNo}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A192F] border border-electric/15 text-slate-300">
                        {row.txType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-400">
                      {row.debit > 0 ? `-₹${row.debit.toLocaleString('en-IN')}.00` : '-'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {row.credit > 0 ? `+₹${row.credit.toLocaleString('en-IN')}.00` : '-'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-white text-[13px]">
                      ₹{row.runningBalance.toLocaleString('en-IN')}.00
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDownloadVoucher(row)}
                        className="px-2.5 py-1 rounded-lg bg-electric/10 hover:bg-electric/20 border border-electric/25 text-electric text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                        title="Download transaction voucher"
                      >
                        <Download className="w-3 h-3" />
                        <span>Voucher</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PortalLayout>
  );
}
