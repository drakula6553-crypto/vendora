'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await updatePassword(password);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } else {
      setError(result.error || 'Failed to update password. Session may have expired.');
    }
  };

  return (
    <div className="min-h-screen bg-midnight text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden bg-radial-gradient">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <Logo size="md" />
        <Link
          href="/login"
          className="text-xs sm:text-sm text-slate-textMuted hover:text-white font-medium transition-colors"
        >
          Cancel and Return to <span className="text-electric font-semibold">Sign In</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="max-w-md mx-auto w-full my-12 relative z-10">
        <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-300">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-electric tracking-wider font-semibold block mb-1">
              Credential Mutation
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Set New Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-textSecondary mt-1.5 leading-relaxed">
              Create a secure passphrase to restore your vendor terminal session.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
            </div>
          )}

          {isSuccess ? (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Password Successfully Updated</h3>
                <p className="text-xs text-slate-textSecondary">
                  Your credentials have been securely stored. Redirecting you to login now...
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold"
              >
                Go to Sign In Immediately
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                  New Password (8+ characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    disabled={isSubmitting}
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-600 outline-none font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-textMuted hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    disabled={isSubmitting}
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 disabled:opacity-50 shadow-[0_0_20px_rgba(79,140,255,0.35)] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Updating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full text-center text-xs font-mono text-slate-600 relative z-10">
        Secured by Supabase Authentication Protocol
      </div>
    </div>
  );
}
