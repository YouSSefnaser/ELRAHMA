import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/El Rahama Photography/);
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Crafting Visual');
    await expect(page.locator('h1')).toContainText('Stories');
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation links
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a[href="/portfolio"]')).toBeVisible();
    await expect(page.locator('nav a[href="/services"]')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]')).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]')).toBeVisible();
  });

  test('should display portfolio section', async ({ page }) => {
    await expect(page.locator('text=Our Portfolio')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    const getQuoteButton = page.locator('text=Get a Quote in 24h');
    await expect(getQuoteButton).toBeVisible();
    
    const watchShowreelButton = page.locator('text=Watch Showreel');
    await expect(watchShowreelButton).toBeVisible();
  });

  test('should display floating CTA after scrolling', async ({ page }) => {
    // Scroll down to trigger floating CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Wait for the floating CTA to appear
    await expect(page.locator('[data-testid="floating-cta"]')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    await expect(page.locator('button[aria-label="Toggle menu"]')).toBeVisible();
    
    // Check if hero text is still readable
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate to portfolio page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/portfolio"]');
    await expect(page).toHaveURL('/portfolio');
    await expect(page.locator('h1')).toContainText('Portfolio');
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Extraordinary');
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check for layout shifts (basic check)
    const layoutShifts = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
          resolve(cls);
        }).observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => resolve(cls), 2000);
      });
    });
    
    // CLS should be less than 0.1
    expect(layoutShifts).toBeLessThan(0.1);
  });
});
