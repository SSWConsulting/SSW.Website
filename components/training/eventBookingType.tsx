export type EventBookingType = {
  data: {
    eventDurationInDays?: number | null;
    price?: number | null;
    discountPrice?: number | null;
    discountNote?: string | null;
    eventList?: Event[];
    gstText: string;
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
  DISCOUNT_PRICE: "Discount Price",
  DURATION: "Duration",
  DAY: "Day",
  TO_BE_ASSIGNED: "TBA",
};
