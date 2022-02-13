const { test, expect } = require('@playwright/test')

test('store is working', async ({ page }) => {
  await page.goto('/page-one')
  await expect(page.locator('#count')).toContainText('0')
})
