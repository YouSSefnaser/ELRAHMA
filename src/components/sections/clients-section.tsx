'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { clients } from '@/data/team';

const kpis = [
  { label: 'Clients', value: '200+' },
  { label: 'Projects', value: '500+' },
  { label: 'Rating', value: '4.9/5' },
  { label: 'Response', value: '24h' },
];

export function ClientsSection() {
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
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            We've had the privilege of working with some of the world's most
            prestigious brands and organizations across various industries.
          </p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center glass rounded-2xl p-6 hover-lift"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-gold mb-2">
                {kpi.value}
              </div>
              <div className="text-text-primary/60 uppercase tracking-wider text-sm">
                {kpi.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="marquee">
            <div className="marquee-content">
              {clients.map((client) => (
                <div
                  key={`first-${client.id}`}
                  className="flex-shrink-0 mx-8 md:mx-12"
                >
                  <div className="w-32 h-16 md:w-40 md:h-20 relative opacity-60 hover:opacity-100 transition-opacity">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain filter brightness-0 invert"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-content">
              {clients.map((client) => (
                <div
                  key={`second-${client.id}`}
                  className="flex-shrink-0 mx-8 md:mx-12"
                >
                  <div className="w-32 h-16 md:w-40 md:h-20 relative opacity-60 hover:opacity-100 transition-opacity">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain filter brightness-0 invert"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <blockquote className="text-xl md:text-2xl text-text-primary/90 mb-8 leading-relaxed">
              "El Rahama Photography transformed our brand vision into stunning
              visual reality. Their cinematic approach and attention to detail
              exceeded all our expectations. The campaign they created for our luxury resort resulted in a 150% increase in bookings."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/gallery/team-1.jpg"
                  alt="Sarah Al-Mansouri"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary">
                  Sarah Al-Mansouri
                </div>
                <div className="text-text-primary/60 text-sm">
                  Brand Director, Emirates Hospitality
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
