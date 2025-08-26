'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/portfolio';

interface Project {
  id: string;
  category: string;
}

interface RelatedProjectsProps {
  currentProject: Project;
}

export function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  // Get related projects from the same category
  const relatedProjects = Object.values(projects)
    .filter(project => 
      project.category === currentProject.category && 
      project.id !== currentProject.id
    )
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-cairo font-bold text-text-primary mb-6">
            Related <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            Explore more projects from our portfolio in the same category.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl overflow-hidden hover-scale"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-block px-3 py-1 bg-accent-gold/90 text-bg-primary text-xs font-medium rounded-full mb-2">
                    {project.category === 'products' ? 'Products' : 
                     project.category === 'fashion' ? 'Fashion' :
                     project.category === 'branding' ? 'Branding' : 'Events'}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {project.client} • {project.year}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-primary/70 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors text-sm font-medium group/link"
                >
                  <span>View Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 px-8 py-4 glass rounded-full text-text-primary hover:text-accent-gold transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
