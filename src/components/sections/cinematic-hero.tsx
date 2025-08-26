'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Play, Phone, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(titleRef.current, 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Floating animation for CTAs
      gsap.to(".cta-float", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-cinema-dark"
    >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity: opacity as any }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          poster="/images/placeholder.jpg"
        >
          <source src="/videos/fashion-reel.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark/80 via-cinema-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/60 via-transparent to-cinema-dark/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full">
        {/* Left side - Text Content */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Subtitle */}
            <div className="flex items-center space-x-4">
              <div className="h-px w-12 bg-accent-gold" />
              <span className="text-accent-gold font-medium tracking-wider uppercase text-sm">
                Dubai's Premier Photography Studio
              </span>
            </div>

            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="font-cairo font-bold text-hero leading-tight"
            >
              <span className="block text-cinema-light">تصوير سينمائي</span>
              <span className="block text-cinematic">فاخر في دبي</span>
              <span className="block text-cinema-light text-display mt-4">
                Cinematic Luxury
              </span>
              <span className="block text-cinema-light text-display">
                Photography
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-cinema-light/80 text-lg lg:text-xl max-w-lg leading-relaxed">
              نحول رؤيتك إلى قصة بصرية خالدة. تصوير احترافي للعلامات التجارية والأزياء والمنتجات في قلب دبي.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button 
                size="lg" 
                className="cta-float btn-cinematic group"
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                احصل على عرض سعر خلال 24 ساعة
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="cta-float border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-cinema-dark transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                شاهد أعمالنا
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold">+200</div>
                <div className="text-sm text-cinema-light/60">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold">+500</div>
                <div className="text-sm text-cinema-light/60">مشروع مكتمل</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold">4.9/5</div>
                <div className="text-sm text-cinema-light/60">تقييم العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold">24h</div>
                <div className="text-sm text-cinema-light/60">استجابة سريعة</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Visual Elements */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-gold/30 rounded-full animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-accent-purple/20 rounded-full animate-pulse delay-1000" />
            
            {/* Main visual placeholder */}
            <div className="w-80 h-80 glass-card flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent-gold/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-accent-gold" />
                </div>
                <p className="text-cinema-light/60">شاهد عرض أعمالنا</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating CTAs */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-accent-gold hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cinema-light/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">اكتشف المزيد</span>
          <div className="w-px h-8 bg-accent-gold/50" />
        </div>
      </motion.div>
    </div>
  );
}
