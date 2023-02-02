import { test, expect, Page } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await expect(page).toHaveTitle(/JJSWare/);
});

test.describe('sidenav', () => {
  test('can be toggled', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await checkIfSideNavVisible(page, false);

    const toggleButton = page.locator('#toggle-sidenav');
    await toggleButton.click();

    await checkIfSideNavVisible(page, true);

    await toggleButton.click();
    await checkIfSideNavVisible(page, false);
  });

  test('should have same state after reload', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await checkIfSideNavVisible(page, false);

    const toggleButton = page.locator('#toggle-sidenav');
    await toggleButton.click();

    await checkIfSideNavVisible(page, true);

    await page.reload();
    await checkIfSideNavVisible(page, true);
  });
});

test.describe('language', () => {
  test('can be switched', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await checkLanguage(page, 'en');

    await switchLanguage(page, 'de');
    await checkLanguage(page, 'de');

    await switchLanguage(page, 'en');
    await checkLanguage(page, 'en');
  });

  test('should be same after reload', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await checkLanguage(page, 'en');

    await switchLanguage(page, 'de');
    await checkLanguage(page, 'de');

    await page.reload();
    await checkLanguage(page, 'de');
  });
});

async function checkIfSideNavVisible(page: Page, expected: boolean) {
  await expect(page.locator('#sidenav')).toHaveCSS(
    'visibility',
    expected ? 'visible' : 'hidden'
  );
}

async function checkLanguage(page: Page, expected: string) {
  await expect(page.locator('#subtitle')).toContainText(
    expected === 'en' ? 'Software Developer' : 'Softwareentwickler'
  );
}

async function switchLanguage(page: Page, language: string) {
  const menuButton = page.locator('#menu-button');
  const languageButton = page.locator('#language-button');
  const langButton = page.locator(`#${language}-button`);
  await menuButton.click();
  await languageButton.hover();
  await langButton.click();
}
