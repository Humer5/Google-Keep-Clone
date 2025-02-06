import { test, expect } from "@playwright/test";

test("User should be able to sign up successfully", async ({ page }) => {
  // Go to the login page
  await page.goto("http://localhost:3000/");

  // Click the "Sign Up" link to switch to the signup form
  await page.click('text=Don\'t have an account? Sign up!');

  // Fill in the signup form
  await page.fill('input[type="email"]', "testuser@example.com");
  await page.fill('input[type="password"]', "Test@1234");

  // Click the signup button
  await page.click('button:has-text("Sign Up")');

  // Ensure the user is redirected to the layout page
  await expect(page).toHaveURL("http://localhost:3000/layout");

  // Verify the user is saved in localStorage
  const users = await page.evaluate(() => JSON.parse(localStorage.getItem("users")));
  expect(users).toBeTruthy();
  expect(users.some(user => user.email === "testuser@example.com")).toBeTruthy();

  // Ensure loggedIn flag is set
  const isLoggedIn = await page.evaluate(() => localStorage.getItem("loggedIn"));
  expect(isLoggedIn).toBe("true");
});
