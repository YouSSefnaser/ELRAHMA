'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { PhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { Button } from '@/components/ui/button';
import { EnhancedImage } from '@/components/ui/enhanced-image';

interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  title?: string;
}

const categories = [
  { id: 'all', label: 'جميع الأعمال', labelEn: 'All Work' },
  { id: 'branding', label: 'العلامات التجارية', labelEn: 'Branding' },
  { id: 'fashion', label: 'الأزياء', labelEn: 'Fashion' },
  { id: 'products', label: 'المنتجات', labelEn: 'Products' },
  { id: 'events', label: 'الفعاليات', labelEn: 'Events' },
  { id: 'portraits', label: 'البورتريه', labelEn: 'Portraits' },
];

export function PortfolioMasonry() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch portfolio items from local media
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/media');
        const data = await response.json();
        
        if (data.images && Array.isArray(data.images)) {
          const items: PortfolioItem[] = data.images.map((img: any, index: number) => ({
            id: `portfolio-${index}`,
            src: img.src,
            alt: img.filename || `Portfolio item ${index + 1}`,
            category: categorizeImage(img.filename || ''),
            width: 400 + Math.random() * 200, // Random width for masonry
            height: 300 + Math.random() * 300, // Random height for masonry
            title: img.filename?.replace(/\.[^/.]+$/, '') || `Portfolio ${index + 1}`,
          }));
          
          setPortfolioItems(items);
          setFilteredItems(items);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Categorize images based on filename
  const categorizeImage = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('fashion') || lower.includes('model')) return 'fashion';
    if (lower.includes('product') || lower.includes('watch') || lower.includes('jewelry')) return 'products';
    if (lower.includes('brand') || lower.includes('logo') || lower.includes('corporate')) return 'branding';
    if (lower.includes('event') || lower.includes('conference') || lower.includes('party')) return 'events';
    if (lower.includes('portrait') || lower.includes('headshot') || lower.includes('team')) return 'portraits';
    return 'branding'; // Default category
  };

  // Filter items based on active category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory, portfolioItems]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-cinema-dark">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"></div>
            <p className="mt-4 text-cinema-light/60">جاري تحميل الأعمال...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cinema-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cairo font-bold text-display text-cinema-light mb-6">
            <span className="text-cinematic">معرض أعمالنا</span>
            <span className="block text-cinema-light/80 text-2xl mt-2">Our Portfolio</span>
          </h2>
          <p className="text-cinema-light/70 text-lg max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من أعمالنا في التصوير السينمائي والتجاري
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-3 rounded-full transition-all duration-300
                ${activeCategory === category.id 
                  ? 'bg-accent-gold text-cinema-dark hover:bg-yellow-600' 
                  : 'border-accent-gold/30 text-cinema-light hover:border-accent-gold hover:bg-accent-gold/10'
                }
              `}
            >
              <span className="font-cairo">{category.label}</span>
              <span className="ml-2 text-sm opacity-70">{category.labelEn}</span>
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto -ml-6"
              columnClassName="pl-6 bg-clip-padding"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="mb-6 group cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative overflow-hidden rounded-lg glass-card">
                    <EnhancedImage
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-cinema-light font-semibold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent-gold text-sm capitalize">
                          {categories.find(cat => cat.id === item.category)?.labelEn || item.category}
                        </p>
                      </div>
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 border-2 border-accent-gold/0 group-hover:border-accent-gold/50 transition-colors duration-300 rounded-lg" />
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {filteredItems.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              className="btn-cinematic"
            >
              عرض المزيد من الأعمال
            </Button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filteredItems.map(item => ({
          src: item.src,
          alt: item.alt,
          width: item.width,
          height: item.height,
        }))}
        styles={{
          container: { backgroundColor: "rgba(11, 16, 32, 0.95)" },
        }}
      />
    </section>
  );
}
