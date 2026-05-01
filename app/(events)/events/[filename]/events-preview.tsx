"use client";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import RippleButton from "@/components/button/rippleButtonV2";
import { CustomLink } from "@/components/customLink";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useFormatDates } from "@/hooks/useFormatDates";
import { cn } from "@/lib/utils";
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
  const presenterTorso = firstPresenter?.torsoImg;
  const presenterAbout = firstPresenter?.about;
  const presenterPosition = firstPresenter?.position;

  const city = event.cityOther || event.city;

  return (
    <>
      <Section>
        <Image
          quality={100}
          src="/images/background/polygonBackground-light.jpg"
          alt="Event Background"
          layout="fill"
          objectFit="cover"
        />
        <Container className="z-10 w-full py-0" width="medium" size="large">
          <div className="grid items-end lg:grid-cols-4">
            <div
              className={cn(
                "py-20 max-md:pb-8",
                presenterTorso ? "lg:col-span-3" : "lg:col-span-4"
              )}
            >
              <div className="mb-7 flex items-center gap-3">
                {event.calendarType && (
                  <p className="text-nowrap rounded-md bg-ssw-black p-2 py-0.5 text-xs uppercase tracking-widest text-white">
                    {event.calendarType}
                  </p>
                )}
                <hr
                  className="h-px w-10 bg-ssw-gray opacity-100"
                  aria-hidden="true"
                />
                <span className="text-nowrap rounded-md text-sm font-semibold uppercase tracking-wider text-sswBlack">
                  {relativeDate}
                </span>
              </div>
              <div className="mb-1 flex items-center gap-6">
                <h1 className="mt-0 self-start py-0 max-md:text-2xl">
                  {event.title}
                </h1>
              </div>
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <RippleButton className="text-base" variant="primary">
                  Find out more
                </RippleButton>
              </a>
            </div>
            {presenterTorso && (
              <div className="justify-end lg:col-span-1">
                <Image
                  src={presenterTorso}
                  alt={presenterName ?? "Presenter"}
                  height={900}
                  width={900}
                  className="max-lg:mx- object-contain object-bottom"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
      {(event.description || event.abstract) && (
        <Section>
          <Container className="w-full" width="medium" size="medium">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="bg- w-full shrink-0 rounded-xl bg-gray-75 p-5 shadow-sm md:order-last md:w-64">
                {event.thumbnail && (
                  <div className="mb-4 flex justify-center">
                    <div className="bordr-gray-200 bg-ss relative aspect-video w-full overflow-hidden rounded-lg bg-arcBackground bg-contain bg-bottom bg-no-repeat">
                      <div className="absolute left-1/2 top-1/2 mx-auto size-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white">
                        <Image
                          fill
                          src={event.thumbnail}
                          alt={event.title}
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formattedDate && (
                  <div className="mb-4 flex items-start gap-3">
                    <Calendar
                      size={18}
                      className="mt-0.5 shrink-0 text-sswRed"
                    />
                    <span className="text-sm text-gray-700">
                      {formattedDate}
                    </span>
                  </div>
                )}
                {city && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-sswRed" />
                    <span className="text-sm text-gray-700">{city}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="mb-4 mt-0 text-base font-semibold text-sswRed">
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
            </div>
          </Container>
        </Section>
      )}
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
