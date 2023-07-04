import classNames from "classnames";
import moment from "moment";
import { FC } from "react";
import { MdLocationOn } from "react-icons/md";
import type { Template } from "tinacms";
import { EventBookingType, EventModel } from "./eventBookingType";

export const EventBooking: FC<EventBookingType> = ({ data }) => {
  return (
    <>
      {<EventHeader duration={data.duration} price={data.price} />}
      <div className="mb-2 grid grid-cols-12">
        {data.eventList?.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            count={data.eventList.length}
            index={index}
          />
        ))}
      </div>
      <div className="bg-gray-400 py-1 text-center text-white">
        {EventModel.HOSTED_BY}{" "}
        <span className="font-bold">{EventModel.SSW}</span>
      </div>
    </>
  );
};

const EventCard = ({ event, count, index }) => {
  return (
    <div
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white  bg-gray-100 py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:border-b-0 md:border-r-8",
        getColSpanClass(count, index),
        addTopBorder(index),
        removeLastRightBorder(index)
      )}
    >
      <span className="font-bold capitalize">{event.city}</span>
      <div className=" py-0.5 text-xs uppercase text-gray-500">
        {" "}
        {event.date && moment(event.date).format("Do (ddd) MMMM YYYY")}
      </div>
      <div className=" py-0.5 text-xs uppercase text-gray-500">
        {EventModel.TIMINGS}
      </div>
      <div className="py-1">
        <a
          href={event.bookingURL == null ? "" : event.bookingURL}
          className="done inline-flex cursor-pointer p-3"
          target="_blank"
        >
          {EventModel.BOOKING_BTN_TEXT}
        </a>
      </div>
      <div className="py-1 text-xs">
        <a className="flex items-center !no-underline" href="#location">
          <MdLocationOn className="m-icon" />
          {EventModel.SSW}
          <span className="ml-1 capitalize">{event.city}</span>
        </a>
      </div>
    </div>
  );
};

const getColSpanClass = (count, index) => {
  if (count === 3) {
    return "md:col-span-4";
  } else if (count === 2) {
    return "md:col-span-6";
  } else if (count === 1) {
    return "md:col-span-12";
  } else {
    // For counts greater than 3, calculate the column span class based on index and count > 3

    if ((index + 1) % 3 === 0) {
      // e.g number of items are 6 (3 items in a row each col-span-4)
      return "md:col-span-4 last:md:col-span-4";
    } else if ((index + 1) % 3 === 1) {
      // e.g number of items are 4 (1 item in a row (col-span-12))
      return "md:col-span-4 last:md:col-span-12";
    } else {
      // e.g number of items are 5 (2 items (col-span-4) && (col-span-8))
      return "md:col-span-4 last:md:col-span-8";
    }
  }
};

const addTopBorder = (index) => {
  return index > 2 ? "border-white md:border-t-8" : "";
};

const removeLastRightBorder = (index) => {
  return (index + 1) % 3 == 0 ? "md:border-r-0" : "";
};

const EventHeader = ({ duration, price }) => {
  return (
    <div className="mt-2 border-t-2 border-gray-400 bg-gray-100">
      <div className="mb-2 grid grid-cols-12">
        <div className="col-span-4 px-3  py-2 text-lg sm:col-span-2">
          <div className=" text-xs uppercase text-gray-500">
            {EventModel.DURATION}
          </div>
          {duration} {EventModel.DAY}
        </div>
        <div className="col-span-1 h-5/6 items-center self-center border-r-1 border-gray-300"></div>
        <div className="col-span-7 px-3 py-2 text-lg sm:col-span-9">
          <div className="text-xs uppercase text-gray-500">
            {EventModel.PRICE}
          </div>
          {EventModel.CURRENCY}
          {price} {EventModel.INCLUDE_GST}
        </div>
      </div>
    </div>
  );
};

export const eventBookingSchema: Template = {
  name: "EventBooking",
  label: "Events",
  fields: [
    {
      type: "object",
      label: "Event",
      name: "eventList",
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
          name: "city",
        },
        {
          type: "datetime",
          label: "Date",
          name: "date",
          ui: {
            timeFormat: "MM:DD:YY",
          },
        },
        {
          type: "string",
          label: "Booking URL",
          name: "bookingURL",
        },
      ],
    },
    {
      type: "number",
      label: "Duration",
      name: "duration",
    },
    {
      type: "number",
      label: "Price",
      name: "price",
    },
  ],
};
