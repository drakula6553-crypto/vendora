export interface PricingPlan {
  id: 'starter' | 'growth' | 'business';
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  limits: {
    monthlyInvoices: string;
    suppliers: string;
    teamMembers: string;
    warehouses: string;
    apiAccess: boolean;
  };
  features: string[];
  ctaText: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Yard',
    tagline: 'Ideal for independent material dealers and regional stockyards supplying local developers.',
    monthlyPrice: 3999,
    annualPrice: 2999,
    limits: {
      monthlyInvoices: 'Up to 250 challans & RA bills / mo',
      suppliers: 'Up to 25 builders & mills',
      teamMembers: '2 active yard seats',
      warehouses: '1 stockyard location',
      apiAccess: false,
    },
    features: [
      'Raw material stockyard tracking with reorder thresholds',
      'Builder and mill contact directory with GST verification',
      'Payment scheduling for mills & dumper fleet logistics',
      'Standard PO generation & weighbridge matching',
      '90-day cash flow timeline view in Indian Rupees (₹)',
      'Community & email support',
    ],
    ctaText: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Builder Growth',
    tagline: 'Built for high-volume raw material suppliers fulfilling multiple builder construction sites.',
    monthlyPrice: 9999,
    annualPrice: 7999,
    popular: true,
    limits: {
      monthlyInvoices: 'Up to 2,500 challans & RA bills / mo',
      suppliers: 'Unlimited builders & steel mills',
      teamMembers: '10 team seats with RBAC',
      warehouses: '5 stockyards & batching plants',
      apiAccess: true,
    },
    features: [
      'Everything in Starter Yard, plus:',
      'Multi-rail RTGS / NEFT / IMPS corporate payout authorization',
      'Role-based permissions (Finance, Yard Manager, Dispatch)',
      'Automated weighbridge slip OCR & line-item reconciliation',
      'Real-time cash runway forecasting for builder milestones',
      'Batch payment releases for dumper fleets & steel rakes',
      'Priority 24/7 dedicated support',
    ],
    ctaText: 'Deploy Builder Growth',
  },
  {
    id: 'business',
    name: 'Enterprise Infra',
    tagline: 'Enterprise orchestration for multi-city building material syndicates and RMC networks.',
    monthlyPrice: 24999,
    annualPrice: 19999,
    limits: {
      monthlyInvoices: 'Unlimited bills & weighbridge dispatches',
      suppliers: 'Unlimited builders, quarries & cement plants',
      teamMembers: 'Unlimited seats',
      warehouses: 'Multi-region enterprise hubs',
      apiAccess: true,
    },
    features: [
      'Everything in Builder Growth, plus:',
      'Multi-entity quarry & batch plant subsidiary consolidation',
      'Custom approval workflows & dual-authorization treasury',
      'Full REST & Webhook API integrations with ERP / SAP',
      'Dedicated account manager & custom SLA',
      'Cryptographic E-Way bill & mill test certificate vault',
      'Direct scheduled commercial bank host-to-host sync',
    ],
    ctaText: 'Scale with Enterprise',
  },
];

export const PRICING_NOTE = 'Note: Pricing tiers and limits are configurable per organizational contract. Starter, Growth, and Business rates are standard baseline plans.';
