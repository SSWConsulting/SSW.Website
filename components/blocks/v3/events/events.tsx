"use client";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { buildEventUrl } from "@/helpers/getTrimmedEvents";
import { cn } from "@/lib/utils";
import { getFutureEventsSimple } from "@/services/server/events";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { FiCalendar, FiClock, FiMapPin, FiUser } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { SectionHeader } from "../shared/sectionHeader";
import { Countdown } from "./countdown";

const MS_PER_DAY = 86_400_000;

const getDaysToGo = (date?: string): number | null => {
  if (!date) return null;

  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const days = Math.ceil((target.getTime() - today.getTime()) / MS_PER_DAY);
  return days >= 0 ? days : null;
};

function DaysToGoBadge({ date }: { date?: string }) {
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  useEffect(() => {
    setDaysToGo(getDaysToGo(date));
  }, [date]);

  if (daysToGo === null) return null;

  return (
    <span className="inline-flex shrink-0 items-center rounded-sm bg-sswRed px-1.5 py-0.5 text-xs font-semibold uppercase leading-none text-white">
      {daysToGo} {daysToGo === 1 ? "day" : "days"} to go
    </span>
  );
}

function PresenterList({ presenters, className = "" }) {
  if (presenters.length === 0) return null;

  return (
    <div
      className={cn("relative z-10 flex min-w-0 items-center gap-2", className)}
    >
      <FiUser className="size-4 shrink-0" />
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {presenters.map((presenter, index) => {
          return (
            <span
              key={`v3-event-presenter-${index}`}
              className="inline-flex items-center"
            >
              {presenter?.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function EventMetaItem({
  icon: Icon,
  children,
  tinaData = null,
  tinaFieldName = "",
}) {
  if (!children) return null;

  return (
    <span
      data-tina-field={
        tinaData && tinaFieldName
          ? tinaField(tinaData, tinaFieldName)
          : undefined
      }
      className="flex min-w-0 items-center gap-2"
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex min-w-0 items-center gap-2">{children}</span>
    </span>
  );
}

function EventMetaGrid({ children, className = "" }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-2 text-sm font-light sm:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}

function getPresenterLink(presenter) {
  const url = presenter?.presenter?.peopleProfileURL;
  if (!url) return undefined;
  return url.startsWith("/") ? url : `/${url}`;
}

function getPresenters(event) {
  if (event?.presenterName) {
    return [
      {
        name: event.presenterName,
        link: event.presenterProfileUrl,
      },
    ];
  }

  return (event?.presenterList ?? [])
    .map((item) => item?.presenter)
    .filter(Boolean)
    .map((presenter) => ({
      name: presenter?.presenter?.name,
      link: getPresenterLink(presenter),
    }))
    .filter((presenter) => presenter.name);
}

function getEventLocation(event) {
  if (!event?.city) return "";
  return event.city === "Other" ? event.cityOther : event.city;
}

function getEventTime(event) {
  if (!event?.startDateTime) return "";
  return dayjs(event.startDateTime).format("h:mma AEST");
}

function getFeaturedButton(eventUrl: string, featuredEventDisplay) {
  const button = featuredEventDisplay?.buttons?.filter(Boolean)?.[0];
  const fallbackText = featuredEventDisplay?.registerText ?? "Register Now";

  if (!button) {
    return [{ buttonText: fallbackText, buttonLink: eventUrl, colour: 0 }];
  }

  return [
    {
      ...button,
      buttonText: button.buttonText ?? fallbackText,
      buttonLink: button.leadCaptureFormOption
        ? button.buttonLink
        : button.buttonLink || eventUrl,
    },
  ];
}

function mapCalendarEvent(event, featuredEventDisplay = null) {
  const eventUrl = buildEventUrl(event);
  const imageOverride = featuredEventDisplay?.image?.imageSource
    ? featuredEventDisplay.image
    : null;

  return {
    title: event?.title,
    location: getEventLocation(event),
    image: imageOverride ?? {
      imageSource: event?.thumbnail,
      altText: event?.thumbnailDescription ?? event?.title,
    },
    eventDate: event?.startDateTime,
    date: event?.startDateTime,
    time: getEventTime(event),
    presenters: getPresenters(event),
    buttons: getFeaturedButton(eventUrl, featuredEventDisplay),
    registerLink: eventUrl,
    videoUrl: event?.youTubeId
      ? `https://www.youtube.com/watch?v=${event.youTubeId}`
      : undefined,
  };
}

function getEventNodes(eventsConnection) {
  return (
    eventsConnection?.data?.eventsCalendarConnection?.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean) ?? []
  );
}

function useCalendarEvents(numberOfEvents: number, preloadedEvents = []) {
  const [events, setEvents] = useState(preloadedEvents);

  useEffect(() => {
    if (preloadedEvents.length > 0) {
      setEvents(preloadedEvents);
      return;
    }

    let isMounted = true;

    const fetchEvents = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const events = await getFutureEventsSimple(
        numberOfEvents,
        today.toISOString()
      );

      if (!isMounted || !events?.data) return;

      setEvents(getEventNodes(events));
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [numberOfEvents, preloadedEvents]);

  return events;
}

function FeaturedEvent({ event }) {
  const presenters = (event?.presenters ?? []).filter(Boolean);
  const buttons = (event?.buttons ?? []).filter(Boolean);

  return (
    <div className={cn("relative overflow-hidden rounded-feature")}>
      {event?.image?.imageSource && (
        <Image
          src={event.image.imageSource}
          alt={event.image.altText ?? event?.title ?? ""}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 grid items-center gap-12 p-8 md:grid-cols-2 md:p-16">
        {/* Left: title, description, sign-up */}
        <div className="flex flex-col">
          {event?.title && (
            <h3 className="text-4xl font-medium leading-tight tracking-tight text-white lg:text-5xl">
              {event.title}
            </h3>
          )}
          {(event?.location ||
            event?.eventDate ||
            event?.time ||
            presenters.length > 0) && (
            <EventMetaGrid className="mt-4 text-white">
              <EventMetaItem
                icon={FiMapPin}
                tinaData={event}
                tinaFieldName="location"
              >
                {event?.location}
              </EventMetaItem>
              <EventMetaItem
                icon={FiCalendar}
                tinaData={event}
                tinaFieldName="eventDate"
              >
                {event?.eventDate ? (
                  <span className="min-w-0 truncate">
                    {dayjs(event.eventDate).format("ddd D MMM")}
                  </span>
                ) : null}
              </EventMetaItem>
              <EventMetaItem
                icon={FiClock}
                tinaData={event}
                tinaFieldName="time"
              >
                {event?.time}
              </EventMetaItem>
              {presenters.length > 0 && (
                <PresenterList presenters={presenters} />
              )}
            </EventMetaGrid>
          )}
          {buttons.length > 0 && (
            <ButtonRow data={{ buttons }} className="mt-8 justify-start" />
          )}
        </div>

        {/* Right: countdown */}
        <div className="flex flex-col items-center gap-6">
          <Countdown date={event?.eventDate} />
        </div>
      </div>
    </div>
  );
}

function EventListItem({ event }) {
  const hasVideo = Boolean(event?.videoUrl);
  const image = event?.image?.imageSource;
  const presenters = (event?.presenters ?? []).filter(Boolean);

  return (
    <div
      className={cn(
        "group relative flex min-h-[172px] overflow-hidden rounded-card bg-sswBorder transition-colors duration-300 hover:bg-white/10",
        event?.registerLink && "cursor-pointer"
      )}
    >
      {event?.registerLink && (
        <Link
          href={event.registerLink}
          aria-label={`Register for ${event?.title ?? "this event"}`}
          className="absolute inset-0 z-10 rounded-card !no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
      )}

      {/* When there's a video, lift the media above the card-wide link overlay
          so clicking the thumbnail opens the modal instead of navigating. */}
      <div
        className={cn(
          "relative hidden w-[32%] max-w-[285px] shrink-0 sm:block",
          hasVideo && "z-20"
        )}
      >
        {hasVideo ? (
          <VideoModal
            url={event.videoUrl}
            thumbnail={image}
            roundedEdges={false}
          />
        ) : (
          image && (
            <Image
              src={image}
              alt={event?.image?.altText ?? event?.title ?? ""}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          )
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 py-6 sm:px-6 lg:px-8">
        {event?.title && (
          <h4 className="text-2xl font-semibold leading-tight text-white">
            {event.title}
          </h4>
        )}
        {(event?.time ||
          event?.date ||
          event?.location ||
          presenters.length > 0) && (
          <EventMetaGrid className="mt-4 text-gray-300">
            <EventMetaItem icon={FiMapPin}>{event?.location}</EventMetaItem>
            <EventMetaItem icon={FiCalendar}>
              {event?.date ? (
                <>
                  <span className="min-w-0 truncate">
                    {dayjs(event.date).format("ddd D MMM")}
                  </span>
                  <DaysToGoBadge date={event.date} />
                </>
              ) : null}
            </EventMetaItem>
            <EventMetaItem icon={FiClock}>{event?.time}</EventMetaItem>
            {presenters.length > 0 && <PresenterList presenters={presenters} />}
          </EventMetaGrid>
        )}
      </div>

      {event?.registerLink && (
        <div className="pointer-events-none relative z-20 flex items-end px-5 py-6 sm:px-6">
          <span className="flex size-12 shrink-0 scale-100 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-110">
            <BsArrowUpRight className="size-1/3" />
          </span>
        </div>
      )}
    </div>
  );
}

export function V3Events({ data }) {
  const numberOfEvents = data?.numberOfEvents ?? 3;
  const preloadedEvents = useMemo(
    () => getEventNodes(data?.events),
    [data?.events]
  );
  const calendarEvents = useCalendarEvents(numberOfEvents, preloadedEvents);
  const featuredEvent =
    calendarEvents.length > 0
      ? mapCalendarEvent(calendarEvents[0], data?.featuredEvent)
      : data?.featuredEvent;
  const eventCards =
    calendarEvents.length > 0
      ? calendarEvents.slice(1).map((event) => mapCalendarEvent(event))
      : (data?.eventCards ?? []).filter(Boolean);
  const hasFeatured = featuredEvent?.title || featuredEvent?.image?.imageSource;
  const seeMoreButtons =
    data?.seeMoreButton?.length > 0
      ? data.seeMoreButton
      : data?.seeMoreLink
        ? [
            {
              buttonText: data.seeMoreText ?? "See More Events",
              buttonLink: data.seeMoreLink,
              colour: 0,
            },
          ]
        : [];

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-4"
        className="flex max-w-screen-xl flex-col gap-8 py-24"
      >
        <SectionHeader data={data} />

        {hasFeatured && (
          <div
            className="px-4 lg:px-0"
            data-tina-field={
              calendarEvents.length === 0 && data?.featuredEvent
                ? tinaField(data.featuredEvent, "title")
                : undefined
            }
          >
            <FeaturedEvent event={featuredEvent} />
          </div>
        )}

        {eventCards.length > 0 && (
          <>
            <div className="flex flex-col gap-8 px-4 lg:px-0">
              {eventCards.map((event, index) => (
                <div
                  key={`v3-event-card-${index}`}
                  data-tina-field={
                    calendarEvents.length === 0
                      ? tinaField(event, "title")
                      : undefined
                  }
                >
                  <EventListItem event={event} />
                </div>
              ))}
            </div>

            {seeMoreButtons.length > 0 && (
              <div className="flex justify-end px-4 lg:px-0">
                <ButtonRow
                  className="mt-0 hidden justify-end lg:block"
                  data={{ buttons: seeMoreButtons }}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
