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

-- =========================================================
-- EXTENDED MODULES: PROJECTS, LINE ITEMS, GRN, AUDIT
-- =========================================================

-- 8. Projects / Construction Sites
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    site_location TEXT,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'On Hold', 'Completed', 'Archived')),
    start_date DATE,
    end_date DATE,
    budget NUMERIC DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, COALESCE(code, name))
);

-- 9. PO Line Items (Two/Three-Way Reconciliation)
CREATE TABLE IF NOT EXISTS public.po_line_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    purchase_order_id UUID REFERENCES public.purchase_orders(id) ON DELETE CASCADE NOT NULL,
    inventory_item_id UUID REFERENCES public.inventory_items(id),
    sku TEXT,
    description TEXT NOT NULL,
    quantity NUMERIC NOT NULL CHECK (quantity >= 0),
    unit_of_measure TEXT DEFAULT 'EA',
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    tax_rate NUMERIC DEFAULT 0.00 CHECK (tax_rate >= 0 AND tax_rate <= 100),
    tax_amount NUMERIC GENERATED ALWAYS AS ((quantity * unit_price) * (tax_rate / 100.0)) STORED,
    line_total NUMERIC GENERATED ALWAYS AS ((quantity * unit_price) + ((quantity * unit_price) * (tax_rate / 100.0))) STORED,
    hsn_sac TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Goods Receipt Notes (GRN) - 3-Way Match Support
