'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useAuth } from '@/lib/auth-context';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Building2, 
  Package, 
  Users, 
  Calendar, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { OnboardingData } from '@/lib/types/auth';

type Step = 'register' | 'profile' | 'type' | 'supplier' | 'product' | 'terms' | 'completed';

export default function SignupPage() {
  const router = useRouter();
  const { signup, completeOnboarding } = useAuth();

  // Registration form states
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Status & validation states
  const [currentStep, setCurrentStep] = useState<Step>('register');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);

  // Onboarding wizard data
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    businessName: '',
    businessType: 'B2B Wholesale & Logistics',
    firstSupplierName: '',
    firstSupplierEmail: '',
    firstProductSku: '',
    firstProductName: '',
    firstProductPrice: 150,
    paymentTermsDays: 30,
    enableAlerts: true,
  });

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const pwdScore = getPasswordStrength(password);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !businessName.trim() || !email.trim() || !password) {
      setError('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid business email.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the terms of service and privacy policy.');
      return;
    }

    setIsSubmitting(true);
    const result = await signup(fullName, businessName, email, password);
    setIsSubmitting(false);

    if (result.success) {
      if (result.requireVerification) {
        setVerificationRequired(true);
      } else {
        setOnboardingData((prev) => ({ ...prev, businessName }));
        setCurrentStep('profile');
      }
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  const handleFinishOnboarding = async () => {
    setIsSubmitting(true);
    await completeOnboarding(onboardingData);
    setIsSubmitting(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-midnight text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden bg-radial-gradient">
      {/* Background accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-electric/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-2 relative z-10">
        <Logo size="md" />
        <Link
          href="/login"
          className="text-xs sm:text-sm text-slate-textMuted hover:text-white font-medium transition-colors"
        >
          Already registered? <span className="text-electric font-semibold">Sign In</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-8 relative z-10">
        {/* Step 1: Initial Registration Form */}
        {currentStep === 'register' && !verificationRequired && (
          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-300">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-electric tracking-wider font-semibold block mb-1">
                Vendor Organization Registration
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Create Your Business Workspace
              </h1>
              <p className="text-xs sm:text-sm text-slate-textSecondary mt-1">
                Deploy your multi-rail vendor ledger and connected commerce command center.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sarah Chen"
                      className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                    Business Entity Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Nexus Dynamics Co."
                      className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-textSecondary mb-2">
                    Password (8+ chars)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-11 py-2.5 text-sm text-white placeholder-slate-600 outline-none font-mono"
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
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#050B18]/80 border border-electric/20 focus:border-electric focus:ring-1 focus:ring-electric rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password strength visualizer */}
              {password && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          pwdScore >= step
                            ? pwdScore <= 2
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-textMuted block">
                    Security: {pwdScore <= 2 ? 'Moderate' : 'Robust entropy confirmed'}
                  </span>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-textSecondary">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-[#050B18] border border-electric/30 text-electric focus:ring-electric/50"
                  />
                  <span>
                    I accept the{' '}
                    <span className="text-white underline">Enterprise Terms of Service</span> and{' '}
                    <span className="text-white underline">Privacy Policy</span>. Data is partitioned under organization-level Row Level Security.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,140,255,0.35)] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Provisioning Organization...</span>
                  </>
                ) : (
                  <>
                    <span>Create Vendor Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Email Verification State */}
        {verificationRequired && (
          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/30 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Business Inbox</h2>
            <p className="text-sm text-slate-textSecondary max-w-md mx-auto mb-6">
              We have dispatched a verification link to <strong className="text-white">{email}</strong>.
              Click the link in the message to activate your vendor organization session.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold"
            >
              Return to Login
            </Link>
          </div>
        )}

        {/* Onboarding Wizard Steps */}
        {currentStep !== 'register' && !verificationRequired && (
          <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-electric/30 animate-in fade-in duration-300">
            {/* Wizard Progress Steps Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono text-slate-textMuted uppercase mb-3">
                <span className="text-gold font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  ONBOARDING SETUP
                </span>
                <span>
                  STEP {
                    currentStep === 'profile' ? '1/5' :
                    currentStep === 'type' ? '2/5' :
                    currentStep === 'supplier' ? '3/5' :
                    currentStep === 'product' ? '4/5' : '5/5'
                  }
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-electric to-gold h-full transition-all duration-300"
                  style={{
                    width:
                      currentStep === 'profile' ? '20%' :
                      currentStep === 'type' ? '40%' :
                      currentStep === 'supplier' ? '60%' :
                      currentStep === 'product' ? '80%' : '100%',
                  }}
                />
              </div>
            </div>

            {/* Step 1: Business Profile confirmation */}
            {currentStep === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Confirm Business Profile</h2>
                  <p className="text-xs text-slate-textSecondary">
                    Verify legal trading name and entity registration information.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Legal Business Name
                    </label>
                    <input
                      type="text"
                      value={onboardingData.businessName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, businessName: e.target.value })}
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Base Operating Currency
                    </label>
                    <select
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                      defaultValue="USD"
                    >
                      <option value="INR">INR — Indian Rupee (₹)</option>
                      <option value="USD">USD — United States Dollar ($)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                      <option value="SGD">SGD — Singapore Dollar (S$)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('type')}
                    className="text-xs text-slate-textMuted hover:text-white"
                  >
                    Skip to business type
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('type')}
                    className="px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold flex items-center gap-2 hover:bg-electric-600"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Business Type selection */}
            {currentStep === 'type' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Select Business Model</h2>
                  <p className="text-xs text-slate-textSecondary">
                    Tunes inventory algorithms, reorder thresholds, and default credit terms.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'B2B Wholesale & Logistics', desc: 'Distributing parts, inventory batches & pallets' },
                    { title: 'Hardware Manufacturer', desc: 'OEM manufacturing with bills of materials' },
                    { title: 'Raw Materials & Supplies', desc: 'Bulk commodities, weight-based inventory' },
                    { title: 'Specialized Tech Vendor', desc: 'IT equipment, appliances, high-value SKUs' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setOnboardingData({ ...onboardingData, businessType: item.title })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        onboardingData.businessType === item.title
                          ? 'border-electric bg-electric/15 text-white'
                          : 'border-electric/20 bg-[#050B18]/60 text-slate-textSecondary hover:border-electric/40'
                      }`}
                    >
                      <div className="font-semibold text-sm text-white mb-1">{item.title}</div>
                      <div className="text-xs text-slate-textMuted">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('profile')}
                    className="text-xs text-slate-textMuted hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('supplier')}
                    className="px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold flex items-center gap-2 hover:bg-electric-600"
                  >
                    <span>Continue to Supplier</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Add First Supplier */}
            {currentStep === 'supplier' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Add First Key Supplier</h2>
                  <p className="text-xs text-slate-textSecondary">
                    Connect a vendor partner to test PO generation and payout scheduling.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Supplier / Counterparty Name
                    </label>
                    <input
                      type="text"
                      placeholder="Apex Logistics Corp"
                      value={onboardingData.firstSupplierName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, firstSupplierName: e.target.value })}
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Supplier Contact Email
                    </label>
                    <input
                      type="email"
                      placeholder="billing@apexlogistics.com"
                      value={onboardingData.firstSupplierEmail}
                      onChange={(e) => setOnboardingData({ ...onboardingData, firstSupplierEmail: e.target.value })}
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('product')}
                    className="text-xs text-slate-textMuted hover:text-white"
                  >
                    Skip this step
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('product')}
                    className="px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold flex items-center gap-2 hover:bg-electric-600"
                  >
                    <span>Continue to Product</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Add First Product */}
            {currentStep === 'product' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Add First Inventory SKU</h2>
                  <p className="text-xs text-slate-textSecondary">
                    Initialize threshold monitoring and automated reorder alerts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                        SKU Identifier
                      </label>
                      <input
                        type="text"
                        placeholder="SKU-NEO-100"
                        value={onboardingData.firstProductSku}
                        onChange={(e) => setOnboardingData({ ...onboardingData, firstProductSku: e.target.value })}
                        className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                        Unit Price ($ USD)
                      </label>
                      <input
                        type="number"
                        placeholder="245"
                        value={onboardingData.firstProductPrice}
                        onChange={(e) => setOnboardingData({ ...onboardingData, firstProductPrice: Number(e.target.value) })}
                        className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Optic Fiber Transceiver 100G"
                      value={onboardingData.firstProductName}
                      onChange={(e) => setOnboardingData({ ...onboardingData, firstProductName: e.target.value })}
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('terms')}
                    className="text-xs text-slate-textMuted hover:text-white"
                  >
                    Skip this step
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('terms')}
                    className="px-6 py-2.5 rounded-xl bg-electric text-white text-xs font-semibold flex items-center gap-2 hover:bg-electric-600"
                  >
                    <span>Continue to Terms</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Terms & Alerts Configuration */}
            {currentStep === 'terms' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Payment Terms & Telemetry</h2>
                  <p className="text-xs text-slate-textSecondary">
                    Set up default invoice settlement rules and liquidity alerts.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-textMuted mb-2">
                      Default Credit Terms
                    </label>
                    <select
                      value={onboardingData.paymentTermsDays}
                      onChange={(e) => setOnboardingData({ ...onboardingData, paymentTermsDays: Number(e.target.value) })}
                      className="w-full bg-[#050B18]/80 border border-electric/25 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    >
                      <option value={15}>Net-15 (Settlement in 15 days)</option>
                      <option value={30}>Net-30 (Standard 30 days)</option>
                      <option value={60}>Net-60 (Extended 60 days)</option>
                      <option value={90}>Net-90 (Quarterly cycle)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-[#050B18]/80 border border-electric/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">Proactive Liquidity Alerts</span>
                      <span className="text-[11px] text-slate-textMuted">Notify when cash runway or inventory dips below threshold</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={onboardingData.enableAlerts}
                      onChange={(e) => setOnboardingData({ ...onboardingData, enableAlerts: e.target.checked })}
                      className="w-5 h-5 rounded bg-midnight text-electric border-electric/30"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('product')}
                    className="text-xs text-slate-textMuted hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinishOnboarding}
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-electric to-electric-600 hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(79,140,255,0.4)]"
                  >
                    {isSubmitting ? (
                      <span>Launching Dashboard...</span>
                    ) : (
                      <>
                        <span>Enter Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="max-w-7xl mx-auto w-full text-center py-4 text-xs font-mono text-slate-500 relative z-10">
        Secured by Supabase PostgreSQL RLS • No administrative elevation allowed via public registration
      </div>
    </div>
  );
}
