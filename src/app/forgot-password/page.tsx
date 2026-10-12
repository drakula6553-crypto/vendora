'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPasswordRequest } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPasswordRequest(email);
    setIsSubmitting(false);

    // Show neutral confirmation message that does not reveal whether account exists
    setSubmittedMessage(result.message);
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
          Remember your password? <span className="text-electric font-semibold">Sign In</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="max-w-md mx-auto w-full my-12 relative z-10">
        <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-300">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-electric tracking-wider font-semibold block mb-1">
              Account Recovery
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-textSecondary mt-1.5 leading-relaxed">
              Enter your registered corporate email to receive a secure time-limited password reset link.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
            </div>
          )}

          {submittedMessage ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-300 leading-relaxed space-y-1">
                  <p className="font-semibold text-white">Dispatched Secure Reset Dispatch</p>
                  <p>{submittedMessage}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050B18]/70 border border-electric/15 text-xs text-slate-textMuted">
                <p>
                  To protect organizational privacy, our security layer never reveals whether a given email
                  address corresponds to an active account.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl bg-electric text-white text-xs font-semibold text-center hover:bg-electric-600 transition-colors"
                >
                  Return to Sign In
                </Link>
                <Link
                  href="/reset-password"
                  className="w-full py-3 rounded-xl border border-electric/30 text-slate-textSecondary text-xs font-semibold text-center hover:text-white transition-colors"
                >
                  Simulate Received Reset Link (Demo)
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah.chen@nexusdynamics.io"
                    disabled={isSubmitting}
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none"
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
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request Password Reset</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs font-mono text-slate-600 relative z-10">
        Secured with SHA-256 HMAC cryptographic token signatures
      </div>
    </div>
  );
}
