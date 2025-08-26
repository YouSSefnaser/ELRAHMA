'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
}

export function SafeImage({ 
  src, 
  fallback = '/images/placeholder.jpg', 
  alt,
  onError,
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (error: any) => {
    if (!hasError && imgSrc !== fallback) {
      setHasError(true);
      setImgSrc(fallback);
    }
    
    if (onError) {
      onError(error);
    }
  };

  // Ensure we're using local paths only
  const safeSrc = imgSrc.startsWith('http') ? fallback : imgSrc;

  return (
    <Image
      {...props}
      src={safeSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
