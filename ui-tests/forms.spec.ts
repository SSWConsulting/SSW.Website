import { expect, test } from "@playwright/test";
import { FORM_INPUT_IDS, SUCCESS_MESSAGE } from "../components/util/constants";

const TEST_PAYLOAD = {
  Name: "🧪 Test",
  Topic: "Consulting enquiry - Testing",
  Company: "Test",
  Note: process.env.SECRET_KEY_TO_BYPASS_RECAPTCHA ?? "Test",
  Country: "Australia",
  State: "100000001",
  Email: "testing@gmail.com",
  Phone: "000000000000",
  ReferralSource: "14",
};

test("Submit Enquiry Form", async ({ page }) => {
  await page.goto(process.env.TARGET_URL);

  await page.click("#bookingButton");
  await page.fill("#" + FORM_INPUT_IDS.FullName, TEST_PAYLOAD.Name);
  await page.fill("#" + FORM_INPUT_IDS.Email, TEST_PAYLOAD.Email);
  await page.fill("#" + FORM_INPUT_IDS.Phone, TEST_PAYLOAD.Phone);
  await page.selectOption("#" + FORM_INPUT_IDS.Location, TEST_PAYLOAD.Country);
  await page.fill("#" + FORM_INPUT_IDS.Company, TEST_PAYLOAD.Company);
  await page.selectOption("#" + FORM_INPUT_IDS.States, TEST_PAYLOAD.State);
  await page.selectOption(
    "#" + FORM_INPUT_IDS.ReferralSource,
    TEST_PAYLOAD.ReferralSource
  );
  await page.fill("#" + FORM_INPUT_IDS.Note, TEST_PAYLOAD.Note);
  await page.click("#bookingForm-submit");

  const successToast = "#success-toaster";
  await page.waitForSelector(successToast);
  const toastElement = await page.locator(successToast).first();
  const toastText = await toastElement.textContent();

  await expect(toastText).toBe(SUCCESS_MESSAGE);
});
