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

const EMPTY_SCHEDULE: EventSchedule = {
  isMultiDay: false,
  chips: [],
  dateShort: "",
  dateLong: "",
  timeLine: "",
};

export const useFormatDates = (event: EventTrimmed, formatLong: boolean) => {
  const [relativeDate, setRelativeDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedDateParts, setFormattedDateParts] = useState<{
    date: string;
    time: string;
  }>({ date: "", time: "" });
  const [schedule, setSchedule] = useState<EventSchedule>(EMPTY_SCHEDULE);

  // Depend on primitive timestamps, not the Date objects: callers usually build
  // `new Date(...)` on every render, so using those as deps would re-run this
  // effect (and re-render) forever.
  const startTime = event.startDateTime?.getTime();
  const endTime = event.endDateTime?.getTime();

  useEffect(() => {
    if (startTime == null || endTime == null) return;
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
