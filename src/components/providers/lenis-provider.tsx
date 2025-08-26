'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Store lenis instance globally for access
      (window as any).lenis = lenis;

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);

  return <>{children}</>;
}

// Hook to use Lenis instance
export function useSmoothScroll() {
  const scrollTo = (target: string | number, options?: any) => {
    const lenis = (window as any).lenis;
    lenis?.scrollTo(target, options);
  };

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    lenis?.scrollTo(0);
  };

  const scrollToElement = (element: string) => {
    const lenis = (window as any).lenis;
    lenis?.scrollTo(element);
  };

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
  };
}
