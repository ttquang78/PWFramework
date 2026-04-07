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

test('learn locators - Lesson 1', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/index.html');

  await page.getByRole('link', { name: 'Bài học 1: Register Page (có đủ các element)' }).click();
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username:' }).fill('Quang Tran');
  await expect(page.getByRole('textbox', { name: 'Username:' })).toHaveValue('Quang Tran');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('greenlightceiling@gmail.com');
  await page.getByRole('radio', { name: 'Female' }).check();
  await page.getByLabel('Interests:').selectOption('art');
  await page.getByLabel('Country:').selectOption('uk');
  await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('2026-04-18');

  const profileInput = page.getByLabel('Profile Picture:');
  await profileInput.setInputFiles('test-data/sample.json');
  await expect(profileInput).toHaveValue(/sample\.json$/);

  await page.getByRole('textbox', { name: 'Biography:' }).click();
  await page.getByRole('textbox', { name: 'Biography:' }).fill('I type here');
  await page.getByRole('slider', { name: 'Rate Us:' }).fill('8');

  const favoriteColorInput = page.locator('#favcolor');
  await favoriteColorInput.fill('#36c969');
  await expect(favoriteColorInput).toHaveValue('#36c969');

  await page.getByLabel('Subscribe').check();
  await expect(page.getByLabel('Subscribe')).toBeChecked();

  const starRating = page.locator('#starRating');
  await starRating.click({ position: { x: 80, y: 10 } });
  await expect(page.locator('#starRatingValue')).not.toHaveText('0');

  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('2026-04-16');

  await starRating.click({ position: { x: 60, y: 10 } });
  await expect(page.locator('#starRatingValue')).not.toHaveText('0');

  await page.getByRole('button', { name: 'Register' }).click();

  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('link', { name: 'Trở về trang chủ' }).click();
  await expect(page.getByRole('heading', { name: 'Tài liệu học automation test' })).toBeVisible();
  // await page.pause();
});
