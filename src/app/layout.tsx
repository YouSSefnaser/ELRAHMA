import type { Metadata } from 'next';
import { Cairo, Inter, Outfit } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { FloatingCTA } from '@/components/layout/floating-cta';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Providers } from '@/components/providers/providers';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'El Rahama Photography | Cinematic Luxury Photography & Branding Dubai',
    template: '%s | El Rahama Photography',
  },
  description:
    'Premier cinematic photography and branding studio in Dubai. Specializing in luxury fashion, product photography, and brand storytelling with editorial excellence.',
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
  authors: [{ name: 'El Rahama Photography' }],
  creator: 'El Rahama Photography',
  publisher: 'El Rahama Photography',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elrahama.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elrahama.com',
    siteName: 'El Rahama Photography',
    title: 'El Rahama Photography | Cinematic Luxury Photography & Branding Dubai',
    description:
      'Premier cinematic photography and branding studio in Dubai. Specializing in luxury fashion, product photography, and brand storytelling.',
    images: [
      {
        url: '/images/gallery/fashion-1.jpg',
        width: 1200,
        height: 630,
        alt: 'El Rahama Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Rahama Photography | Cinematic Luxury Photography Dubai',
    description:
      'Premier cinematic photography and branding studio in Dubai.',
    images: ['/images/gallery/fashion-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-inter antialiased',
          cairo.variable,
          inter.variable,
          outfit.variable
        )}
        suppressHydrationWarning
      >
        <Providers>
          <QueryProvider>
            <SmoothScrollProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
                <FloatingCTA />
              </div>
            </SmoothScrollProvider>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
