'use client';

import { motion } from 'framer-motion';

export function LocationMap() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-96 bg-bg-primary/90"
    >
      {/* Placeholder for Google Maps */}
      <div className="w-full h-full bg-gradient-to-br from-accent-gold/10 to-accent-purple/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 text-accent-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Dubai Design District
          </h3>
          <p className="text-text-primary/70 text-sm mb-4">
            Building 6, Floor 3<br />
            Dubai, UAE
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-accent-gold text-bg-primary rounded-full text-sm font-medium hover:bg-accent-gold/90 transition-colors"
          >
            Open in Maps
          </a>
        </div>
      </div>
    </motion.section>
  );
}
