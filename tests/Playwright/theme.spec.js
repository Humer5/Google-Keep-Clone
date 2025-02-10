import { test, expect } from "@playwright/test";

test("Theme toggle should switch between light and dark mode", async ({ page }) => {
  // Go to the page where the Navbar and theme toggle exists
  await page.goto("http://localhost:3000/layout");

  // Ensure that the theme is set to light by default if not already set
  const currentTheme = await page.evaluate(() => {
    // If there's no theme saved in localStorage, default to light
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    return localStorage.getItem("theme");
  });
  expect(currentTheme).toBe("light");

  // Verify the page starts with light theme
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  // Click the theme toggle button to switch to dark mode
  await page.click('.theme-toggle-btn'); // Assuming this is the class of the button

  // Wait for the page to apply the dark theme
  await page.waitForTimeout(500); // Small wait for theme change

  // Verify the theme has changed to dark
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Verify the theme is persisted in localStorage
  const darkTheme = await page.evaluate(() => localStorage.getItem("theme"));
  expect(darkTheme).toBe("dark");

  // Click the theme toggle button again to switch back to light mode
  await page.click('.theme-toggle-btn');

  // Wait for the page to apply the light theme again
  await page.waitForTimeout(500); // Small wait for theme change

  // Verify the theme has switched back to light
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  // Verify the theme is persisted back to light mode in localStorage
  const lightTheme = await page.evaluate(() => localStorage.getItem("theme"));
  expect(lightTheme).toBe("light");
});
