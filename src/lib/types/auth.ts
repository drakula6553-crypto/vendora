export type UserRole = 'owner' | 'admin' | 'finance' | 'inventory_manager' | 'read_only';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  currency: string;
  taxId?: string;
  country?: string;
  plan: 'starter' | 'growth' | 'business';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  organizationId: string;
  organization?: Organization;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  organization: Organization | null;
  role: UserRole;
  isAuthenticated: boolean;
}

export interface OnboardingData {
  businessName: string;
  businessType: string;
  firstSupplierName?: string;
  firstSupplierEmail?: string;
  firstProductSku?: string;
  firstProductName?: string;
  firstProductPrice?: number;
  paymentTermsDays?: number;
  enableAlerts?: boolean;
}
