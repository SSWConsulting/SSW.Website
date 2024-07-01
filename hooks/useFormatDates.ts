import { EventTrimmed } from "@/components/filter/events";
import { useEffect, useState } from "react";
import {
  formatEventDate,
  formatEventLongDate,
  formatRelativeEventDate,
} from "../helpers/dates";

export const useFormatDates = (event: EventTrimmed, formatLong: boolean) => {
  const [relativeDate, setRelativeDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRelativeDate(
        formatRelativeEventDate(event.startDateTime, event.endDateTime)
      );

      if (formatLong) {
        setFormattedDate(
          formatEventLongDate(event.startDateTime, event.endDateTime)
        );
      } else {
        setFormattedDate(
          formatEventDate(event.startDateTime, event.endDateTime)
        );
      }
    }
  }, [event.startDateTime, event.endDateTime, formatLong]);

  return { relativeDate, formattedDate };
};
