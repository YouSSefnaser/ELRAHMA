'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';

const categories = ['All', 'Branding', 'Fashion', 'Products', 'Events'];

const portfolioItems = Object.values(projects).map(project => ({
  id: parseInt(project.id),
  title: project.title,
  category: project.category === 'products' ? 'Products' :
           project.category === 'fashion' ? 'Fashion' :
           project.category === 'branding' ? 'Branding' : 'Events',
  image: project.image,
  slug: project.slug,
  client: project.client,
  year: project.year,
}));

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = portfolioItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

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
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto mb-12">
            Discover our diverse range of cinematic photography projects,
            each crafted with editorial excellence and luxury aesthetics.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all hover-lift',
                  activeCategory === category
                    ? 'bg-accent-gold text-bg-primary'
                    : 'glass text-text-primary hover:bg-accent-gold/20'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass hover-scale"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="inline-block px-3 py-1 bg-accent-gold/90 text-bg-primary text-xs font-medium rounded-full mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {item.client} • {item.year}
                    </p>
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
