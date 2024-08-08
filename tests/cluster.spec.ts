import { test, expect } from "@playwright/test";

test("has correct title", async ({ page }) => {
  await page.goto("http://localhost:5173/clustering/");

  await expect(page).toHaveTitle("Chicago Traffic Accidents Clustering");
});

test("it prints current parameters", async ({ page }) => {
  await page.goto("http://localhost:5173/clustering/?size=1000&distance=450");

  await expect(page.locator("span.size")).toHaveText("1000");
  await expect(page.locator("span.distance")).toHaveText("450");
});
