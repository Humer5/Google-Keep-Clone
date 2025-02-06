import { test, expect } from "@playwright/test";

test("Navbar, Sidebar, and Notebox should be visible", async ({ page }) => {
  // Navigate to layout page (assuming user is already logged in)
  await page.goto("http://localhost:3000/layout");

  // Verify if the navbar is visible
  const navbar = page.locator('.navbar'); // Replace with the actual selector for navbar
  await expect(navbar).toBeVisible();

  // Verify if the sidebar is visible
  const sidebar = page.locator('.sidebar'); // Replace with the actual selector for sidebar
  await expect(sidebar).toBeVisible();

  // Verify if the notebox is visible
  const notebox = page.locator('.notebox'); // Replace with the actual selector for notebox
  await expect(notebox).toBeVisible();
});
