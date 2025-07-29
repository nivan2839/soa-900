import { test, expect } from '@playwright/test';

test('user can generate and submit answers', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.fill('input[placeholder="Grade"]', '5');
  await page.fill('input[placeholder="Topic"]', 'Addition');
  await page.click('text=Generate Questions');

  // Wait for questions to appear
  await page.waitForTimeout(10000);

  // Fill all answers

  await page.fill('input[placeholder="Your Name"]', 'Alice');
  await page.fill('input[placeholder="Professor Email"]', 'prof@example.com');
  await page.click('text=Submit Answers');

  await expect(page.locator('text=Your score is')).toBeVisible();
});
