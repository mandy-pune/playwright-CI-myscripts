import { test, expect } from '@playwright/test';

test('Add employee and verify profile', async ({ page }) => {
  test.setTimeout(180000);

  await page.goto('https://opensource-demo.orangehrmlive.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();
  await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible({ timeout: 20000 });

  await page.getByRole('button', { name: 'Add' }).click();

  await page.locator('input[name="firstName"]').fill('Kane');
  await page.locator('input[name="lastName"]').fill('Cena');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page).toHaveURL(/pim\/viewPersonalDetails/i, { timeout: 30000 });
  await expect(page.getByText('Kane Cena', { exact: true })).toBeVisible({ timeout: 30000 });
});
