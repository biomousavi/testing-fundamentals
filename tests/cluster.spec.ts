import { test, expect } from "@playwright/test";

test("has correct title", async ({ page }) => {
  await page.goto("http://localhost:5173/clustering/");

  await expect(page).toHaveTitle("Chicago Traffic Accidents Clustering");
});
