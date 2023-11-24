import test, { expect } from "@playwright/test";

test("No index header not present", async ({ page }) => {
  const response = await page.goto("/", {
    waitUntil: "networkidle",
  });
  expect(response.ok()).toBeTruthy();
  expect(await response.allHeaders["X-Robots-Tag"]).toEqual("noindex");
});
