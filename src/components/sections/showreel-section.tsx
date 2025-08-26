'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const reels = [
  {
    id: 1,
    title: 'Luxury Fashion Collection',
    category: 'Fashion',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:30',
  },
  {
    id: 2,
    title: 'Brand Story Documentary',
    category: 'Branding',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '1:45',
  },
  {
    id: 3,
    title: 'Cinematic Product Photography',
    category: 'Products',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '2:15',
  },
  {
    id: 4,
    title: 'Event Documentation',
    category: 'Events',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '3:00',
  },
];

export function ShowreelSection() {
  const [activeReel, setActiveReel] = useState(reels[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReelChange = (reel: typeof reels[0]) => {
    setActiveReel(reel);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="showreel" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Featured <span className="text-yellow-500">Showreel</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our cinematic style in luxury photography through
            this curated collection of videos showcasing our expertise across
            various fields.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={activeReel.thumbnail}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={activeReel.video} type="video/mp4" />
              </video>

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors transform hover:scale-105 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-gray-900" />
                  ) : (
                    <Play className="h-8 w-8 text-gray-900 ml-1" />
                  )}
                </button>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {activeReel.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-600 font-semibold">
                      {activeReel.category}
                    </span>
                    <span className="text-gray-600">
                      {activeReel.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reel Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {reels.map((reel, index) => (
              <motion.button
                key={reel.id}
                onClick={() => handleReelChange(reel)}
                className={cn(
                  'w-full text-left p-4 rounded-xl transition-all transform hover:scale-105 group',
                  activeReel.id === reel.id
                    ? 'bg-yellow-50 border-2 border-yellow-400 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors truncate">
                      {reel.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">
                        {reel.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {reel.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}