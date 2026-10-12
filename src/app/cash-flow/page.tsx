'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { downloadCsv, downloadFile } from '@/lib/download-utils';
import { 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles,
  Sliders,
  Calendar,
  Download,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export default function CashFlowPage() {
  const [scenarioDays, setScenarioDays] = useState(30);
  const [notice, setNotice] = useState<string | null>(null);

  const forecastData = [
    { label: 'Week 1', inH: '45%', outH: '25%', inAmt: '₹95L', outAmt: '₹55L', inflowNum: 9500000, outflowNum: 5500000 },
    { label: 'Week 2', inH: '60%', outH: '35%', inAmt: '₹1.3Cr', outAmt: '₹72L', inflowNum: 13000000, outflowNum: 7200000 },
    { label: 'Week 3', inH: '75%', outH: '30%', inAmt: '₹1.7Cr', outAmt: '₹68L', inflowNum: 17000000, outflowNum: 6800000 },
    { label: 'Week 4', inH: '55%', outH: '40%', inAmt: '₹1.2Cr', outAmt: '₹88L', inflowNum: 12000000, outflowNum: 8800000 },
    { label: 'Week 5', inH: '70%', outH: '30%', inAmt: '₹1.5Cr', outAmt: '₹64L', inflowNum: 15000000, outflowNum: 6400000 },
    { label: 'Week 6', inH: '85%', outH: '45%', inAmt: '₹1.9Cr', outAmt: '₹96L', inflowNum: 19000000, outflowNum: 9600000 },
    { label: 'Week 7', inH: '90%', outH: '35%', inAmt: '₹2.1Cr', outAmt: '₹76L', inflowNum: 21000000, outflowNum: 7600000 },
    { label: 'Week 8', inH: '95%', outH: '50%', inAmt: '₹2.2Cr', outAmt: '₹1.1Cr', inflowNum: 22000000, outflowNum: 11000000 },
  ];

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  // Export Forecast CSV
  const handleExportForecastCsv = () => {
    const headers = ['Horizon Week', 'Customer Inflows (₹)', 'Supplier Outflows (₹)', 'Net Weekly Surplus (₹)'];
    const rows = forecastData.map((d) => [
      d.label,
      `₹${d.inflowNum.toLocaleString('en-IN')}`,
      `₹${d.outflowNum.toLocaleString('en-IN')}`,
      `₹${(d.inflowNum - d.outflowNum).toLocaleString('en-IN')}`,
    ]);

    downloadCsv(`Vendora_Cash_Flow_Forecast_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showNotification('Downloaded Cash Flow Projections (CSV).');
  };

  // Download Comprehensive Treasury Report
  const handleDownloadFullReport = () => {
    const report = `
================================================================================
               VENDORA LIQUIDITY & CAPITAL RUNWAY AUDIT REPORT
================================================================================
Generated Date       : ${new Date().toLocaleString('en-IN')}
Base Currency        : Indian Rupee (INR - ₹)
Net Working Capital  : ₹12,48,32,000.00
Current Runway       : 24.2 Months
Selected Scenario    : Net-${scenarioDays} Settlement Terms
Avg Collection (DSO) : 22.4 Days
Avg Payable (DPO)    : 34.8 Days
Working Capital Ratio: 2.18x (Optimal Float)

--------------------------------------------------------------------------------
8-WEEK FORWARD LIQUIDITY BREAKDOWN:
--------------------------------------------------------------------------------
${forecastData.map(d => `${d.label.padEnd(10)} | Inflow: ${d.inAmt.padEnd(8)} | Outflow: ${d.outAmt.padEnd(8)} | Net: ₹${((d.inflowNum - d.outflowNum) / 100000).toFixed(1)} Lakhs`).join('\n')}

================================================================================
TREASURY RISK ASSESSMENT:
All scheduled supplier outflows remain 100% covered by confirmed customer purchase
orders and escrow reserves deposited with RBI scheduled commercial banks.
================================================================================
`.trim();

    downloadFile(`Vendora_Treasury_Runway_Report_${new Date().toISOString().slice(0, 10)}.txt`, report, 'text/plain');
    showNotification('Downloaded Treasury Runway Audit Report (.txt).');
  };

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Cash Flow & Capital Runway Telemetry</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                INR (₹) Base
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Dynamic liquidity modeling, net burn rate analysis, and forward scenario projections
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportForecastCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Export 8-week cash projection as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export Forecast (CSV)</span>
            </button>

            <button
              onClick={handleDownloadFullReport}
              className="px-3.5 py-2 rounded-xl bg-electric/15 hover:bg-electric/25 border border-electric/40 text-electric text-xs font-semibold flex items-center gap-2 transition-all"
              title="Download Full Treasury Audit"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Treasury Report</span>
            </button>

            <span className="text-xs font-mono text-gold px-3 py-1.5 rounded-xl bg-gold/15 border border-gold/30">
              Runway: 24.2 Months
            </span>
          </div>
        </div>

        {notice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* 3 Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl glass-panel border-electric/25">
            <span className="text-xs font-mono uppercase text-slate-textMuted">Net Working Capital</span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1.5">₹12,48,32,000.00</div>
            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% compared to Q3 baseline</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-electric/25">
            <span className="text-xs font-mono uppercase text-slate-textMuted">Avg Collection Period (DSO)</span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1.5">22.4 Days</div>
            <div className="mt-2 text-xs text-slate-textMuted">Industry benchmark: 38 days</div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border-electric/25">
            <span className="text-xs font-mono uppercase text-slate-textMuted">Avg Payable Period (DPO)</span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1.5">34.8 Days</div>
            <div className="mt-2 text-xs text-emerald-400">Optimal working capital float</div>
          </div>
        </div>

        {/* Predictive Curve Chart Container */}
        <div className="p-6 rounded-2xl glass-panel border-electric/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                60-Day Predictive Cash Runway
              </h3>
              <p className="text-xs text-slate-textMuted">
                Calculated against builder milestone RA bills, steel mill RTGS advances, and quarry transit cycles
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-textMuted">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-electric" />
                <span className="text-white">Builder Inflows (₹)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-gold" />
                <span className="text-white">Mill / Quarry Outflows (₹)</span>
              </div>
            </div>
          </div>

          {/* Visual Chart Bars */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-electric/20">
            {forecastData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-full">
                  <div
                    style={{ height: bar.inH }}
                    className="w-1/2 bg-gradient-to-t from-electric-900 via-electric-600 to-electric rounded-t transition-all group-hover:brightness-125 cursor-pointer"
                    title={`Inflow: ${bar.inAmt}`}
                  />
                  <div
                    style={{ height: bar.outH }}
                    className="w-1/2 bg-gradient-to-t from-amber-900 via-gold-muted to-gold rounded-t transition-all group-hover:brightness-125 cursor-pointer"
                    title={`Outflow: ${bar.outAmt}`}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-textMuted">{bar.label}</span>
              </div>
            ))}
          </div>

          {/* Scenario Modeling Bar */}
          <div className="p-4 rounded-xl bg-[#050B18]/60 border border-electric/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-electric" />
              <div>
                <span className="text-xs font-semibold text-white block">Forward Scenario Simulation</span>
                <span className="text-[11px] text-slate-textMuted">Adjust supplier payment terms to test liquidity impact</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setScenarioDays(15)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  scenarioDays === 15 ? 'bg-electric text-white' : 'bg-[#0A192F] text-slate-textMuted hover:text-white'
                }`}
              >
                Net-15 Cycle
              </button>
              <button
                onClick={() => setScenarioDays(30)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  scenarioDays === 30 ? 'bg-electric text-white' : 'bg-[#0A192F] text-slate-textMuted hover:text-white'
                }`}
              >
                Net-30 Standard
              </button>
              <button
                onClick={() => setScenarioDays(60)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  scenarioDays === 60 ? 'bg-electric text-white' : 'bg-[#0A192F] text-slate-textMuted hover:text-white'
                }`}
              >
                Net-60 Extended
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
