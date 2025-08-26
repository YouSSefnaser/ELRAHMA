export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'branding' | 'fashion' | 'products' | 'events' | 'restaurants';
  description: string;
  image: string;
  images: string[];
  video?: string;
  client: string;
  year: number;
  tags: string[];
  featured: boolean;
  objective?: string;
  approach?: string;
  results?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  serviceImage: string; // Changed from 'image' to 'serviceImage'
  features: string[];
  startingPrice?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  category: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  readTime: number;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  honeypot?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  category: string;
  image?: string;
}

export interface VideoReel {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
}

export interface BeforeAfter {
  id: string;
  title: string;
  before: string;
  after: string;
  description: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}
