# Project Guidelines

## Code Style

- Follow the existing formatter and lint setup: semicolons, single quotes, trailing commas, and a 100 character line width.
- Keep Playwright test code in TypeScript, and keep k6 load tests as JavaScript files under `load-tests/`.
- Prefer small helper methods in page objects over repeating raw page interactions in test files.

## Architecture

- Keep Playwright tests under `tests/` and group them by feature, for example `tests/auth/`.
- Put reusable browser interaction logic in page objects under `pages/`.
- New page objects should extend `BasePage` from `pages/base.page.ts` and reuse its helpers before adding duplicate logic.
- Reuse shared fixtures from `pages/fixtures.ts` when tests need common setup, page objects, or tab handling.

## Build and Test

- Run Playwright tests with `npm test` or a narrower script such as `npm run test:smoke` when a task only affects a subset of tests.
- Environment-specific Playwright runs use `ENV` with the existing `.env.test`, `.env.stg`, and `.env.prod` files.
- Run the sample k6 load test with `npm run load-demo`.

## Conventions

- Prefer accessibility-oriented Playwright locators such as `getByRole`, `getByLabel`, and `getByText` before falling back to CSS or XPath selectors.
- Avoid hard waits and `waitForTimeout`; use explicit waits on locators, assertions, navigation, or network state instead.
- Keep assertions in spec files. Page objects should focus on navigation and user actions unless an assertion helper already exists in `BasePage`.
- When a test needs common setup or teardown behavior, add it to fixtures instead of duplicating it across spec files.
- Preserve the current environment-driven configuration model instead of hardcoding base URLs or credentials in tests.
- For k6 scripts, keep reusable load scenarios under `load-tests/` and include meaningful checks, thresholds, and staged load profiles rather than bare request loops.
