import { describe, expect, it } from "@jest/globals";
import { toKebabCase } from "../../helpers/kebab-case";

describe("toKebabCase", () => {
  it("should convert a string to kebab case", () => {
    const input = "Hello World";
    const expectedOutput = "hello-world";
    expect(toKebabCase(input)).toBe(expectedOutput);
  });

  it("should handle multiple spaces and special characters", () => {
    const input = "  Hello   World! This is a test.  ";
    const expectedOutput = "hello-world-this-is-a-test";
    expect(toKebabCase(input)).toBe(expectedOutput);
  });

  it("should handle empty strings", () => {
    const input = "";
    const expectedOutput = "";
    expect(toKebabCase(input)).toBe(expectedOutput);
  });
});
