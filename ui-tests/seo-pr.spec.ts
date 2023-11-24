import test, { expect } from "@playwright/test";

test("No index header present", async ({ page }) => {
  const response = await page.goto("/", {
    waitUntil: "networkidle",
  });
  expect(response.ok()).toBeTruthy();

  await page.on("response", async (response) => {
    expect(await response.allHeaders["X-Robots-Tag"]).toEqual("noindex");
  });
});
