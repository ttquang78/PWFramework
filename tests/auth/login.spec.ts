import { test, expect } from '../../pages/fixtures';

test('Đăng nhập thành công với tài khoản hợp lệ', async ({ loginPage }) => {
  await loginPage.goto();
  // await loginPage.login('user@example.com', '123456');

  // Kiểm tra kết quả (Assertion)
  // await expect(loginPage.page).toHaveURL(/dashboard/);
});
