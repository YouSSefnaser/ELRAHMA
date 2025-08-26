'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';

const caseStudies = Object.values(projects).filter(project => project.featured).map(project => ({
  id: parseInt(project.id),
  title: project.title,
  slug: project.slug,
  client: project.client,
  category: project.category === 'products' ? 'Products' :
           project.category === 'fashion' ? 'Fashion' :
           project.category === 'branding' ? 'Branding' : 'Events',
  image: project.image,
  goal: project.objective || '',
  approach: project.approach || '',
  results: project.results || '',
  metrics: project.metrics || [],
}));

const icons = {
  goal: Target,
  approach: Lightbulb,
  results: TrendingUp,
};

export function CaseStudiesSection() {
  return (
    <section className="section-padding bg-bg-primary">
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
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            Discover how our cinematic approach to photography has helped
            brands achieve remarkable results and exceed their goals.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent-gold/90 text-bg-primary text-xs font-medium rounded-full">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  {study.title}
                </h3>
                <p className="text-text-primary/60 text-sm mb-6">
                  {study.client}
                </p>

                {/* Process Steps */}
                <div className="space-y-4 mb-6">
                  {[
                    { key: 'goal', label: 'Goal', value: study.goal },
                    { key: 'approach', label: 'Approach', value: study.approach },
                    { key: 'results', label: 'Results', value: study.results },
                  ].map((item) => {
                    const Icon = icons[item.key as keyof typeof icons];
                    return (
                      <div key={item.key} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-accent-gold" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-accent-gold mb-1">
                            {item.label}
                          </div>
                          <div className="text-sm text-text-primary/80">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold text-accent-gold">
                        {metric.value}
                      </div>
                      <div className="text-xs text-text-primary/60">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  variant="ghost"
                  className="w-full group/btn"
                >
                  <Link href={`/work/${study.slug}`}>
                    <span>View Full Story</span>
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
