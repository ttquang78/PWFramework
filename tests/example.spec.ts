import { test, expect } from '@playwright/test';

test('has title', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');

  // Chụp ảnh màn hình đính kèm vào báo cáo ok
  const screenshot = await page.screenshot();
  await testInfo.attach('Screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
