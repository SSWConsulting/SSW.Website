import test, { expect } from "@playwright/test";

test("No index header not present", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await page.on("response", async (response) => {
    expect(response.ok()).toBeTruthy();

    const robots = await response.headerValue("X-Robots-Tag");
    expect(robots).toBeFalsy();
  });
});
