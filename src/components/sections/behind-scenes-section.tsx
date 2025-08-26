'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const behindScenesItems = [
  {
    id: 1,
    type: 'image',
    src: '/images/gallery/Screenshot 2025-08-25 122847.png',
    title: 'Professional Studio Setup',
    description: 'Preparing our state-of-the-art studio for a luxury product shoot',
  },
  {
    id: 2,
    type: 'video',
    src: '/videos/fashion-reel.mp4',
    poster: '/videos/thumbnails/fashion-reel.jpg',
    title: 'Creative Process in Action',
    description: 'Behind the scenes of our latest fashion editorial shoot',
  },
  {
    id: 3,
    type: 'image',
    src: '/images/gallery/Screenshot 2025-08-25 122930.png',
    title: 'Team Collaboration',
    description: 'Our creative team working with models and stylists',
  },
  {
    id: 4,
    type: 'image',
    src: '/images/gallery/Screenshot 2025-08-25 123018.png',
    title: 'Professional Equipment',
    description: 'State-of-the-art photography and lighting equipment',
  },
  {
    id: 5,
    type: 'video',
    src: '/videos/products-reel.mp4',
    poster: '/videos/thumbnails/products-reel.jpg',
    title: 'Location Scouting in Dubai',
    description: 'Finding the perfect architectural backdrops across Dubai',
  },
  {
    id: 6,
    type: 'image',
    src: '/images/gallery/Screenshot 2025-08-25 123112.png',
    title: 'Post-Production Excellence',
    description: 'Our expert retouching and color grading process',
  },
];

export function BehindScenesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="section-padding bg-bg-primary overflow-hidden">
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
            Behind the <span className="gradient-text">Scenes</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            Get an exclusive look into our creative process, from concept
            to final delivery. See how we bring cinematic visions to life.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {behindScenesItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                y: index % 2 === 0 ? y1 : y2,
              }}
              className="break-inside-avoid mb-6 group"
            >
              <div className="relative rounded-2xl overflow-hidden glass hover-scale">
                {item.type === 'image' ? (
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      poster={item.poster}
                      muted
                      loop
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-accent-gold/90 flex items-center justify-center">
                        <Play className="h-5 w-5 text-bg-primary ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              step: '01',
              title: 'Concept Development',
              description: 'Collaborative ideation and mood boarding',
            },
            {
              step: '02',
              title: 'Pre-Production',
              description: 'Location scouting and team coordination',
            },
            {
              step: '03',
              title: 'Production',
              description: 'Professional shooting with cinematic approach',
            },
            {
              step: '04',
              title: 'Post-Production',
              description: 'Expert retouching and color grading',
            },
          ].map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-gold">
                  {process.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {process.title}
              </h3>
              <p className="text-text-primary/70 text-sm">
                {process.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
