import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { months } from "../../components/util/constants";

/**
 * Returns the name of the month for a given number.
 * @param monthNumber - The number of the month (1-12).
 * @returns The name of the month.
 */
export const transformIntToMonth = (monthNumber: number): string => {
  return months[monthNumber - 1];
};

/**
 * Converts a given number value to a string representation of the month,
 * with a leading zero if necessary.
 * @param month The month number to convert.
 * @returns A string representation of the month.
 */
export const stringifyMonth = (month: number): string => {
  const monthString = month.toString().padStart(2, "0");
  return monthString;
};

export const utcDateToHoursMinutes = (date: string): string => {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.tz.setDefault("UTC");
  const formatted = dayjs.tz(date).format("HH:mm");
  return formatted;
};
