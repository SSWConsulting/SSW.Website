import { expect, test } from "@playwright/test";

const TEST_PAYLOAD = {
  Name: "🧪 Test",
  Topic: "Consulting enquiry - Testing",
  Company: "Test",
  Note:
    "<br><br>Hi Account Managers,<br><br> This is a weekly test email to verify that the create lead flow is working." +
      process.env.SECRET_KEY_TO_BYPASS_RECAPTCHA ?? "No Key found",
  Country: "Australia",
  State: "100000001",
  Email: "amankumar@ssw.com.au",
  Phone: "0000000000",
  ReferralSource: "14",
};

export const LEAD_FORM = {
  FullName: "fullName",
  Email: "email",
  Phone: "phone",
  Location: "location",
  States: "states",
  Note: "note",
  Company: "company",
  ReferredCompany: "referredCompany",
  None: "",
  ReferralSource: "referralSource",
};

const successToastId = "#success-toaster";
const route = "/consulting/angular";

test("Submit Enquiry Form", async ({ page }) => {
  await page.goto(process.env.HOST_URL ?? "http://localhost:3000" + route);

  await page
    .getByRole("button")
    .getByText("Book a FREE Initial Meeting")
    .first()
    .click();

  await page
    .locator(`input[name="${LEAD_FORM.FullName}"]`)
    .fill(TEST_PAYLOAD.Name);

  await page
    .locator(`input[name="${LEAD_FORM.Email}"]`)
    .fill(TEST_PAYLOAD.Email);

  await page
    .locator(`input[name="${LEAD_FORM.Phone}"]`)
    .fill(TEST_PAYLOAD.Phone);

  await page
    .locator(`select[name="${LEAD_FORM.Location}"]`)
    .selectOption(TEST_PAYLOAD.Country);

  await page
    .locator(`input[name="${LEAD_FORM.Company}"]`)
    .fill(TEST_PAYLOAD.Company);

  await page
    .locator(`input[name="${LEAD_FORM.Company}"]`)
    .fill(TEST_PAYLOAD.Company);

  await page
    .locator(`select[name="${LEAD_FORM.States}"]`)
    .selectOption(TEST_PAYLOAD.State);

  await page
    .locator(`select[name="${LEAD_FORM.ReferralSource}"]`)
    .selectOption(TEST_PAYLOAD.ReferralSource);

  await page
    .locator(`textarea[name="${LEAD_FORM.Note}"]`)
    .fill(TEST_PAYLOAD.Note);

  await page.locator("button[type='submit']").first().click();

  await page.waitForSelector(successToastId);
  const toastElement = await page.locator(successToastId).first();
  const toastText = await toastElement.textContent();

  await expect(toastText).toBe(
    "Form submitted. We'll be in contact as soon as possible."
  );
});
