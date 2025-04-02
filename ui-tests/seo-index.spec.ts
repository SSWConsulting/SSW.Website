import { expect, test } from "@playwright/test";

test("🔎 Page can be indexed, no 'noindex' found", async ({
  page,
  baseURL,
}) => {
  const response = await page.request.get(baseURL);
  const headers = await response.headers();
  const x_robot_tag = headers["x-robots-tag"];

  if (x_robot_tag) {
    expect(x_robot_tag).not.toContain("noindex");
  }
});
