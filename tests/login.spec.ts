import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: 'vworwan@gmail.com',
  password: 'vpp120718',
};

const URL = 'https://mek-web-dev.mekstack.com/';

test.describe('Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.getByRole('textbox', { name: 'อีเมล' }).fill(TEST_USER.email);
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill(TEST_USER.password);
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).press('Enter');

    await expect(page.locator('div').filter({ hasText: 'สั่งงาน AI ของคุณธุรกิจ:' }).nth(4)).toBeVisible();
  });

  test('should display AI dashboard after login', async ({ page }) => {
    await page.goto(URL);
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.getByRole('textbox', { name: 'อีเมล' }).fill(TEST_USER.email);
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill(TEST_USER.password);
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).press('Enter');

    const dashboard = page.locator('div').filter({ hasText: 'สั่งงาน AI ของคุณธุรกิจ:' }).nth(4);
    await expect(dashboard).toBeVisible();
    await dashboard.click();
  });
});