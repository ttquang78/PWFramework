import { test as base, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from './login.page';
import * as allure from 'allure-js-commons';

// 1. Định nghĩa kiểu dữ liệu cho các Page của bạn
type MyFixtures = {
  loginPage: LoginPage;
  waitForNewTab: (action: () => Promise<void>) => Promise<Page>;
  autoCleanup: void; // Khai báo kiểu void vì fixture này tự chạy (auto: true)
};

// 2. Mở rộng (Extend) hàm test mặc định của Playwright
export const test = base.extend<MyFixtures>({
  // Mở rộng fixture 'page' để thêm các hành động mặc định
  page: async ({ page }, use, testInfo) => {
    // --- PHẦN SETUP (Tương đương beforeEach) ---
    // Hack: Ghi đè hàm attachShadow của trình duyệt ngay khi trang khởi tạo
    await page.addInitScript(() => {
      const originalAttachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function (options) {
        // Ép mọi Shadow DOM thành 'open' bất kể web quy định thế nào
        return originalAttachShadow.call(this, { ...options, mode: 'open' });
      };
    });

    const folderName = testInfo.file.split('/').slice(-2, -1)[0];
    await allure.feature(folderName);

    console.log(`[Setup] Đang đi tới trang Login cho: ${testInfo.title}`);

    // Tự động đi tới trang login (lấy URL từ biến môi trường hoặc hằng số)
    await page.goto(process.env.BASE_URL!);

    // Chạy nội dung bài test
    await use(page);

    // // --- PHẦN TEARDOWN (Tương đương afterEach) ---
    // if (testInfo.status !== testInfo.expectedStatus) {
    //   const screenshot = await page.screenshot({ fullPage: true });
    //   await testInfo.attach('Screenshot_Failure', {
    //     body: screenshot,
    //     contentType: 'image/png',
    //   });
    //   console.log(`[Teardown] ❌ Test lỗi, đã đính kèm ảnh chụp màn hình.`);
    // }
  },
  // Tạo một fixture tên là 'waitForNewTab'
  waitForNewTab: async ({ context }: { context: BrowserContext }, use) => {
    const catcher = async (action: () => Promise<void>): Promise<Page> => {
      const pagePromise = context.waitForEvent('page');
      await action();
      return await pagePromise;
    };

    await use(catcher);
  },
  loginPage: async ({ page }, use) => {
    // Khởi tạo LoginPage và đưa vào "use" để file test sử dụng
    await use(new LoginPage(page));
  },
  // Fixture này chạy ngầm để đảm bảo mọi thứ được dọn dẹp
  autoCleanup: [
    async ({ context }, use) => {
      await use(); // Cho phép bài test chạy

      // Logic dọn dẹp sau khi test xong
      const pages = context.pages();
      if (pages.length > 1) {
        for (const extraPage of pages.slice(1)) {
          await extraPage.close().catch(() => {});
        }
      }
    },
    { auto: true }, // Tự động kích hoạt cho mọi test
  ],
});

export { expect } from '@playwright/test';
