// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  timeout: 30000, // Global timeout for each test (30 sec)

  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true, // Run all tests in parallel

  // Fail build if test.only is left in code (CI safety)
  forbidOnly: !!process.env.CI,

  // Retry only in CI
  retries: process.env.CI ? 2 : 0,

  // Use single worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: 'html',

  // Shared settings for all tests
  use: {

    // Base URL (optional)
    // baseURL: 'http://localhost:3000',

    // 🎥 Record video on failure
    video: 'retain-on-failure',

    // 🐢 Slow down execution
    launchOptions: {
      slowMo: 1000,
    },

    // 🔍 Trace on retry
    trace: 'on-first-retry',
   baseURL: 'https://www.saucedemo.com/',
  },

  // Cross-browser configuration
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing (optional)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Branded browsers (optional)
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Local dev server (optional)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});