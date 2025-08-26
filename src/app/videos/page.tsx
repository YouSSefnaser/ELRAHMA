'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ShowreelSection } from '@/components/sections/showreel-section';
import { VideoGallery } from '@/components/videos/video-gallery';
import Image from 'next/image';

export default function VideosPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Video Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover" 
            autoPlay 
            muted={isMuted} 
            loop 
            playsInline
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/events-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          {/* Large Logo */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="El Rahama Photography"
              width={200}
              height={200}
              priority
              className="mx-auto drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Video <span className="text-yellow-400">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 animate-fade-in-delay">
            Explore our cinematic collection of luxury photography and creative videography
          </p>
          
          <div className="flex items-center justify-center gap-4 animate-fade-in-delay-2">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center hover:from-amber-400 hover:to-yellow-500 transition-all hover:scale-105 transform duration-300 shadow-lg"
              aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? (
                <Pause className="h-7 w-7 text-gray-900" />
              ) : (
                <Play className="h-7 w-7 text-gray-900 ml-1" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105 transform duration-300 shadow-lg"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-7 w-7 text-white" />
              ) : (
                <Volume2 className="h-7 w-7 text-white" />
              )}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#showreel" className="text-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </a>
        </div>
      </section>

      {/* Featured Showreel */}
      <div id="showreel">
        <ShowreelSection />
      </div>

      {/* Video Gallery */}
      <VideoGallery />
    </main>
  );
}