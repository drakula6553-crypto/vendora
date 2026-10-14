import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="en" className={`dark scroll-smooth ${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-screen bg-midnight text-foreground font-sans antialiased selection:bg-electric/30 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
