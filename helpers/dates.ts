import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const EventStatus = {
  TODAY: "today",
  NOW_RUNNING: "now running",
};

export const formatEventDate = (start: Date, end: Date) => {
  if (!start || !end) return "";

  const startObj = dayjs(start);
  const endObj = dayjs(end);

  // NOTE: Omit ddd for brevity if it's next year's event
  const dateformat =
    startObj.year() === dayjs().year() ? "MMM D" : "MMM D YYYY";

  const isOneDayEvent = startObj.startOf("day").isSame(endObj.startOf("day"));
  const startDate = startObj.format(dateformat);
  const endDate = endObj.format(dateformat);

  return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
};

// Splits the long event date into a date line and a time line so callers can
// render them on separate lines.
export const formatEventLongDateParts = (start: Date, end: Date) => {
  if (!start || !end) return { date: "", time: "" };

  const dateformat = "dddd, MMMM D, YYYY h:mm A";

  const startObj = dayjs(start);
  const endObj = dayjs(end);

  const isOneDayEvent = startObj.startOf("day").isSame(endObj.startOf("day"));

  if (isOneDayEvent) {
    return {
      date: startObj.format("dddd, MMMM D, YYYY"),
      time: `${startObj.format("h:mm A")} - ${endObj.format("h:mm A")}`,
    };
  }

  return {
    date: startObj.format(dateformat),
    time: `- ${endObj.format(dateformat)}`,
  };
};

export const formatEventLongDate = (start: Date, end: Date) => {
  if (!start || !end) return "";

  const { date, time } = formatEventLongDateParts(start, end);
  return `${date} ${time}`;
};

export const formatRelativeEventDate = (startDate: Date, endDate: Date) => {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (now.isBetween(start, end)) {
    return EventStatus.NOW_RUNNING;
  }

  const startOfToday = now.startOf("day");
  const startOfEventDay = start.startOf("day");

  const isSameDay = startOfToday.isSame(startOfEventDay);

  const days = startOfEventDay.diff(startOfToday, "d");

  if (days === 0 && isSameDay) {
    return EventStatus.TODAY;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} to go`;
  } else {
    const normalisedDays = Math.abs(days);
    return `${normalisedDays} ${normalisedDays === 1 ? "day" : "days"} ago`;
  }
};
