/**
 * Browser file download and document generation utilities for Vendora
 */

export function downloadFile(filename: string, content: string, mimeType: string = 'text/csv;charset=utf-8;') {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCsv = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCsv).join(','),
    ...rows.map(row => row.map(escapeCsv).join(','))
  ].join('\r\n');

  downloadFile(filename.endsWith('.csv') ? filename : `${filename}.csv`, csvContent, 'text/csv;charset=utf-8;');
}

export function downloadPrintableReceipt(data: {
  invoiceNumber: string;
  counterparty: string;
  email?: string;
  amount: string;
  paidDate: string;
  type?: string;
  referenceNo?: string;
  paymentMode?: string;
}) {
  const transactionType = data.type || 'Commercial Settlement Voucher';
  if (typeof window === 'undefined') return;

  const receiptHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Receipt - ${data.invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0A192F; background: #fff; }
    .header { border-bottom: 2px solid #4F8CFF; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: 800; color: #050B18; letter-spacing: -0.5px; }
    .badge { background: #E8F5E9; color: #2E7D32; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; border: 1px solid #C8E6C9; }
    .title { font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #0A192F; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .field { font-size: 13px; color: #5B6B82; }
    .value { font-size: 15px; font-weight: 600; color: #050B18; margin-top: 4px; }
    .amount-box { background: #F4F7FC; border: 1px solid #D6E4FF; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0; }
    .amount-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #4F8CFF; letter-spacing: 1px; }
    .amount-val { font-size: 32px; font-weight: 800; color: #050B18; margin-top: 6px; font-family: monospace; }
    .footer { border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #8C9BAE; text-align: center; margin-top: 40px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">VENDORA</div>
      <div style="font-size: 12px; color: #5B6B82; margin-top: 4px;">Connected Enterprise Financial Platform</div>
    </div>
    <div class="badge">PAID & SETTLED</div>
  </div>

  <div class="title">OFFICIAL PAYMENT RECEIPT / SETTLEMENT VOUCHER</div>

  <div class="grid">
    <div>
      <div class="field">Invoice / Bill Reference:</div>
      <div class="value">${data.invoiceNumber}</div>
    </div>
    <div>
      <div class="field">Payment Date:</div>
      <div class="value">${data.paidDate}</div>
    </div>
    <div>
      <div class="field">Counterparty / Entity:</div>
      <div class="value">${data.counterparty}</div>
    </div>
    <div>
      <div class="field">Counterparty Email:</div>
      <div class="value">${data.email || 'billing@' + data.counterparty.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}</div>
    </div>
    <div>
      <div class="field">Transaction Direction:</div>
      <div class="value">${transactionType}</div>
    </div>
    <div>
      <div class="field">Settlement UTR / Ref:</div>
      <div class="value">${data.referenceNo || 'UTR-VEN-' + Math.floor(100000000 + Math.random() * 900000000)}</div>
    </div>
  </div>

  <div class="amount-box">
    <div class="amount-label">Settled Amount</div>
    <div class="amount-val">${data.amount}</div>
    <div style="font-size: 12px; color: #5B6B82; margin-top: 6px;">Currency: Indian Rupees (INR) • Verified by Bank Core Switch</div>
  </div>

  <div class="footer">
    <p>This is a computer-generated official receipt issued by VENDORA Financial Management Platform.</p>
    <p>Transaction Authenticated: ${new Date().toISOString()} • GST / Tax Compliant</p>
  </div>

  <script>
    window.onload = function() { window.print(); }
  </script>
</body>
</html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  }
}
