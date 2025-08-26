'use client';

import { motion } from 'framer-motion';
import { SafeImage } from '@/components/ui/safe-image';
import { getFallbackImage } from '@/lib/media-client';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <SafeImage
          src={getFallbackImage('general')}
          alt="El Rahama Photography Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding pt-32 pb-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 bg-accent-gold/90 text-bg-primary text-sm font-medium rounded-full mb-6">
              About El Rahama
            </span>
            <h1 className="text-hero font-cairo font-black text-white mb-6 leading-tight">
              Crafting Visual
              <br />
              <span className="gradient-text">Excellence</span>
              <br />
              Since 2016
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/90 leading-relaxed max-w-3xl mb-8"
          >
            We are a Dubai-based cinematic photography studio specializing in
            luxury branding, fashion editorials, and commercial photography.
            Our passion lies in creating visual narratives that transcend
            ordinary imagery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Years Experience', value: '8+' },
              { label: 'Projects Completed', value: '500+' },
              { label: 'Happy Clients', value: '200+' },
              { label: 'Team Members', value: '12' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
