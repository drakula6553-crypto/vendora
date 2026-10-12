'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { UserRole } from '@/lib/types/auth';

const Auth3DScene = dynamic(() => import('@/components/3d/Auth3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-electric border-t-transparent animate-spin" />
    </div>
  ),
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const { login, isAuthenticated, isLoading: authLoading, quickDemoLogin, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(returnTo);
    }
  }, [isAuthenticated, authLoading, router, returnTo]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please provide a valid business email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password, rememberMe);
    setIsSubmitting(false);

    if (result.success) {
      router.push(returnTo);
    } else {
      setError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleDemoSignIn = async (role: UserRole) => {
    setIsSubmitting(true);
    setError(null);
    await quickDemoLogin(role);
    setIsSubmitting(false);
    router.push(returnTo);
  };

  return (
    <div className="min-h-screen bg-midnight flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Left Column: 3D Geometric Telemetry & Brand Narrative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#070E1E] flex-col justify-between p-12 border-r border-electric/15 overflow-hidden">
        {/* Top Logo */}
        <div className="relative z-10">
          <Logo size="md" showTagline />
        </div>

        {/* Center 3D Composition */}
        <div className="relative z-10 my-auto h-[460px] flex items-center justify-center">
          <Auth3DScene />
        </div>

        {/* Bottom Context Callout */}
        <div className="relative z-10 glass-panel p-6 rounded-2xl border-electric/20 max-w-lg">
          <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Vendor Gateway
          </div>
          <h3 className="text-white font-bold text-lg mb-1">
            Enterprise Financial Orchestration
          </h3>
          <p className="text-xs text-slate-textSecondary leading-relaxed">
            Direct access to multi-rail payouts, real-time inventory threshold sync, and automated two-way purchase order reconciliation.
          </p>
          <div className="mt-4 pt-3 border-t border-electric/15 flex items-center justify-between text-[11px] font-mono text-slate-textMuted">
            <span>TLS 1.3 ENCRYPTION</span>
            <span className="text-emerald-400">SESSION PROTECTED</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile brand header */}
          <div className="lg:hidden mb-8 text-center">
            <Logo size="md" className="justify-center mb-2" />
          </div>

          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase text-electric tracking-wider font-semibold block mb-1">
                Vendor Portal Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back.
              </h1>
              <p className="text-xs sm:text-sm text-slate-textSecondary mt-1.5">
                Sign in to manage your business operations.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
              </div>
            )}

            {/* Supabase status indicator */}
            {!isConfigured && (
              <div className="mb-6 p-3 rounded-xl bg-electric/10 border border-electric/20 text-xs text-slate-textMuted flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-electric" />
                  <span>Dev Mode Authentication Ready</span>
                </div>
                <span className="text-[10px] font-mono text-electric">ACTIVE</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                  Business Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah.chen@nexusdynamics.io"
                    disabled={isSubmitting}
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-electric hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    disabled={isSubmitting}
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-600 transition-all outline-none font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-textMuted hover:text-white focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#050B18] border border-electric/30 text-electric focus:ring-electric/50"
                  />
                  <span className="text-xs text-slate-textSecondary">Remember this terminal</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,140,255,0.35)] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Google Sign-In Option */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setGoogleNotice(true)}
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl border border-electric/20 glass-panel hover:bg-white/5 text-xs text-slate-textSecondary font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google Workspace</span>
                </button>
                {googleNotice && (
                  <p className="text-[11px] text-amber-400 mt-2 text-center">
                    Google OAuth requires provider credentials configured in Supabase Auth console.
                  </p>
                )}
              </div>
            </form>

            {/* Quick Demo Evaluation Buttons */}
            <div className="mt-8 pt-6 border-t border-electric/15">
              <span className="text-[11px] font-mono uppercase text-slate-textMuted tracking-wider block mb-2 text-center">
                Instant Reviewer Sign-In:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('owner')}
                  className="py-1.5 px-2 rounded-lg bg-[#0A192F] border border-gold/30 hover:border-gold text-gold text-[10px] font-mono uppercase transition-all"
                >
                  Owner
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('finance')}
                  className="py-1.5 px-2 rounded-lg bg-[#0A192F] border border-electric/30 hover:border-electric text-electric text-[10px] font-mono uppercase transition-all"
                >
                  Finance
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('inventory_manager')}
                  className="py-1.5 px-2 rounded-lg bg-[#0A192F] border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 text-[10px] font-mono uppercase transition-all"
                >
                  Inventory
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-xs text-slate-textMuted">
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="text-white font-semibold hover:underline">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-midnight flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-electric border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
