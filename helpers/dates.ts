import dayjs from "dayjs";

export const EventStatus = {
  TODAY: "today",
  NOW_RUNNING: "now running",
};

export const formatEventDate = (start: Date, end: Date) => {
  if (!start || !end) return "";

  // NOTE: Omit ddd for brevity if it's next year's event
  const dateformat =
    dayjs(start).year() === dayjs().year() ? "MMM D" : "MMM D YYYY";

  const isOneDayEvent = dayjs(start)
    .startOf("day")
    .isSame(dayjs(end).startOf("day"));
  const startDate = dayjs(start).format(dateformat);
  const endDate = dayjs(end).format(dateformat);

  return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
};

export const formatEventLongDate = (start: Date, end: Date) => {
  if (!start || !end) return "";

  const dateformat = "dddd, MMMM D, YYYY h:mm A";

  const isOneDayEvent = dayjs(start)
    .startOf("day")
    .isSame(dayjs(end).startOf("day"));

  const startDate = dayjs(start).format(dateformat);
  const endDate = dayjs(end).format(dateformat);

  if (isOneDayEvent) {
    return `${startDate} - ${dayjs(end).format("h:mm A")}`;
  } else {
    return `${startDate} - ${endDate}`;
  }
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
