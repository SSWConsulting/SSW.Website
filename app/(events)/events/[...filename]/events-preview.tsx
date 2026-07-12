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
import {
  DEFAULT_HEADER_LAYOUT,
  type HeaderLayout,
} from "@/tina-collections/events-calendar.constants";
import type { EventsCalendarQuery } from "@/tina/types";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type EventData = EventsCalendarQuery["eventsCalendar"];

type EventsPreviewProps = {
  tinaProps: { data: object };
};

export default function EventsPreview({ tinaProps }: EventsPreviewProps) {
  const event = (tinaProps.data as { eventsCalendar: EventData })
    .eventsCalendar;

  const { relativeDate, formattedDate, formattedDateParts } = useFormatDates(
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

  const locationOverride = CITY_MAP[event.city]?.name || event.city;
  const presenters = event.presenterList ?? [];

  const validPresenters = presenters.filter(
    (p) => p?.presenter?.presenter?.name
  );
  const torsoPresenters = presenters.filter((p) => p?.presenter?.torsoImg);
  const avatarPresenters = presenters.filter((p) => p?.presenter?.profileImg);
  const singlePresenter = torsoPresenters[0]?.presenter;

  const headerLayout: HeaderLayout =
    (event.headerLayout as HeaderLayout) ?? DEFAULT_HEADER_LAYOUT;
  const resolvedLayout: HeaderLayout = (() => {
    if (headerLayout === "none") return "none";
    if (presenters.length === 0) return "none";
    if (headerLayout === "avatars") {
      return avatarPresenters.length > 0 ? "avatars" : "none";
    }
    if (headerLayout === "single") {
      return singlePresenter?.torsoImg ? "single" : "none";
    }
    if (torsoPresenters.length > 1) return "multi-torso";
    if (torsoPresenters.length === 1) return "single";
    if (avatarPresenters.length > 0) return "avatars";
    return "none";
  })();

  const showHeaderMedia = resolvedLayout !== "none";

  const city = event.cityOther || event.city;

  return (
    <>
      <Section>
        <Image
          quality={100}
          className="object-cover"
          src="/images/background/polygonBackground-light.jpg"
          alt="Event Background"
          fill
        />
        <Container className="z-10 w-full py-0" width="default" size="large">
          <div className="grid md:grid-cols-2 md:items-end lg:grid-cols-4">
            <div
              className={cn(
                "py-20 max-md:pb-8 md:flex md:flex-col md:justify-center md:self-stretch",
                showHeaderMedia
                  ? resolvedLayout === "multi-torso"
                    ? // multiple torsos side-by-side need ~half the row
                      "md:col-span-1 lg:col-span-2"
                    : // single torso or avatar stack: leave them a narrow column on the right
                      "md:col-span-1 lg:col-span-3"
                  : // no header media, title takes the full width
                    "md:col-span-2 lg:col-span-4"
              )}
            >
              <div className="mb-7 flex items-center gap-3">
                {event.calendarType && (
                  <p className="text-nowrap rounded-md bg-ssw-black p-2 py-0.5 text-xs uppercase tracking-widest text-white">
                    {event.calendarType}
                  </p>
                )}
                <hr
                  className="h-px w-10 border-ssw-gray-dark"
                  aria-hidden="true"
                />
                <span
                  data-tina-field={tinaField(event, "startDateTime")}
                  className="text-nowrap rounded-md text-sm font-semibold uppercase tracking-wider text-sswBlack"
                >
                  {relativeDate}
                </span>
              </div>
              <div className="mb-1 flex items-center gap-6">
                <h1
                  data-tina-field={tinaField(event, "title")}
                  className="mt-0 self-start py-0 max-md:text-2xl"
                >
                  {event.title}
                </h1>
              </div>
              {event.url && (
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  <RippleButton className="text-base" variant="primary">
                    Find out more
                  </RippleButton>
                </a>
              )}
            </div>
            {resolvedLayout === "single" && singlePresenter?.torsoImg && (
              <div
                data-tina-field={tinaField(event, "headerLayout")}
                className="md:col-span-1 md:justify-end"
              >
                <Image
                  src={singlePresenter.torsoImg}
                  alt={singlePresenter?.presenter?.name ?? "Presenter"}
                  height={900}
                  width={900}
                  className="mx-auto max-h-72 w-auto object-contain object-bottom md:max-h-none md:w-full"
                />
              </div>
            )}
            {resolvedLayout === "multi-torso" && torsoPresenters.length > 0 && (
              <div
                data-tina-field={tinaField(event, "headerLayout")}
                className="flex items-end justify-end md:col-span-1 lg:col-span-2"
              >
                {torsoPresenters.map((item, index) => {
                  const photo = item.presenter?.torsoImg;
                  const name = item.presenter?.presenter?.name ?? "Presenter";
                  if (!photo) return null;
                  return (
                    <div
                      key={`torso-${index}-${name}`}
                      className={cn(
                        "flex-1",
                        index > 0 && "-ml-6 md:-ml-10 lg:-ml-12"
                      )}
                    >
                      <Image
                        src={photo}
                        alt={name}
                        height={900}
                        width={900}
                        className="mx-auto max-h-72 w-auto object-contain object-bottom md:max-h-none md:w-full"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {resolvedLayout === "avatars" && avatarPresenters.length > 0 && (
              <div
                data-tina-field={tinaField(event, "headerLayout")}
                className="flex items-center justify-center py-8 md:col-span-1 md:justify-end md:py-20 md:pl-8"
              >
                <div className="flex flex-wrap justify-center gap-y-2 md:justify-end">
                  {avatarPresenters.map((item, index) => {
                    const photo = item.presenter?.profileImg;
                    const name = item.presenter?.presenter?.name ?? "Presenter";
                    const sizeClass =
                      avatarPresenters.length > 4
                        ? "size-20 md:size-24"
                        : "size-32 md:size-40";
                    const overlapClass =
                      avatarPresenters.length > 4
                        ? "-ml-5 md:-ml-6"
                        : "-ml-8 md:-ml-10";
                    return (
                      <div
                        key={`avatar-${index}-${name}`}
                        className={cn(
                          "relative overflow-hidden rounded-full border-4 border-white shadow-md",
                          sizeClass,
                          index > 0 && overlapClass
                        )}
                      >
                        <Image
                          src={photo}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
      {(event.description || event.abstract) && (
        <Section>
          <Container className="w-full" width="default" size="medium">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="w-full shrink-0 rounded-xl bg-gray-75 p-5 md:order-last md:w-64">
                {event.thumbnail && (
                  <div className="mb-4 flex justify-center">
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
                )}

                {formattedDate && (
                  <div className="mb-4 flex items-start gap-3">
                    <Calendar
                      size={18}
                      className="mt-0.5 shrink-0 text-sswRed"
                    />
                    <span className="text-sm text-gray-700">
                      {formattedDateParts.date}
                      {formattedDateParts.time && (
                        <>
                          <br />
                          {formattedDateParts.time}
                        </>
                      )}
                    </span>
                  </div>
                )}
                {city && (
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-sswRed" />
                    <span className="text-sm text-gray-700">
                      {locationOverride}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Breadcrumb>
                  <BreadcrumbList className="gap-2 text-xs font-normal text-gray-700">
                    <BreadcrumbItem className="font-normal">
                      <BreadcrumbLink
                        href="/"
                        className="text-xs text-gray-700 underline-offset-1 hover:text-sswRed"
                      >
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>{">"}</BreadcrumbSeparator>
                    <BreadcrumbItem className="font-normal">
                      <BreadcrumbLink
                        href="/events"
                        className="text-xs text-gray-700 underline-offset-1 hover:text-sswRed"
                      >
                        Events
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>{">"}</BreadcrumbSeparator>
                    <BreadcrumbItem className="font-normal">
                      <BreadcrumbPage>{event.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h2 className="mb-4 mt-8 text-base font-semibold text-sswRed">
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
          <Container width="default" size="medium">
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
