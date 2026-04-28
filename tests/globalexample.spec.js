import { test, expect } from '@playwright/test';

test.describe('SauceDemo Global Tests', () => {

  test.beforeEach(async ({ page }) => {
    console.log('Opening SauceDemo...');
    await page.goto('/');
  });

  test('Valid Login', async ({ page }) => {

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Invalid Login (Intentional Failure)', async ({ page }) => {

    await page.locator('#user-name').fill('wrong_user');
    await page.locator('#password').fill('wrong_pass');

    await page.locator('#login-button').click();

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();

    // ❌ INTENTIONAL BREAK
    await expect(errorMsg).toContainText('This text is wrong');
  });

});