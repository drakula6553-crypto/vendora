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
  CheckCircle2,
  Activity,
  Terminal,
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
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
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
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'admin':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'finance':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'inventory_manager':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'read_only':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-foreground flex flex-col selection:bg-cyan-500/30 selection:text-white">
      {/* Top Portal Command Bar */}
      <header className="h-14 bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/15 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Logo size="sm" showTagline={false} />

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800">
            <span className="text-xs font-semibold text-white tracking-wide">
              {organization?.name || 'Nexus Dynamics Co.'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070F1E] text-slate-400 border border-slate-800">
              ORG-ID: {organization?.id ? organization.id.slice(0, 10) : 'PRIME'}
            </span>
          </div>
        </div>

        {/* Right Action Icons & Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Quick RBAC Role Switcher */}
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
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#070F1E] border border-cyan-500/25 shadow-2xl p-2 z-50 text-xs font-mono">
                <div className="px-2 py-1 text-[10px] uppercase text-slate-400 border-b border-slate-800 mb-1">
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
                          ? 'bg-cyan-500/15 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-cyan-500/20"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">{user?.fullName}</span>
                <span className="text-[10px] text-slate-400 capitalize font-mono leading-tight">
                  {role.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#070F1E] border border-cyan-500/25 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-800 mb-2">
                  <div className="text-sm font-bold text-white">{user?.fullName}</div>
                  <div className="text-xs text-slate-400 truncate font-mono">{user?.email}</div>
                  <div className="mt-1 inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 uppercase">
                    Role: {role}
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span>Business Settings</span>
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <span>Public Landing Page</span>
                  </Link>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
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
        <aside className="hidden md:flex flex-col w-64 bg-[#040814] border-r border-slate-800/80 p-4 space-y-1 overflow-y-auto">
          <nav className="space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(0,229,255,0.25)] font-bold'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#030712]/95 backdrop-blur-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <Logo size="sm" showTagline={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main App Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#030712]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
