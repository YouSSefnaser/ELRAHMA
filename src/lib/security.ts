import DOMPurify from 'dompurify';

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  requests: 10,
  window: '1m',
};

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return as-is or use a server-safe sanitizer
    return html;
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (international format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Check for suspicious patterns (basic honeypot)
export function detectBot(formData: Record<string, any>): boolean {
  // Check honeypot field
  if (formData.honeypot && formData.honeypot.length > 0) {
    return true;
  }
  
  // Check for rapid submission (if timestamp is provided)
  if (formData.timestamp) {
    const submissionTime = Date.now() - formData.timestamp;
    if (submissionTime < 3000) { // Less than 3 seconds
      return true;
    }
  }
  
  // Check for suspicious patterns in text fields
  const suspiciousPatterns = [
    /https?:\/\//gi, // URLs in unexpected fields
    /<script/gi,     // Script tags
    /javascript:/gi, // JavaScript protocols
  ];
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Generate CSRF token
export function generateCSRFToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Content Security Policy configuration
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Next.js
    "'unsafe-eval'", // Required for development
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for styled-components
    'https://fonts.googleapis.com',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'https://res.cloudinary.com',
    'https://ik.imagekit.io',
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  'connect-src': [
    "'self'",
    'https://api.vercel.com',
    'https://vitals.vercel-insights.com',
  ],
  'media-src': [
    "'self'",
    'https:',
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
};

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
