import { expect, test } from "@playwright/test";

test("Can submit the booking form", async ({ page }) => {
  await page.goto("/consulting/angular", { waitUntil: "networkidle" });

  await page
    .getByRole("button")
    .getByText("Book a FREE Initial Meeting")
    .first()
    .click();

  await page.waitForSelector(".react-responsive-modal-root form");

  // note: preference would be to reference by label, but the names aren't consistent with the field names
  // note: getByPlaceholder is doing a partial match (the asterisks are hardcoded into the placeholder text) 🤮
  await page.getByPlaceholder("your full name").fill("🧪 Test");
  await page.getByPlaceholder("your email").fill("amankumar@ssw.com.au");
  await page.getByPlaceholder("your phone").fill("0000000000");
  await page.locator("select[name='location']").selectOption("Australia"); // placeholder looks like location, but its actually an unselectable option
  await page.locator("select[name='states']").selectOption("100000001");
  await page.getByPlaceholder("your company").fill("Test");
  await page.locator("select[name='referralSource']").selectOption("14");
  await page
    .getByPlaceholder("how can we help you")
    .fill(
      `<br><br>Hi Account Managers,<br><br> This is a weekly test email to verify that the create lead flow is working. ${
        process.env.RECAPTCHA_BYPASS_SECRET ?? "No Key found"
      }`
    );

  await page.locator("button[type='submit']").first().click();

  const successToastId = "#success-toaster";
  await page.waitForSelector(successToastId);
  const toastElement = await page.locator(successToastId).first();
  const toastText = await toastElement.textContent();

  await expect(toastText).toBe(
    "Form submitted. We'll be in contact as soon as possible."
  );
});
