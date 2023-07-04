export type EventBookingType = {
  data: {
    duration?: number | null;
    price?: number | null;
    eventList?: Event[];
  };
};

export type Event = {
  city: string | null;
  date: string | null;
  bookingURL: string;
};

export const EventModel = {
  SSW: "SSW",
  HOSTED_BY: "Hosted by",
  CURRENCY: "$",
  TIMINGS: "9AM - 5PM",
  BOOKING_BTN_TEXT: "Book Now",
  PRICE: "Price",
  DURATION: "Duration",
  INCLUDE_GST: "inc GST",
  DAY: "Day",
};
