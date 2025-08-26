import { Metadata } from 'next';
import { ServicesHero } from '@/components/services/services-hero';
import { ServicesGrid } from '@/components/services/services-grid';
import { ProcessSection } from '@/components/services/process-section';
import { PricingSection } from '@/components/services/pricing-section';

export const metadata: Metadata = {
  title: 'Photography Services | Luxury Branding & Editorial Dubai',
  description:
    'Professional photography services in Dubai: Fashion, Product, Branding, Events, and Retouching. Cinematic approach with editorial excellence.',
  other: {
    keywords: 'photography services Dubai, fashion photography Dubai, product photography, branding photography, event photography Dubai, retouching services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <PricingSection />
    </>
  );
}
