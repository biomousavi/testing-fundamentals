import { test, expect, Page } from "@playwright/test";

test("has correct title", async ({ page }) => {
  const cluster = new ClusterPage(page);

  await cluster.goto();

  await expect(cluster.title).resolves.toMatch(
    "Chicago Traffic Accidents Clustering"
  );
});

test("it prints current parameters", async ({ page }) => {
  const size = 1000;
  const distance = 540;

  const cluster = new ClusterPage(page);
  await cluster.goto(size, distance);

  await expect(cluster.size).toHaveText(size.toString());
  await expect(cluster.distance).toHaveText(distance.toString());
});

test("it should return validation error when out of bound parameters passed", async ({
  page,
}) => {
  const cluster = new ClusterPage(page);
  await cluster.goto();

  await cluster.setDistance(1);
  await cluster.submit();

  await expect(cluster.distanceError).toHaveText(
    "Distance must be at least 100"
  );
});

class ClusterPage {
  constructor(private page: Page) {}

  get distanceError() {
    return this.page.locator(".error.distance");
  }

  async submit() {
    await this.page.click("button[type=submit]");
  }

  async setDistance(distance: number) {
    await this.page.fill("input[name=distance]", distance.toString());
  }

  async goto(size = 1000, distance = 450) {
    const url = new URL("http://localhost:5173/clustering/");

    if (size) url.searchParams.set("size", size.toString());
    if (distance) url.searchParams.set("distance", distance.toString());

    await this.page.goto(url.toString());
  }

  get title() {
    return this.page.title();
  }

  get size() {
    return this.page.locator("span.size");
  }

  get distance() {
    return this.page.locator("span.distance");
  }
}
