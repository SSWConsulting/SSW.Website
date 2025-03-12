import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Template, wrapFieldsWithMeta } from "tinacms";

import React, { useState } from "react";

const gstTypeOptions = ["inc GST", "+ GST"];

export const eventBookingBlock = {
  eventBooking: "EventBooking",
  eventDurationInDays: "eventDurationInDays",
  price: "price",
  discountPrice: "discountPrice",
  discountNote: "discountNote",
  suffix: "suffix",
  eventList: {
    value: "eventList",
    city: "city",
    date: "date",
    endDate: "endDate",
    bookingURL: "bookingURL",
    location: "location",
  },
  gstText: "gstText",
};

const TimePicker = ({ input, defaultValue }) => {
  dayjs.extend(timezone);

  dayjs.extend(utc);
  dayjs.tz.setDefault("UTC");
  const { onChange, value: inputValue, ...props } = input;
  const [value, setValue] = useState(
    inputValue ? dayjs.tz(inputValue).format("HH:mm") : defaultValue
  );
  return (
    <input
      className="focus:shadow-outline block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-600 shadow-inner transition-all duration-150 ease-out placeholder:text-gray-300 focus:border-blue-500 focus:text-gray-900 focus:outline-none"
      value={value}
      {...props}
      onChange={(e) => {
        setValue(e.target.value);
        const time = e.target.value.split(":");
        const hours = time[0];
        const minutes = time[1];
        const date = new Date(
          Date.UTC(0, 0, 0, Number(hours), Number(minutes))
        ).toUTCString();
        onChange(date);
      }}
      type="time"
    />
  );
};

const eventBookingSchema: Template = {
  name: eventBookingBlock.eventBooking,
  label: "Events Booking",
  ui: {
    previewSrc: "/images/thumbs/tina/events-booking.jpg",
  },
  fields: [
    {
      type: "number",
      label: "Duration (In Days)",
      name: eventBookingBlock.eventDurationInDays,
      required: true,
    },
    {
      type: "number",
      label: "Price",
      name: eventBookingBlock.price,
      required: true,
    },
    {
      type: "number",
      label: "Discount Price",
      name: eventBookingBlock.discountPrice,
    },
    {
      type: "string",
      name: eventBookingBlock.gstText,
      label: "Select GST Option",
      options: gstTypeOptions,
      required: true,
    },

    {
      type: "string",
      label: "Discount Note",
      name: eventBookingBlock.discountNote,
    },
    {
      type: "object",
      label: "Event",
      name: eventBookingBlock.eventList.value,
      ui: {
        itemProps: (item) => {
          return { label: item?.city };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "City",
          name: eventBookingBlock.eventList.city,
        },
        {
          type: "datetime",
          label: "Start Date",
          name: eventBookingBlock.eventList.date,
          ui: {
            //@ts-expect-error - Tina supports UTC but typing doesn't work
            utc: true,
            format: (value) => {
              return value && dateFormat.format(new Date(Date.parse(value)));
            },
          },
        },
        {
          label: "Start Time",
          type: "datetime",
          ui: {
            component: wrapFieldsWithMeta(({ input }) => (
              <TimePicker defaultValue={"09:00"} input={input} />
            )),
            //@ts-expect-error - Tina supports UTC but typing doesn't work
            utc: true,
            format: (value) => {
              return value && dateFormat.format(new Date(Date.parse(value)));
            },
          },
          name: "startTime",
        },
        {
          label: "End Time",
          type: "datetime",
          ui: {
            component: wrapFieldsWithMeta(({ input }) => (
              <TimePicker input={input} defaultValue={"17:00"} />
            )),
            //@ts-expect-error - Tina supports UTC but typing doesn't work
            utc: true,
            format: (value) => {
              return value && dateFormat.format(new Date(Date.parse(value)));
            },
          },
          name: "endTime",
        },
        {
          type: "string",
          label: "Booking URL",
          name: eventBookingBlock.eventList.bookingURL,
        },
        {
          type: "reference",
          label: "Location",
          name: eventBookingBlock.eventList.location,
          collections: ["locations"],
        },
      ],
    },
  ],
};

const dateFormat = Intl.DateTimeFormat("en-AU", {
  timeZone: "UTC",
  day: "numeric",
  year: "numeric",
  month: "short",
});

export default eventBookingSchema;
