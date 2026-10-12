# VENDORA â€” Autonomous Multi-Rail Commerce OS

**Your Entire Business. One Intelligent Platform.**

VENDORA is an enterprise-grade vendor management platform and financial orchestration terminal featuring real-time 3D motion graphics, multi-rail liquidity settlement, smart inventory threshold monitoring, two-way purchase order reconciliation, and multi-tenant Supabase authentication.

---

## ðŸ’Ž Visual Identity & Design System

- **Deep Midnight Navy**: `#050B18` (Primary background)
- **Dark Blue**: `#0A192F` (Elevated surface panels)
- **Electric Blue**: `#4F8CFF` (Primary actions, telemetric glow)
- **Premium Gold**: `#D4AF37` (Accent nodes, executive indicators)
- **Secondary Slate**: `#8892B0` / `#A8B2D1` (Muted labels, data metadata)
- **Glassmorphism**: Fine frosted panels (`backdrop-blur-xl border border-electric/20`) with atmospheric point lighting and animated grid backgrounds.

---

## ðŸ›¸ 3D Motion Graphics Engine

Built using **Three.js**, **React Three Fiber (R3F)**, and **Drei**:
- **Central Luminous Core (`BusinessCore`)**: Floating glowing geometric icosahedron with golden metallic wireframe and internal electric pulse representing the synchronized business network.
- **Transaction Paths (`TransactionPaths`)**: Spline cubic bezier curves with 75+ animated particles traveling along ledger routes between company nodes.
- **Floating 3D Telemetry Panels (`FloatingPanels3D`)**: Live spatial glass cards displaying real-time settlement volume, smart inventory health, supplier nodes, and PO reconciliation rates.
- **Orbital Data Rings & Metallic Geometry (`MetallicAccents`)**: Rotating rings, metallic toruses, octahedrons, and tetrahedrons with physical roughness and metallic reflections.
- **Parallax Camera Response**: Subtly responds to cursor movement and scroll position with smooth lerp damping.
- **Lightweight Hardware Fallback**: Automatic WebGL detection and CSS-animated fallback for low-power or non-WebGL devices.

---

## ðŸ”’ Authentication & Multi-Tenant Security

### 1. Supabase Authentication
- Full integration with Supabase Auth (`@supabase/supabase-js`, `@supabase/ssr`).
- Real token-based session handling, password reset dispatch with neutral confirmation messaging, and password update verification.
- Zero-downtime offline dev fallback: Allows instant review and testing of all flows even before connecting external Supabase credentials.

### 2. Multi-Tenant Row Level Security (RLS)
The database architecture (`supabase-schema.sql`) enforces PostgreSQL Row Level Security:
- Complete isolation between corporate entities (`organization_id`).
- Cryptographic checks on user identities preventing cross-organization leakage.
- Strict security preventing public registrations from claiming administrative privileges.

### 3. Role-Based Access Control (RBAC)
Supported organizational roles:
- **`owner`**: Complete organization authority, wire approvals, and billing management.
- **`admin`**: Workspace configuration, member invitations, and PO approvals.
- **`finance`**: Payout releases, bank reconciliation, invoices, and cash flow exports.
- **`inventory_manager`**: Catalog creation, warehouse stock adjustments, reorder alerts.
- **`read_only`**: View-only ledger auditing with disabled mutation controls.

---

## ðŸ§­ Application Routes

### Public Landing & Marketing
- `/`: Cinematic landing page with floating dynamic navbar, hero 3D motion graphics, fragmented-vs-unified problem section, 6-module ecosystem cards with 3D tilt, interactive product showcase with 5 live demo workspaces, 3-step deployment workflow, security architecture breakdown, configurable pricing tiers, and premium footer.

### Authentication Flow
- `/login`: Vendor login featuring split-screen 3D orbital mesh, email/password validation, show/hide toggle, remember-me persistence, reviewer quick-access role switcher, and `returnTo` redirect preservation.
- `/signup`: Registration with password entropy meter and 5-step onboarding wizard (profile confirmation, business model, first supplier, first SKU, payment terms).
- `/forgot-password`: Password reset request with neutral privacy-preserving confirmation.
- `/reset-password`: Cryptographic session validator and new passphrase commitment.

### Protected Vendor Workspaces
- `/dashboard`: Executive KPI command center, pending dual-authorization payout queue, and operational telemetry.
- `/companies`: Verified supplier and customer directory with tax IDs and credit terms.
- `/inventory`: Smart catalog with threshold triggers, warehouse allocations, and add SKU modal.
- `/purchase-orders`: Electronic PO registry with two-way matching checks and generation modal.
- `/invoices`: Invoices payable and receivable with mark-as-paid and recording modal.
- `/payments`: Multi-rail settlement ledger (FedNow, SEPA, ACH, Wire, Stripe B2B) and payout modal.
- `/payment-scheduler`: 30-day outflow timeline horizon, obligation calendar, and auto-release toggles.
- `/cash-flow`: 90-day predictive liquidity curves, burn rate indicators, and scenario simulators.
- `/documents`: Role-governed contract and compliance vault with time-limited signed download tokens.
- `/reports`: Audited financial statements, tax packages, and CSV/PDF export generation.
- `/settings`: Legal entity profile, team members RBAC assignments, and settlement rail status.

---

## ðŸš€ Running the Project

### Development Server
```bash
npm run dev
```

### Production Build & Serve
```bash
npm run build
npm start
```
The server runs locally at [http://localhost:3000](http://localhost:3000).

---

## âš™ï¸ Configuration

Copy `.env.example` to `.env.local` to connect your live Supabase project:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```
Run `supabase-schema.sql` in the Supabase SQL Editor to initialize all tables, foreign keys, and Row Level Security policies.
