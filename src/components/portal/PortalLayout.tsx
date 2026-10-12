'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types/auth';
import {
  LayoutDashboard,
  Building2,
  Package,
  FileCheck2,
  FileText,
  CreditCard,
  CalendarClock,
  TrendingUp,
  FolderLock,
  FileSpreadsheet,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

interface PortalLayoutProps {
  children: React.ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, organization, role, isAuthenticated, isLoading, logout, switchRole } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  // Authentication Route Guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-electric border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-slate-textMuted tracking-wider uppercase">
            Verifying Cryptographic Session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Purchase Orders', href: '/purchase-orders', icon: FileCheck2 },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Payment Scheduler', href: '/payment-scheduler', icon: CalendarClock },
    { name: 'Cash Flow', href: '/cash-flow', icon: TrendingUp },
    { name: 'Documents', href: '/documents', icon: FolderLock },
    { name: 'Reports', href: '/reports', icon: FileSpreadsheet },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  const getRoleBadgeStyle = (r: UserRole) => {
    switch (r) {
      case 'owner':
        return 'bg-gold/15 text-gold border-gold/30';
      case 'admin':
        return 'bg-electric/15 text-electric border-electric/30';
      case 'finance':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'inventory_manager':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'read_only':
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-midnight text-foreground flex flex-col selection:bg-electric/30 selection:text-white">
      {/* Top Portal Command Bar */}
      <header className="h-16 bg-[#070E1E] border-b border-electric/15 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-textMuted hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Logo size="sm" showTagline={false} />

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-electric/15">
            <span className="text-xs font-semibold text-white tracking-wide">
              {organization?.name || 'Nexus Dynamics Co.'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A192F] text-slate-textMuted border border-electric/15">
              ORG-ID: {organization?.id ? organization.id.slice(0, 10) : 'PRIME'}
            </span>
          </div>
        </div>

        {/* Right Action Icons & Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Quick RBAC Role Switcher (Crucial for testing permissions!) */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className={`hidden lg:flex items-center gap-1.5 text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg border transition-all ${getRoleBadgeStyle(
                role
              )}`}
              title="Test role-based access control permissions"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Role: {role.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0A192F] border border-electric/30 shadow-2xl p-2 z-50 text-xs">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-textMuted border-b border-electric/15 mb-1">
                  Simulate RBAC Permissions:
                </div>
                {(['owner', 'admin', 'finance', 'inventory_manager', 'read_only'] as UserRole[]).map(
                  (r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        role === r
                          ? 'bg-electric/20 text-electric font-bold'
                          : 'text-slate-textSecondary hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="capitalize">{r.replace('_', ' ')}</span>
                      {role === r && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-electric/20"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric to-electric-600 text-white flex items-center justify-center font-bold text-xs">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">{user?.fullName}</span>
                <span className="text-[10px] text-slate-textMuted capitalize font-mono leading-tight">
                  {role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-textMuted" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0A192F] border border-electric/25 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-electric/15 mb-2">
                  <div className="text-sm font-bold text-white">{user?.fullName}</div>
                  <div className="text-xs text-slate-textMuted truncate">{user?.email}</div>
                  <div className="mt-1 inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-electric/10 text-electric border border-electric/20 uppercase">
                    Role: {role}
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-electric" />
                    <span>Business Settings</span>
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <span>Public Landing Page</span>
                  </Link>
                </div>

                <div className="pt-2 mt-2 border-t border-electric/15">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Sign Out of VENDORA</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main App Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#050B18] border-r border-electric/15 p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-textMuted">
            VENDOR WORKSPACES
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-electric text-white shadow-[0_0_15px_rgba(79,140,255,0.35)]'
                    : 'text-slate-textMuted hover:text-white hover:bg-[#0A192F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-textMuted'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-6 mt-auto">
            <div className="p-3.5 rounded-xl bg-[#0A192F]/60 border border-electric/15 text-xs text-slate-textMuted space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Plan: Growth Tier</span>
              </div>
              <div className="text-[11px] leading-relaxed">
                Multi-Rail Payouts and 2-Way PO Reconciliation Active.
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#050B18]/95 backdrop-blur-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-electric/15 mb-4">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-textMuted hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                        isActive ? 'bg-electric text-white' : 'text-slate-textSecondary hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-xl bg-rose-500/10 text-rose-400 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-[#060D1D] p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
