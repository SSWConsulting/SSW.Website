import { EventTrimmed } from "@/components/filter/events";
import { useEffect, useState } from "react";
import {
  formatEventDate,
  formatEventLongDate,
  formatEventLongDateParts,
  formatEventSchedule,
  formatRelativeEventDate,
  type EventSchedule,
} from "../helpers/dates";

const EMPTY_DATE_PARTS = { date: "", time: "" };

const EMPTY_SCHEDULE: EventSchedule = {
  isMultiDay: false,
  chips: [],
  weekdayLine: "",
  dateLong: "",
  timeLine: "",
};

export const useFormatDates = (event: EventTrimmed, formatLong: boolean) => {
  const [relativeDate, setRelativeDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedDateParts, setFormattedDateParts] =
    useState<typeof EMPTY_DATE_PARTS>(EMPTY_DATE_PARTS);
  const [schedule, setSchedule] = useState<EventSchedule>(EMPTY_SCHEDULE);

  // Depend on primitive timestamps, not the Date objects: callers usually build
  // `new Date(...)` on every render, so using those as deps would re-run this
  // effect (and re-render) forever.
  const startTime = event.startDateTime?.getTime();
  const endTime = event.endDateTime?.getTime();

  useEffect(() => {
    // Number.isFinite, not a null check: callers build `new Date(value)`, so a
    // missing or malformed date arrives as an Invalid Date whose time is NaN.
    if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
      setRelativeDate("");
      setFormattedDate("");
      setFormattedDateParts(EMPTY_DATE_PARTS);
      setSchedule(EMPTY_SCHEDULE);
      return;
    }
    const start = new Date(startTime);
    const end = new Date(endTime);

    setRelativeDate(formatRelativeEventDate(start, end));
    setSchedule(formatEventSchedule(start, end));

    if (formatLong) {
      setFormattedDate(formatEventLongDate(start, end));
      setFormattedDateParts(formatEventLongDateParts(start, end));
    } else {
      const date = formatEventDate(start, end);
      setFormattedDate(date);
      setFormattedDateParts({ date, time: "" });
    }
  }, [startTime, endTime, formatLong]);

  return { relativeDate, formattedDate, formattedDateParts, schedule };
};
