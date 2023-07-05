import classNames from "classnames";
import moment from "moment";
import { FC } from "react";
import { MdLocationOn } from "react-icons/md";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { EventBookingType, EventModel } from "./eventBookingType";

const classes = {
  mdColSpan4: "md:col-span-4",
  mdColSpan6: "md:col-span-6",
  mdColSpan12: "md:col-span-12",
  lastMdColSpan4: "last:md:col-span-4",
  lastMdColSpan8: "last:md:col-span-8",
  lastMdColSpan12: "last:md:col-span-12",
};

export const EventBooking: FC<EventBookingType> = ({ data }) => {
  return (
    <>
      {
        <EventHeader
          duration={data.duration}
          price={data.price}
          schema={data}
        />
      }
      <div className="mb-2 grid grid-cols-12">
        {data.eventList?.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            count={data.eventList.length}
            index={index}
            schema={data}
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

const EventCard = ({ event, count, index, schema }) => {
  return (
    <div
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white  bg-gray-100 py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:border-b-0",
        getColSpanClass(count, index),
        addTopBorderForSecondRow(index),
        addRightBorder(index)
      )}
    >
      <span
        className="font-bold capitalize"
        data-tina-field={tinaField(
          schema.eventList[index],
          eventBookingBlock.eventList.city
        )}
      >
        {event.city}
      </span>
      <div
        className=" py-0.5 text-xs uppercase text-gray-500"
        data-tina-field={tinaField(
          schema.eventList[index],
          eventBookingBlock.eventList.date
        )}
      >
        {" "}
        {event.date && moment(event.date).format("Do (ddd) MMMM YYYY")}
      </div>
      <div className=" py-0.5 text-xs uppercase text-gray-500">
        {EventModel.TIMINGS}
      </div>
      <div
        className="py-1"
        data-tina-field={tinaField(
          schema.eventList[index],
          eventBookingBlock.eventList.bookingURL
        )}
      >
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
    return classes.mdColSpan4;
  } else if (count === 2) {
    return classes.mdColSpan6;
  } else if (count === 1) {
    return classes.mdColSpan12;
  } else {
    // For counts greater than 3, calculate the column span class based on index and count > 3

    if ((index + 1) % 3 === 0) {
      // e.g number of items are 6 (3 items in a row each col-span-4)
      return classes.mdColSpan4 + classes.lastMdColSpan4;
    } else if ((index + 1) % 3 === 1) {
      // e.g number of items are 4 (1 item in a row (col-span-12))
      return classes.mdColSpan4 + classes.lastMdColSpan12;
    } else {
      // e.g number of items are 5 (2 items (col-span-4) && (col-span-8))
      return classes.mdColSpan4 + classes.lastMdColSpan8;
    }
  }
};

const addTopBorderForSecondRow = (index) => {
  return index > 2 ? "border-white md:border-t-8" : "";
};

const addRightBorder = (index) => {
  return (index + 1) % 3 != 0 ? "md:border-r-8" : "";
};

const EventHeader = ({ duration, price, schema }) => {
  return (
    <div className="mt-2 border-t-2 border-gray-400 bg-gray-100">
      <div className="mb-2 grid grid-cols-12">
        <div
          data-tina-field={tinaField(schema, eventBookingBlock.duration)}
          className="col-span-4 px-3  py-2 text-lg sm:col-span-2"
        >
          <div className=" text-xs uppercase text-gray-500">
            {EventModel.DURATION}
          </div>
          {duration} {EventModel.DAY}
        </div>
        <div className="col-span-1 h-5/6 items-center self-center border-r-1 border-gray-300"></div>
        <div
          className="col-span-7 px-3 py-2 text-lg sm:col-span-9"
          data-tina-field={tinaField(schema, eventBookingBlock.price)}
        >
          <div className="text-xs uppercase text-gray-500">
            {EventModel.PRICE}
          </div>
          {EventModel.CURRENCY}
          <span>{price}</span> {EventModel.INCLUDE_GST}
        </div>
      </div>
    </div>
  );
};

export const eventBookingBlock = {
  eventBooking: "EventBooking",
  duration: "duration",
  price: "price",
  eventList: {
    value: "eventList",
    city: "city",
    date: "date",
    bookingURL: "bookingURL",
  },
};

export const eventBookingSchema: Template = {
  name: eventBookingBlock.eventBooking,
  label: "Events",
  fields: [
    {
      type: "number",
      label: "Duration",
      name: eventBookingBlock.duration,
    },
    {
      type: "number",
      label: "Price",
      name: eventBookingBlock.price,
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
          label: "Date",
          name: eventBookingBlock.eventList.date,
          ui: {
            timeFormat: "MM:DD:YY",
          },
        },
        {
          type: "string",
          label: "Booking URL",
          name: eventBookingBlock.eventList.bookingURL,
        },
      ],
    },
  ],
};
