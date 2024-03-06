import {
  formatEventDate,
  formatEventLongDate,
  formatRelativeEventDate,
} from "helpers/dates";
import { useEffect, useState } from "react";
import { EventInfo } from "../services/server/events";

export const useFormatDates = (event: EventInfo, formatLong: boolean) => {
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
