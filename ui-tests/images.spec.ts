import test, { expect } from "@playwright/test";

test("All images loaded successfully", async ({ page }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(!(response.status() >= 400)).toBeTruthy();
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await page.waitForSelector("[data-testid='clientLogos']");
  await page.getByTestId("clientLogos").scrollIntoViewIfNeeded();
});
