import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Hàm điều hướng chung
  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Hàm click an toàn (đợi phần tử hiển thị mới click)
  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Hàm điền dữ liệu (xóa dữ liệu cũ trước khi điền)
  async fillField(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  // Hàm đợi một phần tử biến mất (ví dụ: loading spinner)
  async waitForElementToHidden(locator: Locator) {
    await locator.waitFor({ state: 'hidden' });
  }

  // Hàm verify văn bản hiển thị chính xác
  async verifyElementText(locator: Locator, expectedText: string) {
    await expect(locator).toHaveText(expectedText);
  }

  // Hàm lấy tiêu đề trang hiện tại
  async getPageTitle() {
    return await this.page.title();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
