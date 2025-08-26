'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';

export function ServicesGrid() {
  return (
    <section className="section-padding bg-gradient-to-b from-bg-primary to-bg-primary/95">
      <div className="container-padding">
        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
                index % 2 === 1 ? 'lg:col-start-2' : ''
              }`}>
                <Image
                  src={service.serviceImage}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className={`space-y-6 ${
                index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
              }`}>
                <div>
                  <h3 className="text-heading font-cairo font-bold text-text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {service.startingPrice && (
                    <div className="inline-block px-4 py-2 bg-accent-gold/20 rounded-full mb-6">
                      <span className="text-accent-gold font-semibold">
                        {service.startingPrice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-accent-gold" />
                      </div>
                      <span className="text-text-primary/70 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button asChild variant="outline" className="group">
                    <Link href="/contact" className="flex items-center space-x-2">
                      <span>Get Quote</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20 glass rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-text-primary/70 mb-8 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your specific requirements
            and create a tailored photography solution that exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
