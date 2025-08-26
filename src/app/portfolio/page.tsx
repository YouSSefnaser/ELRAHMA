import { Metadata } from 'next';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { PortfolioHero } from '@/components/portfolio/portfolio-hero';

export const metadata: Metadata = {
  title: 'Portfolio | Cinematic Photography & Branding Dubai',
  description:
    'Explore our diverse portfolio of luxury photography projects in Dubai. Fashion, product, branding, and event photography with editorial excellence.',
  other: {
    keywords: 'photography portfolio Dubai, luxury photography, fashion photography portfolio, product photography Dubai, branding photography',
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
    </>
  );
}
