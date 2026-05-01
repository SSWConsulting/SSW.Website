"use client";

import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import { EventsRelativeBox } from "@/components/events/eventsRelativeBox";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useFormatDates } from "@/hooks/useFormatDates";
import type { EventsCalendarQuery } from "@/tina/types";
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
  const presenterPhoto = firstPresenter?.torsoImg || firstPresenter?.profileImg;
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sswRed">
              {event.calendarType}
            </p>
          )}
          <h1 className="mb-6">{event.title}</h1>
          <div className="">
            <EventsRelativeBox
              className="bg-ssw-black text-white"
              relativeDate={relativeDate}
              formattedDate={formattedDate}
              dateFontSize="text-base"
            />
          </div>
          {city && <p className="mb-6 text-gray-600">{city}</p>}
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            <RippleButton variant="primary">Register Now</RippleButton>
          </a>
        </Container>
      </Section>

      {/* Abstract / Description */}
      {(event.description || event.abstract) && (
        <Section>
          <Container width="medium" size="medium">
            <p className="prose mb-4 text-sm font-semibold uppercase tracking-widest text-sswRed">
              About the Event
            </p>

            <section className="prose">
              {event.description ? (
                <TinaMarkdown
                  content={event.description}
                  components={componentRenderer}
                />
              ) : (
                <p className="whitespace-pre-line">{event.abstract}</p>
              )}
            </section>
          </Container>
        </Section>
      )}

      {/* Speaker */}
      {presenterName && (
        <Section color="lightgray">
          <Container width="medium" size="medium">
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-sswRed">
              About the Speaker
            </p>
            <div className="flex flex-col gap-8 md:flex-row">
              {presenterPhoto && (
                <div className="shrink-0">
                  <Image
                    src={presenterPhoto}
                    alt={presenterName}
                    width={220}
                    height={220}
                    className="rounded object-cover"
                  />
                </div>
              )}
              <div>
                {presenterUrl ? (
                  <CustomLink href={presenterUrl}>
                    <h2 className="mb-1 text-2xl font-bold">{presenterName}</h2>
                  </CustomLink>
                ) : (
                  <h2 className="mb-1 text-2xl font-bold">{presenterName}</h2>
                )}
                {presenterPosition && (
                  <p className="mb-4 text-gray-500">{presenterPosition}</p>
                )}
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

      {/* CTA */}
      <Section>
        <Container width="medium" size="medium" className="text-center">
          <h2 className="mb-6 text-white">Ready to Register?</h2>
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            <RippleButton variant="primary">Register Now</RippleButton>
          </a>
        </Container>
      </Section>
    </>
  );
}
