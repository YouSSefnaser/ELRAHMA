'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const videoCategories = ['All', 'Fashion', 'Products', 'Events', 'Branding'];

// All available videos from public folder
const videos = [
  {
    id: 1,
    title: 'Luxury Fashion Collection',
    category: 'Fashion',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:30',
    description: 'Showcasing our latest luxury fashion collection',
  },
  {
    id: 2,
    title: 'Brand Story Documentary',
    category: 'Branding',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '1:45',
    description: 'El Rahama\'s journey in luxury photography',
  },
  {
    id: 3,
    title: 'Cinematic Product Photography',
    category: 'Products',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '2:15',
    description: 'Cinematic approach to luxury product photography',
  },
  {
    id: 4,
    title: 'Event Documentation',
    category: 'Events',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '3:00',
    description: 'Capturing memorable moments from exclusive events',
  },
  {
    id: 5,
    title: 'Fashion Week Behind Scenes',
    category: 'Fashion',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '2:45',
    description: 'Behind the scenes of Dubai Fashion Week',
  },
  {
    id: 6,
    title: 'Luxury Watch Campaign',
    category: 'Products',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '1:55',
    description: 'Professional luxury watch photography campaign',
  },
  {
    id: 7,
    title: 'Gala Event Coverage',
    category: 'Events',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '4:20',
    description: 'Exclusive coverage of luxury gala events',
  },
  {
    id: 8,
    title: 'Brand Identity Development',
    category: 'Branding',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '2:45',
    description: 'Creating visual brand identity for luxury clients',
  },
  {
    id: 9,
    title: 'Editorial Fashion Shoot',
    category: 'Fashion',
    thumbnail: '/videos/thumbnails/fashion-reel.jpg',
    video: '/videos/fashion-reel.mp4',
    duration: '3:15',
    description: 'High-end editorial fashion photography session',
  },
  {
    id: 10,
    title: 'Product Launch Event',
    category: 'Events',
    thumbnail: '/videos/thumbnails/events-reel.jpg',
    video: '/videos/events-reel.mp4',
    duration: '2:30',
    description: 'Documenting exclusive product launch events',
  },
  {
    id: 11,
    title: 'Jewelry Collection Showcase',
    category: 'Products',
    thumbnail: '/videos/thumbnails/products-reel.jpg',
    video: '/videos/products-reel.mp4',
    duration: '1:40',
    description: 'Luxury jewelry photography with macro details',
  },
  {
    id: 12,
    title: 'Corporate Branding Session',
    category: 'Branding',
    thumbnail: '/videos/thumbnails/branding-reel.jpg',
    video: '/videos/branding-reel.mp4',
    duration: '2:20',
    description: 'Professional corporate photography and branding',
  },
];

export function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredVideos = videos.filter(
    (video) => activeCategory === 'All' || video.category === activeCategory
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            Video <span className="text-yellow-500">Library</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of our cinematic work across different categories
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
                'px-8 py-3 rounded-full text-sm font-medium transition-all transform hover:scale-105',
                activeCategory === category
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200 shadow-sm'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={`${activeCategory}-${video.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                {/* Play Button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                    <Play className="h-6 w-6 text-gray-900 ml-1" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-400 font-medium">{video.category}</span>
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
                className="relative max-w-6xl w-full aspect-video rounded-2xl overflow-hidden"
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
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-white/80 mb-3 text-lg">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-semibold text-lg">
                      {selectedVideo.category}
                    </span>
                    <span className="text-white/70 text-lg">
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