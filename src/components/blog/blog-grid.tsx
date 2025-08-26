'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { SafeImage } from '@/components/ui/safe-image';

export function BlogGrid() {
  return (
    <section className="section-padding bg-gradient-to-b from-bg-primary to-bg-primary/95">
      <div className="container-padding">
        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="glass rounded-2xl overflow-hidden hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <SafeImage
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-accent-gold/20 text-accent-gold text-xs font-medium rounded-full">
                      Featured Article
                    </span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4 leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="text-text-primary/70 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center space-x-6 text-sm text-text-primary/60 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].publishedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime} min read</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors group"
                  >
                    <span className="font-medium">Read Full Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent-gold/20 text-accent-gold text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-text-primary/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-text-primary/60 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  <span>{post.publishedAt.toLocaleDateString()}</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors text-sm font-medium group/link"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Stay Updated
          </h3>
          <p className="text-text-primary/70 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest photography insights,
            behind-the-scenes content, and industry trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg glass border border-white/20 text-text-primary placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
            <button className="px-6 py-3 bg-accent-gold text-bg-primary rounded-lg font-medium hover:bg-accent-gold/90 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
