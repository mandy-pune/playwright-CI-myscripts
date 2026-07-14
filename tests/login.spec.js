import { test, expect } from '@playwright/test';

test('Login and verify dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*dashboard.*/);
  await page.waitForTimeout(10000); // Wait for the dashboard to load
  await expect(page.locator('text=Buzz Latest Posts')).toBeVisible();
});



