'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        '.hero-title',
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8,
        }
      );

      gsap.fromTo(
        '.hero-cta',
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.1,
          stagger: 0.2,
        }
      );

      // Video fade in
      gsap.fromTo(
        videoRef.current,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/gallery/fashion-1.jpg"
        >
          <source src="/videos/fashion-reel.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Video (Mobile: Hidden, Desktop: Transparent overlay) */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-primary/20" />
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center lg:justify-start px-6 lg:px-12 xl:px-20">
          <div className="max-w-2xl text-center lg:text-left">
            {/* Subtitle */}
            <motion.p
              className="hero-subtitle text-accent-gold font-medium text-lg mb-6 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Cinematic Luxury Photography
            </motion.p>

            {/* Main Title */}
            <h1 className="hero-title text-hero font-cairo font-black text-text-primary mb-8 leading-none">
              Crafting Visual
              <br />
              <span className="gradient-text">Stories</span>
              <br />
              in Dubai
            </h1>

            {/* Description */}
            <p className="hero-subtitle text-xl text-text-primary/80 mb-12 leading-relaxed max-w-lg">
              Editorial excellence meets luxury branding. We create cinematic
              photography that elevates your brand story.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Button
                asChild
                size="xl"
                className="hero-cta group"
                variant="default"
              >
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Get a Quote in 24h</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="xl"
                variant="glass"
                className="hero-cta group"
              >
                <Link href="#showreel" className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Showreel</span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="hero-cta mt-16 grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  200+
                </div>
                <div className="text-sm text-text-primary/60 uppercase tracking-wider">
                  Clients
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  500+
                </div>
                <div className="text-sm text-text-primary/60 uppercase tracking-wider">
                  Projects
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  4.9/5
                </div>
                <div className="text-sm text-text-primary/60 uppercase tracking-wider">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-accent-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-gold rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
