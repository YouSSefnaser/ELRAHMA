'use client';

import { motion } from 'framer-motion';
import { Clock, MessageCircle, Phone } from 'lucide-react';

export function ContactHero() {
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
            Let's Create Something
            <br />
            <span className="gradient-text">Extraordinary</span>
          </h1>
          <p className="text-xl text-text-primary/70 mb-12 leading-relaxed">
            Ready to elevate your brand with cinematic photography? Get in touch
            for a personalized consultation and receive your detailed quote
            within 24 hours.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: '24h Response',
                description: 'Quick turnaround on all inquiries',
                action: 'Get Quote',
                href: '#contact-form',
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp',
                description: 'Instant messaging support',
                action: 'Chat Now',
                href: 'https://wa.me/971501234567',
              },
              {
                icon: Phone,
                title: 'Call Direct',
                description: 'Speak with our team',
                action: 'Call Now',
                href: 'tel:+971501234567',
              },
            ].map((option, index) => (
              <motion.a
                key={option.title}
                href={option.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover-lift group block"
                target={option.href.startsWith('http') ? '_blank' : undefined}
                rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/30 transition-colors">
                  <option.icon className="h-6 w-6 text-accent-gold" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  {option.title}
                </h3>
                <p className="text-text-primary/70 text-sm mb-4">
                  {option.description}
                </p>
                <span className="text-accent-gold font-medium text-sm">
                  {option.action} →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
