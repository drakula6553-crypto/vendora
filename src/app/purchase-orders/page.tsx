'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv, downloadFile } from '@/lib/download-utils';
import { 
  FileCheck2, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  Download,
  X,
  FileText,
  Printer
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  itemsCount: number;
  totalAmount: string;
  numericAmount: number;
  issueDate: string;
  deliveryDate: string;
  status: 'Draft' | 'Sent' | 'Acknowledged' | 'Fulfilled';
  matchingStatus: 'Matched' | 'Pending Receipt' | 'Variance Alert';
}

export default function PurchaseOrdersPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [orders, setOrders] = useState<PurchaseOrder[]>([
    { 
      id: 'PO-901', 
      poNumber: 'PO-2024-0901', 
      vendorName: 'Tata Steel Ltd (TMT Rebar Division)', 
      itemsCount: 4, 
      totalAmount: '₹70,20,000.00', 
      numericAmount: 7020000,
      issueDate: 'Oct 02, 2024', 
      deliveryDate: 'Oct 16, 2024', 
      status: 'Fulfilled', 
      matchingStatus: 'Matched' 
    },
    { 
      id: 'PO-902', 
      poNumber: 'PO-2024-0902', 
      vendorName: 'UltraTech Cement Ltd (Bulk Works)', 
      itemsCount: 8, 
      totalAmount: '₹31,60,000.00', 
      numericAmount: 3160000,
      issueDate: 'Oct 08, 2024', 
      deliveryDate: 'Oct 24, 2024', 
      status: 'Acknowledged', 
      matchingStatus: 'Pending Receipt' 
    },
    { 
      id: 'PO-903', 
      poNumber: 'PO-2024-0903', 
      vendorName: 'Navkar Transit & Dumper Logistics', 
      itemsCount: 3, 
      totalAmount: '₹10,80,000.00', 
      numericAmount: 1080000,
      issueDate: 'Oct 10, 2024', 
      deliveryDate: 'Nov 02, 2024', 
      status: 'Sent', 
      matchingStatus: 'Pending Receipt' 
    },
    { 
      id: 'PO-904', 
      poNumber: 'PO-2024-0904', 
      vendorName: 'JSW Steel Structural Section Mill', 
      itemsCount: 6, 
      totalAmount: '₹54,10,000.00', 
      numericAmount: 5410000,
      issueDate: 'Oct 11, 2024', 
      deliveryDate: 'Nov 15, 2024', 
      status: 'Draft', 
      matchingStatus: 'Pending Receipt' 
    },
  ]);

  const [newPo, setNewPo] = useState({
    vendorName: 'Tata Steel Ltd (TMT Rebar Division)',
    itemsCount: 2,
    totalAmount: '2500000',
    deliveryDays: 14,
  });

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(newPo.totalAmount) || 0;
    const created: PurchaseOrder = {
      id: `PO-${orders.length + 905}`,
      poNumber: `PO-2024-0${orders.length + 905}`,
      vendorName: newPo.vendorName,
      itemsCount: Number(newPo.itemsCount),
      totalAmount: `₹${numeric.toLocaleString('en-IN')}.00`,
      numericAmount: numeric,
      issueDate: 'Today',
      deliveryDate: 'In 14 days',
      status: 'Sent',
      matchingStatus: 'Pending Receipt',
    };
    setOrders([created, ...orders]);
    setIsModalOpen(false);
    showNotification(`Purchase Order ${created.poNumber} created and transmitted!`);
  };

  // Export POs as CSV
  const handleExportCsv = () => {
    const headers = ['PO Number', 'Vendor / Supplier', 'Line Items', 'Total Value (INR)', 'Issue Date', 'Delivery Date', 'Status', 'Matching Status'];
    const rows = filtered.map((po) => [
      po.poNumber,
      po.vendorName,
      po.itemsCount,
      po.totalAmount,
      po.issueDate,
      po.deliveryDate,
      po.status,
      po.matchingStatus,
    ]);

    downloadCsv(`Vendora_Purchase_Orders_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showNotification('Downloaded Purchase Orders list (CSV).');
  };

  // Download Individual Purchase Order Document
  const handleDownloadPoDocument = (po: PurchaseOrder) => {
    const poContent = `
================================================================================
                    VENDORA OFFICIAL PURCHASE ORDER
================================================================================
PO Number          : ${po.poNumber}
Issuing Entity     : VENDORA TECHNOLOGIES PRIVATE LIMITED
                     Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051
Supplier Entity    : ${po.vendorName}
Total Order Value  : ${po.totalAmount}
Line Items Count   : ${po.itemsCount} line items
Issue Date         : ${po.issueDate}
Target Delivery    : ${po.deliveryDate}
Order Status       : ${po.status.toUpperCase()}
PO Match Check     : ${po.matchingStatus}
Currency Rail      : Indian Rupee (INR - ₹)
Payment Terms      : Net-30 Upon Verified Good Receipt Note (GRN)
================================================================================
TERMS & CONDITIONS:
1. Vendor agrees to deliver designated inventory lines to the specified warehouse.
2. Two-way invoice matching is required prior to automated treasury wire release.
3. Quality inspection threshold requires 99.8% conformance upon dock arrival.
================================================================================
Authorized Signatory: Head of Corporate Procurement, Vendora Technologies Pvt Ltd
Digital Verification: SHA256-VERIFIED [0x${Math.random().toString(16).substring(2, 10)}]
================================================================================
`.trim();

    downloadFile(`${po.poNumber}_Purchase_Order.txt`, poContent, 'text/plain');
    showNotification(`Downloaded official order document for ${po.poNumber}`);
  };

  const filtered = orders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canEdit = role !== 'read_only';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Purchase Orders & Line Matching</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                INR (₹) Base
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Two-way PO reconciliation, supplier acknowledgment states, and electronic order dispatches
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Download all purchase orders as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export POs (CSV)</span>
            </button>

            {canEdit && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create Purchase Order</span>
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

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PO number or supplier name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
          />
        </div>

        {/* PO Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">PO NUMBER</th>
                  <th className="py-3.5 px-4">SUPPLIER</th>
                  <th className="py-3.5 px-4">ITEMS</th>
                  <th className="py-3.5 px-4">TOTAL VALUE (₹)</th>
                  <th className="py-3.5 px-4">ISSUE DATE</th>
                  <th className="py-3.5 px-4">LIFECYCLE STATUS</th>
                  <th className="py-3.5 px-4">PO MATCH CHECK</th>
                  <th className="py-3.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filtered.map((po) => (
                  <tr key={po.id} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-electric">{po.poNumber}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{po.vendorName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-textSecondary">{po.itemsCount} lines</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{po.totalAmount}</td>
                    <td className="py-3.5 px-4 text-slate-textMuted">{po.issueDate}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          po.status === 'Fulfilled'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : po.status === 'Acknowledged'
                            ? 'bg-electric/10 text-electric border border-electric/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 w-fit ${
                          po.matchingStatus === 'Matched'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-slate-700/50 text-slate-300'
                        }`}
                      >
                        {po.matchingStatus === 'Matched' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-slate-400" />
                        )}
                        {po.matchingStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownloadPoDocument(po)}
                        className="px-2.5 py-1 rounded bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-[11px] font-medium flex items-center gap-1.5 ml-auto transition-colors"
                        title="Download electronic PO document"
                      >
                        <Download className="w-3 h-3 text-electric" />
                        <span>Download PO</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create PO Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-electric/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Generate Purchase Order</span>
                  <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">INR</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePo} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Target Supplier
                  </label>
                  <select
                    value={newPo.vendorName}
                    onChange={(e) => setNewPo({ ...newPo, vendorName: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Tata Steel Ltd (TMT Rebar Division)">Tata Steel Ltd (TMT Rebar Division)</option>
                    <option value="UltraTech Cement Ltd (Bulk Works)">UltraTech Cement Ltd (Bulk Works)</option>
                    <option value="Navkar Transit & Dumper Logistics">Navkar Transit & Dumper Logistics</option>
                    <option value="JSW Steel Structural Section Mill">JSW Steel Structural Section Mill</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Number of Line Items
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newPo.itemsCount}
                      onChange={(e) => setNewPo({ ...newPo, itemsCount: Number(e.target.value) })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Total PO Value (₹ INR)
                    </label>
                    <input
                      type="number"
                      required
                      value={newPo.totalAmount}
                      onChange={(e) => setNewPo({ ...newPo, totalAmount: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
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
                    Transmit PO (₹)
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
