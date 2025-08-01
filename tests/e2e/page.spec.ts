import { test, expect } from '@playwright/test';

test('intercepts /api/gen and mocks questions', async ({ page }) => {
  // Intercept the request before navigating
  await page.route('**/api/gen', async route => {
    const mockResponse = {
      questions: [
        'What is 2 + 2?',
        'What is 5 x 5?',
        'What is the capital of France?',
        'Solve 10 / 2',
        'Name a prime number',
        'What is 3 squared?',
        'Who wrote Hamlet?',
        'What is 9 - 4?',
        'Simplify 4/2',
        'What is 100 in binary?'
      ]
    };

    // Fulfill the request with mocked JSON
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Navigate to the page after intercept is set
  await page.goto('http://localhost:3000');

  // Fill inputs
  await page.fill('input[placeholder="Grade"]', '5');
  await page.fill('input[placeholder="Topic"]', 'Math');
  await page.click('text=Generate Questions');

  // Verify that the mocked questions appear
  await expect(page.locator('text=What is 2 + 2?')).toBeVisible();

  // Optional: Fill answers and submit
  const inputs = await page.$$('input[placeholder="answer"]');
  console.log(inputs)
  for (let i = 0; i < 10; i++) {
    await inputs[i].fill('42');
  }
});
