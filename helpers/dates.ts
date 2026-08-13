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

export type EventSchedule = {
  isMultiDay: boolean;
  /** One chip for a single-day event, two (start and end) for a multi-day one. */
  chips: { month: string; day: string }[];
  /** "Wed 16 Sep" / "Mon 20 - Tue 21 Jul" */
  dateShort: string;
  /** As above plus the year, for the page header. */
  dateLong: string;
  /** "5:30 PM - 7:30 PM", with " daily" when the same hours repeat each day. */
  timeLine: string;
};

// Event date/time broken into the pieces the event page renders: calendar
// chips, a date line and a time line. Multi-day events get a chip per end.
export const formatEventSchedule = (start: Date, end: Date): EventSchedule => {
  const empty = {
    isMultiDay: false,
    chips: [],
    dateShort: "",
    dateLong: "",
    timeLine: "",
  };
  if (!start || !end) return empty;

  const s = dayjs(start);
  const e = dayjs(end);
  const chip = (d: dayjs.Dayjs) => ({
    month: d.format("MMM").toUpperCase(),
    day: d.format("D"),
  });
  const times = `${s.format("h:mm A")} - ${e.format("h:mm A")}`;

  if (s.startOf("day").isSame(e.startOf("day"))) {
    return {
      isMultiDay: false,
      chips: [chip(s)],
      dateShort: s.format("ddd D MMM"),
      dateLong: s.format("ddd D MMM YYYY"),
      timeLine: times,
    };
  }

  // Same month: name it once at the end ("Mon 20 - Tue 21 Jul").
  const dateShort = s.isSame(e, "month")
    ? `${s.format("ddd D")} - ${e.format("ddd D MMM")}`
    : `${s.format("ddd D MMM")} - ${e.format("ddd D MMM")}`;

  // "daily" only when the hours actually repeat each day. An event that simply
  // runs past midnight ends earlier in the day than it starts, and isn't daily.
  const repeatsDaily = e.format("HH:mm") > s.format("HH:mm");

  return {
    isMultiDay: true,
    chips: [chip(s), chip(e)],
    dateShort,
    dateLong: `${dateShort} ${e.format("YYYY")}`,
    timeLine: repeatsDaily ? `${times} daily` : times,
  };
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
