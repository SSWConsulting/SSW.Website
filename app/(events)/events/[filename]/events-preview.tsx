"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import { EventsRelativeBox } from "@/components/events/eventsRelativeBox";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useFormatDates } from "@/hooks/useFormatDates";
import type { EventsCalendarQuery } from "@/tina/types";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type EventData = EventsCalendarQuery["eventsCalendar"];

export default function EventsPreview({ event }: { event: EventData }) {
  const { relativeDate, formattedDate } = useFormatDates(
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

  const firstPresenter = event.presenterList?.[0]?.presenter;
  const presenterName = firstPresenter?.presenter?.name;
  const presenterUrl = firstPresenter?.presenter?.peopleProfileURL;
  const presenterPhoto = firstPresenter?.profileImg;
  const presenterAbout = firstPresenter?.about;
  const presenterPosition = firstPresenter?.position;

  const city = event.cityOther || event.city;

  return (
    <>
      {/* Hero */}
      <Section>
        <Image
          src="/images/events-processor-bg.png"
          className="opacity-10 saturate-50 filter"
          alt="Event Background"
          layout="fill"
          objectFit="cover"
        />
        <Container className="z-10" width="medium" size="large">
          {event.calendarType && (
            <p className="mb-7 text-sm font-semibold uppercase tracking-wider text-sswRed">
              {event.calendarType}
            </p>
          )}
          <div className="flex items-center gap-6">
            {event.thumbnail && (
              <div className="relative size-24 shrink-0 self-start overflow-hidden rounded-md bg-white">
                <Image
                  fill
                  src={event.thumbnail}
                  alt={event.title}
                  objectFit="contain"
                />
              </div>
            )}
            <h1 className="mt-0 self-start pt-0 max-md:text-2xl">
              {event.title}
            </h1>
          </div>
          <div className="">
            <EventsRelativeBox
              className="bg-ssw-black text-white"
              relativeDate={relativeDate}
              formattedDate={formattedDate}
              dateFontSize="text-base"
            />
          </div>
          {city && (
            <p className="mb-6 flex items-center gap-1 text-gray-600">{city}</p>
          )}
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            <RippleButton variant="primary">Register Now</RippleButton>
          </a>
        </Container>
      </Section>

      {/* Abstract / Description */}
      {(event.description || event.abstract) && (
        <Section>
          <Container width="medium" size="medium">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex-1">
                <h2 className="mb-4 mt-0 text-lg font-semibold text-sswRed">
                  About the Event
                </h2>
                <section className="prose max-w-none">
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

              <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:w-64">
                {formattedDate && (
                  <>
                    <div className="mb-4 flex items-start gap-3">
                      <Calendar
                        size={18}
                        className="mt-0.5 shrink-0 text-sswRed"
                      />
                      <span className="text-sm text-gray-700">
                        {formattedDate}
                      </span>
                    </div>
                  </>
                )}
                {city && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-sswRed" />
                    <span className="text-sm text-gray-700">{city}</span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Speaker */}
      {presenterName && (
        <Section color="lightgray">
          <Container width="medium" size="medium">
            <h2 className="mb-6 mt-0 text-lg font-semibold text-sswRed">
              About the Speaker
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                {presenterPhoto && (
                  <Image
                    src={presenterPhoto}
                    alt={presenterName}
                    width={220}
                    height={220}
                    className="size-16 shrink-0 rounded-full object-cover"
                  />
                )}
                <div>
                  {presenterUrl ? (
                    <CustomLink
                      className="font-semibold uppercase underline"
                      href={presenterUrl}
                    >
                      {presenterName}
                    </CustomLink>
                  ) : (
                    <span className="font-semibold uppercase">
                      presenterName
                    </span>
                  )}
                  {presenterPosition && (
                    <p className="text-gray-500">{presenterPosition}</p>
                  )}
                </div>
              </div>
              <div className="prose max-w-none">
                {presenterAbout && (
                  <TinaMarkdown
                    content={presenterAbout}
                    components={componentRenderer}
                  />
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
