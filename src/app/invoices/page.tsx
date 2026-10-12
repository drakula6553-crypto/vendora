'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv, downloadPrintableReceipt } from '@/lib/download-utils';
import { 
  FileText, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  CreditCard,
  Download,
  Send,
  RotateCcw,
  Printer,
  Mail,
  Sparkles
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  type: 'Payable (Supplier)' | 'Receivable (Customer)';
  counterparty: string;
  email: string;
  amount: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  matchingStatus: 'Verified 2-Way Match' | 'Pending Verification';
  paidDate?: string;
  paymentMode?: string;
}

export default function InvoicesPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Email modal state
  const [emailModalInvoice, setEmailModalInvoice] = useState<InvoiceItem | null>(null);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    { 
      id: 'INV-1001', 
      invoiceNumber: 'INV-2024-B101', 
      type: 'Receivable (Customer)', 
      counterparty: 'Lodha Developers (Macrotech Ltd)', 
      email: 'billing.worli@macrotech.in', 
      amount: '₹84,50,000.00', 
      dueDate: 'Oct 28, 2024', 
      status: 'Pending', 
      matchingStatus: 'Verified 2-Way Match' 
    },
    { 
      id: 'INV-1002', 
      invoiceNumber: 'INV-2024-S501', 
      type: 'Payable (Supplier)', 
      counterparty: 'Tata Steel Ltd (TMT Rebar Division)', 
      email: 'tarapur.sales@tatasteel.com', 
      amount: '₹54,80,000.00', 
      dueDate: 'Nov 04, 2024', 
      status: 'Pending', 
      matchingStatus: 'Verified 2-Way Match' 
    },
    { 
      id: 'INV-1003', 
      invoiceNumber: 'INV-2024-B102', 
      type: 'Receivable (Customer)', 
      counterparty: 'L&T Construction (Coastal Road Package 2)', 
      email: 'accounts.cr@lntecc.com', 
      amount: '₹68,40,000.00', 
      dueDate: 'Oct 19, 2024', 
      status: 'Paid', 
      matchingStatus: 'Verified 2-Way Match',
      paidDate: 'Oct 18, 2024',
      paymentMode: 'RTGS Immediate'
    },
    { 
      id: 'INV-1004', 
      invoiceNumber: 'INV-2024-S502', 
      type: 'Payable (Supplier)', 
      counterparty: 'UltraTech Cement Ltd (Aditya Birla)', 
      email: 'bulkcement@ultratech.adityabirla.com', 
      amount: '₹32,40,000.00', 
      dueDate: 'Oct 14, 2024', 
      status: 'Paid', 
      matchingStatus: 'Verified 2-Way Match',
      paidDate: 'Oct 14, 2024',
      paymentMode: 'NEFT Clearing'
    },
    { 
      id: 'INV-1005', 
      invoiceNumber: 'INV-2024-B103', 
      type: 'Receivable (Customer)', 
      counterparty: 'Godrej Properties (Godrej Horizon Site)', 
      email: 'site.billing@godrejproperties.com', 
      amount: '₹38,20,000.00', 
      dueDate: 'Nov 12, 2024', 
      status: 'Pending', 
      matchingStatus: 'Pending Verification' 
    },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: 'INV-2024-B104',
    type: 'Receivable (Customer)' as 'Payable (Supplier)' | 'Receivable (Customer)',
    counterparty: 'Lodha Developers (Macrotech Ltd)',
    email: 'billing.worli@macrotech.in',
    amount: '4500000',
    dueDate: 'In 30 days',
  });

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Toggle to Paid
  const handleMarkPaid = (id: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    setInvoices(invoices.map((inv) => (
      inv.id === id 
        ? { ...inv, status: 'Paid', paidDate: today, paymentMode: 'IMPS Corporate Bank Settlement' } 
        : inv
    )));
    notify(`Invoice marked as PAID! Download receipt or send email below.`);
  };

  // Revert back to Unpaid
  const handleRevertToUnpaid = (id: string) => {
    setInvoices(invoices.map((inv) => (
      inv.id === id 
        ? { ...inv, status: 'Pending', paidDate: undefined, paymentMode: undefined } 
        : inv
    )));
    notify(`Invoice status reverted back to UNPAID (Pending settlement).`);
  };

  // Download Receipt
  const handleDownloadReceipt = (inv: InvoiceItem) => {
    downloadPrintableReceipt({
      invoiceNumber: inv.invoiceNumber,
      counterparty: inv.counterparty,
      email: inv.email,
      amount: inv.amount,
      paidDate: inv.paidDate || 'Today',
      type: inv.type,
      paymentMode: inv.paymentMode || 'Core Banking Switch'
    });
    notify(`Receipt generated for ${inv.invoiceNumber}`);
  };

  // Open Email Modal
  const handleOpenEmailModal = (inv: InvoiceItem) => {
    setEmailModalInvoice(inv);
    setEmailRecipient(inv.email);
    setEmailSubject(`Payment Confirmation & Receipt — ${inv.invoiceNumber} (${inv.amount})`);
    setEmailNote(`Dear ${inv.counterparty},\n\nWe have successfully settled Invoice #${inv.invoiceNumber} for the amount of ${inv.amount} via ${inv.paymentMode || 'Bank Transfer'}. Please find the payment confirmation details attached.`);
  };

  // Send Email
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailModalInvoice) return;
    setIsSendingEmail(true);

    setTimeout(() => {
      setIsSendingEmail(false);
      setEmailModalInvoice(null);
      notify(`Official Paid Receipt for ${emailModalInvoice.invoiceNumber} dispatched to ${emailRecipient}!`);
    }, 600);
  };

  // Export Invoices CSV
  const handleExportCsv = () => {
    downloadCsv(
      'vendora_invoices_registry.csv',
      ['Invoice Number', 'Type', 'Counterparty', 'Company Email', 'Amount (INR)', 'Due Date', 'Status', 'Paid Date', 'Matching Status'],
      invoices.map(inv => [
        inv.invoiceNumber,
        inv.type,
        inv.counterparty,
        inv.email,
        inv.amount,
        inv.dueDate,
        inv.status,
        inv.paidDate || 'N/A',
        inv.matchingStatus
      ])
    );
    notify('Invoices registry exported as CSV successfully!');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InvoiceItem = {
      id: `INV-${Date.now()}`,
      invoiceNumber: newInvoice.invoiceNumber,
      type: newInvoice.type,
      counterparty: newInvoice.counterparty,
      email: newInvoice.email || `accounts@${newInvoice.counterparty.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      amount: `₹${Number(newInvoice.amount).toLocaleString('en-IN')}.00`,
      dueDate: newInvoice.dueDate,
      status: 'Pending',
      matchingStatus: 'Verified 2-Way Match',
    };
    setInvoices([created, ...invoices]);
    setIsModalOpen(false);
    notify(`Invoice ${newInvoice.invoiceNumber} created and logged in ledger.`);
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEdit = role === 'owner' || role === 'admin' || role === 'finance';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Invoices & Settlement Matching
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Builder RA bills, weighbridge reconciliation, automated receipt vouchers, and site office email dispatch
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#0f223d] border border-electric/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export CSV</span>
            </button>

            {canEdit && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Feedback Banner */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{notification}</span>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoices by number or counterparty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
          />
        </div>

        {/* Invoices Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">INVOICE #</th>
                  <th className="py-3.5 px-4">TYPE</th>
                  <th className="py-3.5 px-4">COUNTERPARTY</th>
                  <th className="py-3.5 px-4">AMOUNT (INR)</th>
                  <th className="py-3.5 px-4">DUE DATE</th>
                  <th className="py-3.5 px-4">SETTLEMENT</th>
                  <th className="py-3.5 px-4 text-right">ACTIONS & DISPATCH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filtered.map((inv) => {
                  const isPaid = inv.status === 'Paid';

                  return (
                    <tr key={inv.id} className="hover:bg-electric/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-electric">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A192F] border border-electric/15 text-slate-textSecondary">
                          {inv.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{inv.counterparty}</div>
                        <div className="text-[10px] text-slate-textMuted font-mono">{inv.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                        {inv.amount}
                      </td>
                      <td className="py-3.5 px-4 text-slate-textMuted font-mono">
                        {inv.dueDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            isPaid
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {inv.status}
                        </span>
                        {isPaid && inv.paidDate && (
                          <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
                            Paid {inv.paidDate}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* If Unpaid: Show Mark Paid */}
                          {!isPaid && canEdit && (
                            <button
                              onClick={() => handleMarkPaid(inv.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold transition-colors flex items-center gap-1"
                              title="Mark this invoice as Paid"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark Paid</span>
                            </button>
                          )}

                          {/* If Paid: Show Revert to Unpaid, Download Receipt & Send Email */}
                          {isPaid && (
                            <>
                              {canEdit && (
                                <button
                                  onClick={() => handleRevertToUnpaid(inv.id)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
                                  title="Revert back to Unpaid status"
                                >
                                  <RotateCcw className="w-3 h-3 text-amber-400" />
                                  <span>Revert Unpaid</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDownloadReceipt(inv)}
                                className="px-2.5 py-1 rounded-lg bg-electric/15 hover:bg-electric/25 border border-electric/30 text-electric text-[11px] font-semibold transition-colors flex items-center gap-1"
                                title="Download payment receipt voucher"
                              >
                                <Printer className="w-3 h-3" />
                                <span>Receipt</span>
                              </button>

                              <button
                                onClick={() => handleOpenEmailModal(inv)}
                                className="px-2.5 py-1 rounded-lg bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold text-[11px] font-semibold transition-colors flex items-center gap-1"
                                title="Send receipt to company email"
                              >
                                <Mail className="w-3 h-3" />
                                <span>Email Receipt</span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Create Invoice */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-electric/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <h3 className="text-lg font-bold text-white">Record Invoice Document</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Invoice Number
                    </label>
                    <input
                      type="text"
                      required
                      value={newInvoice.invoiceNumber}
                      onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Direction
                    </label>
                    <select
                      value={newInvoice.type}
                      onChange={(e) => setNewInvoice({ ...newInvoice, type: e.target.value as any })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="Payable (Supplier)">Payable (Outgoing)</option>
                      <option value="Receivable (Customer)">Receivable (Incoming)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Counterparty Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newInvoice.counterparty}
                    onChange={(e) => setNewInvoice({ ...newInvoice, counterparty: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Company Accounts Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newInvoice.email}
                    onChange={(e) => setNewInvoice({ ...newInvoice, email: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Total Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    placeholder="e.g. 50000"
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
                    className="px-6 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow"
                  >
                    Save Invoice Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Send Email to Company */}
        {emailModalInvoice && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-gold/40 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-bold text-white">Send Paid Receipt to Company</h3>
                </div>
                <button onClick={() => setEmailModalInvoice(null)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Recipient Company Email
                  </label>
                  <input
                    type="email"
                    required
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Message Body & Settlement Voucher
                  </label>
                  <textarea
                    rows={4}
                    value={emailNote}
                    onChange={(e) => setEmailNote(e.target.value)}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl p-3 text-xs text-white outline-none font-mono resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-gold/10 border border-gold/25 text-[11px] text-gold flex items-center justify-between">
                  <span>Attachment: Official Settlement Voucher ({emailModalInvoice.amount})</span>
                  <span className="font-mono">PDF Encrypted</span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEmailModalInvoice(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-textMuted hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-midnight font-bold text-xs flex items-center gap-2 shadow-lg shadow-gold/20 disabled:opacity-50 transition"
                  >
                    {isSendingEmail ? (
                      <span>Sending Email Voucher...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send to Company</span>
                      </>
                    )}
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
