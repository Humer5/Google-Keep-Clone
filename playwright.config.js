// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* ✅ Update baseURL to match your app’s port */
    baseURL: 'http://localhost:3000', // Change this to your app's running port

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* ✅ Enable web server so Playwright starts your app before testing */
  webServer: {
    command: 'npm run dev', // Starts your app
    url: 'http://localhost:3000', // Use the correct port
    reuseExistingServer: !process.env.CI, // Avoids restarting if already running
  },
});

