import { test, expect } from '@playwright/test';

test("should login successfully and navigate to layout page", async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto("http://localhost:3000/"); // Update the URL if necessary

  // Step 2: Fill in valid credentials
  await page.fill('[placeholder="Enter your email"]', "reshamhhumer512@.com"); // Update with valid email
  await page.fill('[placeholder="Enter your password"]', "H5122001r"); // Update with valid password

  // Step 3: Click the login button
  await page.click('button[type="submit"]');

  // Step 4: Wait for the navigation to the layout page
  await page.waitForURL("http://localhost:3000/layout"); // Update with your layout page URL

  // Step 5: Verify that the layout page is displayed
  await expect(page).toHaveURL('/layout'); // Check for a URL containing 'layout'
});
