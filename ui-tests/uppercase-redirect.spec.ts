import { expect, test } from "@playwright/test";

test("🔠 Uppercase top-level path is redirected (308) to lowercase", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(`${baseURL}/Consulting`, {
    maxRedirects: 0,
    failOnStatusCode: false,
  });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toMatch(/\/consulting$/);
});

test("🔠 Mixed-case Tina deep segment is preserved (only first segment is normalized)", async ({
  request,
  baseURL,
}) => {
  // /consulting/TenderPortals exists as a Tina-generated route with a
  // mixed-case filename — middleware must NOT lowercase deeper segments.
  const response = await request.get(`${baseURL}/consulting/TenderPortals`, {
    maxRedirects: 0,
    failOnStatusCode: false,
  });
  expect(response.status()).toBe(200);
});

test("🔠 Uppercase first segment + mixed-case deep segment redirects, preserving deep segment", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(`${baseURL}/Consulting/TenderPortals`, {
    maxRedirects: 0,
    failOnStatusCode: false,
  });
  expect(response.status()).toBe(308);
  expect(response.headers()["location"]).toMatch(
    /\/consulting\/TenderPortals$/
  );
});

test("🔠 Lowercase top-level path is not redirected", async ({
  request,
  baseURL,
}) => {
  const response = await request.get(`${baseURL}/consulting`, {
    maxRedirects: 0,
    failOnStatusCode: false,
  });
  expect(response.status()).toBe(200);
});
