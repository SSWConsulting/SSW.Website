"use client";
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
        "relative shrink-0 overflow-hidden rounded-full bg-gray-100 ring-2 ring-sswRed ring-offset-2 ring-offset-white",
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

  const cityLabel =
    event.cityOther || CITY_MAP[event.city]?.name || event.city;
  const locationLine = [event.venue, cityLabel].filter(Boolean).join(", ");

  const presenters = event.presenterList ?? [];
  const validPresenters = presenters.filter(
    (p) => p?.presenter?.presenter?.name
  );
  const speakerCount = validPresenters.length;
  const firstSpeaker = validPresenters[0]?.presenter;

  return (
    <>
      {/* Hero */}
      <Section className="py-8 md:py-12">
        <Container width="custom" size="custom" className="w-full max-w-8xl">
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 px-6 py-10 md:px-14 md:py-14">
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
                  {relativeDate && (
                    <span
                      data-tina-field={tinaField(event, "startDateTime")}
                      className="flex items-center gap-2 text-sswRed"
                    >
                      <span
                        className="size-2 rounded-full bg-sswRed"
                        aria-hidden
                      />
                      {relativeDate}
                    </span>
                  )}
                  {(event.calendarType || event.entryCost) && (
                    <span className="flex items-center gap-2 text-gray-400">
                      {event.calendarType && (
                        <span data-tina-field={tinaField(event, "calendarType")}>
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
                  className="mb-6 mt-0 max-w-3xl py-0 text-4xl font-bold leading-[1.1] text-sswBlack md:text-6xl"
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

                {/* Register */}
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RippleButton className="text-base" variant="primary">
                      Register now
                    </RippleButton>
                  </a>
                )}
              </div>

              {/* Speaker(s) */}
              {speakerCount > 0 && (
                <div
                  data-tina-field={tinaField(event, "presenterList")}
                  className="flex shrink-0 flex-col items-center gap-4 md:w-44"
                >
                  {speakerCount === 1 ? (
                    <SpeakerAvatar
                      photo={firstSpeaker?.profileImg}
                      name={firstSpeaker?.presenter?.name}
                    />
                  ) : (
                    <div className="flex -space-x-6">
                      {validPresenters.slice(0, 4).map((item, index) => (
                        <SpeakerAvatar
                          key={`hero-speaker-${index}`}
                          size="size-16"
                          photo={item.presenter?.profileImg}
                          name={item.presenter?.presenter?.name}
                        />
                      ))}
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-bold leading-tight text-sswBlack">
                      {speakerCount === 1
                        ? firstSpeaker?.presenter?.name
                        : `${speakerCount} Speakers`}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {speakerCount === 1 ? "Speaker" : "Speakers"}
                    </p>
                  </div>
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
                  <BreadcrumbPage className="max-w-[16rem] truncate text-gray-500">
                    {event.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Container>
      </Section>

      {(event.description || event.abstract) && (
        <Section>
          <Container className="w-full max-w-8xl" width="custom" size="medium">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {event.thumbnail && (
                <div className="w-full shrink-0 rounded-xl bg-gray-75 p-5 md:order-last md:w-64">
                  <div className="flex justify-center">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-arcBackground bg-contain bg-bottom bg-no-repeat">
                      <div className="absolute left-1/2 top-1/2 mx-auto size-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white">
                        <Image
                          fill
                          src={event.thumbnail}
                          alt={event.title}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-1">
                <h2 className="mb-4 mt-0 text-base font-semibold text-sswRed">
                  About the Event
                </h2>
                <section
                  data-tina-field={tinaField(event, "description")}
                  className="prose max-w-none"
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
              </div>
            </div>
          </Container>
        </Section>
      )}
      {validPresenters.length > 0 && (
        <Section color="lightgray">
          <Container width="custom" size="medium" className="w-full max-w-8xl">
            <h2 className="mb-6 mt-0 text-lg font-semibold text-sswRed">
              {validPresenters.length > 1
                ? "About the Speakers"
                : "About the Speaker"}
            </h2>
            <div className="flex flex-col gap-10">
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
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-4">
                      {photo && (
                        <Image
                          src={photo}
                          alt={name}
                          width={220}
                          height={220}
                          className="size-16 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <div>
                        {url ? (
                          <CustomLink
                            className="font-semibold uppercase underline"
                            href={url}
                          >
                            {name}
                          </CustomLink>
                        ) : (
                          <span className="font-semibold uppercase">
                            {name}
                          </span>
                        )}
                        {position && (
                          <p className="text-gray-500">{position}</p>
                        )}
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      {about && (
                        <TinaMarkdown
                          content={about}
                          components={componentRenderer}
                        />
                      )}
                    </div>
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
