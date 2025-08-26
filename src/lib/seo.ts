import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

const DEFAULT_SEO = {
  title: 'El Rahama Photography | Cinematic Luxury Photography & Branding Dubai',
  description: 'Premier cinematic photography and branding studio in Dubai. Specializing in luxury fashion, product photography, and brand storytelling with editorial excellence.',
  keywords: [
    'Dubai photography',
    'luxury photography',
    'fashion photography',
    'product photography',
    'branding Dubai',
    'commercial photography',
    'editorial photography',
    'cinematic photography',
  ],
  image: '/images/gallery/fashion-1.jpg',
  url: 'https://elrahama.com',
};

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title 
    ? `${title} | El Rahama Photography`
    : DEFAULT_SEO.title;
  
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = [...DEFAULT_SEO.keywords, ...keywords];
  const seoImage = image || DEFAULT_SEO.image;
  const seoUrl = url || DEFAULT_SEO.url;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: author ? [{ name: author }] : [{ name: 'El Rahama Photography' }],
    creator: 'El Rahama Photography',
    publisher: 'El Rahama Photography',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(DEFAULT_SEO.url),
    alternates: {
      canonical: url || '/',
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: seoUrl,
      siteName: 'El Rahama Photography',
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title || 'El Rahama Photography',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@elrahama',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

// Generate JSON-LD structured data
export function generateJSONLD(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}

// Organization schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'El Rahama Photography',
  description: 'Premier cinematic photography and branding studio in Dubai',
  url: 'https://elrahama.com',
  logo: 'https://elrahama.com/logo.png',
  image: 'https://elrahama.com/og-image.jpg',
  telephone: '+971501234567',
  email: 'hello@elrahama.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dubai Design District, Building 6, Floor 3',
    addressLocality: 'Dubai',
    addressCountry: 'UAE',
  },
  sameAs: [
    'https://instagram.com/elrahama',
    'https://linkedin.com/company/elrahama',
  ],
  foundingDate: '2016',
  numberOfEmployees: '12',
  areaServed: {
    '@type': 'Place',
    name: 'Dubai, UAE',
  },
  serviceType: [
    'Fashion Photography',
    'Product Photography',
    'Brand Photography',
    'Event Photography',
    'Commercial Photography',
  ],
};

// Local business schema
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://elrahama.com',
  name: 'El Rahama Photography',
  description: 'Premier cinematic photography and branding studio in Dubai',
  url: 'https://elrahama.com',
  telephone: '+971501234567',
  email: 'hello@elrahama.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dubai Design District, Building 6, Floor 3',
    addressLocality: 'Dubai',
    addressCountry: 'UAE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.1972',
    longitude: '55.2744',
  },
  openingHours: [
    'Su-Th 09:00-19:00',
    'Fr-Sa 10:00-18:00',
  ],
  priceRange: '$$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
  },
};
