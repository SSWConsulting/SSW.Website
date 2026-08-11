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
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type EventData = EventsCalendarQuery["eventsCalendar"];

type EventsPreviewProps = {
  tinaProps: { data: object };
};

// Circular speaker portrait with the SSW-red ring used in the hero.
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
        "relative shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-sswRed",
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

export default function EventsPreview({ tinaProps }: EventsPreviewProps) {
  const event = (tinaProps.data as { eventsCalendar: EventData })
    .eventsCalendar;

  const { relativeDate, formattedDateParts } = useFormatDates(
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

  const cityLabel = event.cityOther || CITY_MAP[event.city]?.name || event.city;
  const locationLine = [event.venue, cityLabel].filter(Boolean).join(", ");

  const presenters = event.presenterList ?? [];
  const validPresenters = presenters.filter(
    (p) => p?.presenter?.presenter?.name
  );

  // `relativeDate` is "" during SSR then filled on the client, so `isPast`
  // stays false until hydration and the status line renders consistently.
  const isPast = relativeDate.endsWith("ago");
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
                  <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                    <RippleButton className="text-base" variant="primary">
                      {ctaLabel}
                    </RippleButton>
                  </a>
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

      {(event.lead || event.description || event.abstract) && (
        <Section>
          <Container className="w-full max-w-8xl" width="custom" size="medium">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-sswRed">
                About the Event
              </p>
              {event.lead && (
                <p
                  data-tina-field={tinaField(event, "lead")}
                  className="mb-8 text-pretty text-2xl font-normal leading-snug text-sswBlack md:text-3xl"
                >
                  {event.lead}
                </p>
              )}
              {(event.description || event.abstract) && (
                <section
                  data-tina-field={tinaField(event, "description")}
                  className="prose prose-lg max-w-none text-gray-600"
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
            </div>
          </Container>
        </Section>
      )}
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

                const cardClass =
                  "unstyled group relative flex flex-col rounded-2xl border-0.75 border-gray-100 bg-gray-50 p-6 pb-20 text-inherit no-underline transition-colors duration-300 hover:border-gray-200 hover:bg-white md:p-8 md:pb-20";

                const cardBody = (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-transparent transition-all duration-300 group-hover:ring-sswRed">
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
                        <h3 className="m-0 text-xl font-bold text-sswBlack underline decoration-1 underline-offset-4">
                          {name}
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
                      <ArrowCircle
                        className="absolute bottom-6 right-6 size-12"
                        iconClassName="size-4"
                      />
                    )}
                  </>
                );

                return url ? (
                  <CustomLink
                    key={`presenter-${index}-${name}`}
                    href={url}
                    className={cardClass}
                  >
                    {cardBody}
                  </CustomLink>
                ) : (
                  <div key={`presenter-${index}-${name}`} className={cardClass}>
                    {cardBody}
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
