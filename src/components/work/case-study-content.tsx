'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

interface Project {
  objective?: string;
  approach?: string;
  results?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface CaseStudyContentProps {
  project: Project;
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const sections = [
    {
      icon: Target,
      title: 'Objective',
      content: project.objective || 'Define the project goals and objectives.',
      color: 'text-blue-400',
    },
    {
      icon: Lightbulb,
      title: 'Approach',
      content: project.approach || 'Outline the creative and technical approach.',
      color: 'text-yellow-400',
    },
    {
      icon: TrendingUp,
      title: 'Results',
      content: project.results || 'Showcase the achieved results and impact.',
      color: 'text-green-400',
    },
  ];

  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Content Sections */}
          <div className="space-y-12 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {section.title}
                  </h3>
                </div>
                <p className="text-text-primary/80 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
                Project Impact
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-accent-gold mb-2">
                      {metric.value}
                    </div>
                    <div className="text-text-primary/60 text-sm uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
