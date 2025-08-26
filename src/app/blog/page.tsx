import { Metadata } from 'next';
import { BlogHero } from '@/components/blog/blog-hero';
import { BlogGrid } from '@/components/blog/blog-grid';

export const metadata: Metadata = {
  title: 'Photography Blog | Tips, Insights & Behind the Scenes',
  description:
    'Explore our photography blog for industry insights, behind-the-scenes content, and professional tips from Dubai\'s leading cinematic photography studio.',
  other: {
    keywords: 'photography blog Dubai, photography tips, behind the scenes photography, luxury photography insights, fashion photography blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}
