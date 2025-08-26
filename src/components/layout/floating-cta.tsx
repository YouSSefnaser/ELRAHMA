'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingCTA() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsVisible(window.scrollY > 300);

    // فعل الحالة فورًا + addEventListener passive
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll as any);
  }, []);

  const ctaItems = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/971501234567', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Phone, label: 'Call Now', href: 'tel:+971501234567', color: 'bg-blue-500 hover:bg-blue-600' },
  ];

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-16 right-0 space-y-3"
                >
                  {ctaItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'flex items-center space-x-3 px-4 py-3 rounded-full text-white shadow-lg transition-all hover:shadow-xl hover-lift',
                        item.color
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsExpanded((v) => !v)}
              className={cn(
                'flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all hover:shadow-xl hover-lift',
                isExpanded ? 'bg-red-500 hover:bg-red-600' : 'bg-accent-gold hover:bg-accent-gold/90'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={isExpanded}
              aria-label="Open quick contact menu"
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="message" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    {/* تأكد إن class موجود عندك: text-bg-primary قد تكون غلطة تايلويند */}
                    <MessageCircle className="h-6 w-6 text-bg-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {!isExpanded && <div className="absolute inset-0 rounded-full bg-accent-gold animate-ping opacity-20" />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
