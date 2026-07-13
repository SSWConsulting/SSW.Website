import { EventTrimmed } from "@/components/filter/events";
import { useEffect, useState } from "react";
import {
  formatEventDate,
  formatEventLongDate,
  formatEventLongDateParts,
  formatRelativeEventDate,
} from "../helpers/dates";

export const useFormatDates = (event: EventTrimmed, formatLong: boolean) => {
  const [relativeDate, setRelativeDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [formattedDateParts, setFormattedDateParts] = useState<{
    date: string;
    time: string;
  }>({ date: "", time: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRelativeDate(
        formatRelativeEventDate(event.startDateTime, event.endDateTime)
      );

      if (formatLong) {
        setFormattedDate(
          formatEventLongDate(event.startDateTime, event.endDateTime)
        );
        setFormattedDateParts(
          formatEventLongDateParts(event.startDateTime, event.endDateTime)
        );
      } else {
        const date = formatEventDate(event.startDateTime, event.endDateTime);
        setFormattedDate(date);
        setFormattedDateParts({ date, time: "" });
      }
    }
  }, [event.startDateTime, event.endDateTime, formatLong]);

  return { relativeDate, formattedDate, formattedDateParts };
};