CREATE TABLE IF NOT EXISTS public.grn (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    grn_number TEXT NOT NULL,
    purchase_order_id UUID REFERENCES public.purchase_orders(id),
    company_id UUID REFERENCES public.companies(id),
    project_id UUID REFERENCES public.projects(id),
    received_date DATE DEFAULT CURRENT_DATE NOT NULL,
    inspected_by TEXT,
    status TEXT DEFAULT 'Received' CHECK (status IN ('Draft', 'Received', 'Partially Accepted', 'Accepted', 'Rejected', 'Closed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, grn_number)
);

CREATE TABLE IF NOT EXISTS public.grn_line_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    grn_id UUID REFERENCES public.grn(id) ON DELETE CASCADE NOT NULL,
    po_line_item_id UUID REFERENCES public.po_line_items(id),
    inventory_item_id UUID REFERENCES public.inventory_items(id),
    sku TEXT,
    description TEXT NOT NULL,
    ordered_qty NUMERIC DEFAULT 0.00,
    received_qty NUMERIC NOT NULL CHECK (received_qty >= 0),
    accepted_qty NUMERIC NOT NULL CHECK (accepted_qty >= 0 AND accepted_qty <= received_qty),
    rejected_qty NUMERIC GENERATED ALWAYS AS (received_qty - accepted_qty) STORED,
    unit_of_measure TEXT DEFAULT 'EA',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT accepted_le_received CHECK (accepted_qty <= received_qty)
);

-- 11. Inventory Movements (Audit Trail)
CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE CASCADE NOT NULL,
    movement_type TEXT NOT NULL CHECK (movement_type IN ('IN', 'OUT', 'ADJUST', 'TRANSFER_IN', 'TRANSFER_OUT', 'RETURN', 'WRITE_OFF')),
    quantity NUMERIC NOT NULL,
    reference_type TEXT,
    reference_id UUID,
    reference_number TEXT,
    unit_cost NUMERIC,
    before_qty INTEGER,
    after_qty INTEGER,
    notes TEXT,
    performed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Organization Audit Logs (Immutable)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    metadata JSONB DEFAULT '{}'::JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Extend existing tables with new fields
ALTER TABLE public.purchase_orders
    ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id),
    ADD COLUMN IF NOT EXISTS expected_delivery_date DATE,
    ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE public.invoices
    ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id),
    ADD COLUMN IF NOT EXISTS purchase_order_id UUID REFERENCES public.purchase_orders(id),
    ADD COLUMN IF NOT EXISTS amount_paid NUMERIC DEFAULT 0.00 CHECK (amount_paid >= 0),
    ADD COLUMN IF NOT EXISTS balance_due NUMERIC GENERATED ALWAYS AS (total_amount - amount_paid) STORED,
    ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD',
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS partially_paid_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.invoices DROP CONSTRAINT IF EXISTS invoices_status_check;
ALTER TABLE public.invoices ADD CONSTRAINT invoices_status_check CHECK (status IN ('Draft', 'Pending', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled', 'Void'));

ALTER TABLE public.payments
    ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id),
    ADD COLUMN IF NOT EXISTS invoice_id UUID REFERENCES public.invoices(id),
    ADD COLUMN IF NOT EXISTS purchase_order_id UUID REFERENCES public.purchase_orders(id),
    ADD COLUMN IF NOT EXISTS utr_number TEXT,
    ADD COLUMN IF NOT EXISTS bank_reference TEXT,
    ADD COLUMN IF NOT EXISTS failure_reason TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD',
    ADD COLUMN IF NOT EXISTS settled_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS processed_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS failed_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE public.payments ADD CONSTRAINT payments_status_check CHECK (status IN ('Draft', 'Initiated', 'Processing', 'In Escrow', 'Settled', 'Failed', 'Cancelled', 'Reversed'));

ALTER TABLE public.inventory_items
    ADD COLUMN IF NOT EXISTS last_cost NUMERIC DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS avg_cost NUMERIC DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS unit_of_measure TEXT DEFAULT 'EA',
    ADD COLUMN IF NOT EXISTS location TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

UPDATE public.inventory_items SET last_cost = unit_cost WHERE last_cost IS NULL OR last_cost = 0;
UPDATE public.inventory_items SET avg_cost = unit_cost WHERE avg_cost IS NULL OR avg_cost = 0;

-- Enable RLS on new tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.po_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grn ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grn_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Org members can read projects" ON public.projects FOR SELECT USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can insert projects" ON public.projects FOR INSERT WITH CHECK (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can update projects" ON public.projects FOR UPDATE USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can delete projects" ON public.projects FOR DELETE USING (organization_id = public.get_auth_organization_id());

-- PO Line Items policies
CREATE POLICY "Org members can read po line items" ON public.po_line_items FOR SELECT USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can manage po line items" ON public.po_line_items FOR ALL USING (organization_id = public.get_auth_organization_id()) WITH CHECK (organization_id = public.get_auth_organization_id());

-- GRN policies
CREATE POLICY "Org members can read grn" ON public.grn FOR SELECT USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can manage grn" ON public.grn FOR ALL USING (organization_id = public.get_auth_organization_id()) WITH CHECK (organization_id = public.get_auth_organization_id());

-- GRN Line Items policies
CREATE POLICY "Org members can read grn line items" ON public.grn_line_items FOR SELECT USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Org members can manage grn line items" ON public.grn_line_items FOR ALL USING (organization_id = public.get_auth_organization_id()) WITH CHECK (organization_id = public.get_auth_organization_id());

-- Inventory movements policies (read for all members; write restricted to inventory/admin/owner)
CREATE POLICY "Org members can read inventory movements" ON public.inventory_movements FOR SELECT USING (organization_id = public.get_auth_organization_id());
CREATE POLICY "Inventory managers/admin/owner can insert movements" ON public.inventory_movements FOR INSERT
    WITH CHECK (
        organization_id = public.get_auth_organization_id() AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin', 'inventory_manager'))
    );

-- Audit logs: read-only for finance/admin/owner
CREATE POLICY "Finance/admin/owner can read audit logs" ON public.audit_logs FOR SELECT
    USING (
        organization_id = public.get_auth_organization_id() AND
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('owner', 'admin', 'finance'))
    );
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT
    WITH CHECK (organization_id = public.get_auth_organization_id());

-- Trigger to auto-update projects.updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS 
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
 LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_inventory_items_updated_at ON public.inventory_items;
CREATE TRIGGER update_inventory_items_updated_at
    BEFORE UPDATE ON public.inventory_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
