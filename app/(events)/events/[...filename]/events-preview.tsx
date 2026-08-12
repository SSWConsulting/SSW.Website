"use client";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CITY_MAP } from "@/components/util/constants/country";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useFormatDates } from "@/hooks/useFormatDates";
import { cn } from "@/lib/utils";
import type { EventsCalendarQuery } from "@/tina/types";
import {
  Calendar,
  CalendarPlus,
  Check,
  Clock,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type EventData = EventsCalendarQuery["eventsCalendar"];

type EventsPreviewProps = {
  tinaProps: { data: object };
};

// Circular speaker portrait with a neutral grey ring, used in the hero.
// Falls back to a neutral placeholder when no photo is set.
function SpeakerAvatar({
  photo,
  name,
  size = "size-32",
}: {
  photo?: string | null;
  name?: string | null;
  size?: string;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200",
        size
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name ?? "Speaker"}
          fill
          className="object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center text-gray-300">
          <User className="size-1/2" aria-hidden />
        </span>
      )}
    </div>
  );
}

// Escape reserved characters for an iCalendar text value. Windows line endings
// are normalised first so a bare CR never lands inside a value (RFC 5545).
function escapeIcs(text: string) {
  return (text || "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n?/g, "\n")
    .replace(/\n/g, "\\n");
}

// Fold content lines longer than 75 octets, per RFC 5545.
function foldIcsLine(line: string) {
  if (line.length <= 75) return line;
  let folded = line.slice(0, 75);
  let rest = line.slice(75);
  while (rest.length) {
    folded += `\r\n ${rest.slice(0, 74)}`;
    rest = rest.slice(74);
  }
  return folded;
}

// ISO date -> iCalendar UTC stamp, e.g. 20260916T073000Z.
function toIcsDate(iso: string) {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function buildIcs({
  title,
  start,
  end,
  location,
  url,
  uid,
}: {
  title: string;
  start: string;
  end: string;
  location: string;
  url?: string | null;
  uid: string;
}) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SSW//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    location ? `LOCATION:${escapeIcs(location)}` : "",
    url ? `URL:${url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .map(foldIcsLine)
    .join("\r\n");
}

type EventSidebarProps = {
  event: EventData;
  ctaLabel: string;
  ctaHref?: string | null;
  dateChip: { month: string; day: string };
  dateLine: string;
  timeLine: string;
};

// Sticky event-details card shown alongside the About content.
function EventSidebar({
  event,
  ctaLabel,
  ctaHref,
  dateChip,
  dateLine,
  timeLine,
}: EventSidebarProps) {
  const [copied, setCopied] = useState(false);

  const city = event.cityOther || event.city;
  const state = CITY_MAP[event.city]?.state;
  // Only link to the SSW chapel page when we're actually using that chapel as
  // the venue; a custom venue name links nowhere rather than the wrong place.
  const venueUrl = event.venue ? null : CITY_MAP[event.city]?.url;
  const venueName = event.venue || CITY_MAP[event.city]?.name;
  const cityStateLine = [city, state].filter(Boolean).join(", ");
  const dateNoYear = dateLine.replace(/,\s*\d{4}$/, "");

  const handleAddToCalendar = () => {
    if (!event.startDateTime || !event.endDateTime) return;
    const ics = buildIcs({
      title: event.title,
      start: event.startDateTime,
      end: event.endDateTime,
      location: [venueName, cityStateLine].filter(Boolean).join(", "),
      url: event.url,
      uid: `${event.slug || event.title}@ssw.com.au`,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${event.slug || "event"}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : event.url;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: event.title, url: shareUrl });
      } catch {
        /* share cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const secondaryButton =
    "flex items-center justify-center gap-2 rounded-md border-0.75 border-gray-200 px-3 py-2 text-sm font-medium text-sswBlack transition-colors hover:border-sswRed hover:text-sswRed";

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-80">
      <div className="overflow-hidden rounded-2xl border-0.75 border-gray-200 bg-white shadow-sm">
        {event.bannerImage ? (
          <div className="relative aspect-video h-28 w-full lg:h-auto">
            <Image
              src={event.bannerImage}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        ) : event.thumbnail ? (
          <div className="relative flex aspect-video h-28 w-full items-center justify-center border-b-0.75 border-gray-100 bg-gray-50 lg:h-auto">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-red-100/50 via-transparent to-transparent"
            />
            <Image
              src={event.thumbnail}
              alt={event.title}
              width={240}
              height={120}
              className="relative max-h-20 w-auto object-contain"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Event details
            </span>
            {event.entryCost && (
              <span
                data-tina-field={tinaField(event, "entryCost")}
                className="text-lg font-semibold text-sswRed"
              >
                {event.entryCost}
              </span>
            )}
          </div>

          <div className="flex items-start gap-3">
            {/* Dates are formatted client-side (timezone), so render the chip
                only once filled — an empty red square would flash otherwise. */}
            {dateChip.month && (
              <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-sswRed leading-none text-white">
                <span className="text-xxs font-semibold uppercase tracking-wider">
                  {dateChip.month}
                </span>
                <span className="text-lg font-bold">{dateChip.day}</span>
              </div>
            )}
            <div data-tina-field={tinaField(event, "startDateTime")}>
              {dateNoYear && (
                <p className="font-medium text-sswBlack">{dateNoYear}</p>
              )}
              {timeLine && <p className="text-sm text-gray-500">{timeLine}</p>}
            </div>
          </div>

          {(venueName || cityStateLine) && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-sswRed" />
              <div data-tina-field={tinaField(event, "venue")}>
                {venueName &&
                  (venueUrl ? (
                    <a
                      href={venueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sswBlack underline underline-offset-2 hover:text-sswRed"
                    >
                      {venueName}
                    </a>
                  ) : (
                    <span className="font-medium text-sswBlack">
                      {venueName}
                    </span>
                  ))}
                {cityStateLine && (
                  <p className="text-sm text-gray-500">{cityStateLine}</p>
                )}
              </div>
            </div>
          )}

          {ctaHref && (
            <RippleButton
              href={ctaHref}
              target="_blank"
              variant="primary"
              className="block w-full text-base"
            >
              {ctaLabel}
            </RippleButton>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCalendar}
              className={secondaryButton}
            >
              <CalendarPlus size={16} /> Add to calendar
            </button>
            <button
              type="button"
              onClick={handleShare}
              className={secondaryButton}
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied
                </>
              ) : (
                <>
                  <Share2 size={16} /> Share
                </>
              )}
            </button>
          </div>

          {(event.availability || event.hostedAtSsw) && (
            <hr className="border-gray-100" />
          )}
          {event.availability && (
            <div
              data-tina-field={tinaField(event, "availability")}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sswRed"
            >
              <span className="size-2 rounded-full bg-sswRed" aria-hidden />
              {event.availability}
            </div>
          )}
          {event.hostedAtSsw && (
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
              Hosted by SSW
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default function EventsPreview({ tinaProps }: EventsPreviewProps) {
  const event = (tinaProps.data as { eventsCalendar: EventData })
    .eventsCalendar;

  const { relativeDate, formattedDateParts, dateChip } = useFormatDates(
    {
      title: event.title,
      url: event.url,
      startDateTime: event.startDateTime
        ? new Date(event.startDateTime)
        : undefined,
      endDateTime: event.endDateTime ? new Date(event.endDateTime) : undefined,
    },
    true
  );

  // Venue + city, e.g. "SSW Chapel, Melbourne"; falls back to the CITY_MAP
  // name (which already includes the city) when no venue is set.
  const cityName = event.cityOther || event.city;
  const locationLine = event.venue
    ? [event.venue, cityName].filter(Boolean).join(", ")
    : CITY_MAP[event.city]?.name || cityName;

  const presenters = event.presenterList ?? [];
  const validPresenters = presenters.filter(
    (p) => p?.presenter?.presenter?.name
  );

  // Compare the end date directly so the CTA/status are correct during SSR too
  // (both sides are absolute instants — no timezone drift, no relative-copy coupling).
  const isPast =
    !!event.endDateTime && new Date(event.endDateTime) < new Date();
  const statusLabel = isPast ? "Past event" : relativeDate;

  const recordingUrl = event.youTubeId
    ? `https://www.youtube.com/watch?v=${event.youTubeId}`
    : event.trailerUrl;
  const showRecordingCta = isPast && !!recordingUrl;

  const registerLabel = [event.ctaLabel || "Register now", event.price]
    .filter(Boolean)
    .join(" · ");
  const ctaLabel = showRecordingCta ? "Watch the recording" : registerLabel;
  const ctaHref = showRecordingCta ? recordingUrl : event.url;

  return (
    <>
      {/* Hero */}
      <Section className="py-8 md:py-12">
        <Container width="custom" size="custom" className="w-full max-w-8xl">
          <div className="relative overflow-hidden rounded-3xl border-0.75 border-gray-100 bg-gray-50 px-6 py-10 md:p-14">
            {/* Dotted texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            {/* Warm tint towards the top-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-red-100/60 via-transparent to-transparent"
            />

            <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
              <div className="min-w-0 flex-1">
                {/* Label row */}
                <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold uppercase tracking-widest">
                  {statusLabel && (
                    <span
                      data-tina-field={tinaField(event, "startDateTime")}
                      className={cn(
                        "flex items-center gap-2",
                        isPast ? "text-gray-400" : "text-sswRed"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          isPast ? "bg-gray-400" : "bg-sswRed"
                        )}
                        aria-hidden
                      />
                      {statusLabel}
                    </span>
                  )}
                  {(event.calendarType || event.entryCost) && (
                    <span className="flex items-center gap-2 text-gray-400">
                      {event.calendarType && (
                        <span
                          data-tina-field={tinaField(event, "calendarType")}
                        >
                          {event.calendarType}
                        </span>
                      )}
                      {event.calendarType && event.entryCost && (
                        <span aria-hidden>·</span>
                      )}
                      {event.entryCost && (
                        <span data-tina-field={tinaField(event, "entryCost")}>
                          {event.entryCost}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  data-tina-field={tinaField(event, "title")}
                  className="mb-6 mt-0 max-w-3xl py-0 text-4xl font-bold leading-tight text-sswBlack md:text-6xl"
                >
                  {event.title}
                </h1>

                {/* Date / time / location */}
                <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 md:text-base">
                  {formattedDateParts.date && (
                    <span
                      data-tina-field={tinaField(event, "startDateTime")}
                      className="flex items-center gap-2"
                    >
                      <Calendar size={18} className="shrink-0 text-sswRed" />
                      {formattedDateParts.date}
                    </span>
                  )}
                  {formattedDateParts.time && (
                    <span className="flex items-center gap-2">
                      <Clock size={18} className="shrink-0 text-sswRed" />
                      {formattedDateParts.time}
                    </span>
                  )}
                  {locationLine && (
                    <span
                      data-tina-field={tinaField(event, "venue")}
                      className="flex items-center gap-2"
                    >
                      <MapPin size={18} className="shrink-0 text-sswRed" />
                      {locationLine}
                    </span>
                  )}
                </div>

                {/* Call to action */}
                {ctaHref && (
                  <RippleButton
                    href={ctaHref}
                    target="_blank"
                    variant="primary"
                    className="inline-block text-base"
                  >
                    {ctaLabel}
                  </RippleButton>
                )}
              </div>

              {/* Speaker(s) */}
              {validPresenters.length > 0 && (
                <div
                  data-tina-field={tinaField(event, "presenterList")}
                  className="flex shrink-0 flex-wrap items-start justify-center gap-x-6 gap-y-8 md:max-w-md md:justify-end"
                >
                  {validPresenters.map((item, index) => (
                    <div
                      key={`hero-speaker-${index}`}
                      className="flex w-28 flex-col items-center gap-3 text-center"
                    >
                      <SpeakerAvatar
                        size="size-28"
                        photo={item.presenter?.profileImg}
                        name={item.presenter?.presenter?.name}
                      />
                      <div>
                        <p className="font-bold leading-tight text-sswBlack">
                          {item.presenter?.presenter?.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                          {item.role || "Speaker"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="mt-6">
            <Breadcrumb>
              <BreadcrumbList className="gap-2 text-xs font-medium uppercase tracking-widest text-gray-400">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-gray-400 underline-offset-2 hover:text-sswRed"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/events"
                    className="text-gray-400 underline-offset-2 hover:text-sswRed"
                  >
                    Events
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-64 truncate text-gray-500">
                    {event.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Container>
      </Section>

      {/* Plain <section>, not <Section>: Section sets overflow-hidden, which
          would disable the sidebar's position: sticky. */}
      <section className="relative">
        <Container className="w-full max-w-8xl" width="custom" size="medium">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="min-w-0 flex-1">
              {(event.lead || event.description || event.abstract) && (
                <>
                  <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-sswRed">
                    About the Event
                  </p>
                  {event.lead && (
                    <p
                      data-tina-field={tinaField(event, "lead")}
                      className="mb-8 max-w-3xl text-pretty text-2xl font-normal leading-snug text-sswBlack md:text-3xl"
                    >
                      {event.lead}
                    </p>
                  )}
                  {(event.description || event.abstract) && (
                    <section
                      data-tina-field={tinaField(event, "description")}
                      className="prose prose-lg max-w-3xl text-gray-600"
                    >
                      {event.description ? (
                        <TinaMarkdown
                          content={event.description}
                          components={componentRenderer}
                        />
                      ) : (
                        <p className="whitespace-pre-line">{event.abstract}</p>
                      )}
                    </section>
                  )}
                </>
              )}
            </div>
            <EventSidebar
              event={event}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              dateChip={dateChip}
              dateLine={formattedDateParts.date}
              timeLine={formattedDateParts.time}
            />
          </div>
        </Container>
      </section>
      {validPresenters.length > 0 && (
        <Section>
          <Container width="custom" size="medium" className="w-full max-w-8xl">
            <h2 className="mb-8 mt-0 text-sm font-semibold uppercase tracking-widest text-sswRed">
              {validPresenters.length > 1
                ? "About the Speakers"
                : "About the Speaker"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {validPresenters.map((item, index) => {
                const presenter = item.presenter;
                const name = presenter?.presenter?.name as string;
                const url = presenter?.presenter?.peopleProfileURL;
                const photo = presenter?.profileImg;
                const about = presenter?.about;
                const position = presenter?.position;

                return (
                  <div
                    key={`presenter-${index}-${name}`}
                    className={cn(
                      "group relative flex flex-col rounded-2xl border-0.75 border-gray-200 bg-gray-50 p-6 transition-colors duration-300 hover:border-sswRed md:p-8",
                      url && "pb-20 md:pb-20"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200">
                        {photo ? (
                          <Image
                            src={photo}
                            alt={name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex size-full items-center justify-center text-gray-300">
                            <User className="size-1/2" aria-hidden />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="m-0 text-xl font-bold text-sswBlack">
                          {url ? (
                            <CustomLink
                              href={url}
                              className="unstyled text-sswBlack no-underline transition-colors hover:text-sswRed"
                            >
                              {name}
                            </CustomLink>
                          ) : (
                            name
                          )}
                        </h3>
                        {position && (
                          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                            {position}
                          </p>
                        )}
                      </div>
                    </div>
                    {about && (
                      <div className="prose prose-sm mt-5 max-w-none text-gray-600">
                        <TinaMarkdown
                          content={about}
                          components={componentRenderer}
                        />
                      </div>
                    )}
                    {url && (
                      <CustomLink
                        href={url}
                        aria-label={`View ${name}'s profile`}
                        className="unstyled absolute bottom-6 right-6"
                      >
                        <ArrowCircle
                          className="size-12"
                          iconClassName="size-4"
                        />
                      </CustomLink>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
