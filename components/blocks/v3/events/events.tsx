"use client";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FiCalendar, FiClock, FiMapPin, FiUser } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { SectionHeader } from "../shared/sectionHeader";
import { Countdown } from "./countdown";

function PresenterList({ presenters }) {
  if (presenters.length === 0) return null;

  return (
    <div className="relative z-10 flex items-center gap-2">
      <FiUser className="size-4 shrink-0" />
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {presenters.map((presenter, index) => {
          const content = <span>{presenter?.name}</span>;

          return presenter?.link ? (
            <Link
              key={`v3-event-presenter-${index}`}
              href={presenter.link}
              className="inline-flex items-center !no-underline transition-colors hover:text-white"
            >
              {content}
            </Link>
          ) : (
            <span
              key={`v3-event-presenter-${index}`}
              className="inline-flex items-center"
            >
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedEvent({ event }) {
  const presenters = (event?.presenters ?? []).filter(Boolean);

  return (
    <div className={cn("relative overflow-hidden rounded-[45px]")}>
      {event?.image?.imageSource && (
        <Image
          src={event.image.imageSource}
          alt={event.image.altText ?? event?.title ?? ""}
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 grid items-center gap-12 p-8 md:grid-cols-2 md:p-16">
        {/* Left: title, description, sign-up */}
        <div className="flex flex-col">
          {event?.title && (
            <h3 className="text-4xl font-medium leading-tight tracking-tight text-white lg:text-5xl">
              {event.title}
            </h3>
          )}
          {event?.location && (
            <span
              data-tina-field={tinaField(event, "location")}
              className="mt-4 flex items-center gap-2 text-sm font-light text-white"
            >
              <FiMapPin className="size-4" />
              {event.location}
            </span>
          )}
          {event?.eventDate && (
            <span
              data-tina-field={tinaField(event, "eventDate")}
              className="mt-2 flex items-center gap-2 text-sm font-light text-white"
            >
              <FiCalendar className="size-4" />
              {dayjs(event.eventDate).format("ddd D MMM")}
            </span>
          )}
          {event?.time && (
            <span
              data-tina-field={tinaField(event, "time")}
              className="mt-2 flex items-center gap-2 text-sm font-light text-white"
            >
              <FiClock className="size-4" />
              {event.time}
            </span>
          )}
          {presenters.length > 0 && (
            <div className="mt-2 flex flex-col gap-2 text-sm font-light text-white">
              <PresenterList presenters={presenters} />
            </div>
          )}
          {event?.description && (
            <p className="mt-6 max-w-md text-base font-light text-gray-300">
              {event.description}
            </p>
          )}
          {event?.registerLink && (
            <div className="mt-8">
              <Link
                href={event.registerLink}
                data-tina-field={tinaField(event, "registerText")}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-black !no-underline transition-opacity hover:opacity-90"
              >
                {event.registerText ?? "Register Now"}
              </Link>
            </div>
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
        "group relative flex min-h-[172px] overflow-hidden rounded-[15px] bg-sswBorder transition-colors duration-300 hover:bg-white/10",
        event?.registerLink && "cursor-pointer"
      )}
    >
      {/* When there's a video, lift the media above the card-wide link overlay
          so clicking the thumbnail opens the modal instead of navigating. */}
      <div
        className={cn(
          "relative hidden w-[32%] max-w-[285px] shrink-0 sm:block",
          hasVideo && "z-10"
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
        {event?.description && (
          <p className="mt-2 max-w-2xl text-base font-light text-gray-400">
            {event.description}
          </p>
        )}
        {(event?.time ||
          event?.date ||
          event?.location ||
          presenters.length > 0) && (
          <div className="mt-4 flex flex-col gap-2 text-sm font-light text-gray-300">
            {event?.location && (
              <span className="flex items-center gap-2">
                <FiMapPin className="size-4" />
                {event.location}
              </span>
            )}
            {event?.date && (
              <span className="flex items-center gap-2">
                <FiCalendar className="size-4" />
                {dayjs(event.date).format("ddd D MMM")}
              </span>
            )}
            {event?.time && (
              <span className="flex items-center gap-2">
                <FiClock className="size-4" />
                {event.time}
              </span>
            )}
            {presenters.length > 0 && <PresenterList presenters={presenters} />}
          </div>
        )}
      </div>

      {event?.registerLink && (
        <Link
          href={event.registerLink}
          aria-label={`Register for ${event?.title ?? "this event"}`}
          className="flex items-end px-5 py-6 !no-underline sm:px-6"
        >
          <span className="flex size-12 shrink-0 scale-100 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-110">
            <BsArrowUpRight className="size-1/3" />
          </span>
        </Link>
      )}
    </div>
  );
}

export function V3Events({ data }) {
  const eventCards = (data?.eventCards ?? []).filter(Boolean);
  const hasFeatured =
    data?.featuredEvent?.title || data?.featuredEvent?.image?.imageSource;
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
            data-tina-field={tinaField(data.featuredEvent, "title")}
          >
            <FeaturedEvent event={data.featuredEvent} />
          </div>
        )}

        {eventCards.length > 0 && (
          <>
            <div className="flex flex-col gap-8 px-4 lg:px-0">
              {eventCards.map((event, index) => (
                <div
                  key={`v3-event-card-${index}`}
                  data-tina-field={tinaField(event, "title")}
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
