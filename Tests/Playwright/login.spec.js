const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the login page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/Login.html'); // Update with your local server URL and port
    console.log('Navigated to application');
    await page.waitForTimeout(1000); // Wait for 1 second

    // Step 2: Fill in the login form
    await page.fill('#username', 'admin'); // Ensure selector matches your username input
    await page.waitForTimeout(1000); // Wait for 1 second
    await page.fill('#password', 'password123'); // Ensure selector matches your password input
    await page.waitForTimeout(1000); // Wait for 1 second
    await page.click('button[type="submit"]');
    console.log('Form submitted');
    await page.waitForTimeout(1000); // Wait for 1 second

    // Step 3: Handle alert box for successful login
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Login successful'); // Adjust the message as needed
      await dialog.accept();
    });

    // Step 4: Debugging step: Log the current URL to check if navigation happened
    await page.waitForTimeout(1000); // Add a small delay to ensure the alert is processed
    const currentUrl = await page.url();
    console.log('Current URL:', currentUrl);

    // Step 5: Verify successful login by checking the presence of the home section element
    await page.waitForSelector('#home-section', { timeout: 10000 });
    const homeSectionVisible = await page.isVisible('#home-section'); // Adjust selector as needed
    console.log('Is home section visible:', homeSectionVisible);
    expect(homeSectionVisible).toBe(true);
  });

  test('should display an error message with invalid credentials', async ({ page }) => {
    // Step 1: Navigate to the login page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/Login.html'); // Update with your local server URL and port
    await page.waitForTimeout(1000); // Wait for 1 second

    // Step 2: Fill in the login form with invalid credentials
    await page.fill('#username', 'invalidUsername'); // Ensure selector matches your username input
    await page.waitForTimeout(1000); // Wait for 1 second
    await page.fill('#password', 'invalidPassword'); // Ensure selector matches your password input
    await page.waitForTimeout(1000); // Wait for 1 second
    await page.click('button[type="submit"]');
    console.log('Form submitted');
    await page.waitForTimeout(5000); // Wait for 1 second

    // Step 3: Handle alert box for login failure
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Invalid credentials'); // Adjust the message as needed
      await dialog.accept();
    });

    // Step 4: Verify that the user remains on the login page (or any other logic)
    await page.waitForTimeout(1000); // Wait for 1 second
    expect(await page.url()).toBe('http://127.0.0.1:5500/Google-Keep-Clone/Login.html'); // Verify that URL remains the same
  });
});
