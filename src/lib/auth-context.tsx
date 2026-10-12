'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProfile, Organization, UserRole, OnboardingData } from './types/auth';
import { getSupabaseClient, isSupabaseConfigured } from './supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  organization: Organization | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, businessName: string, email: string, password: string) => Promise<{ success: boolean; error?: string; requireVerification?: boolean }>;
  logout: () => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  switchRole: (role: UserRole) => void;
  quickDemoLogin: (role?: UserRole) => Promise<void>;
}

const DEFAULT_ORG: Organization = {
  id: 'org_vendora_prime',
  name: 'Nexus Dynamics Supply Co.',
  slug: 'nexus-dynamics',
  businessType: 'B2B Wholesale & Hardware Logistics',
  currency: 'USD',
  taxId: 'US-948102941',
  country: 'United States',
  plan: 'growth',
  createdAt: '2024-01-15T08:00:00Z',
};

const DEFAULT_USER: UserProfile = {
  id: 'usr_sarah_chen',
  email: 'sarah.chen@nexusdynamics.io',
  fullName: 'Sarah Chen',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'owner',
  organizationId: 'org_vendora_prime',
  organization: DEFAULT_ORG,
  onboardingCompleted: true,
  createdAt: '2024-01-15T08:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [role, setRole] = useState<UserRole>('owner');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state
  useEffect(() => {
    const supabase = getSupabaseClient();

    if (isSupabaseConfigured && supabase) {
      // Check real Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Vendor Admin',
            role: (session.user.user_metadata?.role as UserRole) || 'owner',
            organizationId: session.user.user_metadata?.org_id || 'org_default',
            onboardingCompleted: Boolean(session.user.user_metadata?.onboarding_completed),
            createdAt: session.user.created_at,
          };
          setUser(profile);
          setRole(profile.role);
          setOrganization({
            id: profile.organizationId,
            name: session.user.user_metadata?.business_name || 'My Vendor Business',
            slug: 'my-business',
            businessType: 'General Vendor',
            currency: 'USD',
            plan: 'growth',
            createdAt: session.user.created_at,
          });
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Vendor Admin',
            role: (session.user.user_metadata?.role as UserRole) || 'owner',
            organizationId: session.user.user_metadata?.org_id || 'org_default',
            onboardingCompleted: Boolean(session.user.user_metadata?.onboarding_completed),
            createdAt: session.user.created_at,
          };
          setUser(profile);
          setRole(profile.role);
        } else {
          setUser(null);
          setOrganization(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local session check
      try {
        const storedAuth = localStorage.getItem('vendora_auth_session');
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth);
          setUser(parsed.user);
          setOrganization(parsed.organization);
          setRole(parsed.user?.role || 'owner');
        }
      } catch (e) {
        console.error('Failed to load local auth session:', e);
      }
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean = true) => {
    setIsLoading(true);
    const supabase = getSupabaseClient();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Vendor Admin',
            role: (data.user.user_metadata?.role as UserRole) || 'owner',
            organizationId: data.user.user_metadata?.org_id || 'org_default',
            onboardingCompleted: Boolean(data.user.user_metadata?.onboarding_completed ?? true),
            createdAt: data.user.created_at,
          };
          const org: Organization = {
            id: profile.organizationId,
            name: data.user.user_metadata?.business_name || 'Nexus Dynamics Co.',
            slug: 'nexus-dynamics',
            businessType: 'B2B Wholesale & Logistics',
            currency: 'USD',
            plan: 'growth',
            createdAt: data.user.created_at,
          };

          setUser(profile);
          setOrganization(org);
          setRole(profile.role);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Authentication failed' };
      }
    }

    // High fidelity offline/development authentication mode
    await new Promise((r) => setTimeout(r, 600));

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Email and password are required.' };
    }

    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Invalid password. Must be at least 6 characters.' };
    }

    const customUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };

    setUser(customUser);
    setOrganization(DEFAULT_ORG);
    setRole(customUser.role);

    if (rememberMe) {
      localStorage.setItem(
        'vendora_auth_session',
        JSON.stringify({ user: customUser, organization: DEFAULT_ORG })
      );
    }

    setIsLoading(false);
    return { success: true };
  }, []);

  const signup = useCallback(
    async (fullName: string, businessName: string, email: string, password: string) => {
      setIsLoading(true);
      const supabase = getSupabaseClient();

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                business_name: businessName,
                role: 'owner',
                onboarding_completed: false,
              },
            },
          });

          if (error) {
            setIsLoading(false);
            return { success: false, error: error.message };
          }

          setIsLoading(false);
          return {
            success: true,
            requireVerification: !data.session,
          };
        } catch (err: any) {
          setIsLoading(false);
          return { success: false, error: err?.message || 'Registration failed' };
        }
      }

      // Offline/demo register mode
      await new Promise((r) => setTimeout(r, 700));

      const newOrg: Organization = {
        id: `org_${Date.now()}`,
        name: businessName,
        slug: businessName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        businessType: 'Wholesale Supplier',
        currency: 'USD',
        plan: 'starter',
        createdAt: new Date().toISOString(),
      };

      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        fullName,
        role: 'owner',
        organizationId: newOrg.id,
        organization: newOrg,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      setOrganization(newOrg);
      setRole('owner');

      localStorage.setItem(
        'vendora_auth_session',
        JSON.stringify({ user: newUser, organization: newOrg })
      );

      setIsLoading(false);
      return { success: true };
    },
    []
  );

  const logout = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('vendora_auth_session');
    setUser(null);
    setOrganization(null);
    setRole('owner');
  }, []);

  const resetPasswordRequest = useCallback(async (email: string) => {
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        console.warn('Password reset request info:', error.message);
      }
    } else {
      await new Promise((r) => setTimeout(r, 600));
    }
    // Neutral confirmation message without disclosing account existence
    return {
      success: true,
      message: 'If an account matches this email, a secure password reset link has been dispatched.',
    };
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    await new Promise((r) => setTimeout(r, 500));
    return { success: true };
  }, []);

  const completeOnboarding = useCallback(async (data: OnboardingData) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      onboardingCompleted: true,
    };
    const updatedOrg: Organization = {
      ...(organization || DEFAULT_ORG),
      name: data.businessName || organization?.name || 'VENDORA Partner',
      businessType: data.businessType || 'General Vendor',
    };

    setUser(updatedUser);
    setOrganization(updatedOrg);
    localStorage.setItem(
      'vendora_auth_session',
      JSON.stringify({ user: updatedUser, organization: updatedOrg })
    );

    const supabase = getSupabaseClient();
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.updateUser({
        data: {
          onboarding_completed: true,
          business_name: updatedOrg.name,
          business_type: updatedOrg.businessType,
        },
      });
    }
  }, [user, organization]);

  const switchRole = useCallback((newRole: UserRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    setRole(newRole);
    if (organization) {
      localStorage.setItem('vendora_auth_session', JSON.stringify({ user: updated, organization }));
    }
  }, [user, organization]);

  const quickDemoLogin = useCallback(async (demoRole: UserRole = 'owner') => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const demoUser = { ...DEFAULT_USER, role: demoRole };
    setUser(demoUser);
    setOrganization(DEFAULT_ORG);
    setRole(demoRole);
    localStorage.setItem(
      'vendora_auth_session',
      JSON.stringify({ user: demoUser, organization: DEFAULT_ORG })
    );
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        organization,
        role,
        isAuthenticated: Boolean(user),
        isLoading,
        isConfigured: isSupabaseConfigured,
        login,
        signup,
        logout,
        resetPasswordRequest,
        updatePassword,
        completeOnboarding,
        switchRole,
        quickDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
