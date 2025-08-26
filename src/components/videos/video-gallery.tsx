'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const videoCategories = ['الكل', 'أزياء', 'منتجات', 'فعاليات', 'علامة تجارية'];

const videos = [
  {
    id: 1,
    title: 'أزياء الرحامة الفاخرة',
    category: 'أزياء',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:30',
    description: 'عرض مجموعة الأزياء الفاخرة الجديدة',
  },
  {
    id: 2,
    title: 'قصة العلامة التجارية',
    category: 'علامة تجارية',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '1:45',
    description: 'رحلة الرحامة في عالم التصوير الفاخر',
  },
  {
    id: 3,
    title: 'تصوير المنتجات السينمائي',
    category: 'منتجات',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '2:15',
    description: 'أسلوب سينمائي في تصوير المنتجات الفاخرة',
  },
  {
    id: 4,
    title: 'توثيق الفعاليات',
    category: 'فعاليات',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '3:00',
    description: 'لحظات مميزة من أهم الفعاليات',
  },
  {
    id: 5,
    title: 'أزياء عصرية للشباب',
    category: 'أزياء',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:10',
    description: 'مجموعة الأزياء العصرية للشباب',
  },
  {
    id: 6,
    title: 'منتجات الجمال الفاخرة',
    category: 'منتجات',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '1:55',
    description: 'تصوير احترافي لمنتجات الجمال',
  },
  {
    id: 7,
    title: 'حفل إطلاق المجموعة الجديدة',
    category: 'فعاليات',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '4:20',
    description: 'حفل إطلاق مجموعة الأزياء الجديدة',
  },
  {
    id: 8,
    title: 'هوية الرحامة البصرية',
    category: 'علامة تجارية',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '2:45',
    description: 'تطوير الهوية البصرية للعلامة التجارية',
  },
];

export function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredVideos = videos.filter(
    (video) => activeCategory === 'الكل' || video.category === activeCategory
  );

  const handleVideoSelect = (video: typeof videos[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false);
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

  const closeModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-bg-primary to-bg-primary/95">
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
            مكتبة <span className="gradient-text">الفيديوهات</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            مجموعة شاملة من أعمالنا السينمائية في مختلف المجالات
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {videoCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all hover-lift',
                activeCategory === category
                  ? 'bg-accent-gold text-bg-primary'
                  : 'glass text-text-primary hover:bg-accent-gold/20'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={`${activeCategory}-${video.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-video rounded-2xl overflow-hidden glass hover-scale cursor-pointer"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                {/* Play Button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-bg-primary ml-1" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-accent-gold">{video.category}</span>
                    <span className="text-white/80">{video.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={selectedVideo.thumbnail}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls
                >
                  <source src={selectedVideo.video} type="video/mp4" />
                </video>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-white/80 mb-3">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-gold font-medium">
                      {selectedVideo.category}
                    </span>
                    <span className="text-white/70">
                      {selectedVideo.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
