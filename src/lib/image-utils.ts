// Client-safe image utilities (no fs, no server-only imports)

import { getImagesByCategory, getRandomImage } from "./local-media";

// Pick a random item from an array
export function pickRandom<T>(arr: T[], seed?: number): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  if (typeof seed === 'number') {
    // deterministic pick
    const idx = Math.abs(seed) % arr.length;
    return arr[idx];
  }
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// Placeholder SVG generator with branding-friendly palette
export function getPlaceholderImage(category: string, width: number = 800, height: number = 600, text?: string): string {
  const colors = {
    products: { from: '#f59e0b', to: '#fbbf24', text: '#1f2937', label: 'تصوير منتجات احترافي' },
    fashion: { from: '#8b5cf6', to: '#a78bfa', text: '#1f2937', label: 'تصوير أزياء وبراندات' },
    restaurants: { from: '#ef4444', to: '#f87171', text: '#1f2937', label: 'تصوير مطاعم وطعام' },
    events: { from: '#06b6d4', to: '#67e8f9', text: '#1f2937', label: 'تصوير فعاليات وأحداث' },
    portraits: { from: '#10b981', to: '#6ee7b7', text: '#1f2937', label: 'تصوير بورتريه مهني' },
    team: { from: '#3b82f6', to: '#93c5fd', text: '#1f2937', label: 'فريق التصوير المحترف' },
    general: { from: '#6366f1', to: '#a5b4fc', text: '#1f2937', label: 'تصوير احترافي' },
  } as const;

  const colorScheme = (colors as any)[category] || colors.general;
  const displayText = text || colorScheme.label;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colorScheme.from}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${colorScheme.to}" stop-opacity="0.5"/>
        </linearGradient>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="${colorScheme.text}" opacity="0.1"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#dots)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="600"
            fill="${colorScheme.text}" text-anchor="middle" dy=".3em" opacity="0.8" filter="url(#glow)">${displayText}</text>
    </svg>
  `;

  // Avoid Buffer on client; use btoa for browser and Buffer on server
  const toBase64 = (str: string) => {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { Buffer } = require('buffer');
      return Buffer.from(str).toString('base64');
    }
    return typeof btoa === 'function' ? btoa(str) : str;
  };

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}



// Local image mapping for different categories
export const localImageMapping = {
  products: [
    '/images/gallery/Screenshot 2025-08-25 123018.png',
    '/images/gallery/Screenshot 2025-08-25 123031.png',
    '/images/gallery/Screenshot 2025-08-25 123112.png',
    '/images/gallery/Screenshot 2025-08-25 123139.png',
    '/images/gallery/Screenshot 2025-08-25 123150.png',
    '/images/gallery/Screenshot 2025-08-25 123201.png'
  ],
  fashion: [
    '/images/gallery/fashion-1.jpg',
    '/images/gallery/fashion-2.jpg',
    '/images/gallery/Screenshot 2025-08-25 122847.png',
    '/images/gallery/Screenshot 2025-08-25 122911.png',
    '/images/gallery/Screenshot 2025-08-25 122930.png',
    '/images/gallery/Screenshot 2025-08-25 123301.png'
  ],
  events: [
    '/images/gallery/Screenshot 2025-08-25 123217.png',
    '/images/gallery/Screenshot 2025-08-25 123225.png',
    '/images/gallery/Screenshot 2025-08-25 123245.png',
    '/images/gallery/Screenshot 2025-08-25 123343.png',
    '/images/gallery/Screenshot 2025-08-25 123322.png',
    '/images/gallery/Screenshot 2025-08-25 123401.png'
  ],
  team: [
    '/images/gallery/team-1.jpg',
    '/images/gallery/Screenshot 2025-08-25 123352.png',
    '/images/gallery/Screenshot 2025-08-25 123412.png',
    '/images/gallery/Screenshot 2025-08-25 123421.png',
    '/images/gallery/Screenshot 2025-08-25 123459.png',
    '/images/gallery/Screenshot 2025-08-25 123609.png'
  ],
  general: [
    '/images/gallery/fashion-1.jpg',
    '/images/gallery/fashion-2.jpg',
    '/images/gallery/team-1.jpg',
    '/images/gallery/Screenshot 2025-08-25 123139.png',
    '/images/gallery/Screenshot 2025-08-25 123150.png',
    '/images/gallery/Screenshot 2025-08-25 123343.png'
  ]
};

// دالة للحصول على صورة من المجموعة المحلية
export function getImageUrl(category: string, index: number = 0, width?: number, height?: number): string {
  const categoryImages = localImageMapping[category as keyof typeof localImageMapping] || localImageMapping.general;
  const imageIndex = Math.min(index, categoryImages.length - 1);
  return categoryImages[imageIndex] || categoryImages[0];
}

// دالة لتوليد مجموعة صور لمشروع
export function generateProjectImages(category: string, count: number = 6): string[] {
  const categoryImages = localImageMapping[category as keyof typeof localImageMapping] || localImageMapping.general;
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    const imageIndex = i % categoryImages.length;
    result.push(categoryImages[imageIndex]);
  }

  return result;
}

// دالة لتوليد صورة فريدة بناءً على النص
export function generateUniqueImage(text: string, category: string = 'general'): string {
  const hash = text.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const categoryImages = localImageMapping[category as keyof typeof localImageMapping] || localImageMapping.general;
  const index = Math.abs(hash) % categoryImages.length;
  return categoryImages[index];
}
