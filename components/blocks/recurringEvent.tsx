"use client";

import { FaRegCalendarCheck } from "@react-icons/all-files/fa/FaRegCalendarCheck";
import { FC, useEffect, useState } from "react";
import type { Template } from "tinacms";

enum DaysOfWeek {
  Monday = 7,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

const convertStringToDayOfWeek = (day: string): DaysOfWeek => {
  switch (day) {
    case "monday":
      return DaysOfWeek.Monday;
    case "tuesday":
      return DaysOfWeek.Tuesday;
    case "wednesday":
      return DaysOfWeek.Wednesday;
    case "thursday":
      return DaysOfWeek.Thursday;
    case "friday":
      return DaysOfWeek.Friday;
    case "saturday":
      return DaysOfWeek.Saturday;
    case "sunday":
      return DaysOfWeek.Sunday;
    default:
      return DaysOfWeek.Monday;
  }
};

type TimeComponentProps = {
  time?: number;
  identifier: string;
  className?: string;
};

const calculateNextRecurringEventDate = (day: DaysOfWeek): Date => {
  const nextDate: Date = new Date();

  nextDate.setUTCDate(
    nextDate.getUTCDate() + ((day - nextDate.getUTCDay()) % 7) + 1
  );
  nextDate.setHours(9);
  nextDate.setMinutes(0);

  return nextDate;
};

const TimeComponent: FC<TimeComponentProps> = ({
  time,
  identifier,
  className,
}) => {
  return (
    <div className={`flex flex-col text-white ${className}`}>
      <div className="flex h-12 w-15 items-center justify-center rounded-t bg-sswRed font-helvetica text-2xl">
        {time}
      </div>
      <div className="flex h-7 w-15 items-center justify-center rounded-b bg-black">
        {identifier.toUpperCase()}
      </div>
    </div>
  );
};

const Countdown = ({ nextEventDate }) => {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();

  const getDifference = (date: Date): number[] => {
    const MINUTE = 1000 * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const now = new Date().getTime();
    const difference = date.getTime() - now;

    return [
      Math.floor(difference / DAY),
      Math.floor((difference % DAY) / HOUR),
      Math.floor((difference % HOUR) / MINUTE),
    ];
  };

  useEffect(() => {
    const [daysDiff, hoursDiff, minutesDiff] = getDifference(nextEventDate);

    setDays(daysDiff);
    setHours(hoursDiff);
    setMinutes(minutesDiff);

    const interval = setInterval(() => {
      const [daysDiff, hoursDiff, minutesDiff] = getDifference(nextEventDate);

      setDays(daysDiff);
      setHours(hoursDiff);
      setMinutes(minutesDiff);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [nextEventDate]);

  return (
    <div className="flex items-center">
      <TimeComponent time={days} identifier="days" className="pr-1" />
      <TimeComponent time={hours} identifier="hrs" className="pr-1" />
      <TimeComponent time={minutes} identifier="min" className="pr-1" />
    </div>
  );
};

export const RecurringEvent = ({ data }) => {
  const day: DaysOfWeek = convertStringToDayOfWeek(data.day);
  const nextEventDate: Date = calculateNextRecurringEventDate(day);

  return (
    <div className="flex flex-col">
      <div className="my-3 flex flex-col sm:flex-row">
        <Countdown nextEventDate={nextEventDate} />
        {data.applyLinkRedirect && (
          <button
            className="ml-0 mt-2 w-48 rounded bg-sswRed px-15 py-3 sm:ml-2 sm:mt-0 "
            onClick={() =>
              window.open(`${data.applyLinkRedirect}` || "", "_blank")
            }
          >
            <span className="text-lg font-medium text-white">Apply</span>
          </button>
        )}
      </div>
      <div className="flex items-center">
        <FaRegCalendarCheck size={20} />
        <span className="ml-2 font-medium">{nextEventDate.toDateString()}</span>
      </div>
    </div>
  );
};

export const recurringEventSchema: Template = {
  label: "Recurring Event",
  name: "RecurringEvent",
  fields: [
    {
      type: "string",
      label: "Apply Link Redirect",
      name: "applyLinkRedirect",
    },
    {
      type: "string",
      label: "Day",
      name: "day",
      options: [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
      ],
      required: true,
    },
  ],
};
