'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pricingPackages } from '@/data/services';

export function PricingSection() {
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
            Investment <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            Choose the package that best fits your project needs. All packages
            include our signature cinematic approach and professional excellence.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'relative glass rounded-2xl p-8 hover-lift',
                pkg.popular && 'border-2 border-accent-gold/50 scale-105'
              )}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent-gold text-bg-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold text-accent-gold mb-2">
                  {pkg.price}
                </div>
                <div className="text-text-primary/60 text-sm mb-4">
                  {pkg.duration}
                </div>
                <p className="text-text-primary/70 text-sm">
                  {pkg.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-accent-gold" />
                    </div>
                    <span className="text-text-primary/80 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                asChild
                className={cn(
                  'w-full',
                  pkg.popular ? 'bg-accent-gold hover:bg-accent-gold/90' : ''
                )}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                <Link href="/contact">
                  {pkg.popular ? 'Get Started' : 'Choose Package'}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              All Packages Include
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-text-primary/70">
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-4 w-4 text-accent-gold" />
                <span>Professional consultation</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-4 w-4 text-accent-gold" />
                <span>High-resolution delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="h-4 w-4 text-accent-gold" />
                <span>Usage rights included</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-text-primary/70 mb-4">
            Need something different? We create custom packages for unique projects.
          </p>
          <Button asChild variant="ghost" className="text-accent-gold">
            <Link href="/contact">Request Custom Quote</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
