'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggleStandalone } from '@/components/ui/theme-toggle-standalone';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/videos', label: 'Videos' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'glass backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      )}
    >
      <nav className="container-padding flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="El Rahama Photography"
              width={60}
              height={60}
              priority
              className="transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-accent-gold/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-accent-gold',
                pathname === item.href ? 'text-accent-gold' : 'text-text-primary/80'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent-gold"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggleStandalone />
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">Get Quote</Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 text-text-primary hover:text-accent-gold transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass backdrop-blur-md border-t border-white/10"
          >
            <div className="container-padding py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block text-lg font-medium transition-colors hover:text-accent-gold',
                      pathname === item.href ? 'text-accent-gold' : 'text-text-primary/80'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1 }} className="pt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
