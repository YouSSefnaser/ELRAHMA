// Enforce server-only usage; if imported in a Client Component, Next.js throws at runtime
import 'server-only';

import fs from 'fs';
import path from 'path';

export interface MediaFile {
  src: string;
  filename: string;
  // Optional category used only on server/API for filtering; clients should not rely on it
  category?: string;
}

export interface LocalMediaManifest {
  images: MediaFile[];
  videos: MediaFile[];
}

// Runtime guard to prevent accidental client-side execution
function ensureServerSide() {
  if (typeof window !== 'undefined') {
    throw new Error('local-media.ts is server-only. Use it from Server Components or API Routes.');
  }
}

// Seeded shuffle function for consistent results
function seededShuffle<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor((Math.abs(hash) / Math.pow(2, 32)) * (i + 1));
    hash = (hash * 9301 + 49297) % 233280; // Linear congruential generator
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// Get daily seed for consistent shuffling
function getDailySeed(pathname?: string): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `${today}-${pathname || 'default'}`;
}

// Categorize images based on filename patterns (server-side only helper)
function categorizeImage(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('fashion') || lower.includes('model')) return 'fashion';
  if (lower.includes('product') || lower.includes('watch') || lower.includes('jewelry')) return 'products';
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('dining')) return 'restaurants';
  if (lower.includes('event') || lower.includes('conference') || lower.includes('party')) return 'events';
  if (lower.includes('team') || lower.includes('portrait') || lower.includes('headshot')) return 'team';
  if (lower.includes('brand') || lower.includes('logo') || lower.includes('corporate')) return 'branding';
  if (lower.includes('screenshot')) return 'gallery';
  return 'general';
}

// Categorize videos based on filename
function categorizeVideo(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('fashion')) return 'fashion';
  if (lower.includes('product')) return 'products';
  if (lower.includes('restaurant') || lower.includes('food')) return 'restaurants';
  if (lower.includes('event')) return 'events';
  if (lower.includes('brand')) return 'branding';
  return 'general';
}

// Recursively scan directory for media files
function scanDirectory(dirPath: string, baseUrl: string = ''): MediaFile[] {
  ensureServerSide();

  const files: MediaFile[] = [];
  try {
    if (!fs.existsSync(dirPath)) {
      return files;
    }
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = scanDirectory(fullPath, `${baseUrl}/${item}`);
        files.push(...subFiles);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
        const isVideo = ['.mp4', '.webm', '.mov', '.avi'].includes(ext);

        if (isImage || isVideo) {
          const src = `${baseUrl}/${item}`.replace(/\\/g, '/');
          const category = isImage ? categorizeImage(item) : categorizeVideo(item);
          files.push({ src, filename: item, category });
        }
      }
    }
  } catch (error) {
    console.warn(`Error scanning directory ${dirPath}:`, error);
  }
  return files;
}

// Main function to get local media manifest - SERVER ONLY
export function getLocalMedia(pathname?: string): LocalMediaManifest {
  ensureServerSide();
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const videosDir = path.join(publicDir, 'videos');

  // Scan for images and videos
  const allImages = scanDirectory(imagesDir, '/images');
  const allVideos = scanDirectory(videosDir, '/videos');

  // Shuffle with a daily seed for stability across server/client
  const seed = getDailySeed(pathname);
  const shuffledImages = seededShuffle(allImages, `${seed}-images`);
  const shuffledVideos = seededShuffle(allVideos, `${seed}-videos`);

  // Return arrays of objects with at least src and filename
  return {
    images: shuffledImages.map(({ src, filename }) => ({ src, filename })),
    videos: shuffledVideos.map(({ src, filename }) => ({ src, filename })),
  };
}

// Convenience helpers (server-only)
export function getImagesByCategory(category: string, count?: number): MediaFile[] {
  ensureServerSide();
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const all = scanDirectory(imagesDir, '/images');
  const filtered = all.filter((img) => categorizeImage(img.filename) === category);
  const mapped = filtered.map(({ src, filename }) => ({ src, filename }));
  return typeof count === 'number' ? mapped.slice(0, count) : mapped;
}

export function getVideosByCategory(category: string, count?: number): MediaFile[] {
  ensureServerSide();
  const publicDir = path.join(process.cwd(), 'public');
  const videosDir = path.join(publicDir, 'videos');
  const all = scanDirectory(videosDir, '/videos');
  const filtered = all.filter((v) => categorizeVideo(v.filename) === category);
  const mapped = filtered.map(({ src, filename }) => ({ src, filename }));
  return typeof count === 'number' ? mapped.slice(0, count) : mapped;
}

export function getRandomImage(category: string = 'general'): string {
  ensureServerSide();
  const images = getImagesByCategory(category, 1);
  if (images.length > 0) return images[0].src;
  const { images: all } = getLocalMedia();
  if (all.length > 0) return all[0].src;
  return '/images/placeholder.jpg';
}

export function getRandomVideo(category: string = 'general'): string {
  ensureServerSide();
  const videos = getVideosByCategory(category, 1);
  if (videos.length > 0) return videos[0].src;
  const { videos: all } = getLocalMedia();
  if (all.length > 0) return all[0].src;
  return '/videos/placeholder.mp4';
}
