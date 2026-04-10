import { expect, test } from '@playwright/test';

test('course player loads the main shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter fullscreen' })).toBeVisible();
});

test('course player avoids obvious horizontal overflow', async ({ page }) => {
  await page.goto('/');

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 2;
  });

  expect(hasOverflow).toBeFalsy();
});

test('mobile navigation drawer opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only navigation behavior');

  await page.goto('/');

  const openButton = page.getByRole('button', { name: 'Open course navigation' });
  await expect(openButton).toBeVisible();

  await openButton.click();
  const mobileDrawer = page.locator('#mobile-course-navigation');
  await expect(mobileDrawer).toBeVisible();
  await expect(mobileDrawer.getByTestId('slide-nav-intro')).toBeVisible();

  await mobileDrawer.getByTestId('slide-nav-reflection-checkin').click();
  await expect(page.getByRole('button', { name: 'Open course navigation' })).toBeVisible();
});
