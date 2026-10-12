import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { EcosystemSection } from '@/components/landing/EcosystemSection';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FooterAndCTA } from '@/components/landing/FooterAndCTA';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-midnight text-foreground selection:bg-electric/30 selection:text-white">
      {/* Floating Dynamic Navbar */}
      <Navbar />

      {/* Hero Section with Interactive 3D Motion Graphics */}
      <HeroSection />

      {/* The Problem Section */}
      <ProblemSection />

      {/* The VENDORA Ecosystem */}
      <EcosystemSection />

      {/* Interactive Product Showcase */}
      <ProductShowcase />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Security and Trust */}
      <SecuritySection />

      {/* Configurable Pricing */}
      <PricingSection />

      {/* Final CTA & Premium Footer */}
      <FooterAndCTA />
    </div>
  );
}
