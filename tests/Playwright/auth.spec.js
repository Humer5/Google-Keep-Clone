import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  // ✅ Test 1: Login with valid credentials
  test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    await page.fill('input[type="email"]', 'reshamhumer512@gmail.com');
    await page.fill('input[type="password"]', 'H5122001r');
    await page.click('button[type="submit"]');
  
    // Wait for localStorage update
    await page.waitForFunction(() => localStorage.getItem("loggedIn") === "true");
  
    // Now wait for the redirection to layout
    await page.waitForURL('http://localhost:3000/layout');
  
    await expect(page.locator('.navbar')).toBeVisible();  // Ensure UI is loaded
  });
  
  // ❌ Test 2: Login with incorrect credentials
  test('Login with incorrect credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.fill('input[type="email"]', 'wronguser@example.com');
    await page.fill('input[type="password"]', 'WrongPass123');
    await page.click('button[type="submit"]');

    // Ensure error message is displayed
    await expect(page.locator('.error')).toHaveText('Invalid email or password.');
  });

  // ✅ Test 3: Signup with new user and login again
  test('Signup with new user and login', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click on the signup option
    await page.click('text=Don\'t have an account? Sign up!');

    // Fill the signup form
    await page.fill('input[type="email"]', 'newuser@example.com');
    await page.fill('input[type="password"]', 'NewPass@1234');
    await page.click('button[type="submit"]');

    // Ensure the user is redirected to layout
    await expect(page).toHaveURL('/layout');
    await expect(page.locator('.navbar')).toBeVisible();
  });

});