import { PortfolioSection } from '@/components/sections/portfolio-section';
import { PortfolioMasonry } from '@/components/sections/portfolio-masonry';
import { CaseStudiesSection } from '@/components/sections/case-studies-section';
import { BeforeAfterSection } from '@/components/sections/before-after-section';
import { BehindScenesSection } from '@/components/sections/behind-scenes-section';
import { ClientsSection } from '@/components/sections/clients-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cinema-dark">
      <PortfolioMasonry />
      <CaseStudiesSection />
      <BeforeAfterSection />
      <BehindScenesSection />
      <ClientsSection />
      <CTASection />
    </main>
  );
}
