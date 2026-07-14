import { test, expect } from '@playwright/test';

test('Verify Admin module access', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Admin' }).click();

  await expect(page.getByText('System Users', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
});