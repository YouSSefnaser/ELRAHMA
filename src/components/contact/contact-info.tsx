'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from 'lucide-react';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Studio Location',
    details: ['Dubai Design District', 'Building 6, Floor 3', 'Dubai, UAE'],
    action: 'Get Directions',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+971 50 123 4567', '+971 4 567 8901'],
    action: 'Call Now',
    href: 'tel:+971501234567',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['hello@elrahama.com', 'projects@elrahama.com'],
    action: 'Send Email',
    href: 'mailto:hello@elrahama.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Sunday - Thursday: 9AM - 7PM', 'Friday - Saturday: 10AM - 6PM'],
    action: 'Schedule Call',
    href: '#contact-form',
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/elrahama',
    handle: '@elrahama',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/elrahama',
    handle: 'El Rahama Photography',
  },
];

export function ContactInfo() {
  return (
    <section className="bg-gradient-to-b from-bg-primary to-bg-primary/90 p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-heading font-cairo font-bold text-text-primary mb-8">
          Get in Touch
        </h2>

        {/* Contact Details */}
        <div className="space-y-8 mb-12">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-gold/30 transition-colors">
                  <detail.icon className="h-6 w-6 text-accent-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {detail.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {detail.details.map((line, idx) => (
                      <p key={idx} className="text-text-primary/70 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                  <a
                    href={detail.href}
                    className="text-accent-gold hover:text-white transition-colors text-sm font-medium"
                    target={detail.href.startsWith('http') ? '_blank' : undefined}
                    rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {detail.action} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Follow Our Work
          </h3>
          <div className="space-y-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-accent-gold/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center group-hover:bg-accent-gold/30 transition-colors">
                  <social.icon className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <div className="text-text-primary font-medium group-hover:text-accent-gold transition-colors">
                    {social.label}
                  </div>
                  <div className="text-text-primary/60 text-sm">
                    {social.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Response Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-xl p-6 text-center"
        >
          <h4 className="text-lg font-semibold text-text-primary mb-2">
            24-Hour Response Guarantee
          </h4>
          <p className="text-text-primary/70 text-sm">
            We respond to all inquiries within 24 hours with a detailed
            consultation and personalized quote for your project.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
