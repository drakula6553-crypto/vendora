import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'VENDORA — Raw Material Supply to Builders & Infrastructure Developers',
  description:
    'Manage raw material stockyards, TMT steel rebars, ready-mix concrete, cement bags, builder RA bills, and multi-rail settlements — all from one powerful workspace.',
  keywords: [
    'raw material to builder',
    'construction vendor management',
    'TMT steel rebars',
    'ready mix concrete RMC',
    'builder RA bills',
    'cement stockyard management',
    'weighbridge challan matching',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-midnight text-foreground font-sans antialiased selection:bg-electric/30 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
