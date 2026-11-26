import { expect, test, type Page } from "@playwright/test";

async function officeHeader(page: Page, slug: string) {
  const response = await page.request.get(`/offices/${slug}`);
  expect(response.ok()).toBe(true);
  return page.evaluate(
    (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const heading = doc.querySelector("header h1");
      const header = heading?.closest("header");
      const directions = header?.querySelector("a[href='#Directions']");
      return {
        name: heading?.textContent,
        hours: Array.from(header?.querySelectorAll("p") ?? []).find((p) =>
          p.textContent.startsWith("Opening hours:")
        )?.textContent,
        link: directions?.textContent,
        target: doc.getElementById("Directions")?.textContent,
      };
    },
    await response.text()
  );
}

test("Newcastle publishes opening hours and a link to its directions section", async ({
  page,
}) => {
  const office = await officeHeader(page, "newcastle");
  expect(office.link).toContain("Get directions");
  expect(office.target).toContain("Newcastle");
  expect(office.hours).toBe("Opening hours: Monday - Friday, 9am - 6pm AEDT");
});

test("Strasbourg omits opening hours when its schedule is unavailable", async ({
  page,
}) => {
  const office = await officeHeader(page, "strasbourg");
  expect(office.name).toBe("SSW France Office");
  expect(office.hours).toBeUndefined();
});
