import React, { FC, useEffect, useState } from "react";
import type { Template } from "tinacms";
import Countdown from "react-countdown";

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
        case "monday": return DaysOfWeek.Monday;
        case "tuesday": return DaysOfWeek.Tuesday;
        case "wednesday": return DaysOfWeek.Wednesday;
        case "thursday": return DaysOfWeek.Thursday;
        case "friday": return DaysOfWeek.Friday;
        case "saturday": return DaysOfWeek.Saturday;
        case "sunday": return DaysOfWeek.Sunday;
        default:
            return DaysOfWeek.Monday;
    }
}

type TimeComponentProps = {
    time: number
    identifier: string
    className?: string
};

const calculateNextRecurringEvent = (day: DaysOfWeek): number => {
    const nextDate: any = new Date();
    const currentDate: any = new Date();

    nextDate.setUTCDate(nextDate.getUTCDate() + (day - nextDate.getUTCDay()) % 7 + 1);
    nextDate.setHours(9)
    nextDate.setMinutes(0)

    return Math.abs(currentDate - nextDate);
}

const TimeComponent: FC<TimeComponentProps> = ({ time, identifier, className }) => {
    return (
        <div className={`flex flex-col text-white ${className}`}>
            <div className="flex h-12 w-15 items-center justify-center rounded-t bg-sswRed text-2xl">
                {time}
            </div>
            <div className="flex h-7 w-15 items-center justify-center rounded-b bg-black">
                {identifier.toUpperCase()}
            </div>
        </div>
    );
}

const renderer = ({ days, hours, minutes }) => {
    return (
        <div className="flex items-center pb-5">
            <TimeComponent time={days} identifier="days" className="pr-1" />
            <TimeComponent time={hours} identifier="hrs" className="pr-1" />
            <TimeComponent time={minutes} identifier="min" className="pr-1" />
        </div>
    )

};

export const RecurringEvent = ({ data }) => {
    const day = convertStringToDayOfWeek(data.day);
    const timeUntilNextEvent = calculateNextRecurringEvent(day);

    return (
        <div>
            <Countdown
                date={Date.now() + timeUntilNextEvent}
                renderer={renderer}
            />
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
            required: true
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
            required: true
        },
    ],
};
