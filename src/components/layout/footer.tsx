'use client';

import Link from 'next/link';
import { Camera, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  services: [
    { label: 'تصوير الأزياء', href: '/services#fashion' },
    { label: 'تصوير المنتجات', href: '/services#products' },
    { label: 'تصوير العلامات التجارية', href: '/services#branding' },
    { label: 'تصوير الفعاليات', href: '/services#events' },
    { label: 'المونتاج والتحرير', href: '/services#retouching' },
  ],
  company: [
    { label: 'من نحن', href: '/about' },
    { label: 'المعرض', href: '/portfolio' },
    { label: 'الفيديوهات', href: '/videos' },
    { label: 'المدونة', href: '/blog' },
    { label: 'تواصل معنا', href: '/contact' },
    { label: 'سياسة الخصوصية', href: '/privacy' },
  ],
  contact: [
    {
      icon: Phone,
      label: '+971 50 123 4567',
      href: 'tel:+971501234567',
    },
    {
      icon: Mail,
      label: 'hello@elrahama.com',
      href: 'mailto:hello@elrahama.com',
    },
    {
      icon: MapPin,
      label: 'Dubai, UAE',
      href: 'https://maps.google.com',
    },
  ],
  social: [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/elrahama',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/elrahama',
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-primary/95 backdrop-blur-sm border-t border-white/10">
      <div className="container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 group mb-6">
              <div className="relative">
                <Camera className="h-8 w-8 text-accent-gold transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold font-cairo gradient-text">
                El Rahama
              </span>
            </Link>
            <p className="text-text-primary/70 mb-6 leading-relaxed">
              استوديو الرحامة للتصوير السينمائي الفاخر والعلامات التجارية في دبي،
              متخصصون في التميز التحريري وسرد قصص العلامات التجارية.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-lg hover:bg-accent-gold/20 transition-colors group"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5 text-text-primary/70 group-hover:text-accent-gold transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              الخدمات
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-primary/70 hover:text-accent-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              الشركة
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-primary/70 hover:text-accent-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 text-text-primary/70 hover:text-accent-gold transition-colors group"
                  >
                    <item.icon className="h-4 w-4 text-accent-gold" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-text-primary/60 text-sm">
            © {new Date().getFullYear()} الرحامة للتصوير. جميع الحقوق
            محفوظة.
          </p>
          <div className="flex items-center space-x-6 text-sm text-text-primary/60">
            <Link href="/privacy" className="hover:text-accent-gold transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-accent-gold transition-colors">
              شروط الخدمة
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
