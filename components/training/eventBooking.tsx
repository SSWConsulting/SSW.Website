import { Events_BodyEventBookingEventList as Event } from "@/tina/types";
import classNames from "classnames";
import dayjs from "dayjs";
import React, { FC } from "react";
import { MdLocationOn } from "react-icons/md";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { eventBookingBlock } from "./eventBooking.schema";
import { EventBookingType, EventModel } from "./eventBookingType";
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value == "number" && value <= 0) ||
    (typeof value == "string" && value === "")
  );
};

export const formatTimeWithAmPm = (date) => {
  if (!date) return null;
  const day = dayjs.tz(date, "UTC");
  return day.format("hA");
};

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
    <Container padding="md:px-8 px-6 py-8">
      {
        <EventHeader
          eventDurationInDays={data.eventDurationInDays}
          price={data.price}
          discountPrice={data.discountPrice}
          discountNote={data.discountNote}
          gstText={data.gstText}
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
            eventDurationInDays={data?.eventDurationInDays}
            schema={data}
          />
        ))}
      </div>
      <div className="bg-gray-400 py-1 text-center text-white">
        {EventModel.HOSTED_BY}{" "}
        <span className="font-bold">{EventModel.SSW}</span>
      </div>
    </Container>
  );
};

const EventCard = ({ event, count, index, eventDurationInDays, schema }) => {
  const formatTimes = (event) => {
    const startTime = event.startTime
      ? formatTimeWithAmPm(new Date(event.startTime))
      : "9AM";
    const endTime = event.endTime
      ? formatTimeWithAmPm(new Date(event.endTime))
      : "5PM";

    return `${startTime} - ${endTime}`;
  };

  return (
    <div
      className={classNames(
        "col-span-12 gap-2 border-b-8 border-white bg-gray-100 py-3 pl-5 text-lg last:border-b-0 last:border-r-0 md:border-b-0",
        getColSpanClass(count, index),
        addTopBorderForSecondRow(index),
        addRightBorder(index)
      )}
    >
      <div className="mb-2 grid grid-cols-12">
        <div className="col-span-6 md:col-span-12">
          <span
            className="font-bold capitalize"
            data-tina-field={tinaField(
              schema.eventList[index],
              eventBookingBlock.eventList.city
            )}
          >
            {event.city}
          </span>
          {event.date && (
            <>
              <div
                className="py-0.5 text-xs uppercase text-gray-500"
                data-tina-field={tinaField(
                  schema.eventList[index],
                  eventBookingBlock.eventList.date
                )}
              >
                {" "}
                <EventDates
                  eventDurationInDays={eventDurationInDays ?? 0}
                  date={event.date}
                />
              </div>
              <div
                data-tina-field={tinaField(schema.eventList[index])}
                className="py-0.5 text-xs uppercase text-gray-500"
              >
                {formatTimes(event)} AEDT
              </div>
            </>
          )}
          {!event.date && (
            <div className="py-0.5 text-xs uppercase text-gray-500">
              {EventModel.TO_BE_ASSIGNED}
            </div>
          )}
        </div>
        {event.date && (
          <div className="col-span-6 items-center pr-4 md:col-span-12 md:pr-0">
            <div
              className="py-1 text-end md:text-start"
              data-tina-field={tinaField(
                schema.eventList[index],
                eventBookingBlock.eventList.bookingURL
              )}
            >
              {new Date(event.date) > new Date() && event.bookingURL && (
                <CustomLink
                  href={event.bookingURL}
                  className="done inline-flex cursor-pointer"
                >
                  {EventModel.BOOKING_BTN_TEXT}
                </CustomLink>
              )}

              <div className="prose py-1 pr-0 text-xs">
                <EventLocation event={event} />
              </div>
            </div>
          </div>
        )}
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
      return classes.mdColSpan4 + " " + classes.lastMdColSpan4;
    } else if ((index + 1) % 3 === 1) {
      // e.g number of items are 4 (1 item in a row (col-span-12))
      return classes.mdColSpan4 + " " + classes.lastMdColSpan12;
    } else {
      // e.g number of items are 5 (2 items (col-span-4) && (col-span-8))
      return classes.mdColSpan4 + " " + classes.lastMdColSpan8;
    }
  }
};

const addTopBorderForSecondRow = (index) => {
  return index > 2 ? "border-white md:border-t-8" : "";
};

const addRightBorder = (index) => {
  return (index + 1) % 3 != 0 ? "md:border-r-8" : "";
};

const EventDates = ({ eventDurationInDays, date }) => {
  // this will return date fragment if the eventDurationInDays is equal to 1 => (28TH (WED) AUGUST 2023) or (this 28TH - 30TH SEPTEMBER 2022 \n (WED - FRI))
  dayjs.tz.setDefault("UTC");
  const isSingleDayEvent = eventDurationInDays === 1;
  const startDate = dayjs.tz(date);
  const endDate = startDate.add(eventDurationInDays - 1, "day"); // subtracting a day because it includes the start date as well
  const dates = isSingleDayEvent
    ? startDate.format("Do (ddd) MMMM YYYY")
    : `${startDate.format("Do")} - ${endDate.format("Do MMMM YYYY")}`;

  return (
    <>
      {dates}
      <div>
        {isSingleDayEvent || (
          <>
            ({startDate.format("ddd")} - {endDate.format("ddd")})
          </>
        )}
      </div>
    </>
  );
};

const EventHeader = ({
  eventDurationInDays,
  price,
  discountPrice,
  discountNote,
  gstText,
  schema,
}) => {
  return (
    <div className="mt-2 border-t-2 border-gray-400 bg-gray-100">
      <div className="mb-2 grid grid-cols-12">
        <div
          data-tina-field={tinaField(
            schema,
            eventBookingBlock.eventDurationInDays
          )}
          className="col-span-4 px-3 py-2 text-lg sm:col-span-2"
        >
          <div className="text-xs uppercase text-gray-500">
            {EventModel.DURATION}
          </div>
          {eventDurationInDays}{" "}
          {EventModel.DAY + (eventDurationInDays > 1 ? "s" : "")}
        </div>
        <div className="col-span-1 h-5/6 items-center self-center border-r-1 border-gray-300"></div>
        <div
          className="col-span-7 px-3 py-2 text-lg sm:col-span-9"
          data-tina-field={tinaField(schema, eventBookingBlock.price)}
        >
          <div className="text-xs uppercase text-gray-500">
            {EventModel.PRICE}
          </div>
          <span
            className={classNames({
              "text-gray-450 line-through": !isEmpty(discountPrice),
            })}
          >
            {EventModel.CURRENCY}
            {price}
          </span>{" "}
          {isEmpty(discountPrice)
            ? ""
            : `${EventModel.CURRENCY}${discountPrice} ${discountNote ?? ""} `}
          {gstText}
        </div>
      </div>
    </div>
  );
};

const EventLocation = ({ event }: { event: Event }) => {
  const classes = "flex items-center justify-end font-normal md:justify-start";
  const Contents = () => (
    <>
      <MdLocationOn className="m-icon" />
      <span className="capitalize">
        {EventModel.SSW} {event.city?.split(" ")[0]}
      </span>
    </>
  );
  if (event.location?.directionURL) {
    return (
      <CustomLink className={classes} href={event.location?.directionURL || ""}>
        <Contents />
      </CustomLink>
    );
  }
  return (
    <span className={classes}>
      <Contents />
    </span>
  );
};
