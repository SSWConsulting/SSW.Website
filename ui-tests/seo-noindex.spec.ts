import test, { expect } from "@playwright/test";

test("🔎 Page cannot be indexed, 'noindex' header found!", async ({
  page,
  baseURL,
}) => {
  const response = await page.request.get(baseURL);
  const headers = await response.headers();
  const x_robot_tag = headers["x-robots-tag"];
  expect(x_robot_tag).toEqual("noindex");
});
