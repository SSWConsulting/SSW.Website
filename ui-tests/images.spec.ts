import test, { expect } from "@playwright/test";

test("Images load successfully on index", async ({ page }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(response.status() < 400).toBeTruthy();
    }
  });

  const response = await page.goto("/", { waitUntil: "load" });
  expect(response.ok()).toBeTruthy();

  // Taken from https://github.com/microsoft/playwright/issues/19277
  const sizes = await page.evaluate(() => {
    return {
      browserHeight: window.innerHeight,
      pageHeight:
        document.body.scrollHeight || document.documentElement.scrollHeight,
    };
  });

  for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    await page.mouse.wheel(0, i);
    await page.waitForTimeout(1000);
  }
});

test("Images load successfully on consulting page", async ({ page }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(response.status() < 400).toBeTruthy();
    }
  });

  const response = await page.goto("/consulting/react", {
    waitUntil: "load",
  });
  expect(response.ok()).toBeTruthy();

  // Taken from https://github.com/microsoft/playwright/issues/19277
  const sizes = await page.evaluate(() => {
    return {
      browserHeight: window.innerHeight,
      pageHeight:
        document.body.scrollHeight || document.documentElement.scrollHeight,
    };
  });

  for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    await page.mouse.wheel(0, i);
    await page.waitForTimeout(1000);
  }
});
