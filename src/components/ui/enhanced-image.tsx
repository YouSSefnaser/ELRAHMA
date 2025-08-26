'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface EnhancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  category?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export function EnhancedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  category = 'general',
  priority = false,
  fill = false,
  sizes,
  quality = 90,
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fallback, setFallback] = useState<string>('/images/placeholder.jpg');

  // Fetch a random image from the API for fallback (client-safe)
  useEffect(() => {
    let mounted = true;
    const fetchFallback = async () => {
      try {
        const res = await fetch(`/api/media`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const images: Array<{ src: string; filename: string }> = Array.isArray(data?.images) ? data.images : [];
          if (mounted && images.length > 0) {
            const random = images[Math.floor(Math.random() * images.length)];
            setFallback(random.src);
          }
        }
      } catch (e) {
        // ignore, fallback stays the placeholder
      }
    };
    fetchFallback();
    return () => { mounted = false; };
  }, [category]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Main image */}
      <Image
        src={hasError ? fallback : src}
        alt={alt}
        width={fill ? undefined as unknown as number : width}
        height={fill ? undefined as unknown as number : height}
        sizes={sizes}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-all duration-500 ease-out',
          isLoading ? 'scale-110 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100',
          'object-cover'
        )}
        {...(fill ? { fill: true } : {})}
      />

      {/* Overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

// Shimmer animation for loading state - moved to CSS file to avoid hydration issues
