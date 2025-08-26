'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main CTA */}
          <div className="glass rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-display font-cairo font-bold text-text-primary mb-6">
              Ready to Create Something
              <br />
              <span className="gradient-text">Extraordinary?</span>
            </h2>
            <p className="text-xl text-text-primary/70 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with our cinematic photography
              and luxury branding expertise. Get your personalized quote today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="xl" className="group">
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Request a Quote</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild size="xl" variant="outline" className="group">
                <Link href="/portfolio" className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: +971 50 123 4567</span>
              </a>
              <a
                href="tel:+971501234567"
                className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Call: +971 50 123 4567</span>
              </a>
            </div>
          </div>

          {/* Service Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: '24h Response',
                description: 'Quick turnaround on all inquiries',
                icon: '⚡',
              },
              {
                title: 'Free Consultation',
                description: 'Discuss your project with our experts',
                icon: '💬',
              },
              {
                title: 'Flexible Packages',
                description: 'Tailored solutions for every budget',
                icon: '📦',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center hover-lift"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-primary/70 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
