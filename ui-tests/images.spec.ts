import test, { expect } from "@playwright/test";

test("Images load successfully on index", async ({ page, browser }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(response.status() < 400).toBeTruthy();
    }
  });

  const response = await page.goto("/", { waitUntil: "commit" });
  expect(response.ok()).toBeTruthy();

  // Taken from https://github.com/microsoft/playwright/issues/19277
  const sizes = await page.evaluate(() => {
    return {
      browserHeight: window.innerHeight,
      pageHeight: document.body.scrollHeight,
    };
  });

  for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    if (browser.browserType().name() === "webkit") {
      await page.touchscreen.tap(0, i);
    } else {
      await page.mouse.wheel(0, i);
    }
    await page.waitForTimeout(100);
  }
});

test("Images load successfully on consulting page", async ({
  page,
  browser,
}) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(response.status() < 400).toBeTruthy();
    }
  });

  const response = await page.goto("/consulting/react", {
    waitUntil: "networkidle",
  });
  expect(response.ok()).toBeTruthy();

  // Taken from https://github.com/microsoft/playwright/issues/19277
  const sizes = await page.evaluate(() => {
    return {
      browserHeight: window.innerHeight,
      pageHeight: document.body.scrollHeight,
    };
  });

  for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    if (browser.browserType().name() === "webkit") {
      await page.touchscreen.tap(0, i);
    } else {
      await page.mouse.wheel(0, i);
    }
    await page.waitForTimeout(100);
  }
});
