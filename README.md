# El Rahama Photography - Cinematic Luxury Photography Website

A stunning, cinematic luxury photography and branding website built with Next.js 14, featuring editorial excellence and luxury aesthetics for Dubai's premier photography studio.

## 🎨 Features

### Design & User Experience
- **Cinematic Editorial Look**: Inspired by Vogue, Leica, and Sony Alpha Universe
- **Split-Screen Hero**: Full-screen video background with editorial typography
- **Masonry Portfolio Grid**: Filterable with smooth hover animations
- **Interactive Elements**: Before/after sliders, video reels, parallax effects
- **Glass Morphism UI**: Modern glass effects with subtle film grain overlay
- **Responsive Design**: Optimized for all devices and screen sizes

### Technical Excellence
- **Next.js 14**: App Router with TypeScript and React 18
- **Performance Optimized**: ISR/SSG, image optimization, code splitting
- **Smooth Animations**: Framer Motion + GSAP + Lenis smooth scroll
- **SEO Optimized**: Dynamic meta tags, sitemap, robots.txt, JSON-LD
- **Security First**: CSP headers, rate limiting, form validation
- **Accessibility**: WCAG compliant with focus management

### Content Management
- **Dynamic Portfolio**: Filterable projects with case study details
- **Contact Forms**: React Hook Form + Zod validation with spam protection
- **Blog System**: Editorial posts with SEO optimization
- **Multi-language Ready**: Arabic (Cairo) and English (Inter/Outfit) fonts

## 🚀 Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library

### Animation & Interaction
- **Framer Motion** - React animations
- **GSAP** - Advanced animations with ScrollTrigger
- **Lenis** - Smooth scrolling
- **React Compare Image** - Before/after sliders

### Media & Gallery
- **Next/Image** - Optimized image loading
- **React Photo Album** - Masonry gallery layouts
- **Yet Another React Lightbox** - Image lightbox
- **Keen Slider** - Touch-friendly sliders

### Forms & Validation
- **React Hook Form** - Performant forms
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Performance & SEO
- **@vercel/analytics** - Performance monitoring
- **next-seo** - SEO optimization
- **@vercel/og** - Dynamic OG images
- **Sharp** - Image processing

### Security
- **DOMPurify** - XSS protection
- **@upstash/ratelimit** - Rate limiting
- **next-safe** - Security headers

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Playwright** - E2E testing
- **Jest** - Unit testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (pages)/           # Route groups
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # Robots.txt
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── portfolio/        # Portfolio components
│   ├── contact/          # Contact components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── data/                 # Static data
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/elrahama-photography.git
   cd elrahama-photography
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://elrahama.com
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🎯 Content & Images

The website now includes:
- **Real professional content** from industry-leading photography studios
- **High-quality images** from Unsplash API with optimization
- **Professional portfolio data** with actual project details
- **Comprehensive service descriptions** based on industry standards
- **Team profiles** with realistic professional backgrounds
- **Blog content** with in-depth photography insights

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Testing
npm run test         # Run Jest unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run test:watch   # Run tests in watch mode

# Deployment
npm run deploy       # Deploy to Vercel
```

## 🎯 Key Pages & Sections

### Homepage
- **Hero Section**: Split-screen with video background
- **Showreel**: Interactive video player with category filters
- **Portfolio**: Masonry grid with hover effects
- **Case Studies**: Success stories with metrics
- **Before/After**: Interactive comparison sliders
- **Behind Scenes**: Parallax photo/video grid
- **Clients**: Animated marquee with testimonials

### Portfolio (`/portfolio`)
- Filterable masonry grid
- Infinite scroll/load more
- Lightbox gallery
- SEO optimized project pages

### Services (`/services`)
- Editorial service layouts
- Process visualization
- Pricing information
- Service-specific galleries

### About (`/about`)
- Agency story and values
- Team member profiles
- Awards and recognition
- Company timeline

### Contact (`/contact`)
- Multi-step quote form
- Real-time validation
- Spam protection
- Interactive map
- Multiple contact methods

## 🔧 Customization

### Design Tokens
Edit `tailwind.config.ts` to customize:
- Color palette
- Typography scales
- Spacing system
- Animation timings

### Content Management
Update content in:
- `src/data/` - Static content
- `src/types/` - TypeScript interfaces
- Individual page components

### SEO Configuration
Modify `src/lib/seo.ts` for:
- Default meta tags
- JSON-LD schemas
- Open Graph settings

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

## 📊 Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: 
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP/AVIF with responsive sizing

## 🔒 Security Features

- Content Security Policy (CSP)
- XSS Protection
- CSRF Protection
- Rate Limiting
- Input Sanitization
- Secure Headers

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: hello@elrahama.com
- Website: [elrahama.com](https://elrahama.com)
- GitHub Issues: [Create an issue](https://github.com/yourusername/elrahama-photography/issues)

---

Built with ❤️ by [El Rahama Photography](https://elrahama.com)
