import { test, expect } from '@playwright/test';

test('Assertions Demo Test', async ({ page }) => {

    await page.goto('https://kitchen.applitools.com/');
    await page.pause(); // Pause the test execution to inspect the page

    await expect(page.locator('text=The Kitchen')).toHaveCount(1);
    await expect(page.locator('text=The Kitchen')).toBeVisible();
    await expect(page.locator('text=The Kitchen')).toBeEnabled();

    await expect.soft(page.locator('text=The Kitchen')).toHaveText('The Kitchen');

    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    await expect(page.locator('text=The Kitchen')).not.toHaveText('ABCD');

    await page.screenshot({ path: 'screenshot.png' });

    await expect(page).toHaveURL(/kitchen.applitools.com/);
    await expect(page).toHaveTitle(/Kitchen/);

    //FIXED LINE ONLY
    //await expect(page.locator('.balance').first()).toContainText('$');
    await expect(page.locator('text=The Kitchen')).toBeVisible();
await expect(page).toHaveScreenshot();

});