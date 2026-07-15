import { test, expect } from '@playwright/test';

test('Add and verify new user Nandu123', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin12345');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByText('System Users', { exact: false })).toBeVisible();

  await page.getByRole('button', { name: 'Add' }).click();

  // Select User Role = ESS
  await page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-wrapper').click();
  await page.getByRole('option', { name: 'ESS' }).click();

  // Enter Employee Name and select suggestion
  const empInput = page.locator('input[placeholder="Type for hints..."]');
  await empInput.fill('Admin');
  waituntil(async () => {
    const suggestions = await page.$$('.oxd-autocomplete-option');
    return suggestions.length > 0;
  }, 10000);


  await page.waitForSelector('.oxd-autocomplete-option', { timeout: 90000 });
  const suggestion = page.locator('.oxd-autocomplete-option').first();
  await suggestion.click();

  // Select Status = Enabled
  await page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-wrapper').click();
  await page.getByRole('option', { name: 'Enabled' }).click();

  // Username and passwords
  await page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input').fill('Nandu123');
  await page.locator('input[type="password"]').nth(0).fill('admin123');
  await page.locator('input[type="password"]').nth(1).fill('admin123');

  await page.getByRole('button', { name: 'Save' }).click();

  // Wait for save confirmation
  await expect(page.locator('text=Successfully Saved')).toBeVisible({ timeout: 15000 });

  // After save, go to System Users list and search for the new user
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input').fill('Nandu123');
  await page.getByRole('button', { name: 'Search' }).click();

  // Verify user appears in results table
  const userCell = page.locator('.oxd-table-cell').filter({ hasText: 'Nandu123' }).first();
  await expect(userCell).toBeVisible({ timeout: 15000 });
});
