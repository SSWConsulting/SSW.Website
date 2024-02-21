import {
  formatEventDate,
  formatEventLongDate,
  formatRelativeEventDate,
} from "../../helpers/dates";

describe("formatEventDate", () => {
  it("Single Day Event - Date format", () => {
    const startDate = new Date(2024, 1, 1); // February 1, 2024
    const endDate = new Date(2024, 1, 1); // February 1, 2024
    const result = formatEventDate(startDate, endDate);
    expect(result).toBe("Feb 1");
  });

  it("Single Day Event - Different year - Date format", () => {
    const startDate = new Date(2025, 1, 1); // February 1, 2024
    const endDate = new Date(2025, 1, 1); // February 1, 2024
    const result = formatEventDate(startDate, endDate);
    expect(result).toBe("Feb 1 2025");
  });

  it("Mutiple Days Event - Date format", () => {
    const startDate = new Date(2024, 1, 1); // February 1, 2024
    const endDate = new Date(2024, 1, 2); // February 2, 2024
    const result = formatEventDate(startDate, endDate);
    expect(result).toBe("Feb 1 - Feb 2");
  });

  it("No date provided - Date format", () => {
    const result = formatEventDate(null, null);
    expect(result).toBe("");
  });
});

describe("formatEventLongDate", () => {
  it("Single Day Event - Date format", () => {
    const startDate = new Date(2024, 1, 1); // February 1, 2024
    const endDate = new Date(2024, 1, 1); // February 1, 2024
    const result = formatEventLongDate(startDate, endDate);
    expect(result).toBe("Thursday, February 1, 2024 12:00 AM - 12:00 AM");
  });

  it("Mutiple Days Event - Date format", () => {
    const startDate = new Date(2024, 1, 1); // February 1, 2024
    const endDate = new Date(2024, 1, 2); // February 2, 2024
    const result = formatEventLongDate(startDate, endDate);
    expect(result).toBe(
      "Thursday, February 1, 2024 12:00 AM - Friday, February 2, 2024 12:00 AM"
    );
  });

  it("No date provided - Date format", () => {
    const result = formatEventLongDate(null, null);
    expect(result).toBe("");
  });
});

describe("formatRelativeEventDate", () => {
  it("2 Days ago - Date format", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2); // subtract 2 days from the current date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 2); // subtract 2 days from the current date
    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("2 days ago");
  });

  it("1 Day ago - Date format", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1); // subtract 1 days from the current date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1); // subtract 1 day from the current date
    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("1 day ago");
  });

  it("Running now - Date format", () => {
    const startDate = new Date(); // Today's Date
    startDate.setHours(startDate.getHours() - 1); // subtract 1 hours from the current time
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 1); // add 1 hours to the current time

    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("now running");
  });

  it("Today - Date format", () => {
    const startDate = new Date(); // Today's date
    const endDate = new Date(); // Today's date
    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("today");
  });

  it("1 day to go - Date format", () => {
    const startDate = new Date(); // Today's date
    const endDate = new Date(); // Today's date
    startDate.setDate(startDate.getDate() + 1); // add 1 day to the current date
    endDate.setDate(endDate.getDate() + 1); // add 1 days to the current date
    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("1 day to go");
  });

  it("2 days to go - Date format", () => {
    const startDate = new Date(); // Today's date
    const endDate = new Date(); // Today's date
    startDate.setDate(startDate.getDate() + 2); // add 2 days to the current date
    endDate.setDate(endDate.getDate() + 2); // add 2 days to the current date
    const result = formatRelativeEventDate(startDate, endDate);
    expect(result).toBe("2 days to go");
  });
});
