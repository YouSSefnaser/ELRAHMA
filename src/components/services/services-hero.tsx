'use client';

import { motion } from 'framer-motion';
import { Camera, Palette, Zap, Award } from 'lucide-react';

const highlights = [
  {
    icon: Camera,
    title: 'Cinematic Approach',
    description: 'Editorial excellence in every frame',
  },
  {
    icon: Palette,
    title: 'Creative Direction',
    description: 'Comprehensive brand storytelling',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: '24-48 hour delivery options',
  },
  {
    icon: Award,
    title: 'Award-Winning',
    description: 'Recognized industry expertise',
  },
];

export function ServicesHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-bg-primary to-bg-primary/95">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-hero font-cairo font-black text-text-primary mb-6">
            Photography <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-text-primary/70 leading-relaxed">
            From luxury fashion editorials to product campaigns, we deliver
            cinematic photography that elevates your brand story. Our
            comprehensive services combine technical excellence with creative
            vision.
          </p>
        </motion.div>

        {/* Service Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center glass rounded-2xl p-6 hover-lift"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {highlight.title}
              </h3>
              <p className="text-text-primary/70 text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
