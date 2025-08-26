'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { teamMembers } from '@/data/team';

export function TeamSection() {
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
            Meet Our <span className="gradient-text">Creative Team</span>
          </h2>
          <p className="text-xl text-text-primary/70 max-w-3xl mx-auto">
            Our diverse team of creative professionals brings together decades
            of experience in luxury photography, fashion, and brand storytelling.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Social Links Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-3">
                    {member.social?.instagram && (
                      <Link
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-accent-gold/80 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </Link>
                    )}
                    {member.social?.linkedin && (
                      <Link
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-accent-gold/80 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-white" />
                      </Link>
                    )}
                    {member.social?.behance && (
                      <Link
                        href={member.social.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-accent-gold/80 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  {member.name}
                </h3>
                <p className="text-accent-gold font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-text-primary/70 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Team Members', value: '12+' },
            { label: 'Years Combined Experience', value: '80+' },
            { label: 'Languages Spoken', value: '8' },
            { label: 'Awards Won', value: '25+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center glass rounded-xl p-6 hover-lift"
            >
              <div className="text-3xl font-bold text-accent-gold mb-2">
                {stat.value}
              </div>
              <div className="text-text-primary/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Join Our Creative Team
          </h3>
          <p className="text-text-primary/70 mb-6 max-w-2xl mx-auto">
            We're always looking for talented photographers, stylists, and
            creative professionals to join our growing team in Dubai.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors"
          >
            <span>View Open Positions</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
