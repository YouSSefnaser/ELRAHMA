'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const reels = [
  {
    id: 1,
    title: 'أزياء الرحامة الفاخرة',
    category: 'أزياء',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:30',
  },
  {
    id: 2,
    title: 'قصة العلامة التجارية',
    category: 'علامة تجارية',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '1:45',
  },
  {
    id: 3,
    title: 'تصوير المنتجات السينمائي',
    category: 'منتجات',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '2:15',
  },
  {
    id: 4,
    title: 'توثيق الفعاليات',
    category: 'فعاليات',
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
    <section id="showreel" className="section-padding bg-bg-primary">
      <div className="container-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-cairo font-bold text-text-primary mb-6">
            معرض <span className="gradient-text">الفيديوهات</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            اكتشف أسلوبنا السينمائي في التصوير الفاخر من خلال
            هذه المجموعة المختارة من الفيديوهات التي تعرض خبرتنا في مختلف
            المجالات.
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
            <div className="relative aspect-video rounded-2xl overflow-hidden glass">
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
                  className="w-20 h-20 rounded-full bg-accent-gold/90 flex items-center justify-center hover:bg-accent-gold transition-colors hover-lift"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-bg-primary" />
                  ) : (
                    <Play className="h-8 w-8 text-bg-primary ml-1" />
                  )}
                </button>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass backdrop-blur-md rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {activeReel.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-gold font-medium">
                      {activeReel.category}
                    </span>
                    <span className="text-text-primary/70">
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
                  'w-full text-left p-4 rounded-xl transition-all hover-lift group',
                  activeReel.id === reel.id
                    ? 'glass border-accent-gold/50'
                    : 'glass hover:border-accent-gold/30'
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
                    <h4 className="font-semibold text-text-primary group-hover:text-accent-gold transition-colors truncate">
                      {reel.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-text-primary/60">
                        {reel.category}
                      </span>
                      <span className="text-sm text-text-primary/60">
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
