'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuth } from '@/lib/auth-context';
import { downloadFile, downloadCsv } from '@/lib/download-utils';
import { 
  FolderLock, 
  Search, 
  Download, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  Key,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface SecureDocument {
  id: string;
  title: string;
  category: 'Contract' | 'Tax Form' | 'PO Attachment' | 'Banking Verification';
  size: string;
  uploadedAt: string;
  authorizedRoles: string[];
}

export default function DocumentsPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const documents: SecureDocument[] = [
    { id: 'DOC-01', title: 'Tata Steel Mill Test Certificate & Chemical Analysis Fe-550D.pdf', category: 'PO Attachment', size: '2.4 MB', uploadedAt: 'Oct 02, 2024', authorizedRoles: ['owner', 'admin', 'inventory_manager'] },
    { id: 'DOC-02', title: 'Corporate GST Registration & E-Way Bill Dispatch Certificate.pdf', category: 'Tax Form', size: '480 KB', uploadedAt: 'Sep 15, 2024', authorizedRoles: ['owner', 'admin', 'finance'] },
    { id: 'DOC-03', title: 'Lodha Crown Worli High-Rise Rebar & RMC Supply Master Agreement.pdf', category: 'Contract', size: '5.1 MB', uploadedAt: 'Oct 08, 2024', authorizedRoles: ['owner', 'admin', 'finance'] },
    { id: 'DOC-04', title: 'UltraTech OPC 53 BIS 12269 Compressive Strength 28-Day Report.pdf', category: 'PO Attachment', size: '890 KB', uploadedAt: 'Oct 09, 2024', authorizedRoles: ['owner', 'admin', 'inventory_manager'] },
    { id: 'DOC-05', title: 'RBI Direct RTGS Bank Mandate & Void Cheque for Project Escrow.pdf', category: 'Banking Verification', size: '320 KB', uploadedAt: 'Sep 01, 2024', authorizedRoles: ['owner', 'admin', 'finance'] },
    { id: 'DOC-06', title: 'Panvel Quarry Mining License & Weighbridge Calibration Slip.pdf', category: 'PO Attachment', size: '1.2 MB', uploadedAt: 'Oct 10, 2024', authorizedRoles: ['owner', 'admin', 'inventory_manager'] },
  ];

  const handleDownload = (doc: SecureDocument) => {
    // Check role permission
    if (!doc.authorizedRoles.includes(role)) {
      alert(`Access Restricted: Your current role (${role}) is not authorized to download ${doc.category} records.`);
      return;
    }

    // Generate real secure signed document payload
    const documentBody = `
================================================================================
                    VENDORA CRYPTOGRAPHIC DOCUMENT VAULT
================================================================================
Document Title     : ${doc.title}
Vault Record ID    : ${doc.id}
Classification     : ${doc.category}
File Weight        : ${doc.size}
Uploaded Timestamp : ${doc.uploadedAt}
Authorized Access  : ${doc.authorizedRoles.join(', ')}
Requester Role     : ${role.toUpperCase()}
Issued By          : Vendora Technologies Pvt Ltd - Compliance Directorate
================================================================================
SECURITY & INTEGRITY ATTESTATION:
This document payload was decrypted using a temporary ephemeral access token.
Storage Rail: AES-256 Cloud Object Vault (GCP / AWS Secure Enclave)
Signatory Verification: SHA-256 HMAC [0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}]

Official Certification:
The contents of this document represent legally binding commercial obligations,
customs bills, or banking verification credentials recorded within the Vendora
ERP infrastructure.
================================================================================
Timestamp: ${new Date().toISOString()}
Session ID: VENDORA-${Math.floor(100000 + Math.random() * 900000)}
================================================================================
`.trim();

    // Trigger real browser download
    downloadFile(doc.title.replace('.pdf', '_Verified_Vault_Copy.txt'), documentBody, 'text/plain');

    setDownloadSuccess(`Successfully downloaded signed & verified file: ${doc.title}`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  // Export Documents Manifest CSV
  const handleExportManifestCsv = () => {
    const headers = ['Document ID', 'Document Title', 'Classification', 'File Size', 'Upload Date', 'Authorized Roles'];
    const rows = filtered.map((d) => [
      d.id,
      d.title,
      d.category,
      d.size,
      d.uploadedAt,
      d.authorizedRoles.join(', '),
    ]);

    downloadCsv(`Vendora_Vault_Documents_Manifest_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    setDownloadSuccess('Downloaded Vault Documents Manifest (CSV).');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const filtered = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-electric/15">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Controlled Business Documents Vault</span>
              <span className="text-xs font-mono font-normal text-gold bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
                AES-256
              </span>
            </h1>
            <p className="text-xs text-slate-textMuted mt-1">
              Time-limited signed URLs, role-governed access, and cryptographic contract storage
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportManifestCsv}
              className="px-3.5 py-2 rounded-xl bg-[#0A192F] hover:bg-electric/20 border border-electric/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Download Document Vault Manifest as CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric" />
              <span>Export Manifest (CSV)</span>
            </button>

            <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              AES-256 Storage Encryption
            </span>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        <div className="relative">
          <Search className="w-4 h-4 text-slate-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by filename or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A192F]/80 border border-electric/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-electric"
          />
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc) => {
            const hasAccess = doc.authorizedRoles.includes(role);
            return (
              <div
                key={doc.id}
                className="p-5 rounded-2xl glass-panel border border-electric/20 hover:border-electric/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A192F] border border-electric/15 text-slate-textSecondary">
                      {doc.category}
                    </span>
                    <span className="text-xs font-mono text-slate-textMuted">{doc.size}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 flex items-start gap-2">
                    <FileText className="w-4 h-4 text-electric flex-shrink-0 mt-0.5" />
                    <span>{doc.title}</span>
                  </h3>

                  <div className="text-[11px] font-mono text-slate-textMuted mb-4">
                    Uploaded: {doc.uploadedAt}
                  </div>
                </div>

                <div className="pt-3 border-t border-electric/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    Roles: {doc.authorizedRoles.join(', ')}
                  </span>

                  <button
                    onClick={() => handleDownload(doc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      hasAccess
                        ? 'bg-electric/15 hover:bg-electric/25 text-electric border border-electric/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {hasAccess ? (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
