'use client';

import { motion } from 'framer-motion';
import { SafeImage } from './safe-image';
import { Play, Pause } from 'lucide-react';
import { useState, useRef } from 'react';

interface MediaFile {
  src: string;
  filename: string;
  category?: string;
}

interface MediaGalleryProps {
  images: MediaFile[];
  videos: MediaFile[];
  className?: string;
  showVideos?: boolean;
  maxImages?: number;
  maxVideos?: number;
  gridCols?: number;
}

export function MediaGallery({
  images,
  videos,
  className = '',
  showVideos = true,
  maxImages,
  maxVideos,
  gridCols = 3
}: MediaGalleryProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const displayImages = maxImages ? images.slice(0, maxImages) : images;
  const displayVideos = maxVideos ? videos.slice(0, maxVideos) : videos;

  const handleVideoPlay = (videoSrc: string) => {
    // Pause all other videos
    Object.entries(videoRefs.current).forEach(([src, video]) => {
      if (src !== videoSrc && video) {
        video.pause();
      }
    });
    
    setPlayingVideo(videoSrc);
  };

  const handleVideoPause = () => {
    setPlayingVideo(null);
  };

  const toggleVideo = (videoSrc: string) => {
    const video = videoRefs.current[videoSrc];
    if (video) {
      if (video.paused) {
        video.play();
        handleVideoPlay(videoSrc);
      } else {
        video.pause();
        handleVideoPause();
      }
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Images Grid */}
      {displayImages.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-text-primary">
            Gallery ({displayImages.length} images)
          </h3>
          <div
            className={`grid gap-4 media-grid-${gridCols}`}
          >
            {displayImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <SafeImage
                  src={image.src}
                  alt={image.filename}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${100/gridCols}vw`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs truncate">{image.filename}</p>
                    {image.category && (
                      <p className="text-white/70 text-xs">{image.category}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {showVideos && displayVideos.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-text-primary">
            Videos ({displayVideos.length} videos)
          </h3>
          <div
            className={`grid gap-4 media-grid-${Math.min(gridCols, 2)}`}
          >
            {displayVideos.map((video, index) => (
              <motion.div
                key={video.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (displayImages.length + index) * 0.1 }}
                className="relative aspect-video overflow-hidden rounded-lg group"
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[video.src] = el;
                  }}
                  src={video.src}
                  className="w-full h-full object-cover"
                  onPlay={() => handleVideoPlay(video.src)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoPause}
                  preload="metadata"
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                  <button
                    onClick={() => toggleVideo(video.src)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {playingVideo === video.src ? (
                        <Pause className="h-6 w-6 text-white" />
                      ) : (
                        <Play className="h-6 w-6 text-white ml-1" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/50 backdrop-blur-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs truncate">{video.filename}</p>
                    {video.category && (
                      <p className="text-white/70 text-xs">{video.category}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {displayImages.length === 0 && displayVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-primary/60">No media files found</p>
        </div>
      )}
    </div>
  );
}
