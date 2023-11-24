import test, { expect } from "@playwright/test";

test("No index header not present", async ({ page }) => {
  await page.on("response", async (response) => {
    expect(await response.allHeaders["X-Robots-Tag"]).toBeFalsy();
  });

  const response = await page.goto("/", {
    waitUntil: "networkidle",
  });
  expect(response.ok()).toBeTruthy();
});
