'use client';

import { motion } from 'framer-motion';

export function BlogHero() {
  return (
    <section className="pt-32 pb-16 bg-bg-primary">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-hero font-cairo font-black text-text-primary mb-6">
            Photography <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-text-primary/70 mb-8 leading-relaxed">
            Discover the latest trends, techniques, and behind-the-scenes stories
            from the world of luxury photography and brand storytelling.
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Brand Photography',
              'Fashion Editorial',
              'Product Photography',
              'Behind the Scenes',
              'Industry Insights',
              'Technical Tips',
            ].map((category, index) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="px-4 py-2 glass rounded-full text-sm text-text-primary/80 hover:text-accent-gold transition-colors cursor-pointer"
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
