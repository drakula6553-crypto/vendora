'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import {
  ArrowRight,
  Menu,
  X,
  UserCheck,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function CyberNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01 SOURCING', href: '#act-01' },
    { label: '02 TELEMETRY', href: '#act-02' },
    { label: '03 STOCKYARDS', href: '#act-03' },
    { label: '04 3-WAY MATCH', href: '#act-04' },
    { label: '05 SIMULATOR', href: '#act-05' },
    { label: '06 GATEWAY', href: '#act-06' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#030712]/92 backdrop-blur-2xl border-b border-cyan-500/15 shadow-[0_10px_35px_rgba(0,0,0,0.7)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Status Indicator */}
          <div className="flex items-center gap-4">
            <Logo size="md" />

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-800 text-[11px] font-mono text-slate-textMuted">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-slate-300">KERNEL v2.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">SYS: NOMINAL</span>
            </div>
          </div>

          {/* Center: Storyline Act Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Quick Portals / Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/25 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Open Terminal</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Deploy Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel-elevated border border-cyan-500/25 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-xl text-xs font-mono uppercase text-slate-300 border border-slate-800"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="w-full text-center py-2.5 rounded-xl text-xs font-mono uppercase font-bold text-black bg-amber-400"
              >
                Deploy Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
