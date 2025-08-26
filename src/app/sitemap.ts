import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elrahama.com';
  
  // Static pages
  const staticPages = [
    '',
    '/portfolio',
    '/videos',
    '/services',
    '/about',
    '/blog',
    '/contact',
  ];

  // Dynamic portfolio items (in real app, fetch from CMS/API)
  const portfolioItems = [
    'luxury-watch-campaign',
    'fashion-editorial-shoot',
    'corporate-branding',
    'gala-event-coverage',
  ];

  // Dynamic blog posts (in real app, fetch from CMS/API)
  const blogPosts = [
    'cinematic-photography-techniques',
    'luxury-brand-photography-tips',
    'behind-scenes-fashion-shoot',
  ];

  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'daily' as const : 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    
    // Portfolio items
    ...portfolioItems.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    
    // Blog posts
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return sitemap;
}
