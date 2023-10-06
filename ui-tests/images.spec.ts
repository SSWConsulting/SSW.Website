import test, { expect } from "@playwright/test";

test("Images load successfully on index", async ({ page }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(!(response.status() >= 400)).toBeTruthy();
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await page.waitForSelector("[data-testid='clientLogos']");
  await page.getByTestId("clientLogos").scrollIntoViewIfNeeded();
});

test("Images load successfully on consulting page", async ({ page }) => {
  await page.on("response", (response) => {
    if (response.request().resourceType() === "image") {
      expect(!(response.status() >= 400)).toBeTruthy();
    }
  });

  await page.goto("/consulting/react", { waitUntil: "networkidle" });

  await page.waitForSelector("[data-testid='technologyCards']");
  await page.getByTestId("technologyCards").scrollIntoViewIfNeeded();
});
