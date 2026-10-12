-- =========================================================
-- VENDORA: MULTI-TENANT ROW LEVEL SECURITY (RLS) SCHEMA
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    business_type TEXT DEFAULT 'B2B Wholesale & Logistics',
    currency TEXT DEFAULT 'USD',
    tax_id TEXT,
    country TEXT DEFAULT 'US',
    plan TEXT DEFAULT 'growth' CHECK (plan IN ('starter', 'growth', 'business')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Profiles & Organization Membership
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'finance', 'inventory_manager', 'read_only');

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'owner' NOT NULL,
    onboarding_completed BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Companies / Suppliers / Customers Table
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    entity_type TEXT DEFAULT 'Supplier' CHECK (entity_type IN ('Supplier', 'Customer', 'Logistics')),
    email TEXT,
    phone TEXT,
    payment_terms TEXT DEFAULT 'Net-30',
    open_balance NUMERIC DEFAULT 0.00,
    kyc_status TEXT DEFAULT 'Verified' CHECK (kyc_status IN ('Verified', 'Pending')),
    tax_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Inventory Catalog Table
CREATE TABLE IF NOT EXISTS public.inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    warehouse TEXT DEFAULT 'Central Hub Austin',
    on_hand INTEGER DEFAULT 0 NOT NULL,
    min_threshold INTEGER DEFAULT 20 NOT NULL,
    unit_cost NUMERIC DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, sku)
);

-- 5. Purchase Orders Table
CREATE TABLE IF NOT EXISTS public.purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    po_number TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id),
    total_amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Sent' CHECK (status IN ('Draft', 'Sent', 'Acknowledged', 'Fulfilled')),
    issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
    delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    invoice_number TEXT NOT NULL,
    direction TEXT DEFAULT 'Payable' CHECK (direction IN ('Payable', 'Receivable')),
    company_id UUID REFERENCES public.companies(id),
    total_amount NUMERIC NOT NULL,
    due_date DATE NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid', 'Overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Payments Ledger Table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    tx_hash TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id),
    rail TEXT NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('Outbound Payout', 'Inbound Settlement')),
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Settled' CHECK (status IN ('Settled', 'In Escrow', 'Processing')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ACROSS ALL TABLES
-- =========================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper function: Get authenticated user's organization ID
CREATE OR REPLACE FUNCTION public.get_auth_organization_id()
RETURNS UUID AS $$
    SELECT organization_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Organization Policies: Members can read their organization
CREATE POLICY "Users can read own organization"
    ON public.organizations FOR SELECT
    USING (id = public.get_auth_organization_id());

-- Profile Policies: Members can read profiles in same organization
CREATE POLICY "Users can read profiles in same org"
    ON public.profiles FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (id = auth.uid());

-- Companies Policies
CREATE POLICY "Org members can read companies"
    ON public.companies FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can insert companies"
    ON public.companies FOR INSERT
    WITH CHECK (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can update companies"
    ON public.companies FOR UPDATE
    USING (organization_id = public.get_auth_organization_id());

-- Inventory Policies
CREATE POLICY "Org members can read inventory"
    ON public.inventory_items FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can insert inventory"
    ON public.inventory_items FOR INSERT
    WITH CHECK (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can update inventory"
    ON public.inventory_items FOR UPDATE
    USING (organization_id = public.get_auth_organization_id());

-- Purchase Orders Policies
CREATE POLICY "Org members can read POs"
    ON public.purchase_orders FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can manage POs"
    ON public.purchase_orders FOR ALL
    USING (organization_id = public.get_auth_organization_id());

-- Invoices Policies
CREATE POLICY "Org members can read invoices"
    ON public.invoices FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Org members can manage invoices"
    ON public.invoices FOR ALL
    USING (organization_id = public.get_auth_organization_id());

-- Payments Policies
CREATE POLICY "Org members can read payments"
    ON public.payments FOR SELECT
    USING (organization_id = public.get_auth_organization_id());

CREATE POLICY "Finance and Owners can execute payments"
    ON public.payments FOR INSERT
    WITH CHECK (
        organization_id = public.get_auth_organization_id() AND
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'admin', 'finance')
        )
    );
