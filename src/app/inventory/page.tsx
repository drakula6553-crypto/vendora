'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadCsv } from '@/lib/download-utils';
import {
  Package,
  Search,
  Plus,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Warehouse,
  TrendingDown,
  Download,
  X,
  HardHat
} from 'lucide-react';

interface SkuItem {
  sku: string;
  name: string;
  category: string;
  unit: string;
  warehouse: string;
  onHand: number;
  minThreshold: number;
  unitCost: number;
  status: 'Optimal' | 'Reorder Triggered' | 'Critical Low';
}

export default function InventoryPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [items, setItems] = useState<SkuItem[]>([
    { 
      sku: 'TMT-TATA-550D', 
      name: 'Tata Tiscon 550D TMT Steel Rebar (16mm & 20mm Bundles)', 
      category: 'Structural Steel & TMT', 
      unit: 'Metric Tonnes (MT)', 
      warehouse: 'Taloja Steel Stockyard', 
      onHand: 420, 
      minThreshold: 100, 
      unitCost: 58500.0, 
      status: 'Optimal' 
    },
    { 
      sku: 'CEM-ULTRA-53', 
      name: 'UltraTech Super OPC 53 Grade High-Strength Cement', 
      category: 'Cement & Binders', 
      unit: 'Bags (50 kg)', 
      warehouse: 'Bhiwandi Bulk Hub', 
      onHand: 1850, 
      minThreshold: 2000, 
      unitCost: 395.0, 
      status: 'Reorder Triggered' 
    },
    { 
      sku: 'RMC-M30-PUMP', 
      name: 'Ready-Mix Concrete (RMC) M30 High-Rise Slabs', 
      category: 'Ready Mix Concrete', 
      unit: 'Cubic Meters (Cu.m)', 
      warehouse: 'Chakan Batching Plant', 
      onHand: 650, 
      minThreshold: 150, 
      unitCost: 4250.0, 
      status: 'Optimal' 
    },
    { 
      sku: 'AGG-BLUE-20MM', 
      name: 'Machine Crushed Blue Metal Coarse Aggregate (20mm)', 
      category: 'Coarse Aggregates', 
      unit: 'Brass (100 cu.ft)', 
      warehouse: 'Panvel Quarry Stockyard', 
      onHand: 380, 
      minThreshold: 100, 
      unitCost: 3600.0, 
      status: 'Optimal' 
    },
    { 
      sku: 'MSAND-ZONE-2', 
      name: 'Manufactured Concrete M-Sand (Zone-II IS:383 Compliant)', 
      category: 'Sand & Fine Aggregates', 
      unit: 'Metric Tonnes (MT)', 
      warehouse: 'Panvel Quarry Stockyard', 
      onHand: 45, 
      minThreshold: 120, 
      unitCost: 1650.0, 
      status: 'Critical Low' 
    },
    { 
      sku: 'AAC-BLK-600', 
      name: 'AAC Autoclaved Aerated Blocks (600x200x150mm Grade-1)', 
      category: 'Masonry & Wall Blocks', 
      unit: 'Cubic Meters (Cu.m)', 
      warehouse: 'Bhiwandi Bulk Hub', 
      onHand: 940, 
      minThreshold: 200, 
      unitCost: 2850.0, 
      status: 'Optimal' 
    },
  ]);

  const [newItem, setNewItem] = useState({
    sku: '',
    name: '',
    category: 'Structural Steel & TMT',
    unit: 'Metric Tonnes (MT)',
    warehouse: 'Taloja Steel Stockyard',
    onHand: 100,
    minThreshold: 20,
    unitCost: 55000,
  });

  const notify = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleExportCsv = () => {
    downloadCsv(
      'vendora_builder_raw_materials_catalog.csv',
      ['Material SKU', 'Material Name', 'Category', 'Unit', 'Stockyard Location', 'On Hand', 'Min Threshold', 'Unit Cost (INR)', 'Total Valuation (INR)', 'Status'],
      items.map(i => [
        i.sku,
        i.name,
        i.category,
        i.unit,
        i.warehouse,
        i.onHand,
        i.minThreshold,
        i.unitCost,
        i.onHand * i.unitCost,
        i.status
      ])
    );
    notify('Builder raw materials inventory catalog exported as CSV!');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.sku || !newItem.name) return;

    const status: 'Optimal' | 'Reorder Triggered' | 'Critical Low' =
      newItem.onHand <= newItem.minThreshold / 2
        ? 'Critical Low'
        : newItem.onHand <= newItem.minThreshold
        ? 'Reorder Triggered'
        : 'Optimal';

    setItems([
      {
        sku: newItem.sku,
        name: newItem.name,
        category: newItem.category,
        unit: newItem.unit,
        warehouse: newItem.warehouse,
        onHand: Number(newItem.onHand),
        minThreshold: Number(newItem.minThreshold),
        unitCost: Number(newItem.unitCost),
        status,
      },
      ...items,
    ]);

    setIsModalOpen(false);
    notify(`Material SKU ${newItem.sku} successfully added to inventory!`);
    setNewItem({
      sku: '',
      name: '',
      category: 'Structural Steel & TMT',
      unit: 'Metric Tonnes (MT)',
      warehouse: 'Taloja Steel Stockyard',
      onHand: 100,
      minThreshold: 20,
      unitCost: 55000,
    });
  };

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse =
      warehouseFilter === 'All' || item.warehouse === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  const totalValuation = items.reduce(
    (acc, item) => acc + item.onHand * item.unitCost,
    0
  );

  const lowStockCount = items.filter(
    (i) => i.status === 'Reorder Triggered' || i.status === 'Critical Low'
  ).length;

  const canEdit = role === 'owner' || role === 'admin' || role === 'inventory_manager';

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Builder Raw Materials Stockyard</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                TMT, Cement & Aggregates
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Real-time stock tracking for construction developers, weighbridge receipts, and automated batch replenishment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-[#0f223d] border border-electric/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export CSV</span>
            </button>

            {canEdit && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(79,140,255,0.3)] flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Material SKU</span>
              </button>
            )}
          </div>
        </div>

        {notice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search steel grades, cement types, aggregates, or batch codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Warehouse className="w-4 h-4 text-slate-textMuted" />
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="bg-[#0A192F] border border-electric/20 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-electric"
            >
              <option value="All">All Yards & Batch Plants</option>
              <option value="Taloja Steel Stockyard">Taloja Steel Stockyard</option>
              <option value="Bhiwandi Bulk Hub">Bhiwandi Bulk Hub</option>
              <option value="Chakan Batching Plant">Chakan Batching Plant</option>
              <option value="Panvel Quarry Stockyard">Panvel Quarry Stockyard</option>
            </select>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-electric/20">
            <span className="text-[11px] font-mono uppercase text-slate-textMuted">Total Stockyard Valuation</span>
            <div className="text-xl font-bold text-white font-mono mt-1">
              ₹{totalValuation.toLocaleString('en-IN')}.00
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Physical raw materials reserve</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-electric/20">
            <span className="text-[11px] font-mono uppercase text-slate-textMuted">Active Material Lines</span>
            <div className="text-xl font-bold text-white font-mono mt-1">
              {items.length} Tracked Lines
            </div>
            <span className="text-[11px] text-emerald-400 mt-0.5 block">ISI / BIS standard verified</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-electric/20">
            <span className="text-[11px] font-mono uppercase text-slate-textMuted">Replenishment Triggers</span>
            <div className="text-xl font-bold text-amber-400 font-mono mt-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{lowStockCount} Requires Order</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Automatic PO generation ready</span>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="rounded-2xl glass-panel border-electric/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-electric/15 text-slate-textMuted font-mono bg-[#0A192F]/50">
                  <th className="py-3.5 px-4">SKU / CODE</th>
                  <th className="py-3.5 px-4">RAW MATERIAL NAME</th>
                  <th className="py-3.5 px-4">CATEGORY</th>
                  <th className="py-3.5 px-4">STOCKYARD LOCATION</th>
                  <th className="py-3.5 px-4 text-right">ON HAND</th>
                  <th className="py-3.5 px-4 text-right">RATE / UNIT (₹)</th>
                  <th className="py-3.5 px-4 text-right">TOTAL VALUATION (₹)</th>
                  <th className="py-3.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric/10">
                {filtered.map((item) => (
                  <tr key={item.sku} className="hover:bg-electric/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-electric">{item.sku}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Unit: {item.unit}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-textSecondary">{item.category}</td>
                    <td className="py-3 px-4 text-slate-textMuted font-mono">{item.warehouse}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      {item.onHand.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-textSecondary">
                      ₹{item.unitCost.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      ₹{(item.onHand * item.unitCost).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          item.status === 'Optimal'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : item.status === 'Reorder Triggered'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add SKU */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-electric/30 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-gold" />
                  <span>Add Raw Material SKU</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-textMuted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TMT-JSW-500D"
                      value={newItem.sku}
                      onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="Structural Steel & TMT">Structural Steel & TMT</option>
                      <option value="Cement & Binders">Cement & Binders</option>
                      <option value="Ready Mix Concrete">Ready Mix Concrete</option>
                      <option value="Coarse Aggregates">Coarse Aggregates</option>
                      <option value="Sand & Fine Aggregates">Sand & Fine Aggregates</option>
                      <option value="Masonry & Wall Blocks">Masonry & Wall Blocks</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                    Material Description & Grade
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JSW Neosteel Fe-550D TMT Bar (12mm)"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Stockyard Location
                    </label>
                    <select
                      value={newItem.warehouse}
                      onChange={(e) => setNewItem({ ...newItem, warehouse: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="Taloja Steel Stockyard">Taloja Steel Stockyard</option>
                      <option value="Bhiwandi Bulk Hub">Bhiwandi Bulk Hub</option>
                      <option value="Chakan Batching Plant">Chakan Batching Plant</option>
                      <option value="Panvel Quarry Stockyard">Panvel Quarry Stockyard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Measurement Unit
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Metric Tonnes (MT)"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      On Hand Units
                    </label>
                    <input
                      type="number"
                      required
                      value={newItem.onHand}
                      onChange={(e) => setNewItem({ ...newItem, onHand: Number(e.target.value) })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Min Threshold
                    </label>
                    <input
                      type="number"
                      required
                      value={newItem.minThreshold}
                      onChange={(e) => setNewItem({ ...newItem, minThreshold: Number(e.target.value) })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-1.5">
                      Unit Cost (₹ INR)
                    </label>
                    <input
                      type="number"
                      required
                      value={newItem.unitCost}
                      onChange={(e) => setNewItem({ ...newItem, unitCost: Number(e.target.value) })}
                      className="w-full bg-[#050B18] border border-electric/25 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
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
                    Create Material SKU
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
