"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { CarouselMoreCard } from "../shared/carouselMoreCard";
import { SectionHeader } from "../shared/sectionHeader";
import { Countdown } from "./countdown";

function FeaturedEvent({ event }) {
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

        {/* Right: countdown, spots */}
        <div className="flex flex-col items-center gap-6">
          <Countdown date={event?.eventDate} />
          {event?.spotsText && (
            <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
              {event.spotsText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  const hasVideo = Boolean(event?.videoUrl);
  const image = event?.image?.imageSource;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[15px] bg-sswBorder"
      )}
    >
      {/* When there's a video, lift the media above the card-wide link overlay
          so clicking the thumbnail opens the modal instead of navigating. */}
      <div className={cn("relative aspect-video w-full", hasVideo && "z-10")}>
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

      <div className="flex flex-1 flex-col p-4 lg:p-6">
        {(event?.time || event?.date || event?.location) && (
          <div className="flex flex-col gap-1 text-sm font-light text-gray-400">
            <div className="flex flex-wrap items-center gap-4 text-white">
              {event?.date && (
                <span className="flex items-center gap-2">
                  <FiCalendar className="size-4" />
                  {dayjs(event.date).format("ddd D MMM")}
                </span>
              )}
              <span className="flex items-center gap-2 text-white">
                <FiMapPin className="size-4" />
                {event.location}
              </span>
            </div>
            {event?.time && (
              <span className="flex items-center gap-2">
                <FiClock className="size-4" />
                {event.time}
              </span>
            )}
          </div>
        )}
        {event?.title && (
          <h4 className="mt-4 text-xl font-semibold text-white">
            {event.title}
          </h4>
        )}
        {event?.description && (
          <p className="mt-2 text-base font-light text-gray-400">
            {event.description}
          </p>
        )}
        {(event?.presenterImage?.imageSource || event?.registerLink) && (
          <div className="mt-auto flex items-center pt-6">
            {event?.presenterImage?.imageSource && (
              <div className="relative size-12 overflow-hidden">
                <Image
                  src={event.presenterImage.imageSource}
                  alt={event.presenterImage.altText ?? ""}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            {event?.registerLink && (
              <Link
                href={event.registerLink}
                aria-label={`Register for ${event?.title ?? "this event"}`}
                className="ml-auto !no-underline"
              >
                {/* Full-card overlay makes the whole card clickable, not just the
                    arrow. The video modal is raised above it so it stays usable. */}
                <span aria-hidden="true" className="absolute inset-0" />
                <span className="flex size-10 shrink-0 scale-100 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125">
                  <BsArrowUpRight className="size-1/3" />
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function V3Events({ data }) {
  const eventCards = (data?.eventCards ?? []).filter(Boolean);
  const hasFeatured =
    data?.featuredEvent?.title || data?.featuredEvent?.image?.imageSource;
  const moreLink = data?.mobilePlusMore;
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
            {/* Below lg: horizontal finite carousel with a "+ more" end cap */}
            <Carousel
              opts={{ align: "start", loop: false, dragFree: true }}
              autoplay={false}
              className="lg:hidden"
            >
              <CarouselContent className="ml-0">
                {eventCards.map((event, index) => (
                  <CarouselItem
                    key={`v3-event-card-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                  >
                    <EventCard event={event} />
                  </CarouselItem>
                ))}
                {moreLink && (
                  <CarouselItem className="basis-2/3 pl-6 sm:basis-1/3 md:basis-1/4">
                    <CarouselMoreCard href={moreLink} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>

            {/* lg+ : row */}
            <div className="hidden gap-8 lg:flex">
              {eventCards.map((event, index) => (
                <div
                  key={`v3-event-card-${index}`}
                  className="lg:flex-1"
                  data-tina-field={tinaField(event, "title")}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {seeMoreButtons.length > 0 && (
              <div className="flex justify-end px-4 lg:px-0">
                <ButtonRow
                  className="mt-0 justify-end"
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
