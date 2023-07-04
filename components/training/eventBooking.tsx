import classNames from "classnames";
import moment from "moment";
import Link from "next/link";
import { FC } from "react";
import { MdLocationOn } from "react-icons/md";
import type { Template } from "tinacms";
import { EventBookingType } from "./eventBookingType";

export const EventBooking: FC<EventBookingType> = ({ data }) => {
  return (
    <>
      {<EventHeader duration={data.duration} price={data.price} />}
      <div className="mb-2 grid grid-cols-12">
        {data.eventList?.map((event, index) => (
          <EventCard event={event} index={index} />
        ))}
      </div>
      <div className="bg-gray-400 py-1 text-center text-white">
        Hosted by <span className="font-bold">SSW</span>
      </div>
    </>
  );
};

const EventCard = ({ event, index }) => {
  return (
    <div
      key={index}
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white  bg-gray-100 py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:col-span-4 md:border-b-0 md:border-r-8"
      )}
    >
      <span className="font-bold capitalize">{event.city}</span>
      <div className=" py-0.5 text-xs uppercase text-gray-500">
        {" "}
        {event.date && moment(event.date).format("Do (ddd) MMMM YYYY")}
      </div>
      <div className=" py-0.5 text-xs uppercase text-gray-500">9AM - 5PM</div>
      <div className="py-1">
        <Link
          href={event.bookingURL == null ? "" : event.bookingURL}
          className="done inline-flex cursor-pointer p-3"
        >
          Book Now
        </Link>
      </div>
      <div className="py-1 text-xs">
        <a className="flex items-center !no-underline" href="#location">
          <MdLocationOn className="m-icon" />
          SSW<span className="ml-1 capitalize">{event.city}</span>
        </a>
      </div>
    </div>
  );
};

const EventHeader = ({ duration, price }) => {
  return (
    <div className="mt-2 border-t-2 border-gray-400 bg-gray-100">
      <div className="mb-2 grid grid-cols-12">
        <div className="col-span-4 px-3  py-2 text-lg sm:col-span-2">
          <div className=" text-xs uppercase text-gray-500">Duration</div>
          {duration} Day
        </div>
        <div className="col-span-1 h-5/6 items-center self-center border-r-1 border-gray-300"></div>
        <div className="col-span-7 px-3 py-2 text-lg sm:col-span-9">
          <div className="text-xs uppercase text-gray-500">Price</div>${price}{" "}
          inc GST
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
