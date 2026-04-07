import { test, expect } from '../../pages/fixtures';

test('Đăng nhập thành công với tài khoản hợp lệ', async ({ loginPage }) => {
  await loginPage.goto();
  // await loginPage.login('user@example.com', '123456');

  // Kiểm tra kết quả (Assertion)
  // await expect(loginPage.page).toHaveURL(/dashboard/);

  // get new tab from fixture
  // const newTab = await waitForNewTab(() =>
  //   page.getByRole('link', { name: 'Mở chính sách bảo mật' }).click(),
  // );
  // await loginPage.page.evaluate(() => {
  //   // @ts-expect-error ko can check type cua window
  //   window.shortcutTriggered = false;
  //   window.addEventListener('keydown', (e) => {
  //     // @ts-expect-error ko can check type cua window
  //     if (e.ctrlKey && e.key === 's') window.shortcutTriggered = true;
  //   });
  // });

  // await loginPage.page.keyboard.press('Control+S');
  // // @ts-expect-error ko can check type cua window
  // const isTriggered = await loginPage.page.evaluate(() => window.shortcutTriggered);
  // expect(isTriggered).toBe(true);
});
