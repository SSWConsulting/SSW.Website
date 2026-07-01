"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { SectionHeader } from "../shared/sectionHeader";
import { Countdown } from "./countdown";

function EmailRegister() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            email: email.trim(),
            landingPageUrl:
              typeof window !== "undefined" ? window.location.href : "",
          },
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-base font-medium text-white">
        Thanks — you&apos;re registered. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/30 bg-white/20 px-4 text-white placeholder:text-gray-400 focus:border-white/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "…" : "Register Now"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-sswRed">
          Something went wrong — please try again.
        </p>
      )}
    </>
  );
}

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
          {event?.description && (
            <p className="mt-6 max-w-md text-base font-light text-gray-300">
              {event.description}
            </p>
          )}
          <div className="mt-8">
            <EmailRegister />
            <p className="mt-3 text-xs font-light text-gray-400">
              By submitting you&apos;re confirming that you agree with our{" "}
              <Link
                href="/terms-and-conditions"
                className="underline hover:text-white"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Right: date, countdown, spots */}
        <div className="flex flex-col items-center gap-6">
          {event?.eventDate && (
            <p className="text-2xl font-medium text-white">
              {dayjs(event.eventDate).format("ddd D MMM")}
            </p>
          )}
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
        {event?.presenterImage?.imageSource && (
          <div className="pointer-events-none absolute right-4 top-4 z-10 size-12 overflow-hidden">
            <Image
              src={event.presenterImage.imageSource}
              alt={event.presenterImage.altText ?? ""}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 lg:p-6">
        {(event?.duration || event?.date || event?.location) && (
          <div className="flex flex-col gap-1 text-sm font-light text-gray-400">
            {(event?.duration || event?.date) && (
              <div className="flex flex-wrap items-center gap-4">
                {event?.duration && (
                  <span className="flex items-center gap-2">
                    <FiClock className="size-4" />
                    {event.duration}
                  </span>
                )}
                {event?.date && (
                  <span className="flex items-center gap-2">
                    <FiCalendar className="size-4" />
                    {dayjs(event.date).format("ddd D MMM")}
                  </span>
                )}
              </div>
            )}
            {event?.location && (
              <span className="flex items-center gap-2">
                <FiMapPin className="size-4" />
                {event.location}
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
        {event?.registerLink && (
          <Link
            href={event.registerLink}
            aria-label={`Register for ${event?.title ?? "this event"}`}
            className="mt-auto self-end pt-6 !no-underline"
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
    </div>
  );
}

export function V3Events({ data }) {
  const eventCards = (data?.eventCards ?? []).filter(Boolean);
  const hasFeatured =
    data?.featuredEvent?.title || data?.featuredEvent?.image?.imageSource;

  // Repeat the cards until there are enough slides for embla's loop to engage
  // (it won't loop a short list when ~3 are visible on md).
  const MIN_CAROUSEL_SLIDES = 6;
  const carouselCards =
    eventCards.length > 0 && eventCards.length < MIN_CAROUSEL_SLIDES
      ? Array.from(
          { length: Math.ceil(MIN_CAROUSEL_SLIDES / eventCards.length) },
          () => eventCards
        ).flat()
      : eventCards;

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-4"
        className="flex max-w-screen-xl flex-col gap-8 py-16 md:py-24"
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
            {/* Below lg: horizontal infinite-scroll carousel */}
            <Carousel
              opts={{ align: "start", loop: true, dragFree: true }}
              autoplay={false}
              className="lg:hidden"
            >
              <CarouselContent className="-ml-24">
                {carouselCards.map((event, index) => (
                  <CarouselItem
                    key={`v3-event-card-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                  >
                    <EventCard event={event} />
                  </CarouselItem>
                ))}
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
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
