import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // 1. Cấu hình mặc định cho TypeScript
  ...tseslint.configs.recommended,

  // 2. Cấu hình riêng cho Playwright
  {
    files: ['tests/**/*.ts', 'specs/**/*.ts'], // Chỉ áp dụng cho file test
    ...playwright.configs['flat/recommended'],
    plugins: {
      playwright,
      prettier: prettierPlugin, // Đăng ký plugin prettier
    },
    rules: {
      'playwright/no-wait-for-timeout': 'warn',
      'prettier/prettier': 'error', // Báo lỗi nếu code không đúng chuẩn Prettier
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // 3. Tắt các quy tắc xung đột (Luôn để ở cuối cùng)
  eslintConfigPrettier,
);
