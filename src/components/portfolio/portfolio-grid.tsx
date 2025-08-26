'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categories = ['الكل', 'أزياء', 'منتجات', 'فعاليات', 'علامة تجارية'];

// Extended portfolio items for full page
const portfolioItems = [
  {
    id: 1,
    title: 'أزياء عصرية للنساء',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 122847.png',
    slug: 'women-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: true,
  },
  {
    id: 2,
    title: 'أزياء رجالية أنيقة',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 122911.png',
    slug: 'men-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: true,
  },
  {
    id: 3,
    title: 'أزياء كاجوال',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 122930.png',
    slug: 'casual-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 4,
    title: 'أزياء رسمية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123018.png',
    slug: 'formal-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 5,
    title: 'أزياء صيفية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123031.png',
    slug: 'summer-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 6,
    title: 'أزياء شتوية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123112.png',
    slug: 'winter-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 7,
    title: 'إكسسوارات أنيقة',
    category: 'منتجات',
    image: '/images/gallery/Screenshot 2025-08-25 123139.png',
    slug: 'accessories',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 8,
    title: 'أزياء عملية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123150.png',
    slug: 'work-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 9,
    title: 'أزياء عصرية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123201.png',
    slug: 'trendy-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 10,
    title: 'أزياء كلاسيكية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123217.png',
    slug: 'classic-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 11,
    title: 'أزياء رياضية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123225.png',
    slug: 'sport-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 12,
    title: 'أزياء مسائية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123245.png',
    slug: 'evening-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 13,
    title: 'أزياء شبابية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123301.png',
    slug: 'youth-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 14,
    title: 'أزياء أطفال',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123322.png',
    slug: 'kids-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 15,
    title: 'أزياء حفلات',
    category: 'فعاليات',
    image: '/images/gallery/Screenshot 2025-08-25 123343.png',
    slug: 'party-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 16,
    title: 'أزياء عروس',
    category: 'علامة تجارية',
    image: '/images/gallery/Screenshot 2025-08-25 123352.png',
    slug: 'bridal-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 17,
    title: 'أزياء محجبات',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123401.png',
    slug: 'hijab-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 18,
    title: 'أزياء عبايات',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123412.png',
    slug: 'abaya-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 19,
    title: 'أزياء تراثية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123421.png',
    slug: 'traditional-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 20,
    title: 'أزياء عملية يومية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123459.png',
    slug: 'daily-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 21,
    title: 'أزياء مكتبية',
    category: 'أزياء',
    image: '/images/gallery/Screenshot 2025-08-25 123609.png',
    slug: 'office-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 22,
    title: 'أزياء فاشن',
    category: 'أزياء',
    image: '/images/gallery/fashion-1.jpg',
    slug: 'fashion-collection',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 23,
    title: 'أزياء عالمية',
    category: 'أزياء',
    image: '/images/gallery/fashion-2.jpg',
    slug: 'international-fashion',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  },
  {
    id: 24,
    title: 'فريق العمل',
    category: 'علامة تجارية',
    image: '/images/gallery/team-1.jpg',
    slug: 'team-work',
    client: 'الرحامة للأزياء',
    year: 2024,
    featured: false,
  }
];

const ITEMS_PER_PAGE = 12;

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = portfolioItems.filter(
    (item) => activeCategory === 'الكل' || item.category === activeCategory
  );

  const visibleItems = filteredItems.slice(0, displayedItems);
  const hasMore = displayedItems < filteredItems.length;

  const loadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
    setIsLoading(false);
  };

  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE);
  }, [activeCategory]);

  return (
    <section className="section-padding bg-gradient-to-b from-bg-primary to-bg-primary/95">
      <div className="container-padding">
        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6"
        >
          <div className="flex items-center space-x-2 text-text-primary/70">
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">تصفية حسب الفئة:</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium transition-all hover-lift',
                  activeCategory === category
                    ? 'bg-accent-gold text-bg-primary'
                    : 'glass text-text-primary hover:bg-accent-gold/20'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-text-primary/60 text-sm">
            عرض {visibleItems.length} من {filteredItems.length} مشروع
            {activeCategory !== 'الكل' && ` في فئة ${activeCategory}`}
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {visibleItems.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  'group relative rounded-2xl overflow-hidden glass hover-scale',
                  item.featured ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/5]'
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes={
                    item.featured
                      ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
                      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  }
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="inline-block px-3 py-1 bg-accent-gold/90 text-bg-primary text-xs font-medium rounded-full mb-3">
                      {item.category}
                    </span>
                    <h3 className={cn(
                      'font-semibold text-white mb-2',
                      item.featured ? 'text-xl' : 'text-lg'
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {item.client} • {item.year}
                    </p>
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center space-x-2 text-accent-gold hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">عرض المشروع</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMore}
              disabled={isLoading}
              size="lg"
              variant="outline"
              className="min-w-[200px]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
                  <span>جاري التحميل...</span>
                </div>
              ) : (
                'تحميل المزيد من المشاريع'
              )}
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-text-primary/60 text-lg">
              لا توجد مشاريع في هذه الفئة.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
