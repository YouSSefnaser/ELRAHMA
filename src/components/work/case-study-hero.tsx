'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  client: string;
  year: number;
  image: string;
  video?: string;
  objective?: string;
  tags: string[];
}

interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {project.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={project.image}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding pt-32 pb-16">
        <div className="max-w-4xl">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-accent-gold/90 text-bg-primary text-sm font-medium rounded-full">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-hero font-cairo font-black text-white mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          {/* Project Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-white/80"
          >
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-accent-gold" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent-gold" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-accent-gold" />
              <span>{project.tags.join(', ')}</span>
            </div>
          </motion.div>

          {/* Objective */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/90 leading-relaxed max-w-3xl"
          >
            {project.objective || 'Discover the story behind this exceptional project and the creative process that brought it to life.'}
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
