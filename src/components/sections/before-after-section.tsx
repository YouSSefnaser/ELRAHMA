'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SafeCompareImage } from '@/components/ui/safe-compare-image';

const beforeAfterItems = [
  {
    id: 1,
    title: 'Luxury Watch Retouching',
    description: 'Professional retouching that enhances metallic surfaces and intricate details while maintaining authenticity',
    before: '/images/gallery/Screenshot 2025-08-25 123139.png',
    after: '/images/gallery/Screenshot 2025-08-25 123150.png',
  },
  {
    id: 2,
    title: 'Fashion Portrait Enhancement',
    description: 'Color grading and skin retouching for editorial perfection while preserving natural beauty',
    before: '/images/gallery/Screenshot 2025-08-25 123201.png',
    after: '/images/gallery/Screenshot 2025-08-25 123217.png',
  },
  {
    id: 3,
    title: 'Product Photography Enhancement',
    description: 'Color correction and lighting enhancement for professional product photography',
    before: '/images/gallery/Screenshot 2025-08-25 123225.png',
    after: '/images/gallery/Screenshot 2025-08-25 123245.png',
  },
];

export function BeforeAfterSection() {
  const [activeItem, setActiveItem] = useState(beforeAfterItems[0]);

  return (
    <section className="section-padding bg-gradient-to-b from-bg-primary/95 to-bg-primary">
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
            Before & <span className="gradient-text">After</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            See the transformation power of our post-production expertise.
            Professional retouching and color grading that elevates your visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass">
              <SafeCompareImage
                leftImage={activeItem.before}
                rightImage={activeItem.after}
                className="w-full h-full"
              />
            </div>

            {/* Active Item Info */}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 glass rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {activeItem.title}
              </h3>
              <p className="text-text-primary/70">
                {activeItem.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Item Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {beforeAfterItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left p-4 rounded-xl transition-all hover-lift group ${
                  activeItem.id === item.id
                    ? 'glass border-accent-gold/50'
                    : 'glass hover:border-accent-gold/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.before}
                      alt={`${item.title} before`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary group-hover:text-accent-gold transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-text-primary/60 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Service Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 mt-8"
            >
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Post-Production Services
              </h4>
              <ul className="space-y-3 text-sm text-text-primary/70">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span>Professional Retouching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span>Color Grading & Correction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span>Skin & Beauty Enhancement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span>Background Replacement</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span>Composite Creation</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
