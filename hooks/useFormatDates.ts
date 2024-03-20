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
        formatRelativeEventDate(event.StartDateTime, event.EndDateTime)
      );

      if (formatLong) {
        setFormattedDate(
          formatEventLongDate(event.StartDateTime, event.EndDateTime)
        );
      } else {
        setFormattedDate(
          formatEventDate(event.StartDateTime, event.EndDateTime)
        );
      }
    }
  }, [event.StartDateTime, event.EndDateTime, formatLong]);

  return { relativeDate, formattedDate };
};
