import { test, expect } from '@playwright/test';

test('Successful login redirects to exact layout URL', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('input[type="email"]', 'reshamhumer512@gmail.com');
  await page.fill('input[type="password"]', 'H5122001r');
  await page.click('button[type="submit"]');

  // Check if there's an error instead of redirecting
  const errorMessage = await page.locator('.error'); // Adjust selector based on your app
  if (await errorMessage.isVisible()) {
    throw new Error("Login failed: " + await errorMessage.textContent());
  }

  // Wait for navigation to layout
  await page.waitForURL('http://localhost:3000/layout', { timeout: 60000 });

  // Verify the final URL
  expect(page.url()).toBe('http://localhost:3000/layout');
});
