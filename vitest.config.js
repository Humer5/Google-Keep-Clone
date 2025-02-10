import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom for a browser-like environment
    exclude: ["tests/Playwright/**"],
    globals: true,        // Enable global test APIs (like expect, test, etc.)
    // setupFiles: './test/setup.js',
    coverage: {
      provider: 'c8',  // Optional: Coverage configuration
      reporter: ['text', 'html'], // Optional: Coverage reporters
      all: true,        // Optional: Collect coverage for all files
    },
  },
  css: {
    modules: false, // Ensure CSS files don't cause errors
  },
  watch: true, // Ensure this is outside "test"
});
