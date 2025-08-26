'use client';

import { localImageMapping } from './image-utils';

/**
 * دالة للحصول على صورة بديلة حسب الفئة
 * Client-side safe function to get a fallback image by category
 */
export function getFallbackImage(category: string = 'general', index: number = 0): string {
  const categoryImages = localImageMapping[category as keyof typeof localImageMapping] || localImageMapping.general;
  const randomIndex = index >= 0 ? index : Math.floor(Math.random() * categoryImages.length);
  const imageIndex = Math.min(randomIndex, categoryImages.length - 1);
  return categoryImages[imageIndex] || '/images/placeholder.jpg';
}

/**
 * دالة للحصول على صورة عشوائية من فئة معينة
 * Get a random image from a specific category
 */
export function getRandomImage(category: string = 'general'): string {
  return getFallbackImage(category, -1); // -1 signals to use random index
}

/**
 * دالة للتحقق مما إذا كان المسار صالحًا
 * Check if a path is a valid image path
 */
export function isValidImagePath(path: string): boolean {
  if (!path) return false;
  return (
    path.startsWith('/') || 
    path.startsWith('./') || 
    path.startsWith('../') || 
    path.startsWith('http://') || 
    path.startsWith('https://')
  );
}

/**
 * دالة للحصول على مسار الصورة المصغرة للفيديو
 * Get thumbnail path for a video
 */
export function getVideoThumbnail(videoPath: string): string {
  if (!videoPath) return '/images/placeholder.jpg';
  
  // Extract the base path without extension
  const basePath = videoPath.replace(/\.[^/.]+$/, '');
  
  // Try to construct a thumbnail path
  return `${basePath}.jpg`;
}