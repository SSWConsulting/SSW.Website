import { formatEventDate } from "../../helpers/dates";

describe("formatEventDate", () => {
  it("formats a date correctly", () => {
    const startDate = new Date(2024, 2, 1); // February 1, 2022
    const endDate = new Date(2024, 2, 2); // February 2, 2022
    const result = formatEventDate(startDate, endDate);
    expect(result).toBe("Mar 1 - Mar 2"); // replace '01-02-2022' with the expected output
  });

  it("returns null for invalid dates", () => {
    const date = new Date("invalid date");
    const result = formatEventDate(date);
    expect(result).toBeNull();
  });
});
