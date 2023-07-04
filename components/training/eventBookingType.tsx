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
