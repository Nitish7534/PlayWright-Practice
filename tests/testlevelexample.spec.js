import { test, expect, chromium } from '@playwright/test';

test('SauceDemo Test Level (Intentional Failure)', async () => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  try {
    console.log('Opening SauceDemo...');
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('wrong_user');
    await page.locator('#password').fill('wrong_pass');

    await page.locator('#login-button').click();

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();

    // ❌ Intentional failure
    await expect(errorMsg).toContainText('Invalid text for failure');

  } finally {
    // ✅ This WILL run even if test fails
    await context.close();
    await browser.close();
  }
});