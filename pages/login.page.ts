import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Đăng nhập' });
  }

  async goto() {
    await this.page.goto('https://material.playwrightvn.com/12-dom-nested.html');
  }

  async login(email: string, pass: string) {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, pass);
    await this.clickElement(this.loginButton);
  }
}
