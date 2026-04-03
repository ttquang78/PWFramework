import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import * as allure from 'allure-js-commons';

// 1. Định nghĩa kiểu dữ liệu cho các Page của bạn
type MyFixtures = {
  loginPage: LoginPage;
};

// 2. Mở rộng (Extend) hàm test mặc định của Playwright
export const test = base.extend<MyFixtures>({
  // Mở rộng fixture 'page' để thêm các hành động mặc định
  page: async ({ page }, use, testInfo) => {
    // --- PHẦN SETUP (Tương đương beforeEach) ---
    const folderName = testInfo.file.split('/').slice(-2, -1)[0];
    await allure.feature(folderName);

    console.log(`[Setup] Đang đi tới trang Login cho: ${testInfo.title}`);

    // Tự động đi tới trang login (lấy URL từ biến môi trường hoặc hằng số)
    await page.goto(process.env.BASE_URL!);

    // Chạy nội dung bài test
    await use(page);

    // --- PHẦN TEARDOWN (Tương đương afterEach) ---
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Screenshot_Failure', {
        body: screenshot,
        contentType: 'image/png',
      });
      console.log(`[Teardown] ❌ Test lỗi, đã đính kèm ảnh chụp màn hình.`);
    }
  },
  loginPage: async ({ page }, use) => {
    // Khởi tạo LoginPage và đưa vào "use" để file test sử dụng
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
