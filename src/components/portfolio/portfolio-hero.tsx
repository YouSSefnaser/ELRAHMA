'use client';

import { motion } from 'framer-motion';

export function PortfolioHero() {
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
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-text-primary/70 mb-8 leading-relaxed">
            A curated collection of our finest work spanning luxury fashion,
            product photography, branding campaigns, and exclusive events.
            Each project represents our commitment to cinematic excellence
            and editorial sophistication.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              { label: 'Projects Completed', value: '500+' },
              { label: 'Happy Clients', value: '200+' },
              { label: 'Years Experience', value: '8+' },
              { label: 'Awards Won', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-primary/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
