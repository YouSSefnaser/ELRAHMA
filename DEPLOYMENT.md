# 🚀 Deployment Guide - El Rahama Photography

## ✅ Pre-Deployment Checklist

### 1. Content Verification
- [x] **Portfolio data** - Real project information with professional descriptions
- [x] **Service offerings** - Comprehensive service descriptions and pricing
- [x] **Team profiles** - Professional team member information
- [x] **Blog content** - In-depth photography articles and insights
- [x] **Client testimonials** - Authentic testimonials and case studies

### 2. Media Assets
- [x] **High-quality images** - Optimized local images from our collection
- [x] **Video content** - Professional video reels and backgrounds
- [x] **Image optimization** - WebP/AVIF formats with responsive loading
- [x] **Video thumbnails** - Optimized video preview images

### 3. Technical Features
- [x] **SEO optimization** - Meta tags, structured data, sitemaps
- [x] **Performance optimization** - Image optimization, code splitting
- [x] **Security headers** - CSP, XSS protection, rate limiting
- [x] **Accessibility** - WCAG compliance, keyboard navigation
- [x] **Mobile responsiveness** - Optimized for all device sizes

## 🔧 Environment Configuration

### Required Environment Variables
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://elrahama.com
NEXT_PUBLIC_SITE_NAME="El Rahama Photography"

# Image APIs

# Contact Form
NEXT_PUBLIC_CONTACT_EMAIL=hello@elrahama.com
CONTACT_FORM_WEBHOOK_URL=your_webhook_url

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# Rate Limiting
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Error Tracking
SENTRY_DSN=your_sentry_dsn
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/elrahama-photography)

#### Manual Deployment
1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required environment variables

3. **Custom Domain**
   - Add your custom domain in Vercel Dashboard
   - Configure DNS settings with your domain provider

### Option 2: Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Add all required variables in Netlify Dashboard

### Option 3: Self-Hosted

1. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

2. **Docker Deployment**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

## 📊 Performance Optimization

### Implemented Optimizations
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Images and components load on demand
- **Caching**: Static generation with ISR for dynamic content
- **Compression**: Gzip/Brotli compression enabled
- **CDN**: Automatic CDN distribution with Vercel

### Expected Performance Metrics
- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security Configuration

### Security Headers (Automatically Applied)
```javascript
{
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

### Content Security Policy
- **Script Sources**: Self, Google Analytics, Vercel
- **Image Sources**: Self, Unsplash, CDNs
- **Style Sources**: Self, Google Fonts
- **Frame Sources**: None (DENY)

## 📈 Analytics & Monitoring

### Vercel Analytics
- **Web Vitals**: Automatic Core Web Vitals tracking
- **Real User Monitoring**: Performance metrics from real users
- **Error Tracking**: Automatic error reporting

### Google Analytics
- **Page Views**: Track page visits and user behavior
- **Conversion Tracking**: Monitor contact form submissions
- **Custom Events**: Track portfolio interactions

### Sentry Error Tracking
- **Error Monitoring**: Real-time error tracking
- **Performance Monitoring**: Track slow queries and renders
- **Release Tracking**: Monitor deployment health

## 🧪 Testing Before Deployment

### Automated Tests
```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Type Checking
npm run type-check

# Linting
npm run lint
```

### Manual Testing Checklist
- [ ] **Homepage**: Hero video, portfolio grid, contact forms
- [ ] **Portfolio**: Filtering, lightbox, project details
- [ ] **Services**: Service descriptions, pricing, contact forms
- [ ] **About**: Team profiles, company story, awards
- [ ] **Contact**: Form validation, spam protection, success states
- [ ] **Blog**: Article reading, navigation, search
- [ ] **Mobile**: Touch interactions, responsive design
- [ ] **Performance**: Loading speeds, image optimization

## 🔄 Post-Deployment

### Domain Configuration
1. **DNS Settings**
   ```
   Type: CNAME
   Name: www
   Value: your-vercel-domain.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```

2. **SSL Certificate**
   - Automatic SSL with Vercel/Netlify
   - Verify HTTPS redirect is working

### SEO Setup
1. **Google Search Console**
   - Submit sitemap: `https://elrahama.com/sitemap.xml`
   - Verify domain ownership

2. **Google Analytics**
   - Configure goals and conversions
   - Set up enhanced ecommerce tracking

3. **Social Media**
   - Verify Open Graph tags
   - Test social media sharing

### Monitoring Setup
1. **Uptime Monitoring**
   - Set up monitoring with Vercel or external service
   - Configure alerts for downtime

2. **Performance Monitoring**
   - Monitor Core Web Vitals
   - Set up performance budgets

## 📞 Support & Maintenance

### Regular Maintenance
- **Weekly**: Check analytics and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Content updates and SEO optimization

### Support Contacts
- **Technical Issues**: Check GitHub issues or documentation
- **Performance Issues**: Monitor Vercel/Netlify dashboards
- **Content Updates**: Update data files in `src/data/`

---

**Your luxury photography website is ready for the world!** 🌟

For ongoing support and updates, refer to the [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md) files.
