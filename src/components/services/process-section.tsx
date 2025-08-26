'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Camera, Palette, Zap, CheckCircle } from 'lucide-react';
import { processSteps } from '@/data/services';

const stepIcons = [Users, Palette, Camera, Camera, Zap, CheckCircle];

export function ProcessSection() {
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
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            From initial concept to final delivery, our proven process ensures
            exceptional results and seamless collaboration at every step.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-accent-gold via-accent-purple to-accent-gold hidden md:block" />

          <div className="space-y-12">
            {processSteps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-accent-gold" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center">
                        <span className="text-bg-primary font-bold text-sm">
                          {step.step}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass rounded-2xl p-6 md:p-8 hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-text-primary mb-2 md:mb-0">
                        {step.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-accent-gold">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-text-primary/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Transparent Communication',
              description: 'Regular updates and clear timelines throughout the project',
              icon: '💬',
            },
            {
              title: 'Quality Assurance',
              description: 'Multiple review stages ensure exceptional final results',
              icon: '✨',
            },
            {
              title: 'On-Time Delivery',
              description: 'Reliable delivery schedules you can count on',
              icon: '⏰',
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center glass rounded-xl p-6 hover-lift"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {benefit.title}
              </h4>
              <p className="text-text-primary/70 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
