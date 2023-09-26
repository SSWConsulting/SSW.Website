import { expect, test } from "@playwright/test";
import { FORM_INPUT_IDS } from "../components/util/constants";

const consultingPage = "http://localhost:3000/consulting/angular";

test("Create Lead Flow", async ({ page }) => {
  await page.goto(consultingPage);

  await page.click("#bookingButton");
  await page.fill("#" + FORM_INPUT_IDS.FullName, test_payload.Name);
  await page.fill("#" + FORM_INPUT_IDS.Email, test_payload.Email);
  await page.fill("#" + FORM_INPUT_IDS.Phone, test_payload.Phone);
  await page.selectOption("#" + FORM_INPUT_IDS.Location, test_payload.Country);
  await page.fill("#" + FORM_INPUT_IDS.Company, test_payload.Company);
  await page.selectOption("#" + FORM_INPUT_IDS.States, test_payload.State);
  await page.selectOption(
    "#" + FORM_INPUT_IDS.ReferralSource,
    test_payload.ReferralSource
  );
  await page.fill("#" + FORM_INPUT_IDS.Note, test_payload.Note);
  await page.click("#bookingForm-submit");

  const successToast = "#success-toaster";
  await page.waitForSelector(successToast);
  const toastElement = await page.locator(successToast).first();
  const toastText = await toastElement.textContent();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    /Enterprise Development and Consulting for Angular Apps/
  );

  await expect(toastText).toBe(
    "Form submitted. We'll be in contact as soon as possible."
  );
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });

const test_payload = {
  Name: "🧪 Test",
  Topic: "Consulting enquiry - Testing",
  Company: "Test",
  Note: "<br><br>Hi Account Managers,<br><br> This is a weekly test email to verify that the create lead flow is working.",
  Country: "Australia",
  State: "100000001",
  Email: "testing@gmail.com",
  Phone: "000000000000",
  Recaptcha: "Testing",
  EmailBody: "Testing",
  ReferralSource: "14",
};
