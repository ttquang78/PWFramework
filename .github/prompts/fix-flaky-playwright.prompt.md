---
name: Fix Flaky Playwright Test
description: Diagnose and fix flaky Playwright tests using this repo's fixtures, page objects, and locator conventions
argument-hint: Test file, test name, failure symptom, or reproduction notes
agent: agent
---

Investigate and fix a flaky Playwright test in this workspace.

Use the project rules in [workspace instructions](../copilot-instructions.md).

Task input:

- The user may provide a test file, a test name, a failure message, reproduction steps, or all of them.

Workflow:

1. Identify the failing or flaky test and inspect the related test file, page objects, fixtures, and Playwright configuration.
2. Reproduce the problem with the narrowest useful command, such as `npm test -- --grep "..."` or another repo-appropriate Playwright command.
3. Find the root cause. Prioritize unstable locators, timing issues, shared state leakage, missing fixture setup, incorrect tab handling, and environment assumptions.
4. Fix the issue using existing project patterns:
   - Prefer `getByRole`, `getByLabel`, and other accessibility-oriented locators.
   - Reuse or extend `BasePage` and shared fixtures before adding duplicate logic.
   - Keep assertions in spec files unless an assertion helper already exists.
   - Do not add hard waits or `waitForTimeout`; use explicit waits or better state synchronization.
5. Run the narrowest relevant verification after the change.
6. Summarize the root cause, the fix, and any residual risk.

Constraints:

- Keep the fix minimal and consistent with the current Playwright page-object structure.
- Do not hardcode environment-specific URLs or credentials.
- If the flakiness cannot be reproduced, still inspect for likely timing and locator risks and explain what you validated.
