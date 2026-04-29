import { test, expect } from '@playwright/test';

/*
  Global Hooks
  These run across the entire test file
*/

// Runs once before all tests
test.beforeAll(async () => {
  console.log('Test suite execution started');
});

// Runs once after all tests
test.afterAll(async () => {
  console.log('Test suite execution finished');
});

// Runs before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.waitForLoadState('domcontentloaded');
});

// Runs after each test
test.afterEach(async () => {
  console.log('Test execution completed');
});


/*
  Login Feature Tests
  Covers positive and negative login scenarios
*/

test.describe('Login Feature', () => {

  test('User should login with valid credentials', async ({ page }) => {

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });

  test('User should see error message with invalid credentials', async ({ page }) => {

    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

});


/*
  Product Feature Tests
  Includes actions related to inventory page
*/

test.describe('Product Feature', () => {

  // Login before each test in this group
  test.beforeEach(async ({ page }) => {

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });

  test('User should be able to add a product to the cart', async ({ page }) => {

    await page.click('.inventory_item button');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Product list should be visible on inventory page', async ({ page }) => {

    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

});


/*
  Cart Feature Tests
  Verifies cart functionality
*/

test.describe('Cart Feature', () => {

  // Setup: login and add item to cart before each test
  test.beforeEach(async ({ page }) => {

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');
  });

  test('Added product should be visible in cart', async ({ page }) => {

    await expect(page.locator('.cart_item')).toBeVisible();
  });

});


/*
  Logout Feature Tests
*/

test.describe('Logout Feature', () => {

  // Login before logout test
  test.beforeEach(async ({ page }) => {

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('User should be able to logout successfully', async ({ page }) => {

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL(/saucedemo/);
  });

});


/*
  Standalone Test
  Simple smoke test without grouping
*/

test('Login page should load successfully', async ({ page }) => {

  await expect(page.locator('#login-button')).toBeVisible();
});